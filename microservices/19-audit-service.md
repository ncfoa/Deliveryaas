# Audit Service

## Overview
The Audit Service provides comprehensive audit logging, compliance tracking, and security monitoring across the platform. It captures all significant events and maintains an immutable audit trail.

## Purpose
- Comprehensive audit logging
- Compliance and regulatory tracking
- Security event monitoring
- Data integrity verification

## Data Ownership
- `audit_logs` - Audit log records
- `audit_events` - Event definitions
- `audit_compliance` - Compliance tracking
- `audit_alerts` - Security alerts

## API Endpoints

### 1. Log Audit Event
**POST** `/audit/events/log`

Logs a new audit event.

**Request Body:**
```json
{
  "event_type": "user_login",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_id": "session_123456789",
  "action": "login",
  "resource": "user_account",
  "resource_id": "550e8400-e29b-41d4-a716-446655440000",
  "details": {
    "ip_address": "192.168.1.100",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "login_method": "email_password",
    "success": true
  },
  "metadata": {
    "app_version": "1.2.3",
    "platform": "web",
    "location": "Toronto, ON"
  },
  "timestamp": "2024-01-15T12:30:00Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "event_type": "user_login",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_id": "session_123456789",
  "action": "login",
  "resource": "user_account",
  "resource_id": "550e8400-e29b-41d4-a716-446655440000",
  "details": {
    "ip_address": "192.168.1.100",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "login_method": "email_password",
    "success": true
  },
  "metadata": {
    "app_version": "1.2.3",
    "platform": "web",
    "location": "Toronto, ON"
  },
  "timestamp": "2024-01-15T12:30:00Z",
  "processed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/audit/events/log \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "event_type": "user_login",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "session_id": "session_123456789",
    "action": "login",
    "resource": "user_account",
    "resource_id": "550e8400-e29b-41d4-a716-446655440000",
    "details": {
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "login_method": "email_password",
      "success": true
    },
    "metadata": {
      "app_version": "1.2.3",
      "platform": "web",
      "location": "Toronto, ON"
    },
    "timestamp": "2024-01-15T12:30:00Z"
  }'
```

### 2. Get Audit Logs
**GET** `/audit/logs`

Retrieves audit logs with filtering and pagination.

**Query Parameters:**
- `event_type` (string, optional): Filter by event type
- `user_id` (string, optional): Filter by user ID
- `action` (string, optional): Filter by action
- `resource` (string, optional): Filter by resource
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of logs to return (default: 50)
- `offset` (integer, optional): Number of logs to skip (default: 0)

**Response:**
```json
{
  "logs": [
    {
      "id": "uuid",
      "event_type": "user_login",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "session_id": "session_123456789",
      "action": "login",
      "resource": "user_account",
      "resource_id": "550e8400-e29b-41d4-a716-446655440000",
      "details": {
        "ip_address": "192.168.1.100",
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "login_method": "email_password",
        "success": true
      },
      "metadata": {
        "app_version": "1.2.3",
        "platform": "web",
        "location": "Toronto, ON"
      },
      "timestamp": "2024-01-15T12:30:00Z",
      "processed_at": "2024-01-15T12:30:05Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/audit/logs?event_type=user_login&user_id=550e8400-e29b-41d4-a716-446655440000&limit=20"
```

### 3. Get User Audit Trail
**GET** `/audit/users/{id}/trail`

Retrieves complete audit trail for a specific user.

**Path Parameters:**
- `id` (string, required): User UUID

**Query Parameters:**
- `event_types` (string[], optional): Filter by event types
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of logs to return (default: 100)
- `offset` (integer, optional): Number of logs to skip (default: 0)

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "trail": [
    {
      "id": "uuid",
      "event_type": "user_login",
      "action": "login",
      "resource": "user_account",
      "resource_id": "550e8400-e29b-41d4-a716-446655440000",
      "details": {
        "ip_address": "192.168.1.100",
        "login_method": "email_password",
        "success": true
      },
      "timestamp": "2024-01-15T12:30:00Z"
    },
    {
      "id": "uuid",
      "event_type": "delivery_created",
      "action": "create",
      "resource": "delivery",
      "resource_id": "550e8400-e29b-41d4-a716-446655440001",
      "details": {
        "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
        "trip_id": "550e8400-e29b-41d4-a716-446655440002",
        "value": 150.00
      },
      "timestamp": "2024-01-15T12:35:00Z"
    }
  ],
  "total": 2,
  "limit": 100,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/audit/users/550e8400-e29b-41d4-a716-446655440000/trail?event_types=user_login,delivery_created&limit=50"
