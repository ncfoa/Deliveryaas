## P2P Delivery (Skyscanner-style) – Monolithic Database Schema (PostgreSQL)

This document defines a production-grade relational schema for a monolithic peer‑to‑peer delivery platform where senders search multi‑leg itineraries across traveler trips and local courier legs, book a route, and track chain‑of‑custody via QR scans.

Principles
- **Data minimization**: Travellers’ personal info is not exposed; the app shows only public stats. The DB stores only what's required for account, safety, and payments.
- **UUID everywhere**: All primary keys are `uuid` (default `gen_random_uuid()`), unless specified.
- **Timestamps**: Each table has `created_at timestamptz not null default now()`, `updated_at timestamptz not null default now()`. Soft delete via `deleted_at timestamptz null` where useful.
- **Money and units**: Monetary values stored as `amount_cents integer` + `currency_code char(3)`; weights/dimensions stored in normalized base units (`grams`, `millimeters`).
- **Auditing**: Important state transitions captured in append‑only event tables.
- **Enums**: Statuses modeled via PostgreSQL enums for integrity and performance.

Note on locations
- The platform routes between real-world places: airports, cities, addresses. We use normalized `locations` and specializations for `airports`, `cities`, and precise `addresses` when needed.

---

### 1) Enums (PostgreSQL enum types)
Description: Centralized enumerations for statuses, types, and categorical values.

```sql
-- Roles and users
create type user_role_enum as enum ('sender','traveller','admin','support');
create type user_status_enum as enum ('active','suspended','deleted');
create type kyc_status_enum as enum ('not_required','pending','verified','rejected');

-- Trips and routing
create type trip_status_enum as enum ('draft','published','in_progress','completed','closed','cancelled');
create type leg_type_enum as enum ('traveller','local_courier');
create type leg_status_enum as enum ('planned','requested','booked','in_progress','completed','cancelled','failed');
create type transport_mode_enum as enum ('flight','car');

-- Shipments & packages
create type package_category_enum as enum ('document','parcel','electronics','fragile','food','medicine','other');
create type shipment_priority_enum as enum ('standard','express','critical');
create type shipment_status_enum as enum (
  'draft','searching','awaiting_acceptance','booked','in_transit','awaiting_pickup','awaiting_delivery',
  'delivered','cancelled','lost','returned'
);
create type package_status_enum as enum ('draft','ready','assigned','in_transit','delivered','cancelled','lost');

-- Identity & documents
create type identity_document_type_enum as enum ('passport','national_id','driver_license','residence_permit');
create type document_status_enum as enum ('pending','verified','rejected','expired','revoked');
create type trip_document_type_enum as enum ('flight_booking','boarding_pass','visa','vehicle_registration','vehicle_insurance','other');

-- Vehicles
create type vehicle_type_enum as enum ('car','van','motorbike','truck');
create type vehicle_status_enum as enum ('active','inactive','suspended','verification_pending','verification_failed');
create type vehicle_document_type_enum as enum ('registration','insurance','inspection','permit');

-- Handoffs & QR
create type party_type_enum as enum ('sender','traveller','local_courier','recipient','system');
create type handoff_status_enum as enum ('planned','awaiting_dropoff','awaiting_pickup','transferred','failed','cancelled');
create type qr_code_type_enum as enum ('shipment','handoff','leg','package');

-- Payments
create type payment_status_enum as enum (
  'requires_payment_method','requires_confirmation','processing','succeeded','failed','canceled'
);
create type payout_status_enum as enum ('pending','in_transit','paid','failed','canceled');
create type dispute_status_enum as enum ('needs_response','under_review','won','lost','warning_closed');
create type fee_type_enum as enum ('platform_fee','payment_processor_fee','fx_fee','dispute_fee','other');

-- Notifications / jobs / messages
create type message_type_enum as enum ('text','system','image','file','status_update');
create type notification_channel_enum as enum ('in_app','push','email','sms');
create type notification_status_enum as enum ('queued','sent','failed','delivered','opened');
create type job_status_enum as enum ('queued','running','succeeded','failed','canceled');

-- Units
create type weight_unit_enum as enum ('g','kg','lb');
create type dimension_unit_enum as enum ('mm','cm','in');

-- Invoicing
create type invoice_status_enum as enum ('draft','open','paid','void','uncollectible','refunded');
create type invoice_line_type_enum as enum ('product','fee','tax','discount','adjustment');

-- Taxes
create type tax_calculation_method_enum as enum ('inclusive','exclusive');

-- Insurance
create type insurance_claim_status_enum as enum ('filed','under_review','approved','denied','paid','closed');

-- Support
create type ticket_status_enum as enum ('open','pending','on_hold','resolved','closed');
create type moderation_status_enum as enum ('received','investigating','action_taken','dismissed');

-- Risk & holds
create type risk_level_enum as enum ('low','medium','high','severe');
create type hold_status_enum as enum ('active','released');

-- Promotions
create type promotion_type_enum as enum ('coupon','credit');
create type discount_type_enum as enum ('fixed_amount','percentage');

-- Cancellations
create type cancellation_reason_enum as enum ('user_request','no_show','compliance','other');

-- MFA & verification
create type mfa_factor_type_enum as enum ('totp','sms','webauthn');
create type mfa_challenge_status_enum as enum ('pending','passed','failed','expired');

-- Tagging
create type tag_scope_enum as enum ('shipment','trip','user','message');
```

---

### 2) Reference and dictionary tables

#### 2.1 `currencies`
Purpose: ISO-4217 currency registry; used by payments and pricing.
- `code char(3) pk`
- `name text not null`
- `symbol text not null`
- `minor_unit integer not null default 2` (e.g., 2 for cents)

Indexes: pk on `code`.

#### 2.2 `countries`, `cities`, `airports`
Purpose: World geography for routing and display; airports via IATA/ICAO.
- `countries`
  - `id uuid pk`
  - `iso2 char(2) unique not null`, `iso3 char(3) unique not null`
  - `name text not null`
  - `phone_code text null`
- `cities`
  - `id uuid pk`
  - `country_id uuid fk countries(id)`
  - `name text not null`
  - `tzid text not null` (IANA timezone)
  - `latitude double precision not null`
  - `longitude double precision not null`
  - `admin1 text null` (state/province)
  - Unique `(country_id, name)`
- `airports`
  - `id uuid pk`
  - `city_id uuid fk cities(id)`
  - `iata_code char(3) unique not null`
  - `icao_code char(4) unique null`
  - `name text not null`
  - `tzid text not null`
  - `latitude double precision not null`
  - `longitude double precision not null`

Indexes: on `cities.country_id`, geo btree on `(country_id, name)`, `airports.iata_code` unique.

#### 2.3 `locations`
Purpose: Generic routable point—can reference airport, city centroid, or precise address.
- `id uuid pk`
- `type text not null check (type in ('airport','city','address'))`
- `airport_id uuid fk airports(id) null`
- `city_id uuid fk cities(id) null`
- `address_id uuid fk addresses(id) null`
- `latitude double precision not null`
- `longitude double precision not null`
- `display_name text not null`
- Unique partials to ensure only one of airport/city/address is set per row.

