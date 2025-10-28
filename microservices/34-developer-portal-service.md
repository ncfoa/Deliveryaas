# Developer Portal Service

## Overview
The Developer Portal Service provides a comprehensive developer experience including API documentation, SDKs, testing tools, and developer resources. It serves as the central hub for developers integrating with the platform.

## Purpose
- Developer onboarding and experience
- API documentation and resources
- SDK and library management
- Developer tools and testing

## Data Ownership
- `developer_accounts` - Developer account information
- `api_keys` - API key management
- `sdk_libraries` - SDK and library information
- `developer_resources` - Developer resources and guides

## API Endpoints

### 1. Create Developer Account
**POST** `/developer-portal/accounts`

Creates a new developer account.

**Request Body:**
```json
{
  "email": "developer@example.com",
  "name": "John Developer",
  "company": "Example Corp",
  "website": "https://example.com",
  "description": "Building delivery integration",
  "use_case": "E-commerce delivery tracking",
  "expected_volume": "1000-5000",
  "country": "CA",
  "timezone": "America/Toronto",
  "preferred_language": "en",
  "marketing_consent": true,
  "terms_accepted": true,
  "privacy_accepted": true
}
```

**Response:**
```json
{
  "account_id": "dev_123456789",
  "email": "developer@example.com",
  "name": "John Developer",
  "company": "Example Corp",
  "website": "https://example.com",
  "description": "Building delivery integration",
  "use_case": "E-commerce delivery tracking",
  "expected_volume": "1000-5000",
  "country": "CA",
  "timezone": "America/Toronto",
  "preferred_language": "en",
  "status": "pending_verification",
  "verification_token": "verify_token_123456789",
  "created_at": "2024-01-15T12:30:00Z",
  "verified_at": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/developer-portal/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "name": "John Developer",
    "company": "Example Corp",
    "website": "https://example.com",
    "description": "Building delivery integration",
    "use_case": "E-commerce delivery tracking",
    "expected_volume": "1000-5000",
    "country": "CA",
    "timezone": "America/Toronto",
    "preferred_language": "en",
    "marketing_consent": true,
    "terms_accepted": true,
    "privacy_accepted": true
  }'
```

### 2. Verify Developer Account
**POST** `/developer-portal/accounts/verify`

Verifies a developer account.

**Request Body:**
```json
{
  "account_id": "dev_123456789",
  "verification_token": "verify_token_123456789"
}
```

**Response:**
```json
{
  "account_id": "dev_123456789",
  "verified": true,
  "verified_at": "2024-01-15T12:35:00Z",
  "status": "active",
  "welcome_message": "Welcome to the Delivery Platform Developer Portal!"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/developer-portal/accounts/verify \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": "dev_123456789",
    "verification_token": "verify_token_123456789"
  }'
```

### 3. Get Developer Account
**GET** `/developer-portal/accounts/{account_id}`

Retrieves developer account information.

**Path Parameters:**
- `account_id` (string, required): Developer account UUID

**Response:**
```json
{
  "account_id": "dev_123456789",
  "email": "developer@example.com",
  "name": "John Developer",
  "company": "Example Corp",
  "website": "https://example.com",
  "description": "Building delivery integration",
  "use_case": "E-commerce delivery tracking",
  "expected_volume": "1000-5000",
  "country": "CA",
  "timezone": "America/Toronto",
  "preferred_language": "en",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "verified_at": "2024-01-15T12:35:00Z",
  "last_login": "2024-01-15T14:30:00Z",
  "api_keys": [
    {
      "key_id": "key_123456789",
      "name": "Production API Key",
      "status": "active",
      "created_at": "2024-01-15T13:00:00Z"
    }
  ],
  "usage_stats": {
    "total_requests": 10000,
    "successful_requests": 9500,
    "failed_requests": 500,
    "last_30_days": {
      "requests": 5000,
      "success_rate": 0.95
    }
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/developer-portal/accounts/dev_123456789
```

### 4. Create API Key
**POST** `/developer-portal/api-keys`

Creates a new API key for a developer account.

**Request Body:**
```json
{
  "account_id": "dev_123456789",
  "name": "Production API Key",
  "description": "API key for production environment",
  "permissions": [
    "delivery:read",
    "delivery:write",
    "payment:read"
  ],
  "rate_limit": {
    "requests_per_minute": 1000,
    "requests_per_hour": 10000
  },
  "allowed_ips": [
    "192.168.1.0/24",
    "10.0.0.0/8"
  ],
  "expires_at": "2025-01-15T12:30:00Z"
}
```

