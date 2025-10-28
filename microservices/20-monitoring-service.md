# Monitoring Service

## Overview
The Monitoring Service provides comprehensive system monitoring, health checks, and performance tracking across all platform services. It handles metrics collection, alerting, and observability.

## Purpose
- System health monitoring
- Performance metrics collection
- Service availability tracking
- Alerting and incident management

## Data Ownership
- `monitoring_metrics` - System metrics
- `health_checks` - Service health status
- `alerts` - Monitoring alerts
- `incidents` - Incident records

## API Endpoints

### 1. Record Metric
**POST** `/monitoring/metrics/record`

Records a custom metric for monitoring.

**Request Body:**
```json
{
  "metric_name": "delivery_processing_time",
  "metric_type": "histogram",
  "value": 2.5,
  "unit": "seconds",
  "service": "delivery-service",
  "environment": "production",
  "tags": {
    "delivery_type": "standard",
    "city": "Toronto",
    "courier_id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2024-01-15T12:30:00Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "metric_name": "delivery_processing_time",
  "metric_type": "histogram",
  "value": 2.5,
  "unit": "seconds",
  "service": "delivery-service",
  "environment": "production",
  "tags": {
    "delivery_type": "standard",
    "city": "Toronto",
    "courier_id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2024-01-15T12:30:00Z",
  "recorded_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/monitoring/metrics/record \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "metric_name": "delivery_processing_time",
    "metric_type": "histogram",
    "value": 2.5,
    "unit": "seconds",
    "service": "delivery-service",
    "environment": "production",
    "tags": {
      "delivery_type": "standard",
      "city": "Toronto",
      "courier_id": "550e8400-e29b-41d4-a716-446655440000"
    },
    "timestamp": "2024-01-15T12:30:00Z"
  }'
```

### 2. Get Metrics
**GET** `/monitoring/metrics`

Retrieves metrics with filtering and aggregation.

**Query Parameters:**
- `metric_name` (string, optional): Filter by metric name
- `service` (string, optional): Filter by service
- `environment` (string, optional): Filter by environment
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `aggregation` (string, optional): Aggregation function (avg, sum, min, max, count)
- `group_by` (string[], optional): Group by fields
- `limit` (integer, optional): Number of metrics to return (default: 100)

**Response:**
```json
{
  "metrics": [
    {
      "id": "uuid",
      "metric_name": "delivery_processing_time",
      "metric_type": "histogram",
      "value": 2.5,
      "unit": "seconds",
      "service": "delivery-service",
      "environment": "production",
      "tags": {
        "delivery_type": "standard",
        "city": "Toronto",
        "courier_id": "550e8400-e29b-41d4-a716-446655440000"
      },
      "timestamp": "2024-01-15T12:30:00Z"
    }
  ],
  "aggregations": {
    "avg_value": 2.3,
    "min_value": 1.2,
    "max_value": 4.1,
    "count": 150
  },
  "total": 1,
  "limit": 100
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/monitoring/metrics?metric_name=delivery_processing_time&service=delivery-service&aggregation=avg&limit=50"
```

### 3. Get Service Health
**GET** `/monitoring/health/{service}`

Retrieves health status for a specific service.

**Path Parameters:**
- `service` (string, required): Service name

**Response:**
```json
{
  "service": "delivery-service",
  "status": "healthy",
  "timestamp": "2024-01-15T12:30:00Z",
  "checks": [
    {
      "name": "database_connection",
      "status": "healthy",
      "response_time": 15,
      "last_check": "2024-01-15T12:30:00Z",
      "details": {
        "connection_pool": "active",
        "query_time": "12ms"
      }
    },
    {
      "name": "external_api",
      "status": "healthy",
      "response_time": 250,
      "last_check": "2024-01-15T12:30:00Z",
      "details": {
        "api_endpoint": "https://api.payment.com",
        "status_code": 200
      }
    }
  ],
  "overall_health": {
    "status": "healthy",
    "uptime": "99.9%",
    "response_time": "150ms",
    "error_rate": "0.1%"
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/monitoring/health/delivery-service
```

### 4. Get All Services Health
**GET** `/monitoring/health`

Retrieves health status for all services.

**Query Parameters:**
- `environment` (string, optional): Filter by environment
- `status` (string, optional): Filter by health status