#### 2.4 `addresses`
Purpose: Structured street addresses when needed (recipient delivery, pick-ups).
- `id uuid pk`
- `country_id uuid fk countries(id)`
- `administrative_area text null`
- `locality text null`
- `postal_code text null`
- `address_line1 text not null`
- `address_line2 text null`
- `latitude double precision null`
- `longitude double precision null`
- `place_ref text null` (e.g., Google Place ID)

Indexes: `(country_id, postal_code)`, gist on point if PostGIS (optional).

---

### 3) Users, roles, auth, profiles, privacy

#### 3.1 `users`
Purpose: Core account record; minimal PII; travellers’ public exposure is limited to alias and stats.
- `id uuid pk`
- `status user_status_enum not null default 'active'`
- `primary_role user_role_enum not null default 'sender'`
- `email text unique null` (for login/receipts; not publicly shown)
- `email_verified boolean not null default false`
- `phone_e164 text unique null` (optional; not publicly shown)
- `alias text unique not null` (public handle)
- `language text not null default 'en'`
- `country_id uuid fk countries(id) null`
- `kyc_status kyc_status_enum not null default 'not_required'`
- `reputation_score numeric(5,2) not null default 0`
- `metadata jsonb not null default '{}'`
- `created_at`, `updated_at`

Indexes: `email`, `phone_e164`, `alias` unique.

#### 3.2 `roles`, `user_roles`
Purpose: RBAC for admin and granular privileges.
- `roles(id uuid pk, key text unique, name text)`
- `user_roles(user_id uuid fk users, role_id uuid fk roles, primary key(user_id, role_id))`

#### 3.3 `auth_identities`
Purpose: External identity linkage.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `provider text not null` (e.g., 'password','google','apple')
- `provider_user_id text not null`
- `email text null`
- `email_verified boolean not null default false`
- Unique `(provider, provider_user_id)`

#### 3.4 `sessions`, `devices`
Purpose: Login sessions and device metadata for security and push notifications.
- `sessions(id uuid pk, user_id uuid fk, session_token text unique, last_seen_at timestamptz, expires_at timestamptz)`
- `devices(id uuid pk, user_id uuid fk, device_fingerprint text, push_token text, platform text, last_seen_at timestamptz)`

#### 3.5 `user_profiles`
Purpose: Public, non-sensitive profile fields.
- `user_id uuid pk fk users(id)`
- `bio text null`
- `avatar_file_id uuid fk files(id) null`
- `show_city boolean not null default false`
- `city_id uuid fk cities(id) null`

#### 3.6 `user_stats`
Purpose: Aggregate counters shown publicly.
- `user_id uuid pk fk users(id)`
- `trips_completed integer not null default 0`
- `packages_carried integer not null default 0`
- `on_time_rate numeric(5,2) not null default 0`
- `avg_rating numeric(3,2) not null default 0`
- `last_trip_completed_at timestamptz null`

#### 3.7 `kyc_verifications`
Purpose: Compliance for payouts (travellers). Store references only; files in `files`.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `status kyc_status_enum not null`
- `provider text not null` (e.g., 'stripe', 'persona')
- `reference_id text not null`
- `submitted_at timestamptz null`
- `verified_at timestamptz null`
- `rejection_reason text null`

#### 3.8 `identity_documents`
Purpose: Traveller identity documents for verification and safety.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `type identity_document_type_enum not null`
- `document_number text null`
- `issuing_country_id uuid fk countries(id) null`
- `issued_at timestamptz null`
- `expires_at timestamptz null`
- `file_front_id uuid fk files(id) null`
- `file_back_id uuid fk files(id) null`
- `selfie_file_id uuid fk files(id) null`
- `status document_status_enum not null default 'pending'`
- `provider text null` (verification vendor)
- `provider_ref text null`
- `verified_at timestamptz null`
- `rejection_reason text null`
- `metadata jsonb not null default '{}'`

Indexes: `(user_id, status)`, `(type)`.

---

### 4) Travellers and trips

#### 4.1 `traveller_profiles`
Purpose: Traveller-specific preferences and capacity constraints.
- `user_id uuid pk fk users(id)`
- `max_weight_grams integer not null default 0`
- `max_length_mm integer null`, `max_width_mm integer null`, `max_height_mm integer null`
- `allow_fragile boolean not null default false`
- `allow_food boolean not null default false`
- `allow_medicine boolean not null default false`
- `notes text null`

#### 4.2 `trips`
Purpose: A published traveller trip from an origin to a destination on specific dates.
- `id uuid pk`
- `traveller_id uuid fk users(id)`
- `origin_location_id uuid fk locations(id)`
- `destination_location_id uuid fk locations(id)`
- `transport_mode transport_mode_enum not null`
- `vehicle_id uuid fk user_vehicles(id) null` (for car mode)
- `earliest_departure timestamptz not null`
- `latest_arrival timestamptz not null`
- `status trip_status_enum not null default 'draft'`
- `visibility text not null default 'public'` (future private options)
- `notes text null`
- `metadata jsonb not null default '{}'`
- `created_at`, `updated_at`

Indexes: `(origin_location_id, destination_location_id, earliest_departure)`; btree on `status`, `transport_mode`.

#### 4.3 `trip_legs`
Purpose: Optional decomposition; supports multi-stop trips; captures mode-specific details.
- `id uuid pk`
- `trip_id uuid fk trips(id)`
- `sequence integer not null`
- `from_location_id uuid fk locations(id)`
- `to_location_id uuid fk locations(id)`
- `transport_mode transport_mode_enum not null`
- `planned_departure timestamptz not null`
- `planned_arrival timestamptz not null`
- `carrier text null` (airline)
- `flight_number text null`
- `aircraft_model text null`
- `pnr_locator text null`
- `vehicle_id uuid fk user_vehicles(id) null` (for car legs)
- Unique `(trip_id, sequence)`

Indexes: `(trip_id, sequence)`, `(transport_mode)`, `(vehicle_id)`.

#### 4.4 `trip_constraints`
Purpose: What this traveller accepts for the trip.
- `id uuid pk`
- `trip_id uuid fk trips(id) unique`
- `max_weight_grams integer not null`
- `max_length_mm integer null`, `max_width_mm integer null`, `max_height_mm integer null`
- `allowed_categories package_category_enum[] not null default '{}'`
- `banned_keywords text[] not null default '{}'`
- `requires_qr_scan boolean not null default true`

#### 4.5 `user_vehicles`
Purpose: Traveller vehicles for car trips; capacity and verification.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `type vehicle_type_enum not null`
- `make text null`
- `model text null`
- `year integer null`
- `color text null`
- `license_plate text null`
- `country_id uuid fk countries(id) null`
- `capacity_weight_grams integer null`
- `capacity_volume_cm3 integer null`
- `status vehicle_status_enum not null default 'verification_pending'`
- `is_primary boolean not null default false`
- `metadata jsonb not null default '{}'`

Indexes: `(user_id, status)`, `(license_plate)` where not null.

#### 4.6 `vehicle_documents`
Purpose: Vehicle paperwork used for verification and compliance.
- `id uuid pk`
- `vehicle_id uuid fk user_vehicles(id)`
- `type vehicle_document_type_enum not null`
- `file_id uuid fk files(id)`
- `issued_at timestamptz null`
- `expires_at timestamptz null`
- `status document_status_enum not null default 'pending'`
- `provider text null`
- `provider_ref text null`
- `verified_at timestamptz null`
- `rejection_reason text null`

