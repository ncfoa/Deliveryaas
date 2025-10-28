# Shipment Service

## Overview
The Shipment Service manages package shipments, tracking, and delivery operations. It handles shipment creation, tracking, status updates, and delivery confirmation.

## Purpose
- Package shipment management
- Shipment tracking and monitoring
- Delivery status updates
- Shipment lifecycle management

## Data Ownership
- `shipments` - Shipment records and details
- `shipment_items` - Individual items within shipments
- `shipment_tracking` - Tracking events and updates
- `delivery_confirmations` - Delivery confirmation records

## API Endpoints

### 1. Create Shipment
**POST** `/shipments`

Creates a new shipment with package details.

**Request Body:**
```json
{
  "sender_id": "550e8400-e29b-41d4-a716-446655440000",
  "recipient_id": "550e8400-e29b-41d4-a716-446655440001",
  "trip_id": "550e8400-e29b-41d4-a716-446655440002",
  "package_details": {
    "weight_kg": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    },
    "description": "Electronics - Laptop",
    "value_cad": 1500.00,
    "fragile": true,
    "requires_signature": true
  },
  "pickup_address": {
    "street": "123 Main St",
    "city": "Montreal",
    "province": "QC",
    "postal_code": "H1A 1A1",
    "country": "CA",
    "contact_phone": "+1234567890"
  },
  "delivery_address": {
    "street": "456 Oak Ave",
    "city": "London",
    "province": "ON",
    "postal_code": "N6A 1A1",
    "country": "CA",
    "contact_phone": "+1234567891"
  },
  "delivery_instructions": "Leave at front door if no answer",
  "insurance_required": true,
  "insurance_value_cad": 1500.00,
  "special_handling": ["fragile", "signature_required"],
  "estimated_delivery": "2024-02-20T14:00:00Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "tracking_number": "SH123456789",
  "sender_id": "550e8400-e29b-41d4-a716-446655440000",
  "recipient_id": "550e8400-e29b-41d4-a716-446655440001",
  "trip_id": "550e8400-e29b-41d4-a716-446655440002",
  "package_details": {
    "weight_kg": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    },
    "description": "Electronics - Laptop",
    "value_cad": 1500.00,
    "fragile": true,
    "requires_signature": true
  },
  "pickup_address": {
    "street": "123 Main St",
    "city": "Montreal",
    "province": "QC",
    "postal_code": "H1A 1A1",
    "country": "CA",
    "contact_phone": "+1234567890"
  },
  "delivery_address": {
    "street": "456 Oak Ave",
    "city": "London",
    "province": "ON",
    "postal_code": "N6A 1A1",
    "country": "CA",
    "contact_phone": "+1234567891"
  },
  "delivery_instructions": "Leave at front door if no answer",
  "insurance_required": true,
  "insurance_value_cad": 1500.00,
  "special_handling": ["fragile", "signature_required"],
  "estimated_delivery": "2024-02-20T14:00:00Z",
  "status": "created",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/shipments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "sender_id": "550e8400-e29b-41d4-a716-446655440000",
    "recipient_id": "550e8400-e29b-41d4-a716-446655440001",
    "trip_id": "550e8400-e29b-41d4-a716-446655440002",
    "package_details": {
      "weight_kg": 2.5,
      "dimensions": {
        "length": 30,
        "width": 20,
        "height": 15
      },
      "description": "Electronics - Laptop",
      "value_cad": 1500.00,
      "fragile": true,
      "requires_signature": true
    },
    "pickup_address": {
      "street": "123 Main St",
      "city": "Montreal",
      "province": "QC",
      "postal_code": "H1A 1A1",
      "country": "CA",
      "contact_phone": "+1234567890"
    },
    "delivery_address": {
      "street": "456 Oak Ave",
      "city": "London",
      "province": "ON",
      "postal_code": "N6A 1A1",
      "country": "CA",
      "contact_phone": "+1234567891"
    },
    "delivery_instructions": "Leave at front door if no answer",
    "insurance_required": true,
    "insurance_value_cad": 1500.00,
    "special_handling": ["fragile", "signature_required"],
    "estimated_delivery": "2024-02-20T14:00:00Z"
  }'
```

