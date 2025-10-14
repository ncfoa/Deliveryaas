# Peer-to-Peer Delivery Platform - Database Schema

## Overview
This document contains the complete database schema for a peer-to-peer delivery platform that connects travelers with people who need to send packages. The platform supports multi-hop routing, QR code tracking, and integration with local delivery services.

---

## Tables

### 1. users
**Description**: Stores all user accounts in the system. Users can act as both travelers (posting trips) and senders (sending packages).

**Purpose**: Central user authentication and profile management.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for each user |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address for login |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password for authentication |
| first_name | VARCHAR(100) | NOT NULL | User's first name |
| last_name | VARCHAR(100) | NOT NULL | User's last name |
| phone_number | VARCHAR(20) | | User's contact number |
| profile_picture_url | VARCHAR(500) | | URL to user's profile picture |
| date_of_birth | DATE | | User's date of birth for age verification |
| gender | ENUM('male', 'female', 'other', 'prefer_not_to_say') | | User's gender |
| preferred_language | VARCHAR(10) | DEFAULT 'en' | Preferred language code (en, fr, ar, etc.) |
| preferred_currency | VARCHAR(3) | DEFAULT 'USD' | Preferred currency code (USD, EUR, CAD, etc.) |
| email_verified | BOOLEAN | DEFAULT FALSE | Whether email is verified |
| phone_verified | BOOLEAN | DEFAULT FALSE | Whether phone is verified |
| account_status | ENUM('active', 'suspended', 'deactivated', 'pending_verification') | DEFAULT 'pending_verification' | Account status |
| is_traveler | BOOLEAN | DEFAULT FALSE | Whether user has traveler capabilities enabled |
| is_sender | BOOLEAN | DEFAULT FALSE | Whether user has sender capabilities enabled |
| two_factor_enabled | BOOLEAN | DEFAULT FALSE | Whether 2FA is enabled |
| last_login_at | TIMESTAMP | | Last login timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- email (UNIQUE)
- phone_number
- account_status

---

### 2. user_addresses
**Description**: Stores multiple addresses for users (home, work, pickup locations, etc.).

**Purpose**: Manage different locations associated with a user for pickups and deliveries.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for each address |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | Reference to user who owns this address |
| address_type | ENUM('home', 'work', 'pickup', 'delivery', 'other') | NOT NULL | Type of address |
| label | VARCHAR(100) | | Custom label for the address (e.g., "Mom's house") |
| address_line1 | VARCHAR(255) | NOT NULL | Primary address line |
| address_line2 | VARCHAR(255) | | Secondary address line (apt, suite, etc.) |
| city | VARCHAR(100) | NOT NULL | City name |
| state_province | VARCHAR(100) | | State or province |
| postal_code | VARCHAR(20) | | Postal/ZIP code |
| country | VARCHAR(100) | NOT NULL | Country name |
| country_code | VARCHAR(2) | NOT NULL | ISO country code (CA, FR, TN, etc.) |
| latitude | DECIMAL(10, 8) | | Latitude for mapping |
| longitude | DECIMAL(11, 8) | | Longitude for mapping |
| is_default | BOOLEAN | DEFAULT FALSE | Whether this is the default address |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- user_id
- country_code
- (latitude, longitude)

---

### 3. user_verification_documents
**Description**: Stores identity verification documents uploaded by users.

**Purpose**: KYC/identity verification for travelers to build trust in the platform.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for each document |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | Reference to user |
| document_type | ENUM('passport', 'national_id', 'drivers_license', 'visa', 'other') | NOT NULL | Type of document |
| document_number | VARCHAR(100) | | Document identification number (encrypted) |
| document_url | VARCHAR(500) | NOT NULL | URL to uploaded document image |
| country_of_issue | VARCHAR(2) | | Country code that issued the document |
| issue_date | DATE | | When document was issued |
| expiry_date | DATE | | When document expires |
| verification_status | ENUM('pending', 'approved', 'rejected', 'expired') | DEFAULT 'pending' | Verification status |
| verified_by | UUID | FOREIGN KEY → users(id) | Admin who verified the document |
| verified_at | TIMESTAMP | | When document was verified |
| rejection_reason | TEXT | | Reason if document was rejected |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Upload timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- user_id
- verification_status

---

### 4. trips
**Description**: Stores all trips posted by travelers.

**Purpose**: Core entity representing a traveler's journey that can be used for package delivery.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for each trip |
| traveler_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User posting the trip |
| trip_status | ENUM('draft', 'published', 'in_progress', 'completed', 'cancelled') | DEFAULT 'draft' | Current status of the trip |
| origin_address_id | UUID | FOREIGN KEY → user_addresses(id) | Starting point address |
| destination_address_id | UUID | FOREIGN KEY → user_addresses(id) | Ending point address |
| origin_city | VARCHAR(100) | NOT NULL | Origin city name |
| origin_country | VARCHAR(100) | NOT NULL | Origin country name |
| origin_country_code | VARCHAR(2) | NOT NULL | Origin country ISO code |
| origin_latitude | DECIMAL(10, 8) | | Origin latitude |
| origin_longitude | DECIMAL(11, 8) | | Origin longitude |
| destination_city | VARCHAR(100) | NOT NULL | Destination city name |
| destination_country | VARCHAR(100) | NOT NULL | Destination country name |
| destination_country_code | VARCHAR(2) | NOT NULL | Destination country ISO code |
| destination_latitude | DECIMAL(10, 8) | | Destination latitude |
| destination_longitude | DECIMAL(11, 8) | | Destination longitude |
| departure_date | DATE | NOT NULL | Planned departure date |
| departure_time | TIME | | Approximate departure time |
| arrival_date | DATE | NOT NULL | Planned arrival date |
| arrival_time | TIME | | Approximate arrival time |
| flexible_dates | BOOLEAN | DEFAULT FALSE | Whether dates are flexible |
| date_flexibility_days | INT | DEFAULT 0 | Number of days flexible (+/-) |
| transportation_mode | ENUM('flight', 'train', 'bus', 'car', 'ship', 'other') | NOT NULL | Mode of transportation |
| flight_number | VARCHAR(20) | | Flight number if applicable |
| max_package_weight_kg | DECIMAL(8, 2) | NOT NULL | Max weight willing to carry (kg) |
| max_package_weight_lbs | DECIMAL(8, 2) | | Max weight in pounds (auto-calculated) |
| max_package_dimensions_cm | VARCHAR(50) | | Max dimensions in cm (LxWxH) |
| available_space_description | TEXT | | Description of available space |
| price_per_kg | DECIMAL(10, 2) | NOT NULL | Price per kg in traveler's currency |
| price_currency | VARCHAR(3) | NOT NULL | Currency code (USD, EUR, CAD, etc.) |
| min_package_price | DECIMAL(10, 2) | | Minimum price for any package |
| max_package_price | DECIMAL(10, 2) | | Maximum price willing to charge |
| accepts_fragile | BOOLEAN | DEFAULT TRUE | Whether accepts fragile items |
| accepts_liquids | BOOLEAN | DEFAULT FALSE | Whether accepts liquids |
| accepts_electronics | BOOLEAN | DEFAULT TRUE | Whether accepts electronics |
| accepts_documents | BOOLEAN | DEFAULT TRUE | Whether accepts documents |
| accepts_food | BOOLEAN | DEFAULT FALSE | Whether accepts food items |
| accepts_clothes | BOOLEAN | DEFAULT TRUE | Whether accepts clothing |
| restricted_items | TEXT | | Custom list of items not accepted |
| notes | TEXT | | Additional notes from traveler |
| total_capacity_kg | DECIMAL(8, 2) | NOT NULL | Total capacity available |
| remaining_capacity_kg | DECIMAL(8, 2) | NOT NULL | Remaining capacity available |
| packages_accepted_count | INT | DEFAULT 0 | Number of packages accepted for this trip |
| verification_required | BOOLEAN | DEFAULT TRUE | Whether sender verification is required |
| published_at | TIMESTAMP | | When trip was published |
| completed_at | TIMESTAMP | | When trip was completed |
| cancelled_at | TIMESTAMP | | When trip was cancelled |
| cancellation_reason | TEXT | | Reason for cancellation |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- traveler_id
- trip_status
- (origin_country_code, destination_country_code)
- (departure_date, arrival_date)
- (origin_city, destination_city)
- published_at