```

### 4. Get Resource Audit Trail
**GET** `/audit/resources/{type}/{id}/trail`

Retrieves audit trail for a specific resource.

**Path Parameters:**
- `type` (string, required): Resource type
- `id` (string, required): Resource UUID

**Query Parameters:**
- `actions` (string[], optional): Filter by actions
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of logs to return (default: 50)
- `offset` (integer, optional): Number of logs to skip (default: 0)

**Response:**
```json
{
  "resource_type": "delivery",
  "resource_id": "550e8400-e29b-41d4-a716-446655440001",
  "trail": [
    {
      "id": "uuid",
      "event_type": "delivery_created",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "action": "create",
      "details": {
        "trip_id": "550e8400-e29b-41d4-a716-446655440002",
        "value": 150.00,
        "status": "pending"
      },
      "timestamp": "2024-01-15T12:35:00Z"
    },
    {
      "id": "uuid",
      "event_type": "delivery_status_changed",
      "user_id": "550e8400-e29b-41d4-a716-446655440003",
      "action": "update",
      "details": {
        "old_status": "pending",
        "new_status": "in_progress",
        "reason": "Courier assigned"
      },
      "timestamp": "2024-01-15T13:00:00Z"
    }
  ],
  "total": 2,
  "limit": 50,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/audit/resources/delivery/550e8400-e29b-41d4-a716-446655440001/trail?actions=create,update&limit=25"
```

### 5. Get Compliance Report
**GET** `/audit/compliance/report`

Generates a compliance report for regulatory requirements.

**Query Parameters:**
- `compliance_type` (string, required): Type of compliance report
- `date_from` (string, required): Start date filter
- `date_to` (string, required): End date filter
- `format` (string, optional): Report format (json, pdf, csv)

**Response:**
```json
{
  "compliance_type": "gdpr",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "summary": {
    "total_events": 125000,
    "data_access_events": 5000,
    "data_modification_events": 2000,
    "data_deletion_events": 100,
    "consent_changes": 500
  },
  "data_subjects": [
    {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "data_access_count": 25,
      "data_modification_count": 10,
      "consent_status": "granted",
      "last_activity": "2024-01-15T12:30:00Z"
    }
  ],
  "breaches": {
    "total_breaches": 0,
    "reported_breaches": 0,
    "resolved_breaches": 0
  },
  "consent_management": {
    "consent_granted": 4500,
    "consent_withdrawn": 100,
    "consent_updated": 200
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/audit/compliance/report?compliance_type=gdpr&date_from=2024-01-01&date_to=2024-01-31&format=json"
```

### 6. Create Audit Alert
**POST** `/audit/alerts/create`

Creates a new audit alert rule.

**Request Body:**
```json
{
  "name": "Failed Login Attempts",
  "description": "Alert when multiple failed login attempts are detected",
  "event_type": "user_login",
  "conditions": {
    "action": "login",
    "details.success": false,
    "count_threshold": 5,
    "time_window": "15 minutes"
  },
  "severity": "high",
  "notification_channels": ["email", "slack"],
  "recipients": [
    "security@delivery.com",
    "admin@delivery.com"
  ],
  "enabled": true
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Failed Login Attempts",
  "description": "Alert when multiple failed login attempts are detected",
  "event_type": "user_login",
  "conditions": {
    "action": "login",
    "details.success": false,
    "count_threshold": 5,
    "time_window": "15 minutes"
  },
  "severity": "high",
  "notification_channels": ["email", "slack"],
  "recipients": [
    "security@delivery.com",
    "admin@delivery.com"
  ],
  "enabled": true,
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/audit/alerts/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Failed Login Attempts",
    "description": "Alert when multiple failed login attempts are detected",
    "event_type": "user_login",
    "conditions": {
      "action": "login",
      "details.success": false,
      "count_threshold": 5,
      "time_window": "15 minutes"
    },
    "severity": "high",
    "notification_channels": ["email", "slack"],
    "recipients": [
      "security@delivery.com",
      "admin@delivery.com"
    ],
    "enabled": true
  }'
```

### 7. Get Audit Alerts
**GET** `/audit/alerts`

Retrieves audit alerts and their status.

**Query Parameters:**
- `status` (string, optional): Filter by alert status
- `severity` (string, optional): Filter by severity level
- `enabled` (boolean, optional): Filter by enabled status
- `limit` (integer, optional): Number of alerts to return (default: 20)
- `offset` (integer, optional): Number of alerts to skip (default: 0)

**Response:**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "name": "Failed Login Attempts",
      "description": "Alert when multiple failed login attempts are detected",
      "event_type": "user_login",
      "conditions": {
        "action": "login",
        "details.success": false,
        "count_threshold": 5,
        "time_window": "15 minutes"
      },
      "severity": "high",
      "notification_channels": ["email", "slack"],
      "recipients": [
        "security@delivery.com",
        "admin@delivery.com"
      ],
      "enabled": true,
      "last_triggered": "2024-01-15T12:30:00Z",
      "trigger_count": 3,
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
curl -X GET "https://api.delivery.com/audit/alerts?severity=high&enabled=true&limit=10"
```

### 8. Get Audit Statistics
**GET** `/audit/statistics`

Retrieves audit statistics and metrics.

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `event_types` (string[], optional): Filter by event types

**Response:**
```json
{
  "period": "monthly",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "event_statistics": {
    "total_events": 125000,
    "unique_users": 5000,
    "event_types": {
      "user_login": 25000,
      "delivery_created": 15000,
      "payment_processed": 20000,
      "user_registration": 5000
    }
  },
  "security_metrics": {
    "failed_logins": 500,
    "suspicious_activities": 25,
    "data_access_events": 10000,
    "data_modification_events": 5000
  },
  "compliance_metrics": {
    "gdpr_events": 15000,
    "consent_changes": 1000,
    "data_breaches": 0,
    "audit_trail_completeness": 0.99
  },
  "performance_metrics": {
    "average_processing_time": "50ms",
    "events_per_second": 100,
    "storage_usage": "2.5GB",
    "retention_period": "7 years"
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/audit/statistics?period=monthly&event_types=user_login,delivery_created"
```

## Database Tables

### audit_logs
Audit log records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| event_type | text | Type of event |
| user_id | uuid | Foreign key to users table |
| session_id | text | Session identifier |
| action | text | Action performed |
| resource | text | Resource type |
| resource_id | uuid | Resource identifier |
| details | jsonb | Event details |
| metadata | jsonb | Additional metadata |
| timestamp | timestamptz | Event timestamp |
| processed_at | timestamptz | Processing timestamp |
| created_at | timestamptz | Creation timestamp |

### audit_events
Event definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| event_type | text | Event type name |
| description | text | Event description |
| category | text | Event category |
| severity | text | Event severity |
| required_fields | jsonb | Required fields |
| optional_fields | jsonb | Optional fields |
| retention_period | integer | Retention period in days |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### audit_compliance
Compliance tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| compliance_type | text | Compliance type |
| user_id | uuid | Foreign key to users table |
| event_type | text | Event type |
| action | text | Action performed |
| data_subject | text | Data subject identifier |
| consent_status | text | Consent status |
| legal_basis | text | Legal basis for processing |
| timestamp | timestamptz | Event timestamp |
| created_at | timestamptz | Creation timestamp |

### audit_alerts
Security alerts.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Alert name |
| description | text | Alert description |
| event_type | text | Event type to monitor |
| conditions | jsonb | Alert conditions |
| severity | text | Alert severity |
| notification_channels | text[] | Notification channels |
| recipients | text[] | Alert recipients |
| enabled | boolean | Alert enabled status |
| last_triggered | timestamptz | Last trigger timestamp |
| trigger_count | integer | Total trigger count |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

## Key Features

### 1. Comprehensive Logging
- All platform events
- Immutable audit trail
- Real-time processing
- Historical data retention

### 2. Compliance Tracking
- GDPR compliance
- Regulatory reporting
- Data subject rights
- Consent management

### 3. Security Monitoring
- Threat detection
- Anomaly detection
- Security alerts
- Incident response

### 4. Data Integrity
- Tamper-proof logs
- Cryptographic verification
- Chain of custody
- Forensic capabilities

## Security Considerations

- Audit logs are immutable
- Cryptographic integrity
- Access control enforced
- Encryption at rest

## Integration Points

- **All Services**: Event logging
- **Security Service**: Threat detection
- **Compliance Service**: Regulatory tracking
- **Notification Service**: Alert delivery

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_audit_data",
  "message": "Invalid audit data provided",
  "details": {
    "field": "event_type",
    "issue": "Event type is required"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "audit_access_denied",
  "message": "Access to audit data denied"
}
```

**404 Not Found:**
```json
{
  "error": "audit_log_not_found",
  "message": "Audit log not found"
}
```

**429 Too Many Requests:**
```json
{
  "error": "audit_rate_limit_exceeded",
  "message": "Audit logging rate limit exceeded",
  "details": {
    "limit": 1000,
    "window": "1 hour"
  }
}
```

## Rate Limiting

- Event logging: 1000 per hour per service
- Log queries: 100 per hour per user
- Compliance reports: 10 per hour per user
- Alert management: 50 per hour per user

## Audit Event Types

### 1. Authentication Events
- User login/logout
- Password changes
- MFA setup
- Session management

### 2. Data Access Events
- Data retrieval
- Data export
- Data sharing
- Data deletion

### 3. System Events
- Configuration changes
- Service deployments
- Database changes
- API access

### 4. Business Events
- Delivery creation
- Payment processing
- User registration
- Profile updates