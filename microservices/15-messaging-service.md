# Messaging Service

## Overview
The Messaging Service manages real-time communication between users, couriers, and support. It handles chat messages, file sharing, and communication history.

## Purpose
- Real-time messaging between users
- File sharing and media support
- Communication history
- Support chat integration

## Data Ownership
- `messages` - Chat messages
- `conversations` - Conversation threads
- `message_attachments` - File attachments
- `message_reactions` - Message reactions

## API Endpoints

### 1. Send Message
**POST** `/messages/send`

Sends a message in a conversation.

**Request Body:**
```json
{
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "sender_id": "550e8400-e29b-41d4-a716-446655440001",
  "content": "Hello, I'm on my way to pick up your package.",
  "message_type": "text",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440002",
      "file_name": "delivery_photo.jpg",
      "file_type": "image/jpeg",
      "file_size": 1024000
    }
  ],
  "reply_to": "550e8400-e29b-41d4-a716-446655440003"
}
```

**Response:**
```json
{
  "id": "uuid",
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "sender_id": "550e8400-e29b-41d4-a716-446655440001",
  "content": "Hello, I'm on my way to pick up your package.",
  "message_type": "text",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440002",
      "file_name": "delivery_photo.jpg",
      "file_type": "image/jpeg",
      "file_size": 1024000,
      "url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440002"
    }
  ],
  "reply_to": "550e8400-e29b-41d4-a716-446655440003",
  "status": "sent",
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/messages/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
    "sender_id": "550e8400-e29b-41d4-a716-446655440001",
    "content": "Hello, I'\''m on my way to pick up your package.",
    "message_type": "text",
    "attachments": [
      {
        "file_id": "550e8400-e29b-41d4-a716-446655440002",
        "file_name": "delivery_photo.jpg",
        "file_type": "image/jpeg",
        "file_size": 1024000
      }
    ],
    "reply_to": "550e8400-e29b-41d4-a716-446655440003"
  }'
```

### 2. Get Conversation Messages
**GET** `/messages/conversation/{id}`

Retrieves messages in a conversation.

**Path Parameters:**
- `id` (string, required): Conversation UUID

**Query Parameters:**
- `limit` (integer, optional): Number of messages to return (default: 50)
- `offset` (integer, optional): Number of messages to skip (default: 0)
- `message_type` (string, optional): Filter by message type
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "messages": [
    {
      "id": "uuid",
      "sender_id": "550e8400-e29b-41d4-a716-446655440001",
      "content": "Hello, I'm on my way to pick up your package.",
      "message_type": "text",
      "attachments": [
        {
          "file_id": "550e8400-e29b-41d4-a716-446655440002",
          "file_name": "delivery_photo.jpg",
          "file_type": "image/jpeg",
          "file_size": 1024000,
          "url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440002"
        }
      ],
      "reply_to": "550e8400-e29b-41d4-a716-446655440003",
      "status": "sent",
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/messages/conversation/550e8400-e29b-41d4-a716-446655440000?limit=20&message_type=text"
```

### 3. Create Conversation
**POST** `/conversations/create`

Creates a new conversation between users.

**Request Body:**
```json
{
  "participants": [
    "550e8400-e29b-41d4-a716-446655440000",
    "550e8400-e29b-41d4-a716-446655440001"
  ],
  "conversation_type": "delivery",
  "context": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "title": "Delivery Communication",
  "is_group": false
}
```

**Response:**
```json
{
  "id": "uuid",
  "participants": [
    "550e8400-e29b-41d4-a716-446655440000",
    "550e8400-e29b-41d4-a716-446655440001"
  ],
  "conversation_type": "delivery",
  "context": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "title": "Delivery Communication",
  "is_group": false,
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/conversations/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "participants": [
      "550e8400-e29b-41d4-a716-446655440000",
      "550e8400-e29b-41d4-a716-446655440001"
    ],
    "conversation_type": "delivery",
    "context": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
      "trip_id": "550e8400-e29b-41d4-a716-446655440003"
    },
    "title": "Delivery Communication",
    "is_group": false
  }'
```

### 4. Get User Conversations
**GET** `/conversations/user/{id}`

Retrieves conversations for a specific user.

**Path Parameters:**
- `id` (string, required): User UUID

**Query Parameters:**
- `conversation_type` (string, optional): Filter by conversation type
- `status` (string, optional): Filter by conversation status
- `limit` (integer, optional): Number of conversations to return (default: 20)
- `offset` (integer, optional): Number of conversations to skip (default: 0)

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "conversations": [
    {
      "id": "uuid",
      "participants": [
        "550e8400-e29b-41d4-a716-446655440000",
        "550e8400-e29b-41d4-a716-446655440001"
      ],
      "conversation_type": "delivery",
      "context": {
        "delivery_id": "550e8400-e29b-41d4-a716-446655440002",
        "trip_id": "550e8400-e29b-41d4-a716-446655440003"
      },
      "title": "Delivery Communication",
      "is_group": false,
      "status": "active",
      "last_message": {
        "id": "uuid",
        "sender_id": "550e8400-e29b-41d4-a716-446655440001",
        "content": "Hello, I'm on my way to pick up your package.",
        "message_type": "text",
        "created_at": "2024-01-15T12:30:00Z"
      },
      "unread_count": 2,
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/conversations/user/550e8400-e29b-41d4-a716-446655440000?conversation_type=delivery&limit=10"
```

### 5. Mark Messages as Read
**PUT** `/messages/read`

Marks messages as read for a user.

**Request Body:**
```json
{
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "message_ids": [
    "550e8400-e29b-41d4-a716-446655440001",
    "550e8400-e29b-41d4-a716-446655440002"
  ]
}
```

**Response:**
```json
{
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "marked_read": 2,
  "marked_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/messages/read \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "message_ids": [
      "550e8400-e29b-41d4-a716-446655440001",
      "550e8400-e29b-41d4-a716-446655440002"
    ]
  }'
```

### 6. Add Message Reaction
**POST** `/messages/{id}/reaction`

Adds a reaction to a message.

**Path Parameters:**
- `id` (string, required): Message UUID

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "reaction": "👍",
  "action": "add"
}
```

**Response:**
```json
{
  "message_id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "reaction": "👍",
  "action": "add",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/messages/550e8400-e29b-41d4-a716-446655440000/reaction \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "reaction": "👍",
    "action": "add"
  }'
