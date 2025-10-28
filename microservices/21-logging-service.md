# Logging Service

## Overview
The Logging Service provides centralized log management, aggregation, and analysis across all platform services. It handles log collection, storage, search, and real-time log streaming.

## Purpose
- Centralized log management
- Log aggregation and storage
- Log search and analysis
- Real-time log streaming

## Data Ownership
- `log_entries` - Log entry records
- `log_sources` - Log source configurations
- `log_queries` - Saved log queries
- `log_dashboards` - Log dashboard configurations

## API Endpoints

### 1. Write Log Entry
**POST** `/logging/entries/write`

Writes a new log entry.

**Request Body:**
```json
{
  "level": "info",
  "message": "Delivery created successfully",
  "service": "delivery-service",
  "environment": "production",
  "timestamp": "2024-01-15T12:30:00Z",
  "context": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "trip_id": "550e8400-e29b-41d4-a716-446655440002",
    "request_id": "req_123456789"
  },
  "fields": {
    "duration": 150,
    "status_code": 200,
    "method": "POST",
    "endpoint": "/deliveries",
    "ip_address": "192.168.1.100"
  },
  "tags": ["delivery", "creation", "success"],
  "trace_id": "trace_123456789",
  "span_id": "span_123456789"
}
```

**Response:**
```json
{
  "id": "uuid",
  "level": "info",
  "message": "Delivery created successfully",
  "service": "delivery-service",
  "environment": "production",
  "timestamp": "2024-01-15T12:30:00Z",
  "context": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "trip_id": "550e8400-e29b-41d4-a716-446655440002",
    "request_id": "req_123456789"
  },
  "fields": {
    "duration": 150,
    "status_code": 200,
    "method": "POST",
    "endpoint": "/deliveries",
    "ip_address": "192.168.1.100"
  },
  "tags": ["delivery", "creation", "success"],
  "trace_id": "trace_123456789",
  "span_id": "span_123456789",
  "indexed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/logging/entries/write \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "level": "info",
    "message": "Delivery created successfully",
    "service": "delivery-service",
    "environment": "production",
    "timestamp": "2024-01-15T12:30:00Z",
    "context": {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
      "trip_id": "550e8400-e29b-41d4-a716-446655440002",
      "request_id": "req_123456789"
    },
    "fields": {
      "duration": 150,
      "status_code": 200,
      "method": "POST",
      "endpoint": "/deliveries",
      "ip_address": "192.168.1.100"
    },
    "tags": ["delivery", "creation", "success"],
    "trace_id": "trace_123456789",
    "span_id": "span_123456789"
  }'
```

### 2. Search Logs
**GET** `/logging/entries/search`

Searches log entries with advanced filtering.

**Query Parameters:**
- `query` (string, optional): Search query
- `level` (string, optional): Filter by log level
- `service` (string, optional): Filter by service
- `environment` (string, optional): Filter by environment
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `tags` (string[], optional): Filter by tags
- `fields` (json, optional): Filter by fields
- `limit` (integer, optional): Number of logs to return (default: 100)
- `offset` (integer, optional): Number of logs to skip (default: 0)
- `sort` (string, optional): Sort order (timestamp, level, service)

**Response:**
```json
{
  "logs": [
    {
      "id": "uuid",
      "level": "info",
      "message": "Delivery created successfully",
      "service": "delivery-service",
      "environment": "production",
      "timestamp": "2024-01-15T12:30:00Z",
      "context": {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
        "trip_id": "550e8400-e29b-41d4-a716-446655440002",
        "request_id": "req_123456789"
      },
      "fields": {
        "duration": 150,
        "status_code": 200,
        "method": "POST",
        "endpoint": "/deliveries",
        "ip_address": "192.168.1.100"
      },
      "tags": ["delivery", "creation", "success"],
      "trace_id": "trace_123456789",
      "span_id": "span_123456789"
    }
  ],
  "total": 1,
  "limit": 100,
  "offset": 0,
  "facets": {
    "levels": {
      "info": 1000,
      "warn": 50,
      "error": 25
    },
    "services": {
      "delivery-service": 500,
      "payment-service": 300,
      "user-service": 200
    }
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/logging/entries/search?query=delivery&level=info&service=delivery-service&limit=50"
```

### 3. Get Log Entry
**GET** `/logging/entries/{id}`

Retrieves a specific log entry.

**Path Parameters:**
- `id` (string, required): Log entry UUID

