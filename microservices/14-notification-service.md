# Notification Service

## Overview
The Notification Service manages all user notifications, alerts, and communication channels. It handles email, SMS, push notifications, and in-app messaging.

## Purpose
- Multi-channel notification delivery
- Notification preferences management
- Template management
- Delivery tracking and analytics

## Data Ownership
- `notifications` - Notification records
- `notification_templates` - Message templates
- `notification_preferences` - User preferences
- `notification_deliveries` - Delivery tracking

## API Endpoints

### 1. Send Notification
**POST** `/notifications/send`

Sends a notification to a user.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "delivery_update",
  "channels": ["email", "push", "sms"],
  "template_id": "delivery_update_template",
  "data": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "status": "out_for_delivery",
    "estimated_delivery": "2024-01-15T14:30:00Z",
    "courier_name": "John Smith"
  },
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "delivery_update",
  "channels": ["email", "push", "sms"],
  "template_id": "delivery_update_template",
  "data": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "status": "out_for_delivery",
    "estimated_delivery": "2024-01-15T14:30:00Z",
    "courier_name": "John Smith"
  },
  "priority": "high",
  "status": "sent",
  "deliveries": [
    {
      "channel": "email",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:00:05Z"
    },
    {
      "channel": "push",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:00:03Z"
    },
    {
      "channel": "sms",
      "status": "failed",
      "error": "Invalid phone number"
    }
  ],
  "scheduled_for": "2024-01-15T12:00:00Z",
  "created_at": "2024-01-15T12:00:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "delivery_update",
    "channels": ["email", "push", "sms"],
    "template_id": "delivery_update_template",
    "data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith"
    },
    "priority": "high",
    "scheduled_for": "2024-01-15T12:00:00Z"
  }'