---

### 5. trip_stopovers
**Description**: Stores intermediate stops in a trip.

**Purpose**: Allow travelers to indicate layovers/stops where they can also pick up or deliver packages.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| trip_id | UUID | FOREIGN KEY → trips(id) ON DELETE CASCADE | Reference to the trip |
| stopover_order | INT | NOT NULL | Order of stopover in the journey |
| city | VARCHAR(100) | NOT NULL | Stopover city |
| country | VARCHAR(100) | NOT NULL | Stopover country |
| country_code | VARCHAR(2) | NOT NULL | Country ISO code |
| latitude | DECIMAL(10, 8) | | Stopover latitude |
| longitude | DECIMAL(11, 8) | | Stopover longitude |
| arrival_date | DATE | NOT NULL | Arrival at stopover |
| arrival_time | TIME | | Approximate arrival time |
| departure_date | DATE | NOT NULL | Departure from stopover |
| departure_time | TIME | | Approximate departure time |
| can_pickup | BOOLEAN | DEFAULT TRUE | Whether can pickup packages here |
| can_deliver | BOOLEAN | DEFAULT TRUE | Whether can deliver packages here |
| notes | TEXT | | Additional notes about stopover |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- trip_id
- (trip_id, stopover_order)
- country_code

---

### 6. delivery_requests
**Description**: Stores package delivery requests from senders.

**Purpose**: Represents a sender's need to deliver a package from point A to point B.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| sender_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User requesting delivery |
| request_status | ENUM('draft', 'searching', 'route_found', 'route_selected', 'in_transit', 'delivered', 'cancelled', 'failed') | DEFAULT 'draft' | Current status |
| pickup_address_id | UUID | FOREIGN KEY → user_addresses(id) | Pickup location |
| delivery_address_id | UUID | FOREIGN KEY → user_addresses(id) | Delivery destination |
| pickup_city | VARCHAR(100) | NOT NULL | Pickup city |
| pickup_country | VARCHAR(100) | NOT NULL | Pickup country |
| pickup_country_code | VARCHAR(2) | NOT NULL | Pickup country ISO code |
| pickup_latitude | DECIMAL(10, 8) | | Pickup latitude |
| pickup_longitude | DECIMAL(11, 8) | | Pickup longitude |
| delivery_city | VARCHAR(100) | NOT NULL | Delivery city |
| delivery_country | VARCHAR(100) | NOT NULL | Delivery country |
| delivery_country_code | VARCHAR(2) | NOT NULL | Delivery country ISO code |
| delivery_latitude | DECIMAL(10, 8) | | Delivery latitude |
| delivery_longitude | DECIMAL(11, 8) | | Delivery longitude |
| recipient_name | VARCHAR(200) | NOT NULL | Name of recipient (e.g., "Ali's mom") |
| recipient_phone | VARCHAR(20) | NOT NULL | Recipient contact number |
| recipient_email | VARCHAR(255) | | Recipient email if available |
| desired_delivery_date | DATE | NOT NULL | When package needs to arrive |
| latest_delivery_date | DATE | | Latest acceptable delivery date |
| earliest_pickup_date | DATE | NOT NULL | Earliest date for pickup |
| package_type | ENUM('document', 'electronics', 'clothing', 'food', 'fragile', 'other') | NOT NULL | Type of package |
| package_description | TEXT | NOT NULL | Description of package contents |
| package_value | DECIMAL(10, 2) | | Declared value of package |
| package_value_currency | VARCHAR(3) | | Currency of declared value |
| package_weight_kg | DECIMAL(8, 2) | NOT NULL | Package weight in kg |
| package_weight_lbs | DECIMAL(8, 2) | | Package weight in lbs (auto-calculated) |
| package_dimensions_cm | VARCHAR(50) | NOT NULL | Dimensions in cm (LxWxH) |
| is_fragile | BOOLEAN | DEFAULT FALSE | Whether package is fragile |
| is_liquid | BOOLEAN | DEFAULT FALSE | Whether package contains liquids |
| requires_insurance | BOOLEAN | DEFAULT FALSE | Whether sender wants insurance |
| insurance_value | DECIMAL(10, 2) | | Insurance coverage amount |
| special_handling_instructions | TEXT | | Special handling requirements |
| max_budget | DECIMAL(10, 2) | NOT NULL | Maximum sender willing to pay |
| budget_currency | VARCHAR(3) | NOT NULL | Currency for budget |
| selected_route_id | UUID | FOREIGN KEY → routes(id) | Route selected by sender |
| total_cost | DECIMAL(10, 2) | | Total cost of selected route |
| total_cost_currency | VARCHAR(3) | | Currency of total cost |
| qr_code | VARCHAR(500) | UNIQUE | Unique QR code for this package |
| tracking_number | VARCHAR(50) | UNIQUE | Human-readable tracking number |
| published_at | TIMESTAMP | | When request was published |
| route_selected_at | TIMESTAMP | | When route was selected |
| pickup_completed_at | TIMESTAMP | | When initial pickup was completed |
| delivered_at | TIMESTAMP | | When package was delivered to recipient |
| cancelled_at | TIMESTAMP | | When request was cancelled |
| cancellation_reason | TEXT | | Reason for cancellation |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- sender_id
- request_status
- tracking_number (UNIQUE)
- qr_code (UNIQUE)
- (pickup_country_code, delivery_country_code)
- desired_delivery_date
- selected_route_id

---

### 7. routes
**Description**: Stores possible delivery routes combining one or more trips.

**Purpose**: Represents complete paths from pickup to delivery, potentially involving multiple travelers and handoffs.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) ON DELETE CASCADE | Associated delivery request |
| route_status | ENUM('suggested', 'selected', 'confirmed', 'in_progress', 'completed', 'failed', 'cancelled') | DEFAULT 'suggested' | Current status of route |
| total_distance_km | DECIMAL(10, 2) | | Total distance of route in km |
| total_duration_hours | DECIMAL(8, 2) | | Estimated total duration in hours |
| number_of_hops | INT | NOT NULL | Number of legs/handoffs in route |
| total_cost | DECIMAL(10, 2) | NOT NULL | Total cost for this route |
| cost_currency | VARCHAR(3) | NOT NULL | Currency of cost |
| estimated_pickup_date | DATE | NOT NULL | Estimated initial pickup date |
| estimated_delivery_date | DATE | NOT NULL | Estimated final delivery date |
| risk_score | DECIMAL(5, 2) | DEFAULT 0.00 | Calculated risk score (0-100) |
| reliability_score | DECIMAL(5, 2) | DEFAULT 0.00 | Calculated reliability score (0-100) |
| route_ranking | INT | | Ranking among all routes for this request |
| includes_local_delivery | BOOLEAN | DEFAULT FALSE | Whether route includes local delivery services |
| route_summary | TEXT | | Human-readable summary of route |
| selected_at | TIMESTAMP | | When sender selected this route |
| confirmed_at | TIMESTAMP | | When all travelers confirmed |
| completed_at | TIMESTAMP | | When route was completed |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- delivery_request_id
- route_status
- (delivery_request_id, route_ranking)

---

### 8. route_legs
**Description**: Individual segments/hops of a route.