**Response:**
```json
{
  "services": [
    {
      "service": "delivery-service",
      "status": "healthy",
      "timestamp": "2024-01-15T12:30:00Z",
      "uptime": "99.9%",
      "response_time": "150ms",
      "error_rate": "0.1%"
    },
    {
      "service": "payment-service",
      "status": "degraded",
      "timestamp": "2024-01-15T12:30:00Z",
      "uptime": "98.5%",
      "response_time": "300ms",
      "error_rate": "2.1%"
    }
  ],
  "overall_status": "degraded",
  "total_services": 2,
  "healthy_services": 1,
  "degraded_services": 1,
  "unhealthy_services": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/monitoring/health?environment=production&status=healthy"
```

### 5. Create Alert Rule
**POST** `/monitoring/alerts/rules`

Creates a new alert rule.

**Request Body:**
```json
{
  "name": "High Error Rate",
  "description": "Alert when error rate exceeds 5%",
  "metric_name": "error_rate",
  "condition": {
    "operator": "greater_than",
    "threshold": 5.0,
    "unit": "percent"
  },
  "service": "delivery-service",
  "environment": "production",
  "severity": "high",
  "notification_channels": ["email", "slack", "pagerduty"],
  "recipients": [
    "oncall@delivery.com",
    "engineering@delivery.com"
  ],
  "enabled": true
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "High Error Rate",
  "description": "Alert when error rate exceeds 5%",
  "metric_name": "error_rate",
  "condition": {
    "operator": "greater_than",
    "threshold": 5.0,
    "unit": "percent"
  },
  "service": "delivery-service",
  "environment": "production",
  "severity": "high",
  "notification_channels": ["email", "slack", "pagerduty"],
  "recipients": [
    "oncall@delivery.com",
    "engineering@delivery.com"
  ],
  "enabled": true,
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/monitoring/alerts/rules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "High Error Rate",
    "description": "Alert when error rate exceeds 5%",
    "metric_name": "error_rate",
    "condition": {
      "operator": "greater_than",
      "threshold": 5.0,
      "unit": "percent"
    },
    "service": "delivery-service",
    "environment": "production",
    "severity": "high",
    "notification_channels": ["email", "slack", "pagerduty"],
    "recipients": [
      "oncall@delivery.com",
      "engineering@delivery.com"
    ],
    "enabled": true
  }'
```

### 6. Get Active Alerts
**GET** `/monitoring/alerts/active`

Retrieves currently active alerts.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `severity` (string, optional): Filter by severity
- `limit` (integer, optional): Number of alerts to return (default: 20)
- `offset` (integer, optional): Number of alerts to skip (default: 0)

**Response:**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "rule_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "High Error Rate",
      "service": "delivery-service",
      "severity": "high",
      "status": "firing",
      "metric_value": 7.2,
      "threshold": 5.0,
      "triggered_at": "2024-01-15T12:30:00Z",
      "last_updated": "2024-01-15T12:35:00Z",
      "acknowledged": false,
      "acknowledged_by": null
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/monitoring/alerts/active?service=delivery-service&severity=high&limit=10"
```

### 7. Acknowledge Alert
**PUT** `/monitoring/alerts/{id}/acknowledge`

Acknowledges an active alert.

**Path Parameters:**
- `id` (string, required): Alert UUID

**Request Body:**
```json
{
  "acknowledged_by": "550e8400-e29b-41d4-a716-446655440000",
  "notes": "Investigating the issue",
  "expected_resolution": "2024-01-15T14:00:00Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "acknowledged",
  "acknowledged_by": "550e8400-e29b-41d4-a716-446655440000",
  "notes": "Investigating the issue",
  "expected_resolution": "2024-01-15T14:00:00Z",
  "acknowledged_at": "2024-01-15T12:40:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/monitoring/alerts/550e8400-e29b-41d4-a716-446655440000/acknowledge \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "acknowledged_by": "550e8400-e29b-41d4-a716-446655440000",
    "notes": "Investigating the issue",
    "expected_resolution": "2024-01-15T14:00:00Z"
  }'
