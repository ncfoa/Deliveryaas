# Cache Service

## Overview
The Cache Service provides high-performance caching capabilities using Redis. It handles session storage, data caching, and distributed caching across the platform.

## Purpose
- High-performance data caching
- Session storage and management
- Distributed caching
- Cache invalidation and management

## Data Ownership
- `cache_entries` - Cache entry metadata
- `cache_sessions` - Session data
- `cache_metrics` - Cache performance metrics
- `cache_configurations` - Cache configurations

## API Endpoints

### 1. Get Cache Entry
**GET** `/cache/{key}`

Retrieves a cached value by key.

**Path Parameters:**
- `key` (string, required): Cache key

**Query Parameters:**
- `namespace` (string, optional): Cache namespace
- `include_metadata` (boolean, optional): Include cache metadata

**Response:**
```json
{
  "key": "user:550e8400-e29b-41d4-a716-446655440000",
  "value": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "traveler",
    "status": "active"
  },
  "namespace": "users",
  "ttl": 3600,
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-15T13:30:00Z",
  "hit_count": 5,
  "last_accessed": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/cache/user:550e8400-e29b-41d4-a716-446655440000?namespace=users&include_metadata=true"
```

### 2. Set Cache Entry
**POST** `/cache`

Sets a cache entry with TTL and metadata.

**Request Body:**
```json
{
  "key": "user:550e8400-e29b-41d4-a716-446655440000",
  "value": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "traveler",
    "status": "active"
  },
  "namespace": "users",
  "ttl": 3600,
  "tags": ["user", "profile"],
  "overwrite": true
}
```

**Response:**
```json
{
  "key": "user:550e8400-e29b-41d4-a716-446655440000",
  "namespace": "users",
  "ttl": 3600,
  "created": true,
  "created_at": "2024-01-15T14:30:00Z",
  "expires_at": "2024-01-15T15:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/cache \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "key": "user:550e8400-e29b-41d4-a716-446655440000",
    "value": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "traveler",
      "status": "active"
    },
    "namespace": "users",
    "ttl": 3600,
    "tags": ["user", "profile"],
    "overwrite": true
  }'
```

### 3. Delete Cache Entry
**DELETE** `/cache/{key}`

Deletes a cache entry by key.

**Path Parameters:**
- `key` (string, required): Cache key

**Query Parameters:**
- `namespace` (string, optional): Cache namespace

**Response:**
```json
{
  "key": "user:550e8400-e29b-41d4-a716-446655440000",
  "namespace": "users",
  "deleted": true,
  "deleted_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X DELETE "https://api.delivery.com/cache/user:550e8400-e29b-41d4-a716-446655440000?namespace=users"
```

### 4. Get Multiple Cache Entries
**POST** `/cache/batch`

Retrieves multiple cache entries by keys.

**Request Body:**
```json
{
  "keys": [
    "user:550e8400-e29b-41d4-a716-446655440000",
    "user:550e8400-e29b-41d4-a716-446655440001",
    "user:550e8400-e29b-41d4-a716-446655440002"
  ],
  "namespace": "users",
  "include_metadata": true
}
```

**Response:**
```json
{
  "entries": [
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440000",
      "value": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "name": "John Doe",
        "role": "traveler",
        "status": "active"
      },
      "namespace": "users",
      "ttl": 3600,
      "created_at": "2024-01-15T12:30:00Z",
      "expires_at": "2024-01-15T13:30:00Z",
      "hit_count": 5,
      "last_accessed": "2024-01-15T14:30:00Z"
    },
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440001",
      "value": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "email": "user2@example.com",
        "name": "Jane Smith",
        "role": "courier",
        "status": "active"
      },
      "namespace": "users",
      "ttl": 3600,
      "created_at": "2024-01-15T12:30:00Z",
      "expires_at": "2024-01-15T13:30:00Z",
      "hit_count": 3,
      "last_accessed": "2024-01-15T14:30:00Z"
    }
  ],
  "missing_keys": [
    "user:550e8400-e29b-41d4-a716-446655440002"
  ],
  "total_requested": 3,
  "total_found": 2
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/cache/batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "keys": [
      "user:550e8400-e29b-41d4-a716-446655440000",
      "user:550e8400-e29b-41d4-a716-446655440001",
      "user:550e8400-e29b-41d4-a716-446655440002"
    ],
    "namespace": "users",
    "include_metadata": true
  }'
```