**Purpose**: Break down a route into individual legs, each handled by a traveler or local delivery service.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| route_id | UUID | FOREIGN KEY → routes(id) ON DELETE CASCADE | Parent route |
| leg_order | INT | NOT NULL | Order of this leg in the route (1, 2, 3...) |
| leg_type | ENUM('traveler_trip', 'local_delivery', 'direct_handoff') | NOT NULL | Type of leg |
| trip_id | UUID | FOREIGN KEY → trips(id) | Trip used for this leg (if traveler_trip) |
| local_delivery_service_id | UUID | FOREIGN KEY → local_delivery_services(id) | Local delivery service (if applicable) |
| handler_user_id | UUID | FOREIGN KEY → users(id) | User handling this leg |
| origin_city | VARCHAR(100) | NOT NULL | Starting city for this leg |
| origin_country | VARCHAR(100) | NOT NULL | Starting country |
| origin_country_code | VARCHAR(2) | NOT NULL | Starting country code |
| destination_city | VARCHAR(100) | NOT NULL | Ending city for this leg |
| destination_country | VARCHAR(100) | NOT NULL | Ending country |
| destination_country_code | VARCHAR(2) | NOT NULL | Ending country code |
| pickup_location | TEXT | | Specific pickup location for this leg |
| delivery_location | TEXT | | Specific delivery location for this leg |
| estimated_pickup_date | DATE | NOT NULL | Estimated pickup for this leg |
| estimated_delivery_date | DATE | NOT NULL | Estimated delivery for this leg |
| actual_pickup_date | TIMESTAMP | | Actual pickup timestamp |
| actual_delivery_date | TIMESTAMP | | Actual delivery timestamp |
| leg_cost | DECIMAL(10, 2) | NOT NULL | Cost for this specific leg |
| cost_currency | VARCHAR(3) | NOT NULL | Currency of leg cost |
| distance_km | DECIMAL(10, 2) | | Distance for this leg in km |
| leg_status | ENUM('pending', 'confirmed', 'awaiting_pickup', 'in_transit', 'delivered', 'cancelled', 'failed') | DEFAULT 'pending' | Status of this leg |
| confirmation_required | BOOLEAN | DEFAULT TRUE | Whether traveler needs to confirm |
| confirmed_at | TIMESTAMP | | When handler confirmed this leg |
| notes | TEXT | | Special notes for this leg |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- route_id
- (route_id, leg_order)
- trip_id
- handler_user_id
- leg_status

---

### 9. handoffs
**Description**: Records each physical transfer of package between parties with QR code scanning.

**Purpose**: Track chain of custody and verify legitimate transfers using QR codes.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) ON DELETE CASCADE | Package being handed off |
| route_leg_id | UUID | FOREIGN KEY → route_legs(id) | Route leg this handoff belongs to |
| handoff_type | ENUM('sender_to_traveler', 'traveler_to_traveler', 'traveler_to_local_delivery', 'local_delivery_to_traveler', 'traveler_to_recipient', 'local_delivery_to_recipient') | NOT NULL | Type of handoff |
| from_user_id | UUID | FOREIGN KEY → users(id) | User giving the package |
| to_user_id | UUID | FOREIGN KEY → users(id) | User receiving the package |
| from_service_id | UUID | FOREIGN KEY → local_delivery_services(id) | If from a delivery service |
| to_service_id | UUID | FOREIGN KEY → local_delivery_services(id) | If to a delivery service |
| qr_code_scanned | VARCHAR(500) | NOT NULL | QR code that was scanned |
| scan_timestamp | TIMESTAMP | NOT NULL DEFAULT CURRENT_TIMESTAMP | When QR was scanned |
| scan_latitude | DECIMAL(10, 8) | | GPS location of scan (latitude) |
| scan_longitude | DECIMAL(11, 8) | | GPS location of scan (longitude) |
| scan_location_name | VARCHAR(255) | | Named location of scan |
| handoff_location | TEXT | | Detailed handoff location description |
| photo_urls | JSON | | URLs to photos taken during handoff |
| package_condition | ENUM('excellent', 'good', 'fair', 'damaged', 'severely_damaged') | NOT NULL | Condition noted at handoff |
| condition_notes | TEXT | | Details about package condition |
| recipient_signature_url | VARCHAR(500) | | URL to digital signature image |
| verification_code | VARCHAR(10) | | Additional verification code if used |
| handoff_status | ENUM('pending', 'completed', 'disputed', 'failed') | DEFAULT 'completed' | Status of handoff |
| dispute_reason | TEXT | | Reason if handoff is disputed |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Handoff creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- delivery_request_id
- route_leg_id
- from_user_id
- to_user_id
- qr_code_scanned
- scan_timestamp

---

### 10. local_delivery_services
**Description**: Third-party local delivery services integrated into the platform.

**Purpose**: Enable first-mile and last-mile delivery using local courier services.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| service_name | VARCHAR(200) | NOT NULL | Name of delivery service |
| service_type | ENUM('courier', 'postal', 'freight', 'rideshare', 'other') | NOT NULL | Type of service |
| service_country | VARCHAR(100) | NOT NULL | Primary country of operation |
| service_country_code | VARCHAR(2) | NOT NULL | Country ISO code |
| operating_cities | JSON | | List of cities where service operates |
| api_endpoint | VARCHAR(500) | | API endpoint if integrated |
| api_key_encrypted | VARCHAR(500) | | Encrypted API key |
| has_api_integration | BOOLEAN | DEFAULT FALSE | Whether API integration exists |
| pricing_model | ENUM('per_km', 'flat_rate', 'weight_based', 'custom') | NOT NULL | How pricing is calculated |
| base_price | DECIMAL(10, 2) | | Base price for service |
| price_per_km | DECIMAL(10, 2) | | Price per kilometer |
| price_per_kg | DECIMAL(10, 2) | | Price per kilogram |
| pricing_currency | VARCHAR(3) | NOT NULL | Currency for pricing |
| min_delivery_time_hours | INT | | Minimum delivery time |
| max_delivery_time_hours | INT | | Maximum delivery time |
| max_weight_kg | DECIMAL(8, 2) | | Maximum weight accepted |
| max_dimensions_cm | VARCHAR(50) | | Maximum dimensions accepted |
| service_rating | DECIMAL(3, 2) | DEFAULT 0.00 | Average service rating (0-5) |
| total_deliveries | INT | DEFAULT 0 | Total deliveries completed |
| contact_email | VARCHAR(255) | | Contact email for service |
| contact_phone | VARCHAR(20) | | Contact phone for service |
| website_url | VARCHAR(500) | | Service website |
| service_status | ENUM('active', 'inactive', 'suspended') | DEFAULT 'active' | Current status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- service_country_code
- service_status
- service_name

---

### 11. traveler_statistics
**Description**: Aggregated statistics about traveler performance and history.

**Purpose**: Display traveler reliability and experience without exposing personal information.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| traveler_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE, UNIQUE | User this stat belongs to |
| total_trips_posted | INT | DEFAULT 0 | Total number of trips posted |
| total_trips_completed | INT | DEFAULT 0 | Number of trips successfully completed |
| total_trips_cancelled | INT | DEFAULT 0 | Number of trips cancelled |
| total_packages_delivered | INT | DEFAULT 0 | Total packages delivered successfully |
| total_packages_failed | INT | DEFAULT 0 | Packages that failed delivery |
| total_distance_traveled_km | DECIMAL(12, 2) | DEFAULT 0.00 | Total distance covered |
| countries_visited | JSON | | List of country codes visited |
| total_countries_count | INT | DEFAULT 0 | Number of unique countries |
| most_frequent_routes | JSON | | Most common origin-destination pairs |
| average_rating | DECIMAL(3, 2) | DEFAULT 0.00 | Average rating from senders (0-5) |
| total_reviews | INT | DEFAULT 0 | Total number of reviews received |
| five_star_reviews | INT | DEFAULT 0 | Number of 5-star reviews |
| four_star_reviews | INT | DEFAULT 0 | Number of 4-star reviews |
| three_star_reviews | INT | DEFAULT 0 | Number of 3-star reviews |
| two_star_reviews | INT | DEFAULT 0 | Number of 2-star reviews |
| one_star_reviews | INT | DEFAULT 0 | Number of 1-star reviews |
| on_time_delivery_rate | DECIMAL(5, 2) | DEFAULT 0.00 | Percentage of on-time deliveries |
| response_time_hours | DECIMAL(8, 2) | DEFAULT 0.00 | Average response time to requests |
| acceptance_rate | DECIMAL(5, 2) | DEFAULT 0.00 | Percentage of packages accepted |
| total_earnings | DECIMAL(12, 2) | DEFAULT 0.00 | Total earnings as traveler |
| earnings_currency | VARCHAR(3) | DEFAULT 'USD' | Currency of earnings |
| first_trip_date | DATE | | Date of first trip |
| last_trip_date | DATE | | Date of most recent trip |
| account_age_days | INT | DEFAULT 0 | Days since first trip |
| verified_traveler | BOOLEAN | DEFAULT FALSE | Whether identity is verified |
| reliability_score | DECIMAL(5, 2) | DEFAULT 50.00 | Calculated reliability score (0-100) |
| badges_earned | JSON | | List of achievement badges |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- traveler_id (UNIQUE)
- average_rating
- reliability_score

