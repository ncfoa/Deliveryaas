# Support Service

## Overview
The Support Service manages customer support tickets, help desk operations, and support analytics. It handles ticket creation, assignment, resolution, and knowledge base management.

## Purpose
- Customer support ticket management
- Help desk operations
- Knowledge base management
- Support analytics and reporting

## Data Ownership
- `support_tickets` - Support ticket records
- `ticket_messages` - Ticket conversation messages
- `knowledge_base` - Help articles and FAQs
- `support_analytics` - Support performance metrics

## API Endpoints

### 1. Create Support Ticket
**POST** `/support/tickets/create`

Creates a new support ticket.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "category": "delivery_issue",
  "priority": "high",
  "subject": "Package not delivered on time",
  "description": "My package was supposed to be delivered yesterday but it's still showing as in transit. Can you help me track it down?",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440001",
      "file_name": "delivery_receipt.pdf",
      "file_type": "application/pdf"
    }
  ],
  "related_entities": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "contact_preference": "email"
}
```

**Response:**
```json
{
  "id": "uuid",
  "ticket_number": "SUP-2024-001234",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "category": "delivery_issue",
  "priority": "high",
  "subject": "Package not delivered on time",
  "description": "My package was supposed to be delivered yesterday but it's still showing as in transit. Can you help me track it down?",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440001",
      "file_name": "delivery_receipt.pdf",
      "file_type": "application/pdf",
      "url": "https://storage.delivery.com/support/550e8400-e29b-41d4-a716-446655440001"
    }
  ],
  "related_entities": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "contact_preference": "email",
  "status": "open",
  "assigned_to": null,
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/support/tickets/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "category": "delivery_issue",
    "priority": "high",
    "subject": "Package not delivered on time",
    "description": "My package was supposed to be delivered yesterday but it's still showing as in transit. Can you help me track it down?",
    "attachments": [
      {
        "file_id": "550e8400-e29b-41d4-a716-446655440001",
        "file_name": "delivery_receipt.pdf",
        "file_type": "application/pdf"
      }
    ],
    "related_entities": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
      "trip_id": "550e8400-e29b-41d4-a716-446655440003"
    },
    "contact_preference": "email"
  }'
```

### 2. Get Support Ticket
**GET** `/support/tickets/{id}`

Retrieves a specific support ticket.

**Path Parameters:**
- `id` (string, required): Ticket UUID

**Response:**
```json
{
  "id": "uuid",
  "ticket_number": "SUP-2024-001234",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "category": "delivery_issue",
  "priority": "high",
  "subject": "Package not delivered on time",
  "description": "My package was supposed to be delivered yesterday but it's still showing as in transit. Can you help me track it down?",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440001",
      "file_name": "delivery_receipt.pdf",
      "file_type": "application/pdf",
      "url": "https://storage.delivery.com/support/550e8400-e29b-41d4-a716-446655440001"
    }
  ],
  "related_entities": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "contact_preference": "email",
  "status": "in_progress",
  "assigned_to": {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@delivery.com"
  },
  "messages": [
    {
      "id": "uuid",
      "sender_id": "550e8400-e29b-41d4-a716-446655440000",
      "sender_type": "user",
      "content": "My package was supposed to be delivered yesterday but it's still showing as in transit. Can you help me track it down?",
      "attachments": [],
      "created_at": "2024-01-15T12:30:00Z"
    },
    {
      "id": "uuid",
      "sender_id": "550e8400-e29b-41d4-a716-446655440004",
      "sender_type": "agent",
      "content": "I've looked into your delivery and it appears there was a delay in transit. I've contacted the courier and they should be delivering it today. I'll keep you updated.",
      "attachments": [],
      "created_at": "2024-01-15T14:30:00Z"
    }
  ],
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T14:30:00Z",
  "resolved_at": null
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/support/tickets/550e8400-e29b-41d4-a716-446655440000
```

### 3. Get User Support Tickets
**GET** `/support/tickets/user/{id}`

Retrieves support tickets for a specific user.

**Path Parameters:**
- `id` (string, required): User UUID

**Query Parameters:**
- `status` (string, optional): Filter by ticket status
- `category` (string, optional): Filter by ticket category
- `priority` (string, optional): Filter by ticket priority
- `limit` (integer, optional): Number of tickets to return (default: 20)
- `offset` (integer, optional): Number of tickets to skip (default: 0)

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "tickets": [
    {
      "id": "uuid",
      "ticket_number": "SUP-2024-001234",
      "category": "delivery_issue",
      "priority": "high",
      "subject": "Package not delivered on time",
      "status": "in_progress",
      "assigned_to": {
        "id": "550e8400-e29b-41d4-a716-446655440004",
        "name": "Sarah Johnson"
      },
      "created_at": "2024-01-15T12:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/support/tickets/user/550e8400-e29b-41d4-a716-446655440000?status=open&limit=10"
```

