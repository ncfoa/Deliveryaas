# File Service

## Overview
The File Service manages file storage, uploads, downloads, and metadata using S3/GCS. It handles file processing, transformations, and access control.

## Purpose
- File storage and management
- File upload and download
- File processing and transformations
- File access control and security

## Data Ownership
- `files` - File metadata and information
- `file_versions` - File version history
- `file_access` - File access permissions
- `file_processing` - File processing jobs

## API Endpoints

### 1. Upload File
**POST** `/files/upload`

Uploads a file to storage.

**Request Body:**
```json
{
  "file": "base64_encoded_file_content",
  "filename": "delivery_photo.jpg",
  "content_type": "image/jpeg",
  "file_size": 1024000,
  "category": "delivery",
  "tags": ["delivery", "photo", "proof"],
  "access_level": "private",
  "expires_at": "2024-02-15T12:30:00Z",
  "metadata": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
    "description": "Delivery proof photo"
  }
}
```

**Response:**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "filename": "delivery_photo.jpg",
  "content_type": "image/jpeg",
  "file_size": 1024000,
  "storage_url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440000",
  "storage_path": "files/550e8400-e29b-41d4-a716-446655440000",
  "category": "delivery",
  "tags": ["delivery", "photo", "proof"],
  "access_level": "private",
  "expires_at": "2024-02-15T12:30:00Z",
  "checksum": "sha256:abc123def456...",
  "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
  "uploaded_at": "2024-01-15T12:30:00Z",
  "status": "uploaded"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/files/upload \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "file": "base64_encoded_file_content",
    "filename": "delivery_photo.jpg",
    "content_type": "image/jpeg",
    "file_size": 1024000,
    "category": "delivery",
    "tags": ["delivery", "photo", "proof"],
    "access_level": "private",
    "expires_at": "2024-02-15T12:30:00Z",
    "metadata": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
      "description": "Delivery proof photo"
    }
  }'
```

### 2. Get File
**GET** `/files/{file_id}`

Retrieves file information and download URL.

**Path Parameters:**
- `file_id` (string, required): File UUID

**Query Parameters:**
- `include_metadata` (boolean, optional): Include file metadata
- `include_versions` (boolean, optional): Include file versions
- `download_url` (boolean, optional): Include download URL

**Response:**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "filename": "delivery_photo.jpg",
  "content_type": "image/jpeg",
  "file_size": 1024000,
  "storage_url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440000",
  "download_url": "https://api.delivery.com/files/550e8400-e29b-41d4-a716-446655440000/download?token=download_token_here",
  "storage_path": "files/550e8400-e29b-41d4-a716-446655440000",
  "category": "delivery",
  "tags": ["delivery", "photo", "proof"],
  "access_level": "private",
  "expires_at": "2024-02-15T12:30:00Z",
  "checksum": "sha256:abc123def456...",
  "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
  "uploaded_at": "2024-01-15T12:30:00Z",
  "status": "available",
  "metadata": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
    "description": "Delivery proof photo"
  },
  "versions": [
    {
      "version": 1,
      "filename": "delivery_photo.jpg",
      "file_size": 1024000,
      "created_at": "2024-01-15T12:30:00Z"
    }
  ]
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/files/550e8400-e29b-41d4-a716-446655440000?include_metadata=true&include_versions=true&download_url=true"
```

### 3. Download File
**GET** `/files/{file_id}/download`

Downloads a file with access control.

**Path Parameters:**
- `file_id` (string, required): File UUID

**Query Parameters:**
- `token` (string, optional): Download token
- `version` (integer, optional): File version
- `format` (string, optional): Download format

**Response:**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "filename": "delivery_photo.jpg",
  "content_type": "image/jpeg",
  "file_size": 1024000,
  "download_url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440000?token=download_token_here",
  "expires_at": "2024-01-15T13:30:00Z",
  "download_count": 1,
  "last_downloaded": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/files/550e8400-e29b-41d4-a716-446655440000/download?token=download_token_here&version=1&format=original"