### 2. Get Shipment Details
**GET** `/shipments/{id}`

Retrieves detailed information about a specific shipment.

**Path Parameters:**
- `id` (string, required): Shipment UUID

**Query Parameters:**
- `include_tracking` (boolean, optional): Include tracking history
- `include_items` (boolean, optional): Include shipment items

**Response:**
```json
{
  "id": "uuid",
  "tracking_number": "SH123456789",
  "sender_id": "550e8400-e29b-41d4-a716-446655440000",
  "recipient_id": "550e8400-e29b-41d4-a716-446655440001",
  "trip_id": "550e8400-e29b-41d4-a716-446655440002",
  "package_details": {
    "weight_kg": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    },
    "description": "Electronics - Laptop",
    "value_cad": 1500.00,
    "fragile": true,
    "requires_signature": true
  },
  "pickup_address": {
    "street": "123 Main St",
    "city": "Montreal",
    "province": "QC",
    "postal_code": "H1A 1A1",
    "country": "CA",
    "contact_phone": "+1234567890"
  },
  "delivery_address": {
    "street": "456 Oak Ave",
    "city": "London",
    "province": "ON",
    "postal_code": "N6A 1A1",
    "country": "CA",
    "contact_phone": "+1234567891"
  },
  "delivery_instructions": "Leave at front door if no answer",
  "insurance_required": true,
  "insurance_value_cad": 1500.00,
  "special_handling": ["fragile", "signature_required"],
  "estimated_delivery": "2024-02-20T14:00:00Z",
  "status": "in_transit",
  "tracking_history": [
    {
      "status": "created",
      "timestamp": "2024-01-15T12:30:00Z",
      "location": "Montreal, QC",
      "description": "Shipment created"
    },
    {
      "status": "picked_up",
      "timestamp": "2024-01-15T14:00:00Z",
      "location": "Montreal, QC",
      "description": "Package picked up by traveler"
    },
    {
      "status": "in_transit",
      "timestamp": "2024-01-15T16:00:00Z",
      "location": "Montreal, QC",
      "description": "Package in transit"
    }
  ],
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T16:00:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/shipments/550e8400-e29b-41d4-a716-446655440000?include_tracking=true&include_items=true"
```

### 3. Track Shipment
**GET** `/shipments/track/{tracking_number}`

Tracks a shipment using its tracking number.

**Path Parameters:**
- `tracking_number` (string, required): Shipment tracking number

**Response:**
```json
{
  "tracking_number": "SH123456789",
  "status": "in_transit",
  "current_location": "Montreal, QC",
  "estimated_delivery": "2024-02-20T14:00:00Z",
  "tracking_history": [
    {
      "status": "created",
      "timestamp": "2024-01-15T12:30:00Z",
      "location": "Montreal, QC",
      "description": "Shipment created"
    },
    {
      "status": "picked_up",
      "timestamp": "2024-01-15T14:00:00Z",
      "location": "Montreal, QC",
      "description": "Package picked up by traveler"
    },
    {
      "status": "in_transit",
      "timestamp": "2024-01-15T16:00:00Z",
      "location": "Montreal, QC",
      "description": "Package in transit"
    }
  ],
  "next_update_expected": "2024-01-16T10:00:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/shipments/track/SH123456789
```

### 4. Update Shipment Status
**PUT** `/shipments/{id}/status`

Updates the status of a shipment.

**Path Parameters:**
- `id` (string, required): Shipment UUID

**Request Body:**
```json
{
  "status": "delivered",
  "location": {
    "latitude": 42.9849,
    "longitude": -81.2453,
    "address": "456 Oak Ave, London, ON"
  },
  "notes": "Delivered to front door as requested",
  "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
  "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "delivered",
  "location": {
    "latitude": 42.9849,
    "longitude": -81.2453,
    "address": "456 Oak Ave, London, ON"
  },
  "notes": "Delivered to front door as requested",
  "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
  "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg",
  "status_updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/shipments/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "status": "delivered",
    "location": {
      "latitude": 42.9849,
      "longitude": -81.2453,
      "address": "456 Oak Ave, London, ON"
    },
    "notes": "Delivered to front door as requested",
    "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
    "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg"
  }'
```