**Response:**
```json
{
  "id": "uuid",
  "level": "info",
  "message": "Delivery created successfully",
  "service": "delivery-service",
  "environment": "production",
  "timestamp": "2024-01-15T12:30:00Z",
  "context": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "trip_id": "550e8400-e29b-41d4-a716-446655440002",
    "request_id": "req_123456789"
  },
  "fields": {
    "duration": 150,
    "status_code": 200,
    "method": "POST",
    "endpoint": "/deliveries",
    "ip_address": "192.168.1.100"
  },
  "tags": ["delivery", "creation", "success"],
  "trace_id": "trace_123456789",
  "span_id": "span_123456789",
  "indexed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/logging/entries/550e8400-e29b-41d4-a716-446655440000
```

### 4. Stream Logs
**GET** `/logging/entries/stream`

Streams real-time log entries.

**Query Parameters:**
- `level` (string, optional): Filter by log level
- `service` (string, optional): Filter by service
- `environment` (string, optional): Filter by environment
- `tags` (string[], optional): Filter by tags
- `fields` (json, optional): Filter by fields

**Response:**
```json
{
  "type": "log_entry",
  "data": {
    "id": "uuid",
    "level": "info",
    "message": "Delivery created successfully",
    "service": "delivery-service",
    "environment": "production",
    "timestamp": "2024-01-15T12:30:00Z",
    "context": {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
      "trip_id": "550e8400-e29b-41d4-a716-446655440002",
      "request_id": "req_123456789"
    },
    "fields": {
      "duration": 150,
      "status_code": 200,
      "method": "POST",
      "endpoint": "/deliveries",
      "ip_address": "192.168.1.100"
    },
    "tags": ["delivery", "creation", "success"],
    "trace_id": "trace_123456789",
    "span_id": "span_123456789"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/logging/entries/stream?level=error&service=delivery-service"
```

### 5. Get Log Statistics
**GET** `/logging/statistics`

Retrieves log statistics and metrics.

