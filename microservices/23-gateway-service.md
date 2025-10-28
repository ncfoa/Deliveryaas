# Gateway Service

## Overview
The Gateway Service acts as the API gateway and entry point for all client requests. It handles routing, load balancing, authentication, rate limiting, and request/response transformation.

## Purpose
- API gateway and routing
- Load balancing and traffic management
- Authentication and authorization
- Rate limiting and throttling

## Data Ownership
- `gateway_routes` - API route configurations
- `rate_limits` - Rate limiting rules
- `gateway_metrics` - Gateway performance metrics
- `gateway_logs` - Request/response logs

## API Endpoints

### 1. Route Request
**POST** `/gateway/route`

Routes a request to the appropriate service.

**Request Body:**
```json
{
  "method": "POST",
  "path": "/deliveries",
  "headers": {
    "Authorization": "Bearer jwt_token_here",
    "Content-Type": "application/json",
    "User-Agent": "DeliveryApp/1.2.3"
  },
  "body": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "trip_id": "550e8400-e29b-41d4-a716-446655440001",
    "value": 150.00
  },
  "query_params": {
    "include_tracking": "true"
  },
  "client_ip": "192.168.1.100",
  "user_id": "550e8400-e29b-41d4-a716-446655440002"
}
```

**Response:**
```json
{
  "status_code": 200,
  "headers": {
    "Content-Type": "application/json",
    "X-Request-ID": "req_123456789",
    "X-Response-Time": "150ms"
  },
  "body": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "created",
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "trip_id": "550e8400-e29b-41d4-a716-446655440001",
    "value": 150.00,
    "created_at": "2024-01-15T12:30:00Z"
  },
  "routing_info": {
    "target_service": "delivery-service",
    "target_endpoint": "/deliveries",
    "routing_time": "5ms",
    "total_time": "150ms"
  }
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/gateway/route \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "method": "POST",
    "path": "/deliveries",
    "headers": {
      "Authorization": "Bearer jwt_token_here",
      "Content-Type": "application/json",
      "User-Agent": "DeliveryApp/1.2.3"
    },
    "body": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "trip_id": "550e8400-e29b-41d4-a716-446655440001",
      "value": 150.00
    },
    "query_params": {
      "include_tracking": "true"
    },
    "client_ip": "192.168.1.100",
    "user_id": "550e8400-e29b-41d4-a716-446655440002"
  }'
```

### 2. Get Route Configuration
**GET** `/gateway/routes`

Retrieves gateway route configurations.

**Query Parameters:**
- `service` (string, optional): Filter by target service
- `path` (string, optional): Filter by path pattern
- `method` (string, optional): Filter by HTTP method
- `status` (string, optional): Filter by route status
- `limit` (integer, optional): Number of routes to return (default: 50)
- `offset` (integer, optional): Number of routes to skip (default: 0)

**Response:**
```json
{
  "routes": [
    {
      "id": "uuid",
      "path": "/deliveries",
      "method": "POST",
      "target_service": "delivery-service",
      "target_endpoint": "/deliveries",
      "priority": 1,
      "status": "active",
      "rate_limit": {
        "requests_per_minute": 100,
        "burst_size": 20
      },
      "authentication": {
        "required": true,
        "methods": ["jwt", "api_key"]
      },
      "transformation": {
        "request": {
          "add_headers": {
            "X-Service-Name": "delivery-service"
          },
          "remove_headers": ["X-Client-Version"]
        },
        "response": {
          "add_headers": {
            "X-Response-Time": "{{response_time}}"
          }
        }
      },
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/gateway/routes?service=delivery-service&method=POST&limit=20"
```

### 3. Update Route Configuration
**PUT** `/gateway/routes/{id}`

Updates a gateway route configuration.

**Path Parameters:**
- `id` (string, required): Route UUID

