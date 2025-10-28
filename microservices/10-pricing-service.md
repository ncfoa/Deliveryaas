# Pricing Service

## Overview
The Pricing Service handles dynamic pricing calculations, cost estimation, and pricing strategies for the platform. It manages base pricing, discounts, surcharges, and complex pricing rules.

## Purpose
- Dynamic pricing calculations
- Cost estimation and breakdown
- Pricing strategy management
- Discount and promotion handling

## Data Ownership
- `pricing_rules` - Pricing rules and strategies
- `base_prices` - Base pricing for different services
- `discounts` - Discount rules and promotions
- `pricing_history` - Historical pricing data

## API Endpoints

### 1. Calculate Package Price
**POST** `/pricing/calculate`

Calculates the total price for a package delivery.

**Request Body:**
```json
{
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "package_details": {
    "weight_kg": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    },
    "value_cad": 1500.00,
    "fragile": true,
    "requires_signature": true
  },
  "special_requirements": ["fragile_handling", "signature_required"],
  "insurance_required": true,
  "insurance_value_cad": 1500.00,
  "delivery_date": "2024-02-15",
  "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
  "promo_code": "SAVE20"
}
```

**Response:**
```json
{
  "total_price_cad": 95.50,
  "currency": "CAD",
  "price_breakdown": {
    "base_price": 75.00,
    "weight_surcharge": 5.00,
    "fragile_handling": 10.00,
    "signature_required": 5.00,
    "insurance": 15.00,
    "promo_discount": -20.00,
    "taxes": 7.50
  },
  "discounts_applied": [
    {
      "type": "promo_code",
      "code": "SAVE20",
      "amount": 20.00,
      "description": "20% off first delivery"
    }
  ],
  "surcharges_applied": [
    {
      "type": "weight_surcharge",
      "amount": 5.00,
      "description": "Weight exceeds 2kg"
    },
    {
      "type": "fragile_handling",
      "amount": 10.00,
      "description": "Fragile item handling"
    },
    {
      "type": "signature_required",
      "amount": 5.00,
      "description": "Signature required delivery"
    }
  ],
  "insurance": {
    "required": true,
    "value_cad": 1500.00,
    "premium_cad": 15.00,
    "coverage_amount_cad": 1500.00
  },
  "estimated_delivery": "2024-02-20T14:00:00Z",
  "price_valid_until": "2024-01-16T12:30:00Z",
  "calculation_timestamp": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/pricing/calculate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "package_details": {
      "weight_kg": 2.5,
      "dimensions": {
        "length": 30,
        "width": 20,
        "height": 15
      },
      "value_cad": 1500.00,
      "fragile": true,
      "requires_signature": true
    },
    "special_requirements": ["fragile_handling", "signature_required"],
    "insurance_required": true,
    "insurance_value_cad": 1500.00,
    "delivery_date": "2024-02-15",
    "traveler_id": "550e8400-e29b-41d4-a716-446655440000",
    "promo_code": "SAVE20"
  }'
```

### 2. Get Base Prices
**GET** `/pricing/base-prices`

Retrieves base pricing for different routes and services.

**Query Parameters:**
- `origin_airport` (string, optional): Filter by origin airport
- `destination_airport` (string, optional): Filter by destination airport
- `service_type` (string, optional): Filter by service type

**Response:**
```json
{
  "base_prices": [
    {
      "id": "uuid",
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "service_type": "standard",
      "base_price_cad": 75.00,
      "currency": "CAD",
      "weight_limit_kg": 2.0,
      "dimension_limit": {
        "length": 80,
        "width": 60,
        "height": 40
      },
      "valid_from": "2024-01-01T00:00:00Z",
      "valid_until": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": "uuid",
      "origin_airport": "YUL",
      "destination_airport": "CDG",
      "service_type": "standard",
      "base_price_cad": 70.00,
      "currency": "CAD",
      "weight_limit_kg": 2.0,
      "dimension_limit": {
        "length": 80,
        "width": 60,
        "height": 40
      },
      "valid_from": "2024-01-01T00:00:00Z",
      "valid_until": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 2
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/pricing/base-prices?origin_airport=YUL&service_type=standard"
```

### 3. Get Pricing Rules
**GET** `/pricing/rules`

Retrieves active pricing rules and strategies.

**Query Parameters:**
- `rule_type` (string, optional): Filter by rule type
- `active_only` (boolean, optional): Only return active rules
- `limit` (integer, optional): Number of rules to return (default: 20)