### 4. Add Message to Ticket
**POST** `/support/tickets/{id}/messages`

Adds a message to a support ticket.

**Path Parameters:**
- `id` (string, required): Ticket UUID

**Request Body:**
```json
{
  "sender_id": "550e8400-e29b-41d4-a716-446655440000",
  "sender_type": "user",
  "content": "Thank you for the update. I'll wait for the delivery today and let you know if there are any issues.",
  "attachments": []
}
```

**Response:**
```json
{
  "id": "uuid",
  "ticket_id": "550e8400-e29b-41d4-a716-446655440000",
  "sender_id": "550e8400-e29b-41d4-a716-446655440000",
  "sender_type": "user",
  "content": "Thank you for the update. I'll wait for the delivery today and let you know if there are any issues.",
  "attachments": [],
  "created_at": "2024-01-15T16:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/support/tickets/550e8400-e29b-41d4-a716-446655440000/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "sender_id": "550e8400-e29b-41d4-a716-446655440000",
    "sender_type": "user",
    "content": "Thank you for the update. I'\''ll wait for the delivery today and let you know if there are any issues.",
    "attachments": []
  }'
```

### 5. Update Ticket Status
**PUT** `/support/tickets/{id}/status`

Updates the status of a support ticket.

**Path Parameters:**
- `id` (string, required): Ticket UUID

**Request Body:**
```json
{
  "status": "resolved",
  "resolution": "Package was delivered successfully",
  "resolved_by": "550e8400-e29b-41d4-a716-446655440004",
  "notes": "Customer confirmed delivery was successful"
}
```

**Response:**
```json
{
  "id": "uuid",
  "ticket_number": "SUP-2024-001234",
  "status": "resolved",
  "resolution": "Package was delivered successfully",
  "resolved_by": "550e8400-e29b-41d4-a716-446655440004",
  "notes": "Customer confirmed delivery was successful",
  "resolved_at": "2024-01-15T18:30:00Z",
  "updated_at": "2024-01-15T18:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/support/tickets/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "status": "resolved",
    "resolution": "Package was delivered successfully",
    "resolved_by": "550e8400-e29b-41d4-a716-446655440004",
    "notes": "Customer confirmed delivery was successful"
  }'
```

### 6. Assign Ticket
**PUT** `/support/tickets/{id}/assign`

Assigns a support ticket to an agent.

**Path Parameters:**
- `id` (string, required): Ticket UUID

**Request Body:**
```json
{
  "assigned_to": "550e8400-e29b-41d4-a716-446655440004",
  "assigned_by": "550e8400-e29b-41d4-a716-446655440005",
  "notes": "Assigned to Sarah Johnson for delivery issue resolution"
}
```

**Response:**
```json
{
  "id": "uuid",
  "ticket_number": "SUP-2024-001234",
  "assigned_to": {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@delivery.com"
  },
  "assigned_by": "550e8400-e29b-41d4-a716-446655440005",
  "notes": "Assigned to Sarah Johnson for delivery issue resolution",
  "assigned_at": "2024-01-15T13:30:00Z",
  "updated_at": "2024-01-15T13:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/support/tickets/550e8400-e29b-41d4-a716-446655440000/assign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "assigned_to": "550e8400-e29b-41d4-a716-446655440004",
    "assigned_by": "550e8400-e29b-41d4-a716-446655440005",
    "notes": "Assigned to Sarah Johnson for delivery issue resolution"
  }'
```

### 7. Get Knowledge Base Articles
**GET** `/support/knowledge-base`

Retrieves knowledge base articles.

**Query Parameters:**
- `category` (string, optional): Filter by article category
- `search` (string, optional): Search query
- `limit` (integer, optional): Number of articles to return (default: 20)
- `offset` (integer, optional): Number of articles to skip (default: 0)

**Response:**
```json
{
  "articles": [
    {
      "id": "uuid",
      "title": "How to track your delivery",
      "category": "delivery",
      "content": "To track your delivery, go to the 'My Deliveries' section in the app...",
      "tags": ["tracking", "delivery", "status"],
      "views": 1250,
      "helpful_votes": 45,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/support/knowledge-base?category=delivery&search=tracking&limit=10"
```

### 8. Get Support Analytics
**GET** `/support/analytics`

Retrieves support analytics and metrics.

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `agent_id` (string, optional): Filter by agent

