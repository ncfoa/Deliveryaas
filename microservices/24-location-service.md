# Location Service

## Overview
The Location Service manages all location-related data including airports, cities, addresses, and geographic information. It provides location search, validation, and geocoding services.

## Purpose
- Location data management
- Geographic search and validation
- Address geocoding
- Location-based services

## Data Ownership
- `locations` - Base location data
- `airports` - Airport information
- `cities` - City information
- `addresses` - Address data

## API Endpoints

### 1. Search Locations
**POST** `/locations/search`

Searches for locations based on query and filters.

**Request Body:**
```json
{
  "query": "Toronto",
  "location_types": ["city", "airport"],
  "country_codes": ["CA", "US"],
  "latitude": 43.6532,
  "longitude": -79.3832,
  "radius_km": 50,
  "limit": 20,
  "include_coordinates": true
}
```

**Response:**
```json
{
  "locations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Toronto",
      "type": "city",
      "country_code": "CA",
      "country_name": "Canada",
      "region": "Ontario",
      "coordinates": {
        "latitude": 43.6532,
        "longitude": -79.3832
      },
      "timezone": "America/Toronto",
      "population": 2930000,
      "area_km2": 630.2,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Toronto Pearson International Airport",
      "type": "airport",
      "country_code": "CA",
      "country_name": "Canada",
      "region": "Ontario",
      "coordinates": {
        "latitude": 43.6777,
        "longitude": -79.6306
      },
      "timezone": "America/Toronto",
      "iata_code": "YYZ",
      "icao_code": "CYYZ",
      "runways": 5,
      "terminals": 3,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 2,
  "query": "Toronto",
  "search_time": "50ms"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/locations/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "query": "Toronto",
    "location_types": ["city", "airport"],
    "country_codes": ["CA", "US"],
    "latitude": 43.6532,
    "longitude": -79.3832,
    "radius_km": 50,
    "limit": 20,
    "include_coordinates": true
  }'
```

### 2. Get Location Details
**GET** `/locations/{id}`

Retrieves detailed information about a specific location.

**Path Parameters:**
- `id` (string, required): Location UUID

**Query Parameters:**
- `include_related` (boolean, optional): Include related locations
- `include_services` (boolean, optional): Include available services

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Toronto",
  "type": "city",
  "country_code": "CA",
  "country_name": "Canada",
  "region": "Ontario",
  "coordinates": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "timezone": "America/Toronto",
  "population": 2930000,
  "area_km2": 630.2,
  "elevation_m": 173,
  "climate": {
    "zone": "continental",
    "average_temp_c": 9.4,
    "precipitation_mm": 831
  },
  "related_locations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Toronto Pearson International Airport",
      "type": "airport",
      "distance_km": 22.5
    }
  ],
  "available_services": [
    "delivery",
    "pickup",
    "storage",
    "customs"
  ],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/locations/550e8400-e29b-41d4-a716-446655440000?include_related=true&include_services=true"
```

### 3. Geocode Address
**POST** `/locations/geocode`

Converts an address to coordinates.

**Request Body:**
```json
{
  "address": "123 Main Street, Toronto, ON, Canada",
  "country_code": "CA",
  "region": "ON",
  "city": "Toronto",
  "postal_code": "M5H 2N2",
  "street_number": "123",
  "street_name": "Main Street",
  "include_components": true
}
```

**Response:**
```json
{
  "coordinates": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "formatted_address": "123 Main St, Toronto, ON M5H 2N2, Canada",
  "address_components": {
    "street_number": "123",
    "street_name": "Main Street",
    "city": "Toronto",
    "region": "Ontario",
    "country": "Canada",
    "postal_code": "M5H 2N2"
  },
  "accuracy": "street",
  "confidence": 0.95,
  "timezone": "America/Toronto",
  "geocoding_provider": "google_maps",
  "geocoded_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/locations/geocode \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "address": "123 Main Street, Toronto, ON, Canada",
    "country_code": "CA",
    "region": "ON",
    "city": "Toronto",
    "postal_code": "M5H 2N2",
    "street_number": "123",
    "street_name": "Main Street",
    "include_components": true
  }'
