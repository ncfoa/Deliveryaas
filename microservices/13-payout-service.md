# Payout Service

## Overview
The Payout Service manages traveler and courier payouts, earnings calculations, and payment processing. It handles commission calculations, tax reporting, and automated payouts.

## Purpose
- Traveler and courier payout management
- Earnings calculation and tracking
- Commission and fee processing
- Tax reporting and compliance

## Data Ownership
- `payouts` - Payout records and transactions
- `earnings` - Earnings calculations and tracking
- `commissions` - Commission and fee records
- `tax_reports` - Tax reporting and compliance data

## API Endpoints

### 1. Calculate Earnings
**POST** `/payouts/calculate`

Calculates earnings for a traveler or courier.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_type": "traveler",
  "period": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "include_breakdown": true
}
```

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_type": "traveler",
  "period": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "total_earnings_cad": 1250.00,
  "currency": "CAD",
  "breakdown": {
    "base_earnings": 1000.00,
    "bonuses": 150.00,
    "tips": 100.00,
    "commissions": -50.00,
    "fees": -25.00,
    "adjustments": 0.00
  },
  "deliveries": {
    "total_count": 25,
    "successful_count": 24,
    "failed_count": 1,
    "average_rating": 4.8
  },
  "tax_information": {
    "gst_collected": 62.50,
    "qst_collected": 62.50,
    "total_tax_collected": 125.00,
    "net_earnings": 1125.00
  },
  "payout_eligibility": {
    "minimum_threshold": 50.00,
    "current_balance": 1125.00,
    "eligible_for_payout": true
  },
  "calculated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payouts/calculate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_type": "traveler",
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "include_breakdown": true
  }'
```

### 2. Request Payout
**POST** `/payouts/request`

Requests a payout for accumulated earnings.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 1125.00,
  "payout_method": "bank_transfer",
  "payout_details": {
    "bank_name": "RBC",
    "account_number": "1234567890",
    "routing_number": "000123456",
    "account_holder_name": "John Doe"
  },
  "tax_deduction": {
    "gst_deduction": 62.50,
    "qst_deduction": 62.50,
    "total_deduction": 125.00
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 1125.00,
  "currency": "CAD",
  "payout_method": "bank_transfer",
  "payout_details": {
    "bank_name": "RBC",
    "account_number": "1234567890",
    "routing_number": "000123456",
    "account_holder_name": "John Doe"
  },
  "tax_deduction": {
    "gst_deduction": 62.50,
    "qst_deduction": 62.50,
    "total_deduction": 125.00
  },
  "net_amount_cad": 1000.00,
  "status": "pending",
  "processing_fee_cad": 5.00,
  "estimated_delivery": "2024-01-17T12:00:00Z",
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payouts/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount_cad": 1125.00,
    "payout_method": "bank_transfer",
    "payout_details": {
      "bank_name": "RBC",
      "account_number": "1234567890",
      "routing_number": "000123456",
      "account_holder_name": "John Doe"
    },
    "tax_deduction": {
      "gst_deduction": 62.50,
      "qst_deduction": 62.50,
      "total_deduction": 125.00
    }
  }'
```

### 3. Get Payout Status
**GET** `/payouts/{id}`

Retrieves the status of a specific payout.

**Path Parameters:**
- `id` (string, required): Payout UUID

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_cad": 1125.00,
  "currency": "CAD",
  "payout_method": "bank_transfer",
  "payout_details": {
    "bank_name": "RBC",
    "account_number": "1234567890",
    "routing_number": "000123456",
    "account_holder_name": "John Doe"
  },
  "tax_deduction": {
    "gst_deduction": 62.50,
    "qst_deduction": 62.50,
    "total_deduction": 125.00
  },
  "net_amount_cad": 1000.00,
  "status": "completed",
  "processing_fee_cad": 5.00,
  "transaction_id": "txn_1234567890",
  "processor_response": {
    "processor": "stripe",
    "transfer_id": "tr_1234567890",
    "status": "succeeded"
  },
  "estimated_delivery": "2024-01-17T12:00:00Z",
  "actual_delivery": "2024-01-17T10:30:00Z",
  "created_at": "2024-01-15T12:30:00Z",
  "completed_at": "2024-01-17T10:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/payouts/550e8400-e29b-41d4-a716-446655440000
```

### 4. Get Payout History
**GET** `/payouts/history`

Retrieves payout history for the authenticated user.

