# Email Service

## Overview
The Email Service handles email delivery, template management, and email analytics. It provides reliable email communication across the platform.

## Purpose
- Email delivery and management
- Email template system
- Email analytics and tracking
- Email bounce and complaint handling

## Data Ownership
- `emails` - Email records and metadata
- `email_templates` - Email templates
- `email_deliveries` - Email delivery tracking
- `email_analytics` - Email performance metrics

## API Endpoints

### 1. Send Email
**POST** `/emails/send`

Sends an email to one or more recipients.

**Request Body:**
```json
{
  "to": [
    {
      "email": "user@example.com",
      "name": "John Doe"
    }
  ],
  "cc": [
    {
      "email": "cc@example.com",
      "name": "CC User"
    }
  ],
  "bcc": [
    {
      "email": "bcc@example.com",
      "name": "BCC User"
    }
  ],
  "subject": "Delivery Update - Package #12345",
  "template_id": "delivery_update_template",
  "template_data": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "out_for_delivery",
    "estimated_delivery": "2024-01-15T14:30:00Z",
    "courier_name": "John Smith",
    "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
  },
  "html_content": "<html><body>Your package is out for delivery...</body></html>",
  "text_content": "Your package is out for delivery...",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440001",
      "filename": "delivery_receipt.pdf",
      "content_type": "application/pdf"
    }
  ],
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z",
  "tracking_enabled": true,
  "unsubscribe_enabled": true
}
```

**Response:**
```json
{
  "email_id": "email_123456789",
  "message_id": "msg_123456789",
  "to": [
    {
      "email": "user@example.com",
      "name": "John Doe"
    }
  ],
  "cc": [
    {
      "email": "cc@example.com",
      "name": "CC User"
    }
  ],
  "bcc": [
    {
      "email": "bcc@example.com",
      "name": "BCC User"
    }
  ],
  "subject": "Delivery Update - Package #12345",
  "template_id": "delivery_update_template",
  "priority": "high",
  "scheduled_for": "2024-01-15T12:00:00Z",
  "status": "queued",
  "created_at": "2024-01-15T12:00:00Z",
  "estimated_delivery": "2024-01-15T12:05:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/emails/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "to": [
      {
        "email": "user@example.com",
        "name": "John Doe"
      }
    ],
    "cc": [
      {
        "email": "cc@example.com",
        "name": "CC User"
      }
    ],
    "bcc": [
      {
        "email": "bcc@example.com",
        "name": "BCC User"
      }
    ],
    "subject": "Delivery Update - Package #12345",
    "template_id": "delivery_update_template",
    "template_data": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "out_for_delivery",
      "estimated_delivery": "2024-01-15T14:30:00Z",
      "courier_name": "John Smith",
      "tracking_url": "https://delivery.com/track/550e8400-e29b-41d4-a716-446655440000"
    },
    "html_content": "<html><body>Your package is out for delivery...</body></html>",
    "text_content": "Your package is out for delivery...",
    "attachments": [
      {
        "file_id": "550e8400-e29b-41d4-a716-446655440001",
        "filename": "delivery_receipt.pdf",
        "content_type": "application/pdf"
      }
    ],
    "priority": "high",
    "scheduled_for": "2024-01-15T12:00:00Z",
    "tracking_enabled": true,
    "unsubscribe_enabled": true
  }'
```

### 2. Get Email Status
**GET** `/emails/{email_id}`

Retrieves email status and delivery information.

**Path Parameters:**
- `email_id` (string, required): Email UUID