Indexes: `(vehicle_id, type)`, `(status)`.

#### 4.7 `trip_documents`
Purpose: Trip and leg-level documents (flight tickets, boarding passes, permits).
- `id uuid pk`
- `trip_id uuid fk trips(id)`
- `trip_leg_id uuid fk trip_legs(id) null`
- `type trip_document_type_enum not null`
- `file_id uuid fk files(id)`
- `uploaded_by_user_id uuid fk users(id)`
- `uploaded_at timestamptz not null default now()`
- `notes text null`

Indexes: `(trip_id, type)`, `(trip_leg_id)`.

---

### 5) Local courier providers and local legs

#### 5.1 `local_courier_providers`
Purpose: Registered local delivery services for first/last-mile legs.
- `id uuid pk`
- `name text not null`
- `website text null`
- `support_email text null`
- `support_phone text null`
- `rating numeric(3,2) not null default 0`
- `metadata jsonb not null default '{}'`

#### 5.2 `local_service_areas`
Purpose: Geographic coverage per provider.
- `id uuid pk`
- `provider_id uuid fk local_courier_providers(id)`
- `city_id uuid fk cities(id) null`
- `polygon_geojson jsonb null` (optional spatial coverage)

#### 5.3 `local_segments`
Purpose: Canonical local routable edges (e.g., Airport → Traveller home).
- `id uuid pk`
- `provider_id uuid fk local_courier_providers(id)`
- `from_location_id uuid fk locations(id)`
- `to_location_id uuid fk locations(id)`
- `estimated_duration_minutes integer not null`
- `base_price_cents integer not null`
- `currency_code char(3) fk currencies(code)`
- `active boolean not null default true`

#### 5.4 `local_quotes`
Purpose: Quoted price for a specific request (dynamic pricing).
- `id uuid pk`
- `segment_id uuid fk local_segments(id)`
- `request_payload jsonb not null`
- `price_cents integer not null`
- `currency_code char(3) not null`
- `expires_at timestamptz not null`

---

### 6) Recipients and addresses

#### 6.1 `recipients`
Purpose: Delivery endpoint contact; minimal PII required to complete delivery.
- `id uuid pk`
- `name text not null`
- `phone_e164 text null`
- `email text null`
- `address_id uuid fk addresses(id) not null`
- `instructions text null`

Indexes: `(phone_e164)`, `(email)` where not null.

---

### 7) Shipments, packages, declarations

#### 7.1 `shipments`
Purpose: A sender’s request to deliver from origin to final destination.
- `id uuid pk`
- `sender_id uuid fk users(id)`
- `recipient_id uuid fk recipients(id)`
- `origin_location_id uuid fk locations(id)`
- `destination_location_id uuid fk locations(id)`
- `priority shipment_priority_enum not null default 'standard'`
- `status shipment_status_enum not null default 'draft'`
- `requested_pickup_start timestamptz null`
- `requested_pickup_end timestamptz null`
- `requested_delivery_start timestamptz null`
- `requested_delivery_end timestamptz null`
- `declared_value_cents integer not null default 0`
- `currency_code char(3) fk currencies(code)`
- `special_handling text null`
- `metadata jsonb not null default '{}'`
- `created_at`, `updated_at`

Indexes: `(sender_id, created_at desc)`, `(status)`.

#### 7.2 `packages`
Purpose: One or more physical packages under a shipment.
- `id uuid pk`
- `shipment_id uuid fk shipments(id)`
- `category package_category_enum not null`
- `status package_status_enum not null default 'draft'`
- `weight_grams integer not null`
- `length_mm integer not null`
- `width_mm integer not null`
- `height_mm integer not null`
- `description text null`
- `barcode text null` (optional external)
- `metadata jsonb not null default '{}'`

Indexes: `shipment_id`, `status`.

#### 7.3 `package_items`
Purpose: Optional itemization for customs and documentation.
- `id uuid pk`
- `package_id uuid fk packages(id)`
- `name text not null`
- `quantity integer not null`
- `unit_value_cents integer not null`
- `currency_code char(3) not null`
- `hs_code text null` (customs)
- `origin_country_id uuid fk countries(id) null`

#### 7.4 `package_photos`
Purpose: Visual verification and proof of condition.
- `id uuid pk`
- `package_id uuid fk packages(id)`
- `file_id uuid fk files(id)`
- `kind text not null default 'general'` (e.g., 'sealed','damage')

#### 7.5 `customs_declarations`
Purpose: Cross-border customs information.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `content jsonb not null` (declaration details)
- `submitted_at timestamptz null`

---

### 8) Route search, itineraries, legs, bookings

#### 8.1 `route_search_queries`
Purpose: Captures user searches for caching/analytics.
- `id uuid pk`
- `user_id uuid fk users(id) null`
- `origin_location_id uuid fk locations(id)`
- `destination_location_id uuid fk locations(id)`
- `earliest_departure timestamptz not null`
- `latest_arrival timestamptz not null`
- `max_legs integer not null default 4`
- `constraints jsonb not null default '{}'`

#### 8.2 `route_suggestions`
Purpose: Materialized suggestions built from trips and local segments.
- `id uuid pk`
- `search_id uuid fk route_search_queries(id)`
- `score numeric(8,4) not null`
- `summary text not null`
- `expires_at timestamptz not null`

#### 8.3 `itineraries`
Purpose: The chosen plan for a shipment.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `search_id uuid fk route_search_queries(id) null`
- `status leg_status_enum not null default 'planned'`
- `total_price_cents integer not null default 0`
- `currency_code char(3) fk currencies(code)`
- `notes text null`

#### 8.4 `itinerary_legs`
Purpose: Ordered legs composing the itinerary (traveller or local courier).
- `id uuid pk`
- `itinerary_id uuid fk itineraries(id)`
- `sequence integer not null`
- `type leg_type_enum not null`
- `from_location_id uuid fk locations(id)`
- `to_location_id uuid fk locations(id)`
- `planned_departure timestamptz not null`
- `planned_arrival timestamptz not null`
- `trip_leg_id uuid fk trip_legs(id) null` (for traveller legs)
- `local_segment_id uuid fk local_segments(id) null` (for local courier legs)
- `status leg_status_enum not null default 'planned'`
- `price_cents integer not null default 0`
- `currency_code char(3) not null`
- Unique `(itinerary_id, sequence)`

Indexes: `(type)`, `(status)`, `(trip_leg_id)`, `(local_segment_id)`.

#### 8.5 `leg_bookings`
Purpose: Offer/accept workflow per leg; forms agreement and price with the carrying party.
- `id uuid pk`
- `itinerary_leg_id uuid fk itinerary_legs(id) unique`
- `requested_by_user_id uuid fk users(id)`
- `counterparty_user_id uuid fk users(id) null` (traveller for traveller legs)
- `provider_id uuid fk local_courier_providers(id) null`
- `offer_price_cents integer not null`
- `currency_code char(3) not null`
- `accepted boolean not null default false`
- `accepted_at timestamptz null`
- `declined_at timestamptz null`
- `expires_at timestamptz null`

