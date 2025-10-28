# Config Service

## Overview
The Config Service manages application configuration, feature flags, and environment-specific settings across all platform services. It provides centralized configuration management with real-time updates.

## Purpose
- Centralized configuration management
- Feature flag management
- Environment-specific settings
- Configuration versioning and rollback

## Data Ownership
- `configurations` - Configuration records
- `feature_flags` - Feature flag definitions
- `config_versions` - Configuration version history
- `config_environments` - Environment-specific settings

## API Endpoints

### 1. Get Configuration
**GET** `/config/{service}/{environment}`

Retrieves configuration for a specific service and environment.

**Path Parameters:**
- `service` (string, required): Service name
- `environment` (string, required): Environment name

**Query Parameters:**
- `include_secrets` (boolean, optional): Include secret values (default: false)
- `version` (string, optional): Specific configuration version

**Response:**
```json
{
  "service": "delivery-service",
  "environment": "production",
  "version": "v1.2.3",
  "configuration": {
    "database": {
      "host": "db.delivery.com",
      "port": 5432,
      "name": "delivery_prod",
      "pool_size": 20,
      "timeout": 30000
    },
    "redis": {
      "host": "redis.delivery.com",
      "port": 6379,
      "db": 0,
      "timeout": 5000
    },
    "api": {
      "base_url": "https://api.delivery.com",
      "timeout": 30000,
      "retry_attempts": 3
    },
    "features": {
      "enable_tracking": true,
      "enable_notifications": true,
      "enable_analytics": true
    },
    "limits": {
      "max_deliveries_per_user": 100,
      "max_file_size": 10485760,
      "rate_limit_per_minute": 1000
    }
  },
  "secrets": {
    "database": {
      "password": "***"
    },
    "api": {
      "api_key": "***"
    }
  },
  "last_updated": "2024-01-15T12:30:00Z",
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/config/delivery-service/production?include_secrets=false&version=v1.2.3"
```

### 2. Update Configuration
**PUT** `/config/{service}/{environment}`

Updates configuration for a specific service and environment.

**Path Parameters:**
- `service` (string, required): Service name
- `environment` (string, required): Environment name