**Response:**
```json
{
  "email_id": "email_123456789",
  "message_id": "msg_123456789",
  "to": [
    {
      "email": "user@example.com",
      "name": "John Doe",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:05:00Z"
    }
  ],
  "cc": [
    {
      "email": "cc@example.com",
      "name": "CC User",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:05:00Z"
    }
  ],
  "bcc": [
    {
      "email": "bcc@example.com",
      "name": "BCC User",
      "status": "delivered",
      "delivered_at": "2024-01-15T12:05:00Z"
    }
  ],
  "subject": "Delivery Update - Package #12345",
  "template_id": "delivery_update_template",
  "priority": "high",
  "status": "delivered",
  "created_at": "2024-01-15T12:00:00Z",
  "sent_at": "2024-01-15T12:00:05Z",
  "delivered_at": "2024-01-15T12:05:00Z",
  "opened_at": "2024-01-15T12:10:00Z",
  "clicked_at": "2024-01-15T12:15:00Z",
  "bounced_at": null,
  "complained_at": null,
  "unsubscribed_at": null,
  "tracking_data": {
    "opens": 1,
    "clicks": 1,
    "bounces": 0,
    "complaints": 0,
    "unsubscribes": 0
  }
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/emails/email_123456789
```

### 3. Create Email Template
**POST** `/emails/templates`

Creates a new email template.

