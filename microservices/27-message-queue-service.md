# Message Queue Service

## Overview
The Message Queue Service provides asynchronous messaging and event streaming capabilities using RabbitMQ/Kafka. It handles event publishing, message routing, and queue management.

## Purpose
- Asynchronous messaging
- Event streaming and processing
- Message routing and delivery
- Queue management and monitoring

## Data Ownership
- `message_queues` - Queue configurations
- `message_messages` - Message metadata
- `message_subscriptions` - Queue subscriptions
- `message_metrics` - Message performance metrics

## API Endpoints

### 1. Publish Message
**POST** `/message-queue/publish`

Publishes a message to a queue or topic.

**Request Body:**
```json
{
  "queue": "delivery.events",
  "message": {
    "event_type": "delivery_created",
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "trip_id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440002",
    "status": "created",
    "timestamp": "2024-01-15T12:30:00Z"
  },
  "routing_key": "delivery.created",
  "headers": {
    "content_type": "application/json",
    "priority": "high",
    "retry_count": 0
  },
  "ttl": 3600,
  "persistent": true
}
```

**Response:**
```json
{
  "message_id": "msg_123456789",
  "queue": "delivery.events",
  "routing_key": "delivery.created",
  "published": true,
  "published_at": "2024-01-15T12:30:00Z",
  "ttl": 3600,
  "persistent": true
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/message-queue/publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "queue": "delivery.events",
    "message": {
      "event_type": "delivery_created",
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "trip_id": "550e8400-e29b-41d4-a716-446655440001",
      "user_id": "550e8400-e29b-41d4-a716-446655440002",
      "status": "created",
      "timestamp": "2024-01-15T12:30:00Z"
    },
    "routing_key": "delivery.created",
    "headers": {
      "content_type": "application/json",
      "priority": "high",
      "retry_count": 0
    },
    "ttl": 3600,
    "persistent": true
  }'
```

### 2. Subscribe to Queue
**POST** `/message-queue/subscribe`

Creates a subscription to a queue or topic.

**Request Body:**
```json
{
  "queue": "delivery.events",
  "routing_key": "delivery.*",
  "callback_url": "https://api.delivery.com/delivery-service/events",
  "headers": {
    "authorization": "Bearer service_token_here",
    "content_type": "application/json"
  },
  "retry_policy": {
    "max_retries": 3,
    "retry_delay": 1000,
    "backoff_multiplier": 2
  },
  "dead_letter_queue": "delivery.events.dlq",
  "prefetch_count": 10
}
```

**Response:**
```json
{
  "subscription_id": "sub_123456789",
  "queue": "delivery.events",
  "routing_key": "delivery.*",
  "callback_url": "https://api.delivery.com/delivery-service/events",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "retry_policy": {
    "max_retries": 3,
    "retry_delay": 1000,
    "backoff_multiplier": 2
  },
  "dead_letter_queue": "delivery.events.dlq",
  "prefetch_count": 10
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/message-queue/subscribe \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "queue": "delivery.events",
    "routing_key": "delivery.*",
    "callback_url": "https://api.delivery.com/delivery-service/events",
    "headers": {
      "authorization": "Bearer service_token_here",
      "content_type": "application/json"
    },
    "retry_policy": {
      "max_retries": 3,
      "retry_delay": 1000,
      "backoff_multiplier": 2
    },
    "dead_letter_queue": "delivery.events.dlq",
    "prefetch_count": 10
  }'
```

### 3. Get Queue Status
**GET** `/message-queue/queues/{queue_name}`

Retrieves status and statistics for a specific queue.

**Path Parameters:**
- `queue_name` (string, required): Queue name

**Response:**
```json
{
  "queue": "delivery.events",
  "status": "active",
  "message_count": 1000,
  "consumer_count": 5,
  "durable": true,
  "auto_delete": false,
  "exclusive": false,
  "arguments": {
    "x-message-ttl": 3600000,
    "x-max-length": 10000
  },
  "statistics": {
    "messages_published": 100000,
    "messages_consumed": 95000,
    "messages_acknowledged": 90000,
    "messages_rejected": 1000,
    "messages_redelivered": 500
  },
  "performance": {
    "average_publish_time": "5ms",
    "average_consume_time": "10ms",
    "throughput_per_second": 1000
  },
  "created_at": "2024-01-01T00:00:00Z",
  "last_updated": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/message-queue/queues/delivery.events
```

