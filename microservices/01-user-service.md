# User Service

## Overview
The User Service is responsible for core user account management and profiles. It handles user registration, profile management, user statistics, and settings. This service maintains the primary user data and exposes public profile information while keeping sensitive data secure.

## Purpose
- User registration and profile management
- Public profile data exposure
- User statistics and analytics
- Settings and preferences management

## Data Ownership
- `users` - Core user account records
- `user_profiles` - Public profile information
- `user_stats` - User statistics and metrics
- `user_settings` - User preferences and settings

## API Endpoints

### 1. Create User Account
**POST** `/users`

Creates a new user account in the system.

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone_e164": "+1234567890",
  "alias": "john_doe",
  "language": "en",
  "country_id": "uuid",
  "primary_role": "sender"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "active",
  "primary_role": "sender",
  "email": "user@example.com",
  "email_verified": false,
  "phone_e164": "+1234567890",
  "alias": "john_doe",
  "language": "en",
  "country_id": "uuid",
  "kyc_status": "not_required",
  "reputation_score": 0,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "alias": "john_traveler",
    "language": "en",
    "country_id": "550e8400-e29b-41d4-a716-446655440000",
    "primary_role": "traveller"
  }'
```

### 2. Get User Profile
**GET** `/users/{id}`

Retrieves a user's profile information.

**Path Parameters:**
- `id` (string, required): User UUID

**Response:**
```json
{
  "id": "uuid",
  "status": "active",
  "primary_role": "traveller",
  "alias": "john_traveler",
  "language": "en",
  "country_id": "uuid",
  "kyc_status": "verified",
  "reputation_score": 4.8,
  "profile": {
    "bio": "Experienced traveler",
    "avatar_file_id": "uuid",
    "show_city": true,
    "city_id": "uuid"
  },
  "stats": {
    "trips_completed": 25,
    "packages_carried": 47,
    "on_time_rate": 96.5,
    "avg_rating": 4.8,
    "last_trip_completed_at": "2024-01-10T15:30:00Z"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/users/550e8400-e29b-41d4-a716-446655440000
```

### 3. Update User Profile
**PUT** `/users/{id}`

Updates user profile information.

**Path Parameters:**
- `id` (string, required): User UUID

**Request Body:**
```json
{
  "alias": "john_traveler_updated",
  "language": "fr",
  "country_id": "uuid",
  "profile": {
    "bio": "Updated bio",
    "show_city": false
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "active",
  "primary_role": "traveller",
  "alias": "john_traveler_updated",
  "language": "fr",
  "country_id": "uuid",
  "kyc_status": "verified",
  "reputation_score": 4.8,
  "profile": {
    "bio": "Updated bio",
    "avatar_file_id": "uuid",
    "show_city": false,
    "city_id": null
  },
  "updated_at": "2024-01-15T11:45:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "john_traveler_updated",
    "language": "fr",
    "profile": {
      "bio": "Updated bio",
      "show_city": false
    }
  }'
```

### 4. Get User Statistics
**GET** `/users/{id}/stats`

Retrieves user statistics and metrics.

**Path Parameters:**
- `id` (string, required): User UUID

**Response:**
```json
{
  "user_id": "uuid",
  "trips_completed": 25,
  "packages_carried": 47,
  "on_time_rate": 96.5,
  "avg_rating": 4.8,
  "last_trip_completed_at": "2024-01-10T15:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/users/550e8400-e29b-41d4-a716-446655440000/stats
```

### 5. Update User Settings
**PUT** `/users/{id}/settings`

Updates user settings and preferences.

**Path Parameters:**
- `id` (string, required): User UUID

**Request Body:**
```json
{
  "settings": {
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "show_phone": false,
      "show_email": false
    },
    "preferences": {
      "currency": "USD",
      "timezone": "America/New_York"
    }
  }
}
```

**Response:**
```json
{
  "user_id": "uuid",
  "settings": {
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "show_phone": false,
      "show_email": false
    },
    "preferences": {
      "currency": "USD",
      "timezone": "America/New_York"
    }
  },
  "updated_at": "2024-01-15T11:45:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/users/550e8400-e29b-41d4-a716-446655440000/settings \
  -H "Content-Type: application/json" \
  -d '{
    "settings": {
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      },
      "privacy": {
        "show_phone": false,
        "show_email": false
      }
    }
  }'
```

## Database Tables

### users
Primary user account table storing core user information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| status | user_status_enum | User status (active, suspended, deleted) |
| primary_role | user_role_enum | Primary user role |
| email | text | User email (unique) |
| email_verified | boolean | Email verification status |
| phone_e164 | text | Phone number in E164 format (unique) |
| alias | text | Public username (unique) |
| language | text | User's preferred language |
| country_id | uuid | Reference to countries table |
| kyc_status | kyc_status_enum | KYC verification status |
| reputation_score | numeric(5,2) | User reputation score |
| metadata | jsonb | Additional user metadata |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### user_profiles
Public profile information visible to other users.

| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | Foreign key to users table |
| bio | text | User biography |
| avatar_file_id | uuid | Reference to files table for avatar |
| show_city | boolean | Whether to show city in profile |
| city_id | uuid | Reference to cities table |

### user_stats
Aggregated user statistics and metrics.

| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | Foreign key to users table |
| trips_completed | integer | Number of completed trips |
| packages_carried | integer | Number of packages carried |
| on_time_rate | numeric(5,2) | On-time delivery rate percentage |
| avg_rating | numeric(3,2) | Average user rating |
| last_trip_completed_at | timestamptz | Timestamp of last completed trip |

### user_settings
User preferences and settings.

| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | Foreign key to users table |
| settings | jsonb | User settings and preferences |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. User Registration
- Email and phone number validation
- Unique alias generation
- Multi-language support
- Country-based registration

### 2. Profile Management
- Public profile with limited PII exposure
- Avatar upload and management
- Bio and location settings
- Privacy controls

### 3. Statistics Tracking
- Trip completion tracking
- Package delivery metrics
- Performance ratings
- On-time delivery rates

### 4. Settings Management
- Notification preferences
- Privacy settings
- Language and currency preferences
- Timezone configuration

## Security Considerations

- Sensitive data (email, phone) not exposed in public profiles
- Reputation scores calculated securely
- Settings encrypted at rest
- Audit logging for profile changes

## Integration Points

- **Authentication Service**: User creation and verification
- **Authorization Service**: Role-based access control
- **File Service**: Avatar and document storage
- **Location Service**: Country and city references
- **Notification Service**: User preference integration

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "validation_error",
  "message": "Invalid email format",
  "details": {
    "field": "email",
    "code": "invalid_format"
  }
}
```

**404 Not Found:**
```json
{
  "error": "user_not_found",
  "message": "User with ID {id} not found"
}
```

**409 Conflict:**
```json
{
  "error": "alias_taken",
  "message": "Alias 'john_doe' is already taken"
}
```

## Rate Limiting

- User creation: 5 requests per hour per IP
- Profile updates: 10 requests per minute per user
- Statistics queries: 100 requests per minute per user
- Settings updates: 20 requests per minute per user