**Response:**
```json
{
  "key_id": "key_123456789",
  "api_key": "sk_live_123456789abcdef",
  "name": "Production API Key",
  "description": "API key for production environment",
  "permissions": [
    "delivery:read",
    "delivery:write",
    "payment:read"
  ],
  "rate_limit": {
    "requests_per_minute": 1000,
    "requests_per_hour": 10000
  },
  "allowed_ips": [
    "192.168.1.0/24",
    "10.0.0.0/8"
  ],
  "expires_at": "2025-01-15T12:30:00Z",
  "status": "active",
  "created_at": "2024-01-15T13:00:00Z",
  "last_used": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/developer-portal/api-keys \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "account_id": "dev_123456789",
    "name": "Production API Key",
    "description": "API key for production environment",
    "permissions": [
      "delivery:read",
      "delivery:write",
      "payment:read"
    ],
    "rate_limit": {
      "requests_per_minute": 1000,
      "requests_per_hour": 10000
    },
    "allowed_ips": [
      "192.168.1.0/24",
      "10.0.0.0/8"
    ],
    "expires_at": "2025-01-15T12:30:00Z"
  }'
```

### 5. Get SDK Libraries
**GET** `/developer-portal/sdks`

Retrieves available SDK libraries.

**Query Parameters:**
- `language` (string, optional): Filter by programming language
- `platform` (string, optional): Filter by platform
- `version` (string, optional): Filter by version
- `status` (string, optional): Filter by status

**Response:**
```json
{
  "libraries": [
    {
      "library_id": "lib_123456789",
      "name": "Delivery Platform JavaScript SDK",
      "language": "javascript",
      "platform": "node",
      "version": "1.2.3",
      "description": "Official JavaScript SDK for the Delivery Platform",
      "repository": "https://github.com/delivery-platform/js-sdk",
      "package_manager": "npm",
      "package_name": "@delivery-platform/sdk",
      "install_command": "npm install @delivery-platform/sdk",
      "documentation_url": "https://docs.delivery.com/sdks/javascript",
      "examples_url": "https://github.com/delivery-platform/js-sdk-examples",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T12:30:00Z",
      "downloads": {
        "total": 100000,
        "last_30_days": 10000
      },
      "features": [
        "Delivery management",
        "Payment processing",
        "Real-time tracking",
        "Webhook handling"
      ]
    }
  ],
  "total": 1,
  "filters": {
    "language": "javascript",
    "platform": "node",
    "status": "active"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/developer-portal/sdks?language=javascript&platform=node&status=active"
```

### 6. Get Developer Resources
**GET** `/developer-portal/resources`

Retrieves developer resources and guides.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `type` (string, optional): Filter by resource type
- `language` (string, optional): Filter by language
- `limit` (integer, optional): Number of resources (default: 50)
- `offset` (integer, optional): Number of resources to skip (default: 0)

**Response:**
```json
{
  "resources": [
    {
      "resource_id": "res_123456789",
      "title": "Getting Started with Delivery API",
      "description": "Complete guide to getting started with the Delivery Platform API",
      "category": "tutorial",
      "type": "guide",
      "language": "en",
      "content": "This guide will walk you through...",
      "url": "https://docs.delivery.com/getting-started",
      "tags": ["api", "getting-started", "tutorial"],
      "difficulty": "beginner",
      "estimated_time": "30 minutes",
      "author": "Delivery Platform Team",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T12:30:00Z",
      "views": 5000,
      "rating": 4.8
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "category": "tutorial",
    "type": "guide",
    "language": "en"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/developer-portal/resources?category=tutorial&type=guide&language=en&limit=50&offset=0"
```

### 7. Get API Testing Tool
**GET** `/developer-portal/testing-tool`

Retrieves API testing tool configuration.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `endpoint` (string, optional): Filter by endpoint

**Response:**
```json
{
  "testing_tool": {
    "base_url": "https://api.delivery.com/v1",
    "authentication": {
      "type": "bearer",
      "header": "Authorization",
      "format": "Bearer {api_key}"
    },
    "endpoints": [
      {
        "path": "/deliveries",
        "method": "POST",
        "summary": "Create Delivery",
        "description": "Creates a new delivery request",
        "parameters": [
          {
            "name": "delivery_id",
            "type": "string",
            "required": true,
            "description": "Unique delivery identifier",
            "example": "550e8400-e29b-41d4-a716-446655440000"
          }
        ],
        "request_body": {
          "type": "object",
          "properties": {
            "delivery_id": {
              "type": "string",
              "description": "Unique delivery identifier"
            },
            "trip_id": {
              "type": "string",
              "description": "Trip identifier"
            },
            "value": {
              "type": "number",
              "description": "Delivery value"
            }
          },
          "required": ["delivery_id", "trip_id", "value"]
        },
        "responses": {
          "200": {
            "description": "Delivery created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Delivery ID"
                    },
                    "status": {
                      "type": "string",
                      "description": "Delivery status"
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Creation timestamp"
                    }
                  }
                }
              }
            }
          }
        }
      }
    ],
    "examples": [
      {
        "name": "Create Delivery Example",
        "endpoint": "/deliveries",
        "method": "POST",
        "request": {
          "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
          "trip_id": "550e8400-e29b-41d4-a716-446655440001",
          "value": 150.00
        },
        "response": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "status": "created",
          "created_at": "2024-01-15T12:30:00Z"
        }
      }
    ]
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/developer-portal/testing-tool?service=delivery-service&endpoint=/deliveries"
```

### 8. Get Developer Statistics
**GET** `/developer-portal/statistics`

