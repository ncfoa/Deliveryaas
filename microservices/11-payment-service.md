# Payment Service

## Overview
The Payment Service handles all payment processing, transaction management, and financial operations. It manages payments, refunds, escrow, and financial reporting.

## Purpose
- Payment processing and validation
- Transaction management
- Escrow and fund holding
- Financial reporting and reconciliation

## Data Ownership
- `payments` - Payment records and transactions
- `escrow_accounts` - Escrow account management
- `refunds` - Refund records and processing
- `financial_reports` - Financial reporting data

## API Endpoints

### 1. Process Payment
**POST** `/payments/process`

Processes a payment for a service or product.

**Request Body:**
```json
{
  "amount_cad": 95.50,
  "currency": "CAD",
  "payment_method": "credit_card",
  "payment_details": {
    "card_number": "4111111111111111",
    "expiry_month": "12",
    "expiry_year": "2025",
    "cvv": "123",
    "cardholder_name": "John Doe"
  },
  "billing_address": {
    "street": "123 Main St",
    "city": "Montreal",
    "province": "QC",
    "postal_code": "H1A 1A1",
    "country": "CA"
  },
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "description": "Package delivery from Montreal to London",
  "metadata": {
    "shipment_id": "550e8400-e29b-41d4-a716-446655440001",
    "traveler_id": "550e8400-e29b-41d4-a716-446655440002"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "currency": "CAD",
  "payment_method": "credit_card",
  "status": "completed",
  "transaction_id": "txn_1234567890",
  "processor_response": {
    "processor": "stripe",
    "transaction_id": "pi_1234567890",
    "status": "succeeded",
    "fees_cad": 2.87
  },
  "billing_address": {
    "street": "123 Main St",
    "city": "Montreal",
    "province": "QC",
    "postal_code": "H1A 1A1",
    "country": "CA"
  },
  "description": "Package delivery from Montreal to London",
  "metadata": {
    "shipment_id": "550e8400-e29b-41d4-a716-446655440001",
    "traveler_id": "550e8400-e29b-41d4-a716-446655440002"
  },
  "processed_at": "2024-01-15T12:30:00Z",
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payments/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "amount_cad": 95.50,
    "currency": "CAD",
    "payment_method": "credit_card",
    "payment_details": {
      "card_number": "4111111111111111",
      "expiry_month": "12",
      "expiry_year": "2025",
      "cvv": "123",
      "cardholder_name": "John Doe"
    },
    "billing_address": {
      "street": "123 Main St",
      "city": "Montreal",
      "province": "QC",
      "postal_code": "H1A 1A1",
      "country": "CA"
    },
    "order_id": "550e8400-e29b-41d4-a716-446655440000",
    "description": "Package delivery from Montreal to London"
  }'
```

### 2. Get Payment Details
**GET** `/payments/{id}`

Retrieves detailed information about a specific payment.

**Path Parameters:**
- `id` (string, required): Payment UUID

**Response:**
```json
{
  "id": "uuid",
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "currency": "CAD",
  "payment_method": "credit_card",
  "status": "completed",
  "transaction_id": "txn_1234567890",
  "processor_response": {
    "processor": "stripe",
    "transaction_id": "pi_1234567890",
    "status": "succeeded",
    "fees_cad": 2.87
  },
  "billing_address": {
    "street": "123 Main St",
    "city": "Montreal",
    "province": "QC",
    "postal_code": "H1A 1A1",
    "country": "CA"
  },
  "description": "Package delivery from Montreal to London",
  "metadata": {
    "shipment_id": "550e8400-e29b-41d4-a716-446655440001",
    "traveler_id": "550e8400-e29b-41d4-a716-446655440002"
  },
  "processed_at": "2024-01-15T12:30:00Z",
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/payments/550e8400-e29b-41d4-a716-446655440000
```

### 3. Create Escrow Account
**POST** `/payments/escrow/create`

