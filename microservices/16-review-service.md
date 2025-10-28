# Review Service

## Overview
The Review Service manages user reviews, ratings, and feedback for deliveries, couriers, and travelers. It handles review creation, moderation, and analytics.

## Purpose
- Review and rating management
- Feedback collection
- Review moderation
- Rating analytics

## Data Ownership
- `reviews` - Review records
- `review_ratings` - Rating details
- `review_moderation` - Moderation records
- `review_analytics` - Review statistics

## API Endpoints

### 1. Create Review
**POST** `/reviews/create`

Creates a new review for a delivery.

**Request Body:**
```json
{
  "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
  "reviewer_id": "550e8400-e29b-41d4-a716-446655440001",
  "reviewee_id": "550e8400-e29b-41d4-a716-446655440002",
  "review_type": "courier",
  "rating": 5,
  "title": "Excellent delivery service!",
  "content": "The courier was very professional and delivered my package on time. Highly recommended!",
  "categories": {
    "punctuality": 5,
    "communication": 5,
    "care": 5,
    "professionalism": 5
  },
  "tags": ["on_time", "professional", "friendly"],
  "is_anonymous": false
}
```

**Response:**
```json
{
  "id": "uuid",
  "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
  "reviewer_id": "550e8400-e29b-41d4-a716-446655440001",
  "reviewee_id": "550e8400-e29b-41d4-a716-446655440002",
  "review_type": "courier",
  "rating": 5,
  "title": "Excellent delivery service!",
  "content": "The courier was very professional and delivered my package on time. Highly recommended!",
  "categories": {
    "punctuality": 5,
    "communication": 5,
    "care": 5,
    "professionalism": 5
  },
  "tags": ["on_time", "professional", "friendly"],
  "is_anonymous": false,
  "status": "published",
  "helpful_votes": 0,
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/reviews/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "reviewer_id": "550e8400-e29b-41d4-a716-446655440001",
    "reviewee_id": "550e8400-e29b-41d4-a716-446655440002",
    "review_type": "courier",
    "rating": 5,
    "title": "Excellent delivery service!",
    "content": "The courier was very professional and delivered my package on time. Highly recommended!",
    "categories": {
      "punctuality": 5,
      "communication": 5,
      "care": 5,
      "professionalism": 5
    },
    "tags": ["on_time", "professional", "friendly"],
    "is_anonymous": false
  }'
```

### 2. Get Review
**GET** `/reviews/{id}`

Retrieves a specific review.

**Path Parameters:**
- `id` (string, required): Review UUID

**Response:**
```json
{
  "id": "uuid",
  "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
  "reviewer_id": "550e8400-e29b-41d4-a716-446655440001",
  "reviewee_id": "550e8400-e29b-41d4-a716-446655440002",
  "review_type": "courier",
  "rating": 5,
  "title": "Excellent delivery service!",
  "content": "The courier was very professional and delivered my package on time. Highly recommended!",
  "categories": {
    "punctuality": 5,
    "communication": 5,
    "care": 5,
    "professionalism": 5
  },
  "tags": ["on_time", "professional", "friendly"],
  "is_anonymous": false,
  "status": "published",
  "helpful_votes": 3,
  "reviewer": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "John Doe",
    "avatar_url": "https://storage.delivery.com/avatars/john_doe.jpg"
  },
  "reviewee": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Jane Smith",
    "avatar_url": "https://storage.delivery.com/avatars/jane_smith.jpg"
  },
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/reviews/550e8400-e29b-41d4-a716-446655440000
```

### 3. Get Reviews for User
**GET** `/reviews/user/{id}`

Retrieves reviews for a specific user.

**Path Parameters:**
- `id` (string, required): User UUID

