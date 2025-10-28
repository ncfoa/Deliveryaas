# Local Courier Service

## Overview
The Local Courier Service manages local delivery couriers, their profiles, availability, and delivery capabilities. It handles courier registration, verification, and local delivery operations.

## Purpose
- Local courier profile management
- Courier availability and scheduling
- Local delivery operations
- Courier verification and validation

## Data Ownership
- `local_courier_profiles` - Local courier profile information
- `courier_availability` - Courier availability schedules
- `delivery_zones` - Courier delivery zone assignments
- `courier_vehicles` - Courier vehicle information

## API Endpoints

### 1. Create Local Courier Profile
**POST** `/local-couriers`

Creates a new local courier profile with specific courier information.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "courier_type": "bicycle",
  "service_areas": [
    {
      "city": "Montreal",
      "province": "QC",
      "postal_codes": ["H1A", "H1B", "H1C"],
      "radius_km": 10
    }
  ],
  "vehicle_info": {
    "type": "bicycle",
    "make": "Trek",
    "model": "FX 3",
    "year": 2023,
    "license_plate": "BIC123",
    "insurance_info": {
      "provider": "RSA",
      "policy_number": "POL123456",
      "expiry_date": "2024-12-31"
    }
  },
  "delivery_capabilities": {
    "max_weight": 25.0,
    "max_dimensions": {
      "length": 60,
      "width": 40,
      "height": 30
    },
    "special_handling": ["fragile", "temperature_controlled"],
    "delivery_times": ["morning", "afternoon", "evening"]
  },
  "availability": {
    "monday": {"start": "09:00", "end": "17:00"},
    "tuesday": {"start": "09:00", "end": "17:00"},
    "wednesday": {"start": "09:00", "end": "17:00"},
    "thursday": {"start": "09:00", "end": "17:00"},
    "friday": {"start": "09:00", "end": "17:00"},
    "saturday": {"start": "10:00", "end": "16:00"},
    "sunday": {"start": "10:00", "end": "16:00"}
  },
  "contact_info": {
    "phone": "+1234567890",
    "emergency_contact": {
      "name": "Jane Doe",
      "phone": "+1234567891",
      "relationship": "spouse"
    }
  },
  "preferences": {
    "preferred_delivery_types": ["standard", "express"],
    "max_deliveries_per_day": 20,
    "preferred_payment_method": "instant",
    "languages": ["en", "fr"]
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "courier_type": "bicycle",
  "service_areas": [
    {
      "city": "Montreal",
      "province": "QC",
      "postal_codes": ["H1A", "H1B", "H1C"],
      "radius_km": 10
    }
  ],
  "vehicle_info": {
    "type": "bicycle",
    "make": "Trek",
    "model": "FX 3",
    "year": 2023,
    "license_plate": "BIC123",
    "insurance_info": {
      "provider": "RSA",
      "policy_number": "POL123456",
      "expiry_date": "2024-12-31"
    }
  },
  "delivery_capabilities": {
    "max_weight": 25.0,
    "max_dimensions": {
      "length": 60,
      "width": 40,
      "height": 30
    },
    "special_handling": ["fragile", "temperature_controlled"],
    "delivery_times": ["morning", "afternoon", "evening"]
  },
  "availability": {
    "monday": {"start": "09:00", "end": "17:00"},
    "tuesday": {"start": "09:00", "end": "17:00"},
    "wednesday": {"start": "09:00", "end": "17:00"},
    "thursday": {"start": "09:00", "end": "17:00"},
    "friday": {"start": "09:00", "end": "17:00"},
    "saturday": {"start": "10:00", "end": "16:00"},
    "sunday": {"start": "10:00", "end": "16:00"}
  },
  "contact_info": {
    "phone": "+1234567890",
    "emergency_contact": {
      "name": "Jane Doe",
      "phone": "+1234567891",
      "relationship": "spouse"
    }
  },
  "preferences": {
    "preferred_delivery_types": ["standard", "express"],
    "max_deliveries_per_day": 20,
    "preferred_payment_method": "instant",
    "languages": ["en", "fr"]
  },
  "is_verified": false,
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/local-couriers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "courier_type": "bicycle",
    "service_areas": [
      {
        "city": "Montreal",
        "province": "QC",
        "postal_codes": ["H1A", "H1B", "H1C"],
        "radius_km": 10
      }
    ],
    "vehicle_info": {
      "type": "bicycle",
      "make": "Trek",
      "model": "FX 3",
      "year": 2023,
      "license_plate": "BIC123"
    },
    "delivery_capabilities": {
      "max_weight": 25.0,
      "max_dimensions": {
        "length": 60,
        "width": 40,
        "height": 30
      },
      "special_handling": ["fragile", "temperature_controlled"],
      "delivery_times": ["morning", "afternoon", "evening"]
    },
    "availability": {
      "monday": {"start": "09:00", "end": "17:00"},
      "tuesday": {"start": "09:00", "end": "17:00"},
      "wednesday": {"start": "09:00", "end": "17:00"},
      "thursday": {"start": "09:00", "end": "17:00"},
      "friday": {"start": "09:00", "end": "17:00"},
      "saturday": {"start": "10:00", "end": "16:00"},
      "sunday": {"start": "10:00", "end": "16:00"}
    }
  }'
