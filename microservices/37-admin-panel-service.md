# Admin Panel Service

## Overview
The Admin Panel Service provides administrative functionality, system management, and administrative tools for platform administrators.

## Purpose
- Administrative functionality
- System management
- User management
- Platform administration

## Data Ownership
- `admin_users` - Admin user accounts
- `admin_roles` - Admin role management
- `admin_permissions` - Admin permissions
- `admin_audit_logs` - Admin action logs

## API Endpoints

### 1. Create Admin User
**POST** `/admin-panel/users`

Creates a new admin user.

**Request Body:**
```json
{
  "email": "admin@delivery.com",
  "name": "John Admin",
  "role": "super_admin",
  "permissions": [
    "user_management",
    "system_configuration",
    "analytics_access",
    "audit_logs"
  ],
  "department": "Engineering",
  "phone": "+1234567890",
  "timezone": "America/Toronto",
  "language": "en",
  "status": "active",
  "two_factor_enabled": true,
  "password": "SecurePassword123!",
  "notes": "Senior system administrator"
}
```

**Response:**
```json
{
  "admin_id": "admin_123456789",
  "email": "admin@delivery.com",
  "name": "John Admin",
  "role": "super_admin",
  "permissions": [
    "user_management",
    "system_configuration",
    "analytics_access",
    "audit_logs"
  ],
  "department": "Engineering",
  "phone": "+1234567890",
  "timezone": "America/Toronto",
  "language": "en",
  "status": "active",
  "two_factor_enabled": true,
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_987654321",
  "last_login": null,
  "password_reset_required": false
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/admin-panel/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "email": "admin@delivery.com",
    "name": "John Admin",
    "role": "super_admin",
    "permissions": [
      "user_management",
      "system_configuration",
      "analytics_access",
      "audit_logs"
    ],
    "department": "Engineering",
    "phone": "+1234567890",
    "timezone": "America/Toronto",
    "language": "en",
    "status": "active",
    "two_factor_enabled": true,
    "password": "SecurePassword123!",
    "notes": "Senior system administrator"
  }'
```

### 2. Get Admin User
**GET** `/admin-panel/users/{admin_id}`

Retrieves admin user information.

**Path Parameters:**
- `admin_id` (string, required): Admin user identifier

**Response:**
```json
{
  "admin_id": "admin_123456789",
  "email": "admin@delivery.com",
  "name": "John Admin",
  "role": "super_admin",
  "permissions": [
    "user_management",
    "system_configuration",
    "analytics_access",
    "audit_logs"
  ],
  "department": "Engineering",
  "phone": "+1234567890",
  "timezone": "America/Toronto",
  "language": "en",
  "status": "active",
  "two_factor_enabled": true,
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_987654321",
  "last_login": "2024-01-15T14:30:00Z",
  "password_reset_required": false,
  "login_attempts": 0,
  "locked_until": null,
  "notes": "Senior system administrator"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/admin-panel/users/admin_123456789
```

### 3. Update Admin User
**PUT** `/admin-panel/users/{admin_id}`

Updates admin user information.

**Path Parameters:**
- `admin_id` (string, required): Admin user identifier

**Request Body:**
```json
{
  "name": "John Admin Updated",
  "role": "super_admin",
  "permissions": [
    "user_management",
    "system_configuration",
    "analytics_access",
    "audit_logs",
    "payment_management"
  ],
  "department": "Engineering",
  "phone": "+1234567890",
  "timezone": "America/Toronto",
  "language": "en",
  "status": "active",
  "two_factor_enabled": true,
  "notes": "Senior system administrator with payment access"
}
```

**Response:**
```json
{
  "admin_id": "admin_123456789",
  "email": "admin@delivery.com",
  "name": "John Admin Updated",
  "role": "super_admin",
  "permissions": [
    "user_management",
    "system_configuration",
    "analytics_access",
    "audit_logs",
    "payment_management"
  ],
  "department": "Engineering",
  "phone": "+1234567890",
  "timezone": "America/Toronto",
  "language": "en",
  "status": "active",
  "two_factor_enabled": true,
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_987654321",
  "last_login": "2024-01-15T14:30:00Z",
  "password_reset_required": false,
  "updated_at": "2024-01-15T15:30:00Z",
  "updated_by": "admin_987654321",
  "notes": "Senior system administrator with payment access"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/admin-panel/users/admin_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "name": "John Admin Updated",
    "role": "super_admin",
    "permissions": [
      "user_management",
      "system_configuration",
      "analytics_access",
      "audit_logs",
      "payment_management"
    ],
    "department": "Engineering",
    "phone": "+1234567890",
    "timezone": "America/Toronto",
    "language": "en",
    "status": "active",
    "two_factor_enabled": true,
    "notes": "Senior system administrator with payment access"
  }'
```

### 4. List Admin Users
**GET** `/admin-panel/users`

Lists admin users with filtering and pagination.

**Query Parameters:**
- `role` (string, optional): Filter by role
- `department` (string, optional): Filter by department
- `status` (string, optional): Filter by status
- `search` (string, optional): Search by name or email
- `limit` (integer, optional): Number of users (default: 50)
- `offset` (integer, optional): Number of users to skip (default: 0)