```

### 7. Get Message Attachments
**GET** `/messages/{id}/attachments`

Retrieves attachments for a specific message.

**Path Parameters:**
- `id` (string, required): Message UUID

**Response:**
```json
{
  "message_id": "uuid",
  "attachments": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440002",
      "file_name": "delivery_photo.jpg",
      "file_type": "image/jpeg",
      "file_size": 1024000,
      "url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440002",
      "thumbnail_url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440002/thumb",
      "created_at": "2024-01-15T12:30:00Z"
    }
  ],
  "total": 1
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/messages/550e8400-e29b-41d4-a716-446655440000/attachments
```

### 8. Delete Message
**DELETE** `/messages/{id}`

Deletes a message.

**Path Parameters:**
- `id` (string, required): Message UUID

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "reason": "user_request"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "deleted",
  "deleted_by": "550e8400-e29b-41d4-a716-446655440000",
  "deleted_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/messages/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "reason": "user_request"
  }'
```

## Database Tables

### messages
Chat messages.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| conversation_id | uuid | Foreign key to conversations table |
| sender_id | uuid | Foreign key to users table |
| content | text | Message content |
| message_type | text | Message type |
| attachments | jsonb | File attachments |
| reply_to | uuid | Foreign key to messages table |
| status | text | Message status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |
| deleted_at | timestamptz | Deletion timestamp |

### conversations
Conversation threads.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| participants | uuid[] | User participants |
| conversation_type | text | Type of conversation |
| context | jsonb | Conversation context |
| title | text | Conversation title |
| is_group | boolean | Group conversation flag |
| status | text | Conversation status |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Update timestamp |

### message_attachments
File attachments.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| message_id | uuid | Foreign key to messages table |
| file_id | uuid | Foreign key to files table |
| file_name | text | Original file name |
| file_type | text | MIME type |
| file_size | integer | File size in bytes |
| url | text | File URL |
| thumbnail_url | text | Thumbnail URL |
| created_at | timestamptz | Creation timestamp |

### message_reactions
Message reactions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| message_id | uuid | Foreign key to messages table |
| user_id | uuid | Foreign key to users table |
| reaction | text | Reaction emoji |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Real-Time Messaging
- WebSocket support
- Message delivery status
- Typing indicators
- Online presence

### 2. File Sharing
- Multiple file types
- Image thumbnails
- File size limits
- Secure storage

### 3. Message Management
- Message threading
- Reactions
- Message editing
- Message deletion

### 4. Conversation Management
- Group conversations
- Context awareness
- Participant management
- Conversation archiving

## Security Considerations

- Message content is encrypted
- File uploads are secure
- User permissions enforced
- Message history protected

## Integration Points

- **User Service**: User verification
- **File Service**: File storage
- **Notification Service**: Message notifications
- **Delivery Service**: Delivery context

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_message_data",
  "message": "Invalid message data provided",
  "details": {
    "field": "content",
    "issue": "Message content is required"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "conversation_access_denied",
  "message": "Access to conversation denied"
}
```

**404 Not Found:**
```json
{
  "error": "conversation_not_found",
  "message": "Conversation not found"
}
```

**413 Payload Too Large:**
```json
{
  "error": "file_too_large",
  "message": "File size exceeds limit",
  "details": {
    "max_size": "10MB",
    "file_size": "15MB"
  }
}
```

## Rate Limiting

- Message sending: 100 per hour per user
- File uploads: 20 per hour per user
- Reaction updates: 200 per hour per user
- Conversation creation: 10 per hour per user

## Message Types

### 1. Text Messages
- Plain text
- Rich text formatting
- Emoji support
- Link previews

### 2. File Messages
- Document sharing
- Image sharing
- Video sharing
- Audio messages

### 3. System Messages
- Delivery updates
- Status changes
- Automated notifications
- System alerts

### 4. Location Messages
- Location sharing
- Map integration
- Delivery tracking
- Meeting points