```

### 2. Get Local Courier Profile
**GET** `/local-couriers/{id}`

Retrieves a local courier profile by ID.

**Path Parameters:**
- `id` (string, required): Local courier profile UUID

**Query Parameters:**
- `include_availability` (boolean, optional): Include current availability
- `include_stats` (boolean, optional): Include courier statistics

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "courier_type": "bicycle",
  "service_areas": [
    {
      "city": "Montreal",
      "province": "QC",
      "postal_codes": ["H1A", "H1B", "H1C"],
      "radius_km": 10
    }
  ],
  "vehicle_info": {
    "type": "bicycle",
    "make": "Trek",
    "model": "FX 3",
    "year": 2023,
    "license_plate": "BIC123",
    "insurance_info": {
      "provider": "RSA",
      "policy_number": "POL123456",
      "expiry_date": "2024-12-31"
    }
  },
  "delivery_capabilities": {
    "max_weight": 25.0,
    "max_dimensions": {
      "length": 60,
      "width": 40,
      "height": 30
    },
    "special_handling": ["fragile", "temperature_controlled"],
    "delivery_times": ["morning", "afternoon", "evening"]
  },
  "availability": {
    "monday": {"start": "09:00", "end": "17:00"},
    "tuesday": {"start": "09:00", "end": "17:00"},
    "wednesday": {"start": "09:00", "end": "17:00"},
    "thursday": {"start": "09:00", "end": "17:00"},
    "friday": {"start": "09:00", "end": "17:00"},
    "saturday": {"start": "10:00", "end": "16:00"},
    "sunday": {"start": "10:00", "end": "16:00"}
  },
  "contact_info": {
    "phone": "+1234567890",
    "emergency_contact": {
      "name": "Jane Doe",
      "phone": "+1234567891",
      "relationship": "spouse"
    }
  },
  "preferences": {
    "preferred_delivery_types": ["standard", "express"],
    "max_deliveries_per_day": 20,
    "preferred_payment_method": "instant",
    "languages": ["en", "fr"]
  },
  "is_verified": true,
  "status": "active",
  "stats": {
    "total_deliveries": 150,
    "successful_deliveries": 148,
    "average_rating": 4.7,
    "total_distance_km": 2500,
    "total_earnings": 1250.00,
    "currency": "CAD"
  },
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/local-couriers/550e8400-e29b-41d4-a716-446655440000?include_availability=true&include_stats=true"
```

### 3. Update Courier Availability
**PUT** `/local-couriers/{id}/availability`

Updates courier availability schedule.

**Path Parameters:**
- `id` (string, required): Local courier profile UUID