#### 8.6 `leg_assignments`
Purpose: The finalized assignment to a traveller or local provider.
- `id uuid pk`
- `itinerary_leg_id uuid fk itinerary_legs(id) unique`
- `assignee_party_type party_type_enum not null`
- `assignee_user_id uuid fk users(id) null`
- `assignee_provider_id uuid fk local_courier_providers(id) null`
- `confirmed_at timestamptz not null`
- `notes text null`

---

### 9) Chain of custody, QR codes, scans, tracking

#### 9.1 `qr_codes`
Purpose: QR tokens bound to a domain entity for secure scans.
- `id uuid pk`
- `type qr_code_type_enum not null`
- `entity_id uuid not null` (FK to shipment/handoff/leg via app logic)
- `token text unique not null` (random, short‑lived when needed)
- `expires_at timestamptz null`
- `active boolean not null default true`
- `metadata jsonb not null default '{}'`

Index: `token` unique, partial on `active`.

#### 9.2 `handoff_steps`
Purpose: Planned custody transfers within an itinerary.
- `id uuid pk`
- `itinerary_id uuid fk itineraries(id)`
- `sequence integer not null`
- `from_party_type party_type_enum not null`
- `from_user_id uuid fk users(id) null`
- `from_provider_id uuid fk local_courier_providers(id) null`
- `to_party_type party_type_enum not null`
- `to_user_id uuid fk users(id) null`
- `to_provider_id uuid fk local_courier_providers(id) null`
- `handoff_qr_id uuid fk qr_codes(id) null`
- `status handoff_status_enum not null default 'planned'`
- `planned_at timestamptz null`
- `planned_location_id uuid fk locations(id) null`
- Unique `(itinerary_id, sequence)`

#### 9.3 `handoff_scans`
Purpose: Actual QR scan events updating custody.
- `id uuid pk`
- `handoff_id uuid fk handoff_steps(id)`
- `qr_code_id uuid fk qr_codes(id)`
- `scanned_by_user_id uuid fk users(id)`
- `scan_result text not null` (e.g., 'ok','invalid','expired')
- `scan_location_id uuid fk locations(id) null`
- `scanned_at timestamptz not null default now()`
- `metadata jsonb not null default '{}'`

#### 9.4 `custody_states`
Purpose: Current holder of shipment/package.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `current_party_type party_type_enum not null`
- `current_user_id uuid fk users(id) null`
- `current_provider_id uuid fk local_courier_providers(id) null`
- `since timestamptz not null default now()`