**Query Parameters:**
- `status` (string, optional): Filter by payout status
- `payout_method` (string, optional): Filter by payout method
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of payouts to return (default: 20)
- `offset` (integer, optional): Number of payouts to skip (default: 0)

**Response:**
```json
{
  "payouts": [
    {
      "id": "uuid",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "amount_cad": 1125.00,
      "currency": "CAD",
      "payout_method": "bank_transfer",
      "net_amount_cad": 1000.00,
      "status": "completed",
      "processing_fee_cad": 5.00,
      "created_at": "2024-01-15T12:30:00Z",
      "completed_at": "2024-01-17T10:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/payouts/history?status=completed&limit=10"
```

### 5. Get Earnings Summary
**GET** `/payouts/earnings/summary`

Retrieves earnings summary for the authenticated user.

**Query Parameters:**
- `period` (string, optional): Time period (weekly, monthly, yearly, all_time)
- `include_breakdown` (boolean, optional): Include detailed breakdown

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "period": "monthly",
  "total_earnings_cad": 1250.00,
  "currency": "CAD",
  "breakdown": {
    "base_earnings": 1000.00,
    "bonuses": 150.00,
    "tips": 100.00,
    "commissions": -50.00,
    "fees": -25.00,
    "adjustments": 0.00
  },
  "deliveries": {
    "total_count": 25,
    "successful_count": 24,
    "failed_count": 1,
    "average_rating": 4.8
  },
  "tax_information": {
    "gst_collected": 62.50,
    "qst_collected": 62.50,
    "total_tax_collected": 125.00,
    "net_earnings": 1125.00
  },
  "payout_eligibility": {
    "minimum_threshold": 50.00,
    "current_balance": 1125.00,
    "eligible_for_payout": true
  },
  "generated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/payouts/earnings/summary?period=monthly&include_breakdown=true"
```

### 6. Update Payout Method
**PUT** `/payouts/method`

Updates the default payout method for a user.

**Request Body:**
```json
{
  "payout_method": "bank_transfer",
  "payout_details": {
    "bank_name": "TD Bank",
    "account_number": "9876543210",
    "routing_number": "000987654",
    "account_holder_name": "John Doe"
  },
  "is_default": true
}
```

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "payout_method": "bank_transfer",
  "payout_details": {
    "bank_name": "TD Bank",
    "account_number": "9876543210",
    "routing_number": "000987654",
    "account_holder_name": "John Doe"
  },
  "is_default": true,
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/payouts/method \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "payout_method": "bank_transfer",
    "payout_details": {
      "bank_name": "TD Bank",
      "account_number": "9876543210",
      "routing_number": "000987654",
      "account_holder_name": "John Doe"
    },
    "is_default": true
  }'
```

### 7. Get Tax Report
**GET** `/payouts/tax-report`

Retrieves tax reporting information for a user.

**Query Parameters:**
- `year` (integer, required): Tax year
- `format` (string, optional): Report format (json, pdf)

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "tax_year": 2024,
  "total_earnings_cad": 15000.00,
  "currency": "CAD",
  "tax_breakdown": {
    "gst_collected": 750.00,
    "qst_collected": 750.00,
    "total_tax_collected": 1500.00,
    "net_earnings": 13500.00
  },
  "deliveries": {
    "total_count": 300,
    "successful_count": 295,
    "failed_count": 5,
    "average_rating": 4.7
  },
  "payouts": {
    "total_count": 12,
    "total_amount_cad": 13500.00,
    "average_payout_cad": 1125.00
  },
  "deductions": {
    "processing_fees": 60.00,
    "commissions": 600.00,
    "total_deductions": 660.00
  },
  "net_income_cad": 12840.00,
  "generated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/payouts/tax-report?year=2024&format=json"
```

### 8. Process Payout
**POST** `/payouts/{id}/process`

Processes a pending payout.

**Path Parameters:**
- `id` (string, required): Payout UUID

**Request Body:**
```json
{
  "processed_by": "550e8400-e29b-41d4-a716-446655440003",
  "notes": "Payout processed successfully"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "completed",
  "transaction_id": "txn_1234567890",
  "processor_response": {
    "processor": "stripe",
    "transfer_id": "tr_1234567890",
    "status": "succeeded"
  },
  "processed_by": "550e8400-e29b-41d4-a716-446655440003",
  "notes": "Payout processed successfully",
  "processed_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/payouts/550e8400-e29b-41d4-a716-446655440000/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "processed_by": "550e8400-e29b-41d4-a716-446655440003",
    "notes": "Payout processed successfully"
  }'