**Request Body:**
```json
{
  "availability": {
    "monday": {"start": "08:00", "end": "18:00"},
    "tuesday": {"start": "08:00", "end": "18:00"},
    "wednesday": {"start": "08:00", "end": "18:00"},
    "thursday": {"start": "08:00", "end": "18:00"},
    "friday": {"start": "08:00", "end": "18:00"},
    "saturday": {"start": "09:00", "end": "17:00"},
    "sunday": {"start": "09:00", "end": "17:00"}
  },
  "effective_date": "2024-02-01"
}
```

**Response:**
```json
{
  "id": "uuid",
  "availability": {
    "monday": {"start": "08:00", "end": "18:00"},
    "tuesday": {"start": "08:00", "end": "18:00"},
    "wednesday": {"start": "08:00", "end": "18:00"},
    "thursday": {"start": "08:00", "end": "18:00"},
    "friday": {"start": "08:00", "end": "18:00"},
    "saturday": {"start": "09:00", "end": "17:00"},
    "sunday": {"start": "09:00", "end": "17:00"}
  },
  "effective_date": "2024-02-01",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/local-couriers/550e8400-e29b-41d4-a716-446655440000/availability \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "availability": {
      "monday": {"start": "08:00", "end": "18:00"},
      "tuesday": {"start": "08:00", "end": "18:00"},
      "wednesday": {"start": "08:00", "end": "18:00"},
      "thursday": {"start": "08:00", "end": "18:00"},
      "friday": {"start": "08:00", "end": "18:00"},
      "saturday": {"start": "09:00", "end": "17:00"},
      "sunday": {"start": "09:00", "end": "17:00"}
    },
    "effective_date": "2024-02-01"
  }'
```

### 4. Set Courier Status
**PUT** `/local-couriers/{id}/status`

Updates courier status (online, offline, busy, etc.).

**Path Parameters:**
- `id` (string, required): Local courier profile UUID

**Request Body:**
```json
{
  "status": "online",
  "location": {
    "latitude": 45.5017,
    "longitude": -73.5673,
    "address": "123 Main St, Montreal, QC"
  },
  "notes": "Available for deliveries"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "online",
  "location": {
    "latitude": 45.5017,
    "longitude": -73.5673,
    "address": "123 Main St, Montreal, QC"
  },
  "notes": "Available for deliveries",
  "status_updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/local-couriers/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "status": "online",
    "location": {
      "latitude": 45.5017,
      "longitude": -73.5673,
      "address": "123 Main St, Montreal, QC"
    },
    "notes": "Available for deliveries"
  }'
```

### 5. Get Available Couriers
**GET** `/local-couriers/available`

Retrieves available couriers for a specific area and time.

**Query Parameters:**
- `city` (string, required): City name
- `province` (string, required): Province/state code
- `postal_code` (string, optional): Postal code
- `delivery_time` (string, optional): Preferred delivery time
- `max_weight` (decimal, optional): Maximum package weight
- `special_handling` (string, optional): Special handling requirements
- `limit` (integer, optional): Number of couriers to return (default: 20)

**Response:**
```json
{
  "couriers": [
    {
      "id": "uuid",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "courier_type": "bicycle",
      "service_areas": [
        {
          "city": "Montreal",
          "province": "QC",
          "postal_codes": ["H1A", "H1B", "H1C"],
          "radius_km": 10
        }
      ],
      "delivery_capabilities": {
        "max_weight": 25.0,
        "max_dimensions": {
          "length": 60,
          "width": 40,
          "height": 30
        },
        "special_handling": ["fragile", "temperature_controlled"],
        "delivery_times": ["morning", "afternoon", "evening"]
      },
      "current_status": "online",
      "current_location": {
        "latitude": 45.5017,
        "longitude": -73.5673,
        "address": "123 Main St, Montreal, QC"
      },
      "estimated_arrival": "2024-01-15T15:30:00Z",
      "rating": 4.7,
      "total_deliveries": 150
    }
  ],
  "total": 1,
  "limit": 20
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/local-couriers/available?city=Montreal&province=QC&postal_code=H1A&delivery_time=morning&max_weight=25.0&special_handling=fragile"
```