#### 9.5 `tracking_events`
Purpose: Timeline of status/location updates for shipment and legs.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) null`
- `itinerary_leg_id uuid fk itinerary_legs(id) null`
- `event_type text not null` (e.g., 'picked_up','departed','arrived','delivered')
- `status text null`
- `location_id uuid fk locations(id) null`
- `message text null`
- `occurred_at timestamptz not null`
- `created_by_user_id uuid fk users(id) null`

Index: `(shipment_id, occurred_at)`.

#### 9.6 `delivery_proofs`
Purpose: Evidence of delivery (POD).
- `id uuid pk`
- `shipment_id uuid fk shipments(id)`
- `file_id uuid fk files(id)`
- `collected_by_user_id uuid fk users(id)`
- `collected_at timestamptz not null`
- `recipient_signature text null`
- `notes text null`

#### 9.7 `handoff_photos`
Purpose: Photos taken at handoff events for additional evidence.
- `id uuid pk`
- `handoff_id uuid fk handoff_steps(id)`
- `file_id uuid fk files(id)`
- `captured_at timestamptz not null default now()`
- `notes text null`

---

### 10) Payments, pricing, escrow, payouts

#### 10.1 `payment_accounts`
Purpose: Link user to payment processor account (customer for senders, connected account for travellers).
- `id uuid pk`
- `user_id uuid fk users(id) unique`
- `provider text not null` (e.g., 'stripe')
- `customer_ref text null`
- `connected_account_ref text null`
- `default_currency char(3) fk currencies(code) null`
- `payouts_enabled boolean not null default false`

#### 10.2 `payment_methods`
Purpose: Saved cards/wallets for senders.
- `id uuid pk`
- `payment_account_id uuid fk payment_accounts(id)`
- `provider text not null`
- `provider_pm_ref text not null`
- `brand text null`
- `last4 text null`
- `exp_month integer null`
- `exp_year integer null`
- `is_default boolean not null default false`
- Unique `(payment_account_id, provider_pm_ref)`

#### 10.3 `price_quotes`
Purpose: Aggregated price for itinerary (before booking).
- `id uuid pk`
- `itinerary_id uuid fk itineraries(id) unique`
- `total_price_cents integer not null`
- `currency_code char(3) not null`
- `breakdown jsonb not null` (per leg, fees)
- `expires_at timestamptz not null`

#### 10.4 `payment_intents`
Purpose: Charge authorization/capture flow for a shipment.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `payment_account_id uuid fk payment_accounts(id)`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `status payment_status_enum not null`
- `provider text not null`
- `provider_pi_ref text not null`
- `client_secret text null`
- `confirmed_at timestamptz null`
- `captured_at timestamptz null`

#### 10.5 `charges`
Purpose: Concrete charges once captured.
- `id uuid pk`
- `payment_intent_id uuid fk payment_intents(id)`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `provider_charge_ref text not null`
- `status payment_status_enum not null`
- `receipt_url text null`
- `created_at timestamptz not null default now()`

#### 10.6 `escrow_entries`
Purpose: Funds held until delivery; released to travellers/providers.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `held_at timestamptz not null default now()`
- `released_at timestamptz null`
- `cancelled_at timestamptz null`

#### 10.7 `transfers`
Purpose: Internal accounting transfers from escrow to parties.
- `id uuid pk`
- `shipment_id uuid fk shipments(id)`
- `beneficiary_party_type party_type_enum not null`
- `beneficiary_user_id uuid fk users(id) null`
- `beneficiary_provider_id uuid fk local_courier_providers(id) null`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `created_at timestamptz not null default now()`

#### 10.8 `payouts`
Purpose: Outbound payouts to travellers/providers.
- `id uuid pk`
- `user_id uuid fk users(id) null`
- `provider_id uuid fk local_courier_providers(id) null`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `provider text not null`
- `provider_payout_ref text not null`
- `status payout_status_enum not null`
- `paid_at timestamptz null`

#### 10.9 `fees`
Purpose: Platform and processor fees per shipment.
- `id uuid pk`
- `shipment_id uuid fk shipments(id)`
- `type fee_type_enum not null`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `description text null`

#### 10.10 `refunds`
Purpose: Refunds to sender.
- `id uuid pk`
- `charge_id uuid fk charges(id)`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `provider_refund_ref text not null`
- `created_at timestamptz not null default now()`

#### 10.11 `disputes`
Purpose: Payment disputes/chargebacks.
- `id uuid pk`
- `charge_id uuid fk charges(id)`
- `status dispute_status_enum not null`
- `reason text null`
- `opened_at timestamptz not null`
- `closed_at timestamptz null`

#### 10.12 `fx_rates`
Purpose: Historical FX rates for reporting.
- `id uuid pk`
- `base char(3) not null`
- `quote char(3) not null`
- `rate numeric(20,10) not null`
- `as_of_date date not null`
- Unique `(base, quote, as_of_date)`

---

### 11) Reviews and ratings

#### 11.1 `reviews`
Purpose: Post‑delivery feedback on travellers and providers.
- `id uuid pk`
- `shipment_id uuid fk shipments(id)`
- `reviewer_id uuid fk users(id)`
- `target_party_type party_type_enum not null`
- `target_user_id uuid fk users(id) null`
- `target_provider_id uuid fk local_courier_providers(id) null`
- `rating integer not null check (rating between 1 and 5)`
- `comment text null`
- `created_at timestamptz not null default now()`

Index: `(target_user_id)`, `(target_provider_id)`.

---

### 12) Messaging and notifications

#### 12.1 `conversations`
Purpose: Private threads between sender and each leg assignee (or group per shipment).
- `id uuid pk`
- `shipment_id uuid fk shipments(id) null`
- `topic text null`
- `created_by_user_id uuid fk users(id)`

#### 12.2 `conversation_participants`
Purpose: Thread membership.
- `conversation_id uuid fk conversations(id)`
- `user_id uuid fk users(id)`
- `role text null` (e.g., 'sender','traveller')
- Primary key `(conversation_id, user_id)`

#### 12.3 `messages`
Purpose: Chat messages.
- `id uuid pk`
- `conversation_id uuid fk conversations(id)`
- `sender_id uuid fk users(id)`
- `type message_type_enum not null`
- `body text null`
- `file_id uuid fk files(id) null`
- `sent_at timestamptz not null default now()`
- Index `(conversation_id, sent_at)`

#### 12.4 `notifications`
Purpose: Outbound user notifications.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `channel notification_channel_enum not null`
- `status notification_status_enum not null`
- `title text not null`
- `body text not null`
- `data jsonb not null default '{}'`
- `queued_at timestamptz not null default now()`
- `sent_at timestamptz null`
- `delivered_at timestamptz null`
- `opened_at timestamptz null`

#### 12.5 `push_subscriptions`
Purpose: Push tokens per device for notifications.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `device_id uuid fk devices(id)`
- `platform text not null` (ios/android/web)
- `token text not null`
- Unique `(device_id, token)`

#### 12.6 `user_notification_prefs`
Purpose: Per-user notification preferences by channel and event.
- `user_id uuid fk users(id)`
- `channel notification_channel_enum not null`
- `event_key text not null` (e.g., 'shipment_status_change')
- `enabled boolean not null default true`
- Primary key `(user_id, channel, event_key)`

---

### 13) Files and documents

#### 13.1 `files`
Purpose: Metadata for uploaded files stored in object storage (S3, GCS).
- `id uuid pk`
- `owner_user_id uuid fk users(id) null`
- `bucket text not null`
- `object_key text not null`
- `content_type text not null`
- `size_bytes bigint not null`
- `checksum text null`
- `created_at timestamptz not null default now()`
- Unique `(bucket, object_key)`

---

### 14) Search graph (optional but recommended for performance)

#### 14.1 `route_graph_nodes`
Purpose: Denormalized nodes (airports, city centroids) for fast graph queries.
- `id uuid pk`
- `location_id uuid fk locations(id) unique`
- `kind text not null` ('airport','city')

#### 14.2 `route_graph_edges`
Purpose: Directed edges representing possible legs (from trips and local segments).
- `id uuid pk`
- `from_node_id uuid fk route_graph_nodes(id)`
- `to_node_id uuid fk route_graph_nodes(id)`
- `source text not null` ('trip','local_segment')
- `source_id uuid not null` (trip_leg_id or local_segment_id)
- `earliest_departure timestamptz not null`
- `latest_arrival timestamptz not null`
- `capacity_weight_grams integer null`
- Index `(from_node_id)`, `(to_node_id)`, `(earliest_departure)`

---

### 15) Administration, ops, observability

#### 15.1 `audit_logs`
Purpose: Immutable audit trail for sensitive actions.
- `id uuid pk`
- `actor_user_id uuid fk users(id) null`
- `action text not null`
- `entity_table text not null`
- `entity_id uuid not null`
- `metadata jsonb not null default '{}'`
- `occurred_at timestamptz not null default now()`
- Index `(entity_table, entity_id, occurred_at)`

#### 15.2 `background_jobs`
Purpose: Queue for async processing (emails, route builds, payouts).
- `id uuid pk`
- `queue text not null`
- `name text not null`
- `payload jsonb not null`
- `status job_status_enum not null default 'queued'`
- `run_at timestamptz not null default now()`
- `attempts integer not null default 0`
- `last_error text null`
- `locked_by text null`
- `locked_at timestamptz null`
- Index `(queue, status, run_at)`

#### 15.3 `webhooks_outgoing` and `webhook_deliveries`
Purpose: Outbound hooks (e.g., to payment provider) and their delivery attempts.
- `webhooks_outgoing(id uuid pk, target_url text, event_key text, payload jsonb, created_at timestamptz)`
- `webhook_deliveries(id uuid pk, webhook_id uuid fk, attempt integer, status integer, response_code integer, response_body text, sent_at timestamptz)`

#### 15.4 `webhooks_incoming`
Purpose: Inbound notifications from providers (payment, KYC).
- `id uuid pk`
- `source text not null`
- `event_key text not null`
- `payload jsonb not null`
- `received_at timestamptz not null default now()`
- `processed_at timestamptz null`

#### 15.5 `feature_flags`
Purpose: Progressive rollouts and experiments.
- `key text pk`
- `description text null`
- `enabled boolean not null default false`

#### 15.6 `app_settings`
Purpose: System‑wide configuration values.
- `key text pk`
- `value jsonb not null`
- `updated_at timestamptz not null default now()`

#### 15.7 `rate_limits`
Purpose: Throttling for abuse prevention.
- `id uuid pk`
- `scope text not null` (e.g., 'login', 'search')
- `key text not null` (user_id/ip)
- `window_started_at timestamptz not null`
- `count integer not null default 0`
- Unique `(scope, key, window_started_at)`

#### 15.8 `api_keys`
Purpose: Admin/API integrations.
- `id uuid pk`
- `owner_user_id uuid fk users(id) null`
- `name text not null`
- `key_hash text not null`
- `expires_at timestamptz null`
- `created_at timestamptz not null default now()`

#### 15.9 `privacy_consents`, `data_erasure_requests`
Purpose: Compliance with data privacy.
- `privacy_consents(id uuid pk, user_id uuid fk, consent_key text, granted boolean, granted_at timestamptz)`
- `data_erasure_requests(id uuid pk, user_id uuid fk, requested_at timestamptz, processed_at timestamptz, status text)`

---

### 16) Key workflows and how tables link

- **Posting a trip**: `users` (traveller) → `trips` (+ optional `trip_legs`, `trip_constraints`). Set `transport_mode` per trip (and per leg). Car trips link a `user_vehicles` record; flight legs record airline/flight number and upload `trip_documents` such as `flight_booking` or `boarding_pass`.
- **Uploading documents**: Travellers upload `identity_documents` (passport, ID, license) and vehicle paperwork in `vehicle_documents`. For flights, attach `trip_documents` to the `trip` or specific `trip_leg` (e.g., boarding pass).
- **Searching routes**: Query saved in `route_search_queries`. Engine builds `route_suggestions` and shows options composed from `trip_legs` and `local_segments` via `route_graph_edges`.
- **Creating shipment**: Sender creates `shipments`, `packages` (+ photos/items/declaration), selects one suggestion and persists to `itineraries` + `itinerary_legs`.
- **Booking legs**: For each leg, create `leg_bookings`. Once accepted, create `leg_assignments`. Price consolidated in `price_quotes`.
- **Payment**: Initiate `payment_intents` → `charges`; move to `escrow_entries` until delivery; distribute via `transfers` and `payouts`. Fees in `fees`; refunds in `refunds`.
- **Chain of custody**: `handoff_steps` planned from sender→traveller→local courier→recipient, each with a `qr_codes` row. Scans recorded in `handoff_scans`. `custody_states` updated and `tracking_events` appended.
- **Completion and reviews**: On delivery, mark `shipments` and `itineraries` complete; create `delivery_proofs`; enable `reviews`.

---

### 17) Representative DDL snippets (copy/paste‑ready)
Note: The full schema is captured above; these snippets show canonical patterns.

```sql
-- Helper extension (for UUIDs)
create extension if not exists pgcrypto;