**Request Body:**
```json
{
  "configuration": {
    "database": {
      "host": "db.delivery.com",
      "port": 5432,
      "name": "delivery_prod",
      "pool_size": 25,
      "timeout": 30000
    },
    "redis": {
      "host": "redis.delivery.com",
      "port": 6379,
      "db": 0,
      "timeout": 5000
    },
    "api": {
      "base_url": "https://api.delivery.com",
      "timeout": 30000,
      "retry_attempts": 3
    },
    "features": {
      "enable_tracking": true,
      "enable_notifications": true,
      "enable_analytics": true
    },
    "limits": {
      "max_deliveries_per_user": 150,
      "max_file_size": 10485760,
      "rate_limit_per_minute": 1000
    }
  },
  "secrets": {
    "database": {
      "password": "new_password_here"
    },
    "api": {
      "api_key": "new_api_key_here"
    }
  },
  "version": "v1.2.4",
  "description": "Increased pool size and delivery limits",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "service": "delivery-service",
  "environment": "production",
  "version": "v1.2.4",
  "configuration": {
    "database": {
      "host": "db.delivery.com",
      "port": 5432,
      "name": "delivery_prod",
      "pool_size": 25,
      "timeout": 30000
    },
    "redis": {
      "host": "redis.delivery.com",
      "port": 6379,
      "db": 0,
      "timeout": 5000
    },
    "api": {
      "base_url": "https://api.delivery.com",
      "timeout": 30000,
      "retry_attempts": 3
    },
    "features": {
      "enable_tracking": true,
      "enable_notifications": true,
      "enable_analytics": true
    },
    "limits": {
      "max_deliveries_per_user": 150,
      "max_file_size": 10485760,
      "rate_limit_per_minute": 1000
    }
  },
  "secrets": {
    "database": {
      "password": "***"
    },
    "api": {
      "api_key": "***"
    }
  },
  "description": "Increased pool size and delivery limits",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "last_updated": "2024-01-15T14:30:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/config/delivery-service/production \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "configuration": {
      "database": {
        "host": "db.delivery.com",
        "port": 5432,
        "name": "delivery_prod",
        "pool_size": 25,
        "timeout": 30000
      },
      "redis": {
        "host": "redis.delivery.com",
        "port": 6379,
        "db": 0,
        "timeout": 5000
      },
      "api": {
        "base_url": "https://api.delivery.com",
        "timeout": 30000,
        "retry_attempts": 3
      },
      "features": {
        "enable_tracking": true,
        "enable_notifications": true,
        "enable_analytics": true
      },
      "limits": {
        "max_deliveries_per_user": 150,
        "max_file_size": 10485760,
        "rate_limit_per_minute": 1000
      }
    },
    "secrets": {
      "database": {
        "password": "new_password_here"
      },
      "api": {
        "api_key": "new_api_key_here"
      }
    },
    "version": "v1.2.4",
    "description": "Increased pool size and delivery limits",
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 3. Get Feature Flags
**GET** `/config/feature-flags`

Retrieves feature flags for a specific service and environment.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `environment` (string, optional): Filter by environment
- `status` (string, optional): Filter by status (active, inactive, deprecated)
- `limit` (integer, optional): Number of flags to return (default: 50)
- `offset` (integer, optional): Number of flags to skip (default: 0)

**Response:**
```json
{
  "feature_flags": [
    {
      "id": "uuid",
      "name": "enable_real_time_tracking",
      "description": "Enable real-time delivery tracking",
      "service": "delivery-service",
      "environment": "production",
      "status": "active",
      "enabled": true,
      "rollout_percentage": 100,
      "target_users": ["all"],
      "conditions": {
        "user_roles": ["traveler", "courier"],
        "regions": ["CA", "US"],
        "app_versions": [">=1.2.0"]
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
curl -X GET "https://api.delivery.com/config/feature-flags?service=delivery-service&environment=production&status=active&limit=20"
```

### 4. Update Feature Flag
**PUT** `/config/feature-flags/{id}`

Updates a feature flag.

**Path Parameters:**
- `id` (string, required): Feature flag UUID

**Request Body:**
```json
{
  "name": "enable_real_time_tracking",
  "description": "Enable real-time delivery tracking",
  "service": "delivery-service",
  "environment": "production",
  "status": "active",
  "enabled": true,
  "rollout_percentage": 75,
  "target_users": ["traveler", "courier"],
  "conditions": {
    "user_roles": ["traveler", "courier"],
    "regions": ["CA", "US"],
    "app_versions": [">=1.2.0"]
  },
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "enable_real_time_tracking",
  "description": "Enable real-time delivery tracking",
  "service": "delivery-service",
  "environment": "production",
  "status": "active",
  "enabled": true,
  "rollout_percentage": 75,
  "target_users": ["traveler", "courier"],
  "conditions": {
    "user_roles": ["traveler", "courier"],
    "regions": ["CA", "US"],
    "app_versions": [">=1.2.0"]
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/config/feature-flags/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "enable_real_time_tracking",
    "description": "Enable real-time delivery tracking",
    "service": "delivery-service",
    "environment": "production",
    "status": "active",
    "enabled": true,
    "rollout_percentage": 75,
    "target_users": ["traveler", "courier"],
    "conditions": {
      "user_roles": ["traveler", "courier"],
      "regions": ["CA", "US"],
      "app_versions": [">=1.2.0"]
    },
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 5. Get Configuration History
**GET** `/config/{service}/{environment}/history`

Retrieves configuration version history.

**Path Parameters:**
- `service` (string, required): Service name
- `environment` (string, required): Environment name

**Query Parameters:**
- `limit` (integer, optional): Number of versions to return (default: 20)
- `offset` (integer, optional): Number of versions to skip (default: 0)

**Response:**
```json
{
  "service": "delivery-service",
  "environment": "production",
  "versions": [
    {
      "version": "v1.2.4",
      "description": "Increased pool size and delivery limits",
      "updated_by": "550e8400-e29b-41d4-a716-446655440000",
      "updated_at": "2024-01-15T14:30:00Z",
      "changes": {
        "database.pool_size": {
          "old": 20,
          "new": 25
        },
        "limits.max_deliveries_per_user": {
          "old": 100,
          "new": 150
        }
      }
    },
    {
      "version": "v1.2.3",
      "description": "Added new API endpoints",
      "updated_by": "550e8400-e29b-41d4-a716-446655440001",
      "updated_at": "2024-01-15T12:30:00Z",
      "changes": {
        "api.endpoints": {
          "old": null,
          "new": ["/deliveries", "/tracking"]
        }
      }
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/config/delivery-service/production/history?limit=10"
```

### 6. Rollback Configuration
**POST** `/config/{service}/{environment}/rollback`

Rolls back configuration to a previous version.

**Path Parameters:**
- `service` (string, required): Service name
- `environment` (string, required): Environment name

**Request Body:**
```json
{
  "target_version": "v1.2.3",
  "reason": "Performance issues with new configuration",
  "rollback_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "service": "delivery-service",
  "environment": "production",
  "previous_version": "v1.2.4",
  "target_version": "v1.2.3",
  "reason": "Performance issues with new configuration",
  "rollback_by": "550e8400-e29b-41d4-a716-446655440000",
  "rolled_back_at": "2024-01-15T16:30:00Z",
  "status": "completed"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/config/delivery-service/production/rollback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "target_version": "v1.2.3",
    "reason": "Performance issues with new configuration",
    "rollback_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 7. Get Configuration Diff
**GET** `/config/{service}/{environment}/diff`

Retrieves differences between configuration versions.

**Path Parameters:**
- `service` (string, required): Service name
- `environment` (string, required): Environment name

**Query Parameters:**
- `from_version` (string, required): Source version
- `to_version` (string, required): Target version

**Response:**
```json
{
  "service": "delivery-service",
  "environment": "production",
  "from_version": "v1.2.3",
  "to_version": "v1.2.4",
  "differences": {
    "database.pool_size": {
      "old": 20,
      "new": 25,
      "type": "modified"
    },
    "limits.max_deliveries_per_user": {
      "old": 100,
      "new": 150,
      "type": "modified"
    },
    "api.timeout": {
      "old": null,
      "new": 30000,
      "type": "added"
    }
  },
  "summary": {
    "total_changes": 3,
    "added": 1,
    "modified": 2,
    "removed": 0
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/config/delivery-service/production/diff?from_version=v1.2.3&to_version=v1.2.4"
```

### 8. Validate Configuration
**POST** `/config/{service}/{environment}/validate`

Validates configuration before applying.

**Path Parameters:**
- `service` (string, required): Service name
- `environment` (string, required): Environment name

**Request Body:**
```json
{
  "configuration": {
    "database": {
      "host": "db.delivery.com",
      "port": 5432,
      "name": "delivery_prod",
      "pool_size": 25,
      "timeout": 30000
    },
    "redis": {
      "host": "redis.delivery.com",
      "port": 6379,
      "db": 0,
      "timeout": 5000
    },
    "api": {
      "base_url": "https://api.delivery.com",
      "timeout": 30000,
      "retry_attempts": 3
    }
  },
  "secrets": {
    "database": {
      "password": "new_password_here"
    },
    "api": {
      "api_key": "new_api_key_here"
    }
  }
}
```

**Response:**
```json
{
  "valid": true,
  "warnings": [
    {
      "field": "database.pool_size",
      "message": "Pool size is higher than recommended for this environment",
      "severity": "warning"
    }
  ],
  "errors": [],
  "suggestions": [
    {
      "field": "api.timeout",
      "message": "Consider increasing timeout for production environment",
      "severity": "info"
    }
  ],
  "validated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/config/delivery-service/production/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "configuration": {
      "database": {
        "host": "db.delivery.com",
        "port": 5432,
        "name": "delivery_prod",
        "pool_size": 25,
        "timeout": 30000
      },
      "redis": {
        "host": "redis.delivery.com",
        "port": 6379,
        "db": 0,
        "timeout": 5000
      },
      "api": {
        "base_url": "https://api.delivery.com",
        "timeout": 30000,
        "retry_attempts": 3
      }
    },
    "secrets": {
      "database": {
        "password": "new_password_here"
      },
      "api": {
        "api_key": "new_api_key_here"
      }
    }
  }'
```

## Database Tables

### configurations
Configuration records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| service | text | Service name |
| environment | text | Environment name |
| version | text | Configuration version |
| configuration | jsonb | Configuration data |
| secrets | jsonb | Secret values |
| description | text | Configuration description |
| updated_by | uuid | Foreign key to users table |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### feature_flags
Feature flag definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Feature flag name |
| description | text | Feature flag description |
| service | text | Service name |
| environment | text | Environment name |
| status | text | Flag status |
| enabled | boolean | Flag enabled status |
| rollout_percentage | integer | Rollout percentage |
| target_users | text[] | Target user groups |
| conditions | jsonb | Flag conditions |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### config_versions
Configuration version history.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| service | text | Service name |
| environment | text | Environment name |
| version | text | Configuration version |
| configuration | jsonb | Configuration data |
| secrets | jsonb | Secret values |
| description | text | Version description |
| changes | jsonb | Configuration changes |
| updated_by | uuid | Foreign key to users table |
| created_at | timestamptz | Creation timestamp |

### config_environments
Environment-specific settings.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Environment name |
| description | text | Environment description |
| settings | jsonb | Environment settings |
| secrets | jsonb | Environment secrets |
| status | text | Environment status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

## Key Features

### 1. Configuration Management
- Centralized configuration
- Environment-specific settings
- Version control
- Rollback capabilities

### 2. Feature Flags
- Dynamic feature toggles
- Gradual rollouts
- A/B testing support
- User targeting

### 3. Security
- Secret management
- Access control
- Audit logging
- Encryption

### 4. Validation
- Configuration validation
- Schema enforcement
- Dependency checking
- Impact analysis

## Security Considerations

- Secrets are encrypted
- Access control enforced
- Audit trail maintained
- Configuration validation

## Integration Points

- **All Services**: Configuration access
- **Security Service**: Access control
- **Audit Service**: Configuration changes
- **Monitoring Service**: Health checks

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_configuration",
  "message": "Invalid configuration provided",
  "details": {
    "field": "database.port",
    "issue": "Port must be a valid number"
  }
}
```

**404 Not Found:**
```json
{
  "error": "configuration_not_found",
  "message": "Configuration not found for service and environment"
}
```

**409 Conflict:**
```json
{
  "error": "version_conflict",
  "message": "Configuration version already exists",
  "details": {
    "version": "v1.2.4",
    "existing_version": "v1.2.4"
  }
}
```

## Rate Limiting

- Configuration reads: 1000 per hour per service
- Configuration updates: 10 per hour per user
- Feature flag updates: 50 per hour per user
- Validation requests: 100 per hour per user

## Configuration Categories

### 1. Database Configuration
- Connection settings
- Pool configuration
- Timeout settings
- SSL configuration

### 2. API Configuration
- Base URLs
- Timeout settings
- Retry policies
- Rate limiting

### 3. Feature Flags
- Feature toggles
- Rollout percentages
- User targeting
- A/B testing

### 4. Environment Settings
- Environment-specific values
- Secret management
- Feature flags
- Monitoring settings