### 4. Get Message Details
**GET** `/message-queue/messages/{message_id}`

Retrieves details about a specific message.

**Path Parameters:**
- `message_id` (string, required): Message UUID

**Response:**
```json
{
  "message_id": "msg_123456789",
  "queue": "delivery.events",
  "routing_key": "delivery.created",
  "message": {
    "event_type": "delivery_created",
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "trip_id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440002",
    "status": "created",
    "timestamp": "2024-01-15T12:30:00Z"
  },
  "headers": {
    "content_type": "application/json",
    "priority": "high",
    "retry_count": 0
  },
  "status": "delivered",
  "published_at": "2024-01-15T12:30:00Z",
  "consumed_at": "2024-01-15T12:30:05Z",
  "acknowledged_at": "2024-01-15T12:30:10Z",
  "ttl": 3600,
  "persistent": true,
  "retry_count": 0,
  "redelivery_count": 0
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/message-queue/messages/msg_123456789
```

### 5. Acknowledge Message
**POST** `/message-queue/messages/{message_id}/acknowledge`

Acknowledges a message as processed.

**Path Parameters:**
- `message_id` (string, required): Message UUID

**Request Body:**
```json
{
  "acknowledged_by": "delivery-service",
  "processing_time": 5000,
  "success": true,
  "notes": "Message processed successfully"
}
```

**Response:**
```json
{
  "message_id": "msg_123456789",
  "acknowledged": true,
  "acknowledged_at": "2024-01-15T12:30:10Z",
  "acknowledged_by": "delivery-service",
  "processing_time": 5000,
  "success": true,
  "notes": "Message processed successfully"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/message-queue/messages/msg_123456789/acknowledge \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "acknowledged_by": "delivery-service",
    "processing_time": 5000,
    "success": true,
    "notes": "Message processed successfully"
  }'
```

### 6. Reject Message
**POST** `/message-queue/messages/{message_id}/reject`

Rejects a message and optionally requeues it.

**Path Parameters:**
- `message_id` (string, required): Message UUID

**Request Body:**
```json
{
  "rejected_by": "delivery-service",
  "reason": "Invalid message format",
  "requeue": true,
  "retry_count": 1
}
```

**Response:**
```json
{
  "message_id": "msg_123456789",
  "rejected": true,
  "rejected_at": "2024-01-15T12:30:10Z",
  "rejected_by": "delivery-service",
  "reason": "Invalid message format",
  "requeued": true,
  "retry_count": 1
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/message-queue/messages/msg_123456789/reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "rejected_by": "delivery-service",
    "reason": "Invalid message format",
    "requeue": true,
    "retry_count": 1
  }'
```

### 7. Get Queue Metrics
**GET** `/message-queue/metrics`

Retrieves message queue performance metrics.

