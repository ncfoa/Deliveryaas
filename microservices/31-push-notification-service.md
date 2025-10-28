# Push Notification Service

## Overview
The Push Notification Service handles push notifications for mobile and web applications. It manages device tokens, notification delivery, and engagement tracking.

## Purpose
- Push notification delivery
- Device token management
- Notification engagement tracking
- Multi-platform support

## Data Ownership
- `push_devices` - Device registration and tokens
- `push_notifications` - Push notification records
- `push_deliveries` - Delivery tracking
- `push_analytics` - Engagement analytics

## API Endpoints

### 1. Send Push Notification
**POST** `/push/send`

Sends a push notification to one or more devices.

**Request Body:**
```json
{
  "devices": [
    {
      "device_token": "device_token_123456789",
      "platform": "ios",
      "user_id": "550e8400-e29b-41d4-a716-446655440000"
    }
  ],
  "notification": {
    "title": "Delivery Update",
    "body": "Your package #12345 is out for delivery",
    "data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith",
      "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
    },
    "image_url": "https://delivery.com/images/delivery_icon.png",
    "sound": "default",
    "badge": 1
  },
  "template_id": "delivery_update_template",
  "template_data": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "out_for_delivery",
    "estimated_delivery": "2024-01-15T14:30:00Z",
    "courier_name": "John Smith",
    "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
  },
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z",
  "expires_at": "2024-01-15T18:00:00Z",
  "collapse_key": "delivery_update_12345"
}
```

**Response:**
```json
{
  "notification_id": "notif_123456789",
  "devices": [
    {
      "device_token": "device_token_123456789",
      "platform": "ios",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "queued"
    }
  ],
  "notification": {
    "title": "Delivery Update",
    "body": "Your package #12345 is out for delivery",
    "data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith",
      "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
    },
    "image_url": "https://delivery.com/images/delivery_icon.png",
    "sound": "default",
    "badge": 1
  },
  "template_id": "delivery_update_template",
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z",
  "expires_at": "2024-01-15T18:00:00Z",
  "collapse_key": "delivery_update_12345",
  "status": "queued",
  "created_at": "2024-01-15T12:00:00Z",
  "estimated_delivery": "2024-01-15T12:05:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/push/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "devices": [
      {
        "device_token": "device_token_123456789",
        "platform": "ios",
        "user_id": "550e8400-e29b-41d4-a716-446655440000"
      }
    ],
    "notification": {
      "title": "Delivery Update",
      "body": "Your package #12345 is out for delivery",
      "data": {
        "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
        "status": "out_for_delivery",
        "estimated_delivery": "2024-01-15T14:30:00Z",
        "courier_name": "John Smith",
        "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
      },
      "image_url": "https://delivery.com/images/delivery_icon.png",
      "sound": "default",
      "badge": 1
    },
    "template_id": "delivery_update_template",
    "template_data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith",
      "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
    },
    "priority": "high",
    "scheduled_for": "2024-01-15T12:00:00Z",
    "expires_at": "2024-01-15T18:00:00Z",
    "collapse_key": "delivery_update_12345"
  }'
```

### 2. Register Device
**POST** `/push/devices`

Registers a device for push notifications.

**Request Body:**
```json
{
  "device_token": "device_token_123456789",
  "platform": "ios",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_version": "1.2.3",
  "os_version": "17.0",
  "device_model": "iPhone 15 Pro",
  "push_enabled": true,
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA"
}
```

**Response:**
```json
{
  "device_id": "device_123456789",
  "device_token": "device_token_123456789",
  "platform": "ios",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_version": "1.2.3",
  "os_version": "17.0",
  "device_model": "iPhone 15 Pro",
  "push_enabled": true,
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "status": "active",
  "registered_at": "2024-01-15T12:30:00Z",
  "last_seen": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/push/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "device_token": "device_token_123456789",
    "platform": "ios",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "app_version": "1.2.3",
    "os_version": "17.0",
    "device_model": "iPhone 15 Pro",
    "push_enabled": true,
    "timezone": "America/Toronto",
    "language": "en",
    "country": "CA"
  }'
```

### 3. Get Device
**GET** `/push/devices/{device_id}`

Retrieves device information.

**Path Parameters:**
- `device_id` (string, required): Device UUID

**Response:**
```json
{
  "device_id": "device_123456789",
  "device_token": "device_token_123456789",
  "platform": "ios",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_version": "1.2.3",
  "os_version": "17.0",
  "device_model": "iPhone 15 Pro",
  "push_enabled": true,
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "status": "active",
  "registered_at": "2024-01-15T12:30:00Z",
  "last_seen": "2024-01-15T14:30:00Z",
  "notification_count": 25,
  "last_notification": "2024-01-15T14:00:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/push/devices/device_123456789
```

### 4. Update Device
**PUT** `/push/devices/{device_id}`

Updates device information.

**Path Parameters:**
- `device_id` (string, required): Device UUID