**Query Parameters:**
- `period` (string, optional): Time period (hourly, daily, weekly, monthly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `service` (string, optional): Filter by service
- `environment` (string, optional): Filter by environment

**Response:**
```json
{
  "period": "daily",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "total_logs": 1000000,
  "log_levels": {
    "debug": 100000,
    "info": 800000,
    "warn": 80000,
    "error": 15000,
    "fatal": 5000
  },
  "services": {
    "delivery-service": 400000,
    "payment-service": 300000,
    "user-service": 200000,
    "notification-service": 100000
  },
  "environments": {
    "production": 800000,
    "staging": 150000,
    "development": 50000
  },
  "top_errors": [
    {
      "message": "Database connection failed",
      "count": 1000,
      "service": "delivery-service",
      "last_occurrence": "2024-01-15T12:30:00Z"
    }
  ],
  "log_volume_trend": {
    "trend": "increasing",
    "growth_rate": 0.15,
    "peak_hour": "14:00",
    "peak_day": "Monday"
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/logging/statistics?period=daily&service=delivery-service&date_from=2024-01-01&date_to=2024-01-31"
```

### 6. Create Log Query
**POST** `/logging/queries/create`

Creates a saved log query.

**Request Body:**
```json
{
  "name": "Delivery Errors",
  "description": "Query for all delivery service errors",
  "query": "service:delivery-service AND level:error",
  "filters": {
    "level": "error",
    "service": "delivery-service",
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z"
  },
  "is_public": false,
  "tags": ["delivery", "errors", "monitoring"]
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Delivery Errors",
  "description": "Query for all delivery service errors",
  "query": "service:delivery-service AND level:error",
  "filters": {
    "level": "error",
    "service": "delivery-service",
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z"
  },
  "is_public": false,
  "tags": ["delivery", "errors", "monitoring"],
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/logging/queries/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Delivery Errors",
    "description": "Query for all delivery service errors",
    "query": "service:delivery-service AND level:error",
    "filters": {
      "level": "error",
      "service": "delivery-service",
      "date_from": "2024-01-01T00:00:00Z",
      "date_to": "2024-01-31T23:59:59Z"
    },
    "is_public": false,
    "tags": ["delivery", "errors", "monitoring"]
  }'
```

### 7. Get Log Queries
**GET** `/logging/queries`

Retrieves saved log queries.

**Query Parameters:**
- `user_id` (string, optional): Filter by user
- `is_public` (boolean, optional): Filter by public status
- `tags` (string[], optional): Filter by tags
- `limit` (integer, optional): Number of queries to return (default: 20)
- `offset` (integer, optional): Number of queries to skip (default: 0)

**Response:**
```json
{
  "queries": [
    {
      "id": "uuid",
      "name": "Delivery Errors",
      "description": "Query for all delivery service errors",
      "query": "service:delivery-service AND level:error",
      "filters": {
        "level": "error",
        "service": "delivery-service",
        "date_from": "2024-01-01T00:00:00Z",
        "date_to": "2024-01-31T23:59:59Z"
      },
      "is_public": false,
      "tags": ["delivery", "errors", "monitoring"],
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-15T14:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/logging/queries?user_id=550e8400-e29b-41d4-a716-446655440000&is_public=false&limit=10"
```

### 8. Get Log Dashboard
**GET** `/logging/dashboard`

Retrieves log dashboard data.

**Query Parameters:**
- `time_range` (string, optional): Time range (1h, 6h, 24h, 7d, 30d)
- `services` (string[], optional): Filter by services
- `environments` (string[], optional): Filter by environments

**Response:**
```json
{
  "time_range": "24h",
  "services": ["delivery-service", "payment-service"],
  "environments": ["production", "staging"],
  "overview": {
    "total_logs": 100000,
    "error_logs": 1000,
    "warning_logs": 5000,
    "info_logs": 94000,
    "debug_logs": 5000
  },
  "log_volume": {
    "timeline": [
      {
        "timestamp": "2024-01-15T00:00:00Z",
        "count": 1000
      },
      {
        "timestamp": "2024-01-15T01:00:00Z",
        "count": 1200
      }
    ]
  },
  "top_errors": [
    {
      "message": "Database connection failed",
      "count": 100,
      "service": "delivery-service",
      "last_occurrence": "2024-01-15T12:30:00Z"
    }
  ],
  "service_breakdown": {
    "delivery-service": {
      "total_logs": 60000,
      "error_rate": 0.02,
      "avg_response_time": 150
    },
    "payment-service": {
      "total_logs": 40000,
      "error_rate": 0.01,
      "avg_response_time": 200
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/logging/dashboard?time_range=24h&services=delivery-service,payment-service"
```

## Database Tables

### log_entries
Log entry records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| level | text | Log level |
| message | text | Log message |
| service | text | Service name |
| environment | text | Environment |
| timestamp | timestamptz | Log timestamp |
| context | jsonb | Log context |
| fields | jsonb | Log fields |
| tags | text[] | Log tags |
| trace_id | text | Trace identifier |
| span_id | text | Span identifier |
| indexed_at | timestamptz | Indexing timestamp |
| created_at | timestamptz | Creation timestamp |

### log_sources
Log source configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Source name |
| service | text | Service name |
| environment | text | Environment |
| configuration | jsonb | Source configuration |
| status | text | Source status |
| last_activity | timestamptz | Last activity timestamp |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### log_queries
Saved log queries.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Query name |
| description | text | Query description |
| query | text | Search query |
| filters | jsonb | Query filters |
| is_public | boolean | Public query flag |
| tags | text[] | Query tags |
| created_by | uuid | Foreign key to users table |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### log_dashboards
Log dashboard configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Dashboard name |
| description | text | Dashboard description |
| widgets | jsonb | Dashboard widgets |
| layout | jsonb | Dashboard layout |
| permissions | jsonb | Access permissions |
| created_by | uuid | Foreign key to users table |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

## Key Features

### 1. Log Collection
- Centralized logging
- Multiple log sources
- Real-time ingestion
- Structured logging

### 2. Log Search
- Full-text search
- Advanced filtering
- Faceted search
- Saved queries

### 3. Log Analysis
- Log statistics
- Error analysis
- Performance metrics
- Trend analysis

### 4. Log Streaming
- Real-time streaming
- WebSocket support
- Live tailing
- Event-driven updates

## Security Considerations

- Log data is encrypted
- Access control enforced
- Sensitive data masking
- Audit trail maintained

## Integration Points

- **All Services**: Log collection
- **Monitoring Service**: Health checks
- **Analytics Service**: Log analytics
- **Audit Service**: Security events

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_log_data",
  "message": "Invalid log data provided",
  "details": {
    "field": "level",
    "issue": "Invalid log level specified"
  }
}
```

**404 Not Found:**
```json
{
  "error": "log_entry_not_found",
  "message": "Log entry not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "invalid_search_query",
  "message": "Invalid search query",
  "details": {
    "field": "query",
    "issue": "Query syntax error"
  }
}
```

## Rate Limiting

- Log writing: 10000 per hour per service
- Log search: 1000 per hour per user
- Log streaming: 100 per hour per user
- Query creation: 50 per hour per user

## Log Levels

### 1. Debug
- Detailed information
- Development debugging
- Verbose logging
- Low priority

### 2. Info
- General information
- Normal operations
- Business events
- Medium priority

### 3. Warn
- Warning messages
- Potential issues
- Recoverable errors
- High priority

### 4. Error
- Error conditions
- Failed operations
- System errors
- Critical priority

### 5. Fatal
- Fatal errors
- System crashes
- Unrecoverable errors
- Emergency priority