### 6. Get Courier Statistics
**GET** `/local-couriers/{id}/stats`

Retrieves statistics for a specific courier.

**Path Parameters:**
- `id` (string, required): Local courier profile UUID

**Query Parameters:**
- `period` (string, optional): Time period for statistics (weekly, monthly, yearly, all_time)
- `include_ratings` (boolean, optional): Include rating statistics

**Response:**
```json
{
  "courier_id": "550e8400-e29b-41d4-a716-446655440000",
  "period": "monthly",
  "stats": {
    "total_deliveries": 45,
    "successful_deliveries": 44,
    "failed_deliveries": 1,
    "total_distance_km": 750,
    "average_rating": 4.7,
    "total_earnings": 375.00,
    "currency": "CAD",
    "average_delivery_time_minutes": 25,
    "on_time_delivery_rate": 0.95
  },
  "ratings": {
    "average_rating": 4.7,
    "total_ratings": 44,
    "rating_breakdown": {
      "5_star": 35,
      "4_star": 7,
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
curl -X GET "https://api.delivery.com/local-couriers/550e8400-e29b-41d4-a716-446655440000/stats?period=monthly&include_ratings=true"
```

### 7. Update Service Areas
**PUT** `/local-couriers/{id}/service-areas`

Updates courier service areas.

**Path Parameters:**
- `id` (string, required): Local courier profile UUID

**Request Body:**
```json
{
  "service_areas": [
    {
      "city": "Montreal",
      "province": "QC",
      "postal_codes": ["H1A", "H1B", "H1C", "H1D"],
      "radius_km": 15
    },
    {
      "city": "Laval",
      "province": "QC",
      "postal_codes": ["H7A", "H7B", "H7C"],
      "radius_km": 10
    }
  ]
}
```

**Response:**
```json
{
  "id": "uuid",
  "service_areas": [
    {
      "city": "Montreal",
      "province": "QC",
      "postal_codes": ["H1A", "H1B", "H1C", "H1D"],
      "radius_km": 15
    },
    {
      "city": "Laval",
      "province": "QC",
      "postal_codes": ["H7A", "H7B", "H7C"],
      "radius_km": 10
    }
  ],
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/local-couriers/550e8400-e29b-41d4-a716-446655440000/service-areas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "service_areas": [
      {
        "city": "Montreal",
        "province": "QC",
        "postal_codes": ["H1A", "H1B", "H1C", "H1D"],
        "radius_km": 15
      },
      {
        "city": "Laval",
        "province": "QC",
        "postal_codes": ["H7A", "H7B", "H7C"],
        "radius_km": 10
      }
    ]
  }'
```

### 8. Get Courier Deliveries
**GET** `/local-couriers/{id}/deliveries`

Retrieves deliveries for a specific courier.

**Path Parameters:**
- `id` (string, required): Local courier profile UUID

**Query Parameters:**
- `status` (string, optional): Filter by delivery status
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of deliveries to return (default: 20)
- `offset` (integer, optional): Number of deliveries to skip (default: 0)

**Response:**
```json
{
  "deliveries": [
    {
      "id": "uuid",
      "courier_id": "550e8400-e29b-41d4-a716-446655440000",
      "package_id": "uuid",
      "pickup_address": "123 Main St, Montreal, QC",
      "delivery_address": "456 Oak Ave, Montreal, QC",
      "scheduled_pickup": "2024-01-15T10:00:00Z",
      "scheduled_delivery": "2024-01-15T11:00:00Z",
      "actual_pickup": "2024-01-15T10:05:00Z",
      "actual_delivery": "2024-01-15T11:10:00Z",
      "status": "delivered",
      "special_instructions": "Fragile - handle with care",
      "delivery_notes": "Delivered to front door",
      "rating": 5,
      "created_at": "2024-01-15T09:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/local-couriers/550e8400-e29b-41d4-a716-446655440000/deliveries?status=delivered&date_from=2024-01-01&date_to=2024-01-31&limit=10"
```