**Request Body:**
```json
{
  "device_token": "updated_device_token_123456789",
  "app_version": "1.2.4",
  "os_version": "17.1",
  "push_enabled": true,
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "device_id": "device_123456789",
  "device_token": "updated_device_token_123456789",
  "platform": "ios",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "app_version": "1.2.4",
  "os_version": "17.1",
  "device_model": "iPhone 15 Pro",
  "push_enabled": true,
  "timezone": "America/Toronto",
  "language": "en",
  "country": "CA",
  "status": "active",
  "registered_at": "2024-01-15T12:30:00Z",
  "last_seen": "2024-01-15T14:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/push/devices/device_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "device_token": "updated_device_token_123456789",
    "app_version": "1.2.4",
    "os_version": "17.1",
    "push_enabled": true,
    "timezone": "America/Toronto",
    "language": "en",
    "country": "CA",
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 5. Get Notification Status
**GET** `/push/notifications/{notification_id}`

Retrieves notification status and delivery information.

**Path Parameters:**
- `notification_id` (string, required): Notification UUID

**Response:**
```json
{
  "notification_id": "notif_123456789",
  "devices": [
    {
      "device_token": "device_token_123456789",
      "platform": "ios",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:05:00Z",
      "opened_at": "2024-01-15T12:10:00Z",
      "clicked_at": "2024-01-15T12:15:00Z"
    }
  ],
  "notification": {
    "title": "Delivery Update",
    "body": "Your package #12345 is out for delivery",
    "data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith",
      "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
    },
    "image_url": "https://delivery.com/images/delivery_icon.png",
    "sound": "default",
    "badge": 1
  },
  "template_id": "delivery_update_template",
  "priority": "high",
  "status": "delivered",
  "created_at": "2024-01-15T12:00:00Z",
  "sent_at": "2024-01-15T12:00:05Z",
  "delivered_at": "2024-01-15T12:05:00Z",
  "opened_at": "2024-01-15T12:10:00Z",
  "clicked_at": "2024-01-15T12:15:00Z",
  "expires_at": "2024-01-15T18:00:00Z",
  "collapse_key": "delivery_update_12345",
  "tracking_data": {
    "deliveries": 1,
    "opens": 1,
    "clicks": 1,
    "failures": 0
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/push/notifications/notif_123456789
```

### 6. Track Notification Event
**POST** `/push/notifications/{notification_id}/events`

Tracks notification engagement events.

**Path Parameters:**
- `notification_id` (string, required): Notification UUID

**Request Body:**
```json
{
  "event_type": "opened",
  "device_token": "device_token_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T12:10:00Z",
  "metadata": {
    "app_version": "1.2.3",
    "os_version": "17.0",
    "device_model": "iPhone 15 Pro"
  }
}
```

**Response:**
```json
{
  "event_id": "event_123456789",
  "notification_id": "notif_123456789",
  "event_type": "opened",
  "device_token": "device_token_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T12:10:00Z",
  "metadata": {
    "app_version": "1.2.3",
    "os_version": "17.0",
    "device_model": "iPhone 15 Pro"
  },
  "tracked": true,
  "tracked_at": "2024-01-15T12:10:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/push/notifications/notif_123456789/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "event_type": "opened",
    "device_token": "device_token_123456789",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2024-01-15T12:10:00Z",
    "metadata": {
      "app_version": "1.2.3",
      "os_version": "17.0",
      "device_model": "iPhone 15 Pro"
    }
  }'
```

### 7. Get Push Analytics
**GET** `/push/analytics`

Retrieves push notification performance analytics.

**Query Parameters:**
- `template_id` (string, optional): Filter by template
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `platform` (string, optional): Filter by platform
- `user_id` (string, optional): Filter by user

**Response:**
```json
{
  "overview": {
    "total_notifications": 1000000,
    "delivered": 950000,
    "opened": 500000,
    "clicked": 100000,
    "failed": 50000,
    "delivery_rate": 0.95,
    "open_rate": 0.53,
    "click_rate": 0.11,
    "failure_rate": 0.05
  },
  "platform_breakdown": [
    {
      "platform": "ios",
      "notifications": 600000,
      "delivered": 570000,
      "opened": 300000,
      "clicked": 60000,
      "failed": 30000,
      "delivery_rate": 0.95,
      "open_rate": 0.53,
      "click_rate": 0.11
    },
    {
      "platform": "android",
      "notifications": 400000,
      "delivered": 380000,
      "opened": 200000,
      "clicked": 40000,
      "failed": 20000,
      "delivery_rate": 0.95,
      "open_rate": 0.53,
      "click_rate": 0.11
    }
  ],
  "template_performance": [
    {
      "template_id": "delivery_update_template",
      "name": "Delivery Update Template",
      "notifications": 100000,
      "delivered": 95000,
      "opened": 50000,
      "clicked": 10000,
      "failed": 5000,
      "delivery_rate": 0.95,
      "open_rate": 0.53,
      "click_rate": 0.11
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "notifications": 10000,
      "delivered": 9500,
      "opened": 5000,
      "clicked": 1000
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/push/analytics?template_id=delivery_update_template&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&platform=ios"
```

### 8. Get Device Statistics
**GET** `/push/devices/statistics`

Retrieves device registration statistics.

**Query Parameters:**
- `platform` (string, optional): Filter by platform
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_devices": 500000,
    "active_devices": 450000,
    "inactive_devices": 50000,
    "push_enabled": 400000,
    "push_disabled": 100000
  },
  "platform_breakdown": [
    {
      "platform": "ios",
      "devices": 300000,
      "active": 270000,
      "inactive": 30000,
      "push_enabled": 240000,
      "push_disabled": 60000
    },
    {
      "platform": "android",
      "devices": 200000,
      "active": 180000,
      "inactive": 20000,
      "push_enabled": 160000,
      "push_disabled": 40000
    }
  ],
  "app_version_breakdown": [
    {
      "app_version": "1.2.3",
      "devices": 200000,
      "active": 180000,
      "push_enabled": 160000
    },
    {
      "app_version": "1.2.2",
      "devices": 150000,
      "active": 135000,
      "push_enabled": 120000
    }
  ],
  "os_version_breakdown": [
    {
      "os_version": "17.0",
      "devices": 100000,
      "active": 90000,
      "push_enabled": 80000
    },
    {
      "os_version": "16.0",
      "devices": 80000,
      "active": 72000,
      "push_enabled": 64000
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/push/devices/statistics?platform=ios&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

## Database Tables

### push_devices
Device registration and tokens.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| device_id | text | Device identifier |
| device_token | text | Device token |
| platform | text | Platform (ios/android/web) |
| user_id | uuid | User identifier |
| app_version | text | App version |
| os_version | text | OS version |
| device_model | text | Device model |
| push_enabled | boolean | Push enabled flag |
| timezone | text | Device timezone |
| language | text | Device language |
| country | text | Device country |
| status | text | Device status |
| registered_at | timestamptz | Registration timestamp |
| last_seen | timestamptz | Last seen timestamp |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### push_notifications
Push notification records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| notification_id | text | Notification identifier |
| devices | jsonb | Target devices |
| notification | jsonb | Notification content |
| template_id | text | Template identifier |
| template_data | jsonb | Template data |
| priority | text | Notification priority |
| scheduled_for | timestamptz | Scheduled send time |
| expires_at | timestamptz | Expiration time |
| collapse_key | text | Collapse key |
| status | text | Notification status |
| created_at | timestamptz | Creation timestamp |
| sent_at | timestamptz | Send timestamp |
| delivered_at | timestamptz | Delivery timestamp |
| opened_at | timestamptz | Open timestamp |
| clicked_at | timestamptz | Click timestamp |

### push_deliveries
Delivery tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| notification_id | uuid | Reference to push_notifications |
| device_token | text | Device token |
| user_id | uuid | User identifier |
| status | text | Delivery status |
| delivered_at | timestamptz | Delivery timestamp |
| opened_at | timestamptz | Open timestamp |
| clicked_at | timestamptz | Click timestamp |
| failed_at | timestamptz | Failure timestamp |
| created_at | timestamptz | Creation timestamp |

### push_analytics
Engagement analytics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_value | decimal | Metric value |
| template_id | text | Template identifier |
| platform | text | Platform |
| date | date | Metric date |
| hour | integer | Metric hour |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Push Delivery
- Multi-platform support
- Delivery tracking
- Failure handling
- Retry logic

### 2. Device Management
- Device registration
- Token management
- Device updates
- Status tracking

### 3. Analytics & Tracking
- Delivery tracking
- Open tracking
- Click tracking
- Engagement metrics

### 4. Notification Management
- Template system
- Scheduling
- Priority handling
- Collapse keys

## Security Considerations

- Token validation
- Rate limiting
- Data privacy
- Access control

## Integration Points

- **Notification Service**: Push notifications
- **User Service**: User preferences
- **Delivery Service**: Delivery notifications
- **Analytics Service**: Push metrics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_device_token",
  "message": "Invalid device token",
  "details": {
    "field": "device_token",
    "issue": "Invalid token format"
  }
}
```

**404 Not Found:**
```json
{
  "error": "device_not_found",
  "message": "Device not found",
  "details": {
    "device_id": "device_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "notification_validation_failed",
  "message": "Notification validation failed",
  "details": {
    "issues": [
      "Missing required field: title",
      "Invalid notification data format"
    ]
  }
}
```

## Rate Limiting

- Push sending: 1000 per hour per user
- Device operations: 100 per hour per user
- Analytics queries: 50 per hour per user
- Event tracking: 1000 per hour per user

## Push Features

### 1. Platforms
- iOS
- Android
- Web
- Desktop

### 2. Notification Types
- Alert
- Badge
- Sound
- Silent

### 3. Delivery Status
- Queued
- Sent
- Delivered
- Opened
- Clicked
- Failed

### 4. Notification Categories
- Delivery
- Payment
- User
- System
- Marketing