Creates an escrow account for holding funds.

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
    "timeout_days": 7
  },
  "description": "Escrow for package delivery"
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
    "timeout_days": 7
  },
  "description": "Escrow for package delivery",
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-22T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payments/escrow/create \
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
      "timeout_days": 7
    },
    "description": "Escrow for package delivery"
  }'
```

### 4. Release Escrow Funds
**POST** `/payments/escrow/{id}/release`

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
    "recipient_name": "Jane Doe"
  }
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
    "recipient_name": "Jane Doe"
  },
  "released_at": "2024-01-15T14:35:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payments/escrow/550e8400-e29b-41d4-a716-446655440000/release \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reason": "delivery_confirmed",
    "delivery_confirmation": {
      "delivered_at": "2024-01-15T14:30:00Z",
      "delivery_photo_url": "https://storage.delivery.com/delivery_photos/delivery_123.jpg",
      "signature_url": "https://storage.delivery.com/signatures/signature_123.jpg",
      "recipient_name": "Jane Doe"
    }
  }'
```

### 5. Process Refund
**POST** `/payments/refund`

Processes a refund for a payment.

**Request Body:**
```json
{
  "payment_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "reason": "cancellation",
  "description": "Shipment cancelled by sender",
  "refund_method": "original_payment_method"
}
```

**Response:**
```json
{
  "id": "uuid",
  "payment_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 95.50,
  "currency": "CAD",
  "reason": "cancellation",
  "description": "Shipment cancelled by sender",
  "refund_method": "original_payment_method",
  "status": "completed",
  "transaction_id": "ref_1234567890",
  "processor_response": {
    "processor": "stripe",
    "refund_id": "re_1234567890",
    "status": "succeeded"
  },
  "processed_at": "2024-01-15T14:30:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payments/refund \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "payment_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount_cad": 95.50,
    "reason": "cancellation",
    "description": "Shipment cancelled by sender",
    "refund_method": "original_payment_method"
  }'
```

### 6. Get Payment History
**GET** `/payments/history`

Retrieves payment history for the authenticated user.

**Query Parameters:**
- `status` (string, optional): Filter by payment status
- `payment_method` (string, optional): Filter by payment method
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of payments to return (default: 20)
- `offset` (integer, optional): Number of payments to skip (default: 0)

**Response:**
```json
{
  "payments": [
    {
      "id": "uuid",
      "order_id": "550e8400-e29b-41d4-a716-446655440000",
      "amount_cad": 95.50,
      "currency": "CAD",
      "payment_method": "credit_card",
      "status": "completed",
      "description": "Package delivery from Montreal to London",
      "processed_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/payments/history?status=completed&limit=10"
```

### 7. Get Escrow Status
**GET** `/payments/escrow/{id}`

