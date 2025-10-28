# Trip Search Service

## Overview
The Trip Search Service handles trip discovery, matching, and search functionality. It enables users to find available trips that match their delivery needs and preferences.

## Purpose
- Trip discovery and search
- Trip matching algorithms
- Search filtering and sorting
- Trip availability management

## Data Ownership
- `trip_search_index` - Searchable trip index
- `search_queries` - User search queries and history
- `trip_matches` - Trip matching results
- `search_filters` - Saved search filters

## API Endpoints

### 1. Search Trips
**POST** `/trips/search`

Searches for available trips based on criteria.

**Request Body:**
```json
{
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "departure_date": "2024-02-15",
  "return_date": "2024-02-22",
  "max_packages": 2,
  "max_weight_per_package": 25.0,
  "max_dimensions_per_package": {
    "length": 80,
    "width": 60,
    "height": 40
  },
  "special_requirements": ["fragile_handling"],
  "preferred_airlines": ["AC", "WS"],
  "max_price_cad": 100.00,
  "sort_by": "departure_time",
  "sort_order": "asc",
  "limit": 20,
  "offset": 0
}
```

**Response:**
```json
{
  "trips": [
    {
      "id": "uuid",
      "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
      "traveler_name": "John Doe",
      "traveler_rating": 4.8,
      "traveler_verified": true,
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "departure_date": "2024-02-15",
      "return_date": "2024-02-22",
      "airline": "AC",
      "flight_number": "AC856",
      "class": "economy",
      "max_packages": 3,
      "max_weight_per_package": 30.0,
      "max_dimensions_per_package": {
        "length": 100,
        "width": 80,
        "height": 60
      },
      "special_requirements": ["fragile_handling", "temperature_controlled"],
      "price_per_package_cad": 75.00,
      "total_packages_available": 2,
      "departure_time": "2024-02-15T14:30:00Z",
      "arrival_time": "2024-02-15T23:45:00Z",
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0,
  "search_id": "uuid",
  "search_timestamp": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/trips/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "departure_date": "2024-02-15",
    "return_date": "2024-02-22",
    "max_packages": 2,
    "max_weight_per_package": 25.0,
    "special_requirements": ["fragile_handling"],
    "preferred_airlines": ["AC", "WS"],
    "max_price_cad": 100.00,
    "sort_by": "departure_time",
    "sort_order": "asc",
    "limit": 20
  }'
```

### 2. Get Trip Details
**GET** `/trips/{id}`

Retrieves detailed information about a specific trip.

**Path Parameters:**
- `id` (string, required): Trip UUID

**Query Parameters:**
- `include_traveler` (boolean, optional): Include traveler profile information
- `include_availability` (boolean, optional): Include package availability

**Response:**
```json
{
  "id": "uuid",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
  "traveler": {
    "id": "uuid",
    "name": "John Doe",
    "rating": 4.8,
    "verified": true,
    "total_trips": 15,
    "successful_deliveries": 45,
    "languages": ["en", "fr", "es"],
    "profile_picture_url": "https://storage.delivery.com/profiles/user123.jpg"
  },
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "departure_date": "2024-02-15",
  "return_date": "2024-02-22",
  "airline": "AC",
  "flight_number": "AC856",
  "class": "economy",
  "max_packages": 3,
  "max_weight_per_package": 30.0,
  "max_dimensions_per_package": {
    "length": 100,
    "width": 80,
    "height": 60
  },
  "special_requirements": ["fragile_handling", "temperature_controlled"],
  "price_per_package_cad": 75.00,
  "availability": {
    "total_packages": 3,
    "available_packages": 2,
    "reserved_packages": 1
  },
  "departure_time": "2024-02-15T14:30:00Z",
  "arrival_time": "2024-02-15T23:45:00Z",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/trips/550e8400-e29b-41d4-a716-446655440000?include_traveler=true&include_availability=true"
```

### 3. Get Popular Routes
**GET** `/trips/popular-routes`

Retrieves popular travel routes and destinations.

**Query Parameters:**
- `origin_airport` (string, optional): Filter by origin airport
- `limit` (integer, optional): Number of routes to return (default: 20)
- `period` (string, optional): Time period for popularity (weekly, monthly, yearly)

**Response:**
```json
{
  "routes": [
    {
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "popularity_score": 95,
      "trip_count": 150,
      "average_price_cad": 80.00,
      "popular_departure_dates": [
        "2024-02-15",
        "2024-02-22",
        "2024-03-01"
      ],
      "popular_airlines": ["AC", "WS", "BA"],
      "last_updated": "2024-01-15T12:30:00Z"
    },
    {
      "origin_airport": "YUL",
      "destination_airport": "CDG",
      "popularity_score": 88,
      "trip_count": 120,
      "average_price_cad": 75.00,
      "popular_departure_dates": [
        "2024-02-16",
        "2024-02-23",
        "2024-03-02"
      ],
      "popular_airlines": ["AC", "AF", "WS"],
      "last_updated": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 2,
  "limit": 20,
  "period": "monthly"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/trips/popular-routes?origin_airport=YUL&limit=10&period=monthly"
```