```

### 4. Reverse Geocode
**POST** `/locations/reverse-geocode`

Converts coordinates to an address.

**Request Body:**
```json
{
  "latitude": 43.6532,
  "longitude": -79.3832,
  "include_components": true,
  "language": "en"
}
```

**Response:**
```json
{
  "address": "123 Main St, Toronto, ON M5H 2N2, Canada",
  "address_components": {
    "street_number": "123",
    "street_name": "Main Street",
    "city": "Toronto",
    "region": "Ontario",
    "country": "Canada",
    "postal_code": "M5H 2N2"
  },
  "coordinates": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "accuracy": "street",
  "confidence": 0.95,
  "timezone": "America/Toronto",
  "geocoding_provider": "google_maps",
  "geocoded_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/locations/reverse-geocode \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "latitude": 43.6532,
    "longitude": -79.3832,
    "include_components": true,
    "language": "en"
  }'
```

### 5. Get Nearby Locations
**GET** `/locations/nearby`

Finds locations near a given point.

**Query Parameters:**
- `latitude` (number, required): Latitude
- `longitude` (number, required): Longitude
- `radius_km` (number, optional): Search radius in kilometers (default: 10)
- `location_types` (string[], optional): Filter by location types
- `limit` (integer, optional): Number of results (default: 20)

**Response:**
```json
{
  "locations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Toronto",
      "type": "city",
      "country_code": "CA",
      "country_name": "Canada",
      "region": "Ontario",
      "coordinates": {
        "latitude": 43.6532,
        "longitude": -79.3832
      },
      "distance_km": 0.0,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Toronto Pearson International Airport",
      "type": "airport",
      "country_code": "CA",
      "country_name": "Canada",
      "region": "Ontario",
      "coordinates": {
        "latitude": 43.6777,
        "longitude": -79.6306
      },
      "distance_km": 22.5,
      "iata_code": "YYZ",
      "icao_code": "CYYZ",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 2,
  "search_center": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "radius_km": 10,
  "search_time": "30ms"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/locations/nearby?latitude=43.6532&longitude=-79.3832&radius_km=10&location_types=city,airport&limit=20"
```

### 6. Validate Address
**POST** `/locations/validate-address`

Validates and standardizes an address.

**Request Body:**
```json
{
  "address": "123 Main Street, Toronto, ON, Canada",
  "country_code": "CA",
  "region": "ON",
  "city": "Toronto",
  "postal_code": "M5H 2N2",
  "street_number": "123",
  "street_name": "Main Street",
  "strict_validation": true
}
```

**Response:**
```json
{
  "valid": true,
  "standardized_address": "123 Main St, Toronto, ON M5H 2N2, Canada",
  "address_components": {
    "street_number": "123",
    "street_name": "Main Street",
    "city": "Toronto",
    "region": "Ontario",
    "country": "Canada",
    "postal_code": "M5H 2N2"
  },
  "coordinates": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "validation_score": 0.95,
  "issues": [],
  "suggestions": [],
  "validated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/locations/validate-address \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "address": "123 Main Street, Toronto, ON, Canada",
    "country_code": "CA",
    "region": "ON",
    "city": "Toronto",
    "postal_code": "M5H 2N2",
    "street_number": "123",
    "street_name": "Main Street",
    "strict_validation": true
  }'
```

### 7. Get Location Statistics
**GET** `/locations/statistics`

Retrieves location usage statistics.

**Query Parameters:**
- `location_id` (string, optional): Filter by location
- `country_code` (string, optional): Filter by country
- `location_type` (string, optional): Filter by type
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_locations": 10000,
    "cities": 5000,
    "airports": 2000,
    "addresses": 3000,
    "countries": 195
  },
  "usage_stats": {
    "total_searches": 1000000,
    "total_geocodes": 500000,
    "total_reverse_geocodes": 200000,
    "average_search_time": "50ms",
    "average_geocode_time": "100ms"
  },
  "top_locations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Toronto",
      "type": "city",
      "searches": 50000,
      "geocodes": 25000
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Toronto Pearson International Airport",
      "type": "airport",
      "searches": 30000,
      "geocodes": 15000
    }
  ],
  "country_breakdown": [
    {
      "country_code": "CA",
      "country_name": "Canada",
      "locations": 5000,
      "searches": 300000
    },
    {
      "country_code": "US",
      "country_name": "United States",
      "locations": 3000,
      "searches": 200000
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/locations/statistics?country_code=CA&location_type=city&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

### 8. Create Location
**POST** `/locations`

Creates a new location.

**Request Body:**
```json
{
  "name": "New City",
  "type": "city",
  "country_code": "CA",
  "country_name": "Canada",
  "region": "Ontario",
  "coordinates": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "timezone": "America/Toronto",
  "population": 100000,
  "area_km2": 100.0,
  "elevation_m": 100,
  "climate": {
    "zone": "continental",
    "average_temp_c": 10.0,
    "precipitation_mm": 800
  },
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "New City",
  "type": "city",
  "country_code": "CA",
  "country_name": "Canada",
  "region": "Ontario",
  "coordinates": {
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "timezone": "America/Toronto",
  "population": 100000,
  "area_km2": 100.0,
  "elevation_m": 100,
  "climate": {
    "zone": "continental",
    "average_temp_c": 10.0,
    "precipitation_mm": 800
  },
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/locations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "New City",
    "type": "city",
    "country_code": "CA",
    "country_name": "Canada",
    "region": "Ontario",
    "coordinates": {
      "latitude": 43.6532,
      "longitude": -79.3832
    },
    "timezone": "America/Toronto",
    "population": 100000,
    "area_km2": 100.0,
    "elevation_m": 100,
    "climate": {
      "zone": "continental",
      "average_temp_c": 10.0,
      "precipitation_mm": 800
    },
    "created_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

## Database Tables

### locations
Base location data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Location name |
| type | text | Location type |
| country_code | char(2) | Country code |
| country_name | text | Country name |
| region | text | Region/state |
| coordinates | point | Geographic coordinates |
| timezone | text | Timezone |
| population | integer | Population |
| area_km2 | decimal | Area in square kilometers |
| elevation_m | integer | Elevation in meters |
| climate | jsonb | Climate information |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### airports
Airport information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| location_id | uuid | Reference to locations |
| iata_code | char(3) | IATA code |
| icao_code | char(4) | ICAO code |
| runways | integer | Number of runways |
| terminals | integer | Number of terminals |
| gates | integer | Number of gates |
| capacity | integer | Passenger capacity |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### cities
City information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| location_id | uuid | Reference to locations |
| population | integer | City population |
| area_km2 | decimal | City area |
| elevation_m | integer | City elevation |
| climate | jsonb | Climate information |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### addresses
Address data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| location_id | uuid | Reference to locations |
| street_number | text | Street number |
| street_name | text | Street name |
| city | text | City name |
| region | text | Region/state |
| country_code | char(2) | Country code |
| postal_code | text | Postal code |
| coordinates | point | Geographic coordinates |
| formatted_address | text | Formatted address |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

## Key Features

### 1. Location Search
- Full-text search
- Geographic search
- Type filtering
- Country filtering

### 2. Geocoding
- Address to coordinates
- Reverse geocoding
- Address validation
- Standardization

### 3. Geographic Services
- Distance calculations
- Nearby locations
- Route planning
- Time zone handling

### 4. Data Management
- Location CRUD
- Bulk operations
- Data validation
- Import/export

## Security Considerations

- Input validation
- Rate limiting
- Data privacy
- Access control

## Integration Points

- **Trip Service**: Location validation
- **Delivery Service**: Address verification
- **Search Service**: Location search
- **Analytics Service**: Usage tracking

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_request",
  "message": "Invalid request format",
  "details": {
    "field": "coordinates",
    "issue": "Invalid latitude or longitude"
  }
}
```

**404 Not Found:**
```json
{
  "error": "location_not_found",
  "message": "Location not found",
  "details": {
    "location_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Address validation failed",
  "details": {
    "issues": [
      "Invalid postal code format",
      "Street name not found"
    ]
  }
}
```

## Rate Limiting

- Location searches: 1000 per hour per user
- Geocoding requests: 500 per hour per user
- Address validation: 200 per hour per user
- Location creation: 10 per hour per user

## Location Types

### 1. City
- Population data
- Area information
- Climate data
- Administrative details

### 2. Airport
- IATA/ICAO codes
- Runway information
- Terminal details
- Capacity data

### 3. Address
- Street information
- Postal codes
- Coordinates
- Formatted address

### 4. Custom
- User-defined locations
- Special markers
- Temporary locations
- Virtual locations