---

### 12. sender_statistics
**Description**: Aggregated statistics about sender activity and behavior.

**Purpose**: Track sender history and reputation for risk assessment.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| sender_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE, UNIQUE | User this stat belongs to |
| total_requests_created | INT | DEFAULT 0 | Total delivery requests created |
| total_deliveries_completed | INT | DEFAULT 0 | Successful deliveries |
| total_deliveries_failed | INT | DEFAULT 0 | Failed deliveries |
| total_deliveries_cancelled | INT | DEFAULT 0 | Cancelled by sender |
| total_amount_spent | DECIMAL(12, 2) | DEFAULT 0.00 | Total spent on deliveries |
| spending_currency | VARCHAR(3) | DEFAULT 'USD' | Currency of spending |
| average_package_value | DECIMAL(10, 2) | DEFAULT 0.00 | Average declared package value |
| countries_sent_from | JSON | | Origin countries used |
| countries_sent_to | JSON | | Destination countries used |
| most_frequent_routes | JSON | | Most used routes |
| average_rating_given | DECIMAL(3, 2) | DEFAULT 0.00 | Average rating given to travelers |
| total_reviews_given | INT | DEFAULT 0 | Total reviews given |
| dispute_rate | DECIMAL(5, 2) | DEFAULT 0.00 | Percentage of deliveries disputed |
| total_disputes | INT | DEFAULT 0 | Total disputes filed |
| payment_on_time_rate | DECIMAL(5, 2) | DEFAULT 100.00 | Percentage of on-time payments |
| first_request_date | DATE | | Date of first request |
| last_request_date | DATE | | Date of most recent request |
| account_age_days | INT | DEFAULT 0 | Days since first request |
| preferred_package_types | JSON | | Most frequently sent package types |
| trustworthiness_score | DECIMAL(5, 2) | DEFAULT 50.00 | Calculated trustworthiness (0-100) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- sender_id (UNIQUE)
- trustworthiness_score

---

### 13. reviews
**Description**: Reviews and ratings between users after delivery completion.

**Purpose**: Build trust and reputation system for both travelers and senders.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) ON DELETE CASCADE | Associated delivery |
| route_leg_id | UUID | FOREIGN KEY → route_legs(id) | Specific leg being reviewed (if applicable) |
| reviewer_id | UUID | FOREIGN KEY → users(id) | User writing the review |
| reviewee_id | UUID | FOREIGN KEY → users(id) | User being reviewed |
| reviewer_role | ENUM('sender', 'traveler', 'recipient') | NOT NULL | Role of reviewer |
| reviewee_role | ENUM('sender', 'traveler', 'recipient') | NOT NULL | Role of reviewee |
| rating | INT | NOT NULL CHECK (rating >= 1 AND rating <= 5) | Star rating (1-5) |
| review_title | VARCHAR(200) | | Short title for review |
| review_text | TEXT | | Detailed review text |
| communication_rating | INT | CHECK (communication_rating >= 1 AND communication_rating <= 5) | Communication quality (1-5) |
| punctuality_rating | INT | CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5) | Punctuality rating (1-5) |
| package_care_rating | INT | CHECK (package_care_rating >= 1 AND package_care_rating <= 5) | Package care rating (1-5) |
| professionalism_rating | INT | CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5) | Professionalism rating (1-5) |
| would_recommend | BOOLEAN | DEFAULT TRUE | Would recommend this user |
| is_public | BOOLEAN | DEFAULT TRUE | Whether review is publicly visible |
| is_verified | BOOLEAN | DEFAULT TRUE | Whether review is from verified delivery |
| helpful_count | INT | DEFAULT 0 | Number of users who found this helpful |
| reported_count | INT | DEFAULT 0 | Number of times review was reported |
| review_status | ENUM('active', 'hidden', 'removed', 'flagged') | DEFAULT 'active' | Status of review |
| response_text | TEXT | | Response from reviewee |
| responded_at | TIMESTAMP | | When reviewee responded |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Review creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- delivery_request_id
- reviewer_id
- reviewee_id
- rating
- review_status
- (reviewee_id, rating)

---

### 14. notifications
**Description**: All notifications sent to users.

**Purpose**: Keep users informed about trip updates, package status, messages, etc.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User receiving notification |
| notification_type | ENUM('trip_update', 'package_update', 'handoff_reminder', 'message_received', 'review_received', 'payment_received', 'route_found', 'booking_confirmed', 'delivery_completed', 'system_alert', 'other') | NOT NULL | Type of notification |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message content |
| related_entity_type | ENUM('trip', 'delivery_request', 'route', 'handoff', 'message', 'review', 'payment', 'user') | | Type of related entity |
| related_entity_id | UUID | | ID of related entity |
| priority | ENUM('low', 'medium', 'high', 'urgent') | DEFAULT 'medium' | Notification priority |
| is_read | BOOLEAN | DEFAULT FALSE | Whether user has read notification |
| read_at | TIMESTAMP | | When notification was read |
| is_sent_email | BOOLEAN | DEFAULT FALSE | Whether email was sent |
| is_sent_sms | BOOLEAN | DEFAULT FALSE | Whether SMS was sent |
| is_sent_push | BOOLEAN | DEFAULT FALSE | Whether push notification was sent |
| action_url | VARCHAR(500) | | Deep link or URL for action |
| action_text | VARCHAR(100) | | Text for action button |
| metadata | JSON | | Additional metadata |
| expires_at | TIMESTAMP | | When notification expires |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes**:
- user_id
- (user_id, is_read)
- notification_type
- created_at
- related_entity_id

---

### 15. messages
**Description**: Direct messages between users (sender-traveler communication).

**Purpose**: Enable communication about deliveries while maintaining platform mediation.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| conversation_id | UUID | NOT NULL | Groups messages |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) | Related delivery request |
| route_id | UUID | FOREIGN KEY → routes(id) | Related route |
| sender_user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User sending message |
| recipient_user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User receiving message |
| message_text | TEXT | NOT NULL | Message content |
| message_type | ENUM('text', 'image', 'file', 'location', 'system') | DEFAULT 'text' | Type of message |
| attachment_urls | JSON | | URLs to attachments |
| is_read | BOOLEAN | DEFAULT FALSE | Whether recipient read message |
| read_at | TIMESTAMP | | When message was read |
| is_system_message | BOOLEAN | DEFAULT FALSE | Whether automated system message |
| parent_message_id | UUID | FOREIGN KEY → messages(id) | If replying to a message |
| is_deleted_by_sender | BOOLEAN | DEFAULT FALSE | Whether sender deleted |
| is_deleted_by_recipient | BOOLEAN | DEFAULT FALSE | Whether recipient deleted |
| is_flagged | BOOLEAN | DEFAULT FALSE | Whether message was flagged |
| flag_reason | TEXT | | Reason for flagging |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Message timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- conversation_id
- delivery_request_id
- sender_user_id
- recipient_user_id
- (conversation_id, created_at)
- (recipient_user_id, is_read)

---

### 16. payments
**Description**: All payment transactions in the system.

