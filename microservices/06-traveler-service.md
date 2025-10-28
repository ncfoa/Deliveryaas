# Traveler Service

## Overview
The Traveler Service manages traveler profiles, trip creation, and traveler-specific features. It handles traveler registration, trip planning, and traveler verification processes.

## Purpose
- Traveler profile management
- Trip creation and planning
- Traveler verification and validation
- Traveler-specific features and preferences

## Data Ownership
- `traveller_profiles` - Traveler-specific profile information
- `trips` - Traveler trip records
- `trip_legs` - Individual trip segments
- `trip_constraints` - Trip-specific constraints and requirements

## API Endpoints

### 1. Create Traveler Profile
**POST** `/travelers`

Creates a new traveler profile with specific traveler information.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "traveler_type": "frequent",
  "preferred_airlines": ["AC", "WS", "UA"],
  "preferred_airports": ["YUL", "YYZ", "JFK"],
  "travel_frequency": "monthly",
  "max_package_weight": 50.0,
  "max_package_dimensions": {
    "length": 100,
    "width": 80,
    "height": 60
  },
  "preferred_destinations": ["LHR", "CDG", "FRA"],
  "languages": ["en", "fr", "es"],
  "special_requirements": ["wheelchair_access", "pet_friendly"],
  "insurance_preference": "comprehensive",
  "emergency_contact": {
    "name": "Jane Doe",
    "phone": "+1234567890",
    "relationship": "spouse"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "traveler_type": "frequent",
  "preferred_airlines": ["AC", "WS", "UA"],
  "preferred_airports": ["YUL", "YYZ", "JFK"],
  "travel_frequency": "monthly",
  "max_package_weight": 50.0,
  "max_package_dimensions": {
    "length": 100,
    "width": 80,
    "height": 60
  },
  "preferred_destinations": ["LHR", "CDG", "FRA"],
  "languages": ["en", "fr", "es"],
  "special_requirements": ["wheelchair_access", "pet_friendly"],
  "insurance_preference": "comprehensive",
  "emergency_contact": {
    "name": "Jane Doe",
    "phone": "+1234567890",
    "relationship": "spouse"
  },
  "is_verified": false,
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/travelers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "traveler_type": "frequent",
    "preferred_airlines": ["AC", "WS", "UA"],
    "preferred_airports": ["YUL", "YYZ", "JFK"],
    "travel_frequency": "monthly",
    "max_package_weight": 50.0,
    "max_package_dimensions": {
      "length": 100,
      "width": 80,
      "height": 60
    },
    "preferred_destinations": ["LHR", "CDG", "FRA"],
    "languages": ["en", "fr", "es"],
    "special_requirements": ["wheelchair_access", "pet_friendly"],
    "insurance_preference": "comprehensive"
  }'
```

### 2. Get Traveler Profile
**GET** `/travelers/{id}`

Retrieves a traveler profile by ID.

**Path Parameters:**
- `id` (string, required): Traveler profile UUID

**Query Parameters:**
- `include_trips` (boolean, optional): Include recent trips
- `include_stats` (boolean, optional): Include traveler statistics

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "traveler_type": "frequent",
  "preferred_airlines": ["AC", "WS", "UA"],
  "preferred_airports": ["YUL", "YYZ", "JFK"],
  "travel_frequency": "monthly",
  "max_package_weight": 50.0,
  "max_package_dimensions": {
    "length": 100,
    "width": 80,
    "height": 60
  },
  "preferred_destinations": ["LHR", "CDG", "FRA"],
  "languages": ["en", "fr", "es"],
  "special_requirements": ["wheelchair_access", "pet_friendly"],
  "insurance_preference": "comprehensive",
  "emergency_contact": {
    "name": "Jane Doe",
    "phone": "+1234567890",
    "relationship": "spouse"
  },
  "is_verified": true,
  "verification_status": "verified",
  "stats": {
    "total_trips": 15,
    "successful_deliveries": 45,
    "average_rating": 4.8,
    "total_distance_km": 125000
  },
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000?include_trips=true&include_stats=true"
```