**Query Parameters:**
- `review_type` (string, optional): Filter by review type
- `rating` (integer, optional): Filter by rating
- `status` (string, optional): Filter by review status
- `limit` (integer, optional): Number of reviews to return (default: 20)
- `offset` (integer, optional): Number of reviews to skip (default: 0)

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "reviews": [
    {
      "id": "uuid",
      "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
      "reviewer_id": "550e8400-e29b-41d4-a716-446655440002",
      "reviewee_id": "550e8400-e29b-41d4-a716-446655440000",
      "review_type": "courier",
      "rating": 5,
      "title": "Excellent delivery service!",
      "content": "The courier was very professional and delivered my package on time. Highly recommended!",
      "categories": {
        "punctuality": 5,
        "communication": 5,
        "care": 5,
        "professionalism": 5
      },
      "tags": ["on_time", "professional", "friendly"],
      "is_anonymous": false,
      "status": "published",
      "helpful_votes": 3,
      "reviewer": {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "name": "John Doe",
        "avatar_url": "https://storage.delivery.com/avatars/john_doe.jpg"
      },
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0,
  "summary": {
    "average_rating": 4.8,
    "total_reviews": 25,
    "rating_distribution": {
      "5": 20,
      "4": 3,
      "3": 1,
      "2": 1,
      "1": 0
    }
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/reviews/user/550e8400-e29b-41d4-a716-446655440000?review_type=courier&limit=10"
```

### 4. Update Review
**PUT** `/reviews/{id}`

Updates an existing review.

**Path Parameters:**
- `id` (string, required): Review UUID

**Request Body:**
```json
{
  "rating": 4,
  "title": "Good delivery service",
  "content": "The courier was professional and delivered my package on time. Minor delay but overall good service.",
  "categories": {
    "punctuality": 4,
    "communication": 5,
    "care": 5,
    "professionalism": 5
  },
  "tags": ["professional", "friendly", "minor_delay"]
}
```

**Response:**
```json
{
  "id": "uuid",
  "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
  "reviewer_id": "550e8400-e29b-41d4-a716-446655440001",
  "reviewee_id": "550e8400-e29b-41d4-a716-446655440002",
  "review_type": "courier",
  "rating": 4,
  "title": "Good delivery service",
  "content": "The courier was professional and delivered my package on time. Minor delay but overall good service.",
  "categories": {
    "punctuality": 4,
    "communication": 5,
    "care": 5,
    "professionalism": 5
  },
  "tags": ["professional", "friendly", "minor_delay"],
  "is_anonymous": false,
  "status": "published",
  "helpful_votes": 3,
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/reviews/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "rating": 4,
    "title": "Good delivery service",
    "content": "The courier was professional and delivered my package on time. Minor delay but overall good service.",
    "categories": {
      "punctuality": 4,
      "communication": 5,
      "care": 5,
      "professionalism": 5
    },
    "tags": ["professional", "friendly", "minor_delay"]
  }'
```

### 5. Vote on Review
**POST** `/reviews/{id}/vote`

Votes on a review (helpful/not helpful).

**Path Parameters:**
- `id` (string, required): Review UUID

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "vote_type": "helpful",
  "action": "add"
}
```

**Response:**
```json
{
  "review_id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "vote_type": "helpful",
  "action": "add",
  "total_helpful_votes": 4,
  "total_not_helpful_votes": 1,
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/reviews/550e8400-e29b-41d4-a716-446655440000/vote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "vote_type": "helpful",
    "action": "add"
  }'
```

### 6. Report Review
**POST** `/reviews/{id}/report`

Reports a review for moderation.

**Path Parameters:**
- `id` (string, required): Review UUID

**Request Body:**
```json
{
  "reporter_id": "550e8400-e29b-41d4-a716-446655440000",
  "reason": "inappropriate_content",
  "description": "The review contains offensive language",
  "evidence": {
    "screenshot_url": "https://storage.delivery.com/reports/screenshot.jpg"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "review_id": "550e8400-e29b-41d4-a716-446655440000",
  "reporter_id": "550e8400-e29b-41d4-a716-446655440000",
  "reason": "inappropriate_content",
  "description": "The review contains offensive language",
  "evidence": {
    "screenshot_url": "https://storage.delivery.com/reports/screenshot.jpg"
  },
  "status": "pending",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/reviews/550e8400-e29b-41d4-a716-446655440000/report \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "reporter_id": "550e8400-e29b-41d4-a716-446655440000",
    "reason": "inappropriate_content",
    "description": "The review contains offensive language",
    "evidence": {
      "screenshot_url": "https://storage.delivery.com/reports/screenshot.jpg"
    }
  }'
```

### 7. Get Review Analytics
**GET** `/reviews/analytics`

Retrieves review analytics for a user or delivery.

**Query Parameters:**
- `user_id` (string, optional): User UUID for user analytics
- `delivery_id` (string, optional): Delivery UUID for delivery analytics
- `period` (string, optional): Time period (daily, weekly, monthly, yearly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "period": "monthly",
  "total_reviews": 25,
  "average_rating": 4.8,
  "rating_distribution": {
    "5": 20,
    "4": 3,
    "3": 1,
    "2": 1,
    "1": 0
  },
  "category_ratings": {
    "punctuality": 4.7,
    "communication": 4.9,
    "care": 4.8,
    "professionalism": 4.9
  },
  "tag_frequency": {
    "on_time": 18,
    "professional": 22,
    "friendly": 20,
    "minor_delay": 3
  },
  "review_trends": {
    "positive_trend": 0.15,
    "rating_improvement": 0.2,
    "review_volume_change": 0.25
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/reviews/analytics?user_id=550e8400-e29b-41d4-a716-446655440000&period=monthly"
```

### 8. Moderate Review
**PUT** `/reviews/{id}/moderate`

Moderates a review (approve, reject, flag).

**Path Parameters:**
- `id` (string, required): Review UUID

**Request Body:**
```json
{
  "moderator_id": "550e8400-e29b-41d4-a716-446655440003",
  "action": "approve",
  "reason": "Review meets community guidelines",
  "notes": "No issues found with this review"
}
```

**Response:**
```json
{
  "id": "uuid",
  "review_id": "550e8400-e29b-41d4-a716-446655440000",
  "moderator_id": "550e8400-e29b-41d4-a716-446655440003",
  "action": "approve",
  "reason": "Review meets community guidelines",
  "notes": "No issues found with this review",
  "moderated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/reviews/550e8400-e29b-41d4-a716-446655440000/moderate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "moderator_id": "550e8400-e29b-41d4-a716-446655440003",
    "action": "approve",
    "reason": "Review meets community guidelines",
    "notes": "No issues found with this review"
  }'
```

## Database Tables

### reviews
Review records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| delivery_id | uuid | Foreign key to deliveries table |
| reviewer_id | uuid | Foreign key to users table |
| reviewee_id | uuid | Foreign key to users table |
| review_type | text | Type of review |
| rating | integer | Overall rating (1-5) |
| title | text | Review title |
| content | text | Review content |
| categories | jsonb | Category ratings |
| tags | text[] | Review tags |
| is_anonymous | boolean | Anonymous review flag |
| status | text | Review status |
| helpful_votes | integer | Helpful vote count |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### review_ratings
Rating details.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| review_id | uuid | Foreign key to reviews table |
| category | text | Rating category |
| rating | integer | Category rating (1-5) |
| weight | decimal | Category weight |
| created_at | timestamptz | Creation timestamp |

### review_moderation
Moderation records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| review_id | uuid | Foreign key to reviews table |
| moderator_id | uuid | Foreign key to users table |
| action | text | Moderation action |
| reason | text | Moderation reason |
| notes | text | Moderator notes |
| moderated_at | timestamptz | Moderation timestamp |
| created_at | timestamptz | Creation timestamp |

### review_analytics
Review statistics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| period | text | Analytics period |
| total_reviews | integer | Total review count |
| average_rating | decimal | Average rating |
| rating_distribution | jsonb | Rating distribution |
| category_ratings | jsonb | Category ratings |
| tag_frequency | jsonb | Tag frequency |
| review_trends | jsonb | Review trends |
| generated_at | timestamptz | Generation timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Review Management
- Review creation and editing
- Rating system
- Category ratings
- Tag system

### 2. Moderation
- Content moderation
- Automated filtering
- Manual review
- Community reporting

### 3. Analytics
- Rating analytics
- Review trends
- Performance metrics
- User insights

### 4. Community Features
- Helpful voting
- Review reporting
- Anonymous reviews
- Review responses

## Security Considerations

- Review content is moderated
- User privacy protected
- Spam prevention
- Content filtering

## Integration Points

- **User Service**: User verification
- **Delivery Service**: Delivery context
- **Moderation Service**: Content moderation
- **Analytics Service**: Review analytics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_review_data",
  "message": "Invalid review data provided",
  "details": {
    "field": "rating",
    "issue": "Rating must be between 1 and 5"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "review_not_editable",
  "message": "Review cannot be edited after 24 hours"
}
```

**404 Not Found:**
```json
{
  "error": "review_not_found",
  "message": "Review not found"
}
```

**409 Conflict:**
```json
{
  "error": "review_already_exists",
  "message": "Review already exists for this delivery"
}
```

## Rate Limiting

- Review creation: 10 per hour per user
- Review updates: 5 per hour per user
- Review voting: 50 per hour per user
- Review reporting: 20 per hour per user

## Review Types

### 1. Courier Reviews
- Delivery performance
- Communication quality
- Professionalism
- Care handling

### 2. Traveler Reviews
- Trip experience
- Package handling
- Communication
- Reliability

### 3. Delivery Reviews
- Overall experience
- Service quality
- Value for money
- Recommendation

### 4. System Reviews
- Platform experience
- Customer service
- App functionality
- Overall satisfaction