**Purpose**: Track payments from senders to travelers and platform fees.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| payment_type | ENUM('delivery_payment', 'insurance_payment', 'platform_fee', 'refund', 'payout', 'penalty', 'other') | NOT NULL | Type of payment |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) | Associated delivery |
| route_leg_id | UUID | FOREIGN KEY → route_legs(id) | Associated route leg |
| payer_user_id | UUID | FOREIGN KEY → users(id) | User making payment |
| payee_user_id | UUID | FOREIGN KEY → users(id) | User receiving payment |
| amount | DECIMAL(12, 2) | NOT NULL | Payment amount |
| currency | VARCHAR(3) | NOT NULL | Currency code |
| payment_status | ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled', 'on_hold') | DEFAULT 'pending' | Payment status |
| payment_method | ENUM('credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer', 'wallet', 'other') | NOT NULL | Payment method used |
| payment_gateway | VARCHAR(50) | | Payment gateway used (Stripe, PayPal, etc.) |
| transaction_id | VARCHAR(255) | UNIQUE | External transaction ID |
| gateway_response | JSON | | Response from payment gateway |
| platform_fee_amount | DECIMAL(10, 2) | DEFAULT 0.00 | Platform fee charged |
| platform_fee_percentage | DECIMAL(5, 2) | DEFAULT 0.00 | Platform fee percentage |
| net_amount | DECIMAL(12, 2) | | Amount after fees |
| escrow_until | TIMESTAMP | | When payment is released from escrow |
| released_at | TIMESTAMP | | When payment was released |
| refund_amount | DECIMAL(12, 2) | | Amount refunded (if applicable) |
| refund_reason | TEXT | | Reason for refund |
| refunded_at | TIMESTAMP | | When refund was processed |
| payment_description | TEXT | | Description of payment |
| metadata | JSON | | Additional payment metadata |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Payment creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- delivery_request_id
- payer_user_id
- payee_user_id
- payment_status
- transaction_id (UNIQUE)
- created_at

---

### 17. payment_methods
**Description**: Saved payment methods for users.

**Purpose**: Store user payment information for quick checkout.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | Owner of payment method |
| method_type | ENUM('credit_card', 'debit_card', 'paypal', 'bank_account', 'wallet') | NOT NULL | Type of payment method |
| payment_gateway | VARCHAR(50) | NOT NULL | Gateway managing this method |
| gateway_customer_id | VARCHAR(255) | | Customer ID in gateway system |
| gateway_payment_method_id | VARCHAR(255) | | Payment method ID in gateway |
| card_last_four | VARCHAR(4) | | Last 4 digits of card |
| card_brand | VARCHAR(50) | | Card brand (Visa, Mastercard, etc.) |
| card_expiry_month | INT | | Card expiration month |
| card_expiry_year | INT | | Card expiration year |
| billing_address_id | UUID | FOREIGN KEY → user_addresses(id) | Billing address |
| is_default | BOOLEAN | DEFAULT FALSE | Whether this is default method |
| is_verified | BOOLEAN | DEFAULT FALSE | Whether method is verified |
| nickname | VARCHAR(100) | | User-given nickname for method |
| method_status | ENUM('active', 'expired', 'removed', 'failed_verification') | DEFAULT 'active' | Status of method |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- user_id
- method_status
- created_at

---

### 18. payout_accounts
**Description**: Payout account information for travelers to receive earnings.

**Purpose**: Store bank account/payout details for disbursing traveler earnings.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User who owns this account |
| account_type | ENUM('bank_account', 'paypal', 'stripe_connect', 'other') | NOT NULL | Type of payout account |
| payment_gateway | VARCHAR(50) | NOT NULL | Gateway managing payouts |
| gateway_account_id | VARCHAR(255) | | Account ID in gateway system |
| account_holder_name | VARCHAR(200) | NOT NULL | Name on account |
| bank_name | VARCHAR(200) | | Bank name (if bank account) |
| account_number_encrypted | VARCHAR(500) | | Encrypted account number |
| routing_number_encrypted | VARCHAR(500) | | Encrypted routing number |
| iban_encrypted | VARCHAR(500) | | Encrypted IBAN |
| swift_code | VARCHAR(20) | | SWIFT/BIC code |
| account_currency | VARCHAR(3) | NOT NULL | Account currency |
| account_country | VARCHAR(2) | NOT NULL | Country of account |
| is_verified | BOOLEAN | DEFAULT FALSE | Whether account is verified |
| verified_at | TIMESTAMP | | When account was verified |
| is_default | BOOLEAN | DEFAULT FALSE | Whether this is default payout account |
| account_status | ENUM('active', 'pending_verification', 'failed_verification', 'suspended', 'removed') | DEFAULT 'pending_verification' | Account status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- user_id
- account_status

---

### 19. disputes
**Description**: Disputes raised about deliveries.

**Purpose**: Handle conflicts and issues between users.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) ON DELETE CASCADE | Disputed delivery |
| route_leg_id | UUID | FOREIGN KEY → route_legs(id) | Specific leg in dispute |
| handoff_id | UUID | FOREIGN KEY → handoffs(id) | Specific handoff in dispute |
| dispute_raised_by | UUID | FOREIGN KEY → users(id) | User who raised dispute |
| dispute_against | UUID | FOREIGN KEY → users(id) | User being disputed |
| dispute_type | ENUM('package_damaged', 'package_lost', 'package_not_delivered', 'wrong_item', 'late_delivery', 'payment_issue', 'communication_issue', 'fraud', 'other') | NOT NULL | Type of dispute |
| dispute_status | ENUM('open', 'investigating', 'resolved', 'escalated', 'closed', 'arbitration') | DEFAULT 'open' | Current status |
| priority | ENUM('low', 'medium', 'high', 'critical') | DEFAULT 'medium' | Dispute priority |
| subject | VARCHAR(255) | | Subject of dispute |
| description | TEXT | NOT NULL | Detailed description |
| evidence_urls | JSON | | URLs to evidence (photos, documents) |
| desired_resolution | TEXT | | What disputer wants as resolution |
| refund_amount_requested | DECIMAL(10, 2) | | Refund amount if applicable |
| assigned_to_admin | UUID | FOREIGN KEY → users(id) | Admin handling dispute |
| admin_notes | TEXT | | Internal admin notes |
| resolution_notes | TEXT | | How dispute was resolved |
| resolution_action | ENUM('refund_full', 'refund_partial', 'no_refund', 'compensation', 'account_warning', 'account_suspension', 'other') | | Action taken |
| refund_amount_approved | DECIMAL(10, 2) | | Actual refund amount approved |
| opened_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When dispute was opened |
| resolved_at | TIMESTAMP | | When dispute was resolved |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- delivery_request_id
- dispute_raised_by
- dispute_against
- dispute_status
- assigned_to_admin
- created_at

---

### 20. dispute_messages
**Description**: Messages within a dispute thread.

**Purpose**: Communication between parties and admins during dispute resolution.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| dispute_id | UUID | FOREIGN KEY → disputes(id) ON DELETE CASCADE | Associated dispute |
| sender_user_id | UUID | FOREIGN KEY → users(id) | User sending message |
| message_text | TEXT | NOT NULL | Message content |
| attachment_urls | JSON | | URLs to attachments |
| is_internal | BOOLEAN | DEFAULT FALSE | Whether message is admin-only |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Message timestamp |

**Indexes**:
- dispute_id
- sender_user_id
- created_at

---

### 21. insurance_policies
**Description**: Insurance policies purchased for deliveries.

**Purpose**: Track insurance coverage for high-value packages.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) ON DELETE CASCADE | Insured delivery |
| policy_number | VARCHAR(100) | UNIQUE | Insurance policy number |
| insurance_provider | VARCHAR(200) | | Provider name |
| coverage_amount | DECIMAL(12, 2) | | Coverage amount |
| coverage_currency | VARCHAR(3) | | Currency of coverage |
| premium_amount | DECIMAL(10, 2) | | Premium paid |
| premium_currency | VARCHAR(3) | | Currency of premium |
| policy_status | ENUM('active', 'expired', 'claimed', 'cancelled') | DEFAULT 'active' | Policy status |
| coverage_start_date | DATE | NOT NULL | When coverage begins |
| coverage_end_date | DATE | | When coverage ends |
| terms_and_conditions_url | VARCHAR(500) | | URL to policy T&C |
| claim_filed | BOOLEAN | DEFAULT FALSE | Whether claim was filed |
| claim_amount | DECIMAL(12, 2) | | Claim amount requested |
| claim_status | ENUM('none', 'pending', 'approved', 'denied', 'paid') | DEFAULT 'none' | Claim status |
| claim_filed_at | TIMESTAMP | | When claim was filed |
| claim_resolved_at | TIMESTAMP | | When claim was resolved |
| claim_payout_amount | DECIMAL(12, 2) | | Amount paid out |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- delivery_request_id
- policy_number (UNIQUE)
- policy_status