### 4. Save Search
**POST** `/trips/search/save`

Saves a search query for future use.

**Request Body:**
```json
{
  "name": "Montreal to London",
  "search_criteria": {
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "departure_date": "2024-02-15",
    "return_date": "2024-02-22",
    "max_packages": 2,
    "max_weight_per_package": 25.0,
    "special_requirements": ["fragile_handling"],
    "preferred_airlines": ["AC", "WS"],
    "max_price_cad": 100.00
  },
  "notify_on_match": true,
  "notification_frequency": "daily"
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Montreal to London",
  "search_criteria": {
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "departure_date": "2024-02-15",
    "return_date": "2024-02-22",
    "max_packages": 2,
    "max_weight_per_package": 25.0,
    "special_requirements": ["fragile_handling"],
    "preferred_airlines": ["AC", "WS"],
    "max_price_cad": 100.00
  },
  "notify_on_match": true,
  "notification_frequency": "daily",
  "last_searched": null,
  "match_count": 0,
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/trips/search/save \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Montreal to London",
    "search_criteria": {
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "departure_date": "2024-02-15",
      "return_date": "2024-02-22",
      "max_packages": 2,
      "max_weight_per_package": 25.0,
      "special_requirements": ["fragile_handling"],
      "preferred_airlines": ["AC", "WS"],
      "max_price_cad": 100.00
    },
    "notify_on_match": true,
    "notification_frequency": "daily"
  }'
```

### 5. Get Saved Searches
**GET** `/trips/search/saved`

Retrieves saved search queries for the authenticated user.

**Query Parameters:**
- `limit` (integer, optional): Number of searches to return (default: 20)
- `offset` (integer, optional): Number of searches to skip (default: 0)

**Response:**
```json
{
  "searches": [
    {
      "id": "uuid",
      "name": "Montreal to London",
      "search_criteria": {
        "origin_airport": "YUL",
        "destination_airport": "LHR",
        "departure_date": "2024-02-15",
        "return_date": "2024-02-22",
        "max_packages": 2,
        "max_weight_per_package": 25.0,
        "special_requirements": ["fragile_handling"],
        "preferred_airlines": ["AC", "WS"],
        "max_price_cad": 100.00
      },
      "notify_on_match": true,
      "notification_frequency": "daily",
      "last_searched": "2024-01-15T12:30:00Z",
      "match_count": 5,
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
curl -X GET "https://api.delivery.com/trips/search/saved?limit=10"
```

### 6. Update Saved Search
**PUT** `/trips/search/saved/{id}`

Updates a saved search query.

**Path Parameters:**
- `id` (string, required): Saved search UUID

**Request Body:**
```json
{
  "name": "Montreal to London - Updated",
  "search_criteria": {
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "departure_date": "2024-03-15",
    "return_date": "2024-03-22",
    "max_packages": 3,
    "max_weight_per_package": 30.0,
    "special_requirements": ["fragile_handling", "temperature_controlled"],
    "preferred_airlines": ["AC", "WS", "BA"],
    "max_price_cad": 120.00
  },
  "notify_on_match": true,
  "notification_frequency": "weekly"
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Montreal to London - Updated",
  "search_criteria": {
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "departure_date": "2024-03-15",
    "return_date": "2024-03-22",
    "max_packages": 3,
    "max_weight_per_package": 30.0,
    "special_requirements": ["fragile_handling", "temperature_controlled"],
    "preferred_airlines": ["AC", "WS", "BA"],
    "max_price_cad": 120.00
  },
  "notify_on_match": true,
  "notification_frequency": "weekly",
  "last_searched": "2024-01-15T12:30:00Z",
  "match_count": 5,
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/trips/search/saved/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Montreal to London - Updated",
    "search_criteria": {
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "departure_date": "2024-03-15",
      "return_date": "2024-03-22",
      "max_packages": 3,
      "max_weight_per_package": 30.0,
      "special_requirements": ["fragile_handling", "temperature_controlled"],
      "preferred_airlines": ["AC", "WS", "BA"],
      "max_price_cad": 120.00
    },
    "notify_on_match": true,
    "notification_frequency": "weekly"
  }'
```

### 7. Delete Saved Search
**DELETE** `/trips/search/saved/{id}`

Deletes a saved search query.

**Path Parameters:**
- `id` (string, required): Saved search UUID

