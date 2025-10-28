# Backup Service

## Overview
The Backup Service provides comprehensive data backup, recovery, and disaster recovery capabilities for the platform.

## Purpose
- Data backup
- Disaster recovery
- Data restoration
- Backup management

## Data Ownership
- `backup_jobs` - Backup job definitions
- `backup_schedules` - Backup schedules
- `backup_restores` - Restore operations
- `backup_verifications` - Backup verification logs

## API Endpoints

### 1. Create Backup Job
**POST** `/backup/jobs`

Creates a new backup job.

**Request Body:**
```json
{
  "job_name": "Daily Database Backup",
  "description": "Daily backup of all database tables",
  "backup_type": "full",
  "source": {
    "type": "database",
    "connection_string": "postgresql://user:pass@localhost:5432/delivery_db",
    "tables": ["users", "deliveries", "payments"],
    "exclude_tables": ["temp_*", "log_*"]
  },
  "destination": {
    "type": "s3",
    "bucket": "delivery-backups",
    "path": "database/daily/",
    "region": "us-east-1",
    "encryption": "AES256",
    "storage_class": "STANDARD_IA"
  },
  "schedule": {
    "frequency": "daily",
    "time": "02:00",
    "timezone": "America/Toronto",
    "enabled": true
  },
  "retention": {
    "days": 30,
    "weeks": 12,
    "months": 12,
    "years": 7
  },
  "compression": {
    "enabled": true,
    "algorithm": "gzip",
    "level": 6
  },
  "encryption": {
    "enabled": true,
    "algorithm": "AES-256",
    "key_id": "backup_key_123456789"
  },
  "verification": {
    "enabled": true,
    "checksum_verification": true,
    "integrity_check": true,
    "test_restore": false
  },
  "notifications": {
    "on_success": true,
    "on_failure": true,
    "on_warning": false,
    "recipients": ["admin@delivery.com", "ops@delivery.com"]
  },
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "job_id": "job_123456789",
  "job_name": "Daily Database Backup",
  "description": "Daily backup of all database tables",
  "backup_type": "full",
  "source": {
    "type": "database",
    "connection_string": "postgresql://user:pass@localhost:5432/delivery_db",
    "tables": ["users", "deliveries", "payments"],
    "exclude_tables": ["temp_*", "log_*"]
  },
  "destination": {
    "type": "s3",
    "bucket": "delivery-backups",
    "path": "database/daily/",
    "region": "us-east-1",
    "encryption": "AES256",
    "storage_class": "STANDARD_IA"
  },
  "schedule": {
    "frequency": "daily",
    "time": "02:00",
    "timezone": "America/Toronto",
    "enabled": true
  },
  "retention": {
    "days": 30,
    "weeks": 12,
    "months": 12,
    "years": 7
  },
  "compression": {
    "enabled": true,
    "algorithm": "gzip",
    "level": 6
  },
  "encryption": {
    "enabled": true,
    "algorithm": "AES-256",
    "key_id": "backup_key_123456789"
  },
  "verification": {
    "enabled": true,
    "checksum_verification": true,
    "integrity_check": true,
    "test_restore": false
  },
  "notifications": {
    "on_success": true,
    "on_failure": true,
    "on_warning": false,
    "recipients": ["admin@delivery.com", "ops@delivery.com"]
  },
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "last_run": null,
  "next_run": "2024-01-16T02:00:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/backup/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "job_name": "Daily Database Backup",
    "description": "Daily backup of all database tables",
    "backup_type": "full",
    "source": {
      "type": "database",
      "connection_string": "postgresql://user:pass@localhost:5432/delivery_db",
      "tables": ["users", "deliveries", "payments"],
      "exclude_tables": ["temp_*", "log_*"]
    },
    "destination": {
      "type": "s3",
      "bucket": "delivery-backups",
      "path": "database/daily/",
      "region": "us-east-1",
      "encryption": "AES256",
      "storage_class": "STANDARD_IA"
    },
    "schedule": {
      "frequency": "daily",
      "time": "02:00",
      "timezone": "America/Toronto",
      "enabled": true
    },
    "retention": {
      "days": 30,
      "weeks": 12,
      "months": 12,
      "years": 7
    },
    "compression": {
      "enabled": true,
      "algorithm": "gzip",
      "level": 6
    },
    "encryption": {
      "enabled": true,
      "algorithm": "AES-256",
      "key_id": "backup_key_123456789"
    },
    "verification": {
      "enabled": true,
      "checksum_verification": true,
      "integrity_check": true,
      "test_restore": false
    },
    "notifications": {
      "on_success": true,
      "on_failure": true,
      "on_warning": false,
      "recipients": ["admin@delivery.com", "ops@delivery.com"]
    },
    "created_by": "admin_123456789"
  }'
```

### 2. Execute Backup Job
**POST** `/backup/jobs/{job_id}/execute`

