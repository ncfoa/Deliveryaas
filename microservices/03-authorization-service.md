# Authorization Service

## Overview
The Authorization Service provides role-based access control (RBAC) and fine-grained permissions management. It handles user roles, API key management, and permission inheritance across the platform.

## Purpose
- Role-based access control (RBAC)
- Fine-grained permissions management
- API key generation and management
- Permission inheritance and validation

## Data Ownership
- `roles` - Role definitions and metadata
- `user_roles` - User role assignments
- `api_keys` - API key management
- `permissions` - Permission definitions
- `role_permissions` - Role-permission mappings

## API Endpoints

### 1. Check User Permissions
**GET** `/authz/permissions`

Checks if a user has specific permissions.

**Query Parameters:**
- `user_id` (string, required): User UUID
- `permissions` (string, required): Comma-separated list of permissions
- `resource_id` (string, optional): Resource ID for context-specific permissions

**Response:**
```json
{
  "user_id": "uuid",
  "permissions": {
    "read:profile": true,
    "write:trips": true,
    "admin:users": false,
    "delete:shipments": false
  },
  "roles": ["traveller", "verified_user"],
  "checked_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/authz/permissions?user_id=550e8400-e29b-41d4-a716-446655440000&permissions=read:profile,write:trips,admin:users"
```

### 2. Create Role
**POST** `/authz/roles`

Creates a new role with specified permissions.

**Request Body:**
```json
{
  "key": "premium_traveller",
  "name": "Premium Traveller",
  "description": "Traveller with premium features",
  "permissions": [
    "read:profile",
    "write:trips",
    "read:shipments",
    "write:reviews",
    "premium:priority_booking"
  ]
}
```

**Response:**
```json
{
  "id": "uuid",
  "key": "premium_traveller",
  "name": "Premium Traveller",
  "description": "Traveller with premium features",
  "permissions": [
    "read:profile",
    "write:trips",
    "read:shipments",
    "write:reviews",
    "premium:priority_booking"
  ],
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/authz/roles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "key": "premium_traveller",
    "name": "Premium Traveller",
    "description": "Traveller with premium features",
    "permissions": [
      "read:profile",
      "write:trips",
      "read:shipments",
      "write:reviews",
      "premium:priority_booking"
    ]
  }'
```

### 3. Assign Roles to User
**PUT** `/authz/users/{id}/roles`

Assigns or updates roles for a specific user.

**Path Parameters:**
- `id` (string, required): User UUID

**Request Body:**
```json
{
  "roles": [
    {
      "role_id": "uuid",
      "assigned_by": "uuid",
      "expires_at": "2024-12-31T23:59:59Z"
    },
    {
      "role_id": "uuid",
      "assigned_by": "uuid"
    }
  ]
}
```

**Response:**
```json
{
  "user_id": "uuid",
  "roles": [
    {
      "role_id": "uuid",
      "role_key": "traveller",
      "role_name": "Traveller",
      "assigned_by": "uuid",
      "assigned_at": "2024-01-15T12:30:00Z",
      "expires_at": "2024-12-31T23:59:59Z"
    },
    {
      "role_id": "uuid",
      "role_key": "verified_user",
      "role_name": "Verified User",
      "assigned_by": "uuid",
      "assigned_at": "2024-01-15T12:30:00Z",
      "expires_at": null
    }
  ],
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/authz/users/550e8400-e29b-41d4-a716-446655440000/roles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "roles": [
      {
        "role_id": "550e8400-e29b-41d4-a716-446655440001",
        "assigned_by": "550e8400-e29b-41d4-a716-446655440002"
      }
    ]
  }'
```

### 4. Generate API Key
**POST** `/authz/api-keys`

Generates a new API key for service-to-service communication.

**Request Body:**
```json
{
  "name": "Mobile App API Key",
  "description": "API key for mobile application",
  "permissions": [
    "read:profile",
    "write:trips",
    "read:shipments"
  ],
  "expires_at": "2024-12-31T23:59:59Z",
  "rate_limit": 1000
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Mobile App API Key",
  "description": "API key for mobile application",
  "key": "ak_live_1234567890abcdef",
  "permissions": [
    "read:profile",
    "write:trips",
    "read:shipments"
  ],
  "rate_limit": 1000,
  "expires_at": "2024-12-31T23:59:59Z",
  "created_at": "2024-01-15T12:30:00Z",
  "last_used_at": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/authz/api-keys \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Mobile App API Key",
    "description": "API key for mobile application",
    "permissions": [
      "read:profile",
      "write:trips",
      "read:shipments"
    ],
    "expires_at": "2024-12-31T23:59:59Z",
    "rate_limit": 1000
  }'
```

### 5. Revoke API Key
**DELETE** `/authz/api-keys/{id}`

Revokes an API key, making it invalid.

**Path Parameters:**
- `id` (string, required): API Key UUID

**Response:**
```json
{
  "message": "API key revoked successfully",
  "revoked_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/authz/api-keys/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer jwt_token_here"
```

### 6. List User Roles
**GET** `/authz/users/{id}/roles`

Retrieves all roles assigned to a user.

**Path Parameters:**
- `id` (string, required): User UUID

**Query Parameters:**
- `include_permissions` (boolean, optional): Include role permissions in response
- `active_only` (boolean, optional): Only return non-expired roles