---

### 22. package_categories
**Description**: Predefined categories for package types.

**Purpose**: Standardize package categorization and set restrictions.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| category_name | VARCHAR(100) | UNIQUE, NOT NULL | Name of category |
| category_slug | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly slug |
| parent_category_id | UUID | FOREIGN KEY → package_categories(id) | Parent category for hierarchy |
| description | TEXT | | Description of category |
| icon_url | VARCHAR(500) | | Icon for category |
| requires_special_handling | BOOLEAN | DEFAULT FALSE | Whether requires special care |
| is_restricted | BOOLEAN | DEFAULT FALSE | Whether has restrictions |
| restriction_notes | TEXT | | Details about restrictions |
| max_weight_recommendation_kg | DECIMAL(8, 2) | | Recommended max weight |
| insurance_recommended | BOOLEAN | DEFAULT FALSE | Whether insurance is recommended |
| typical_price_per_kg_min | DECIMAL(10, 2) | | Typical minimum price per kg |
| typical_price_per_kg_max | DECIMAL(10, 2) | | Typical maximum price per kg |
| display_order | INT | DEFAULT 0 | Order for display |
| is_active | BOOLEAN | DEFAULT TRUE | Whether category is active |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- category_slug (UNIQUE)
- parent_category_id
- is_active

---

### 23. prohibited_items
**Description**: List of items that cannot be delivered through the platform.

**Purpose**: Enforce safety and legal compliance.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| item_name | VARCHAR(200) | NOT NULL | Name of prohibited item |
| category | VARCHAR(100) | | Category of prohibition |
| prohibition_type | ENUM('always_prohibited', 'country_specific', 'airline_specific', 'conditional') | NOT NULL | Type of prohibition |
| prohibited_countries | JSON | | Countries where prohibited |
| prohibition_reason | TEXT | | Why item is prohibited |
| alternative_suggestion | TEXT | | Suggested alternatives |
| legal_reference | TEXT | | Legal statute or regulation reference |
| is_active | BOOLEAN | DEFAULT TRUE | Whether rule is active |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- prohibition_type
- is_active

---

### 24. saved_searches
**Description**: Saved search criteria for users looking for specific routes.

**Purpose**: Allow users to save searches and get alerts when matching trips are available.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User who saved search |
| search_name | VARCHAR(200) | | User-given name for search |
| origin_city | VARCHAR(100) | | Origin city for search |
| origin_country_code | VARCHAR(2) | | Origin country code |
| destination_city | VARCHAR(100) | | Destination city for search |
| destination_country_code | VARCHAR(2) | | Destination country code |
| departure_date_from | DATE | | Earliest departure date |
| departure_date_to | DATE | | Latest departure date |
| max_budget | DECIMAL(10, 2) | | Maximum budget |
| budget_currency | VARCHAR(3) | | Currency for budget |
| package_weight | DECIMAL(8, 2) | | Expected package weight |
| package_type | VARCHAR(50) | | Type of package |
| alerts_enabled | BOOLEAN | DEFAULT TRUE | Whether to send alerts |
| alert_frequency | ENUM('immediate', 'daily', 'weekly') | DEFAULT 'immediate' | How often to send alerts |
| last_notified_at | TIMESTAMP | | Last time alert was sent |
| is_active | BOOLEAN | DEFAULT TRUE | Whether search is active |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- user_id
- (origin_country_code, destination_country_code)
- is_active

---

### 25. favorites
**Description**: Favorite travelers saved by senders.

**Purpose**: Allow users to bookmark preferred travelers for future shipments.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User who favorited |
| favorited_user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User being favorited |
| notes | TEXT | | Personal notes about this traveler |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When favorited |

**Indexes**:
- user_id
- favorited_user_id
- (user_id, favorited_user_id) UNIQUE

---

### 26. blocked_users
**Description**: Users blocked by other users.

**Purpose**: Allow users to prevent interactions with specific users.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User doing the blocking |
| blocked_user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User being blocked |
| block_reason | TEXT | | Reason for blocking |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When blocked |

**Indexes**:
- user_id
- blocked_user_id
- (user_id, blocked_user_id) UNIQUE

---

### 27. support_tickets
**Description**: Customer support tickets.

**Purpose**: Handle user support requests and issues.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| ticket_number | VARCHAR(50) | UNIQUE | Human-readable ticket number |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User who created ticket |
| subject | VARCHAR(255) | NOT NULL | Ticket subject |
| description | TEXT | NOT NULL | Detailed description |
| category | ENUM('technical', 'account', 'payment', 'delivery', 'report_user', 'feature_request', 'other') | NOT NULL | Ticket category |
| priority | ENUM('low', 'medium', 'high', 'urgent') | DEFAULT 'medium' | Ticket priority |
| status | ENUM('open', 'in_progress', 'waiting_user', 'resolved', 'closed') | DEFAULT 'open' | Ticket status |
| assigned_to | UUID | FOREIGN KEY → users(id) | Support agent assigned |
| related_entity_type | VARCHAR(50) | | Type of related entity |
| related_entity_id | UUID | | ID of related entity |
| resolution_notes | TEXT | | How ticket was resolved |
| satisfaction_rating | INT | CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5) | User's satisfaction rating |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| resolved_at | TIMESTAMP | | When resolved |
| closed_at | TIMESTAMP | | When closed |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- ticket_number (UNIQUE)
- user_id
- status
- assigned_to
- created_at

---

### 28. support_ticket_messages
**Description**: Messages in support ticket threads.

**Purpose**: Communication between user and support agents.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| ticket_id | UUID | FOREIGN KEY → support_tickets(id) ON DELETE CASCADE | Associated ticket |
| sender_user_id | UUID | FOREIGN KEY → users(id) | User sending message |
| message_text | TEXT | NOT NULL | Message content |
| attachment_urls | JSON | | URLs to attachments |
| is_internal_note | BOOLEAN | DEFAULT FALSE | Whether note is internal only |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Message timestamp |

**Indexes**:
- ticket_id
- sender_user_id
- created_at

---

### 29. app_settings
**Description**: System-wide application settings and configurations.

**Purpose**: Store configurable parameters for the application.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| setting_key | VARCHAR(100) | UNIQUE, NOT NULL | Setting identifier key |
| setting_value | TEXT | | Setting value |
| value_type | ENUM('string', 'integer', 'float', 'boolean', 'json') | NOT NULL | Data type of value |
| category | VARCHAR(100) | | Category for grouping settings |
| description | TEXT | | Description of setting |
| is_public | BOOLEAN | DEFAULT FALSE | Whether exposed to frontend |
| is_editable | BOOLEAN | DEFAULT TRUE | Whether admins can edit |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- setting_key (UNIQUE)
- category

---

### 30. email_templates
**Description**: Email templates for various notifications.

**Purpose**: Manage email content for different types of notifications.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| template_name | VARCHAR(100) | UNIQUE, NOT NULL | Template identifier |
| subject_template | VARCHAR(500) | NOT NULL | Email subject line template |
| body_template_html | TEXT | | HTML email body template |
| body_template_text | TEXT | | Plain text email body template |
| template_variables | JSON | | List of available variables |
| category | VARCHAR(100) | | Template category |
| language | VARCHAR(10) | DEFAULT 'en' | Language of template |
| is_active | BOOLEAN | DEFAULT TRUE | Whether template is active |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- template_name (UNIQUE)
- category
- language

---

### 31. audit_logs
**Description**: Audit trail of important system actions.