**Request Body:**
```json
{
  "name": "Delivery Update Template",
  "subject": "Delivery Update - Package #{{delivery_id}}",
  "html_content": "<html><body><h1>Delivery Update</h1><p>Your package #{{delivery_id}} is {{status}}.</p><p>Estimated delivery: {{estimated_delivery}}</p><p>Courier: {{courier_name}}</p><p><a href=\"{{tracking_url}}\">Track Package</a></p></body></html>",
  "text_content": "Delivery Update\n\nYour package #{{delivery_id}} is {{status}}.\nEstimated delivery: {{estimated_delivery}}\nCourier: {{courier_name}}\nTrack Package: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "template_id": "delivery_update_template",
  "name": "Delivery Update Template",
  "subject": "Delivery Update - Package #{{delivery_id}}",
  "html_content": "<html><body><h1>Delivery Update</h1><p>Your package #{{delivery_id}} is {{status}}.</p><p>Estimated delivery: {{estimated_delivery}}</p><p>Courier: {{courier_name}}</p><p><a href=\"{{tracking_url}}\">Track Package</a></p></body></html>",
  "text_content": "Delivery Update\n\nYour package #{{delivery_id}} is {{status}}.\nEstimated delivery: {{estimated_delivery}}\nCourier: {{courier_name}}\nTrack Package: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/emails/templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Delivery Update Template",
    "subject": "Delivery Update - Package #{{delivery_id}}",
    "html_content": "<html><body><h1>Delivery Update</h1><p>Your package #{{delivery_id}} is {{status}}.</p><p>Estimated delivery: {{estimated_delivery}}</p><p>Courier: {{courier_name}}</p><p><a href=\"{{tracking_url}}\">Track Package</a></p></body></html>",
    "text_content": "Delivery Update\n\nYour package #{{delivery_id}} is {{status}}.\nEstimated delivery: {{estimated_delivery}}\nCourier: {{courier_name}}\nTrack Package: {{tracking_url}}",
    "category": "delivery",
    "tags": ["delivery", "update", "notification"],
    "variables": [
      {
        "name": "delivery_id",
        "type": "string",
        "required": true,
        "description": "Delivery identifier"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "description": "Delivery status"
      },
      {
        "name": "estimated_delivery",
        "type": "datetime",
        "required": false,
        "description": "Estimated delivery time"
      },
      {
        "name": "courier_name",
        "type": "string",
        "required": false,
        "description": "Courier name"
      },
      {
        "name": "tracking_url",
        "type": "url",
        "required": false,
        "description": "Tracking URL"
      }
    ],
    "created_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 4. Get Email Templates
**GET** `/emails/templates`

Retrieves email templates with filtering.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `tags` (string[], optional): Filter by tags
- `status` (string, optional): Filter by status
- `created_by` (string, optional): Filter by creator
- `limit` (integer, optional): Number of templates (default: 50)
- `offset` (integer, optional): Number of templates to skip (default: 0)

**Response:**
```json
{
  "templates": [
    {
      "template_id": "delivery_update_template",
      "name": "Delivery Update Template",
      "subject": "Delivery Update - Package #{{delivery_id}}",
      "category": "delivery",
      "tags": ["delivery", "update", "notification"],
      "status": "active",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-15T12:30:00Z",
      "updated_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "category": "delivery",
    "tags": ["delivery", "update"],
    "status": "active"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/emails/templates?category=delivery&tags=delivery,update&status=active&limit=50&offset=0"
```

### 5. Update Email Template
**PUT** `/emails/templates/{template_id}`

Updates an existing email template.

**Path Parameters:**
- `template_id` (string, required): Template identifier

**Request Body:**
```json
{
  "name": "Updated Delivery Update Template",
  "subject": "Updated Delivery Update - Package #{{delivery_id}}",
  "html_content": "<html><body><h1>Updated Delivery Update</h1><p>Your package #{{delivery_id}} is {{status}}.</p><p>Estimated delivery: {{estimated_delivery}}</p><p>Courier: {{courier_name}}</p><p><a href=\"{{tracking_url}}\">Track Package</a></p></body></html>",
  "text_content": "Updated Delivery Update\n\nYour package #{{delivery_id}} is {{status}}.\nEstimated delivery: {{estimated_delivery}}\nCourier: {{courier_name}}\nTrack Package: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification", "updated"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "template_id": "delivery_update_template",
  "name": "Updated Delivery Update Template",
  "subject": "Updated Delivery Update - Package #{{delivery_id}}",
  "html_content": "<html><body><h1>Updated Delivery Update</h1><p>Your package #{{delivery_id}} is {{status}}.</p><p>Estimated delivery: {{estimated_delivery}}</p><p>Courier: {{courier_name}}</p><p><a href=\"{{tracking_url}}\">Track Package</a></p></body></html>",
  "text_content": "Updated Delivery Update\n\nYour package #{{delivery_id}} is {{status}}.\nEstimated delivery: {{estimated_delivery}}\nCourier: {{courier_name}}\nTrack Package: {{tracking_url}}",
  "category": "delivery",
  "tags": ["delivery", "update", "notification", "updated"],
  "variables": [
    {
      "name": "delivery_id",
      "type": "string",
      "required": true,
      "description": "Delivery identifier"
    },
    {
      "name": "status",
      "type": "string",
      "required": true,
      "description": "Delivery status"
    },
    {
      "name": "estimated_delivery",
      "type": "datetime",
      "required": false,
      "description": "Estimated delivery time"
    },
    {
      "name": "courier_name",
      "type": "string",
      "required": false,
      "description": "Courier name"
    },
    {
      "name": "tracking_url",
      "type": "url",
      "required": false,
      "description": "Tracking URL"
    }
  ],
  "status": "active",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/emails/templates/delivery_update_template \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Updated Delivery Update Template",
    "subject": "Updated Delivery Update - Package #{{delivery_id}}",
    "html_content": "<html><body><h1>Updated Delivery Update</h1><p>Your package #{{delivery_id}} is {{status}}.</p><p>Estimated delivery: {{estimated_delivery}}</p><p>Courier: {{courier_name}}</p><p><a href=\"{{tracking_url}}\">Track Package</a></p></body></html>",
    "text_content": "Updated Delivery Update\n\nYour package #{{delivery_id}} is {{status}}.\nEstimated delivery: {{estimated_delivery}}\nCourier: {{courier_name}}\nTrack Package: {{tracking_url}}",
    "category": "delivery",
    "tags": ["delivery", "update", "notification", "updated"],
    "variables": [
      {
        "name": "delivery_id",
        "type": "string",
        "required": true,
        "description": "Delivery identifier"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "description": "Delivery status"
      },
      {
        "name": "estimated_delivery",
        "type": "datetime",
        "required": false,
        "description": "Estimated delivery time"
      },
      {
        "name": "courier_name",
        "type": "string",
        "required": false,
        "description": "Courier name"
      },
      {
        "name": "tracking_url",
        "type": "url",
        "required": false,
        "description": "Tracking URL"
      }
    ],
    "updated_by": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### 6. Get Email Analytics
**GET** `/emails/analytics`

Retrieves email performance analytics.

**Query Parameters:**
- `template_id` (string, optional): Filter by template
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `category` (string, optional): Filter by category

**Response:**
```json
{
  "overview": {
    "total_emails": 1000000,
    "delivered": 950000,
    "opened": 500000,
    "clicked": 100000,
    "bounced": 25000,
    "complained": 1000,
    "unsubscribed": 500
  },
  "rates": {
    "delivery_rate": 0.95,
    "open_rate": 0.53,
    "click_rate": 0.11,
    "bounce_rate": 0.03,
    "complaint_rate": 0.001,
    "unsubscribe_rate": 0.0005
  },
  "template_performance": [
    {
      "template_id": "delivery_update_template",
      "name": "Delivery Update Template",
      "emails_sent": 100000,
      "delivered": 95000,
      "opened": 50000,
      "clicked": 10000,
      "bounced": 3000,
      "complained": 100,
      "unsubscribed": 50,
      "delivery_rate": 0.95,
      "open_rate": 0.53,
      "click_rate": 0.11
    }
  ],
  "category_breakdown": [
    {
      "category": "delivery",
      "emails_sent": 600000,
      "delivered": 570000,
      "opened": 300000,
      "clicked": 60000,
      "delivery_rate": 0.95,
      "open_rate": 0.53,
      "click_rate": 0.11
    },
    {
      "category": "notification",
      "emails_sent": 300000,
      "delivered": 285000,
      "opened": 150000,
      "clicked": 30000,
      "delivery_rate": 0.95,
      "open_rate": 0.53,
      "click_rate": 0.11
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "emails_sent": 10000,
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
curl -X GET "https://api.delivery.com/emails/analytics?template_id=delivery_update_template&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&category=delivery"
```

### 7. Handle Email Bounce
**POST** `/emails/bounces`

Handles email bounce events.

**Request Body:**
```json
{
  "email_id": "email_123456789",
  "bounce_type": "hard",
  "bounce_reason": "invalid_email",
  "bounce_message": "The email address does not exist",
  "bounced_at": "2024-01-15T12:30:00Z",
  "recipient_email": "user@example.com"
}
```

**Response:**
```json
{
  "email_id": "email_123456789",
  "bounce_type": "hard",
  "bounce_reason": "invalid_email",
  "bounce_message": "The email address does not exist",
  "bounced_at": "2024-01-15T12:30:00Z",
  "recipient_email": "user@example.com",
  "processed": true,
  "processed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/emails/bounces \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "email_id": "email_123456789",
    "bounce_type": "hard",
    "bounce_reason": "invalid_email",
    "bounce_message": "The email address does not exist",
    "bounced_at": "2024-01-15T12:30:00Z",
    "recipient_email": "user@example.com"
  }'
```

### 8. Handle Email Complaint
**POST** `/emails/complaints`

Handles email complaint events.

**Request Body:**
```json
{
  "email_id": "email_123456789",
  "complaint_type": "spam",
  "complaint_reason": "User marked as spam",
  "complaint_message": "This email was marked as spam by the recipient",
  "complained_at": "2024-01-15T12:30:00Z",
  "recipient_email": "user@example.com"
}
```

**Response:**
```json
{
  "email_id": "email_123456789",
  "complaint_type": "spam",
  "complaint_reason": "User marked as spam",
  "complaint_message": "This email was marked as spam by the recipient",
  "complained_at": "2024-01-15T12:30:00Z",
  "recipient_email": "user@example.com",
  "processed": true,
  "processed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/emails/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "email_id": "email_123456789",
    "complaint_type": "spam",
    "complaint_reason": "User marked as spam",
    "complaint_message": "This email was marked as spam by the recipient",
    "complained_at": "2024-01-15T12:30:00Z",
    "recipient_email": "user@example.com"
  }'
```

## Database Tables

### emails
Email records and metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email_id | text | Email identifier |
| message_id | text | Message identifier |
| to | jsonb | Recipient information |
| cc | jsonb | CC recipient information |
| bcc | jsonb | BCC recipient information |
| subject | text | Email subject |
| template_id | text | Template identifier |
| template_data | jsonb | Template data |
| html_content | text | HTML content |
| text_content | text | Text content |
| priority | text | Email priority |
| scheduled_for | timestamptz | Scheduled send time |
| status | text | Email status |
| created_at | timestamptz | Creation timestamp |
| sent_at | timestamptz | Send timestamp |
| delivered_at | timestamptz | Delivery timestamp |
| opened_at | timestamptz | Open timestamp |
| clicked_at | timestamptz | Click timestamp |
| bounced_at | timestamptz | Bounce timestamp |
| complained_at | timestamptz | Complaint timestamp |
| unsubscribed_at | timestamptz | Unsubscribe timestamp |

### email_templates
Email templates.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| template_id | text | Template identifier |
| name | text | Template name |
| subject | text | Email subject |
| html_content | text | HTML content |
| text_content | text | Text content |
| category | text | Template category |
| tags | text[] | Template tags |
| variables | jsonb | Template variables |
| status | text | Template status |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |
| updated_by | uuid | Last updater user ID |
| updated_at | timestamptz | Last update timestamp |

### email_deliveries
Email delivery tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email_id | uuid | Reference to emails |
| recipient_email | text | Recipient email |
| status | text | Delivery status |
| delivered_at | timestamptz | Delivery timestamp |
| opened_at | timestamptz | Open timestamp |
| clicked_at | timestamptz | Click timestamp |
| bounced_at | timestamptz | Bounce timestamp |
| complained_at | timestamptz | Complaint timestamp |
| unsubscribed_at | timestamptz | Unsubscribe timestamp |
| created_at | timestamptz | Creation timestamp |

### email_analytics
Email performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_value | decimal | Metric value |
| template_id | text | Template identifier |
| category | text | Email category |
| date | date | Metric date |
| hour | integer | Metric hour |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Email Delivery
- Reliable email sending
- Delivery tracking
- Bounce handling
- Complaint management

### 2. Template System
- Dynamic templates
- Variable substitution
- Template versioning
- Template management

### 3. Analytics & Tracking
- Open tracking
- Click tracking
- Bounce tracking
- Complaint tracking

### 4. Email Management
- Email scheduling
- Priority handling
- Attachment support
- Unsubscribe handling

## Security Considerations

- Email validation
- Spam prevention
- Unsubscribe compliance
- Data privacy

## Integration Points

- **Notification Service**: Email notifications
- **User Service**: User email preferences
- **Delivery Service**: Delivery notifications
- **Analytics Service**: Email metrics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_email",
  "message": "Invalid email address",
  "details": {
    "field": "to",
    "issue": "Invalid email format"
  }
}
```

**404 Not Found:**
```json
{
  "error": "template_not_found",
  "message": "Email template not found",
  "details": {
    "template_id": "delivery_update_template"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "template_validation_failed",
  "message": "Template validation failed",
  "details": {
    "issues": [
      "Missing required variable: delivery_id",
      "Invalid variable type: status"
    ]
  }
}
```

## Rate Limiting

- Email sending: 1000 per hour per user
- Template operations: 100 per hour per user
- Analytics queries: 50 per hour per user
- Bounce/complaint handling: 1000 per hour per user

## Email Features

### 1. Email Types
- Transactional
- Marketing
- Notification
- System

### 2. Template Variables
- String variables
- Date variables
- URL variables
- Custom variables

### 3. Delivery Status
- Queued
- Sent
- Delivered
- Opened
- Clicked
- Bounced
- Complained
- Unsubscribed

### 4. Email Categories
- Delivery
- Payment
- User
- System
- Marketing