**Response:**
```json
{
  "message": "Saved search deleted successfully",
  "deleted_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/trips/search/saved/550e8400-e29b-41d4-a716-446655440000
```

### 8. Get Search Suggestions
**GET** `/trips/search/suggestions`

Retrieves search suggestions based on partial input.

**Query Parameters:**
- `query` (string, required): Partial search query
- `type` (string, optional): Type of suggestion (airport, city, route)
- `limit` (integer, optional): Number of suggestions to return (default: 10)

**Response:**
```json
{
  "suggestions": [
    {
      "type": "airport",
      "code": "YUL",
      "name": "Montreal Pierre Elliott Trudeau International Airport",
      "city": "Montreal",
      "country": "Canada",
      "popularity_score": 95
    },
    {
      "type": "airport",
      "code": "LHR",
      "name": "London Heathrow Airport",
      "city": "London",
      "country": "United Kingdom",
      "popularity_score": 90
    },
    {
      "type": "route",
      "origin": "YUL",
      "destination": "LHR",
      "popularity_score": 85,
      "average_price_cad": 80.00
    }
  ],
  "total": 3,
  "limit": 10
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/trips/search/suggestions?query=YUL&type=airport&limit=5"
```

## Database Tables

### trip_search_index
Searchable trip index for fast searching.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| trip_id | uuid | Foreign key to trips table |
| origin_airport | text | Origin airport code |
| destination_airport | text | Destination airport code |
| departure_date | date | Departure date |
| return_date | date | Return date (nullable) |
| airline | text | Airline code |
| class | text | Class of service |
| max_packages | integer | Maximum packages |
| max_weight_per_package | decimal | Maximum weight per package |
| max_dimensions_per_package | jsonb | Maximum dimensions per package |
| special_requirements | text[] | Array of special requirements |
| price_per_package_cad | decimal | Price per package in CAD |
| availability_score | decimal | Availability score |
| popularity_score | decimal | Popularity score |
| search_vector | tsvector | Full-text search vector |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### search_queries
User search queries and history.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| search_criteria | jsonb | Search criteria used |
| results_count | integer | Number of results returned |
| search_timestamp | timestamptz | When search was performed |
| search_duration_ms | integer | Search duration in milliseconds |
| created_at | timestamptz | Creation timestamp |

### trip_matches
Trip matching results and scores.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| search_query_id | uuid | Foreign key to search_queries table |
| trip_id | uuid | Foreign key to trips table |
| match_score | decimal | Match score (0-100) |
| match_reasons | text[] | Array of match reasons |
| created_at | timestamptz | Creation timestamp |

### search_filters
Saved search filters and preferences.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| name | text | Filter name |
| search_criteria | jsonb | Search criteria |
| notify_on_match | boolean | Whether to notify on matches |
| notification_frequency | text | Notification frequency |
| last_searched | timestamptz | Last search timestamp |
| match_count | integer | Number of matches found |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Advanced Search
- Multi-criteria search
- Real-time filtering
- Sorting and ranking
- Search suggestions

### 2. Trip Matching
- Intelligent matching algorithms
- Relevance scoring
- Preference-based ranking
- Availability tracking

### 3. Saved Searches
- Search query persistence
- Notification preferences
- Search history tracking
- Filter management

### 4. Search Analytics
- Search performance metrics
- Popular routes tracking
- User behavior analysis
- Search optimization

## Security Considerations

- Search data is anonymized
- User preferences are protected
- Search history is secure
- Personal information is filtered

## Integration Points

- **Trip Service**: Trip data and availability
- **User Service**: User preferences and history
- **Notification Service**: Search notifications
- **Analytics Service**: Search metrics and insights

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_search_criteria",
  "message": "Invalid search criteria provided",
  "details": {
    "field": "departure_date",
    "issue": "Departure date must be in the future"
  }
}
```

**404 Not Found:**
```json
{
  "error": "trip_not_found",
  "message": "Trip not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "search_failed",
  "message": "Search failed due to invalid criteria",
  "details": {
    "reason": "No trips found matching criteria",
    "suggestions": ["Try different dates", "Expand search radius"]
  }
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many search requests",
  "retry_after": 60
}
```

## Rate Limiting

- Search requests: 100 per hour per user
- Saved search updates: 20 per hour per user
- Search suggestions: 200 per hour per user
- Popular routes: 50 per hour per user

## Search Features

### 1. Basic Search
- Origin and destination airports
- Departure and return dates
- Package requirements
- Price range

### 2. Advanced Search
- Airline preferences
- Class preferences
- Special requirements
- Traveler preferences

### 3. Smart Search
- AI-powered matching
- Preference learning
- Recommendation engine
- Personalized results

### 4. Saved Searches
- Search persistence
- Notification alerts
- Search history
- Filter management