**Request Body:**
```json
{
  "path": "/deliveries",
  "method": "POST",
  "target_service": "delivery-service",
  "target_endpoint": "/deliveries",
  "priority": 1,
  "status": "active",
  "rate_limit": {
    "requests_per_minute": 150,
    "burst_size": 30
  },
  "authentication": {
    "required": true,
    "methods": ["jwt", "api_key"]
  },
  "transformation": {
    "request": {
      "add_headers": {
        "X-Service-Name": "delivery-service",
        "X-Request-ID": "{{request_id}}"
      },
      "remove_headers": ["X-Client-Version"]
    },
    "response": {
      "add_headers": {
        "X-Response-Time": "{{response_time}}",
        "X-Service-Version": "{{service_version}}"
      }
    }
  },
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "id": "uuid",
  "path": "/deliveries",
  "method": "POST",
  "target_service": "delivery-service",
  "target_endpoint": "/deliveries",
  "priority": 1,
  "status": "active",
  "rate_limit": {
    "requests_per_minute": 150,
    "burst_size": 30
  },
  "authentication": {
    "required": true,
    "methods": ["jwt", "api_key"]
  },
  "transformation": {
    "request": {
      "add_headers": {
        "X-Service-Name": "delivery-service",
        "X-Request-ID": "{{request_id}}"
      },
      "remove_headers": ["X-Client-Version"]
    },
    "response": {
      "add_headers": {
        "X-Response-Time": "{{response_time}}",
        "X-Service-Version": "{{service_version}}"
      }
    }
  },
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/gateway/routes/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "path": "/deliveries",
    "method": "POST",
    "target_service": "delivery-service",
    "target_endpoint": "/deliveries",
    "priority": 1,
    "status": "active",
    "rate_limit": {
      "requests_per_minute": 150,
      "burst_size": 30
    },
    "authentication": {
      "required": true,
      "methods": ["jwt", "api_key"]
    },
    "transformation": {
      "request": {
        "add_headers": {
          "X-Service-Name": "delivery-service",
          "X-Request-ID": "{{request_id}}"
        },
        "remove_headers": ["X-Client-Version"]
      },
      "response": {
        "add_headers": {
          "X-Response-Time": "{{response_time}}",
          "X-Service-Version": "{{service_version}}"
        }
      }
    },
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 4. Get Rate Limit Status
**GET** `/gateway/rate-limits/{user_id}`

Retrieves rate limit status for a specific user.

**Path Parameters:**
- `user_id` (string, required): User UUID

**Query Parameters:**
- `service` (string, optional): Filter by service
- `endpoint` (string, optional): Filter by endpoint

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "rate_limits": [
    {
      "service": "delivery-service",
      "endpoint": "/deliveries",
      "limit": 100,
      "remaining": 75,
      "reset_time": "2024-01-15T13:00:00Z",
      "window": "1 minute"
    },
    {
      "service": "payment-service",
      "endpoint": "/payments",
      "limit": 50,
      "remaining": 30,
      "reset_time": "2024-01-15T13:00:00Z",
      "window": "1 minute"
    }
  ],
  "global_limits": {
    "total_requests": 1000,
    "remaining_requests": 800,
    "reset_time": "2024-01-15T13:00:00Z",
    "window": "1 hour"
  },
  "status": "within_limits"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/gateway/rate-limits/550e8400-e29b-41d4-a716-446655440000?service=delivery-service"
```

### 5. Get Gateway Metrics
**GET** `/gateway/metrics`

Retrieves gateway performance metrics.

