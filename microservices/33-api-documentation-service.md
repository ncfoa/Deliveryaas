# API Documentation Service

## Overview
The API Documentation Service manages API documentation, OpenAPI specifications, and developer resources. It provides comprehensive API documentation and interactive testing tools.

## Purpose
- API documentation management
- OpenAPI specification generation
- Developer portal
- API testing tools

## Data Ownership
- `api_docs` - API documentation content
- `api_specifications` - OpenAPI specifications
- `api_examples` - API usage examples
- `api_versions` - API version management

## API Endpoints

### 1. Get API Documentation
**GET** `/api-docs`

Retrieves API documentation for a specific service or endpoint.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `version` (string, optional): Filter by API version
- `endpoint` (string, optional): Filter by endpoint
- `format` (string, optional): Response format (html, json, yaml)

**Response:**
```json
{
  "service": "delivery-service",
  "version": "v1.2.3",
  "title": "Delivery Service API",
  "description": "API for managing deliveries and shipments",
  "base_url": "https://api.delivery.com/v1",
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
          "description": "Unique delivery identifier"
        },
        {
          "name": "trip_id",
          "type": "string",
          "required": true,
          "description": "Trip identifier"
        },
        {
          "name": "value",
          "type": "number",
          "required": true,
          "description": "Delivery value"
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
        },
        "400": {
          "description": "Bad request",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "description": "Error code"
                  },
                  "message": {
                    "type": "string",
                    "description": "Error message"
                  }
                }
              }
            }
          }
        }
      },
      "examples": [
        {
          "name": "Create Delivery Example",
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
  ],
  "schemas": {
    "Delivery": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Delivery ID"
        },
        "status": {
          "type": "string",
          "enum": ["created", "in_progress", "completed", "cancelled"],
          "description": "Delivery status"
        },
        "created_at": {
          "type": "string",
          "format": "date-time",
          "description": "Creation timestamp"
        }
      }
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/api-docs?service=delivery-service&version=v1.2.3&format=json"
```

### 2. Get OpenAPI Specification
**GET** `/api-docs/openapi`

Retrieves OpenAPI specification for a service.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `version` (string, optional): Filter by API version
- `format` (string, optional): Response format (json, yaml)

**Response:**
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Delivery Service API",
    "description": "API for managing deliveries and shipments",
    "version": "v1.2.3",
    "contact": {
      "name": "API Support",
      "email": "api-support@delivery.com"
    }
  },
  "servers": [
    {
      "url": "https://api.delivery.com/v1",
      "description": "Production server"
    }
  ],
  "paths": {
    "/deliveries": {
      "post": {
        "summary": "Create Delivery",
        "description": "Creates a new delivery request",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateDeliveryRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Delivery created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Delivery"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "CreateDeliveryRequest": {
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
      "Delivery": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Delivery ID"
          },
          "status": {
            "type": "string",
            "enum": ["created", "in_progress", "completed", "cancelled"],
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
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/api-docs/openapi?service=delivery-service&version=v1.2.3&format=json"
```

### 3. Create API Documentation
**POST** `/api-docs`

Creates new API documentation.

**Request Body:**
```json
{
  "service": "delivery-service",
  "version": "v1.2.3",
  "title": "Delivery Service API",
  "description": "API for managing deliveries and shipments",
  "base_url": "https://api.delivery.com/v1",
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
          "description": "Unique delivery identifier"
        }
      ],
      "request_body": {
        "type": "object",
        "properties": {
          "delivery_id": {
            "type": "string",
            "description": "Unique delivery identifier"
          }
        },
        "required": ["delivery_id"]
      },
      "responses": {
        "200": {
          "description": "Delivery created successfully"
        }
      }
    }
  ],
  "schemas": {
    "Delivery": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Delivery ID"
        }
      }
    }
  },
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "doc_id": "doc_123456789",
  "service": "delivery-service",
  "version": "v1.2.3",
  "title": "Delivery Service API",
  "description": "API for managing deliveries and shipments",
  "base_url": "https://api.delivery.com/v1",
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
          "description": "Unique delivery identifier"
        }
      ],
      "request_body": {
        "type": "object",
        "properties": {
          "delivery_id": {
            "type": "string",
            "description": "Unique delivery identifier"
          }
        },
        "required": ["delivery_id"]
      },
      "responses": {
        "200": {
          "description": "Delivery created successfully"
        }
      }
    }
  ],
  "schemas": {
    "Delivery": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Delivery ID"
        }
      }
    }
  },
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/api-docs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "service": "delivery-service",
    "version": "v1.2.3",
    "title": "Delivery Service API",
    "description": "API for managing deliveries and shipments",
    "base_url": "https://api.delivery.com/v1",
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
            "description": "Unique delivery identifier"
          }
        ],
        "request_body": {
          "type": "object",
          "properties": {
            "delivery_id": {
              "type": "string",
              "description": "Unique delivery identifier"
            }
          },
          "required": ["delivery_id"]
        },
        "responses": {
          "200": {
            "description": "Delivery created successfully"
          }
        }
      }
    ],
    "schemas": {
      "Delivery": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Delivery ID"
          }
        }
      }
    },
    "created_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 4. Update API Documentation