### 3. Create Trip
**POST** `/travelers/{id}/trips`

Creates a new trip for a traveler.

**Path Parameters:**
- `id` (string, required): Traveler profile UUID

**Request Body:**
```json
{
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "departure_date": "2024-02-15",
  "return_date": "2024-02-22",
  "airline_preference": "AC",
  "class_preference": "economy",
  "max_packages": 3,
  "max_weight_per_package": 25.0,
  "max_dimensions_per_package": {
    "length": 80,
    "width": 60,
    "height": 40
  },
  "special_requirements": ["fragile_handling"],
  "insurance_required": true,
  "notes": "Prefer morning flights"
}
```

**Response:**
```json
{
  "id": "uuid",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "departure_date": "2024-02-15",
  "return_date": "2024-02-22",
  "airline_preference": "AC",
  "class_preference": "economy",
  "max_packages": 3,
  "max_weight_per_package": 25.0,
  "max_dimensions_per_package": {
    "length": 80,
    "width": 60,
    "height": 40
  },
  "special_requirements": ["fragile_handling"],
  "insurance_required": true,
  "notes": "Prefer morning flights",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "departure_date": "2024-02-15",
    "return_date": "2024-02-22",
    "airline_preference": "AC",
    "class_preference": "economy",
    "max_packages": 3,
    "max_weight_per_package": 25.0,
    "special_requirements": ["fragile_handling"],
    "insurance_required": true,
    "notes": "Prefer morning flights"
  }'
```

### 4. Get Traveler Trips
**GET** `/travelers/{id}/trips`

Retrieves trips for a specific traveler.

**Path Parameters:**
- `id` (string, required): Traveler profile UUID

**Query Parameters:**
- `status` (string, optional): Filter by trip status
- `limit` (integer, optional): Number of trips to return (default: 20)
- `offset` (integer, optional): Number of trips to skip (default: 0)

**Response:**
```json
{
  "trips": [
    {
      "id": "uuid",
      "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "departure_date": "2024-02-15",
      "return_date": "2024-02-22",
      "airline_preference": "AC",
      "class_preference": "economy",
      "max_packages": 3,
      "max_weight_per_package": 25.0,
      "special_requirements": ["fragile_handling"],
      "insurance_required": true,
      "status": "active",
      "packages_count": 2,
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000/trips?status=active&limit=10"
```

### 5. Update Trip
**PUT** `/travelers/{traveler_id}/trips/{trip_id}`

Updates an existing trip.

**Path Parameters:**
- `traveler_id` (string, required): Traveler profile UUID
- `trip_id` (string, required): Trip UUID

**Request Body:**
```json
{
  "max_packages": 5,
  "max_weight_per_package": 30.0,
  "special_requirements": ["fragile_handling", "temperature_controlled"],
  "notes": "Updated requirements for fragile items"
}
```

**Response:**
```json
{
  "id": "uuid",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "departure_date": "2024-02-15",
  "return_date": "2024-02-22",
  "airline_preference": "AC",
  "class_preference": "economy",
  "max_packages": 5,
  "max_weight_per_package": 30.0,
  "max_dimensions_per_package": {
    "length": 80,
    "width": 60,
    "height": 40
  },
  "special_requirements": ["fragile_handling", "temperature_controlled"],
  "insurance_required": true,
  "notes": "Updated requirements for fragile items",
  "status": "active",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000/trips/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "max_packages": 5,
    "max_weight_per_package": 30.0,
    "special_requirements": ["fragile_handling", "temperature_controlled"],
    "notes": "Updated requirements for fragile items"
  }'
```

### 6. Cancel Trip
**DELETE** `/travelers/{traveler_id}/trips/{trip_id}`

Cancels an existing trip.

**Path Parameters:**
- `traveler_id` (string, required): Traveler profile UUID
- `trip_id` (string, required): Trip UUID