```

### 2. Get Notification History
**GET** `/notifications/history`

Retrieves notification history for the authenticated user.

**Query Parameters:**
- `type` (string, optional): Filter by notification type
- `channel` (string, optional): Filter by delivery channel
- `status` (string, optional): Filter by delivery status
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of notifications to return (default: 20)
- `offset` (integer, optional): Number of notifications to skip (default: 0)

**Response:**
```json
{
  "notifications": [
    {
      "id": "uuid",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "type": "delivery_update",
      "channels": ["email", "push"],
      "template_id": "delivery_update_template",
      "data": {
        "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
        "status": "out_for_delivery",
        "estimated_delivery": "2024-01-15T14:30:00Z",
        "courier_name": "John Smith"
      },
      "priority": "high",
      "status": "sent",
      "deliveries": [
        {
          "channel": "email",
          "status": "delivered",
          "delivered_at": "2024-01-15T12:00:05Z"
        },
        {
          "channel": "push",
          "status": "delivered",
          "delivered_at": "2024-01-15T12:00:03Z"
        }
      ],
      "created_at": "2024-01-15T12:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/notifications/history?type=delivery_update&limit=10"
```

### 3. Update Notification Preferences
**PUT** `/notifications/preferences`

Updates notification preferences for the authenticated user.

**Request Body:**
```json
{
  "email": {
    "enabled": true,
    "types": ["delivery_update", "payment_confirmation", "trip_reminder"],
    "frequency": "immediate"
  },
  "push": {
    "enabled": true,
    "types": ["delivery_update", "payment_confirmation"],
    "frequency": "immediate"
  },
  "sms": {
    "enabled": false,
    "types": [],
    "frequency": "daily"
  },
  "in_app": {
    "enabled": true,
    "types": ["delivery_update", "payment_confirmation", "trip_reminder", "promotion"],
    "frequency": "immediate"
  }
}
```

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "preferences": {
    "email": {
      "enabled": true,
      "types": ["delivery_update", "payment_confirmation", "trip_reminder"],
      "frequency": "immediate"
    },
    "push": {
      "enabled": true,
      "types": ["delivery_update", "payment_confirmation"],
      "frequency": "immediate"
    },
    "sms": {
      "enabled": false,
      "types": [],
      "frequency": "daily"
    },
    "in_app": {
      "enabled": true,
      "types": ["delivery_update", "payment_confirmation", "trip_reminder", "promotion"],
      "frequency": "immediate"
    }
  },
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/notifications/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "email": {
      "enabled": true,
      "types": ["delivery_update", "payment_confirmation", "trip_reminder"],
      "frequency": "immediate"
    },
    "push": {
      "enabled": true,
      "types": ["delivery_update", "payment_confirmation"],
      "frequency": "immediate"
    },
    "sms": {
      "enabled": false,
      "types": [],
      "frequency": "daily"
    },
    "in_app": {
      "enabled": true,
      "types": ["delivery_update", "payment_confirmation", "trip_reminder", "promotion"],
      "frequency": "immediate"
    }
  }'
```

### 4. Get Notification Templates
**GET** `/notifications/templates`

Retrieves available notification templates.

**Query Parameters:**
- `type` (string, optional): Filter by template type
- `channel` (string, optional): Filter by channel
- `active` (boolean, optional): Filter by active status

**Response:**
```json
{
  "templates": [
    {
      "id": "delivery_update_template",
      "name": "Delivery Update",
      "type": "delivery_update",
      "channels": ["email", "push", "sms", "in_app"],
      "subject": "Delivery Update: {{delivery_id}}",
      "content": {
        "email": {
          "html": "<h1>Delivery Update</h1><p>Your delivery {{delivery_id}} is {{status}}.</p>",
          "text": "Delivery Update: Your delivery {{delivery_id}} is {{status}}."
        },
        "push": {
          "title": "Delivery Update",
          "body": "Your delivery {{delivery_id}} is {{status}}."
        },
        "sms": {
          "body": "Delivery Update: Your delivery {{delivery_id}} is {{status}}."
        },
        "in_app": {
          "title": "Delivery Update",
          "body": "Your delivery {{delivery_id}} is {{status}}.",
          "action": "View Details"
        }
      },
      "variables": ["delivery_id", "status", "estimated_delivery", "courier_name"],
      "active": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/notifications/templates?type=delivery_update&active=true"
```

### 5. Create Notification Template
**POST** `/notifications/templates`

Creates a new notification template.

**Request Body:**
```json
{
  "name": "Payment Confirmation",
  "type": "payment_confirmation",
  "channels": ["email", "push", "in_app"],
  "subject": "Payment Confirmed: {{amount}} {{currency}}",
  "content": {
    "email": {
      "html": "<h1>Payment Confirmed</h1><p>Your payment of {{amount}} {{currency}} has been confirmed.</p>",
      "text": "Payment Confirmed: Your payment of {{amount}} {{currency}} has been confirmed."
    },
    "push": {
      "title": "Payment Confirmed",
      "body": "Your payment of {{amount}} {{currency}} has been confirmed."
    },
    "in_app": {
      "title": "Payment Confirmed",
      "body": "Your payment of {{amount}} {{currency}} has been confirmed.",
      "action": "View Receipt"
    }
  },
  "variables": ["amount", "currency", "payment_id", "delivery_id"],
  "active": true
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Payment Confirmation",
  "type": "payment_confirmation",
  "channels": ["email", "push", "in_app"],
  "subject": "Payment Confirmed: {{amount}} {{currency}}",
  "content": {
    "email": {
      "html": "<h1>Payment Confirmed</h1><p>Your payment of {{amount}} {{currency}} has been confirmed.</p>",
      "text": "Payment Confirmed: Your payment of {{amount}} {{currency}} has been confirmed."
    },
    "push": {
      "title": "Payment Confirmed",
      "body": "Your payment of {{amount}} {{currency}} has been confirmed."
    },
    "in_app": {
      "title": "Payment Confirmed",
      "body": "Your payment of {{amount}} {{currency}} has been confirmed.",
      "action": "View Receipt"
    }
  },
  "variables": ["amount", "currency", "payment_id", "delivery_id"],
  "active": true,
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/notifications/templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Payment Confirmation",
    "type": "payment_confirmation",
    "channels": ["email", "push", "in_app"],
    "subject": "Payment Confirmed: {{amount}} {{currency}}",
    "content": {
      "email": {
        "html": "<h1>Payment Confirmed</h1><p>Your payment of {{amount}} {{currency}} has been confirmed.</p>",
        "text": "Payment Confirmed: Your payment of {{amount}} {{currency}} has been confirmed."
      },
      "push": {
        "title": "Payment Confirmed",
        "body": "Your payment of {{amount}} {{currency}} has been confirmed."
      },
      "in_app": {
        "title": "Payment Confirmed",
        "body": "Your payment of {{amount}} {{currency}} has been confirmed.",
        "action": "View Receipt"
      }
    },
    "variables": ["amount", "currency", "payment_id", "delivery_id"],
    "active": true
  }'
```

### 6. Mark Notification as Read
**PUT** `/notifications/{id}/read`

Marks a notification as read.

**Path Parameters:**
- `id` (string, required): Notification UUID

**Response:**
```json
{
  "id": "uuid",
  "status": "read",
  "read_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/notifications/550e8400-e29b-41d4-a716-446655440000/read
```

### 7. Get Unread Notifications
**GET** `/notifications/unread`

Retrieves unread notifications for the authenticated user.

**Query Parameters:**
- `type` (string, optional): Filter by notification type
- `limit` (integer, optional): Number of notifications to return (default: 20)

**Response:**
```json
{
  "notifications": [
    {
      "id": "uuid",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "type": "delivery_update",
      "channels": ["email", "push"],
      "template_id": "delivery_update_template",
      "data": {
        "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
        "status": "out_for_delivery",
        "estimated_delivery": "2024-01-15T14:30:00Z",
        "courier_name": "John Smith"
      },
      "priority": "high",
      "status": "unread",
      "created_at": "2024-01-15T12:00:00Z"
    }
  ],
  "total": 1,
  "unread_count": 1
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/notifications/unread?type=delivery_update&limit=10"
```

### 8. Get Notification Analytics
**GET** `/notifications/analytics`

Retrieves notification analytics for the authenticated user.

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "period": "monthly",
  "total_notifications": 150,
  "delivery_stats": {
    "email": {
      "sent": 120,
      "delivered": 115,
      "failed": 5,
      "delivery_rate": 95.8
    },
    "push": {
      "sent": 100,
      "delivered": 95,
      "failed": 5,
      "delivery_rate": 95.0
    },
    "sms": {
      "sent": 50,
      "delivered": 48,
      "failed": 2,
      "delivery_rate": 96.0
    },
    "in_app": {
      "sent": 150,
      "delivered": 150,
      "failed": 0,
      "delivery_rate": 100.0
    }
  },
  "type_breakdown": {
    "delivery_update": 80,
    "payment_confirmation": 30,
    "trip_reminder": 25,
    "promotion": 15
  },
  "engagement_stats": {
    "total_read": 120,
    "read_rate": 80.0,
    "click_rate": 15.0,
    "unsubscribe_rate": 2.0
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/notifications/analytics?period=monthly&date_from=2024-01-01&date_to=2024-01-31"
```

## Database Tables

### notifications
Notification records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| type | text | Notification type |
| channels | text[] | Delivery channels |
| template_id | text | Template identifier |
| data | jsonb | Notification data |
| priority | text | Notification priority |
| status | text | Notification status |
| scheduled_for | timestamptz | Scheduled delivery time |
| created_at | timestamptz | Creation timestamp |
| read_at | timestamptz | Read timestamp |

### notification_templates
Message templates.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Template name |
| type | text | Template type |
| channels | text[] | Supported channels |
| subject | text | Email subject |
| content | jsonb | Channel-specific content |
| variables | text[] | Template variables |
| active | boolean | Template active status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### notification_preferences
User preferences.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| channel | text | Notification channel |
| enabled | boolean | Channel enabled status |
| types | text[] | Enabled notification types |
| frequency | text | Notification frequency |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### notification_deliveries
Delivery tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| notification_id | uuid | Foreign key to notifications table |
| channel | text | Delivery channel |
| status | text | Delivery status |
| delivered_at | timestamptz | Delivery timestamp |
| error | text | Error message |
| retry_count | integer | Retry attempts |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Multi-Channel Delivery
- Email notifications
- Push notifications
- SMS messages
- In-app notifications

### 2. Template Management
- Dynamic content
- Variable substitution
- Channel-specific formatting
- Version control

### 3. Preference Management
- User-controlled settings
- Channel preferences
- Type filtering
- Frequency control

### 4. Delivery Tracking
- Delivery status
- Error handling
- Retry logic
- Analytics

## Security Considerations

- User data is encrypted
- Templates are validated
- Delivery logs are secure
- Rate limiting enforced

## Integration Points

- **User Service**: User verification
- **Delivery Service**: Status updates
- **Payment Service**: Payment notifications
- **Trip Service**: Trip reminders

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_notification_data",
  "message": "Invalid notification data provided",
  "details": {
    "field": "channels",
    "issue": "Invalid channel specified"
  }
}
```

**404 Not Found:**
```json
{
  "error": "template_not_found",
  "message": "Notification template not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "notification_failed",
  "message": "Notification delivery failed",
  "details": {
    "channel": "sms",
    "error": "Invalid phone number format"
  }
}
```

## Rate Limiting

- Notification sending: 100 per hour per user
- Template creation: 10 per hour per user
- Preference updates: 20 per hour per user
- Analytics requests: 50 per hour per user

## Notification Types

### 1. Delivery Updates
- Status changes
- Location updates
- Delivery confirmations
- Exception notifications

### 2. Payment Notifications
- Payment confirmations
- Refund notifications
- Escrow releases
- Payout confirmations

### 3. Trip Reminders
- Upcoming trips
- Check-in reminders
- Departure alerts
- Arrival notifications

### 4. Promotional
- Special offers
- New features
- System updates
- Marketing campaigns