```

### 4. Update File
**PUT** `/files/{file_id}`

Updates file metadata and properties.

**Path Parameters:**
- `file_id` (string, required): File UUID

**Request Body:**
```json
{
  "filename": "updated_delivery_photo.jpg",
  "category": "delivery",
  "tags": ["delivery", "photo", "proof", "updated"],
  "access_level": "private",
  "expires_at": "2024-03-15T12:30:00Z",
  "metadata": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
    "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
    "description": "Updated delivery proof photo",
    "updated_reason": "Better quality photo"
  },
  "updated_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "filename": "updated_delivery_photo.jpg",
  "content_type": "image/jpeg",
  "file_size": 1024000,
  "storage_url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440000",
  "storage_path": "files/550e8400-e29b-41d4-a716-446655440000",
  "category": "delivery",
  "tags": ["delivery", "photo", "proof", "updated"],
  "access_level": "private",
  "expires_at": "2024-03-15T12:30:00Z",
  "checksum": "sha256:abc123def456...",
  "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
  "uploaded_at": "2024-01-15T12:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440001",
  "updated_at": "2024-01-15T14:30:00Z",
  "status": "available"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/files/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "filename": "updated_delivery_photo.jpg",
    "category": "delivery",
    "tags": ["delivery", "photo", "proof", "updated"],
    "access_level": "private",
    "expires_at": "2024-03-15T12:30:00Z",
    "metadata": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440000",
      "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
      "description": "Updated delivery proof photo",
      "updated_reason": "Better quality photo"
    },
    "updated_by": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 5. Delete File
**DELETE** `/files/{file_id}`

Deletes a file and its metadata.

**Path Parameters:**
- `file_id` (string, required): File UUID

