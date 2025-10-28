# Escrow Service

## Overview
The Escrow Service manages secure fund holding, conditional releases, and dispute resolution. It ensures safe transactions by holding funds until delivery conditions are met.

## Purpose
- Secure fund holding and management
- Conditional fund release
- Dispute resolution and mediation
- Transaction security and trust

## Data Ownership
- `escrow_accounts` - Escrow account management
- `escrow_releases` - Fund release records
- `disputes` - Dispute and mediation records
- `escrow_audit_logs` - Escrow transaction audit trail

## API Endpoints

### 1. Create Escrow Account
**POST** `/escrow/create`

Creates a new escrow account for holding funds.

**Request Body:**
```json
{
  "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "currency": "CAD",
  "sender_id": "550e8400-e29b-41d4-a716-446655440001",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440002",
  "release_conditions": {
    "delivery_confirmation": true,
    "signature_required": true,
    "timeout_days": 7,
    "dispute_period_days": 3
  },
  "description": "Escrow for package delivery from Montreal to London",
  "metadata": {
    "package_value": 1500.00,
    "insurance_required": true,
    "special_handling": ["fragile"]
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "currency": "CAD",
  "sender_id": "550e8400-e29b-41d4-a716-446655440001",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440002",
  "status": "active",
  "release_conditions": {
    "delivery_confirmation": true,
    "signature_required": true,
    "timeout_days": 7,
    "dispute_period_days": 3
  },
  "description": "Escrow for package delivery from Montreal to London",
  "metadata": {
    "package_value": 1500.00,
    "insurance_required": true,
    "special_handling": ["fragile"]
  },
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-22T12:30:00Z",
  "dispute_deadline": "2024-01-25T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/escrow/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount_cad": 95.50,
    "currency": "CAD",
    "sender_id": "550e8400-e29b-41d4-a716-446655440001",
    "traveler_id": "550e8400-e29b-41d4-a716-446655440002",
    "release_conditions": {
      "delivery_confirmation": true,
      "signature_required": true,
      "timeout_days": 7,
      "dispute_period_days": 3
    },
    "description": "Escrow for package delivery from Montreal to London"
  }'
```

### 2. Get Escrow Status
**GET** `/escrow/{id}`

Retrieves the current status of an escrow account.

**Path Parameters:**
- `id` (string, required): Escrow account UUID

**Response:**
```json
{
  "id": "uuid",
  "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "currency": "CAD",
  "sender_id": "550e8400-e29b-41d4-a716-446655440001",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440002",
  "status": "active",
  "release_conditions": {
    "delivery_confirmation": true,
    "signature_required": true,
    "timeout_days": 7,
    "dispute_period_days": 3
  },
  "description": "Escrow for package delivery from Montreal to London",
  "metadata": {
    "package_value": 1500.00,
    "insurance_required": true,
    "special_handling": ["fragile"]
  },
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-22T12:30:00Z",
  "dispute_deadline": "2024-01-25T12:30:00Z",
  "time_remaining_hours": 120,
  "dispute_time_remaining_hours": 72
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/escrow/550e8400-e29b-41d4-a716-446655440000
```

### 3. Release Escrow Funds
**POST** `/escrow/{id}/release`

Releases escrow funds to the traveler.

**Path Parameters:**
- `id` (string, required): Escrow account UUID

**Request Body:**
```json
{
  "reason": "delivery_confirmed",
  "delivery_confirmation": {
    "delivered_at": "2024-01-15T14:30:00Z",
    "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
    "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg",
    "recipient_name": "Jane Doe",
    "recipient_phone": "+1234567890"
  },
  "released_by": "550e8400-e29b-41d4-a716-446655440003"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "released",
  "amount_cad": 95.50,
  "currency": "CAD",
  "released_to": "550e8400-e29b-41d4-a716-446655440002",
  "release_reason": "delivery_confirmed",
  "delivery_confirmation": {
    "delivered_at": "2024-01-15T14:30:00Z",
    "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
    "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg",
    "recipient_name": "Jane Doe",
    "recipient_phone": "+1234567890"
  },
  "released_by": "550e8400-e29b-41d4-a716-446655440003",
  "released_at": "2024-01-15T14:35:00Z",
  "transaction_id": "txn_1234567890"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/escrow/550e8400-e29b-41d4-a716-446655440000/release \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reason": "delivery_confirmed",
    "delivery_confirmation": {
      "delivered_at": "2024-01-15T14:30:00Z",
      "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
      "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg",
      "recipient_name": "Jane Doe",
      "recipient_phone": "+1234567890"
    },
    "released_by": "550e8400-e29b-41d4-a716-446655440003"
  }'
```