### 5. Set Multiple Cache Entries
**POST** `/cache/batch-set`

Sets multiple cache entries in a single operation.

**Request Body:**
```json
{
  "entries": [
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440000",
      "value": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "name": "John Doe",
        "role": "traveler",
        "status": "active"
      },
      "ttl": 3600,
      "tags": ["user", "profile"]
    },
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440001",
      "value": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "email": "user2@example.com",
        "name": "Jane Smith",
        "role": "courier",
        "status": "active"
      },
      "ttl": 3600,
      "tags": ["user", "profile"]
    }
  ],
  "namespace": "users",
  "overwrite": true
}
```

**Response:**
```json
{
  "entries": [
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440000",
      "created": true,
      "created_at": "2024-01-15T14:30:00Z",
      "expires_at": "2024-01-15T15:30:00Z"
    },
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440001",
      "created": true,
      "created_at": "2024-01-15T14:30:00Z",
      "expires_at": "2024-01-15T15:30:00Z"
    }
  ],
  "total_created": 2,
  "total_failed": 0
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/cache/batch-set \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "entries": [
      {
        "key": "user:550e8400-e29b-41d4-a716-446655440000",
        "value": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "email": "user@example.com",
          "name": "John Doe",
          "role": "traveler",
          "status": "active"
        },
        "ttl": 3600,
        "tags": ["user", "profile"]
      },
      {
        "key": "user:550e8400-e29b-41d4-a716-446655440001",
        "value": {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "email": "user2@example.com",
          "name": "Jane Smith",
          "role": "courier",
          "status": "active"
        },
        "ttl": 3600,
        "tags": ["user", "profile"]
      }
    ],
    "namespace": "users",
    "overwrite": true
  }'
```

### 6. Invalidate Cache by Tags
**POST** `/cache/invalidate`

Invalidates cache entries by tags.

**Request Body:**
```json
{
  "tags": ["user", "profile"],
  "namespace": "users",
  "pattern": "user:*"
}
```

**Response:**
```json
{
  "invalidated_keys": [
    "user:550e8400-e29b-41d4-a716-446655440000",
    "user:550e8400-e29b-41d4-a716-446655440001",
    "user:550e8400-e29b-41d4-a716-446655440002"
  ],
  "total_invalidated": 3,
  "invalidated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/cache/invalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "tags": ["user", "profile"],
    "namespace": "users",
    "pattern": "user:*"
  }'
```

### 7. Get Cache Statistics
**GET** `/cache/statistics`

Retrieves cache performance statistics.