-- trips (with transport_mode and vehicle linkage)
create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  traveller_id uuid not null references users(id),
  origin_location_id uuid not null references locations(id),
  destination_location_id uuid not null references locations(id),
  transport_mode transport_mode_enum not null,
  vehicle_id uuid references user_vehicles(id),
  earliest_departure timestamptz not null,
  latest_arrival timestamptz not null,
  status trip_status_enum not null default 'draft',
  visibility text not null default 'public',
  notes text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ( (transport_mode <> 'car') or (vehicle_id is not null) )
);

-- trip_legs (mode-specific details)
create table if not exists trip_legs (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id),
  sequence integer not null,
  from_location_id uuid not null references locations(id),
  to_location_id uuid not null references locations(id),
  transport_mode transport_mode_enum not null,
  planned_departure timestamptz not null,
  planned_arrival timestamptz not null,
  carrier text,
  flight_number text,
  aircraft_model text,
  pnr_locator text,
  vehicle_id uuid references user_vehicles(id),
  unique (trip_id, sequence)
);
create index if not exists idx_trip_legs_mode on trip_legs (transport_mode);

-- identity documents
create table if not exists identity_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  type identity_document_type_enum not null,
  document_number text,
  issuing_country_id uuid references countries(id),
  issued_at timestamptz,
  expires_at timestamptz,
  file_front_id uuid references files(id),
  file_back_id uuid references files(id),
  selfie_file_id uuid references files(id),
  status document_status_enum not null default 'pending',
  provider text,
  provider_ref text,
  verified_at timestamptz,
  rejection_reason text,
  metadata jsonb not null default '{}'
);
create index if not exists idx_identity_docs_user_status on identity_documents (user_id, status);

-- user vehicles and documents
create table if not exists user_vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  type vehicle_type_enum not null,
  make text,
  model text,
  year integer,
  color text,
  license_plate text,
  country_id uuid references countries(id),
  capacity_weight_grams integer,
  capacity_volume_cm3 integer,
  status vehicle_status_enum not null default 'verification_pending',
  is_primary boolean not null default false,
  metadata jsonb not null default '{}'
);
create index if not exists idx_user_vehicles_user_status on user_vehicles (user_id, status);

create table if not exists vehicle_documents (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references user_vehicles(id),
  type vehicle_document_type_enum not null,
  file_id uuid not null references files(id),
  issued_at timestamptz,
  expires_at timestamptz,
  status document_status_enum not null default 'pending',
  provider text,
  provider_ref text,
  verified_at timestamptz,
  rejection_reason text
);
create index if not exists idx_vehicle_documents_vehicle on vehicle_documents (vehicle_id, type);

-- trip documents (tickets, boarding passes)
create table if not exists trip_documents (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id),
  trip_leg_id uuid references trip_legs(id),
  type trip_document_type_enum not null,
  file_id uuid not null references files(id),
  uploaded_by_user_id uuid not null references users(id),
  uploaded_at timestamptz not null default now(),
  notes text
);
create index if not exists idx_trip_documents_trip_type on trip_documents (trip_id, type);

-- shipments (unchanged fields trimmed)
create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references users(id),
  recipient_id uuid not null references recipients(id),
  origin_location_id uuid not null references locations(id),
  destination_location_id uuid not null references locations(id),
  priority shipment_priority_enum not null default 'standard',
  status shipment_status_enum not null default 'draft',
  declared_value_cents integer not null default 0,
  currency_code char(3) not null references currencies(code),
  special_handling text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

### 18) Indexing guidance (selected)
- `trips`: composite index on `(origin_location_id, destination_location_id, earliest_departure)` for search; separate index on `status`, `transport_mode`.
- `trip_legs`: `(trip_id, sequence)` unique; index on `transport_mode` and `(vehicle_id)` for car trips.
- `route_graph_edges`: indexes on `(from_node_id)`, `(to_node_id)`, and `(earliest_departure)` to accelerate path finding within time windows.
- `itinerary_legs`: `(itinerary_id, sequence)` unique; indexes on `(trip_leg_id)` and `(local_segment_id)` for joins.
- `shipments`: `(sender_id, created_at desc)`; `status` for dashboards.
- `handoff_steps`: `(itinerary_id, sequence)` unique; `status` for operational views.
- `handoff_scans`: `(handoff_id, scanned_at)`; partial index on recent scans.
- `charges`, `payouts`: by `created_at`/`paid_at` and `status` for finance reports.
- `identity_documents`: `(user_id, status)` for verification queues.
- `user_vehicles`: `(user_id, status)` for moderation/ops.
- `trip_documents`: `(trip_id, type)` for quick retrieval.
- `invoices`: `(user_id, issued_at desc)`; `status` for AR dashboards.

---

### 19) Constraints and integrity highlights
- Ensure exactly one of `trip_leg_id` or `local_segment_id` is set per `itinerary_legs` via a CHECK:
  - `check ((trip_leg_id is not null) <> (local_segment_id is not null))`
- In `locations`, enforce only one of `airport_id`, `city_id`, or `address_id` is set.
- For `trips`, if `transport_mode='car'` then `vehicle_id` must be present.
- For flight `trip_legs`, prefer `from_location_id` and `to_location_id` referencing airport-type `locations`; enforce via application or triggers.
- For `shipments` requested windows, validate `requested_pickup_start <= requested_pickup_end` and `requested_delivery_start <= requested_delivery_end` when both present.
- Use DEFERRABLE FKs where lifecycles are complex (optional).
- Use database triggers to maintain `updated_at` timestamps.

---