**Response:**
```json
{
  "users": [
    {
      "admin_id": "admin_123456789",
      "email": "admin@delivery.com",
      "name": "John Admin Updated",
      "role": "super_admin",
      "permissions": [
        "user_management",
        "system_configuration",
        "analytics_access",
        "audit_logs",
        "payment_management"
      ],
      "department": "Engineering",
      "phone": "+1234567890",
      "timezone": "America/Toronto",
      "language": "en",
      "status": "active",
      "two_factor_enabled": true,
      "created_at": "2024-01-15T12:30:00Z",
      "created_by": "admin_987654321",
      "last_login": "2024-01-15T14:30:00Z",
      "password_reset_required": false
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "role": "super_admin",
    "department": "Engineering",
    "status": "active"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/admin-panel/users?role=super_admin&department=Engineering&status=active&limit=50&offset=0"
```

### 5. Create Admin Role
**POST** `/admin-panel/roles`

Creates a new admin role.

**Request Body:**
```json
{
  "name": "support_admin",
  "display_name": "Support Administrator",
  "description": "Administrator with support and user management permissions",
  "permissions": [
    "user_management",
    "support_tickets",
    "user_support",
    "basic_analytics"
  ],
  "level": 3,
  "department": "Support",
  "is_system_role": false,
  "created_by": "admin_987654321"
}
```

**Response:**
```json
{
  "role_id": "role_123456789",
  "name": "support_admin",
  "display_name": "Support Administrator",
  "description": "Administrator with support and user management permissions",
  "permissions": [
    "user_management",
    "support_tickets",
    "user_support",
    "basic_analytics"
  ],
  "level": 3,
  "department": "Support",
  "is_system_role": false,
  "created_by": "admin_987654321",
  "created_at": "2024-01-15T12:30:00Z",
  "status": "active"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/admin-panel/roles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "name": "support_admin",
    "display_name": "Support Administrator",
    "description": "Administrator with support and user management permissions",
    "permissions": [
      "user_management",
      "support_tickets",
      "user_support",
      "basic_analytics"
    ],
    "level": 3,
    "department": "Support",
    "is_system_role": false,
    "created_by": "admin_987654321"
  }'
```

### 6. Get Admin Permissions
**GET** `/admin-panel/permissions`

Retrieves available admin permissions.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `level` (integer, optional): Filter by level
- `include_deprecated` (boolean, optional): Include deprecated permissions (default: false)

**Response:**
```json
{
  "permissions": [
    {
      "permission_id": "perm_123456789",
      "name": "user_management",
      "display_name": "User Management",
      "description": "Manage user accounts and profiles",
      "category": "user_management",
      "level": 1,
      "is_system_permission": true,
      "deprecated": false,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "permission_id": "perm_123456790",
      "name": "system_configuration",
      "display_name": "System Configuration",
      "description": "Configure system settings and parameters",
      "category": "system",
      "level": 2,
      "is_system_permission": true,
      "deprecated": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "categories": [
    {
      "name": "user_management",
      "display_name": "User Management",
      "permissions_count": 5
    },
    {
      "name": "system",
      "display_name": "System",
      "permissions_count": 10
    }
  ],
  "total": 2,
  "filters": {
    "category": "user_management",
    "level": 1,
    "include_deprecated": false
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/admin-panel/permissions?category=user_management&level=1&include_deprecated=false"
```

### 7. Get Admin Audit Logs
**GET** `/admin-panel/audit-logs`

Retrieves admin audit logs.

**Query Parameters:**
- `admin_id` (string, optional): Filter by admin user
- `action` (string, optional): Filter by action
- `resource_type` (string, optional): Filter by resource type
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of logs (default: 100)
- `offset` (integer, optional): Number of logs to skip (default: 0)

**Response:**
```json
{
  "logs": [
    {
      "log_id": "log_123456789",
      "admin_id": "admin_123456789",
      "admin_name": "John Admin",
      "action": "user_created",
      "resource_type": "user",
      "resource_id": "user_123456789",
      "resource_name": "John User",
      "details": {
        "user_email": "user@example.com",
        "user_role": "traveler",
        "created_by": "admin_123456789"
      },
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "timestamp": "2024-01-15T12:30:00Z",
      "success": true
    }
  ],
  "total": 1,
  "limit": 100,
  "offset": 0,
  "filters": {
    "admin_id": "admin_123456789",
    "action": "user_created",
    "resource_type": "user",
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/admin-panel/audit-logs?admin_id=admin_123456789&action=user_created&resource_type=user&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&limit=100&offset=0"
```

### 8. Get Admin Dashboard
**GET** `/admin-panel/dashboard`

Retrieves admin dashboard data.

**Query Parameters:**
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `timezone` (string, optional): Timezone (default: UTC)