```

## Database Tables

### payouts
Payout records and transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| amount_cad | decimal | Payout amount in CAD |
| currency | text | Currency code |
| payout_method | text | Payout method used |
| payout_details | jsonb | Payout method details |
| tax_deduction | jsonb | Tax deduction information |
| net_amount_cad | decimal | Net payout amount after deductions |
| status | text | Payout status |
| processing_fee_cad | decimal | Processing fee charged |
| transaction_id | text | External transaction ID |
| processor_response | jsonb | Payout processor response |
| estimated_delivery | timestamptz | Estimated delivery timestamp |
| actual_delivery | timestamptz | Actual delivery timestamp |
| created_at | timestamptz | Creation timestamp |
| completed_at | timestamptz | Completion timestamp |

### earnings
Earnings calculations and tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| period_start | timestamptz | Earnings period start |
| period_end | timestamptz | Earnings period end |
| total_earnings_cad | decimal | Total earnings in CAD |
| currency | text | Currency code |
| breakdown | jsonb | Detailed earnings breakdown |
| deliveries_count | integer | Number of deliveries |
| successful_deliveries | integer | Number of successful deliveries |
| average_rating | decimal | Average delivery rating |
| tax_information | jsonb | Tax calculation details |
| calculated_at | timestamptz | Calculation timestamp |
| created_at | timestamptz | Creation timestamp |

### commissions
Commission and fee records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| delivery_id | uuid | Foreign key to deliveries table |
| commission_type | text | Type of commission |
| amount_cad | decimal | Commission amount in CAD |
| currency | text | Currency code |
| percentage | decimal | Commission percentage |
| description | text | Commission description |
| calculated_at | timestamptz | Calculation timestamp |
| created_at | timestamptz | Creation timestamp |

### tax_reports
Tax reporting and compliance data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| tax_year | integer | Tax year |
| total_earnings_cad | decimal | Total earnings in CAD |
| currency | text | Currency code |
| tax_breakdown | jsonb | Detailed tax breakdown |
| deliveries_count | integer | Number of deliveries |
| payouts_count | integer | Number of payouts |
| deductions | jsonb | Deduction information |
| net_income_cad | decimal | Net income after deductions |
| generated_at | timestamptz | Report generation timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Earnings Calculation
- Real-time earnings tracking
- Detailed breakdowns
- Bonus and tip calculations
- Commission processing

### 2. Payout Management
- Multiple payout methods
- Automated processing
- Status tracking
- Fee management

### 3. Tax Compliance
- Tax calculation
- Reporting generation
- Deduction tracking
- Compliance monitoring

### 4. Financial Reporting
- Earnings analytics
- Performance metrics
- Payout history
- Tax reporting

## Security Considerations

- Financial data is encrypted
- Payout details are secure
- Tax information is protected
- Audit trail maintenance

## Integration Points

- **Payment Service**: Payout processing
- **User Service**: User verification
- **Delivery Service**: Earnings calculation
- **Tax Service**: Tax compliance

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_payout_data",
  "message": "Invalid payout data provided",
  "details": {
    "field": "amount_cad",
    "issue": "Amount must be greater than 0"
  }
}
```

**402 Payment Required:**
```json
{
  "error": "payout_failed",
  "message": "Payout processing failed",
  "details": {
    "reason": "Insufficient funds",
    "processor_error": "account_declined"
  }
}
```

**404 Not Found:**
```json
{
  "error": "payout_not_found",
  "message": "Payout not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "payout_not_eligible",
  "message": "Payout not eligible",
  "details": {
    "reason": "Amount below minimum threshold",
    "minimum_threshold": 50.00,
    "current_balance": 25.00
  }
}
```

## Rate Limiting

- Payout requests: 5 per hour per user
- Earnings calculations: 20 per hour per user
- Tax reports: 10 per hour per user
- Method updates: 10 per hour per user

## Payout Methods

### 1. Bank Transfer
- ACH transfers
- Wire transfers
- Processing delays
- Lower fees

### 2. Direct Deposit
- Automated deposits
- Faster processing
- Bank verification
- Instant confirmation

### 3. Digital Wallets
- PayPal, Venmo
- Quick access
- Mobile optimized
- Higher fees

### 4. Check
- Physical checks
- Slower processing
- No fees
- Mail delivery