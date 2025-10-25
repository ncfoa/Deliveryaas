# P2P Delivery Platform - Flows and Microservice Interactions

## Overview

This document outlines all the application flows and how the 42 microservices interact with each other, including database operations, API calls, and data flow patterns. Each flow is mapped to specific microservices, database tables, and the parameters used.

## Table of Contents

1. [Authentication & User Onboarding Flows](#authentication--user-onboarding-flows)
2. [Trip Creation & Management Flows](#trip-creation--management-flows)
3. [Search & Discovery Flows](#search--discovery-flows)
4. [Shipment Creation & Booking Flows](#shipment-creation--booking-flows)
5. [Payment & Financial Flows](#payment--financial-flows)
6. [Chain of Custody & Tracking Flows](#chain-of-custody--tracking-flows)
7. [Communication & Notification Flows](#communication--notification-flows)
8. [Support & Moderation Flows](#support--moderation-flows)
9. [Administrative & Operational Flows](#administrative--operational-flows)

---

## 1. Authentication & User Onboarding Flows

### 1.1 User Registration Flow

**Frontend Route:** `/signin` → `/signin/email` → `/signin/otp`

**Microservices Involved:**
- **User Service** (Primary)
- **Authentication Service** (Secondary)
- **Notification Service** (Secondary)

**Database Tables:**
- `users`
- `auth_identities`
- `sessions`
- `devices`
- `notifications`

**Flow Steps:**

1. **Initial Sign-in Page** (`/signin`)
   - User selects authentication method (email, Google, Apple)
   - **User Service** checks if user exists
   - **Authentication Service** validates OAuth providers

2. **Email Entry** (`/signin/email`)
   - User enters email address
   - **User Service** validates email format
   - **Authentication Service** generates OTP token
   - **Notification Service** sends OTP email

3. **OTP Verification** (`/signin/otp`)
   - User enters 6-digit OTP code
   - **Authentication Service** validates OTP
   - **User Service** creates/updates user record
   - **Authentication Service** creates session
   - **Notification Service** sends welcome email

**API Calls:**
```typescript
// User Service
POST /users/check-email
POST /users/create
PUT /users/{id}/profile

// Authentication Service
POST /auth/generate-otp
POST /auth/verify-otp
POST /auth/create-session

// Notification Service
POST /notifications/send-email
```

**Parameters:**
- `email`: string
- `otp_code`: string (6 digits)
- `provider`: 'email' | 'google' | 'apple'
- `device_fingerprint`: string
- `user_agent`: string

### 1.2 User Profile Setup Flow

**Microservices Involved:**
- **User Service** (Primary)
- **KYC Service** (Secondary)
- **File Service** (Secondary)

**Database Tables:**
- `user_profiles`
- `user_stats`
- `kyc_verifications`
- `files`

**Flow Steps:**

1. **Profile Creation**
   - User completes profile information
   - **User Service** creates `user_profiles` record
   - **User Service** initializes `user_stats` record

2. **KYC Verification** (for travelers)
   - User uploads identity documents
   - **File Service** stores documents securely
   - **KYC Service** processes verification
   - **User Service** updates KYC status

**API Calls:**
```typescript
// User Service
POST /users/{id}/profile
PUT /users/{id}/settings

// KYC Service
POST /kyc/verify
POST /kyc/documents

// File Service
POST /files/upload
```

---

## 2. Trip Creation & Management Flows

### 2.1 Traveler Trip Creation Flow

**Frontend Route:** Trip creation form (not shown in current app)

**Microservices Involved:**
- **Trip Service** (Primary)
- **Location Service** (Secondary)
- **Vehicle Verification Service** (Secondary)
- **File Service** (Secondary)

**Database Tables:**
- `trips`
- `trip_legs`
- `trip_constraints`
- `trip_documents`
- `locations`
- `user_vehicles`
- `files`

**Flow Steps:**

1. **Trip Planning**
   - Traveler selects origin and destination
   - **Location Service** validates and geocodes locations
   - **Trip Service** creates `trips` record with status 'draft'

2. **Leg Definition**
   - Traveler adds trip legs (flights, car segments)
   - **Trip Service** creates `trip_legs` records
   - **Vehicle Verification Service** validates vehicle (for car trips)

3. **Constraints Setting**
   - Traveler defines package constraints
   - **Trip Service** creates `trip_constraints` record

4. **Document Upload**
   - Traveler uploads flight tickets, boarding passes
   - **File Service** stores documents
   - **Trip Service** creates `trip_documents` records

5. **Trip Publishing**
   - **Trip Service** updates status to 'published'
   - **Trip Search Service** indexes trip for search

**API Calls:**
```typescript
// Trip Service
POST /trips
POST /trips/{id}/legs
POST /trips/{id}/constraints
POST /trips/{id}/documents
PUT /trips/{id}/publish

// Location Service
POST /locations/geocode
GET /locations/search

// Vehicle Verification Service
GET /vehicles/{id}/capacity
POST /vehicles/{id}/documents

// File Service
POST /files/upload
```

**Parameters:**
- `origin_location_id`: uuid
- `destination_location_id`: uuid
- `transport_mode`: 'flight' | 'car'
- `earliest_departure`: timestamptz
- `latest_arrival`: timestamptz
- `vehicle_id`: uuid (for car trips)
- `max_weight_grams`: integer
- `allowed_categories`: package_category_enum[]

### 2.2 Trip Search & Discovery Flow

**Frontend Route:** `/search`

**Microservices Involved:**
- **Trip Search Service** (Primary)
- **Location Service** (Secondary)
- **Route Planning Service** (Secondary)
- **Local Courier Service** (Secondary)

**Database Tables:**
- `route_search_queries`
- `route_suggestions`
- `route_graph_nodes`
- `route_graph_edges`
- `trips`
- `trip_legs`
- `local_segments`

**Flow Steps:**

1. **Search Query Processing**
   - User enters search criteria (from, to, date, package type)
   - **Trip Search Service** creates `route_search_queries` record
   - **Location Service** validates and normalizes locations

2. **Route Calculation**
   - **Route Planning Service** queries `route_graph_edges`
   - **Trip Search Service** finds matching trips
   - **Local Courier Service** finds local segments

3. **Result Ranking**
   - **Trip Search Service** ranks results by price, duration, rating
   - **Trip Search Service** creates `route_suggestions` records

4. **Result Display**
   - Frontend displays sorted results
   - User can filter and sort results

**API Calls:**
```typescript
// Trip Search Service
POST /search/trips
GET /search/suggestions
POST /search/saved

// Location Service
GET /locations/search
POST /locations/geocode

// Route Planning Service
POST /routes/calculate
GET /routes/alternatives

// Local Courier Service
GET /couriers/segments
```

**Parameters:**
- `origin_location_id`: uuid
- `destination_location_id`: uuid
- `earliest_departure`: timestamptz
- `latest_arrival`: timestamptz
- `package_type`: package_category_enum
- `max_weight_grams`: integer
- `sort_by`: 'cheapest' | 'best' | 'quickest'

---

## 3. Shipment Creation & Booking Flows

### 3.1 Shipment Creation Flow

**Frontend Route:** `/booking`

**Microservices Involved:**
- **Shipment Service** (Primary)
- **Customs Service** (Secondary)
- **File Service** (Secondary)
- **Pricing Service** (Secondary)

**Database Tables:**
- `shipments`
- `packages`
- `package_items`
- `package_photos`
- `customs_declarations`
- `recipients`
- `files`

**Flow Steps:**

1. **Package Details Collection**
   - User enters package information (type, weight, dimensions, value)
   - **Shipment Service** creates `packages` record
   - **Pricing Service** calculates base pricing

2. **Package Photos Upload**
   - User uploads package photos
   - **File Service** stores images
   - **Shipment Service** creates `package_photos` records

3. **Sender Information**
   - User provides sender contact and address details
   - **Shipment Service** validates information

4. **Recipient Information**
   - User provides recipient contact and address details
   - **Shipment Service** creates `recipients` record

5. **Customs Declaration** (if international)
   - **Customs Service** creates `customs_declarations` record
   - **Customs Service** calculates duties and taxes

6. **Shipment Finalization**
   - **Shipment Service** creates `shipments` record
   - **Pricing Service** generates final price quote

**API Calls:**
```typescript
// Shipment Service
POST /shipments
POST /shipments/{id}/packages
POST /packages/{id}/photos
POST /recipients

// Customs Service
POST /customs/declaration
GET /customs/duties

// File Service
POST /files/upload

// Pricing Service
POST /pricing/quote
POST /pricing/calculate
```

**Parameters:**
- `package_type`: package_category_enum
- `weight_grams`: integer
- `dimensions`: {length, width, height}
- `declared_value_cents`: integer
- `sender_info`: {name, email, phone, address}
- `recipient_info`: {name, email, phone, address}
- `special_handling`: string

### 3.2 Booking Confirmation Flow

**Frontend Route:** `/booking` → `/payment` → `/confirmation`

**Microservices Involved:**
- **Itinerary Service** (Primary)
- **Booking Service** (Primary)
- **Payment Service** (Primary)
- **Escrow Service** (Secondary)
- **Notification Service** (Secondary)

**Database Tables:**
- `itineraries`
- `itinerary_legs`
- `leg_bookings`
- `leg_assignments`
- `payment_intents`
- `charges`
- `escrow_entries`
- `notifications`

**Flow Steps:**

1. **Itinerary Creation**
   - User selects trip option from search results
   - **Itinerary Service** creates `itineraries` record
   - **Itinerary Service** creates `itinerary_legs` records

2. **Leg Booking**
   - **Booking Service** creates `leg_bookings` for each leg
   - **Booking Service** sends booking requests to travelers
   - Travelers accept/decline bookings

3. **Payment Processing**
   - **Payment Service** creates `payment_intents`
   - **Payment Service** processes payment
   - **Payment Service** creates `charges` record

4. **Escrow Setup**
   - **Escrow Service** creates `escrow_entries`
   - **Escrow Service** holds funds until delivery

5. **Confirmation**
   - **Booking Service** creates `leg_assignments`
   - **Notification Service** sends confirmation emails
   - **Itinerary Service** updates status to 'confirmed'

**API Calls:**
```typescript
// Itinerary Service
POST /itineraries
POST /itineraries/{id}/legs

// Booking Service
POST /bookings
PUT /bookings/{id}/confirm
POST /bookings/{id}/assign

// Payment Service
POST /payments
POST /payments/{id}/process

// Escrow Service
POST /escrow
POST /escrow/{id}/hold

// Notification Service
POST /notifications/send-email
```

**Parameters:**
- `shipment_id`: uuid
- `trip_leg_ids`: uuid[]
- `total_price_cents`: integer
- `currency_code`: string
- `payment_method`: string
- `payment_intent_id`: string

---

## 4. Payment & Financial Flows

### 4.1 Payment Processing Flow

**Frontend Route:** `/payment`

**Microservices Involved:**
- **Payment Service** (Primary)
- **Pricing Service** (Secondary)
- **Escrow Service** (Secondary)
- **Invoice Service** (Secondary)

**Database Tables:**
- `payment_accounts`
- `payment_methods`
- `payment_intents`
- `charges`
- `price_quotes`
- `fees`
- `invoices`
- `invoice_lines`

**Flow Steps:**

1. **Price Calculation**
   - **Pricing Service** calculates total price
   - **Pricing Service** creates `price_quotes` record
   - **Pricing Service** calculates applicable fees

2. **Payment Method Selection**
   - User selects payment method
   - **Payment Service** validates payment method
   - **Payment Service** creates `payment_intents`

3. **Payment Processing**
   - **Payment Service** processes payment with provider
   - **Payment Service** creates `charges` record
   - **Payment Service** updates payment status

4. **Escrow Setup**
   - **Escrow Service** creates `escrow_entries`
   - **Escrow Service** holds funds until delivery

5. **Invoice Generation**
   - **Invoice Service** creates `invoices` record
   - **Invoice Service** creates `invoice_lines` for each charge

**API Calls:**
```typescript
// Payment Service
POST /payments
POST /payments/{id}/process
GET /payments/methods

// Pricing Service
POST /pricing/quote
GET /pricing/fees
POST /pricing/calculate

// Escrow Service
POST /escrow
POST /escrow/{id}/hold

// Invoice Service
POST /invoices
POST /invoices/{id}/lines
```

**Parameters:**
- `amount_cents`: integer
- `currency_code`: string
- `payment_method_id`: uuid
- `shipment_id`: uuid
- `fees`: fee_type_enum[]
- `tax_rate`: decimal

### 4.2 Payout Processing Flow

**Microservices Involved:**
- **Payout Service** (Primary)
- **Escrow Service** (Secondary)
- **Accounting Service** (Secondary)

**Database Tables:**
- `payouts`
- `escrow_entries`
- `transfers`
- `ledger_entries`
- `ledger_accounts`

**Flow Steps:**

1. **Delivery Completion Trigger**
   - Package delivery is confirmed
   - **Escrow Service** releases funds
   - **Payout Service** creates `payouts` record

2. **Transfer Processing**
   - **Payout Service** creates `transfers` record
   - **Accounting Service** creates `ledger_entries`
   - **Payout Service** processes payout to traveler

3. **Reconciliation**
   - **Accounting Service** reconciles accounts
   - **Payout Service** updates payout status

**API Calls:**
```typescript
// Payout Service
POST /payouts
POST /payouts/batch
GET /payouts/{id}/status

// Escrow Service
POST /escrow/{id}/release

// Accounting Service
POST /accounting/entries
POST /accounting/reconcile
```

---

## 5. Chain of Custody & Tracking Flows

### 5.1 QR Code Generation & Handoff Flow

**Microservices Involved:**
- **QR Code Service** (Primary)
- **Handoff Service** (Primary)
- **Tracking Service** (Secondary)
- **Notification Service** (Secondary)

**Database Tables:**
- `qr_codes`
- `handoff_steps`
- `handoff_scans`
- `custody_states`
- `tracking_events`
- `handoff_photos`

**Flow Steps:**

1. **QR Code Generation**
   - **QR Code Service** generates unique QR codes for each handoff
   - **QR Code Service** creates `qr_codes` records
   - **Handoff Service** creates `handoff_steps` records

2. **Handoff Planning**
   - **Handoff Service** plans handoff sequence
   - **Handoff Service** assigns QR codes to each step
   - **Tracking Service** initializes `custody_states`

3. **Handoff Execution**
   - Traveler scans QR code at pickup
   - **Handoff Service** records `handoff_scans`
   - **Tracking Service** updates `custody_states`
   - **Tracking Service** creates `tracking_events`

4. **Photo Evidence**
   - Traveler uploads handoff photos
   - **File Service** stores photos
   - **Handoff Service** creates `handoff_photos` records

5. **Status Updates**
   - **Tracking Service** updates package status
   - **Notification Service** sends status updates

**API Calls:**
```typescript
// QR Code Service
POST /qr/generate
POST /qr/validate
PUT /qr/{id}/expire

// Handoff Service
POST /handoffs
POST /handoffs/{id}/scan
POST /handoffs/{id}/photos

// Tracking Service
POST /tracking/events
GET /tracking/{id}/status
PUT /tracking/{id}/custody

// Notification Service
POST /notifications/send-push
POST /notifications/send-email
```

**Parameters:**
- `shipment_id`: uuid
- `handoff_sequence`: integer
- `from_party_type`: party_type_enum
- `to_party_type`: party_type_enum
- `qr_token`: string
- `scan_location_id`: uuid
- `photo_file_ids`: uuid[]

### 5.2 Real-time Tracking Flow

**Microservices Involved:**
- **Tracking Service** (Primary)
- **Notification Service** (Secondary)
- **WebSocket Service** (Secondary)

**Database Tables:**
- `tracking_events`
- `custody_states`
- `delivery_proofs`
- `notifications`

**Flow Steps:**

1. **Event Recording**
   - Package status changes are recorded
   - **Tracking Service** creates `tracking_events`
   - **Tracking Service** updates `custody_states`

2. **Real-time Updates**
   - **WebSocket Service** broadcasts updates
   - **Notification Service** sends push notifications
   - Frontend receives real-time updates

3. **Delivery Confirmation**
   - Final delivery is confirmed
   - **Tracking Service** creates `delivery_proofs`
   - **Tracking Service** marks shipment as delivered

**API Calls:**
```typescript
// Tracking Service
POST /tracking/events
GET /tracking/{id}/history
POST /tracking/{id}/proof

// Notification Service
POST /notifications/send-push
POST /notifications/send-email

// WebSocket Service
POST /websocket/broadcast
```

---

## 6. Communication & Notification Flows

### 6.1 In-app Messaging Flow

**Microservices Involved:**
- **Messaging Service** (Primary)
- **File Service** (Secondary)
- **Notification Service** (Secondary)

**Database Tables:**
- `conversations`
- `conversation_participants`
- `messages`
- `files`
- `notifications`

**Flow Steps:**

1. **Conversation Creation**
   - **Messaging Service** creates `conversations` record
   - **Messaging Service** adds participants
   - **Messaging Service** creates `conversation_participants` records

2. **Message Sending**
   - User sends message
   - **Messaging Service** creates `messages` record
   - **File Service** stores attachments (if any)

3. **Message Delivery**
   - **Notification Service** sends push notifications
   - **Messaging Service** updates delivery status

**API Calls:**
```typescript
// Messaging Service
POST /conversations
POST /messages
GET /conversations/{id}/messages

// File Service
POST /files/upload

// Notification Service
POST /notifications/send-push
```

### 6.2 Multi-channel Notification Flow

**Microservices Involved:**
- **Notification Service** (Primary)
- **User Service** (Secondary)

**Database Tables:**
- `notifications`
- `push_subscriptions`
- `user_notification_prefs`
- `users`

**Flow Steps:**

1. **Event Trigger**
   - Business event occurs (booking, status change, etc.)
   - **Notification Service** determines recipients

2. **Preference Check**
   - **Notification Service** checks `user_notification_prefs`
   - **Notification Service** determines delivery channels

3. **Multi-channel Delivery**
   - **Notification Service** sends via email, push, SMS
   - **Notification Service** creates `notifications` records
   - **Notification Service** updates delivery status

**API Calls:**
```typescript
// Notification Service
POST /notifications
GET /notifications/user/{id}
PUT /notifications/preferences
POST /notifications/subscribe
```

---

## 7. Support & Moderation Flows

### 7.1 Support Ticket Flow

**Microservices Involved:**
- **Support Service** (Primary)
- **Messaging Service** (Secondary)
- **File Service** (Secondary)

**Database Tables:**
- `support_tickets`
- `support_messages`
- `files`
- `users`

**Flow Steps:**

1. **Ticket Creation**
   - User creates support ticket
   - **Support Service** creates `support_tickets` record
   - **Support Service** assigns priority and category

2. **Message Exchange**
   - User and support agent exchange messages
   - **Messaging Service** creates `support_messages` records
   - **File Service** stores attachments

3. **Ticket Resolution**
   - **Support Service** updates ticket status
   - **Support Service** closes ticket

**API Calls:**
```typescript
// Support Service
POST /support/tickets
PUT /support/tickets/{id}
POST /support/tickets/{id}/messages

// Messaging Service
POST /messages

// File Service
POST /files/upload
```

### 7.2 Content Moderation Flow

**Microservices Involved:**
- **Moderation Service** (Primary)
- **User Service** (Secondary)
- **Notification Service** (Secondary)

**Database Tables:**
- `moderation_reports`
- `moderation_actions`
- `users`
- `notifications`

**Flow Steps:**

1. **Report Submission**
   - User reports inappropriate content
   - **Moderation Service** creates `moderation_reports` record
   - **Moderation Service** queues for review

2. **Review Process**
   - Moderator reviews report
   - **Moderation Service** creates `moderation_actions` record
   - **Moderation Service** takes appropriate action

3. **Notification**
   - **Notification Service** notifies relevant parties
   - **User Service** updates user status if needed

**API Calls:**
```typescript
// Moderation Service
POST /moderation/reports
POST /moderation/actions
GET /moderation/stats

// User Service
PUT /users/{id}/status

// Notification Service
POST /notifications/send-email
```

---

## 8. Administrative & Operational Flows

### 8.1 Audit Logging Flow

**Microservices Involved:**
- **Audit Service** (Primary)
- **Configuration Service** (Secondary)

**Database Tables:**
- `audit_logs`
- `feature_flags`
- `app_settings`

**Flow Steps:**

1. **Event Capture**
   - Business event occurs
   - **Audit Service** captures event details
   - **Audit Service** creates `audit_logs` record

2. **Compliance Reporting**
   - **Audit Service** generates compliance reports
   - **Audit Service** exports audit data

**API Calls:**
```typescript
// Audit Service
POST /audit/events
GET /audit/logs
GET /audit/reports
```

### 8.2 Background Job Processing Flow

**Microservices Involved:**
- **Job Queue Service** (Primary)
- **Notification Service** (Secondary)
- **Payout Service** (Secondary)

**Database Tables:**
- `background_jobs`
- `notifications`
- `payouts`

**Flow Steps:**

1. **Job Scheduling**
   - Business process schedules job
   - **Job Queue Service** creates `background_jobs` record
   - **Job Queue Service** queues job for processing

2. **Job Processing**
   - Worker picks up job
   - **Job Queue Service** updates job status
   - Job executes business logic

3. **Job Completion**
   - **Job Queue Service** marks job as completed
   - **Job Queue Service** triggers dependent jobs

**API Calls:**
```typescript
// Job Queue Service
POST /jobs
GET /jobs/{id}
PUT /jobs/{id}/retry
GET /jobs/queue
```

---

## 9. Data Flow Patterns

### 9.1 Synchronous Communication
- **REST APIs** for real-time data access
- **GraphQL** for complex queries
- **gRPC** for high-performance internal communication

### 9.2 Asynchronous Communication
- **Event Streaming** for domain events
- **Message Queues** for reliable delivery
- **Webhooks** for external integrations

### 9.3 Data Consistency
- **Eventual Consistency** for non-critical data
- **Strong Consistency** for financial transactions
- **Saga Pattern** for distributed transactions

---

## 10. Error Handling & Recovery

### 10.1 Circuit Breaker Pattern
- Services implement circuit breakers for external dependencies
- Automatic fallback mechanisms for service failures
- Graceful degradation of functionality

### 10.2 Retry Mechanisms
- Exponential backoff for transient failures
- Dead letter queues for failed messages
- Manual retry capabilities for critical operations

### 10.3 Monitoring & Alerting
- Real-time monitoring of service health
- Automated alerting for critical failures
- Performance metrics and SLA tracking

---

This comprehensive flows and interactions document provides a complete picture of how all 42 microservices work together to deliver the P2P delivery platform functionality, with detailed mapping of database operations, API calls, and data flow patterns for each business process.