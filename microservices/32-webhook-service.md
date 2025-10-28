# Webhook Service

## Overview
The Webhook Service manages webhook subscriptions, delivery, and retry logic. It handles event notifications to external systems and provides reliable webhook delivery.

## Purpose
- Webhook subscription management
- Event delivery to external systems
- Webhook retry and failure handling
- Webhook security and authentication

## Data Ownership
- `webhook_subscriptions` - Webhook subscription configurations
- `webhook_deliveries` - Webhook delivery records
- `webhook_events` - Webhook event logs
- `webhook_secrets` - Webhook authentication secrets

## API Endpoints

### 1. Create Webhook Subscription
**POST** `/webhooks/subscriptions`

Creates a new webhook subscription.

**Request Body:**
```json
{
  "name": "Delivery Status Webhook",
  "description": "Webhook for delivery status updates",
  "url": "https://client.example.com/webhooks/delivery-status",
  "events": [
    "delivery.created",
    "delivery.updated",
    "delivery.completed",
    "delivery.cancelled"
  ],
  "secret": "webhook_secret_123456789",
  "headers": {
    "Authorization": "Bearer client_token_here",
    "X-Webhook-Source": "delivery-platform"
  },
  "retry_policy": {
    "max_retries": 3,
    "retry_delay": 1000,
    "backoff_multiplier": 2,
    "max_delay": 30000
  },
  "timeout": 30000,
  "enabled": true,
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "subscription_id": "webhook_123456789",
  "name": "Delivery Status Webhook",
  "description": "Webhook for delivery status updates",
  "url": "https://client.example.com/webhooks/delivery-status",
  "events": [
    "delivery.created",
    "delivery.updated",
    "delivery.completed",
    "delivery.cancelled"
  ],
  "secret": "webhook_secret_123456789",
  "headers": {
    "Authorization": "Bearer client_token_here",
    "X-Webhook-Source": "delivery-platform"
  },
  "retry_policy": {
    "max_retries": 3,
    "retry_delay": 1000,
    "backoff_multiplier": 2,
    "max_delay": 30000
  },
  "timeout": 30000,
  "enabled": true,
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/webhooks/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Delivery Status Webhook",
    "description": "Webhook for delivery status updates",
    "url": "https://client.example.com/webhooks/delivery-status",
    "events": [
      "delivery.created",
      "delivery.updated",
      "delivery.completed",
      "delivery.cancelled"
    ],
    "secret": "webhook_secret_123456789",
    "headers": {
      "Authorization": "Bearer client_token_here",
      "X-Webhook-Source": "delivery-platform"
    },
    "retry_policy": {
      "max_retries": 3,
      "retry_delay": 1000,
      "backoff_multiplier": 2,
      "max_delay": 30000
    },
    "timeout": 30000,
    "enabled": true,
    "created_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 2. Get Webhook Subscriptions
**GET** `/webhooks/subscriptions`

Retrieves webhook subscriptions with filtering.

**Query Parameters:**
- `events` (string[], optional): Filter by events
- `enabled` (boolean, optional): Filter by enabled status
- `created_by` (string, optional): Filter by creator
- `limit` (integer, optional): Number of subscriptions (default: 50)
- `offset` (integer, optional): Number of subscriptions to skip (default: 0)

**Response:**
```json
{
  "subscriptions": [
    {
      "subscription_id": "webhook_123456789",
      "name": "Delivery Status Webhook",
      "description": "Webhook for delivery status updates",
      "url": "https://client.example.com/webhooks/delivery-status",
      "events": [
        "delivery.created",
        "delivery.updated",
        "delivery.completed",
        "delivery.cancelled"
      ],
      "enabled": true,
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-15T12:30:00Z",
      "updated_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "events": ["delivery.created", "delivery.updated"],
    "enabled": true
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/webhooks/subscriptions?events=delivery.created,delivery.updated&enabled=true&limit=50&offset=0"
```

### 3. Update Webhook Subscription
**PUT** `/webhooks/subscriptions/{subscription_id}`

Updates an existing webhook subscription.

**Path Parameters:**
- `subscription_id` (string, required): Subscription UUID

**Request Body:**
```json
{
  "name": "Updated Delivery Status Webhook",
  "description": "Updated webhook for delivery status updates",
  "url": "https://client.example.com/webhooks/delivery-status-v2",
  "events": [
    "delivery.created",
    "delivery.updated",
    "delivery.completed",
    "delivery.cancelled",
    "delivery.failed"
  ],
  "secret": "updated_webhook_secret_123456789",
  "headers": {
    "Authorization": "Bearer updated_client_token_here",
    "X-Webhook-Source": "delivery-platform",
    "X-Webhook-Version": "v2"
  },
  "retry_policy": {
    "max_retries": 5,
    "retry_delay": 2000,
    "backoff_multiplier": 2,
    "max_delay": 60000
  },
  "timeout": 45000,
  "enabled": true,
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "subscription_id": "webhook_123456789",
  "name": "Updated Delivery Status Webhook",
  "description": "Updated webhook for delivery status updates",
  "url": "https://client.example.com/webhooks/delivery-status-v2",
  "events": [
    "delivery.created",
    "delivery.updated",
    "delivery.completed",
    "delivery.cancelled",
    "delivery.failed"
  ],
  "secret": "updated_webhook_secret_123456789",
  "headers": {
    "Authorization": "Bearer updated_client_token_here",
    "X-Webhook-Source": "delivery-platform",
    "X-Webhook-Version": "v2"
  },
  "retry_policy": {
    "max_retries": 5,
    "retry_delay": 2000,
    "backoff_multiplier": 2,
    "max_delay": 60000
  },
  "timeout": 45000,
  "enabled": true,
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/webhooks/subscriptions/webhook_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Updated Delivery Status Webhook",
    "description": "Updated webhook for delivery status updates",
    "url": "https://client.example.com/webhooks/delivery-status-v2",
    "events": [
      "delivery.created",
      "delivery.updated",
      "delivery.completed",
      "delivery.cancelled",
      "delivery.failed"
    ],
    "secret": "updated_webhook_secret_123456789",
    "headers": {
      "Authorization": "Bearer updated_client_token_here",
      "X-Webhook-Source": "delivery-platform",
      "X-Webhook-Version": "v2"
    },
    "retry_policy": {
      "max_retries": 5,
      "retry_delay": 2000,
      "backoff_multiplier": 2,
      "max_delay": 60000
    },
    "timeout": 45000,
    "enabled": true,
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 4. Delete Webhook Subscription
**DELETE** `/webhooks/subscriptions/{subscription_id}`

Deletes a webhook subscription.

**Path Parameters:**
- `subscription_id` (string, required): Subscription UUID

**Request Body:**
```json
{
  "reason": "Client requested deletion",
  "deleted_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "subscription_id": "webhook_123456789",
  "deleted": true,
  "deleted_at": "2024-01-15T14:30:00Z",
  "deleted_by": "550e8400-e29b-41d4-a716-446655440000",
  "reason": "Client requested deletion"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/webhooks/subscriptions/webhook_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reason": "Client requested deletion",
    "deleted_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 5. Send Webhook Event
**POST** `/webhooks/events`

Sends a webhook event to subscribed endpoints.

**Request Body:**
```json
{
  "event_type": "delivery.updated",
  "event_data": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "out_for_delivery",
    "updated_at": "2024-01-15T12:30:00Z",
    "courier_name": "John Smith",
    "estimated_delivery": "2024-01-15T14:30:00Z"
  },
  "event_id": "event_123456789",
  "timestamp": "2024-01-15T12:30:00Z",
  "source": "delivery-service",
  "version": "1.0"
}
```

**Response:**
```json
{
  "event_id": "event_123456789",
  "event_type": "delivery.updated",
  "deliveries": [
    {
      "subscription_id": "webhook_123456789",
      "url": "https://client.example.com/webhooks/delivery-status",
      "status": "queued",
      "delivery_id": "delivery_123456789"
    }
  ],
  "total_subscriptions": 1,
  "queued_deliveries": 1,
  "failed_deliveries": 0,
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/webhooks/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "event_type": "delivery.updated",
    "event_data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "updated_at": "2024-01-15T12:30:00Z",
      "courier_name": "John Smith",
      "estimated_delivery": "2024-01-15T14:30:00Z"
    },
    "event_id": "event_123456789",
    "timestamp": "2024-01-15T12:30:00Z",
    "source": "delivery-service",
    "version": "1.0"
  }'
```

### 6. Get Webhook Delivery Status
**GET** `/webhooks/deliveries/{delivery_id}`

Retrieves webhook delivery status and details.

**Path Parameters:**
- `delivery_id` (string, required): Delivery UUID

**Response:**
```json
{
  "delivery_id": "delivery_123456789",
  "subscription_id": "webhook_123456789",
  "event_id": "event_123456789",
  "event_type": "delivery.updated",
  "url": "https://client.example.com/webhooks/delivery-status",
  "status": "delivered",
  "attempts": 1,
  "max_retries": 3,
  "retry_delay": 1000,
  "timeout": 30000,
  "created_at": "2024-01-15T12:30:00Z",
  "first_attempt_at": "2024-01-15T12:30:05Z",
  "delivered_at": "2024-01-15T12:30:10Z",
  "response_status": 200,
  "response_headers": {
    "Content-Type": "application/json",
    "X-Webhook-Received": "true"
  },
  "response_body": "{\"status\": \"received\", \"message\": \"Webhook processed successfully\"}",
  "duration_ms": 5000,
  "error_message": null,
  "next_retry_at": null
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/webhooks/deliveries/delivery_123456789
```

### 7. Retry Webhook Delivery
**POST** `/webhooks/deliveries/{delivery_id}/retry`

Retries a failed webhook delivery.

**Path Parameters:**
- `delivery_id` (string, required): Delivery UUID

**Request Body:**
```json
{
  "reason": "Manual retry requested",
  "retry_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "delivery_id": "delivery_123456789",
  "retry_scheduled": true,
  "retry_at": "2024-01-15T12:35:00Z",
  "attempt": 2,
  "max_retries": 3,
  "reason": "Manual retry requested",
  "retry_by": "550e8400-e29b-41d4-a716-446655440000",
  "scheduled_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/webhooks/deliveries/delivery_123456789/retry \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reason": "Manual retry requested",
    "retry_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 8. Get Webhook Analytics
**GET** `/webhooks/analytics`

Retrieves webhook performance analytics.

**Query Parameters:**
- `subscription_id` (string, optional): Filter by subscription
- `event_type` (string, optional): Filter by event type
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_deliveries": 1000000,
    "successful_deliveries": 950000,
    "failed_deliveries": 50000,
    "success_rate": 0.95,
    "average_delivery_time": 2000,
    "p95_delivery_time": 5000,
    "p99_delivery_time": 10000
  },
  "subscription_performance": [
    {
      "subscription_id": "webhook_123456789",
      "name": "Delivery Status Webhook",
      "url": "https://client.example.com/webhooks/delivery-status",
      "deliveries": 100000,
      "successful": 95000,
      "failed": 5000,
      "success_rate": 0.95,
      "average_delivery_time": 2000
    }
  ],
  "event_type_breakdown": [
    {
      "event_type": "delivery.updated",
      "deliveries": 400000,
      "successful": 380000,
      "failed": 20000,
      "success_rate": 0.95
    },
    {
      "event_type": "delivery.created",
      "deliveries": 300000,
      "successful": 285000,
      "failed": 15000,
      "success_rate": 0.95
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "deliveries": 10000,
      "successful": 9500,
      "failed": 500
    }
  ],
  "error_breakdown": [
    {
      "error_type": "timeout",
      "count": 20000,
      "percentage": 0.40
    },
    {
      "error_type": "connection_error",
      "count": 15000,
      "percentage": 0.30
    },
    {
      "error_type": "http_error",
      "count": 10000,
      "percentage": 0.20
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/webhooks/analytics?subscription_id=webhook_123456789&event_type=delivery.updated&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

## Database Tables

### webhook_subscriptions
Webhook subscription configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| subscription_id | text | Subscription identifier |
| name | text | Subscription name |
| description | text | Subscription description |
| url | text | Webhook URL |
| events | text[] | Subscribed events |
| secret | text | Webhook secret |
| headers | jsonb | Custom headers |
| retry_policy | jsonb | Retry policy |
| timeout | integer | Request timeout |
| enabled | boolean | Subscription enabled |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |
| updated_by | uuid | Last updater user ID |
| updated_at | timestamptz | Last update timestamp |

### webhook_deliveries
Webhook delivery records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| delivery_id | text | Delivery identifier |
| subscription_id | uuid | Reference to webhook_subscriptions |
| event_id | text | Event identifier |
| event_type | text | Event type |
| url | text | Webhook URL |
| status | text | Delivery status |
| attempts | integer | Number of attempts |
| max_retries | integer | Maximum retries |
| retry_delay | integer | Retry delay |
| timeout | integer | Request timeout |
| created_at | timestamptz | Creation timestamp |
| first_attempt_at | timestamptz | First attempt timestamp |
| delivered_at | timestamptz | Delivery timestamp |
| response_status | integer | HTTP response status |
| response_headers | jsonb | Response headers |
| response_body | text | Response body |
| duration_ms | integer | Delivery duration |
| error_message | text | Error message |
| next_retry_at | timestamptz | Next retry timestamp |

### webhook_events
Webhook event logs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| event_id | text | Event identifier |
| event_type | text | Event type |
| event_data | jsonb | Event data |
| source | text | Event source |
| version | text | Event version |
| timestamp | timestamptz | Event timestamp |
| created_at | timestamptz | Creation timestamp |

### webhook_secrets
Webhook authentication secrets.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| subscription_id | uuid | Reference to webhook_subscriptions |
| secret | text | Webhook secret |
| algorithm | text | Signature algorithm |
| created_at | timestamptz | Creation timestamp |
| expires_at | timestamptz | Expiration timestamp |

## Key Features

### 1. Webhook Management
- Subscription creation
- Event filtering
- URL validation
- Secret management

### 2. Delivery System
- Reliable delivery
- Retry logic
- Timeout handling
- Error tracking

### 3. Security
- Secret validation
- Signature verification
- Rate limiting
- Access control

### 4. Analytics
- Delivery tracking
- Performance metrics
- Error analysis
- Success rates

## Security Considerations

- Secret validation
- Signature verification
- Rate limiting
- URL validation

## Integration Points

- **All Services**: Event publishing
- **Event Processing**: Webhook delivery
- **Monitoring Service**: Performance metrics
- **Audit Service**: Webhook logging

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_webhook_url",
  "message": "Invalid webhook URL",
  "details": {
    "field": "url",
    "issue": "URL must be HTTPS"
  }
}
```

**404 Not Found:**
```json
{
  "error": "subscription_not_found",
  "message": "Webhook subscription not found",
  "details": {
    "subscription_id": "webhook_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Webhook validation failed",
  "details": {
    "issues": [
      "Missing required field: events",
      "Invalid event type: invalid.event"
    ]
  }
}
```

## Rate Limiting

- Webhook creation: 100 per hour per user
- Webhook delivery: 10000 per hour per user
- Analytics queries: 50 per hour per user
- Retry operations: 1000 per hour per user

## Webhook Features

### 1. Event Types
- Delivery events
- Payment events
- User events
- System events

### 2. Delivery Status
- Queued
- Delivered
- Failed
- Retrying
- Expired

### 3. Retry Policies
- Exponential backoff
- Maximum retries
- Retry delays
- Timeout handling

### 4. Security
- HMAC signatures
- Secret validation
- Rate limiting
- IP whitelisting