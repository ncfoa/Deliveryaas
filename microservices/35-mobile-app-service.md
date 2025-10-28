# Mobile App Service

## Overview
The Mobile App Service provides mobile-specific functionality, device management, and mobile app features for iOS and Android platforms.

## Purpose
- Mobile app functionality
- Device management
- Push notifications
- Mobile-specific features

## Data Ownership
- `mobile_devices` - Mobile device information
- `app_versions` - App version management
- `mobile_sessions` - Mobile session management
- `device_tokens` - Push notification tokens

## API Endpoints

### 1. Register Mobile Device
**POST** `/mobile-app/devices`

Registers a new mobile device.

**Request Body:**
```json
{
  "device_id": "device_123456789",
  "platform": "ios",
  "app_version": "1.2.3",
  "os_version": "17.2",
  "device_model": "iPhone 15 Pro",
  "device_name": "John's iPhone",
  "push_token": "push_token_123456789",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_build": "123",
  "sdk_version": "1.0.0",
  "capabilities": [
    "push_notifications",
    "location_tracking",
    "camera",
    "biometric_auth"
  ]
}
```

**Response:**
```json
{
  "device_id": "device_123456789",
  "platform": "ios",
  "app_version": "1.2.3",
  "os_version": "17.2",
  "device_model": "iPhone 15 Pro",
  "device_name": "John's iPhone",
  "push_token": "push_token_123456789",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_build": "123",
  "sdk_version": "1.0.0",
  "capabilities": [
    "push_notifications",
    "location_tracking",
    "camera",
    "biometric_auth"
  ],
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "last_seen": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/mobile-app/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "device_id": "device_123456789",
    "platform": "ios",
    "app_version": "1.2.3",
    "os_version": "17.2",
    "device_model": "iPhone 15 Pro",
    "device_name": "John'\''s iPhone",
    "push_token": "push_token_123456789",
    "timezone": "America/Toronto",
    "language": "en",
    "country": "CA",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "app_build": "123",
    "sdk_version": "1.0.0",
    "capabilities": [
      "push_notifications",
      "location_tracking",
      "camera",
      "biometric_auth"
    ]
  }'
```

### 2. Update Device Information
**PUT** `/mobile-app/devices/{device_id}`

Updates mobile device information.

**Path Parameters:**
- `device_id` (string, required): Device identifier

**Request Body:**
```json
{
  "app_version": "1.2.4",
  "os_version": "17.3",
  "device_name": "John's iPhone Updated",
  "push_token": "push_token_987654321",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "app_build": "124",
  "sdk_version": "1.0.1",
  "capabilities": [
    "push_notifications",
    "location_tracking",
    "camera",
    "biometric_auth",
    "nfc"
  ],
  "last_seen": "2024-01-15T14:30:00Z"
}
```

**Response:**
```json
{
  "device_id": "device_123456789",
  "platform": "ios",
  "app_version": "1.2.4",
  "os_version": "17.3",
  "device_model": "iPhone 15 Pro",
  "device_name": "John's iPhone Updated",
  "push_token": "push_token_987654321",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_build": "124",
  "sdk_version": "1.0.1",
  "capabilities": [
    "push_notifications",
    "location_tracking",
    "camera",
    "biometric_auth",
    "nfc"
  ],
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "last_seen": "2024-01-15T14:30:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/mobile-app/devices/device_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "app_version": "1.2.4",
    "os_version": "17.3",
    "device_name": "John'\''s iPhone Updated",
    "push_token": "push_token_987654321",
    "timezone": "America/Toronto",
    "language": "en",
    "country": "CA",
    "app_build": "124",
    "sdk_version": "1.0.1",
    "capabilities": [
      "push_notifications",
      "location_tracking",
      "camera",
      "biometric_auth",
      "nfc"
    ],
    "last_seen": "2024-01-15T14:30:00Z"
  }'
```

### 3. Get Device Information
**GET** `/mobile-app/devices/{device_id}`

Retrieves mobile device information.

**Path Parameters:**
- `device_id` (string, required): Device identifier

**Response:**
```json
{
  "device_id": "device_123456789",
  "platform": "ios",
  "app_version": "1.2.4",
  "os_version": "17.3",
  "device_model": "iPhone 15 Pro",
  "device_name": "John's iPhone Updated",
  "push_token": "push_token_987654321",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_build": "124",
  "sdk_version": "1.0.1",
  "capabilities": [
    "push_notifications",
    "location_tracking",
    "camera",
    "biometric_auth",
    "nfc"
  ],
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "last_seen": "2024-01-15T14:30:00Z",
  "updated_at": "2024-01-15T14:30:00Z",
  "usage_stats": {
    "total_sessions": 100,
    "total_duration": 3600000,
    "last_30_days": {
      "sessions": 50,
      "duration": 1800000
    }
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/mobile-app/devices/device_123456789
```

### 4. Get App Versions
**GET** `/mobile-app/versions`

Retrieves available app versions.

**Query Parameters:**
- `platform` (string, optional): Filter by platform
- `status` (string, optional): Filter by status
- `limit` (integer, optional): Number of versions (default: 50)
- `offset` (integer, optional): Number of versions to skip (default: 0)