**Response:**
```json
{
  "pricing_rules": [
    {
      "id": "uuid",
      "name": "Weight Surcharge Rule",
      "rule_type": "surcharge",
      "condition": {
        "field": "weight_kg",
        "operator": ">",
        "value": 2.0
      },
      "action": {
        "type": "add_percentage",
        "value": 10.0,
        "description": "10% surcharge for weight over 2kg"
      },
      "priority": 1,
      "is_active": true,
      "valid_from": "2024-01-01T00:00:00Z",
      "valid_until": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": "uuid",
      "name": "Fragile Handling Surcharge",
      "rule_type": "surcharge",
      "condition": {
        "field": "fragile",
        "operator": "==",
        "value": true
      },
      "action": {
        "type": "add_fixed",
        "value": 10.0,
        "description": "Fixed $10 surcharge for fragile items"
      },
      "priority": 2,
      "is_active": true,
      "valid_from": "2024-01-01T00:00:00Z",
      "valid_until": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 2,
  "limit": 20
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/pricing/rules?rule_type=surcharge&active_only=true&limit=10"
```

### 4. Validate Promo Code
**POST** `/pricing/validate-promo`

Validates a promo code and returns discount information.

**Request Body:**
```json
{
  "promo_code": "SAVE20",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "package_value_cad": 1500.00,
  "origin_airport": "YUL",
  "destination_airport": "LHR"
}
```

**Response:**
```json
{
  "valid": true,
  "promo_code": "SAVE20",
  "discount_type": "percentage",
  "discount_value": 20.0,
  "discount_amount_cad": 20.00,
  "description": "20% off first delivery",
  "terms_and_conditions": "Valid for first-time users only. Cannot be combined with other offers.",
  "expires_at": "2024-12-31T23:59:59Z",
  "usage_limit": 1,
  "usage_count": 0,
  "remaining_uses": 1
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/pricing/validate-promo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "promo_code": "SAVE20",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "package_value_cad": 1500.00,
    "origin_airport": "YUL",
    "destination_airport": "LHR"
  }'
```

### 5. Get Insurance Quote
**POST** `/pricing/insurance-quote`

Calculates insurance premium for a package.

**Request Body:**
```json
{
  "package_value_cad": 1500.00,
  "package_details": {
    "weight_kg": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    },
    "fragile": true,
    "category": "electronics"
  },
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "coverage_type": "full"
}
```

**Response:**
```json
{
  "coverage_amount_cad": 1500.00,
  "premium_cad": 15.00,
  "currency": "CAD",
  "coverage_type": "full",
  "deductible_cad": 50.00,
  "coverage_details": {
    "theft_protection": true,
    "damage_protection": true,
    "loss_protection": true,
    "delay_protection": false
  },
  "terms_and_conditions": "Coverage subject to terms and conditions. Claims must be filed within 30 days.",
  "quote_valid_until": "2024-01-16T12:30:00Z",
  "calculation_timestamp": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/pricing/insurance-quote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "package_value_cad": 1500.00,
    "package_details": {
      "weight_kg": 2.5,
      "dimensions": {
        "length": 30,
        "width": 20,
        "height": 15
      },
      "fragile": true,
      "category": "electronics"
    },
    "origin_airport": "YUL",
    "destination_airport": "LHR",
    "coverage_type": "full"
  }'
```

### 6. Get Pricing History
**GET** `/pricing/history`

Retrieves historical pricing data for analysis.

**Query Parameters:**
- `origin_airport` (string, optional): Filter by origin airport
- `destination_airport` (string, optional): Filter by destination airport
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of records to return (default: 50)

**Response:**
```json
{
  "pricing_history": [
    {
      "id": "uuid",
      "origin_airport": "YUL",
      "destination_airport": "LHR",
      "base_price_cad": 75.00,
      "average_price_cad": 85.50,
      "price_range": {
        "min_cad": 70.00,
        "max_cad": 95.00
      },
      "volume": 150,
      "date": "2024-01-15",
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/pricing/history?origin_airport=YUL&destination_airport=LHR&date_from=2024-01-01&date_to=2024-01-31&limit=20"
```

### 7. Update Base Prices
**PUT** `/pricing/base-prices/{id}`

Updates base pricing for a specific route.

**Path Parameters:**
- `id` (string, required): Base price UUID

**Request Body:**
```json
{
  "base_price_cad": 80.00,
  "weight_limit_kg": 2.5,
  "dimension_limit": {
    "length": 90,
    "width": 70,
    "height": 50
  },
  "valid_from": "2024-02-01T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "origin_airport": "YUL",
  "destination_airport": "LHR",
  "service_type": "standard",
  "base_price_cad": 80.00,
  "currency": "CAD",
  "weight_limit_kg": 2.5,
  "dimension_limit": {
    "length": 90,
    "width": 70,
    "height": 50
  },
  "valid_from": "2024-02-01T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/pricing/base-prices/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "base_price_cad": 80.00,
    "weight_limit_kg": 2.5,
    "dimension_limit": {
      "length": 90,
      "width": 70,
      "height": 50
    },
    "valid_from": "2024-02-01T00:00:00Z",
    "valid_until": "2024-12-31T23:59:59Z"
  }'
```

### 8. Create Pricing Rule
**POST** `/pricing/rules`

Creates a new pricing rule.

