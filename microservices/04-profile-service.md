# Profile Service

## Overview
The Profile Service manages detailed user profiles, preferences, and personal information. It handles profile creation, updates, verification, and privacy settings.

## Purpose
- User profile management
- Profile verification and validation
- Privacy settings management
- Profile preferences and customization

## Data Ownership
- `user_profiles` - Detailed user profile information
- `user_preferences` - User preferences and settings
- `profile_verifications` - Profile verification status
- `privacy_settings` - User privacy preferences

## API Endpoints

### 1. Create User Profile
**POST** `/profiles`

Creates a new user profile with detailed information.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-05-15",
  "phone_number": "+1234567890",
  "bio": "Experienced traveler and delivery professional",
  "languages": ["en", "fr", "es"],
  "interests": ["travel", "photography", "food"],
  "profile_picture_url": "https://storage.delivery.com/profiles/user123.jpg",
  "cover_photo_url": "https://storage.delivery.com/covers/user123.jpg",
  "location": {
    "city": "Montreal",
    "country": "Canada",
    "timezone": "America/Montreal"
  },
  "social_links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-05-15",
  "phone_number": "+1234567890",
  "bio": "Experienced traveler and delivery professional",
  "languages": ["en", "fr", "es"],
  "interests": ["travel", "photography", "food"],
  "profile_picture_url": "https://storage.delivery.com/profiles/user123.jpg",
  "cover_photo_url": "https://storage.delivery.com/covers/user123.jpg",
  "location": {
    "city": "Montreal",
    "country": "Canada",
    "timezone": "America/Montreal"
  },
  "social_links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  "is_verified": false,
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/profiles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-05-15",
    "phone_number": "+1234567890",
    "bio": "Experienced traveler and delivery professional",
    "languages": ["en", "fr", "es"],
    "interests": ["travel", "photography", "food"],
    "location": {
      "city": "Montreal",
      "country": "Canada",
      "timezone": "America/Montreal"
    }
  }'
```

### 2. Get User Profile
**GET** `/profiles/{id}`

Retrieves a user profile by ID.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Query Parameters:**
- `include_private` (boolean, optional): Include private information (requires owner or admin)
- `include_verification` (boolean, optional): Include verification status

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-05-15",
  "phone_number": "+1234567890",
  "bio": "Experienced traveler and delivery professional",
  "languages": ["en", "fr", "es"],
  "interests": ["travel", "photography", "food"],
  "profile_picture_url": "https://storage.delivery.com/profiles/user123.jpg",
  "cover_photo_url": "https://storage.delivery.com/covers/user123.jpg",
  "location": {
    "city": "Montreal",
    "country": "Canada",
    "timezone": "America/Montreal"
  },
  "social_links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  "is_verified": true,
  "verification_status": "verified",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000?include_verification=true"
```

### 3. Update User Profile
**PUT** `/profiles/{id}`

Updates an existing user profile.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "bio": "Updated bio with more details",
  "languages": ["en", "fr", "es", "de"],
  "interests": ["travel", "photography", "food", "music"],
  "location": {
    "city": "Toronto",
    "country": "Canada",
    "timezone": "America/Toronto"
  },
  "social_links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "instagram": "https://instagram.com/johndoe"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-05-15",
  "phone_number": "+1234567890",
  "bio": "Updated bio with more details",
  "languages": ["en", "fr", "es", "de"],
  "interests": ["travel", "photography", "food", "music"],
  "profile_picture_url": "https://storage.delivery.com/profiles/user123.jpg",
  "cover_photo_url": "https://storage.delivery.com/covers/user123.jpg",
  "location": {
    "city": "Toronto",
    "country": "Canada",
    "timezone": "America/Toronto"
  },
  "social_links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "instagram": "https://instagram.com/johndoe"
  },
  "is_verified": true,
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "bio": "Updated bio with more details",
    "languages": ["en", "fr", "es", "de"],
    "interests": ["travel", "photography", "food", "music"],
    "location": {
      "city": "Toronto",
      "country": "Canada",
      "timezone": "America/Toronto"
    }
  }'