**PUT** `/api-docs/{doc_id}`

Updates existing API documentation.

**Path Parameters:**
- `doc_id` (string, required): Documentation UUID

**Request Body:**
```json
{
  "title": "Updated Delivery Service API",
  "description": "Updated API for managing deliveries and shipments",
  "base_url": "https://api.delivery.com/v1",
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
          "description": "Unique delivery identifier"
        }
      ],
      "request_body": {
        "type": "object",
        "properties": {
          "delivery_id": {
            "type": "string",
            "description": "Unique delivery identifier"
          }
        },
        "required": ["delivery_id"]
      },
      "responses": {
        "200": {
          "description": "Delivery created successfully"
        }
      }
    }
  ],
  "schemas": {
    "Delivery": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Delivery ID"
        }
      }
    }
  },
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "doc_id": "doc_123456789",
  "service": "delivery-service",
  "version": "v1.2.3",
  "title": "Updated Delivery Service API",
  "description": "Updated API for managing deliveries and shipments",
  "base_url": "https://api.delivery.com/v1",
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
          "description": "Unique delivery identifier"
        }
      ],
      "request_body": {
        "type": "object",
        "properties": {
          "delivery_id": {
            "type": "string",
            "description": "Unique delivery identifier"
          }
        },
        "required": ["delivery_id"]
      },
      "responses": {
        "200": {
          "description": "Delivery created successfully"
        }
      }
    }
  ],
  "schemas": {
    "Delivery": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Delivery ID"
        }
      }
    }
  },
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/api-docs/doc_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "title": "Updated Delivery Service API",
    "description": "Updated API for managing deliveries and shipments",
    "base_url": "https://api.delivery.com/v1",
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
            "description": "Unique delivery identifier"
          }
        ],
        "request_body": {
          "type": "object",
          "properties": {
            "delivery_id": {
              "type": "string",
              "description": "Unique delivery identifier"
            }
          },
          "required": ["delivery_id"]
        },
        "responses": {
          "200": {
            "description": "Delivery created successfully"
          }
        }
      }
    ],
    "schemas": {
      "Delivery": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Delivery ID"
          }
        }
      }
    },
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 5. Get API Examples
**GET** `/api-docs/examples`

Retrieves API usage examples.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `endpoint` (string, optional): Filter by endpoint
- `language` (string, optional): Filter by programming language
- `limit` (integer, optional): Number of examples (default: 50)
- `offset` (integer, optional): Number of examples to skip (default: 0)

**Response:**
```json
{
  "examples": [
    {
      "example_id": "example_123456789",
      "service": "delivery-service",
      "endpoint": "/deliveries",
      "method": "POST",
      "language": "javascript",
      "title": "Create Delivery with JavaScript",
      "description": "Example of creating a delivery using JavaScript fetch API",
      "code": "const response = await fetch('https://api.delivery.com/v1/deliveries', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    'Authorization': 'Bearer your_token_here'\n  },\n  body: JSON.stringify({\n    delivery_id: '550e8400-e29b-41d4-a716-446655440000',\n    trip_id: '550e8400-e29b-41d4-a716-446655440001',\n    value: 150.00\n  })\n});\n\nconst delivery = await response.json();\nconsole.log(delivery);",
      "output": "{\n  \"id\": \"550e8400-e29b-41d4-a716-446655440000\",\n  \"status\": \"created\",\n  \"created_at\": \"2024-01-15T12:30:00Z\"\n}",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "service": "delivery-service",
    "endpoint": "/deliveries",
    "language": "javascript"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/api-docs/examples?service=delivery-service&endpoint=/deliveries&language=javascript&limit=50&offset=0"
```

### 6. Create API Example
**POST** `/api-docs/examples`

Creates a new API usage example.

**Request Body:**
```json
{
  "service": "delivery-service",
  "endpoint": "/deliveries",
  "method": "POST",
  "language": "python",
  "title": "Create Delivery with Python",
  "description": "Example of creating a delivery using Python requests library",
  "code": "import requests\n\nurl = 'https://api.delivery.com/v1/deliveries'\nheaders = {\n    'Content-Type': 'application/json',\n    'Authorization': 'Bearer your_token_here'\n}\ndata = {\n    'delivery_id': '550e8400-e29b-41d4-a716-446655440000',\n    'trip_id': '550e8400-e29b-41d4-a716-446655440001',\n    'value': 150.00\n}\n\nresponse = requests.post(url, headers=headers, json=data)\ndelivery = response.json()\nprint(delivery)",
  "output": "{\n  \"id\": \"550e8400-e29b-41d4-a716-446655440000\",\n  \"status\": \"created\",\n  \"created_at\": \"2024-01-15T12:30:00Z\"\n}",
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "example_id": "example_123456789",
  "service": "delivery-service",
  "endpoint": "/deliveries",
  "method": "POST",
  "language": "python",
  "title": "Create Delivery with Python",
  "description": "Example of creating a delivery using Python requests library",
  "code": "import requests\n\nurl = 'https://api.delivery.com/v1/deliveries'\nheaders = {\n    'Content-Type': 'application/json',\n    'Authorization': 'Bearer your_token_here'\n}\ndata = {\n    'delivery_id': '550e8400-e29b-41d4-a716-446655440000',\n    'trip_id': '550e8400-e29b-41d4-a716-446655440001',\n    'value': 150.00\n}\n\nresponse = requests.post(url, headers=headers, json=data)\ndelivery = response.json()\nprint(delivery)",
  "output": "{\n  \"id\": \"550e8400-e29b-41d4-a716-446655440000\",\n  \"status\": \"created\",\n  \"created_at\": \"2024-01-15T12:30:00Z\"\n}",
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/api-docs/examples \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "service": "delivery-service",
    "endpoint": "/deliveries",
    "method": "POST",
    "language": "python",
    "title": "Create Delivery with Python",
    "description": "Example of creating a delivery using Python requests library",
    "code": "import requests\n\nurl = \"https://api.delivery.com/v1/deliveries\"\nheaders = {\n    \"Content-Type\": \"application/json\",\n    \"Authorization\": \"Bearer your_token_here\"\n}\ndata = {\n    \"delivery_id\": \"550e8400-e29b-41d4-a716-446655440000\",\n    \"trip_id\": \"550e8400-e29b-41d4-a716-446655440001\",\n    \"value\": 150.00\n}\n\nresponse = requests.post(url, headers=headers, json=data)\ndelivery = response.json()\nprint(delivery)",
    "output": "{\n  \"id\": \"550e8400-e29b-41d4-a716-446655440000\",\n  \"status\": \"created\",\n  \"created_at\": \"2024-01-15T12:30:00Z\"\n}",
    "created_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 7. Get API Versions
**GET** `/api-docs/versions`

Retrieves available API versions.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `status` (string, optional): Filter by version status

**Response:**
```json
{
  "versions": [
    {
      "version": "v1.2.3",
      "service": "delivery-service",
      "status": "current",
      "release_date": "2024-01-15T00:00:00Z",
      "deprecation_date": null,
      "end_of_life_date": null,
      "changelog": "Added new delivery status tracking features",
      "breaking_changes": false,
      "migration_guide": "https://docs.delivery.com/migration/v1.2.3"
    },
    {
      "version": "v1.1.0",
      "service": "delivery-service",
      "status": "deprecated",
      "release_date": "2023-12-01T00:00:00Z",
      "deprecation_date": "2024-06-01T00:00:00Z",
      "end_of_life_date": "2024-12-01T00:00:00Z",
      "changelog": "Added delivery tracking improvements",
      "breaking_changes": false,
      "migration_guide": "https://docs.delivery.com/migration/v1.1.0"
    }
  ],
  "total": 2,
  "filters": {
    "service": "delivery-service",
    "status": "current"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/api-docs/versions?service=delivery-service&status=current"
```

### 8. Get API Documentation Statistics
**GET** `/api-docs/statistics`

Retrieves API documentation usage statistics.

**Query Parameters:**
- `service` (string, optional): Filter by service
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_docs": 100,
    "total_examples": 500,
    "total_views": 1000000,
    "total_downloads": 50000,
    "average_rating": 4.5
  },
  "service_breakdown": [
    {
      "service": "delivery-service",
      "docs": 20,
      "examples": 100,
      "views": 400000,
      "downloads": 20000,
      "rating": 4.6
    },
    {
      "service": "payment-service",
      "docs": 15,
      "examples": 75,
      "views": 300000,
      "downloads": 15000,
      "rating": 4.4
    }
  ],
  "popular_endpoints": [
    {
      "endpoint": "/deliveries",
      "method": "POST",
      "views": 100000,
      "examples": 25,
      "rating": 4.7
    },
    {
      "endpoint": "/payments",
      "method": "POST",
      "views": 80000,
      "examples": 20,
      "rating": 4.5
    }
  ],
  "language_breakdown": [
    {
      "language": "javascript",
      "examples": 200,
      "views": 400000,
      "rating": 4.6
    },
    {
      "language": "python",
      "examples": 150,
      "views": 300000,
      "rating": 4.5
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/api-docs/statistics?service=delivery-service&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

## Database Tables

### api_docs
API documentation content.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| doc_id | text | Documentation identifier |
| service | text | Service name |
| version | text | API version |
| title | text | Documentation title |
| description | text | Documentation description |
| base_url | text | Base URL |
| endpoints | jsonb | API endpoints |
| schemas | jsonb | Data schemas |
| status | text | Documentation status |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |
| updated_by | uuid | Last updater user ID |
| updated_at | timestamptz | Last update timestamp |

### api_specifications
OpenAPI specifications.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| spec_id | text | Specification identifier |
| service | text | Service name |
| version | text | API version |
| openapi_version | text | OpenAPI version |
| specification | jsonb | OpenAPI specification |
| status | text | Specification status |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |
| updated_by | uuid | Last updater user ID |
| updated_at | timestamptz | Last update timestamp |

### api_examples
API usage examples.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| example_id | text | Example identifier |
| service | text | Service name |
| endpoint | text | API endpoint |
| method | text | HTTP method |
| language | text | Programming language |
| title | text | Example title |
| description | text | Example description |
| code | text | Example code |
| output | text | Example output |
| status | text | Example status |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### api_versions
API version management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| version | text | API version |
| service | text | Service name |
| status | text | Version status |
| release_date | timestamptz | Release date |
| deprecation_date | timestamptz | Deprecation date |
| end_of_life_date | timestamptz | End of life date |
| changelog | text | Changelog |
| breaking_changes | boolean | Breaking changes flag |
| migration_guide | text | Migration guide URL |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Documentation Management
- API documentation creation
- Version management
- Content updates
- Status tracking

### 2. OpenAPI Support
- Specification generation
- Schema validation
- Interactive documentation
- Code generation

### 3. Developer Resources
- Usage examples
- Code samples
- Migration guides
- Best practices

### 4. Analytics
- Usage tracking
- Popular endpoints
- Language preferences
- Performance metrics

## Security Considerations

- Access control
- Content validation
- Rate limiting
- Data privacy

## Integration Points

- **All Services**: API documentation
- **Developer Portal**: Documentation display
- **Code Generation**: API clients
- **Testing Tools**: API validation

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_documentation",
  "message": "Invalid documentation format",
  "details": {
    "field": "endpoints",
    "issue": "Endpoints must be an array"
  }
}
```

**404 Not Found:**
```json
{
  "error": "documentation_not_found",
  "message": "API documentation not found",
  "details": {
    "doc_id": "doc_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Documentation validation failed",
  "details": {
    "issues": [
      "Missing required field: title",
      "Invalid endpoint format"
    ]
  }
}
```

## Rate Limiting

- Documentation creation: 100 per hour per user
- Documentation updates: 200 per hour per user
- Example creation: 50 per hour per user
- Statistics queries: 100 per hour per user

## API Documentation Features

### 1. Documentation Types
- REST API
- GraphQL
- WebSocket
- gRPC

### 2. Formats
- OpenAPI 3.0
- Swagger 2.0
- RAML
- API Blueprint

### 3. Programming Languages
- JavaScript
- Python
- Java
- C#
- Go
- PHP
- Ruby

### 4. Features
- Interactive testing
- Code generation
- Schema validation
- Version management