**Response:**
```json
{
  "period": "monthly",
  "total_tickets": 1250,
  "ticket_status": {
    "open": 45,
    "in_progress": 78,
    "resolved": 1100,
    "closed": 27
  },
  "category_breakdown": {
    "delivery_issue": 450,
    "payment_issue": 200,
    "account_issue": 150,
    "technical_issue": 300,
    "other": 150
  },
  "priority_breakdown": {
    "low": 300,
    "medium": 600,
    "high": 250,
    "urgent": 100
  },
  "resolution_metrics": {
    "average_resolution_time": "2.5 hours",
    "first_response_time": "15 minutes",
    "resolution_rate": 88.0,
    "customer_satisfaction": 4.2
  },
  "agent_performance": [
    {
      "agent_id": "550e8400-e29b-41d4-a716-446655440004",
      "name": "Sarah Johnson",
      "tickets_resolved": 150,
      "average_resolution_time": "2.1 hours",
      "customer_satisfaction": 4.5
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/support/analytics?period=monthly&date_from=2024-01-01&date_to=2024-01-31"
```

## Database Tables

### support_tickets
Support ticket records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| ticket_number | text | Unique ticket number |
| user_id | uuid | Foreign key to users table |
| category | text | Ticket category |
| priority | text | Ticket priority |
| subject | text | Ticket subject |
| description | text | Ticket description |
| attachments | jsonb | File attachments |
| related_entities | jsonb | Related delivery/trip IDs |
| contact_preference | text | Preferred contact method |
| status | text | Ticket status |
| assigned_to | uuid | Foreign key to users table |
| resolution | text | Resolution details |
| resolved_by | uuid | Foreign key to users table |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |
| resolved_at | timestamptz | Resolution timestamp |

### ticket_messages
Ticket conversation messages.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| ticket_id | uuid | Foreign key to support_tickets table |
| sender_id | uuid | Foreign key to users table |
| sender_type | text | Sender type (user, agent, system) |
| content | text | Message content |
| attachments | jsonb | Message attachments |
| created_at | timestamptz | Creation timestamp |

### knowledge_base
Help articles and FAQs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Article title |
| category | text | Article category |
| content | text | Article content |
| tags | text[] | Article tags |
| views | integer | View count |
| helpful_votes | integer | Helpful vote count |
| status | text | Article status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### support_analytics
Support performance metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| period | text | Analytics period |
| total_tickets | integer | Total ticket count |
| ticket_status | jsonb | Status breakdown |
| category_breakdown | jsonb | Category breakdown |
| priority_breakdown | jsonb | Priority breakdown |
| resolution_metrics | jsonb | Resolution metrics |
| agent_performance | jsonb | Agent performance data |
| generated_at | timestamptz | Generation timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Ticket Management
- Ticket creation and tracking
- Status management
- Priority handling
- Assignment workflow

### 2. Communication
- Multi-channel messaging
- File attachments
- Real-time updates
- Notification system

### 3. Knowledge Base
- Help articles
- FAQ management
- Search functionality
- Content analytics

### 4. Analytics
- Performance metrics
- Agent analytics
- Customer satisfaction
- Resolution tracking

## Security Considerations

- Ticket data is encrypted
- Access control enforced
- Audit trail maintained
- Privacy protection

## Integration Points

- **User Service**: User verification
- **Notification Service**: Ticket notifications
- **File Service**: Attachment storage
- **Analytics Service**: Performance metrics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_ticket_data",
  "message": "Invalid ticket data provided",
  "details": {
    "field": "category",
    "issue": "Invalid category specified"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "ticket_access_denied",
  "message": "Access to ticket denied"
}
```

**404 Not Found:**
```json
{
  "error": "ticket_not_found",
  "message": "Support ticket not found"
}
```

**409 Conflict:**
```json
{
  "error": "ticket_already_assigned",
  "message": "Ticket is already assigned to another agent"
}
```

## Rate Limiting

- Ticket creation: 10 per hour per user
- Message sending: 50 per hour per user
- Status updates: 20 per hour per user
- Knowledge base access: 100 per hour per user

## Ticket Categories

### 1. Delivery Issues
- Package not delivered
- Delivery delays
- Wrong address
- Package damage

### 2. Payment Issues
- Payment failures
- Refund requests
- Billing questions
- Escrow issues

### 3. Account Issues
- Login problems
- Profile updates
- Verification issues
- Account suspension

### 4. Technical Issues
- App problems
- Website issues
- API errors
- Integration problems

### 5. General Inquiries
- Service questions
- Feature requests
- Feedback
- Other support