**Request Body:**
```json
{
  "name": "Holiday Surcharge",
  "rule_type": "surcharge",
  "condition": {
    "field": "delivery_date",
    "operator": "in",
    "value": ["2024-12-24", "2024-12-25", "2024-12-26"]
  },
  "action": {
    "type": "add_percentage",
    "value": 25.0,
    "description": "25% surcharge for holiday deliveries"
  },
  "priority": 1,
  "is_active": true,
  "valid_from": "2024-12-01T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Holiday Surcharge",
  "rule_type": "surcharge",
  "condition": {
    "field": "delivery_date",
    "operator": "in",
    "value": ["2024-12-24", "2024-12-25", "2024-12-26"]
  },
  "action": {
    "type": "add_percentage",
    "value": 25.0,
    "description": "25% surcharge for holiday deliveries"
  },
  "priority": 1,
  "is_active": true,
  "valid_from": "2024-12-01T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/pricing/rules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Holiday Surcharge",
    "rule_type": "surcharge",
    "condition": {
      "field": "delivery_date",
      "operator": "in",
      "value": ["2024-12-24", "2024-12-25", "2024-12-26"]
    },
    "action": {
      "type": "add_percentage",
      "value": 25.0,
      "description": "25% surcharge for holiday deliveries"
    },
    "priority": 1,
    "is_active": true,
    "valid_from": "2024-12-01T00:00:00Z",
    "valid_until": "2024-12-31T23:59:59Z"
  }'
```

## Database Tables

### pricing_rules
Pricing rules and strategies.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Rule name |
| rule_type | text | Type of rule (surcharge, discount, base_price) |
| condition | jsonb | Rule condition logic |
| action | jsonb | Rule action to take |
| priority | integer | Rule priority (higher = more important) |
| is_active | boolean | Whether rule is active |
| valid_from | timestamptz | Rule validity start |
| valid_until | timestamptz | Rule validity end |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### base_prices
Base pricing for different routes and services.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| origin_airport | text | Origin airport code |
| destination_airport | text | Destination airport code |
| service_type | text | Type of service |
| base_price_cad | decimal | Base price in CAD |
| currency | text | Currency code |
| weight_limit_kg | decimal | Weight limit in kg |
| dimension_limit | jsonb | Dimension limits |
| valid_from | timestamptz | Price validity start |
| valid_until | timestamptz | Price validity end |
| created_at | timestamptz | Creation timestamp |

### discounts
Discount rules and promotions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Discount name |
| code | text | Discount code |
| discount_type | text | Type of discount (percentage, fixed, free_shipping) |
| discount_value | decimal | Discount value |
| conditions | jsonb | Discount conditions |
| usage_limit | integer | Maximum usage limit |
| usage_count | integer | Current usage count |
| valid_from | timestamptz | Discount validity start |
| valid_until | timestamptz | Discount validity end |
| is_active | boolean | Whether discount is active |
| created_at | timestamptz | Creation timestamp |

### pricing_history
Historical pricing data for analysis.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| origin_airport | text | Origin airport code |
| destination_airport | text | Destination airport code |
| base_price_cad | decimal | Base price in CAD |
| average_price_cad | decimal | Average price in CAD |
| price_range | jsonb | Min/max price range |
| volume | integer | Number of transactions |
| date | date | Date of pricing data |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Dynamic Pricing
- Real-time price calculations
- Rule-based pricing engine
- A/B testing support
- Market-based adjustments

### 2. Cost Estimation
- Detailed price breakdowns
- Surcharge calculations
- Discount applications
- Tax calculations

### 3. Promotional Pricing
- Promo code validation
- Discount management
- Usage tracking
- Expiration handling

### 4. Insurance Pricing
- Risk-based premiums
- Coverage calculations
- Deductible management
- Claims processing

## Security Considerations

- Pricing data is encrypted
- Promo codes are secure
- User data is protected
- Financial calculations are audited

## Integration Points

- **Payment Service**: Price validation and processing
- **Trip Service**: Route-based pricing
- **User Service**: User-specific pricing
- **Analytics Service**: Pricing metrics and insights

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_pricing_data",
  "message": "Invalid pricing data provided",
  "details": {
    "field": "weight_kg",
    "issue": "Weight must be greater than 0"
  }
}
```

**404 Not Found:**
```json
{
  "error": "pricing_rule_not_found",
  "message": "Pricing rule not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "promo_code_invalid",
  "message": "Promo code is invalid or expired",
  "details": {
    "code": "SAVE20",
    "reason": "Usage limit exceeded"
  }
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many pricing requests",
  "retry_after": 60
}
```

## Rate Limiting

- Price calculations: 200 per hour per user
- Promo validation: 100 per hour per user
- Insurance quotes: 50 per hour per user
- Pricing history: 20 per hour per user

## Pricing Components

### 1. Base Price
- Route-based pricing
- Service type pricing
- Distance calculations
- Market rates

### 2. Surcharges
- Weight surcharges
- Dimension surcharges
- Special handling fees
- Time-based surcharges

### 3. Discounts
- Promo code discounts
- Volume discounts
- Loyalty discounts
- Seasonal discounts

### 4. Insurance
- Risk-based premiums
- Coverage options
- Deductible calculations
- Claims processing