Executes a backup job immediately.

**Path Parameters:**
- `job_id` (string, required): Backup job identifier

**Request Body:**
```json
{
  "execution_options": {
    "priority": "high",
    "force_full_backup": false,
    "skip_verification": false,
    "notify_on_completion": true
  },
  "custom_parameters": {
    "tables": ["users", "deliveries"],
    "compression_level": 9,
    "encryption_key": "custom_key_123456789"
  }
}
```

**Response:**
```json
{
  "execution_id": "exec_123456789",
  "job_id": "job_123456789",
  "status": "running",
  "progress": 0,
  "started_at": "2024-01-15T12:30:00Z",
  "estimated_completion": "2024-01-15T12:35:00Z",
  "execution_options": {
    "priority": "high",
    "force_full_backup": false,
    "skip_verification": false,
    "notify_on_completion": true
  },
  "custom_parameters": {
    "tables": ["users", "deliveries"],
    "compression_level": 9,
    "encryption_key": "custom_key_123456789"
  },
  "executed_by": "admin_123456789"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/backup/jobs/job_123456789/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "execution_options": {
      "priority": "high",
      "force_full_backup": false,
      "skip_verification": false,
      "notify_on_completion": true
    },
    "custom_parameters": {
      "tables": ["users", "deliveries"],
      "compression_level": 9,
      "encryption_key": "custom_key_123456789"
    }
  }'
```

### 3. Get Backup Status
**GET** `/backup/jobs/{job_id}/status`

Retrieves backup job execution status.

**Path Parameters:**
- `job_id` (string, required): Backup job identifier

**Response:**
```json
{
  "job_id": "job_123456789",
  "status": "completed",
  "execution_id": "exec_123456789",
  "progress": 100,
  "started_at": "2024-01-15T12:30:00Z",
  "completed_at": "2024-01-15T12:32:00Z",
  "duration": 120,
  "result": {
    "backup_id": "backup_123456789",
    "file_path": "s3://delivery-backups/database/daily/backup_2024-01-15_02-30-00.sql.gz",
    "file_size": 1048576000,
    "compression_ratio": 0.3,
    "encryption": "AES-256",
    "checksum": "sha256:abc123def456...",
    "created_at": "2024-01-15T12:32:00Z"
  },
  "verification": {
    "status": "passed",
    "checksum_verified": true,
    "integrity_verified": true,
    "test_restore_verified": false,
    "verified_at": "2024-01-15T12:33:00Z"
  },
  "error": null,
  "next_run": "2024-01-16T02:00:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/backup/jobs/job_123456789/status
```

### 4. List Backup Files
**GET** `/backup/files`

Lists available backup files.

**Query Parameters:**
- `job_id` (string, optional): Filter by job
- `backup_type` (string, optional): Filter by type
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `status` (string, optional): Filter by status
- `limit` (integer, optional): Number of files (default: 50)
- `offset` (integer, optional): Number of files to skip (default: 0)

**Response:**
```json
{
  "files": [
    {
      "backup_id": "backup_123456789",
      "job_id": "job_123456789",
      "job_name": "Daily Database Backup",
      "backup_type": "full",
      "file_path": "s3://delivery-backups/database/daily/backup_2024-01-15_02-30-00.sql.gz",
      "file_size": 1048576000,
      "compression_ratio": 0.3,
      "encryption": "AES-256",
      "checksum": "sha256:abc123def456...",
      "status": "completed",
      "created_at": "2024-01-15T12:32:00Z",
      "verified_at": "2024-01-15T12:33:00Z",
      "retention_until": "2024-02-14T12:32:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "job_id": "job_123456789",
    "backup_type": "full",
    "status": "completed"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/backup/files?job_id=job_123456789&backup_type=full&status=completed&limit=50&offset=0"
```

### 5. Create Restore Job
**POST** `/backup/restores`

Creates a new restore job.