**Response:**
```json
{
  "versions": [
    {
      "version_id": "ver_123456789",
      "platform": "ios",
      "version": "1.2.4",
      "build": "124",
      "status": "available",
      "release_notes": "Bug fixes and performance improvements",
      "download_url": "https://apps.apple.com/app/delivery-platform/id123456789",
      "minimum_os_version": "15.0",
      "file_size": 50000000,
      "checksum": "sha256_checksum_here",
      "release_date": "2024-01-15T12:00:00Z",
      "created_at": "2024-01-15T12:00:00Z",
      "features": [
        "Bug fixes",
        "Performance improvements",
        "New UI elements"
      ],
      "breaking_changes": [],
      "deprecations": []
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "platform": "ios",
    "status": "available"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/mobile-app/versions?platform=ios&status=available&limit=50&offset=0"
```

### 5. Check App Update
**GET** `/mobile-app/versions/check-update`

Checks if app update is available.

**Query Parameters:**
- `platform` (string, required): Platform
- `current_version` (string, required): Current app version
- `current_build` (string, required): Current app build

**Response:**
```json
{
  "update_available": true,
  "latest_version": {
    "version_id": "ver_123456789",
    "platform": "ios",
    "version": "1.2.4",
    "build": "124",
    "status": "available",
    "release_notes": "Bug fixes and performance improvements",
    "download_url": "https://apps.apple.com/app/delivery-platform/id123456789",
    "minimum_os_version": "15.0",
    "file_size": 50000000,
    "checksum": "sha256_checksum_here",
    "release_date": "2024-01-15T12:00:00Z",
    "features": [
      "Bug fixes",
      "Performance improvements",
      "New UI elements"
    ],
    "breaking_changes": [],
    "deprecations": []
  },
  "update_type": "minor",
  "force_update": false,
  "recommended_update": true
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/mobile-app/versions/check-update?platform=ios&current_version=1.2.3&current_build=123"
```

### 6. Create Mobile Session
**POST** `/mobile-app/sessions`

Creates a new mobile session.

**Request Body:**
```json
{
  "device_id": "device_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_type": "user",
  "app_version": "1.2.4",
  "os_version": "17.3",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "location": {
    "latitude": 43.6532,
    "longitude": -79.3832,
    "accuracy": 10,
    "timestamp": "2024-01-15T12:30:00Z"
  },
  "device_info": {
    "screen_resolution": "1179x2556",
    "screen_density": 3.0,
    "orientation": "portrait",
    "network_type": "wifi",
    "battery_level": 85
  }
}
```

**Response:**
```json
{
  "session_id": "sess_123456789",
  "device_id": "device_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_type": "user",
  "app_version": "1.2.4",
  "os_version": "17.3",
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "location": {
    "latitude": 43.6532,
    "longitude": -79.3832,
    "accuracy": 10,
    "timestamp": "2024-01-15T12:30:00Z"
  },
  "device_info": {
    "screen_resolution": "1179x2556",
    "screen_density": 3.0,
    "orientation": "portrait",
    "network_type": "wifi",
    "battery_level": 85
  },
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-15T18:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/mobile-app/sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "device_id": "device_123456789",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "session_type": "user",
    "app_version": "1.2.4",
    "os_version": "17.3",
    "timezone": "America/Toronto",
    "language": "en",
    "country": "CA",
    "location": {
      "latitude": 43.6532,
      "longitude": -79.3832,
      "accuracy": 10,
      "timestamp": "2024-01-15T12:30:00Z"
    },
    "device_info": {
      "screen_resolution": "1179x2556",
      "screen_density": 3.0,
      "orientation": "portrait",
      "network_type": "wifi",
      "battery_level": 85
    }
  }'
```

### 7. Update Device Location
**PUT** `/mobile-app/devices/{device_id}/location`

Updates device location.

**Path Parameters:**
- `device_id` (string, required): Device identifier

**Request Body:**
```json
{
  "latitude": 43.6532,
  "longitude": -79.3832,
  "accuracy": 10,
  "altitude": 100,
  "speed": 5.5,
  "heading": 45,
  "timestamp": "2024-01-15T12:30:00Z",
  "background": false
}
```

**Response:**
```json
{
  "device_id": "device_123456789",
  "location": {
    "latitude": 43.6532,
    "longitude": -79.3832,
    "accuracy": 10,
    "altitude": 100,
    "speed": 5.5,
    "heading": 45,
    "timestamp": "2024-01-15T12:30:00Z",
    "background": false
  },
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/mobile-app/devices/device_123456789/location \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "latitude": 43.6532,
    "longitude": -79.3832,
    "accuracy": 10,
    "altitude": 100,
    "speed": 5.5,
    "heading": 45,
    "timestamp": "2024-01-15T12:30:00Z",
    "background": false
  }'
```

### 8. Get Mobile Analytics
**GET** `/mobile-app/analytics`

Retrieves mobile app analytics.

