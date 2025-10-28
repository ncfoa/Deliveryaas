# Search Service

## Overview
The Search Service provides advanced search capabilities across the platform using Elasticsearch. It handles full-text search, filtering, faceting, and search analytics.

## Purpose
- Full-text search across platform
- Advanced filtering and faceting
- Search analytics and insights
- Search performance optimization

## Data Ownership
- `search_indexes` - Search index configurations
- `search_queries` - Search query logs
- `search_analytics` - Search performance metrics
- `search_suggestions` - Search suggestions and autocomplete

## API Endpoints

### 1. Search
**POST** `/search`

Performs a comprehensive search across the platform.

**Request Body:**
```json
{
  "query": "delivery from Toronto to Vancouver",
  "filters": {
    "delivery_type": "standard",
    "status": "available",
    "price_range": {
      "min": 50,
      "max": 200
    },
    "date_range": {
      "start": "2024-01-20T00:00:00Z",
      "end": "2024-01-25T23:59:59Z"
    },
    "origin": {
      "city": "Toronto",
      "country": "CA"
    },
    "destination": {
      "city": "Vancouver",
      "country": "CA"
    }
  },
  "facets": ["delivery_type", "price_range", "origin", "destination"],
  "sort": {
    "field": "price",
    "order": "asc"
  },
  "pagination": {
    "page": 1,
    "size": 20
  },
  "highlight": true,
  "include_suggestions": true
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "type": "delivery",
      "title": "Delivery from Toronto to Vancouver",
      "description": "Standard delivery service from Toronto to Vancouver",
      "price": 150.00,
      "currency": "CAD",
      "delivery_type": "standard",
      "status": "available",
      "origin": {
        "city": "Toronto",
        "country": "CA",
        "coordinates": {
          "latitude": 43.6532,
          "longitude": -79.3832
        }
      },
      "destination": {
        "city": "Vancouver",
        "country": "CA",
        "coordinates": {
          "latitude": 49.2827,
          "longitude": -123.1207
        }
      },
      "date_range": {
        "start": "2024-01-20T00:00:00Z",
        "end": "2024-01-25T23:59:59Z"
      },
      "score": 0.95,
      "highlights": {
        "title": "Delivery from <em>Toronto</em> to <em>Vancouver</em>",
        "description": "Standard delivery service from <em>Toronto</em> to <em>Vancouver</em>"
      },
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "facets": {
    "delivery_type": [
      {
        "value": "standard",
        "count": 50
      },
      {
        "value": "express",
        "count": 30
      }
    ],
    "price_range": [
      {
        "value": "50-100",
        "count": 20
      },
      {
        "value": "100-200",
        "count": 40
      }
    ],
    "origin": [
      {
        "value": "Toronto",
        "count": 60
      },
      {
        "value": "Montreal",
        "count": 20
      }
    ],
    "destination": [
      {
        "value": "Vancouver",
        "count": 50
      },
      {
        "value": "Calgary",
        "count": 30
      }
    ]
  },
  "suggestions": [
    "delivery from Toronto to Vancouver",
    "delivery from Toronto to Calgary",
    "delivery from Montreal to Vancouver"
  ],
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 80,
    "total_pages": 4
  },
  "search_time": "150ms",
  "query_id": "query_123456789"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "query": "delivery from Toronto to Vancouver",
    "filters": {
      "delivery_type": "standard",
      "status": "available",
      "price_range": {
        "min": 50,
        "max": 200
      },
      "date_range": {
        "start": "2024-01-20T00:00:00Z",
        "end": "2024-01-25T23:59:59Z"
      },
      "origin": {
        "city": "Toronto",
        "country": "CA"
      },
      "destination": {
        "city": "Vancouver",
        "country": "CA"
      }
    },
    "facets": ["delivery_type", "price_range", "origin", "destination"],
    "sort": {
      "field": "price",
      "order": "asc"
    },
    "pagination": {
      "page": 1,
      "size": 20
    },
    "highlight": true,
    "include_suggestions": true
  }'
```

### 2. Get Search Suggestions
**GET** `/search/suggestions`

Retrieves search suggestions and autocomplete options.

**Query Parameters:**
- `query` (string, required): Search query
- `limit` (integer, optional): Number of suggestions (default: 10)
- `types` (string[], optional): Filter by content types

**Response:**
```json
{
  "suggestions": [
    {
      "text": "delivery from Toronto to Vancouver",
      "type": "delivery",
      "score": 0.95,
      "highlight": "delivery from <em>Toronto</em> to <em>Vancouver</em>"
    },
    {
      "text": "delivery from Toronto to Calgary",
      "type": "delivery",
      "score": 0.90,
      "highlight": "delivery from <em>Toronto</em> to <em>Calgary</em>"
    },
    {
      "text": "delivery from Montreal to Vancouver",
      "type": "delivery",
      "score": 0.85,
      "highlight": "delivery from <em>Montreal</em> to <em>Vancouver</em>"
    }
  ],
  "query": "delivery from Toronto to Vancouver",
  "total": 3,
  "search_time": "50ms"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/search/suggestions?query=delivery from Toronto to Vancouver&limit=10&types=delivery"
```