```

### 4. Upload Profile Picture
**POST** `/profiles/{id}/picture`

Uploads a new profile picture.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Request Body:**
```json
{
  "image_url": "https://storage.delivery.com/temp/profile_pic_123.jpg",
  "crop_data": {
    "x": 100,
    "y": 50,
    "width": 200,
    "height": 200
  }
}
```

**Response:**
```json
{
  "profile_picture_url": "https://storage.delivery.com/profiles/user123_new.jpg",
  "thumbnail_url": "https://storage.delivery.com/profiles/user123_thumb.jpg",
  "uploaded_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000/picture \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "image_url": "https://storage.delivery.com/temp/profile_pic_123.jpg",
    "crop_data": {
      "x": 100,
      "y": 50,
      "width": 200,
      "height": 200
    }
  }'
```

### 5. Get User Preferences
**GET** `/profiles/{id}/preferences`

Retrieves user preferences and settings.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Response:**
```json
{
  "profile_id": "uuid",
  "notifications": {
    "email": true,
    "push": true,
    "sms": false,
    "marketing": false
  },
  "privacy": {
    "profile_visibility": "public",
    "show_phone": false,
    "show_email": false,
    "show_location": true
  },
  "language": "en",
  "timezone": "America/Montreal",
  "currency": "CAD",
  "units": "metric",
  "theme": "light",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000/preferences
```

### 6. Update User Preferences
**PUT** `/profiles/{id}/preferences`

Updates user preferences and settings.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Request Body:**
```json
{
  "notifications": {
    "email": true,
    "push": true,
    "sms": true,
    "marketing": false
  },
  "privacy": {
    "profile_visibility": "friends",
    "show_phone": true,
    "show_email": false,
    "show_location": true
  },
  "language": "fr",
  "timezone": "America/Toronto",
  "currency": "USD",
  "units": "imperial",
  "theme": "dark"
}
```

**Response:**
```json
{
  "profile_id": "uuid",
  "notifications": {
    "email": true,
    "push": true,
    "sms": true,
    "marketing": false
  },
  "privacy": {
    "profile_visibility": "friends",
    "show_phone": true,
    "show_email": false,
    "show_location": true
  },
  "language": "fr",
  "timezone": "America/Toronto",
  "currency": "USD",
  "units": "imperial",
  "theme": "dark",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "notifications": {
      "email": true,
      "push": true,
      "sms": true,
      "marketing": false
    },
    "privacy": {
      "profile_visibility": "friends",
      "show_phone": true,
      "show_email": false,
      "show_location": true
    },
    "language": "fr",
    "timezone": "America/Toronto",
    "currency": "USD",
    "units": "imperial",
    "theme": "dark"
  }'
```

### 7. Verify Profile
**POST** `/profiles/{id}/verify`

Initiates profile verification process.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Request Body:**
```json
{
  "verification_type": "identity",
  "documents": [
    {
      "type": "passport",
      "document_url": "https://storage.delivery.com/documents/passport_123.jpg",
      "document_number": "A1234567"
    }
  ]
}
```

**Response:**
```json
{
  "verification_id": "uuid",
  "profile_id": "uuid",
  "verification_type": "identity",
  "status": "pending",
  "submitted_at": "2024-01-15T14:30:00Z",
  "estimated_completion": "2024-01-16T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "verification_type": "identity",
    "documents": [
      {
        "type": "passport",
        "document_url": "https://storage.delivery.com/documents/passport_123.jpg",
        "document_number": "A1234567"
      }
    ]
  }'
```

### 8. Get Profile Verification Status
**GET** `/profiles/{id}/verification`

Retrieves profile verification status and details.

**Path Parameters:**
- `id` (string, required): Profile UUID

**Response:**
```json
{
  "profile_id": "uuid",
  "verification_status": "verified",
  "verification_type": "identity",
  "verified_at": "2024-01-16T10:30:00Z",
  "verification_level": "high",
  "documents": [
    {
      "type": "passport",
      "status": "verified",
      "verified_at": "2024-01-16T10:30:00Z"
    }
  ],
  "next_verification_due": "2025-01-16T10:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/profiles/550e8400-e29b-41d4-a716-446655440000/verification
```

## Database Tables

### user_profiles
Detailed user profile information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| first_name | text | User's first name |
| last_name | text | User's last name |
| date_of_birth | date | User's date of birth |
| phone_number | text | User's phone number |
| bio | text | User's biography |
| languages | text[] | Array of language codes |
| interests | text[] | Array of user interests |
| profile_picture_url | text | URL to profile picture |
| cover_photo_url | text | URL to cover photo |
| location | jsonb | Location information |
| social_links | jsonb | Social media links |
| is_verified | boolean | Whether profile is verified |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### user_preferences
User preferences and settings.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| profile_id | uuid | Foreign key to user_profiles table |
| notifications | jsonb | Notification preferences |
| privacy | jsonb | Privacy settings |
| language | text | Preferred language |
| timezone | text | User's timezone |
| currency | text | Preferred currency |
| units | text | Preferred unit system |
| theme | text | UI theme preference |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### profile_verifications
Profile verification status and details.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| profile_id | uuid | Foreign key to user_profiles table |
| verification_type | text | Type of verification |
| status | text | Verification status |
| verification_level | text | Level of verification achieved |
| documents | jsonb | Verification documents |
| verified_at | timestamptz | Verification completion timestamp |
| expires_at | timestamptz | Verification expiration timestamp |
| created_at | timestamptz | Creation timestamp |

### privacy_settings
User privacy preferences and controls.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| profile_id | uuid | Foreign key to user_profiles table |
| profile_visibility | text | Profile visibility level |
| show_phone | boolean | Whether to show phone number |
| show_email | boolean | Whether to show email address |
| show_location | boolean | Whether to show location |
| allow_messages | boolean | Whether to allow messages |
| allow_friend_requests | boolean | Whether to allow friend requests |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Profile Management
- Comprehensive profile information
- Profile picture and cover photo uploads
- Social media integration
- Location and timezone support

### 2. Privacy Controls
- Granular privacy settings
- Profile visibility controls
- Contact information privacy
- Message and friend request controls

### 3. Verification System
- Identity verification
- Document verification
- Verification levels
- Expiration management

### 4. Preferences
- Notification preferences
- Language and timezone settings
- Currency and unit preferences
- UI theme customization

## Security Considerations

- Profile pictures are validated and processed
- Personal information is encrypted
- Privacy settings are enforced
- Verification documents are secure

## Integration Points

- **User Service**: User account integration
- **File Service**: Profile picture storage
- **Verification Service**: Identity verification
- **Notification Service**: Preference-based notifications

## Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "error": "profile_not_found",
  "message": "Profile with ID 'uuid' not found"
}
```

**400 Bad Request:**
```json
{
  "error": "invalid_profile_data",
  "message": "Invalid profile data provided",
  "details": {
    "field": "date_of_birth",
    "issue": "Date must be in the past"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "insufficient_permissions",
  "message": "You don't have permission to access this profile"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "verification_failed",
  "message": "Profile verification failed",
  "details": {
    "reason": "Document quality insufficient",
    "retry_after": "24h"
  }
}
```

## Rate Limiting

- Profile updates: 10 per hour per user
- Picture uploads: 5 per hour per user
- Preference updates: 20 per hour per user
- Verification requests: 3 per day per user

## Profile Verification Levels

### 1. Basic
- Email verification
- Phone verification
- Basic profile completion

### 2. Standard
- Identity document verification
- Address verification
- Social media verification

### 3. Premium
- Government ID verification
- Bank account verification
- Enhanced security checks

### 4. Enterprise
- Business verification
- Tax ID verification
- Compliance verification