### 4. Create Dispute
**POST** `/escrow/{id}/dispute`

Creates a dispute for an escrow account.

**Path Parameters:**
- `id` (string, required): Escrow account UUID

**Request Body:**
```json
{
  "dispute_type": "delivery_issue",
  "reason": "Package not delivered as described",
  "description": "Package was damaged during transit and not properly handled",
  "evidence": [
    {
      "type": "photo",
      "url": "https://storage.delivery.com/dispute_photos/damage_123.jpg",
      "description": "Photo of damaged package"
    },
    {
      "type": "document",
      "url": "https://storage.delivery.com/dispute_docs/claim_123.pdf",
      "description": "Insurance claim document"
    }
  ],
  "requested_resolution": "partial_refund",
  "requested_amount_cad": 30.00,
  "created_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "id": "uuid",
  "escrow_id": "550e8400-e29b-41d4-a716-446655440000",
  "dispute_type": "delivery_issue",
  "reason": "Package not delivered as described",
  "description": "Package was damaged during transit and not properly handled",
  "evidence": [
    {
      "type": "photo",
      "url": "https://storage.delivery.com/dispute_photos/damage_123.jpg",
      "description": "Photo of damaged package"
    },
    {
      "type": "document",
      "url": "https://storage.delivery.com/dispute_docs/claim_123.pdf",
      "description": "Insurance claim document"
    }
  ],
  "requested_resolution": "partial_refund",
  "requested_amount_cad": 30.00,
  "status": "pending",
  "created_by": "550e8400-e29b-41d4-a716-446655440001",
  "created_at": "2024-01-15T14:30:00Z",
  "resolution_deadline": "2024-01-18T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/escrow/550e8400-e29b-41d4-a716-446655440000/dispute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "dispute_type": "delivery_issue",
    "reason": "Package not delivered as described",
    "description": "Package was damaged during transit and not properly handled",
    "evidence": [
      {
        "type": "photo",
        "url": "https://storage.delivery.com/dispute_photos/damage_123.jpg",
        "description": "Photo of damaged package"
      }
    ],
    "requested_resolution": "partial_refund",
    "requested_amount_cad": 30.00,
    "created_by": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 5. Resolve Dispute
**POST** `/escrow/disputes/{id}/resolve`

Resolves a dispute with a decision.

**Path Parameters:**
- `id` (string, required): Dispute UUID

**Request Body:**
```json
{
  "resolution": "partial_refund",
  "resolution_amount_cad": 25.00,
  "reasoning": "Evidence shows package was damaged during transit. Partial refund is appropriate.",
  "resolved_by": "550e8400-e29b-41d4-a716-446655440003",
  "notes": "Traveler will receive $25 refund, sender will receive $70.50"
}
```

**Response:**
```json
{
  "id": "uuid",
  "escrow_id": "550e8400-e29b-41d4-a716-446655440000",
  "resolution": "partial_refund",
  "resolution_amount_cad": 25.00,
  "reasoning": "Evidence shows package was damaged during transit. Partial refund is appropriate.",
  "resolved_by": "550e8400-e29b-41d4-a716-446655440003",
  "notes": "Traveler will receive $25 refund, sender will receive $70.50",
  "status": "resolved",
  "resolved_at": "2024-01-15T16:30:00Z",
  "refund_transaction_id": "txn_1234567890"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/escrow/disputes/550e8400-e29b-41d4-a716-446655440000/resolve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "resolution": "partial_refund",
    "resolution_amount_cad": 25.00,
    "reasoning": "Evidence shows package was damaged during transit. Partial refund is appropriate.",
    "resolved_by": "550e8400-e29b-41d4-a716-446655440003",
    "notes": "Traveler will receive $25 refund, sender will receive $70.50"
  }'