**Request Body:**
```json
{
  "restore_name": "Emergency Database Restore",
  "description": "Restore database from backup after incident",
  "backup_id": "backup_123456789",
  "source": {
    "type": "database",
    "connection_string": "postgresql://user:pass@localhost:5432/delivery_db_restore",
    "tables": ["users", "deliveries", "payments"]
  },
  "destination": {
    "type": "database",
    "connection_string": "postgresql://user:pass@localhost:5432/delivery_db",
    "tables": ["users", "deliveries", "payments"],
    "overwrite_existing": true,
    "create_missing_tables": true
  },
  "restore_options": {
    "verify_before_restore": true,
    "verify_after_restore": true,
    "skip_constraints": false,
    "skip_indexes": false,
    "parallel_restore": true,
    "max_parallel_jobs": 4
  },
  "notifications": {
    "on_success": true,
    "on_failure": true,
    "on_warning": true,
    "recipients": ["admin@delivery.com", "ops@delivery.com"]
  },
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "restore_id": "restore_123456789",
  "restore_name": "Emergency Database Restore",
  "description": "Restore database from backup after incident",
  "backup_id": "backup_123456789",
  "source": {
    "type": "database",
    "connection_string": "postgresql://user:pass@localhost:5432/delivery_db_restore",
    "tables": ["users", "deliveries", "payments"]
  },
  "destination": {
    "type": "database",
    "connection_string": "postgresql://user:pass@localhost:5432/delivery_db",
    "tables": ["users", "deliveries", "payments"],
    "overwrite_existing": true,
    "create_missing_tables": true
  },
  "restore_options": {
    "verify_before_restore": true,
    "verify_after_restore": true,
    "skip_constraints": false,
    "skip_indexes": false,
    "parallel_restore": true,
    "max_parallel_jobs": 4
  },
  "notifications": {
    "on_success": true,
    "on_failure": true,
    "on_warning": true,
    "recipients": ["admin@delivery.com", "ops@delivery.com"]
  },
  "status": "queued",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "started_at": null,
  "completed_at": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/backup/restores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "restore_name": "Emergency Database Restore",
    "description": "Restore database from backup after incident",
    "backup_id": "backup_123456789",
    "source": {
      "type": "database",
      "connection_string": "postgresql://user:pass@localhost:5432/delivery_db_restore",
      "tables": ["users", "deliveries", "payments"]
    },
    "destination": {
      "type": "database",
      "connection_string": "postgresql://user:pass@localhost:5432/delivery_db",
      "tables": ["users", "deliveries", "payments"],
      "overwrite_existing": true,
      "create_missing_tables": true
    },
    "restore_options": {
      "verify_before_restore": true,
      "verify_after_restore": true,
      "skip_constraints": false,
      "skip_indexes": false,
      "parallel_restore": true,
      "max_parallel_jobs": 4
    },
    "notifications": {
      "on_success": true,
      "on_failure": true,
      "on_warning": true,
      "recipients": ["admin@delivery.com", "ops@delivery.com"]
    },
    "created_by": "admin_123456789"
  }'
```

### 6. Get Restore Status
**GET** `/backup/restores/{restore_id}/status`

Retrieves restore job status.

**Path Parameters:**
- `restore_id` (string, required): Restore job identifier

**Response:**
```json
{
  "restore_id": "restore_123456789",
  "status": "completed",
  "progress": 100,
  "started_at": "2024-01-15T12:30:00Z",
  "completed_at": "2024-01-15T12:35:00Z",
  "duration": 300,
  "result": {
    "tables_restored": 3,
    "records_restored": 1000000,
    "data_size": 1048576000,
    "restored_at": "2024-01-15T12:35:00Z"
  },
  "verification": {
    "status": "passed",
    "data_integrity_verified": true,
    "constraints_verified": true,
    "indexes_verified": true,
    "verified_at": "2024-01-15T12:36:00Z"
  },
  "error": null
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/backup/restores/restore_123456789/status
```

### 7. Verify Backup
**POST** `/backup/backups/{backup_id}/verify`

Verifies backup integrity.

**Path Parameters:**
- `backup_id` (string, required): Backup identifier

**Request Body:**
```json
{
  "verification_type": "full",
  "checksum_verification": true,
  "integrity_check": true,
  "test_restore": true,
  "test_restore_options": {
    "test_database": "delivery_test_restore",
    "test_tables": ["users", "deliveries"],
    "cleanup_after_test": true
  }
}
```

**Response:**
```json
{
  "verification_id": "verify_123456789",
  "backup_id": "backup_123456789",
  "verification_type": "full",
  "status": "running",
  "progress": 0,
  "started_at": "2024-01-15T12:30:00Z",
  "estimated_completion": "2024-01-15T12:35:00Z",
  "checksum_verification": true,
  "integrity_check": true,
  "test_restore": true,
  "test_restore_options": {
    "test_database": "delivery_test_restore",
    "test_tables": ["users", "deliveries"],
    "cleanup_after_test": true
  }
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/backup/backups/backup_123456789/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "verification_type": "full",
    "checksum_verification": true,
    "integrity_check": true,
    "test_restore": true,
    "test_restore_options": {
      "test_database": "delivery_test_restore",
      "test_tables": ["users", "deliveries"],
      "cleanup_after_test": true
    }
  }'
```

### 8. Get Backup Analytics
**GET** `/backup/analytics`

Retrieves backup service analytics.

**Query Parameters:**
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `job_id` (string, optional): Filter by job