**Request Body:**
```json
{
  "reason": "schedule_change",
  "notes": "Flight schedule changed, unable to accommodate packages"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "cancelled",
  "cancelled_at": "2024-01-15T14:30:00Z",
  "cancellation_reason": "schedule_change",
  "notes": "Flight schedule changed, unable to accommodate packages"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000/trips/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reason": "schedule_change",
    "notes": "Flight schedule changed, unable to accommodate packages"
  }'
```

### 7. Get Traveler Statistics
**GET** `/travelers/{id}/stats`

Retrieves statistics for a specific traveler.

**Path Parameters:**
- `id` (string, required): Traveler profile UUID

**Query Parameters:**
- `period` (string, optional): Time period for statistics (monthly, yearly, all_time)
- `include_ratings` (boolean, optional): Include rating statistics

**Response:**
```json
{
  "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
  "period": "all_time",
  "stats": {
    "total_trips": 15,
    "successful_deliveries": 45,
    "failed_deliveries": 2,
    "total_distance_km": 125000,
    "average_rating": 4.8,
    "total_earnings": 2500.00,
    "currency": "CAD",
    "favorite_destinations": ["LHR", "CDG", "FRA"],
    "favorite_airlines": ["AC", "WS", "UA"]
  },
  "ratings": {
    "average_rating": 4.8,
    "total_ratings": 45,
    "rating_breakdown": {
      "5_star": 38,
      "4_star": 5,
      "3_star": 2,
      "2_star": 0,
      "1_star": 0
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000/stats?period=yearly&include_ratings=true"
```

### 8. Update Traveler Preferences
**PUT** `/travelers/{id}/preferences`

Updates traveler preferences and settings.

**Path Parameters:**
- `id` (string, required): Traveler profile UUID

**Request Body:**
```json
{
  "preferred_airlines": ["AC", "WS", "UA", "DL"],
  "preferred_airports": ["YUL", "YYZ", "JFK", "LAX"],
  "travel_frequency": "weekly",
  "max_package_weight": 60.0,
  "preferred_destinations": ["LHR", "CDG", "FRA", "MAD"],
  "languages": ["en", "fr", "es", "de"],
  "special_requirements": ["wheelchair_access", "pet_friendly", "fragile_handling"],
  "insurance_preference": "premium"
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "traveler_type": "frequent",
  "preferred_airlines": ["AC", "WS", "UA", "DL"],
  "preferred_airports": ["YUL", "YYZ", "JFK", "LAX"],
  "travel_frequency": "weekly",
  "max_package_weight": 60.0,
  "max_package_dimensions": {
    "length": 100,
    "width": 80,
    "height": 60
  },
  "preferred_destinations": ["LHR", "CDG", "FRA", "MAD"],
  "languages": ["en", "fr", "es", "de"],
  "special_requirements": ["wheelchair_access", "pet_friendly", "fragile_handling"],
  "insurance_preference": "premium",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/travelers/550e8400-e29b-41d4-a716-446655440000/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "preferred_airlines": ["AC", "WS", "UA", "DL"],
    "preferred_airports": ["YUL", "YYZ", "JFK", "LAX"],
    "travel_frequency": "weekly",
    "max_package_weight": 60.0,
    "preferred_destinations": ["LHR", "CDG", "FRA", "MAD"],
    "languages": ["en", "fr", "es", "de"],
    "special_requirements": ["wheelchair_access", "pet_friendly", "fragile_handling"],
    "insurance_preference": "premium"
  }'
```

## Database Tables