```

### 6. Get Escrow History
**GET** `/escrow/{id}/history`

Retrieves the complete history of an escrow account.

**Path Parameters:**
- `id` (string, required): Escrow account UUID

**Response:**
```json
{
  "escrow_id": "550e8400-e29b-41d4-a716-446655440000",
  "history": [
    {
      "id": "uuid",
      "action": "created",
      "description": "Escrow account created",
      "amount_cad": 95.50,
      "performed_by": "550e8400-e29b-41d4-a716-446655440001",
      "timestamp": "2024-01-15T12:30:00Z"
    },
    {
      "id": "uuid",
      "action": "dispute_created",
      "description": "Dispute created by sender",
      "amount_cad": 95.50,
      "performed_by": "550e8400-e29b-41d4-a716-446655440001",
      "timestamp": "2024-01-15T14:30:00Z"
    },
    {
      "id": "uuid",
      "action": "dispute_resolved",
      "description": "Dispute resolved with partial refund",
      "amount_cad": 25.00,
      "performed_by": "550e8400-e29b-41d4-a716-446655440003",
      "timestamp": "2024-01-15T16:30:00Z"
    }
  ],
  "total_events": 3
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/escrow/550e8400-e29b-41d4-a716-446655440000/history
```

### 7. Get Active Escrows
**GET** `/escrow/active`

Retrieves all active escrow accounts for the authenticated user.

**Query Parameters:**
- `user_type` (string, optional): Filter by user type (sender, traveler)
- `limit` (integer, optional): Number of escrows to return (default: 20)
- `offset` (integer, optional): Number of escrows to skip (default: 0)

**Response:**
```json
{
  "escrows": [
    {
      "id": "uuid",
      "shipment_id": "550e8400-e29b-41d4-a716-446655440000",
      "amount_cad": 95.50,
      "currency": "CAD",
      "sender_id": "550e8400-e29b-41d4-a716-446655440001",
      "traveler_id": "550e8400-e29b-41d4-a716-446655440002",
      "status": "active",
      "description": "Escrow for package delivery from Montreal to London",
      "created_at": "2024-01-15T12:30:00Z",
      "expires_at": "2024-01-22T12:30:00Z",
      "time_remaining_hours": 120
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/escrow/active?user_type=sender&limit=10"
```

### 8. Get Dispute Details
**GET** `/escrow/disputes/{id}`

Retrieves detailed information about a specific dispute.

**Path Parameters:**
- `id` (string, required): Dispute UUID

**Response:**
```json
{
  "id": "uuid",
  "escrow_id": "550e8400-e29b-41d4-a716-446655440000",
  "dispute_type": "delivery_issue",
  "reason": "Package not delivered as described",
  "description": "Package was damaged during transit and not properly handled",
  "evidence": [
    {
      "type": "photo",
      "url": "https://storage.delivery.com/dispute_photos/damage_123.jpg",
      "description": "Photo of damaged package"
    },
    {
      "type": "document",
      "url": "https://storage.delivery.com/dispute_docs/claim_123.pdf",
      "description": "Insurance claim document"
    }
  ],
  "requested_resolution": "partial_refund",
  "requested_amount_cad": 30.00,
  "status": "pending",
  "created_by": "550e8400-e29b-41d4-a716-446655440001",
  "created_at": "2024-01-15T14:30:00Z",
  "resolution_deadline": "2024-01-18T14:30:00Z",
  "time_remaining_hours": 72
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/escrow/disputes/550e8400-e29b-41d4-a716-446655440000
```

## Database Tables

### escrow_accounts
Escrow account management and fund holding.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| shipment_id | uuid | Foreign key to shipments table |
| amount_cad | decimal | Escrow amount in CAD |
| currency | text | Currency code |
| sender_id | uuid | Foreign key to users table |
| traveler_id | uuid | Foreign key to users table |
| status | text | Escrow status |
| release_conditions | jsonb | Conditions for fund release |
| description | text | Escrow description |
| metadata | jsonb | Additional escrow metadata |
| created_at | timestamptz | Creation timestamp |
| expires_at | timestamptz | Escrow expiration timestamp |
| released_at | timestamptz | Fund release timestamp |

### escrow_releases
Fund release records and transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| escrow_id | uuid | Foreign key to escrow_accounts table |
| amount_cad | decimal | Released amount in CAD |
| currency | text | Currency code |
| release_reason | text | Reason for release |
| delivery_confirmation | jsonb | Delivery confirmation details |
| released_by | uuid | User who authorized release |
| released_at | timestamptz | Release timestamp |
| transaction_id | text | External transaction ID |
| created_at | timestamptz | Creation timestamp |

### disputes
Dispute and mediation records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| escrow_id | uuid | Foreign key to escrow_accounts table |
| dispute_type | text | Type of dispute |
| reason | text | Dispute reason |
| description | text | Detailed dispute description |
| evidence | jsonb | Evidence and supporting documents |
| requested_resolution | text | Requested resolution type |
| requested_amount_cad | decimal | Requested resolution amount |
| status | text | Dispute status |
| created_by | uuid | User who created dispute |
| resolved_by | uuid | User who resolved dispute |
| resolution | text | Dispute resolution |
| resolution_amount_cad | decimal | Resolution amount |
| reasoning | text | Resolution reasoning |
| created_at | timestamptz | Creation timestamp |
| resolved_at | timestamptz | Resolution timestamp |

### escrow_audit_logs
Escrow transaction audit trail.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| escrow_id | uuid | Foreign key to escrow_accounts table |
| action | text | Action performed |
| description | text | Action description |
| amount_cad | decimal | Amount involved |
| performed_by | uuid | User who performed action |
| timestamp | timestamptz | Action timestamp |
| metadata | jsonb | Additional action metadata |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Secure Fund Holding
- Encrypted fund storage
- Multi-signature releases
- Timeout protection
- Audit trail maintenance

### 2. Conditional Releases
- Delivery confirmation
- Signature verification
- Time-based releases
- Dispute protection

### 3. Dispute Resolution
- Evidence collection
- Mediation process
- Fair resolution
- Appeal system

### 4. Audit and Compliance
- Complete audit trail
- Regulatory compliance
- Financial reporting
- Risk management

## Security Considerations

- Funds are encrypted at rest
- Multi-signature authentication
- Audit trail integrity
- Regulatory compliance

## Integration Points

- **Payment Service**: Fund processing
- **Shipment Service**: Delivery tracking
- **User Service**: User verification
- **Notification Service**: Status updates

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_escrow_data",
  "message": "Invalid escrow data provided",
  "details": {
    "field": "amount_cad",
    "issue": "Amount must be greater than 0"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "escrow_release_not_allowed",
  "message": "Escrow release not allowed",
  "details": {
    "reason": "Release conditions not met",
    "missing_conditions": ["delivery_confirmation"]
  }
}
```

**404 Not Found:**
```json
{
  "error": "escrow_not_found",
  "message": "Escrow account not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "dispute_creation_failed",
  "message": "Dispute creation failed",
  "details": {
    "reason": "Dispute period has expired",
    "dispute_deadline": "2024-01-18T14:30:00Z"
  }
}
```

## Rate Limiting

- Escrow creation: 10 per hour per user
- Dispute creation: 5 per hour per user
- Release requests: 20 per hour per user
- History requests: 50 per hour per user

## Escrow Statuses

### 1. Active
- Funds held in escrow
- Waiting for release conditions
- Can be disputed
- Timeout protection

### 2. Released
- Funds released to traveler
- Transaction completed
- Final status
- Cannot be disputed

### 3. Disputed
- Dispute in progress
- Funds held pending resolution
- Mediation required
- Timeout suspended

### 4. Expired
- Escrow timeout reached
- Funds returned to sender
- Final status
- Cannot be disputed

### 5. Cancelled
- Escrow cancelled before release
- Funds returned to sender
- Final status
- Cannot be disputed