**Query Parameters:**
- `period` (string, optional): Time period (hourly, daily, weekly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `service` (string, optional): Filter by service

**Response:**
```json
{
  "period": "hourly",
  "date_range": {
    "start": "2024-01-15T00:00:00Z",
    "end": "2024-01-15T23:59:59Z"
  },
  "overview": {
    "total_requests": 100000,
    "successful_requests": 95000,
    "failed_requests": 5000,
    "success_rate": 0.95,
    "average_response_time": 150,
    "p95_response_time": 300,
    "p99_response_time": 500
  },
  "service_metrics": [
    {
      "service": "delivery-service",
      "requests": 40000,
      "success_rate": 0.97,
      "average_response_time": 120,
      "error_rate": 0.03
    },
    {
      "service": "payment-service",
      "requests": 30000,
      "success_rate": 0.93,
      "average_response_time": 200,
      "error_rate": 0.07
    }
  ],
  "error_breakdown": {
    "4xx_errors": 3000,
    "5xx_errors": 2000,
    "timeout_errors": 1000,
    "rate_limit_errors": 500
  },
  "top_endpoints": [
    {
      "endpoint": "/deliveries",
      "requests": 25000,
      "average_response_time": 120,
      "error_rate": 0.02
    },
    {
      "endpoint": "/payments",
      "requests": 20000,
      "average_response_time": 200,
      "error_rate": 0.05
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/gateway/metrics?period=hourly&service=delivery-service&date_from=2024-01-15T00:00:00Z&date_to=2024-01-15T23:59:59Z"
```

### 6. Get Gateway Health
**GET** `/gateway/health`

Retrieves gateway health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T12:30:00Z",
  "version": "1.2.3",
  "uptime": "99.9%",
  "components": {
    "routing": {
      "status": "healthy",
      "response_time": "5ms"
    },
    "authentication": {
      "status": "healthy",
      "response_time": "10ms"
    },
    "rate_limiting": {
      "status": "healthy",
      "response_time": "2ms"
    },
    "load_balancer": {
      "status": "healthy",
      "response_time": "3ms"
    }
  },
  "dependencies": {
    "delivery-service": {
      "status": "healthy",
      "response_time": "120ms"
    },
    "payment-service": {
      "status": "healthy",
      "response_time": "200ms"
    },
    "user-service": {
      "status": "degraded",
      "response_time": "500ms"
    }
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/gateway/health
```

### 7. Create Rate Limit Rule
**POST** `/gateway/rate-limits/rules`

Creates a new rate limiting rule.

**Request Body:**
```json
{
  "name": "API Rate Limit",
  "description": "Rate limit for API endpoints",
  "service": "delivery-service",
  "endpoint": "/deliveries",
  "limit": 100,
  "window": "1 minute",
  "burst_size": 20,
  "user_types": ["traveler", "courier"],
  "conditions": {
    "user_roles": ["traveler", "courier"],
    "regions": ["CA", "US"]
  },
  "enabled": true
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "API Rate Limit",
  "description": "Rate limit for API endpoints",
  "service": "delivery-service",
  "endpoint": "/deliveries",
  "limit": 100,
  "window": "1 minute",
  "burst_size": 20,
  "user_types": ["traveler", "courier"],
  "conditions": {
    "user_roles": ["traveler", "courier"],
    "regions": ["CA", "US"]
  },
  "enabled": true,
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/gateway/rate-limits/rules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "API Rate Limit",
    "description": "Rate limit for API endpoints",
    "service": "delivery-service",
    "endpoint": "/deliveries",
    "limit": 100,
    "window": "1 minute",
    "burst_size": 20,
    "user_types": ["traveler", "courier"],
    "conditions": {
      "user_roles": ["traveler", "courier"],
      "regions": ["CA", "US"]
    },
    "enabled": true
  }'
```

### 8. Get Gateway Logs
**GET** `/gateway/logs`

Retrieves gateway request/response logs.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `endpoint` (string, optional): Filter by endpoint
- `status_code` (integer, optional): Filter by status code
- `user_id` (string, optional): Filter by user
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of logs to return (default: 100)
- `offset` (integer, optional): Number of logs to skip (default: 0)

**Response:**
```json
{
  "logs": [
    {
      "id": "uuid",
      "request_id": "req_123456789",
      "method": "POST",
      "path": "/deliveries",
      "service": "delivery-service",
      "endpoint": "/deliveries",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "client_ip": "192.168.1.100",
      "status_code": 200,
      "response_time": 150,
      "request_size": 1024,
      "response_size": 2048,
      "timestamp": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 100,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/gateway/logs?service=delivery-service&status_code=200&limit=50"
```

## Database Tables

### gateway_routes
API route configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| path | text | Route path pattern |
| method | text | HTTP method |
| target_service | text | Target service name |
| target_endpoint | text | Target endpoint |
| priority | integer | Route priority |
| status | text | Route status |
| rate_limit | jsonb | Rate limiting configuration |
| authentication | jsonb | Authentication configuration |
| transformation | jsonb | Request/response transformation |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### rate_limits
Rate limiting rules.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Rule name |
| description | text | Rule description |
| service | text | Service name |
| endpoint | text | Endpoint pattern |
| limit | integer | Request limit |
| window | text | Time window |
| burst_size | integer | Burst size |
| user_types | text[] | User types |
| conditions | jsonb | Rule conditions |
| enabled | boolean | Rule enabled status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### gateway_metrics
Gateway performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| service | text | Service name |
| endpoint | text | Endpoint |
| total_requests | integer | Total requests |
| successful_requests | integer | Successful requests |
| failed_requests | integer | Failed requests |
| average_response_time | integer | Average response time |
| p95_response_time | integer | 95th percentile response time |
| p99_response_time | integer | 99th percentile response time |
| error_rate | decimal | Error rate |
| timestamp | timestamptz | Metric timestamp |
| created_at | timestamptz | Creation timestamp |

### gateway_logs
Request/response logs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| request_id | text | Request identifier |
| method | text | HTTP method |
| path | text | Request path |
| service | text | Target service |
| endpoint | text | Target endpoint |
| user_id | uuid | User identifier |
| client_ip | text | Client IP address |
| status_code | integer | HTTP status code |
| response_time | integer | Response time in ms |
| request_size | integer | Request size in bytes |
| response_size | integer | Response size in bytes |
| timestamp | timestamptz | Request timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Request Routing
- Path-based routing
- Method-based routing
- Service discovery
- Load balancing

### 2. Authentication & Authorization
- JWT validation
- API key authentication
- Role-based access
- Permission checking

### 3. Rate Limiting
- Per-user limits
- Per-endpoint limits
- Burst handling
- Sliding window

### 4. Request/Response Transformation
- Header manipulation
- Body transformation
- Query parameter handling
- Response modification

## Security Considerations

- Request validation
- Authentication enforcement
- Rate limiting protection
- Audit logging

## Integration Points

- **All Services**: Request routing
- **Authentication Service**: User verification
- **Authorization Service**: Permission checking
- **Monitoring Service**: Performance metrics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_request",
  "message": "Invalid request format",
  "details": {
    "field": "body",
    "issue": "Request body is required"
  }
}
```

**401 Unauthorized:**
```json
{
  "error": "authentication_required",
  "message": "Authentication is required for this endpoint"
}
```

**403 Forbidden:**
```json
{
  "error": "access_denied",
  "message": "Access denied for this resource"
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded",
  "details": {
    "limit": 100,
    "remaining": 0,
    "reset_time": "2024-01-15T13:00:00Z"
  }
}
```

## Rate Limiting

- Gateway requests: 10000 per hour per user
- Route updates: 10 per hour per user
- Metrics queries: 100 per hour per user
- Log queries: 200 per hour per user

## Gateway Features

### 1. Load Balancing
- Round-robin
- Weighted round-robin
- Least connections
- Health-based routing

### 2. Circuit Breaker
- Failure detection
- Automatic recovery
- Fallback responses
- Health monitoring

### 3. Caching
- Response caching
- Cache invalidation
- Cache headers
- TTL management

### 4. Monitoring
- Request metrics
- Error tracking
- Performance monitoring
- Health checks