## Database Tables

### local_courier_profiles
Local courier profile information and capabilities.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| courier_type | text | Type of courier (bicycle, motorcycle, car, van) |
| service_areas | jsonb | Service area definitions |
| vehicle_info | jsonb | Vehicle information and insurance |
| delivery_capabilities | jsonb | Delivery capabilities and constraints |
| availability | jsonb | Weekly availability schedule |
| contact_info | jsonb | Contact and emergency information |
| preferences | jsonb | Courier preferences and settings |
| is_verified | boolean | Whether courier is verified |
| status | text | Current courier status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### courier_availability
Courier availability schedules and status.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| courier_id | uuid | Foreign key to local_courier_profiles table |
| day_of_week | text | Day of the week |
| start_time | time | Start time |
| end_time | time | End time |
| is_available | boolean | Whether available on this day/time |
| effective_date | date | When this schedule becomes effective |
| created_at | timestamptz | Creation timestamp |

### delivery_zones
Courier delivery zone assignments.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| courier_id | uuid | Foreign key to local_courier_profiles table |
| city | text | City name |
| province | text | Province/state code |
| postal_codes | text[] | Array of postal codes |
| radius_km | decimal | Service radius in kilometers |
| is_active | boolean | Whether zone is active |
| created_at | timestamptz | Creation timestamp |

### courier_vehicles
Courier vehicle information and documentation.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| courier_id | uuid | Foreign key to local_courier_profiles table |
| vehicle_type | text | Type of vehicle |
| make | text | Vehicle make |
| model | text | Vehicle model |
| year | integer | Vehicle year |
| license_plate | text | License plate number |
| insurance_info | jsonb | Insurance information |
| registration_info | jsonb | Registration information |
| is_active | boolean | Whether vehicle is active |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Courier Profile Management
- Comprehensive courier profiles
- Vehicle information management
- Service area definitions
- Capability specifications

### 2. Availability Management
- Flexible scheduling
- Real-time status updates
- Location tracking
- Capacity management

### 3. Delivery Operations
- Delivery assignment
- Route optimization
- Real-time tracking
- Delivery confirmation

### 4. Performance Tracking
- Delivery statistics
- Rating and review tracking
- Earnings tracking
- Performance analytics

## Security Considerations

- Courier data is encrypted
- Location data is protected
- Vehicle information is secure
- Personal information is confidential

## Integration Points

- **User Service**: User account integration
- **Profile Service**: Profile information sharing
- **Delivery Service**: Delivery operations
- **Verification Service**: Courier verification

## Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "error": "courier_not_found",
  "message": "Local courier profile not found"
}
```

**400 Bad Request:**
```json
{
  "error": "invalid_availability",
  "message": "Invalid availability schedule provided",
  "details": {
    "field": "monday",
    "issue": "Start time must be before end time"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "status_update_not_allowed",
  "message": "Status update not allowed at this time",
  "details": {
    "reason": "Active deliveries in progress",
    "current_status": "busy"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "verification_required",
  "message": "Courier verification required",
  "details": {
    "verification_level": "standard",
    "required_documents": ["drivers_license", "insurance"]
  }
}
```

## Rate Limiting

- Profile updates: 20 per hour per courier
- Status updates: 100 per hour per courier
- Availability updates: 10 per hour per courier
- Statistics requests: 50 per hour per courier

## Courier Types

### 1. Bicycle Courier
- Environmentally friendly
- Quick delivery in urban areas
- Limited weight capacity
- Weather dependent

### 2. Motorcycle Courier
- Fast delivery
- Medium weight capacity
- Weather dependent
- Higher insurance costs

### 3. Car Courier
- Reliable delivery
- Higher weight capacity
- Weather independent
- Parking considerations

### 4. Van Courier
- High weight capacity
- Bulk deliveries
- Weather independent
- Higher operating costs