```

### 8. Get Monitoring Dashboard
**GET** `/monitoring/dashboard`

Retrieves monitoring dashboard data.

**Query Parameters:**
- `time_range` (string, optional): Time range (1h, 6h, 24h, 7d, 30d)
- `services` (string[], optional): Filter by services
- `metrics` (string[], optional): Filter by metrics

**Response:**
```json
{
  "time_range": "24h",
  "services": ["delivery-service", "payment-service"],
  "metrics": ["response_time", "error_rate", "throughput"],
  "overview": {
    "total_services": 2,
    "healthy_services": 1,
    "degraded_services": 1,
    "unhealthy_services": 0,
    "active_alerts": 1,
    "resolved_alerts": 5
  },
  "service_metrics": [
    {
      "service": "delivery-service",
      "response_time": {
        "current": 150,
        "average": 145,
        "p95": 200,
        "p99": 300
      },
      "error_rate": {
        "current": 0.1,
        "average": 0.2,
        "max": 1.5
      },
      "throughput": {
        "current": 1000,
        "average": 950,
        "max": 1200
      }
    }
  ],
  "alerts": [
    {
      "id": "uuid",
      "name": "High Error Rate",
      "service": "delivery-service",
      "severity": "high",
      "status": "firing",
      "triggered_at": "2024-01-15T12:30:00Z"
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/monitoring/dashboard?time_range=24h&services=delivery-service,payment-service"
```

## Database Tables

### monitoring_metrics
System metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_type | text | Metric type |
| value | decimal | Metric value |
| unit | text | Metric unit |
| service | text | Service name |
| environment | text | Environment |
| tags | jsonb | Metric tags |
| timestamp | timestamptz | Metric timestamp |
| recorded_at | timestamptz | Recording timestamp |
| created_at | timestamptz | Creation timestamp |

### health_checks
Service health status.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| service | text | Service name |
| check_name | text | Health check name |
| status | text | Check status |
| response_time | integer | Response time in ms |
| details | jsonb | Check details |
| last_check | timestamptz | Last check timestamp |
| created_at | timestamptz | Creation timestamp |

### alerts
Monitoring alerts.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| rule_id | uuid | Foreign key to alert rules |
| name | text | Alert name |
| service | text | Service name |
| severity | text | Alert severity |
| status | text | Alert status |
| metric_value | decimal | Current metric value |
| threshold | decimal | Alert threshold |
| triggered_at | timestamptz | Trigger timestamp |
| resolved_at | timestamptz | Resolution timestamp |
| acknowledged_by | uuid | Acknowledged by user |
| notes | text | Alert notes |
| created_at | timestamptz | Creation timestamp |

### incidents
Incident records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Incident title |
| description | text | Incident description |
| severity | text | Incident severity |
| status | text | Incident status |
| affected_services | text[] | Affected services |
| root_cause | text | Root cause analysis |
| resolution | text | Resolution details |
| started_at | timestamptz | Start timestamp |
| resolved_at | timestamptz | Resolution timestamp |
| created_by | uuid | Created by user |
| assigned_to | uuid | Assigned to user |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Metrics Collection
- Custom metrics
- System metrics
- Application metrics
- Business metrics

### 2. Health Monitoring
- Service health checks
- Dependency monitoring
- Uptime tracking
- Performance monitoring

### 3. Alerting
- Real-time alerts
- Threshold-based rules
- Multi-channel notifications
- Alert management

### 4. Observability
- Distributed tracing
- Log aggregation
- Performance profiling
- Error tracking

## Security Considerations

- Metrics data is encrypted
- Access control enforced
- Alert data protected
- Audit trail maintained

## Integration Points

- **All Services**: Metrics collection
- **Notification Service**: Alert delivery
- **Audit Service**: Monitoring events
- **Analytics Service**: Performance data

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_metric_data",
  "message": "Invalid metric data provided",
  "details": {
    "field": "metric_name",
    "issue": "Metric name is required"
  }
}
```

**404 Not Found:**
```json
{
  "error": "service_not_found",
  "message": "Service not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "invalid_alert_condition",
  "message": "Invalid alert condition",
  "details": {
    "field": "threshold",
    "issue": "Threshold must be a positive number"
  }
}
```

## Rate Limiting

- Metric recording: 10000 per hour per service
- Health check queries: 1000 per hour per user
- Alert queries: 100 per hour per user
- Dashboard access: 200 per hour per user

## Monitoring Categories

### 1. System Metrics
- CPU usage
- Memory usage
- Disk usage
- Network I/O

### 2. Application Metrics
- Response time
- Throughput
- Error rate
- Request count

### 3. Business Metrics
- Delivery success rate
- User engagement
- Revenue metrics
- Customer satisfaction

### 4. Infrastructure Metrics
- Database performance
- Cache hit rate
- Queue depth
- Service availability