**Request Body:**
```json
{
  "permanent": false,
  "reason": "User requested deletion",
  "deleted_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "deleted": true,
  "permanent": false,
  "deleted_at": "2024-01-15T14:30:00Z",
  "deleted_by": "550e8400-e29b-41d4-a716-446655440001",
  "reason": "User requested deletion",
  "can_restore": true,
  "restore_expires_at": "2024-02-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/files/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "permanent": false,
    "reason": "User requested deletion",
    "deleted_by": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 6. List Files
**GET** `/files`

Lists files with filtering and pagination.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `tags` (string[], optional): Filter by tags
- `access_level` (string, optional): Filter by access level
- `uploaded_by` (string, optional): Filter by uploader
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of files (default: 50)
- `offset` (integer, optional): Number of files to skip (default: 0)

**Response:**
```json
{
  "files": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440000",
      "filename": "delivery_photo.jpg",
      "content_type": "image/jpeg",
      "file_size": 1024000,
      "storage_url": "https://storage.delivery.com/files/550e8400-e29b-41d4-a716-446655440000",
      "category": "delivery",
      "tags": ["delivery", "photo", "proof"],
      "access_level": "private",
      "expires_at": "2024-02-15T12:30:00Z",
      "uploaded_by": "550e8400-e29b-41d4-a716-446655440001",
      "uploaded_at": "2024-01-15T12:30:00Z",
      "status": "available"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "category": "delivery",
    "tags": ["delivery", "photo"],
    "access_level": "private"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/files?category=delivery&tags=delivery,photo&access_level=private&limit=50&offset=0"
```

### 7. Process File
**POST** `/files/{file_id}/process`

Initiates file processing (resize, convert, etc.).

**Path Parameters:**
- `file_id` (string, required): File UUID

**Request Body:**
```json
{
  "operations": [
    {
      "type": "resize",
      "width": 800,
      "height": 600,
      "maintain_aspect_ratio": true
    },
    {
      "type": "convert",
      "format": "webp",
      "quality": 85
    },
    {
      "type": "thumbnail",
      "width": 200,
      "height": 200
    }
  ],
  "output_format": "webp",
  "quality": 85,
  "processed_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "processing_job_id": "job_123456789",
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "operations": [
    {
      "type": "resize",
      "width": 800,
      "height": 600,
      "maintain_aspect_ratio": true
    },
    {
      "type": "convert",
      "format": "webp",
      "quality": 85
    },
    {
      "type": "thumbnail",
      "width": 200,
      "height": 200
    }
  ],
  "status": "queued",
  "estimated_duration": "30 seconds",
  "queued_at": "2024-01-15T14:30:00Z",
  "processed_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/files/550e8400-e29b-41d4-a716-446655440000/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "operations": [
      {
        "type": "resize",
        "width": 800,
        "height": 600,
        "maintain_aspect_ratio": true
      },
      {
        "type": "convert",
        "format": "webp",
        "quality": 85
      },
      {
        "type": "thumbnail",
        "width": 200,
        "height": 200
      }
    ],
    "output_format": "webp",
    "quality": 85,
    "processed_by": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 8. Get File Statistics
**GET** `/files/statistics`

Retrieves file usage statistics.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_files": 1000000,
    "total_size_mb": 50000,
    "total_downloads": 5000000,
    "average_file_size": 50
  },
  "category_breakdown": [
    {
      "category": "delivery",
      "files": 500000,
      "size_mb": 25000,
      "downloads": 2500000
    },
    {
      "category": "profile",
      "files": 300000,
      "size_mb": 15000,
      "downloads": 1500000
    },
    {
      "category": "document",
      "files": 200000,
      "size_mb": 10000,
      "downloads": 1000000
    }
  ],
  "storage_usage": {
    "total_mb": 50000,
    "used_mb": 40000,
    "available_mb": 10000,
    "usage_percentage": 80
  },
  "top_files": [
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440000",
      "filename": "delivery_photo.jpg",
      "downloads": 10000,
      "size_mb": 1
    },
    {
      "file_id": "550e8400-e29b-41d4-a716-446655440001",
      "filename": "profile_photo.jpg",
      "downloads": 8000,
      "size_mb": 0.5
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/files/statistics?category=delivery&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

## Database Tables

### files
File metadata and information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| filename | text | Original filename |
| content_type | text | MIME type |
| file_size | integer | File size in bytes |
| storage_url | text | Storage URL |
| storage_path | text | Storage path |
| category | text | File category |
| tags | text[] | File tags |
| access_level | text | Access level |
| expires_at | timestamptz | Expiration timestamp |
| checksum | text | File checksum |
| uploaded_by | uuid | Uploader user ID |
| uploaded_at | timestamptz | Upload timestamp |
| updated_by | uuid | Last updater user ID |
| updated_at | timestamptz | Last update timestamp |
| status | text | File status |
| created_at | timestamptz | Creation timestamp |

### file_versions
File version history.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| file_id | uuid | Reference to files |
| version | integer | Version number |
| filename | text | Version filename |
| file_size | integer | Version file size |
| storage_url | text | Version storage URL |
| storage_path | text | Version storage path |
| checksum | text | Version checksum |
| created_by | uuid | Creator user ID |
| created_at | timestamptz | Creation timestamp |

### file_access
File access permissions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| file_id | uuid | Reference to files |
| user_id | uuid | User ID |
| access_type | text | Access type |
| granted_by | uuid | Grantor user ID |
| granted_at | timestamptz | Grant timestamp |
| expires_at | timestamptz | Expiration timestamp |
| created_at | timestamptz | Creation timestamp |

### file_processing
File processing jobs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| file_id | uuid | Reference to files |
| job_id | text | Processing job ID |
| operations | jsonb | Processing operations |
| status | text | Job status |
| progress | integer | Job progress percentage |
| started_at | timestamptz | Start timestamp |
| completed_at | timestamptz | Completion timestamp |
| error_message | text | Error message |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. File Storage
- S3/GCS integration
- File upload/download
- File versioning
- File metadata

### 2. File Processing
- Image resizing
- Format conversion
- Thumbnail generation
- File compression

### 3. Access Control
- Permission management
- Download tokens
- Access logging
- Expiration handling

### 4. File Management
- File organization
- Tagging system
- Search and filtering
- Bulk operations

## Security Considerations

- File encryption
- Access control
- Download tokens
- Virus scanning

## Integration Points

- **All Services**: File storage
- **User Service**: File ownership
- **Delivery Service**: Delivery files
- **Profile Service**: Profile images

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_file",
  "message": "Invalid file format",
  "details": {
    "field": "content_type",
    "issue": "Unsupported file type"
  }
}
```

**404 Not Found:**
```json
{
  "error": "file_not_found",
  "message": "File not found",
  "details": {
    "file_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "access_denied",
  "message": "Access denied to file",
  "details": {
    "file_id": "550e8400-e29b-41d4-a716-446655440000",
    "reason": "Insufficient permissions"
  }
}
```

## Rate Limiting

- File uploads: 100 per hour per user
- File downloads: 1000 per hour per user
- File processing: 50 per hour per user
- File operations: 500 per hour per user

## File Features

### 1. Supported Formats
- Images: JPEG, PNG, WebP, GIF
- Documents: PDF, DOC, DOCX
- Archives: ZIP, RAR, 7Z
- Videos: MP4, AVI, MOV

### 2. Processing Operations
- Resize
- Convert
- Thumbnail
- Compress
- Watermark

### 3. Access Levels
- Public
- Private
- Restricted
- Expired

### 4. File Categories
- Delivery
- Profile
- Document
- Archive
- Media