**Response:**
```json
{
  "user_id": "uuid",
  "roles": [
    {
      "role_id": "uuid",
      "role_key": "traveller",
      "role_name": "Traveller",
      "assigned_by": "uuid",
      "assigned_at": "2024-01-15T12:30:00Z",
      "expires_at": null,
      "permissions": [
        "read:profile",
        "write:trips",
        "read:shipments"
      ]
    }
  ],
  "total": 1
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/authz/users/550e8400-e29b-41d4-a716-446655440000/roles?include_permissions=true&active_only=true"
```

### 7. List API Keys
**GET** `/authz/api-keys`

Lists API keys for the authenticated user or organization.

**Query Parameters:**
- `owner_id` (string, optional): Filter by owner ID
- `active_only` (boolean, optional): Only return non-revoked keys
- `limit` (integer, optional): Number of keys to return (default: 20)
- `offset` (integer, optional): Number of keys to skip (default: 0)

**Response:**
```json
{
  "api_keys": [
    {
      "id": "uuid",
      "name": "Mobile App API Key",
      "description": "API key for mobile application",
      "permissions": [
        "read:profile",
        "write:trips",
        "read:shipments"
      ],
      "rate_limit": 1000,
      "expires_at": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-15T12:30:00Z",
      "last_used_at": "2024-01-15T14:30:00Z",
      "is_active": true
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/authz/api-keys?active_only=true&limit=10"
```

### 8. Validate API Key
**POST** `/authz/validate`

Validates an API key and returns associated permissions.

**Request Body:**
```json
{
  "api_key": "ak_live_1234567890abcdef",
  "required_permissions": [
    "read:profile",
    "write:trips"
  ]
}
```

**Response:**
```json
{
  "valid": true,
  "api_key_id": "uuid",
  "permissions": [
    "read:profile",
    "write:trips",
    "read:shipments"
  ],
  "rate_limit": 1000,
  "expires_at": "2024-12-31T23:59:59Z",
  "last_used_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/authz/validate \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "ak_live_1234567890abcdef",
    "required_permissions": [
      "read:profile",
      "write:trips"
    ]
  }'
```

## Database Tables

### roles
Role definitions and metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| key | text | Unique role identifier |
| name | text | Human-readable role name |
| description | text | Role description |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### user_roles
User role assignments with expiration support.

| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | Foreign key to users table |
| role_id | uuid | Foreign key to roles table |
| assigned_by | uuid | User who assigned the role |
| assigned_at | timestamptz | Assignment timestamp |
| expires_at | timestamptz | Role expiration timestamp (nullable) |
| created_at | timestamptz | Creation timestamp |

### api_keys
API key management for service-to-service communication.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| owner_user_id | uuid | Foreign key to users table |
| name | text | API key name |
| description | text | API key description |
| key_hash | text | Hashed API key |
| permissions | text[] | Array of permissions |
| rate_limit | integer | Requests per hour limit |
| expires_at | timestamptz | Expiration timestamp (nullable) |
| last_used_at | timestamptz | Last usage timestamp |
| is_active | boolean | Whether key is active |
| created_at | timestamptz | Creation timestamp |

### permissions
Permission definitions and metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| key | text | Unique permission identifier |
| name | text | Human-readable permission name |
| description | text | Permission description |
| resource_type | text | Type of resource this applies to |
| action | text | Action this permission allows |
| created_at | timestamptz | Creation timestamp |

### role_permissions
Mapping between roles and permissions.

| Column | Type | Description |
|--------|------|-------------|
| role_id | uuid | Foreign key to roles table |
| permission_id | uuid | Foreign key to permissions table |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Role-Based Access Control (RBAC)
- Hierarchical role system
- Role inheritance
- Dynamic role assignment
- Role expiration support

### 2. Fine-Grained Permissions
- Resource-specific permissions
- Action-based permissions
- Context-aware permissions
- Permission inheritance

### 3. API Key Management
- Secure key generation
- Permission-based access
- Rate limiting per key
- Usage tracking and analytics

### 4. Permission Validation
- Real-time permission checking
- Cached permission lookups
- Batch permission validation
- Audit trail for permission changes

## Security Considerations

- API keys are hashed before storage
- Permission checks are cached for performance
- Role assignments are audited
- API key usage is monitored
- Permission inheritance is secure

## Integration Points

- **Authentication Service**: User session validation
- **User Service**: User account verification
- **Audit Service**: Permission change logging
- **Rate Limiting Service**: API key rate limiting

## Error Handling

### Common Error Responses

**403 Forbidden:**
```json
{
  "error": "insufficient_permissions",
  "message": "User does not have required permissions",
  "required_permissions": ["admin:users"],
  "user_permissions": ["read:profile", "write:trips"]
}
```

**401 Unauthorized:**
```json
{
  "error": "invalid_api_key",
  "message": "API key is invalid or expired"
}
```

**400 Bad Request:**
```json
{
  "error": "invalid_role",
  "message": "Role 'invalid_role' does not exist"
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "API key rate limit exceeded",
  "retry_after": 3600
}
```

## Rate Limiting

- Permission checks: 1000 per minute per user
- API key validation: 5000 per minute per key
- Role assignments: 10 per minute per admin
- API key creation: 5 per hour per user

## Permission System

### Permission Format
Permissions follow the format: `{action}:{resource}`

**Examples:**
- `read:profile` - Read user profiles
- `write:trips` - Create/update trips
- `admin:users` - Administrative user management
- `delete:shipments` - Delete shipments

### Resource Types
- `profile` - User profiles
- `trips` - Traveler trips
- `shipments` - Package shipments
- `users` - User accounts
- `payments` - Payment processing
- `admin` - Administrative functions

### Actions
- `read` - View/read access
- `write` - Create/update access
- `delete` - Delete access
- `admin` - Administrative access
- `premium` - Premium feature access