Retrieves developer portal usage statistics.

**Query Parameters:**
- `account_id` (string, optional): Filter by developer account
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_developers": 10000,
    "active_developers": 8000,
    "total_api_keys": 25000,
    "total_requests": 10000000,
    "success_rate": 0.95
  },
  "developer_breakdown": [
    {
      "country": "CA",
      "developers": 3000,
      "api_keys": 7500,
      "requests": 3000000
    },
    {
      "country": "US",
      "developers": 4000,
      "api_keys": 10000,
      "requests": 4000000
    }
  ],
  "language_breakdown": [
    {
      "language": "javascript",
      "developers": 4000,
      "api_keys": 10000,
      "requests": 4000000
    },
    {
      "language": "python",
      "developers": 3000,
      "api_keys": 7500,
      "requests": 3000000
    }
  ],
  "use_case_breakdown": [
    {
      "use_case": "E-commerce delivery tracking",
      "developers": 4000,
      "api_keys": 10000,
      "requests": 4000000
    },
    {
      "use_case": "Logistics management",
      "developers": 3000,
      "api_keys": 7500,
      "requests": 3000000
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "new_developers": 50,
      "new_api_keys": 100,
      "total_requests": 100000
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/developer-portal/statistics?account_id=dev_123456789&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

## Database Tables

### developer_accounts
Developer account information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| account_id | text | Account identifier |
| email | text | Developer email |
| name | text | Developer name |
| company | text | Company name |
| website | text | Company website |
| description | text | Project description |
| use_case | text | Use case description |
| expected_volume | text | Expected API volume |
| country | text | Country code |
| timezone | text | Timezone |
| preferred_language | text | Preferred language |
| marketing_consent | boolean | Marketing consent |
| terms_accepted | boolean | Terms acceptance |
| privacy_accepted | boolean | Privacy acceptance |
| status | text | Account status |
| verification_token | text | Verification token |
| created_at | timestamptz | Creation timestamp |
| verified_at | timestamptz | Verification timestamp |
| last_login | timestamptz | Last login timestamp |

### api_keys
API key management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| key_id | text | Key identifier |
| account_id | uuid | Reference to developer_accounts |
| api_key | text | API key value |
| name | text | Key name |
| description | text | Key description |
| permissions | text[] | Key permissions |
| rate_limit | jsonb | Rate limiting configuration |
| allowed_ips | text[] | Allowed IP addresses |
| expires_at | timestamptz | Expiration timestamp |
| status | text | Key status |
| created_at | timestamptz | Creation timestamp |
| last_used | timestamptz | Last usage timestamp |

### sdk_libraries
SDK and library information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| library_id | text | Library identifier |
| name | text | Library name |
| language | text | Programming language |
| platform | text | Platform |
| version | text | Library version |
| description | text | Library description |
| repository | text | Repository URL |
| package_manager | text | Package manager |
| package_name | text | Package name |
| install_command | text | Install command |
| documentation_url | text | Documentation URL |
| examples_url | text | Examples URL |
| status | text | Library status |
| features | text[] | Library features |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### developer_resources
Developer resources and guides.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| resource_id | text | Resource identifier |
| title | text | Resource title |
| description | text | Resource description |
| category | text | Resource category |
| type | text | Resource type |
| language | text | Resource language |
| content | text | Resource content |
| url | text | Resource URL |
| tags | text[] | Resource tags |
| difficulty | text | Difficulty level |
| estimated_time | text | Estimated time |
| author | text | Resource author |
| views | integer | View count |
| rating | decimal | Average rating |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Developer Onboarding
- Account creation
- Email verification
- Profile setup
- Welcome experience

### 2. API Key Management
- Key generation
- Permission management
- Rate limiting
- Usage tracking

### 3. SDK and Libraries
- Multi-language support
- Version management
- Documentation
- Examples

### 4. Developer Resources
- Tutorials and guides
- Best practices
- Code examples
- Community resources

## Security Considerations

- Account verification
- API key security
- Rate limiting
- Access control

## Integration Points

- **Authentication Service**: Developer authentication
- **API Documentation Service**: Documentation display
- **All Services**: API access
- **Analytics Service**: Usage tracking

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_account_data",
  "message": "Invalid account data",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}
```

**404 Not Found:**
```json
{
  "error": "account_not_found",
  "message": "Developer account not found",
  "details": {
    "account_id": "dev_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Account validation failed",
  "details": {
    "issues": [
      "Missing required field: name",
      "Invalid country code"
    ]
  }
}
```

## Rate Limiting

- Account creation: 10 per hour per IP
- API key creation: 5 per hour per account
- Resource access: 1000 per hour per account
- Statistics queries: 100 per hour per account

## Developer Portal Features

### 1. Account Management
- Registration
- Verification
- Profile management
- Settings

### 2. API Access
- Key generation
- Permission management
- Usage tracking
- Rate limiting

### 3. Development Tools
- API testing
- Code generation
- SDK management
- Documentation

### 4. Resources
- Tutorials
- Guides
- Examples
- Community