Retrieves the status of an escrow account.

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
    "timeout_days": 7
  },
  "description": "Escrow for package delivery",
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-22T12:30:00Z",
  "time_remaining_hours": 120
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/payments/escrow/550e8400-e29b-41d4-a716-446655440000
```

### 8. Get Financial Report
**GET** `/payments/reports/financial`

Retrieves financial reports and analytics.

**Query Parameters:**
- `report_type` (string, required): Type of report (daily, weekly, monthly, yearly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `currency` (string, optional): Filter by currency

**Response:**
```json
{
  "report_type": "monthly",
  "period": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "summary": {
    "total_revenue_cad": 50000.00,
    "total_transactions": 500,
    "average_transaction_cad": 100.00,
    "refund_amount_cad": 2500.00,
    "net_revenue_cad": 47500.00
  },
  "breakdown": {
    "by_payment_method": {
      "credit_card": {
        "count": 400,
        "amount_cad": 40000.00,
        "percentage": 80.0
      },
      "debit_card": {
        "count": 100,
        "amount_cad": 10000.00,
        "percentage": 20.0
      }
    },
    "by_status": {
      "completed": {
        "count": 480,
        "amount_cad": 48000.00
      },
      "failed": {
        "count": 20,
        "amount_cad": 2000.00
      }
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/payments/reports/financial?report_type=monthly&date_from=2024-01-01&date_to=2024-01-31"
```

## Database Tables

### payments
Payment records and transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| order_id | uuid | Associated order ID |
| amount_cad | decimal | Payment amount in CAD |
| currency | text | Currency code |
| payment_method | text | Payment method used |
| status | text | Payment status |
| transaction_id | text | External transaction ID |
| processor_response | jsonb | Payment processor response |
| billing_address | jsonb | Billing address information |
| description | text | Payment description |
| metadata | jsonb | Additional payment metadata |
| processed_at | timestamptz | Payment processing timestamp |
| created_at | timestamptz | Creation timestamp |

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
| created_at | timestamptz | Creation timestamp |
| expires_at | timestamptz | Escrow expiration timestamp |
| released_at | timestamptz | Fund release timestamp |

### refunds
Refund records and processing.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| payment_id | uuid | Foreign key to payments table |
| amount_cad | decimal | Refund amount in CAD |
| currency | text | Currency code |
| reason | text | Refund reason |
| description | text | Refund description |
| refund_method | text | Method used for refund |
| status | text | Refund status |
| transaction_id | text | External refund transaction ID |
| processor_response | jsonb | Refund processor response |
| processed_at | timestamptz | Refund processing timestamp |
| created_at | timestamptz | Creation timestamp |

### financial_reports
Financial reporting and analytics data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| report_type | text | Type of report |
| period_start | timestamptz | Report period start |
| period_end | timestamptz | Report period end |
| report_data | jsonb | Report data and metrics |
| generated_at | timestamptz | Report generation timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Payment Processing
- Multiple payment methods
- Secure transaction handling
- Real-time processing
- Fraud detection

### 2. Escrow Management
- Secure fund holding
- Conditional releases
- Timeout handling
- Dispute resolution

### 3. Refund Processing
- Automated refunds
- Manual refunds
- Partial refunds
- Refund tracking

### 4. Financial Reporting
- Revenue analytics
- Transaction reporting
- Performance metrics
- Compliance reporting

## Security Considerations

- Payment data is encrypted
- PCI DSS compliance
- Fraud detection
- Audit trail maintenance

## Integration Points

- **Pricing Service**: Price validation
- **Shipment Service**: Order management
- **User Service**: User verification
- **Notification Service**: Payment notifications

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_payment_data",
  "message": "Invalid payment data provided",
  "details": {
    "field": "amount_cad",
    "issue": "Amount must be greater than 0"
  }
}
```

**402 Payment Required:**
```json
{
  "error": "payment_failed",
  "message": "Payment processing failed",
  "details": {
    "reason": "Insufficient funds",
    "processor_error": "card_declined"
  }
}
```

**404 Not Found:**
```json
{
  "error": "payment_not_found",
  "message": "Payment not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "escrow_release_failed",
  "message": "Escrow release failed",
  "details": {
    "reason": "Release conditions not met",
    "missing_conditions": ["delivery_confirmation"]
  }
}
```

## Rate Limiting

- Payment processing: 50 per hour per user
- Refund requests: 10 per hour per user
- Escrow operations: 20 per hour per user
- Report generation: 5 per hour per user

## Payment Methods

### 1. Credit Card
- Visa, Mastercard, American Express
- Real-time processing
- Fraud detection
- 3D Secure support

### 2. Debit Card
- Interac, Visa Debit
- Real-time processing
- Bank verification
- Instant confirmation

### 3. Bank Transfer
- ACH transfers
- Wire transfers
- Processing delays
- Lower fees

### 4. Digital Wallets
- PayPal, Apple Pay, Google Pay
- Quick checkout
- Mobile optimized
- Enhanced security