**Purpose**: Track all significant actions for security and compliance.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) | User who performed action |
| action_type | VARCHAR(100) | NOT NULL | Type of action performed |
| entity_type | VARCHAR(100) | | Type of entity affected |
| entity_id | UUID | | ID of entity affected |
| old_values | JSON | | Previous values (for updates) |
| new_values | JSON | | New values (for updates) |
| ip_address | VARCHAR(45) | | IP address of user |
| user_agent | TEXT | | Browser user agent |
| request_id | VARCHAR(100) | | Request ID for correlation |
| success | BOOLEAN | DEFAULT TRUE | Whether action succeeded |
| error_message | TEXT | | Error message if failed |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Action timestamp |

**Indexes**:
- user_id
- action_type
- entity_type
- entity_id
- created_at

---

### 32. countries
**Description**: List of countries with delivery service availability.

**Purpose**: Manage country-specific information and service availability.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| country_code | VARCHAR(2) | UNIQUE, NOT NULL | ISO 2-letter country code |
| country_name | VARCHAR(100) | NOT NULL | Full country name |
| currency_code | VARCHAR(3) | | Default currency for country |
| flag_emoji | VARCHAR(10) | | Flag emoji |
| phone_prefix | VARCHAR(10) | | International phone prefix |
| is_service_available | BOOLEAN | DEFAULT TRUE | Whether service operates in country |
| popular_routes | JSON | | Popular destination countries |
| shipping_restrictions | TEXT | | Country-specific shipping restrictions |
| customs_information | TEXT | | Customs and duty information |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- country_code (UNIQUE)
- is_service_available

---

### 33. cities
**Description**: Major cities where service is available.

**Purpose**: Provide city-level data for route planning and pricing.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| city_name | VARCHAR(100) | NOT NULL | City name |
| country_code | VARCHAR(2) | NOT NULL | Country code |
| state_province | VARCHAR(100) | | State/province |
| latitude | DECIMAL(10, 8) | | City center latitude |
| longitude | DECIMAL(11, 8) | | City center longitude |
| timezone | VARCHAR(50) | | IANA timezone identifier |
| population | INT | | City population |
| is_major_hub | BOOLEAN | DEFAULT FALSE | Whether city is a major hub |
| airport_codes | JSON | | List of airport codes |
| is_active | BOOLEAN | DEFAULT TRUE | Whether service is available |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- (city_name, country_code)
- country_code
- is_major_hub
- is_active

---

### 34. route_search_cache
**Description**: Cached route search results for performance.

**Purpose**: Store pre-calculated routes to speed up search queries.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| search_hash | VARCHAR(64) | UNIQUE | Hash of search parameters |
| origin_city | VARCHAR(100) | NOT NULL | Origin city |
| origin_country_code | VARCHAR(2) | NOT NULL | Origin country |
| destination_city | VARCHAR(100) | NOT NULL | Destination city |
| destination_country_code | VARCHAR(2) | NOT NULL | Destination country |
| departure_date | DATE | NOT NULL | Departure date |
| cached_routes | JSON | NOT NULL | Serialized route data |
| result_count | INT | DEFAULT 0 | Number of routes found |
| cache_expires_at | TIMESTAMP | NOT NULL | When cache expires |
| hit_count | INT | DEFAULT 0 | Number of times cache was used |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes**:
- search_hash (UNIQUE)
- cache_expires_at
- (origin_country_code, destination_country_code, departure_date)

---

### 35. promo_codes
**Description**: Promotional codes and discounts.

**Purpose**: Manage promotional campaigns and discount codes.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| code | VARCHAR(50) | UNIQUE, NOT NULL | Promo code text |
| description | TEXT | | Description of promotion |
| discount_type | ENUM('percentage', 'fixed_amount', 'free_shipping') | NOT NULL | Type of discount |
| discount_value | DECIMAL(10, 2) | NOT NULL | Discount amount or percentage |
| discount_currency | VARCHAR(3) | | Currency if fixed amount |
| min_order_value | DECIMAL(10, 2) | | Minimum order value to use code |
| max_discount_amount | DECIMAL(10, 2) | | Maximum discount cap |
| usage_limit_total | INT | | Total number of times code can be used |
| usage_limit_per_user | INT | DEFAULT 1 | Times each user can use code |
| times_used | INT | DEFAULT 0 | Number of times code has been used |
| valid_from | TIMESTAMP | NOT NULL | When code becomes valid |
| valid_until | TIMESTAMP | NOT NULL | When code expires |
| applicable_to | ENUM('all', 'new_users', 'returning_users') | DEFAULT 'all' | Who can use code |
| country_restrictions | JSON | | Countries where code is valid |
| is_active | BOOLEAN | DEFAULT TRUE | Whether code is active |
| created_by | UUID | FOREIGN KEY → users(id) | Admin who created code |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- code (UNIQUE)
- is_active
- (valid_from, valid_until)

---

### 36. promo_code_usage
**Description**: Track usage of promotional codes.

**Purpose**: Record when and by whom promo codes are used.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| promo_code_id | UUID | FOREIGN KEY → promo_codes(id) | Promo code used |
| user_id | UUID | FOREIGN KEY → users(id) | User who used code |
| delivery_request_id | UUID | FOREIGN KEY → delivery_requests(id) | Associated delivery |
| payment_id | UUID | FOREIGN KEY → payments(id) | Associated payment |
| discount_applied | DECIMAL(10, 2) | NOT NULL | Actual discount amount |
| discount_currency | VARCHAR(3) | NOT NULL | Currency of discount |
| used_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When code was used |

**Indexes**:
- promo_code_id
- user_id
- delivery_request_id
- used_at

---

### 37. referrals
**Description**: User referral tracking.

**Purpose**: Track referral programs and rewards.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| referrer_user_id | UUID | FOREIGN KEY → users(id) | User who referred |
| referred_user_id | UUID | FOREIGN KEY → users(id) | User who was referred |
| referral_code | VARCHAR(50) | | Referral code used |
| referral_status | ENUM('pending', 'completed', 'rewarded', 'expired') | DEFAULT 'pending' | Status of referral |
| reward_type | ENUM('credit', 'discount', 'free_delivery', 'other') | | Type of reward |
| reward_value | DECIMAL(10, 2) | | Value of reward |
| reward_currency | VARCHAR(3) | | Currency of reward |
| referrer_rewarded | BOOLEAN | DEFAULT FALSE | Whether referrer got reward |
| referred_rewarded | BOOLEAN | DEFAULT FALSE | Whether referred got reward |
| completed_at | TIMESTAMP | | When referral was completed |
| rewarded_at | TIMESTAMP | | When rewards were given |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes**:
- referrer_user_id
- referred_user_id
- referral_code
- referral_status

---

### 38. user_sessions
**Description**: Active user sessions for authentication.

**Purpose**: Manage user login sessions and tokens.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User for this session |
| session_token | VARCHAR(500) | UNIQUE | Session token |
| refresh_token | VARCHAR(500) | UNIQUE | Refresh token |
| device_type | VARCHAR(50) | | Device type (mobile, web, tablet) |
| device_name | VARCHAR(200) | | Device name/model |
| os_name | VARCHAR(50) | | Operating system |
| os_version | VARCHAR(50) | | OS version |
| browser_name | VARCHAR(50) | | Browser name |
| browser_version | VARCHAR(50) | | Browser version |
| ip_address | VARCHAR(45) | | IP address |
| user_agent | TEXT | | Full user agent string |
| last_activity_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last activity timestamp |
| expires_at | TIMESTAMP | NOT NULL | When session expires |
| is_active | BOOLEAN | DEFAULT TRUE | Whether session is active |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes**:
- user_id
- session_token (UNIQUE)
- refresh_token (UNIQUE)
- is_active
- expires_at

---

### 39. fcm_tokens
**Description**: Firebase Cloud Messaging tokens for push notifications.

**Purpose**: Store device tokens for sending push notifications.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User who owns token |
| fcm_token | VARCHAR(500) | UNIQUE, NOT NULL | FCM device token |
| device_type | ENUM('ios', 'android', 'web') | NOT NULL | Platform type |
| device_id | VARCHAR(255) | | Unique device identifier |
| is_active | BOOLEAN | DEFAULT TRUE | Whether token is active |
| last_used_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last time token was used |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Token registration timestamp |