### 20) Why each table exists (rationale)
- `users`, `roles`, `user_roles`, `auth_identities`, `sessions`, `devices`: Account, auth, RBAC, and secure session management.
- `user_profiles`, `user_stats`, `kyc_verifications`: Public profile without PII exposure, stats for trust, and payout compliance.
- `identity_documents`: Traveller-provided ID artifacts (passport, ID, license) for safety; distinct from provider-driven `kyc_verifications`.
- `countries`, `cities`, `airports`, `addresses`, `locations`: Normalized geodata to power routing and display.
- `traveller_profiles`, `trips`, `trip_legs`, `trip_constraints`: Travellers declare capacity and routes; trips and legs track `transport_mode` with flight and car specifics.
- `user_vehicles`, `vehicle_documents`: Persist vehicles for car trips and attach verification paperwork.
- `trip_documents`: Store flight tickets, boarding passes, visas, and vehicle permits at trip/leg level.
- `local_courier_providers`, `local_service_areas`, `local_segments`, `local_quotes`: First/last‑mile options when direct handoff is not feasible.
- `recipients`: Minimal endpoint contact for final delivery.
- `shipments`, `packages`, `package_items`, `package_photos`, `customs_declarations`: Shipment definition, physical packages, documentation, and customs for cross‑border.
- `route_search_queries`, `route_suggestions`, `route_graph_nodes`, `route_graph_edges`: Search logs, cached suggestions, and a graph abstraction for fast path finding.
- `itineraries`, `itinerary_legs`, `leg_bookings`, `leg_assignments`: The chosen plan and the contract to carry for each leg.
- `qr_codes`, `handoff_steps`, `handoff_scans`, `custody_states`, `tracking_events`, `delivery_proofs`, `handoff_photos`: Chain‑of‑custody enforced via QR with full auditability.
- `payment_accounts`, `payment_methods`, `price_quotes`, `payment_intents`, `charges`, `escrow_entries`, `transfers`, `payouts`, `fees`, `refunds`, `disputes`, `fx_rates`: End‑to‑end payments, escrow, and financial reporting.
- `conversations`, `conversation_participants`, `messages`, `notifications`, `push_subscriptions`, `user_notification_prefs`: In‑app communications and notifications.
- `files`: Object storage references for photos, documents, and proofs.
- `audit_logs`, `background_jobs`, `webhooks_incoming`, `webhooks_outgoing`, `webhook_deliveries`, `feature_flags`, `app_settings`, `rate_limits`, `api_keys`, `privacy_consents`, `data_erasure_requests`: Operational excellence, observability, configuration, and compliance.
- `invoices`, `invoice_lines`, `billing_profiles`, `tax_jurisdictions`, `tax_rates`: Formal billing artifacts, line-itemization, and taxation required for accounting and receipts.
- `insurance_providers`, `insurance_policies`, `insurance_claims`: Optional shipment insurance and downstream claims handling.
- `promotions`, `promotion_redemptions`: Coupons/credits for marketing and customer support adjustments.
- `cancellation_policies`, `cancellations`: Business rules for refunds and penalties when shipments are canceled.
- `risk_assessments`, `shipment_holds`, `user_flags`: Trust & safety controls, fraud risk scoring, and operational holds.
- `user_settings`, `mfa_factors`, `mfa_challenges`: User preferences and MFA security.
- `saved_searches`, `search_alerts`: Persisted discovery with notification alerts when new routes appear.
- `tags`, `entity_tags`: Flexible labeling for ops and curation across entities.
- `ledger_accounts`, `ledger_entries`: Lightweight double-entry style bookkeeping for internal financial reconciliation.

---

### 21) Notes on privacy and exposure
- Travellers’ public profile shows only `alias` and aggregates from `user_stats` (e.g., trips completed, on‑time rate, avg rating). No email/phone exposure.
- Identity and vehicle documents contain sensitive PII; access is strictly role‑gated, stored via `files` in secure object storage, and should be encrypted at rest with limited retention.
- Recipient PII limited to delivery context; access controlled and redacted in logs/exports.
- Chain‑of‑custody QR tokens are opaque and can be short‑lived to limit leakage.

---

### 22) Invoicing and taxes

#### 22.1 `billing_profiles`
Purpose: Store billing entity details for users (invoices/receipts).
- `id uuid pk`
- `user_id uuid fk users(id)`
- `legal_name text not null`
- `tax_id text null` (e.g., VAT/GST)
- `address_id uuid fk addresses(id) not null`
- `is_default boolean not null default false`

#### 22.2 `invoices`
Purpose: Official billing documents for shipments/charges.
- `id uuid pk`
- `user_id uuid fk users(id)` (billed to)
- `shipment_id uuid fk shipments(id) null`
- `billing_profile_id uuid fk billing_profiles(id) null`
- `status invoice_status_enum not null`
- `currency_code char(3) not null`
- `subtotal_cents integer not null default 0`
- `tax_cents integer not null default 0`
- `discount_cents integer not null default 0`
- `total_cents integer not null default 0`
- `issued_at timestamptz null`
- `due_at timestamptz null`
- `paid_at timestamptz null`
- `voided_at timestamptz null`
- `external_ref text null`
- `metadata jsonb not null default '{}'`

Indexes: `(user_id, issued_at desc)`, `(shipment_id)`.

#### 22.3 `invoice_lines`
Purpose: Line items on invoices.
- `id uuid pk`
- `invoice_id uuid fk invoices(id)`
- `sequence integer not null`
- `type invoice_line_type_enum not null`
- `description text null`
- `quantity numeric(12,3) not null default 1`
- `unit_amount_cents integer not null default 0`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `tax_rate_id uuid fk tax_rates(id) null`
- Unique `(invoice_id, sequence)`

#### 22.4 `tax_jurisdictions`
Purpose: Tax regions for mapping rates.
- `id uuid pk`
- `country_id uuid fk countries(id) null`
- `region text null` (state/province)
- `name text not null`

#### 22.5 `tax_rates`
Purpose: Configurable tax rates per jurisdiction.
- `id uuid pk`
- `jurisdiction_id uuid fk tax_jurisdictions(id)`
- `name text not null`
- `percentage numeric(7,4) not null`
- `calculation_method tax_calculation_method_enum not null` (inclusive/exclusive)
- `valid_from date not null`
- `valid_to date null`
- `active boolean not null default true`

---

### 23) Insurance

#### 23.1 `insurance_providers`
Purpose: Catalog of insurance partners.
- `id uuid pk`
- `name text not null`
- `contact_email text null`
- `website text null`
- `metadata jsonb not null default '{}'`

#### 23.2 `insurance_policies`
Purpose: Per-shipment insurance policy metadata.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `provider_id uuid fk insurance_providers(id)`
- `coverage_cents integer not null`
- `premium_cents integer not null`
- `currency_code char(3) not null`
- `policy_number text null`
- `purchased_at timestamptz not null`
- `terms_url text null`
- `metadata jsonb not null default '{}'`

#### 23.3 `insurance_claims`
Purpose: Claims associated with insured shipments.
- `id uuid pk`
- `policy_id uuid fk insurance_policies(id)`
- `status insurance_claim_status_enum not null`
- `reason text null`
- `claimed_amount_cents integer not null`
- `approved_amount_cents integer null`
- `currency_code char(3) not null`
- `filed_at timestamptz not null`
- `resolved_at timestamptz null`
- `evidence_file_id uuid fk files(id) null`
- `notes text null`

---

### 24) Promotions and credits

