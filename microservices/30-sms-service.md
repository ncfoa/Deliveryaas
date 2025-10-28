# SMS Service

## Overview
The SMS Service handles SMS delivery, template management, and SMS analytics. It provides reliable SMS communication across the platform.

## Purpose
- SMS delivery and management
- SMS template system
- SMS analytics and tracking
- SMS delivery status handling

## Data Ownership
- `sms_messages` - SMS records and metadata
- `sms_templates` - SMS templates
- `sms_deliveries` - SMS delivery tracking
- `sms_analytics` - SMS performance metrics

## API Endpoints

### 1. Send SMS
**POST** `/sms/send`

Sends an SMS to one or more recipients.

**Request Body:**
```json
{
  "to": [
    {
      "phone_number": "+1234567890",
      "country_code": "US"
    }
  ],
  "message": "Your package #12345 is out for delivery. Track at: https://delivery.com/track/12345",
  "template_id": "delivery_update_template",
  "template_data": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "out_for_delivery",
    "estimated_delivery": "2024-01-15T14:30:00Z",
    "courier_name": "John Smith",
    "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
  },
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z",
  "tracking_enabled": true,
  "unicode": false,
  "flash": false
}
```

**Response:**
```json
{
  "sms_id": "sms_123456789",
  "message_id": "msg_123456789",
  "to": [
    {
      "phone_number": "+1234567890",
      "country_code": "US"
    }
  ],
  "message": "Your package #12345 is out for delivery. Track at: https://delivery.com/track/12345",
  "template_id": "delivery_update_template",
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z",
  "status": "queued",
  "created_at": "2024-01-15T12:00:00Z",
  "estimated_delivery": "2024-01-15T12:05:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/sms/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "to": [
      {
        "phone_number": "+1234567890",
        "country_code": "US"
      }
    ],
    "message": "Your package #12345 is out for delivery. Track at: https://delivery.com/track/12345",
    "template_id": "delivery_update_template",
    "template_data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith",
      "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
    },
    "priority": "high",
    "scheduled_for": "2024-01-15T12:00:00Z",
    "tracking_enabled": true,
    "unicode": false,
    "flash": false
  }'
```

### 2. Get SMS Status
**GET** `/sms/{sms_id}`

Retrieves SMS status and delivery information.

**Path Parameters:**
- `sms_id` (string, required): SMS UUID

**Response:**
```json
{
  "sms_id": "sms_123456789",
  "message_id": "msg_123456789",
  "to": [
    {
      "phone_number": "+1234567890",
      "country_code": "US",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:05:00Z"
    }
  ],
  "message": "Your package #12345 is out for delivery. Track at: https://delivery.com/track/12345",
  "template_id": "delivery_update_template",
  "priority": "high",
  "status": "delivered",
  "created_at": "2024-01-15T12:00:00Z",
  "sent_at": "2024-01-15T12:00:05Z",
  "delivered_at": "2024-01-15T12:05:00Z",
  "bounced_at": null,
  "failed_at": null,
  "tracking_data": {
    "deliveries": 1,
    "bounces": 0,
    "failures": 0
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/sms/sms_123456789
```

### 3. Create SMS Template
**POST** `/sms/templates`

Creates a new SMS template.