### 5. Add Tracking Event
**POST** `/shipments/{id}/tracking`

Adds a new tracking event to a shipment.

**Path Parameters:**
- `id` (string, required): Shipment UUID

**Request Body:**
```json
{
  "status": "customs_cleared",
  "location": {
    "latitude": 45.5017,
    "longitude": -73.5673,
    "address": "Montreal Airport, QC"
  },
  "description": "Package cleared customs",
  "notes": "No additional fees required"
}
```

**Response:**
```json
{
  "id": "uuid",
  "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "customs_cleared",
  "location": {
    "latitude": 45.5017,
    "longitude": -73.5673,
    "address": "Montreal Airport, QC"
  },
  "description": "Package cleared customs",
  "notes": "No additional fees required",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/shipments/550e8400-e29b-41d4-a716-446655440000/tracking \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "status": "customs_cleared",
    "location": {
      "latitude": 45.5017,
      "longitude": -73.5673,
      "address": "Montreal Airport, QC"
    },
    "description": "Package cleared customs",
    "notes": "No additional fees required"
  }'
```

### 6. Get Shipment Items
**GET** `/shipments/{id}/items`

Retrieves items within a specific shipment.

**Path Parameters:**
- `id` (string, required): Shipment UUID

**Response:**
```json
{
  "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
  "items": [
    {
      "id": "uuid",
      "name": "MacBook Pro",
      "description": "13-inch MacBook Pro with M2 chip",
      "quantity": 1,
      "weight_kg": 2.5,
      "dimensions": {
        "length": 30,
        "width": 20,
        "height": 15
      },
      "value_cad": 1500.00,
      "category": "electronics",
      "fragile": true,
      "requires_signature": true
    }
  ],
  "total_items": 1,
  "total_weight_kg": 2.5,
  "total_value_cad": 1500.00
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/shipments/550e8400-e29b-41d4-a716-446655440000/items
```

### 7. Get Shipment History
**GET** `/shipments/{id}/history`

Retrieves the complete tracking history for a shipment.

**Path Parameters:**
- `id` (string, required): Shipment UUID

**Query Parameters:**
- `limit` (integer, optional): Number of events to return (default: 50)
- `offset` (integer, optional): Number of events to skip (default: 0)

**Response:**
```json
{
  "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
  "tracking_history": [
    {
      "id": "uuid",
      "status": "created",
      "timestamp": "2024-01-15T12:30:00Z",
      "location": "Montreal, QC",
      "description": "Shipment created",
      "notes": null
    },
    {
      "id": "uuid",
      "status": "picked_up",
      "timestamp": "2024-01-15T14:00:00Z",
      "location": "Montreal, QC",
      "description": "Package picked up by traveler",
      "notes": "Traveler confirmed pickup"
    },
    {
      "id": "uuid",
      "status": "in_transit",
      "timestamp": "2024-01-15T16:00:00Z",
      "location": "Montreal, QC",
      "description": "Package in transit",
      "notes": "En route to destination"
    }
  ],
  "total_events": 3,
  "limit": 50,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/shipments/550e8400-e29b-41d4-a716-446655440000/history?limit=20"
```

### 8. Cancel Shipment
**DELETE** `/shipments/{id}`

Cancels a shipment if it hasn't been picked up yet.

**Path Parameters:**
- `id` (string, required): Shipment UUID

**Request Body:**
```json
{
  "reason": "sender_request",
  "notes": "Sender requested cancellation"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "cancelled",
  "cancelled_at": "2024-01-15T14:30:00Z",
  "cancellation_reason": "sender_request",
  "notes": "Sender requested cancellation",
  "refund_amount": 25.00,
  "currency": "CAD"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/shipments/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reason": "sender_request",
    "notes": "Sender requested cancellation"
  }'
```

## Database Tables