**Indexes**:
- user_id
- fcm_token (UNIQUE)
- is_active

---

### 40. withdrawal_requests
**Description**: Traveler requests to withdraw earnings.

**Purpose**: Track payout requests from travelers.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User requesting withdrawal |
| payout_account_id | UUID | FOREIGN KEY → payout_accounts(id) | Account for payout |
| request_status | ENUM('pending', 'processing', 'completed', 'rejected', 'cancelled') | DEFAULT 'pending' | Status of request |
| amount_requested | DECIMAL(12, 2) | NOT NULL | Amount to withdraw |
| amount_currency | VARCHAR(3) | | Currency of withdrawal |
| processing_fee | DECIMAL(10, 2) | DEFAULT 0.00 | Fee charged |
| net_amount | DECIMAL(12, 2) | | Amount after fees |
| payment_method | VARCHAR(100) | | Method used for payout |
| transaction_id | VARCHAR(255) | | External transaction ID |
| rejection_reason | TEXT | | Reason if rejected |
| processed_at | TIMESTAMP | | When processed |
| completed_at | TIMESTAMP | | When completed |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Request timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- user_id
- payout_account_id
- request_status
- created_at

---

### 41. platform_fees
**Description**: Platform fee configurations.

**Purpose**: Define fee structures for different transaction types.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| fee_name | VARCHAR(100) | NOT NULL | Name of fee |
| fee_type | ENUM('traveler_commission', 'sender_service_fee', 'payment_processing', 'insurance', 'other') | NOT NULL | Type of fee |
| calculation_method | ENUM('percentage', 'flat_rate', 'tiered', 'hybrid') | NOT NULL | How fee is calculated |
| percentage_value | DECIMAL(5, 2) | | Percentage if applicable |
| flat_rate_amount | DECIMAL(10, 2) | | Flat amount if applicable |
| fee_currency | VARCHAR(3) | | Currency for flat rate |
| min_fee | DECIMAL(10, 2) | | Minimum fee to charge |
| max_fee | DECIMAL(10, 2) | | Maximum fee to charge |
| applies_to_countries | JSON | | Countries where fee applies (null = all) |
| tier_structure | JSON | | Tier definitions if tiered |
| is_active | BOOLEAN | DEFAULT TRUE | Whether fee is active |
| effective_from | DATE | NOT NULL | When fee becomes effective |
| effective_until | DATE | | When fee expires |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- fee_type
- is_active
- (effective_from, effective_until)

---

### 42. badges
**Description**: Achievement badges that users can earn.

**Purpose**: Gamification and reputation building.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| badge_name | VARCHAR(100) | UNIQUE, NOT NULL | Badge name |
| badge_slug | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly identifier |
| description | TEXT | | What badge represents |
| icon_url | VARCHAR(500) | | Badge icon image |
| badge_type | ENUM('traveler', 'sender', 'both') | NOT NULL | Who can earn badge |
| earning_criteria | JSON | | Criteria to earn badge |
| tier | ENUM('bronze', 'silver', 'gold', 'platinum', 'special') | | Badge tier/level |
| points_value | INT | DEFAULT 0 | Points awarded for earning |
| display_order | INT | DEFAULT 0 | Order for display |
| is_active | BOOLEAN | DEFAULT TRUE | Whether badge can be earned |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- badge_slug (UNIQUE)
- badge_type
- is_active

---

### 43. user_badges
**Description**: Badges earned by users.

**Purpose**: Track which users have earned which badges.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | User who earned badge |
| badge_id | UUID | FOREIGN KEY → badges(id) | Badge earned |
| earned_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When badge was earned |
| is_displayed | BOOLEAN | DEFAULT TRUE | Whether user displays this badge |

**Indexes**:
- user_id
- badge_id
- (user_id, badge_id) UNIQUE
- earned_at

---

### 44. traveler_availability
**Description**: Recurring trip patterns for travelers.

**Purpose**: Allow travelers to indicate regular routes they travel.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| traveler_id | UUID | FOREIGN KEY → users(id) ON DELETE CASCADE | Traveler user |
| origin_city | VARCHAR(100) | NOT NULL | Origin city |
| origin_country_code | VARCHAR(2) | NOT NULL | Origin country |
| destination_city | VARCHAR(100) | NOT NULL | Destination city |
| destination_country_code | VARCHAR(2) | NOT NULL | Destination country |
| frequency | ENUM('one_time', 'weekly', 'monthly', 'quarterly', 'irregular') | NOT NULL | How often they travel |
| typical_months | JSON | | Months when they travel |
| notes | TEXT | | Additional notes |
| is_active | BOOLEAN | DEFAULT TRUE | Whether availability is active |
| notify_on_requests | BOOLEAN | DEFAULT TRUE | Notify when requests match |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes**:
- traveler_id
- (origin_country_code, destination_country_code)
- is_active

---

### 45. currency_exchange_rates
**Description**: Currency exchange rates for price calculations.

**Purpose**: Convert prices between different currencies.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| from_currency | VARCHAR(3) | NOT NULL | Source currency code |
| to_currency | VARCHAR(3) | NOT NULL | Target currency code |
| exchange_rate | DECIMAL(18, 8) | NOT NULL | Exchange rate |
| rate_date | DATE | NOT NULL | Date of exchange rate |
| source | VARCHAR(100) | | Data source (API, manual, etc.) |
| is_active | BOOLEAN | DEFAULT TRUE | Whether rate is current |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes**:
- (from_currency, to_currency, rate_date)
- is_active

---

## Relationships Summary

### Primary Relationships:
- **users** → trips (one-to-many)
- **users** → delivery_requests (one-to-many)
- **trips** → route_legs (one-to-many through routes)
- **delivery_requests** → routes (one-to-many)
- **routes** → route_legs (one-to-many)
- **route_legs** → handoffs (one-to-many)
- **delivery_requests** → handoffs (one-to-many)
- **users** ← traveler_statistics (one-to-one)
- **users** ← sender_statistics (one-to-one)
- **users** → reviews (one-to-many as both reviewer and reviewee)

### Supporting Relationships:
- **users** → user_addresses (one-to-many)
- **users** → payment_methods (one-to-many)
- **users** → payout_accounts (one-to-many)
- **users** → notifications (one-to-many)
- **users** → messages (one-to-many as both sender and recipient)
- **delivery_requests** → payments (one-to-many)
- **delivery_requests** → disputes (one-to-many)
- **delivery_requests** → insurance_policies (one-to-one)

---

## Notes on Implementation

### Data Security:
- Sensitive fields (passwords, payment info, account numbers) must be encrypted
- Personal information should be access-controlled
- Audit logs should track all sensitive operations

### Performance Considerations:
- Indexes are crucial for search performance
- Route calculation should be cached
- Consider partitioning large tables (handoffs, notifications) by date

### Scalability:
- Use UUID for primary keys to enable distributed systems
- JSON columns allow flexibility for evolving requirements
- Consider read replicas for heavy read operations

### Data Integrity:
- Foreign key constraints ensure referential integrity
- Enum types enforce valid state transitions
- Triggers can maintain aggregate statistics tables

### Privacy Compliance:
- Support GDPR right to erasure (CASCADE deletes)
- Anonymize data after certain periods
- Separate PII from operational data where possible

---

## Future Enhancements to Consider

1. **Geofencing**: Add tables for geofence zones to trigger location-based actions
2. **Chat Media**: Separate table for message attachments with virus scanning status
3. **Trip Templates**: Allow travelers to save trip templates for recurring routes
4. **Package Photos**: Track photos at each handoff for proof of condition
5. **Smart Routing**: ML-based route scoring and recommendation tables
6. **Multi-currency Wallets**: User balance tables for multiple currencies
7. **Subscription Plans**: Premium memberships for frequent users
8. **API Keys**: If exposing API to third parties
9. **Webhooks**: For external system integrations
10. **A/B Testing**: Tables to track experiments and feature flags

---

**Version**: 1.0  
**Last Updated**: 2025-10-14  
**Database Type**: MySQL/PostgreSQL compatible schema