**Response:**
```json
{
  "overview": {
    "total_jobs": 100,
    "active_jobs": 80,
    "total_backups": 10000,
    "successful_backups": 9500,
    "failed_backups": 500,
    "total_restores": 1000,
    "successful_restores": 950,
    "failed_restores": 50,
    "total_storage_used": 1073741824000,
    "average_backup_size": 104857600
  },
  "job_breakdown": [
    {
      "job_id": "job_123456789",
      "job_name": "Daily Database Backup",
      "backups": 1000,
      "success_rate": 0.98,
      "average_size": 1048576000,
      "average_duration": 120
    }
  ],
  "backup_types": [
    {
      "type": "full",
      "count": 5000,
      "success_rate": 0.95,
      "average_size": 1048576000,
      "average_duration": 300
    },
    {
      "type": "incremental",
      "count": 5000,
      "success_rate": 0.99,
      "average_size": 104857600,
      "average_duration": 60
    }
  ],
  "storage_breakdown": [
    {
      "destination": "s3",
      "total_size": 1073741824000,
      "backup_count": 10000,
      "average_size": 104857600,
      "cost_per_month": 1000.00
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "backups_created": 100,
      "successful_backups": 95,
      "failed_backups": 5,
      "storage_used": 104857600000
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/backup/analytics?date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&job_id=job_123456789"
```

## Database Tables

### backup_jobs
Backup job definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| job_id | text | Job identifier |
| job_name | text | Job name |
| description | text | Job description |
| backup_type | text | Backup type |
| source | jsonb | Source configuration |
| destination | jsonb | Destination configuration |
| schedule | jsonb | Schedule configuration |
| retention | jsonb | Retention policy |
| compression | jsonb | Compression settings |
| encryption | jsonb | Encryption settings |
| verification | jsonb | Verification settings |
| notifications | jsonb | Notification settings |
| status | text | Job status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| last_run | timestamptz | Last run timestamp |
| next_run | timestamptz | Next run timestamp |

### backup_schedules
Backup schedules.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| job_id | uuid | Reference to backup_jobs |
| frequency | text | Schedule frequency |
| day_of_month | integer | Day of month |
| day_of_week | integer | Day of week |
| time | text | Schedule time |
| timezone | text | Timezone |
| enabled | boolean | Schedule enabled |
| last_executed | timestamptz | Last execution timestamp |
| next_execution | timestamptz | Next execution timestamp |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### backup_restores
Restore operations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| restore_id | text | Restore identifier |
| backup_id | text | Backup identifier |
| restore_name | text | Restore name |
| description | text | Restore description |
| source | jsonb | Source configuration |
| destination | jsonb | Destination configuration |
| restore_options | jsonb | Restore options |
| notifications | jsonb | Notification settings |
| status | text | Restore status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| started_at | timestamptz | Start timestamp |
| completed_at | timestamptz | Completion timestamp |

### backup_verifications
Backup verification logs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| verification_id | text | Verification identifier |
| backup_id | text | Backup identifier |
| verification_type | text | Verification type |
| status | text | Verification status |
| progress | integer | Verification progress |
| started_at | timestamptz | Start timestamp |
| completed_at | timestamptz | Completion timestamp |
| checksum_verification | boolean | Checksum verification |
| integrity_check | boolean | Integrity check |
| test_restore | boolean | Test restore |
| test_restore_options | jsonb | Test restore options |
| result | jsonb | Verification result |
| error | text | Error message |

## Key Features

### 1. Backup Management
- Job creation
- Schedule management
- Retention policies
- Compression and encryption

### 2. Restore Operations
- Restore job creation
- Progress tracking
- Verification
- Error handling

### 3. Verification
- Integrity checks
- Checksum verification
- Test restores
- Quality assurance

### 4. Analytics
- Usage tracking
- Performance metrics
- Storage analytics
- Success rates

## Security Considerations

- Data encryption
- Access control
- Audit logging
- Secure storage

## Integration Points

- **File Service**: Backup storage
- **Email Service**: Notifications
- **Monitoring Service**: Health checks
- **Admin Panel Service**: Management interface

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_backup_config",
  "message": "Invalid backup configuration",
  "details": {
    "field": "source",
    "issue": "Invalid source configuration"
  }
}
```

**404 Not Found:**
```json
{
  "error": "backup_not_found",
  "message": "Backup not found",
  "details": {
    "backup_id": "backup_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Backup validation failed",
  "details": {
    "issues": [
      "Missing required field: job_name",
      "Invalid schedule configuration"
    ]
  }
}
```

## Rate Limiting

- Backup job creation: 10 per hour per admin
- Backup execution: 50 per hour per admin
- Restore job creation: 5 per hour per admin
- Verification requests: 20 per hour per admin

## Backup Features

### 1. Backup Management
- Job creation
- Scheduling
- Retention
- Compression

### 2. Restore Operations
- Job creation
- Progress tracking
- Verification
- Error handling

### 3. Verification
- Integrity
- Checksums
- Test restores
- Quality

### 4. Analytics
- Usage
- Performance
- Storage
- Success rates