#### 24.1 `promotions`
Purpose: Coupons/credits for discounts.
- `id uuid pk`
- `code text unique not null`
- `type promotion_type_enum not null` (coupon/credit)
- `discount_type discount_type_enum not null`
- `amount_cents integer null`
- `percent_off numeric(5,2) null`
- `currency_code char(3) null`
- `starts_at timestamptz null`
- `ends_at timestamptz null`
- `max_redemptions integer null`
- `max_redemptions_per_user integer null`
- `min_subtotal_cents integer null`
- `active boolean not null default true`
- `metadata jsonb not null default '{}'`

#### 24.2 `promotion_redemptions`
Purpose: Records of applied promotions.
- `id uuid pk`
- `promotion_id uuid fk promotions(id)`
- `user_id uuid fk users(id)`
- `shipment_id uuid fk shipments(id) null`
- `invoice_id uuid fk invoices(id) null`
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `redeemed_at timestamptz not null default now()`

---

### 25) Cancellations and policies

#### 25.1 `cancellation_policies`
Purpose: Define refund/penalty logic for cancellations.
- `id uuid pk`
- `name text not null`
- `description text null`
- `free_cancellation_until_minutes integer not null default 0`
- `penalty_percent numeric(5,2) null`
- `penalty_min_cents integer null`
- `penalty_max_cents integer null`
- `active boolean not null default true`

#### 25.2 `cancellations`
Purpose: Shipment cancellation records with financial impact.
- `id uuid pk`
- `shipment_id uuid fk shipments(id)`
- `initiated_by_user_id uuid fk users(id)`
- `reason cancellation_reason_enum not null`
- `policy_id uuid fk cancellation_policies(id) null`
- `penalty_cents integer not null default 0`
- `refund_cents integer not null default 0`
- `currency_code char(3) not null`
- `canceled_at timestamptz not null`
- `notes text null`

---

### 26) Risk, holds, trust & safety

#### 26.1 `risk_assessments`
Purpose: Risk scoring for users/shipments.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) null`
- `user_id uuid fk users(id) null`
- `risk_level risk_level_enum not null`
- `score numeric(6,2) not null`
- `reasons text[] not null default '{}'`
- `assessed_at timestamptz not null`

#### 26.2 `shipment_holds`
Purpose: Operational hold on shipment progression.
- `id uuid pk`
- `shipment_id uuid fk shipments(id) unique`
- `status hold_status_enum not null`
- `reason text not null`
- `imposed_by_user_id uuid fk users(id) null`
- `imposed_at timestamptz not null`
- `released_at timestamptz null`

#### 26.3 `user_flags`
Purpose: Lightweight flags for trust/safety signals.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `key text not null`
- `value text null`
- `created_at timestamptz not null default now()`

---

### 27) Support and moderation

#### 27.1 `support_tickets`
Purpose: Customer support cases.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `shipment_id uuid fk shipments(id) null`
- `subject text not null`
- `status ticket_status_enum not null default 'open'`
- `priority text not null default 'normal'`
- `created_at timestamptz not null default now()`
- `closed_at timestamptz null`

#### 27.2 `support_messages`
Purpose: Messages within support tickets.
- `id uuid pk`
- `ticket_id uuid fk support_tickets(id)`
- `sender_user_id uuid fk users(id)`
- `body text not null`
- `file_id uuid fk files(id) null`
- `sent_at timestamptz not null default now()`

#### 27.3 `moderation_reports`
Purpose: Reports of abusive content or behavior.
- `id uuid pk`
- `reporter_user_id uuid fk users(id)`
- `reported_entity_table text not null`
- `reported_entity_id uuid not null`
- `reason text null`
- `status moderation_status_enum not null`
- `created_at timestamptz not null default now()`
- `resolved_at timestamptz null`

#### 27.4 `moderation_actions`
Purpose: Actions taken based on reports.
- `id uuid pk`
- `report_id uuid fk moderation_reports(id)`
- `action text not null` (e.g., 'suspend_user','hide_trip')
- `actor_user_id uuid fk users(id) null`
- `metadata jsonb not null default '{}'`
- `created_at timestamptz not null default now()`

---

### 28) User preferences and MFA

#### 28.1 `user_settings`
Purpose: Arbitrary user-level settings not covered elsewhere.
- `user_id uuid pk fk users(id)`
- `settings jsonb not null default '{}'`
- `updated_at timestamptz not null default now()`

#### 28.2 `mfa_factors`
Purpose: Configured MFA factors per user.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `type mfa_factor_type_enum not null`
- `secret_hash text null` (TOTP secret handle)
- `phone_e164 text null`
- `enabled boolean not null default false`
- `created_at timestamptz not null default now()`

#### 28.3 `mfa_challenges`
Purpose: One-time MFA verifications.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `factor_id uuid fk mfa_factors(id)`
- `status mfa_challenge_status_enum not null`
- `issued_at timestamptz not null default now()`
- `verified_at timestamptz null`
- `expires_at timestamptz not null`
- `attempts integer not null default 0`

---

### 29) Saved searches and alerts

#### 29.1 `saved_searches`
Purpose: Persist search criteria for recurring discovery.
- `id uuid pk`
- `user_id uuid fk users(id)`
- `name text null`
- `criteria jsonb not null` (like `route_search_queries`)
- `created_at timestamptz not null default now()`

#### 29.2 `search_alerts`
Purpose: Notification rules tied to saved searches.
- `id uuid pk`
- `saved_search_id uuid fk saved_searches(id)`
- `channel notification_channel_enum not null`
- `active boolean not null default true`
- `frequency text not null` (e.g., 'instant','daily','weekly')
- `last_sent_at timestamptz null`

---

### 30) Tagging system

#### 30.1 `tags`
Purpose: Tag dictionary by scope for consistent labeling.
- `id uuid pk`
- `scope tag_scope_enum not null`
- `key text not null`
- `name text not null`
- `description text null`
- Unique `(scope, key)`

#### 30.2 `entity_tags`
Purpose: Attach tags to heterogeneous entities.
- `id uuid pk`
- `tag_id uuid fk tags(id)`
- `entity_table text not null`
- `entity_id uuid not null`
- `created_at timestamptz not null default now()`
- Unique `(tag_id, entity_table, entity_id)`

---

### 31) Accounting ledger (lightweight)

#### 31.1 `ledger_accounts`
Purpose: Chart of accounts for internal bookkeeping.
- `id uuid pk`
- `key text unique not null`
- `name text not null`
- `type text not null` ('asset','liability','equity','revenue','expense')
- `currency_code char(3) not null`

#### 31.2 `ledger_entries`
Purpose: Double-entry style postings (record both debit and credit lines per transaction).
- `id uuid pk`
- `shipment_id uuid fk shipments(id) null`
- `account_id uuid fk ledger_accounts(id)`
- `direction text not null` ('debit','credit')
- `amount_cents integer not null`
- `currency_code char(3) not null`
- `occurred_at timestamptz not null`
- `description text null`
- `reference_table text null`
- `reference_id uuid null`
- Index `(shipment_id, occurred_at)`

---

This schema is intentionally comprehensive so the monolith can handle search, booking, custody, and payments without external service schemas. It can be implemented incrementally; start with users/trips/shipments/itineraries/qr handoffs, then layer payments, invoicing, insurance, and local couriers.