### shipments
Shipment records and details.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| tracking_number | text | Unique tracking number |
| sender_id | uuid | Foreign key to users table |
| recipient_id | uuid | Foreign key to users table |
| trip_id | uuid | Foreign key to trips table |
| package_details | jsonb | Package information and specifications |
| pickup_address | jsonb | Pickup address information |
| delivery_address | jsonb | Delivery address information |
| delivery_instructions | text | Special delivery instructions |
| insurance_required | boolean | Whether insurance is required |
| insurance_value_cad | decimal | Insurance value in CAD |
| special_handling | text[] | Array of special handling requirements |
| estimated_delivery | timestamptz | Estimated delivery timestamp |
| status | text | Current shipment status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### shipment_items
Individual items within shipments.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| shipment_id | uuid | Foreign key to shipments table |
| name | text | Item name |
| description | text | Item description |
| quantity | integer | Item quantity |
| weight_kg | decimal | Item weight in kg |
| dimensions | jsonb | Item dimensions |
| value_cad | decimal | Item value in CAD |
| category | text | Item category |
| fragile | boolean | Whether item is fragile |
| requires_signature | boolean | Whether signature is required |
| created_at | timestamptz | Creation timestamp |

### shipment_tracking
Tracking events and updates for shipments.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| shipment_id | uuid | Foreign key to shipments table |
| status | text | Tracking status |
| location | jsonb | Location information |
| description | text | Status description |
| notes | text | Additional notes |
| timestamp | timestamptz | Event timestamp |
| created_at | timestamptz | Creation timestamp |

### delivery_confirmations
Delivery confirmation records and proof.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| shipment_id | uuid | Foreign key to shipments table |
| delivery_photo_url | text | URL to delivery photo |
| signature_url | text | URL to signature image |
| delivery_notes | text | Delivery notes |
| delivered_by | uuid | User who delivered the package |
| delivered_at | timestamptz | Delivery timestamp |
| location | jsonb | Delivery location |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Shipment Management
- Complete shipment lifecycle
- Package details and specifications
- Address management
- Insurance and special handling

### 2. Tracking System
- Real-time tracking updates
- Location tracking
- Status notifications
- Delivery confirmation

### 3. Item Management
- Individual item tracking
- Item specifications
- Value and insurance tracking
- Special handling requirements

### 4. Delivery Operations
- Delivery confirmation
- Photo and signature capture
- Delivery notes
- Proof of delivery

## Security Considerations

- Shipment data is encrypted
- Tracking information is secure
- Personal addresses are protected
- Delivery confirmations are verified

## Integration Points

- **User Service**: Sender and recipient information
- **Trip Service**: Trip assignment and tracking
- **Payment Service**: Insurance and fees
- **File Service**: Delivery photos and signatures

## Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "error": "shipment_not_found",
  "message": "Shipment not found"
}
```

**400 Bad Request:**
```json
{
  "error": "invalid_shipment_data",
  "message": "Invalid shipment data provided",
  "details": {
    "field": "weight_kg",
    "issue": "Weight must be greater than 0"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "shipment_cancellation_not_allowed",
  "message": "Shipment cannot be cancelled",
  "details": {
    "reason": "Package already in transit",
    "current_status": "in_transit"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "status_update_failed",
  "message": "Status update failed",
  "details": {
    "reason": "Invalid status transition",
    "current_status": "delivered",
    "requested_status": "in_transit"
  }
}
```

## Rate Limiting

- Shipment creation: 20 per hour per user
- Status updates: 100 per hour per user
- Tracking requests: 200 per hour per user
- History requests: 50 per hour per user

## Shipment Statuses

### 1. Created
- Shipment created but not yet picked up
- Can be modified or cancelled
- Waiting for traveler pickup

### 2. Picked Up
- Package picked up by traveler
- In traveler's possession
- Cannot be cancelled

### 3. In Transit
- Package is being transported
- Location updates available
- Estimated delivery time provided

### 4. Delivered
- Package successfully delivered
- Delivery confirmation received
- Final status

### 5. Cancelled
- Shipment cancelled before delivery
- Refund processed if applicable
- Final status

### 6. Lost
- Package lost during transit
- Investigation initiated
- Compensation processed

### 7. Damaged
- Package damaged during transit
- Investigation initiated
- Compensation processed