### 3. Get Search Analytics
**GET** `/search/analytics`

Retrieves search performance analytics.

**Query Parameters:**
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `query` (string, optional): Filter by query
- `user_id` (string, optional): Filter by user

**Response:**
```json
{
  "overview": {
    "total_searches": 1000000,
    "unique_users": 50000,
    "average_search_time": "150ms",
    "click_through_rate": 0.25,
    "conversion_rate": 0.15
  },
  "top_queries": [
    {
      "query": "delivery from Toronto to Vancouver",
      "searches": 10000,
      "clicks": 2500,
      "conversions": 1500,
      "average_position": 1.5
    },
    {
      "query": "delivery from Montreal to Toronto",
      "searches": 8000,
      "clicks": 2000,
      "conversions": 1200,
      "average_position": 2.0
    }
  ],
  "search_performance": {
    "fast_searches": 800000,
    "slow_searches": 200000,
    "timeout_searches": 1000,
    "error_searches": 500
  },
  "user_behavior": {
    "average_queries_per_user": 20,
    "average_session_duration": "5 minutes",
    "bounce_rate": 0.30,
    "return_rate": 0.60
  },
  "content_performance": {
    "delivery_searches": 600000,
    "user_searches": 300000,
    "trip_searches": 100000
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/search/analytics?date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&query=delivery from Toronto to Vancouver"
```

### 4. Index Content
**POST** `/search/index`

Indexes content for search.