**Query Parameters:**
- `queue` (string, optional): Filter by queue
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_queues": 50,
    "total_messages": 1000000,
    "total_consumers": 200,
    "average_throughput": 1000
  },
  "queue_metrics": [
    {
      "queue": "delivery.events",
      "message_count": 1000,
      "consumer_count": 5,
      "messages_published": 100000,
      "messages_consumed": 95000,
      "messages_acknowledged": 90000,
      "messages_rejected": 1000,
      "messages_redelivered": 500,
      "average_publish_time": "5ms",
      "average_consume_time": "10ms",
      "throughput_per_second": 1000
    },
    {
      "queue": "payment.events",
      "message_count": 500,
      "consumer_count": 3,
      "messages_published": 50000,
      "messages_consumed": 48000,
      "messages_acknowledged": 47000,
      "messages_rejected": 500,
      "messages_redelivered": 200,
      "average_publish_time": "3ms",
      "average_consume_time": "8ms",
      "throughput_per_second": 500
    }
  ],
  "performance": {
    "average_publish_time": "4ms",
    "average_consume_time": "9ms",
    "p95_publish_time": "10ms",
    "p95_consume_time": "20ms",
    "p99_publish_time": "20ms",
    "p99_consume_time": "50ms"
  },
  "error_rates": {
    "publish_errors": 0.01,
    "consume_errors": 0.02,
    "acknowledge_errors": 0.005,
    "reject_errors": 0.01
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/message-queue/metrics?queue=delivery.events&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

### 8. Get Message Queue Health
**GET** `/message-queue/health`

Retrieves message queue service health status.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.2.3",
  "uptime": "99.9%",
  "broker": {
    "status": "connected",
    "type": "rabbitmq",
    "version": "3.12.0",
    "memory_usage": "500MB",
    "disk_usage": "1GB"
  },
  "queues": {
    "total": 50,
    "active": 45,
    "inactive": 5
  },
  "consumers": {
    "total": 200,
    "active": 195,
    "inactive": 5
  },
  "performance": {
    "average_publish_time": "4ms",
    "average_consume_time": "9ms",
    "error_rate": 0.01
  },
  "last_updated": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/message-queue/health
```

## Database Tables

### message_queues
Queue configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Queue name |
| type | text | Queue type |
| durable | boolean | Queue durability |
| auto_delete | boolean | Auto delete flag |
| exclusive | boolean | Exclusive flag |
| arguments | jsonb | Queue arguments |
| status | text | Queue status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### message_messages
Message metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| message_id | text | Message identifier |
| queue | text | Queue name |
| routing_key | text | Routing key |
| message | jsonb | Message content |
| headers | jsonb | Message headers |
| status | text | Message status |
| published_at | timestamptz | Publish timestamp |
| consumed_at | timestamptz | Consume timestamp |
| acknowledged_at | timestamptz | Acknowledge timestamp |
| ttl | integer | Time to live |
| persistent | boolean | Persistence flag |
| retry_count | integer | Retry count |
| redelivery_count | integer | Redelivery count |
| created_at | timestamptz | Creation timestamp |

### message_subscriptions
Queue subscriptions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| subscription_id | text | Subscription identifier |
| queue | text | Queue name |
| routing_key | text | Routing key pattern |
| callback_url | text | Callback URL |
| headers | jsonb | Callback headers |
| retry_policy | jsonb | Retry policy |
| dead_letter_queue | text | Dead letter queue |
| prefetch_count | integer | Prefetch count |
| status | text | Subscription status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### message_metrics
Message performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_value | decimal | Metric value |
| queue | text | Queue name |
| timestamp | timestamptz | Metric timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Message Publishing
- Queue publishing
- Topic publishing
- Message routing
- Message persistence

### 2. Message Consumption
- Queue subscriptions
- Message acknowledgments
- Message rejection
- Dead letter queues

### 3. Queue Management
- Queue creation
- Queue configuration
- Queue monitoring
- Queue statistics

### 4. Performance Monitoring
- Message metrics
- Queue statistics
- Consumer metrics
- Error tracking

## Security Considerations

- Message encryption
- Access control
- Authentication
- Rate limiting

## Integration Points

- **All Services**: Event publishing
- **Event Processing**: Message consumption
- **Monitoring Service**: Performance metrics
- **Audit Service**: Message logging

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_message",
  "message": "Invalid message format",
  "details": {
    "field": "message",
    "issue": "Message content is required"
  }
}
```

**404 Not Found:**
```json
{
  "error": "queue_not_found",
  "message": "Queue not found",
  "details": {
    "queue": "delivery.events"
  }
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Message publishing rate limit exceeded",
  "details": {
    "limit": 1000,
    "remaining": 0,
    "reset_time": "2024-01-15T15:00:00Z"
  }
}
```

## Rate Limiting

- Message publishing: 10000 per hour per user
- Message consumption: 1000 per hour per user
- Queue operations: 100 per hour per user
- Metrics queries: 50 per hour per user

## Message Queue Features

### 1. Message Types
- Events
- Commands
- Queries
- Notifications

### 2. Routing
- Direct routing
- Topic routing
- Fanout routing
- Headers routing

### 3. Reliability
- Message persistence
- Acknowledgment
- Retry policies
- Dead letter queues

### 4. Performance
- Message batching
- Compression
- Connection pooling
- Load balancing