**Query Parameters:**
- `namespace` (string, optional): Filter by namespace
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_keys": 1000000,
    "total_memory_mb": 500,
    "hit_rate": 0.95,
    "miss_rate": 0.05,
    "average_ttl": 3600
  },
  "namespace_stats": {
    "users": {
      "keys": 500000,
      "memory_mb": 250,
      "hit_rate": 0.96,
      "miss_rate": 0.04
    },
    "deliveries": {
      "keys": 300000,
      "memory_mb": 150,
      "hit_rate": 0.94,
      "miss_rate": 0.06
    },
    "trips": {
      "keys": 200000,
      "memory_mb": 100,
      "hit_rate": 0.93,
      "miss_rate": 0.07
    }
  },
  "performance": {
    "average_get_time": "1ms",
    "average_set_time": "2ms",
    "average_delete_time": "1ms",
    "p95_get_time": "5ms",
    "p99_get_time": "10ms"
  },
  "top_keys": [
    {
      "key": "user:550e8400-e29b-41d4-a716-446655440000",
      "hit_count": 1000,
      "last_accessed": "2024-01-15T14:30:00Z"
    },
    {
      "key": "delivery:550e8400-e29b-41d4-a716-446655440001",
      "hit_count": 800,
      "last_accessed": "2024-01-15T14:30:00Z"
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/cache/statistics?namespace=users&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

### 8. Get Cache Health
**GET** `/cache/health`

Retrieves cache service health status.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.2.3",
  "uptime": "99.9%",
  "memory_usage": {
    "used_mb": 500,
    "total_mb": 1000,
    "usage_percentage": 50
  },
  "connections": {
    "active": 100,
    "max": 1000,
    "usage_percentage": 10
  },
  "performance": {
    "average_response_time": "1ms",
    "p95_response_time": "5ms",
    "p99_response_time": "10ms",
    "error_rate": 0.01
  },
  "redis": {
    "status": "connected",
    "version": "7.0.0",
    "memory_usage": "500MB",
    "connected_clients": 100
  },
  "last_updated": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/cache/health
```

## Database Tables

### cache_entries
Cache entry metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| key | text | Cache key |
| namespace | text | Cache namespace |
| tags | text[] | Cache tags |
| ttl | integer | Time to live in seconds |
| hit_count | integer | Number of hits |
| last_accessed | timestamptz | Last access timestamp |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### cache_sessions
Session data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| session_id | text | Session identifier |
| user_id | uuid | User identifier |
| data | jsonb | Session data |
| ttl | integer | Session TTL |
| last_accessed | timestamptz | Last access timestamp |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### cache_metrics
Cache performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_value | decimal | Metric value |
| namespace | text | Cache namespace |
| timestamp | timestamptz | Metric timestamp |
| created_at | timestamptz | Creation timestamp |

### cache_configurations
Cache configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| namespace | text | Cache namespace |
| configuration | jsonb | Cache configuration |
| status | text | Configuration status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

## Key Features

### 1. Data Caching
- Key-value storage
- TTL management
- Namespace isolation
- Tag-based invalidation

### 2. Session Management
- User sessions
- Session data storage
- Session expiration
- Session cleanup

### 3. Performance Optimization
- Connection pooling
- Batch operations
- Compression
- Serialization

### 4. Monitoring & Analytics
- Hit/miss rates
- Performance metrics
- Memory usage
- Health monitoring

## Security Considerations

- Access control
- Data encryption
- Key validation
- Rate limiting

## Integration Points

- **All Services**: Data caching
- **Authentication Service**: Session storage
- **User Service**: User data caching
- **Monitoring Service**: Performance metrics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_key",
  "message": "Invalid cache key format",
  "details": {
    "key": "invalid key",
    "issue": "Key contains invalid characters"
  }
}
```

**404 Not Found:**
```json
{
  "error": "key_not_found",
  "message": "Cache key not found",
  "details": {
    "key": "user:550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Cache rate limit exceeded",
  "details": {
    "limit": 1000,
    "remaining": 0,
    "reset_time": "2024-01-15T15:00:00Z"
  }
}
```

## Rate Limiting

- Cache operations: 10000 per hour per user
- Batch operations: 1000 per hour per user
- Statistics queries: 100 per hour per user
- Health checks: 1000 per hour per user

## Cache Features

### 1. Data Types
- Strings
- JSON objects
- Binary data
- Lists and sets

### 2. TTL Management
- Absolute TTL
- Relative TTL
- TTL extension
- TTL refresh

### 3. Invalidation
- Key-based invalidation
- Tag-based invalidation
- Pattern-based invalidation
- Namespace invalidation

### 4. Compression
- Gzip compression
- LZ4 compression
- Custom compression
- Compression ratios