**Query Parameters:**
- `device_id` (string, optional): Filter by device
- `user_id` (string, optional): Filter by user
- `platform` (string, optional): Filter by platform
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_devices": 10000,
    "active_devices": 8000,
    "total_sessions": 100000,
    "average_session_duration": 1800,
    "crash_rate": 0.02
  },
  "platform_breakdown": [
    {
      "platform": "ios",
      "devices": 5000,
      "sessions": 50000,
      "average_session_duration": 2000,
      "crash_rate": 0.015
    },
    {
      "platform": "android",
      "devices": 5000,
      "sessions": 50000,
      "average_session_duration": 1600,
      "crash_rate": 0.025
    }
  ],
  "version_breakdown": [
    {
      "version": "1.2.4",
      "devices": 4000,
      "sessions": 40000,
      "average_session_duration": 1900,
      "crash_rate": 0.01
    },
    {
      "version": "1.2.3",
      "devices": 3000,
      "sessions": 30000,
      "average_session_duration": 1700,
      "crash_rate": 0.03
    }
  ],
  "feature_usage": [
    {
      "feature": "delivery_tracking",
      "usage_count": 50000,
      "unique_users": 8000,
      "average_duration": 300
    },
    {
      "feature": "payment",
      "usage_count": 30000,
      "unique_users": 6000,
      "average_duration": 120
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "new_devices": 50,
      "active_devices": 8000,
      "sessions": 5000,
      "crashes": 100
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/mobile-app/analytics?device_id=device_123456789&platform=ios&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

## Database Tables

### mobile_devices
Mobile device information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| device_id | text | Device identifier |
| platform | text | Platform (ios/android) |
| app_version | text | App version |
| os_version | text | OS version |
| device_model | text | Device model |
| device_name | text | Device name |
| push_token | text | Push notification token |
| timezone | text | Device timezone |
| language | text | Device language |
| country | text | Country code |
| user_id | uuid | Reference to users |
| app_build | text | App build number |
| sdk_version | text | SDK version |
| capabilities | text[] | Device capabilities |
| status | text | Device status |
| created_at | timestamptz | Creation timestamp |
| last_seen | timestamptz | Last seen timestamp |
| updated_at | timestamptz | Last update timestamp |

### app_versions
App version management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| version_id | text | Version identifier |
| platform | text | Platform (ios/android) |
| version | text | Version number |
| build | text | Build number |
| status | text | Version status |
| release_notes | text | Release notes |
| download_url | text | Download URL |
| minimum_os_version | text | Minimum OS version |
| file_size | bigint | File size in bytes |
| checksum | text | File checksum |
| release_date | timestamptz | Release date |
| features | text[] | New features |
| breaking_changes | text[] | Breaking changes |
| deprecations | text[] | Deprecated features |
| created_at | timestamptz | Creation timestamp |

### mobile_sessions
Mobile session management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| session_id | text | Session identifier |
| device_id | uuid | Reference to mobile_devices |
| user_id | uuid | Reference to users |
| session_type | text | Session type |
| app_version | text | App version |
| os_version | text | OS version |
| timezone | text | Session timezone |
| language | text | Session language |
| country | text | Country code |
| location | jsonb | Location data |
| device_info | jsonb | Device information |
| status | text | Session status |
| created_at | timestamptz | Creation timestamp |
| expires_at | timestamptz | Expiration timestamp |
| ended_at | timestamptz | End timestamp |

### device_tokens
Push notification tokens.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| device_id | uuid | Reference to mobile_devices |
| token | text | Push token |
| platform | text | Platform (ios/android) |
| status | text | Token status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Device Management
- Device registration
- Information updates
- Capability tracking
- Status management

### 2. App Version Management
- Version tracking
- Update checking
- Release management
- Feature tracking

### 3. Session Management
- Session creation
- Location tracking
- Device information
- Usage analytics

### 4. Mobile Analytics
- Usage tracking
- Performance metrics
- Feature analytics
- Crash reporting

## Security Considerations

- Device authentication
- Token management
- Location privacy
- Data encryption

## Integration Points

- **Push Notification Service**: Push notifications
- **Location Service**: Location data
- **Analytics Service**: Usage analytics
- **Authentication Service**: Device authentication

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_device_data",
  "message": "Invalid device data",
  "details": {
    "field": "platform",
    "issue": "Unsupported platform"
  }
}
```

**404 Not Found:**
```json
{
  "error": "device_not_found",
  "message": "Mobile device not found",
  "details": {
    "device_id": "device_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Device validation failed",
  "details": {
    "issues": [
      "Missing required field: device_id",
      "Invalid platform value"
    ]
  }
}
```

## Rate Limiting

- Device registration: 10 per hour per IP
- Location updates: 100 per hour per device
- Session creation: 50 per hour per device
- Analytics queries: 100 per hour per device

## Mobile App Features

### 1. Device Management
- Registration
- Updates
- Capabilities
- Status tracking

### 2. Version Management
- Update checking
- Release notes
- Feature tracking
- Compatibility

### 3. Session Management
- Creation
- Tracking
- Analytics
- Management

### 4. Analytics
- Usage tracking
- Performance
- Features
- Crashes