**Response:**
```json
{
  "overview": {
    "total_users": 100000,
    "active_users": 80000,
    "total_deliveries": 500000,
    "active_deliveries": 10000,
    "total_revenue": 1000000.00,
    "revenue_currency": "CAD",
    "system_health": "healthy",
    "uptime": 99.9
  },
  "user_metrics": {
    "new_users_today": 100,
    "new_users_this_week": 700,
    "new_users_this_month": 3000,
    "user_growth_rate": 0.15,
    "user_retention_rate": 0.85
  },
  "delivery_metrics": {
    "deliveries_today": 500,
    "deliveries_this_week": 3500,
    "deliveries_this_month": 15000,
    "delivery_success_rate": 0.95,
    "average_delivery_time": 24
  },
  "revenue_metrics": {
    "revenue_today": 5000.00,
    "revenue_this_week": 35000.00,
    "revenue_this_month": 150000.00,
    "revenue_growth_rate": 0.20,
    "average_order_value": 100.00
  },
  "system_metrics": {
    "api_requests_per_minute": 1000,
    "average_response_time": 200,
    "error_rate": 0.01,
    "active_sessions": 5000,
    "database_connections": 100
  },
  "alerts": [
    {
      "alert_id": "alert_123456789",
      "type": "warning",
      "title": "High Error Rate",
      "message": "API error rate is above threshold",
      "severity": "medium",
      "created_at": "2024-01-15T12:30:00Z",
      "acknowledged": false
    }
  ],
  "recent_activities": [
    {
      "activity_id": "act_123456789",
      "type": "user_created",
      "description": "New user registered: user@example.com",
      "timestamp": "2024-01-15T12:30:00Z",
      "admin_name": "John Admin"
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/admin-panel/dashboard?date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&timezone=America/Toronto"
```

## Database Tables

### admin_users
Admin user accounts.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| admin_id | text | Admin identifier |
| email | text | Admin email |
| name | text | Admin name |
| role | text | Admin role |
| permissions | text[] | Admin permissions |
| department | text | Department |
| phone | text | Phone number |
| timezone | text | Timezone |
| language | text | Language |
| status | text | Admin status |
| two_factor_enabled | boolean | 2FA enabled |
| password_hash | text | Password hash |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| last_login | timestamptz | Last login timestamp |
| password_reset_required | boolean | Password reset required |
| login_attempts | integer | Login attempts |
| locked_until | timestamptz | Locked until timestamp |
| notes | text | Admin notes |

### admin_roles
Admin role management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| role_id | text | Role identifier |
| name | text | Role name |
| display_name | text | Display name |
| description | text | Role description |
| permissions | text[] | Role permissions |
| level | integer | Role level |
| department | text | Department |
| is_system_role | boolean | System role |
| created_by | uuid | Reference to admin_users |
| created_at | timestamptz | Creation timestamp |
| status | text | Role status |

### admin_permissions
Admin permissions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| permission_id | text | Permission identifier |
| name | text | Permission name |
| display_name | text | Display name |
| description | text | Permission description |
| category | text | Permission category |
| level | integer | Permission level |
| is_system_permission | boolean | System permission |
| deprecated | boolean | Deprecated |
| created_at | timestamptz | Creation timestamp |

### admin_audit_logs
Admin action logs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| log_id | text | Log identifier |
| admin_id | uuid | Reference to admin_users |
| admin_name | text | Admin name |
| action | text | Action performed |
| resource_type | text | Resource type |
| resource_id | text | Resource identifier |
| resource_name | text | Resource name |
| details | jsonb | Action details |
| ip_address | text | IP address |
| user_agent | text | User agent |
| timestamp | timestamptz | Action timestamp |
| success | boolean | Action success |

## Key Features

### 1. User Management
- Admin user creation
- Role management
- Permission management
- Access control

### 2. System Administration
- System configuration
- Health monitoring
- Performance tracking
- Alert management

### 3. Audit and Compliance
- Action logging
- Compliance tracking
- Security monitoring
- Audit trails

### 4. Dashboard and Analytics
- System overview
- Key metrics
- Performance indicators
- Real-time monitoring

## Security Considerations

- Role-based access control
- Permission management
- Audit logging
- Two-factor authentication

## Integration Points

- **Authentication Service**: Admin authentication
- **Authorization Service**: Permission management
- **Audit Service**: Action logging
- **Analytics Service**: Dashboard data

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_admin_data",
  "message": "Invalid admin data",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}
```

**404 Not Found:**
```json
{
  "error": "admin_not_found",
  "message": "Admin user not found",
  "details": {
    "admin_id": "admin_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Admin validation failed",
  "details": {
    "issues": [
      "Missing required field: name",
      "Invalid role value"
    ]
  }
}
```

## Rate Limiting

- Admin user creation: 10 per hour per admin
- Role creation: 5 per hour per admin
- Audit log queries: 100 per hour per admin
- Dashboard queries: 50 per hour per admin

## Admin Panel Features

### 1. User Management
- Creation
- Updates
- Role assignment
- Permission management

### 2. System Administration
- Configuration
- Monitoring
- Health checks
- Performance

### 3. Audit and Compliance
- Logging
- Tracking
- Monitoring
- Reporting

### 4. Dashboard
- Overview
- Metrics
- Alerts
- Activities