**Request Body:**
```json
{
  "name": "Delivery Update Template",
  "message": "Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "max_length": 160,
  "unicode": false,
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "template_id": "delivery_update_template",
  "name": "Delivery Update Template",
  "message": "Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "max_length": 160,
  "unicode": false,
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/sms/templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Delivery Update Template",
    "message": "Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
    "category": "delivery",
    "tags": ["delivery", "update", "notification"],
    "variables": [
      {
        "name": "delivery_id",
        "type": "string",
        "required": true,
        "description": "Delivery identifier"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "description": "Delivery status"
      },
      {
        "name": "estimated_delivery",
        "type": "datetime",
        "required": false,
        "description": "Estimated delivery time"
      },
      {
        "name": "courier_name",
        "type": "string",
        "required": false,
        "description": "Courier name"
      },
      {
        "name": "tracking_url",
        "type": "url",
        "required": false,
        "description": "Tracking URL"
      }
    ],
    "max_length": 160,
    "unicode": false,
    "created_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 4. Get SMS Templates
**GET** `/sms/templates`

Retrieves SMS templates with filtering.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `tags` (string[], optional): Filter by tags
- `status` (string, optional): Filter by status
- `created_by` (string, optional): Filter by creator
- `limit` (integer, optional): Number of templates (default: 50)
- `offset` (integer, optional): Number of templates to skip (default: 0)

**Response:**
```json
{
  "templates": [
    {
      "template_id": "delivery_update_template",
      "name": "Delivery Update Template",
      "message": "Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
      "category": "delivery",
      "tags": ["delivery", "update", "notification"],
      "max_length": 160,
      "unicode": false,
      "status": "active",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-15T12:30:00Z",
      "updated_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "category": "delivery",
    "tags": ["delivery", "update"],
    "status": "active"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/sms/templates?category=delivery&tags=delivery,update&status=active&limit=50&offset=0"
```

### 5. Update SMS Template
**PUT** `/sms/templates/{template_id}`

Updates an existing SMS template.

**Path Parameters:**
- `template_id` (string, required): Template identifier

**Request Body:**
```json
{
  "name": "Updated Delivery Update Template",
  "message": "Updated: Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification", "updated"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "max_length": 160,
  "unicode": false,
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "template_id": "delivery_update_template",
  "name": "Updated Delivery Update Template",
  "message": "Updated: Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification", "updated"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "max_length": 160,
  "unicode": false,
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/sms/templates/delivery_update_template \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Updated Delivery Update Template",
    "message": "Updated: Your package #{{delivery_id}} is {{status}}. Estimated delivery: {{estimated_delivery}}. Courier: {{courier_name}}. Track: {{tracking_url}}",
    "category": "delivery",
    "tags": ["delivery", "update", "notification", "updated"],
    "variables": [
      {
        "name": "delivery_id",
        "type": "string",
        "required": true,
        "description": "Delivery identifier"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "description": "Delivery status"
      },
      {
        "name": "estimated_delivery",
        "type": "datetime",
        "required": false,
        "description": "Estimated delivery time"
      },
      {
        "name": "courier_name",
        "type": "string",
        "required": false,
        "description": "Courier name"
      },
      {
        "name": "tracking_url",
        "type": "url",
        "required": false,
        "description": "Tracking URL"
      }
    ],
    "max_length": 160,
    "unicode": false,
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 6. Get SMS Analytics
**GET** `/sms/analytics`

Retrieves SMS performance analytics.

**Query Parameters:**
- `template_id` (string, optional): Filter by template
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `category` (string, optional): Filter by category

**Response:**
```json
{
  "overview": {
    "total_sms": 1000000,
    "delivered": 950000,
    "bounced": 25000,
    "failed": 25000,
    "delivery_rate": 0.95,
    "bounce_rate": 0.03,
    "failure_rate": 0.03
  },
  "template_performance": [
    {
      "template_id": "delivery_update_template",
      "name": "Delivery Update Template",
      "sms_sent": 100000,
      "delivered": 95000,
      "bounced": 3000,
      "failed": 2000,
      "delivery_rate": 0.95,
      "bounce_rate": 0.03,
      "failure_rate": 0.02
    }
  ],
  "category_breakdown": [
    {
      "category": "delivery",
      "sms_sent": 600000,
      "delivered": 570000,
      "bounced": 15000,
      "failed": 15000,
      "delivery_rate": 0.95,
      "bounce_rate": 0.03,
      "failure_rate": 0.03
    },
    {
      "category": "notification",
      "sms_sent": 300000,
      "delivered": 285000,
      "bounced": 7500,
      "failed": 7500,
      "delivery_rate": 0.95,
      "bounce_rate": 0.03,
      "failure_rate": 0.03
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "sms_sent": 10000,
      "delivered": 9500,
      "bounced": 250,
      "failed": 250
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/sms/analytics?template_id=delivery_update_template&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&category=delivery"
```

### 7. Handle SMS Bounce
**POST** `/sms/bounces`

Handles SMS bounce events.

**Request Body:**
```json
{
  "sms_id": "sms_123456789",
  "bounce_type": "hard",
  "bounce_reason": "invalid_number",
  "bounce_message": "The phone number does not exist",
  "bounced_at": "2024-01-15T12:30:00Z",
  "recipient_phone": "+1234567890"
}
```

**Response:**
```json
{
  "sms_id": "sms_123456789",
  "bounce_type": "hard",
  "bounce_reason": "invalid_number",
  "bounce_message": "The phone number does not exist",
  "bounced_at": "2024-01-15T12:30:00Z",
  "recipient_phone": "+1234567890",
  "processed": true,
  "processed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/sms/bounces \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "sms_id": "sms_123456789",
    "bounce_type": "hard",
    "bounce_reason": "invalid_number",
    "bounce_message": "The phone number does not exist",
    "bounced_at": "2024-01-15T12:30:00Z",
    "recipient_phone": "+1234567890"
  }'
```

### 8. Handle SMS Failure
**POST** `/sms/failures`

Handles SMS failure events.

**Request Body:**
```json
{
  "sms_id": "sms_123456789",
  "failure_type": "network_error",
  "failure_reason": "Network timeout",
  "failure_message": "SMS failed to send due to network timeout",
  "failed_at": "2024-01-15T12:30:00Z",
  "recipient_phone": "+1234567890"
}
```

**Response:**
```json
{
  "sms_id": "sms_123456789",
  "failure_type": "network_error",
  "failure_reason": "Network timeout",
  "failure_message": "SMS failed to send due to network timeout",
  "failed_at": "2024-01-15T12:30:00Z",
  "recipient_phone": "+1234567890",
  "processed": true,
  "processed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/sms/failures \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "sms_id": "sms_123456789",
    "failure_type": "network_error",
    "failure_reason": "Network timeout",
    "failure_message": "SMS failed to send due to network timeout",
    "failed_at": "2024-01-15T12:30:00Z",
    "recipient_phone": "+1234567890"
  }'
```

## Database Tables

### sms_messages
SMS records and metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| sms_id | text | SMS identifier |
| message_id | text | Message identifier |
| to | jsonb | Recipient information |
| message | text | SMS message |
| template_id | text | Template identifier |
| template_data | jsonb | Template data |
| priority | text | SMS priority |
| scheduled_for | timestamptz | Scheduled send time |
| status | text | SMS status |
| unicode | boolean | Unicode flag |
| flash | boolean | Flash flag |
| created_at | timestamptz | Creation timestamp |
| sent_at | timestamptz | Send timestamp |
| delivered_at | timestamptz | Delivery timestamp |
| bounced_at | timestamptz | Bounce timestamp |
| failed_at | timestamptz | Failure timestamp |

### sms_templates
SMS templates.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| template_id | text | Template identifier |
| name | text | Template name |
| message | text | SMS message |
| category | text | Template category |
| tags | text[] | Template tags |
| variables | jsonb | Template variables |
| max_length | integer | Maximum message length |
| unicode | boolean | Unicode flag |
| status | text | Template status |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |
| updated_by | uuid | Last updater user ID |
| updated_at | timestamptz | Last update timestamp |

### sms_deliveries
SMS delivery tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| sms_id | uuid | Reference to sms_messages |
| recipient_phone | text | Recipient phone number |
| status | text | Delivery status |
| delivered_at | timestamptz | Delivery timestamp |
| bounced_at | timestamptz | Bounce timestamp |
| failed_at | timestamptz | Failure timestamp |
| created_at | timestamptz | Creation timestamp |

### sms_analytics
SMS performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_value | decimal | Metric value |
| template_id | text | Template identifier |
| category | text | SMS category |
| date | date | Metric date |
| hour | integer | Metric hour |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. SMS Delivery
- Reliable SMS sending
- Delivery tracking
- Bounce handling
- Failure management

### 2. Template System
- Dynamic templates
- Variable substitution
- Template versioning
- Template management

### 3. Analytics & Tracking
- Delivery tracking
- Bounce tracking
- Failure tracking
- Performance metrics

### 4. SMS Management
- SMS scheduling
- Priority handling
- Unicode support
- Flash SMS support

## Security Considerations

- Phone number validation
- Spam prevention
- Rate limiting
- Data privacy

## Integration Points

- **Notification Service**: SMS notifications
- **User Service**: User SMS preferences
- **Delivery Service**: Delivery notifications
- **Analytics Service**: SMS metrics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_phone_number",
  "message": "Invalid phone number",
  "details": {
    "field": "to",
    "issue": "Invalid phone number format"
  }
}
```

**404 Not Found:**
```json
{
  "error": "template_not_found",
  "message": "SMS template not found",
  "details": {
    "template_id": "delivery_update_template"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "template_validation_failed",
  "message": "Template validation failed",
  "details": {
    "issues": [
      "Missing required variable: delivery_id",
      "Invalid variable type: status"
    ]
  }
}
```

## Rate Limiting

- SMS sending: 1000 per hour per user
- Template operations: 100 per hour per user
- Analytics queries: 50 per hour per user
- Bounce/failure handling: 1000 per hour per user

## SMS Features

### 1. SMS Types
- Transactional
- Marketing
- Notification
- System

### 2. Template Variables
- String variables
- Date variables
- URL variables
- Custom variables

### 3. Delivery Status
- Queued
- Sent
- Delivered
- Bounced
- Failed

### 4. SMS Categories
- Delivery
- Payment
- User
- System
- Marketing

### 5. Message Features
- Unicode support
- Flash SMS
- Long SMS
- Concatenated SMS