### traveller_profiles
Traveler-specific profile information and preferences.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| traveler_type | text | Type of traveler (frequent, occasional, business) |
| preferred_airlines | text[] | Array of preferred airline codes |
| preferred_airports | text[] | Array of preferred airport codes |
| travel_frequency | text | How often the traveler travels |
| max_package_weight | decimal | Maximum package weight in kg |
| max_package_dimensions | jsonb | Maximum package dimensions |
| preferred_destinations | text[] | Array of preferred destination airports |
| languages | text[] | Array of spoken languages |
| special_requirements | text[] | Array of special requirements |
| insurance_preference | text | Insurance preference level |
| emergency_contact | jsonb | Emergency contact information |
| is_verified | boolean | Whether traveler is verified |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### trips
Traveler trip records and details.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| traveler_id | uuid | Foreign key to traveller_profiles table |
| origin_airport | text | Origin airport code |
| destination_airport | text | Destination airport code |
| departure_date | date | Departure date |
| return_date | date | Return date (nullable) |
| airline_preference | text | Preferred airline |
| class_preference | text | Preferred class |
| max_packages | integer | Maximum number of packages |
| max_weight_per_package | decimal | Maximum weight per package in kg |
| max_dimensions_per_package | jsonb | Maximum dimensions per package |
| special_requirements | text[] | Array of special requirements |
| insurance_required | boolean | Whether insurance is required |
| notes | text | Additional notes |
| status | text | Trip status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### trip_legs
Individual segments of a trip.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| trip_id | uuid | Foreign key to trips table |
| leg_number | integer | Leg number in the trip |
| origin_airport | text | Origin airport code |
| destination_airport | text | Destination airport code |
| departure_date | date | Departure date |
| arrival_date | date | Arrival date |
| airline | text | Airline code |
| flight_number | text | Flight number |
| class | text | Class of service |
| status | text | Leg status |
| created_at | timestamptz | Creation timestamp |

### trip_constraints
Trip-specific constraints and requirements.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| trip_id | uuid | Foreign key to trips table |
| constraint_type | text | Type of constraint |
| constraint_value | jsonb | Constraint value |
| is_required | boolean | Whether constraint is required |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Traveler Profile Management
- Comprehensive traveler profiles
- Preference management
- Verification status tracking
- Emergency contact information

### 2. Trip Planning
- Trip creation and management
- Multi-leg trip support
- Constraint management
- Special requirements handling

### 3. Statistics and Analytics
- Traveler performance metrics
- Rating and review tracking
- Earnings and distance tracking
- Destination and airline preferences

### 4. Verification System
- Traveler verification process
- Document verification
- Identity validation
- Trust score calculation

## Security Considerations

- Traveler data is encrypted
- Emergency contacts are protected
- Trip information is secure
- Verification data is confidential

## Integration Points

- **User Service**: User account integration
- **Profile Service**: Profile information sharing
- **Trip Search Service**: Trip matching and search
- **Verification Service**: Traveler verification

## Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "error": "traveler_not_found",
  "message": "Traveler profile not found"
}
```

**400 Bad Request:**
```json
{
  "error": "invalid_trip_data",
  "message": "Invalid trip data provided",
  "details": {
    "field": "departure_date",
    "issue": "Departure date must be in the future"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "trip_cancellation_not_allowed",
  "message": "Trip cannot be cancelled at this time",
  "details": {
    "reason": "Packages already assigned",
    "cancellation_deadline": "2024-02-10T00:00:00Z"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "verification_required",
  "message": "Traveler verification required",
  "details": {
    "verification_level": "standard",
    "required_documents": ["passport", "drivers_license"]
  }
}
```

## Rate Limiting

- Trip creation: 10 per day per traveler
- Profile updates: 20 per hour per traveler
- Statistics requests: 100 per hour per traveler
- Preference updates: 50 per hour per traveler

## Traveler Types

### 1. Frequent Traveler
- High travel frequency
- Premium features
- Priority support
- Enhanced insurance

### 2. Occasional Traveler
- Standard features
- Basic support
- Standard insurance
- Regular pricing

### 3. Business Traveler
- Corporate features
- Business support
- Corporate insurance
- Volume discounts

### 4. New Traveler
- Onboarding support
- Basic features
- Standard insurance
- Learning resources