**Request Body:**
```json
{
  "content_type": "delivery",
  "content_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Delivery from Toronto to Vancouver",
  "description": "Standard delivery service from Toronto to Vancouver",
  "content": "Full content text for indexing",
  "metadata": {
    "price": 150.00,
    "currency": "CAD",
    "delivery_type": "standard",
    "status": "available",
    "origin": {
      "city": "Toronto",
      "country": "CA"
    },
    "destination": {
      "city": "Vancouver",
      "country": "CA"
    },
    "date_range": {
      "start": "2024-01-20T00:00:00Z",
      "end": "2024-01-25T23:59:59Z"
    }
  },
  "tags": ["delivery", "Toronto", "Vancouver", "standard"],
  "indexed_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "content_id": "550e8400-e29b-41d4-a716-446655440000",
  "content_type": "delivery",
  "indexed": true,
  "index_version": "v1.2.3",
  "indexed_at": "2024-01-15T14:30:00Z",
  "indexed_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/search/index \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "content_type": "delivery",
    "content_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Delivery from Toronto to Vancouver",
    "description": "Standard delivery service from Toronto to Vancouver",
    "content": "Full content text for indexing",
    "metadata": {
      "price": 150.00,
      "currency": "CAD",
      "delivery_type": "standard",
      "status": "available",
      "origin": {
        "city": "Toronto",
        "country": "CA"
      },
      "destination": {
        "city": "Vancouver",
        "country": "CA"
      },
      "date_range": {
        "start": "2024-01-20T00:00:00Z",
        "end": "2024-01-25T23:59:59Z"
      }
    },
    "tags": ["delivery", "Toronto", "Vancouver", "standard"],
    "indexed_by": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 5. Update Search Index
**PUT** `/search/index/{content_id}`

Updates indexed content.

**Path Parameters:**
- `content_id` (string, required): Content UUID

**Request Body:**
```json
{
  "title": "Updated Delivery from Toronto to Vancouver",
  "description": "Updated standard delivery service from Toronto to Vancouver",
  "content": "Updated full content text for indexing",
  "metadata": {
    "price": 175.00,
    "currency": "CAD",
    "delivery_type": "standard",
    "status": "available",
    "origin": {
      "city": "Toronto",
      "country": "CA"
    },
    "destination": {
      "city": "Vancouver",
      "country": "CA"
    },
    "date_range": {
      "start": "2024-01-20T00:00:00Z",
      "end": "2024-01-25T23:59:59Z"
    }
  },
  "tags": ["delivery", "Toronto", "Vancouver", "standard", "updated"],
  "updated_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "content_id": "550e8400-e29b-41d4-a716-446655440000",
  "content_type": "delivery",
  "updated": true,
  "index_version": "v1.2.3",
  "updated_at": "2024-01-15T14:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/search/index/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "title": "Updated Delivery from Toronto to Vancouver",
    "description": "Updated standard delivery service from Toronto to Vancouver",
    "content": "Updated full content text for indexing",
    "metadata": {
      "price": 175.00,
      "currency": "CAD",
      "delivery_type": "standard",
      "status": "available",
      "origin": {
        "city": "Toronto",
        "country": "CA"
      },
      "destination": {
        "city": "Vancouver",
        "country": "CA"
      },
      "date_range": {
        "start": "2024-01-20T00:00:00Z",
        "end": "2024-01-25T23:59:59Z"
      }
    },
    "tags": ["delivery", "Toronto", "Vancouver", "standard", "updated"],
    "updated_by": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 6. Delete from Search Index
**DELETE** `/search/index/{content_id}`

Removes content from search index.

**Path Parameters:**
- `content_id` (string, required): Content UUID

**Response:**
```json
{
  "content_id": "550e8400-e29b-41d4-a716-446655440000",
  "content_type": "delivery",
  "deleted": true,
  "deleted_at": "2024-01-15T14:30:00Z",
  "deleted_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/search/index/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer jwt_token_here"
```

### 7. Get Search Index Status
**GET** `/search/index/status`

Retrieves search index status and health.

**Response:**
```json
{
  "status": "healthy",
  "version": "v1.2.3",
  "total_documents": 1000000,
  "index_size_mb": 500,
  "last_updated": "2024-01-15T14:30:00Z",
  "indexes": {
    "delivery": {
      "documents": 600000,
      "size_mb": 300,
      "last_updated": "2024-01-15T14:30:00Z"
    },
    "user": {
      "documents": 300000,
      "size_mb": 150,
      "last_updated": "2024-01-15T14:30:00Z"
    },
    "trip": {
      "documents": 100000,
      "size_mb": 50,
      "last_updated": "2024-01-15T14:30:00Z"
    }
  },
  "performance": {
    "average_search_time": "150ms",
    "p95_search_time": "300ms",
    "p99_search_time": "500ms",
    "error_rate": 0.01
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/search/index/status
```

### 8. Rebuild Search Index
**POST** `/search/index/rebuild`

Rebuilds the entire search index.

**Request Body:**
```json
{
  "content_types": ["delivery", "user", "trip"],
  "force_rebuild": true,
  "rebuild_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "rebuild_id": "rebuild_123456789",
  "content_types": ["delivery", "user", "trip"],
  "status": "started",
  "estimated_duration": "30 minutes",
  "started_at": "2024-01-15T14:30:00Z",
  "started_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/search/index/rebuild \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "content_types": ["delivery", "user", "trip"],
    "force_rebuild": true,
    "rebuild_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

## Database Tables

### search_indexes
Search index configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Index name |
| content_type | text | Content type |
| configuration | jsonb | Index configuration |
| status | text | Index status |
| version | text | Index version |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### search_queries
Search query logs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| query_id | text | Query identifier |
| user_id | uuid | User identifier |
| query | text | Search query |
| filters | jsonb | Applied filters |
| results_count | integer | Number of results |
| search_time | integer | Search time in ms |
| clicked_result | uuid | Clicked result ID |
| converted | boolean | Conversion status |
| timestamp | timestamptz | Query timestamp |
| created_at | timestamptz | Creation timestamp |

### search_analytics
Search performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_value | decimal | Metric value |
| content_type | text | Content type |
| date | date | Metric date |
| hour | integer | Metric hour |
| created_at | timestamptz | Creation timestamp |

### search_suggestions
Search suggestions and autocomplete.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| query | text | Search query |
| suggestion | text | Suggestion text |
| content_type | text | Content type |
| score | decimal | Suggestion score |
| frequency | integer | Suggestion frequency |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

## Key Features

### 1. Full-Text Search
- Elasticsearch integration
- Advanced query syntax
- Fuzzy matching
- Phrase matching

### 2. Filtering & Faceting
- Dynamic filters
- Faceted search
- Range filters
- Date filters

### 3. Search Analytics
- Query performance
- User behavior
- Content performance
- Search insights

### 4. Index Management
- Content indexing
- Index updates
- Index rebuilding
- Health monitoring

## Security Considerations

- Query validation
- Rate limiting
- Access control
- Data privacy

## Integration Points

- **All Services**: Content indexing
- **Analytics Service**: Search metrics
- **User Service**: User search behavior
- **Content Services**: Content updates

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_query",
  "message": "Invalid search query format",
  "details": {
    "field": "query",
    "issue": "Query cannot be empty"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Search validation failed",
  "details": {
    "issues": [
      "Invalid date range format",
      "Unsupported filter type"
    ]
  }
}
```

**500 Internal Server Error:**
```json
{
  "error": "search_error",
  "message": "Search service temporarily unavailable",
  "details": {
    "retry_after": 30
  }
}
```

## Rate Limiting

- Search requests: 1000 per hour per user
- Index operations: 100 per hour per user
- Analytics queries: 50 per hour per user
- Index rebuilds: 1 per day per user

## Search Features

### 1. Query Types
- Full-text search
- Phrase search
- Wildcard search
- Fuzzy search

### 2. Sorting Options
- Relevance
- Price
- Date
- Distance

### 3. Highlighting
- Query highlighting
- Field highlighting
- Custom highlighting
- Snippet generation

### 4. Suggestions
- Autocomplete
- Query suggestions
- Typo correction
- Related queries