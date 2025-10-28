# Reporting Service

## Overview
The Reporting Service provides comprehensive reporting capabilities, data visualization, and business intelligence for the platform.

## Purpose
- Report generation
- Data visualization
- Business intelligence
- Analytics reporting

## Data Ownership
- `reports` - Report definitions
- `report_templates` - Report templates
- `report_schedules` - Scheduled reports
- `report_executions` - Report execution logs

## API Endpoints

### 1. Create Report
**POST** `/reporting/reports`

Creates a new report.

**Request Body:**
```json
{
  "name": "Monthly Delivery Report",
  "description": "Comprehensive monthly delivery performance report",
  "category": "delivery",
  "type": "scheduled",
  "template_id": "template_123456789",
  "parameters": {
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    },
    "filters": {
      "delivery_status": ["completed", "in_progress"],
      "delivery_type": ["standard", "express"],
      "region": ["north_america", "europe"]
    },
    "grouping": {
      "by": "month",
      "fields": ["delivery_type", "region"]
    },
    "metrics": [
      "total_deliveries",
      "success_rate",
      "average_delivery_time",
      "revenue"
    ],
    "format": "pdf",
    "include_charts": true,
    "include_details": true
  },
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "time": "09:00",
    "timezone": "America/Toronto",
    "enabled": true
  },
  "recipients": [
    {
      "email": "manager@delivery.com",
      "name": "Delivery Manager",
      "type": "primary"
    },
    {
      "email": "analyst@delivery.com",
      "name": "Data Analyst",
      "type": "cc"
    }
  ],
  "access_control": {
    "created_by": "admin_123456789",
    "permissions": ["admin", "manager"],
    "departments": ["operations", "analytics"]
  }
}
```

**Response:**
```json
{
  "report_id": "report_123456789",
  "name": "Monthly Delivery Report",
  "description": "Comprehensive monthly delivery performance report",
  "category": "delivery",
  "type": "scheduled",
  "template_id": "template_123456789",
  "parameters": {
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    },
    "filters": {
      "delivery_status": ["completed", "in_progress"],
      "delivery_type": ["standard", "express"],
      "region": ["north_america", "europe"]
    },
    "grouping": {
      "by": "month",
      "fields": ["delivery_type", "region"]
    },
    "metrics": [
      "total_deliveries",
      "success_rate",
      "average_delivery_time",
      "revenue"
    ],
    "format": "pdf",
    "include_charts": true,
    "include_details": true
  },
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "time": "09:00",
    "timezone": "America/Toronto",
    "enabled": true
  },
  "recipients": [
    {
      "email": "manager@delivery.com",
      "name": "Delivery Manager",
      "type": "primary"
    },
    {
      "email": "analyst@delivery.com",
      "name": "Data Analyst",
      "type": "cc"
    }
  ],
  "access_control": {
    "created_by": "admin_123456789",
    "permissions": ["admin", "manager"],
    "departments": ["operations", "analytics"]
  },
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "last_executed": null,
  "next_execution": "2024-02-01T09:00:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/reporting/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "name": "Monthly Delivery Report",
    "description": "Comprehensive monthly delivery performance report",
    "category": "delivery",
    "type": "scheduled",
    "template_id": "template_123456789",
    "parameters": {
      "date_range": {
        "start_date": "2024-01-01",
        "end_date": "2024-01-31"
      },
      "filters": {
        "delivery_status": ["completed", "in_progress"],
        "delivery_type": ["standard", "express"],
        "region": ["north_america", "europe"]
      },
      "grouping": {
        "by": "month",
        "fields": ["delivery_type", "region"]
      },
      "metrics": [
        "total_deliveries",
        "success_rate",
        "average_delivery_time",
        "revenue"
      ],
      "format": "pdf",
      "include_charts": true,
      "include_details": true
    },
    "schedule": {
      "frequency": "monthly",
      "day_of_month": 1,
      "time": "09:00",
      "timezone": "America/Toronto",
      "enabled": true
    },
    "recipients": [
      {
        "email": "manager@delivery.com",
        "name": "Delivery Manager",
        "type": "primary"
      },
      {
        "email": "analyst@delivery.com",
        "name": "Data Analyst",
        "type": "cc"
      }
    ],
    "access_control": {
      "created_by": "admin_123456789",
      "permissions": ["admin", "manager"],
      "departments": ["operations", "analytics"]
    }
  }'
```

### 2. Execute Report
**POST** `/reporting/reports/{report_id}/execute`

Executes a report immediately.

**Path Parameters:**
- `report_id` (string, required): Report identifier

**Request Body:**
```json
{
  "parameters": {
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    },
    "filters": {
      "delivery_status": ["completed", "in_progress"],
      "delivery_type": ["standard", "express"],
      "region": ["north_america", "europe"]
    },
    "grouping": {
      "by": "month",
      "fields": ["delivery_type", "region"]
    },
    "metrics": [
      "total_deliveries",
      "success_rate",
      "average_delivery_time",
      "revenue"
    ],
    "format": "pdf",
    "include_charts": true,
    "include_details": true
  },
  "recipients": [
    {
      "email": "manager@delivery.com",
      "name": "Delivery Manager",
      "type": "primary"
    }
  ],
  "execution_options": {
    "priority": "high",
    "notify_on_completion": true,
    "save_result": true
  }
}
```

**Response:**
```json
{
  "execution_id": "exec_123456789",
  "report_id": "report_123456789",
  "status": "queued",
  "parameters": {
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    },
    "filters": {
      "delivery_status": ["completed", "in_progress"],
      "delivery_type": ["standard", "express"],
      "region": ["north_america", "europe"]
    },
    "grouping": {
      "by": "month",
      "fields": ["delivery_type", "region"]
    },
    "metrics": [
      "total_deliveries",
      "success_rate",
      "average_delivery_time",
      "revenue"
    ],
    "format": "pdf",
    "include_charts": true,
    "include_details": true
  },
  "recipients": [
    {
      "email": "manager@delivery.com",
      "name": "Delivery Manager",
      "type": "primary"
    }
  ],
  "execution_options": {
    "priority": "high",
    "notify_on_completion": true,
    "save_result": true
  },
  "queued_at": "2024-01-15T12:30:00Z",
  "estimated_completion": "2024-01-15T12:35:00Z",
  "progress": 0
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/reporting/reports/report_123456789/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "parameters": {
      "date_range": {
        "start_date": "2024-01-01",
        "end_date": "2024-01-31"
      },
      "filters": {
        "delivery_status": ["completed", "in_progress"],
        "delivery_type": ["standard", "express"],
        "region": ["north_america", "europe"]
      },
      "grouping": {
        "by": "month",
        "fields": ["delivery_type", "region"]
      },
      "metrics": [
        "total_deliveries",
        "success_rate",
        "average_delivery_time",
        "revenue"
      ],
      "format": "pdf",
      "include_charts": true,
      "include_details": true
    },
    "recipients": [
      {
        "email": "manager@delivery.com",
        "name": "Delivery Manager",
        "type": "primary"
      }
    ],
    "execution_options": {
      "priority": "high",
      "notify_on_completion": true,
      "save_result": true
    }
  }'
```

### 3. Get Report Status
**GET** `/reporting/reports/{report_id}/status`

Retrieves report execution status.

**Path Parameters:**
- `report_id` (string, required): Report identifier

**Response:**
```json
{
  "report_id": "report_123456789",
  "status": "completed",
  "execution_id": "exec_123456789",
  "progress": 100,
  "started_at": "2024-01-15T12:30:00Z",
  "completed_at": "2024-01-15T12:32:00Z",
  "duration": 120,
  "result": {
    "file_id": "file_123456789",
    "file_url": "https://storage.delivery.com/reports/report_123456789_2024-01-15.pdf",
    "file_size": 2048000,
    "format": "pdf",
    "pages": 25,
    "generated_at": "2024-01-15T12:32:00Z"
  },
  "metrics": {
    "total_deliveries": 15000,
    "success_rate": 0.95,
    "average_delivery_time": 24,
    "revenue": 150000.00
  },
  "error": null
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/reporting/reports/report_123456789/status
```

### 4. Get Report Results
**GET** `/reporting/reports/{report_id}/results`

Retrieves report results.

**Path Parameters:**
- `report_id` (string, required): Report identifier

**Query Parameters:**
- `execution_id` (string, optional): Filter by execution
- `format` (string, optional): Response format (json/pdf/csv)

**Response:**
```json
{
  "report_id": "report_123456789",
  "execution_id": "exec_123456789",
  "status": "completed",
  "generated_at": "2024-01-15T12:32:00Z",
  "data": {
    "summary": {
      "total_deliveries": 15000,
      "success_rate": 0.95,
      "average_delivery_time": 24,
      "revenue": 150000.00,
      "period": {
        "start": "2024-01-01",
        "end": "2024-01-31"
      }
    },
    "breakdown": [
      {
        "delivery_type": "standard",
        "region": "north_america",
        "deliveries": 10000,
        "success_rate": 0.96,
        "average_delivery_time": 22,
        "revenue": 100000.00
      },
      {
        "delivery_type": "express",
        "region": "north_america",
        "deliveries": 5000,
        "success_rate": 0.94,
        "average_delivery_time": 28,
        "revenue": 50000.00
      }
    ],
    "trends": [
      {
        "date": "2024-01-01",
        "deliveries": 500,
        "success_rate": 0.95,
        "revenue": 5000.00
      }
    ],
    "charts": [
      {
        "type": "bar",
        "title": "Deliveries by Type and Region",
        "data": {
          "labels": ["Standard - NA", "Express - NA"],
          "datasets": [
            {
              "label": "Deliveries",
              "data": [10000, 5000]
            }
          ]
        }
      }
    ]
  },
  "file_url": "https://storage.delivery.com/reports/report_123456789_2024-01-15.pdf",
  "file_size": 2048000,
  "format": "pdf"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/reporting/reports/report_123456789/results?execution_id=exec_123456789&format=json"
```

### 5. List Report Templates
**GET** `/reporting/templates`

Lists available report templates.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `type` (string, optional): Filter by type
- `status` (string, optional): Filter by status
- `limit` (integer, optional): Number of templates (default: 50)
- `offset` (integer, optional): Number of templates to skip (default: 0)

**Response:**
```json
{
  "templates": [
    {
      "template_id": "template_123456789",
      "name": "Monthly Delivery Report",
      "description": "Comprehensive monthly delivery performance report",
      "category": "delivery",
      "type": "scheduled",
      "status": "active",
      "version": "1.2.0",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T12:30:00Z",
      "created_by": "admin_123456789",
      "parameters_schema": {
        "type": "object",
        "properties": {
          "date_range": {
            "type": "object",
            "properties": {
              "start_date": {"type": "string", "format": "date"},
              "end_date": {"type": "string", "format": "date"}
            },
            "required": ["start_date", "end_date"]
          },
          "filters": {
            "type": "object",
            "properties": {
              "delivery_status": {"type": "array", "items": {"type": "string"}},
              "delivery_type": {"type": "array", "items": {"type": "string"}},
              "region": {"type": "array", "items": {"type": "string"}}
            }
          }
        }
      },
      "metrics": [
        "total_deliveries",
        "success_rate",
        "average_delivery_time",
        "revenue"
      ],
      "formats": ["pdf", "excel", "csv"],
      "charts": ["bar", "line", "pie"],
      "access_control": {
        "permissions": ["admin", "manager"],
        "departments": ["operations", "analytics"]
      }
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "category": "delivery",
    "type": "scheduled",
    "status": "active"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/reporting/templates?category=delivery&type=scheduled&status=active&limit=50&offset=0"
```

### 6. Create Report Template
**POST** `/reporting/templates`

Creates a new report template.

**Request Body:**
```json
{
  "name": "Weekly Performance Report",
  "description": "Weekly performance metrics and KPIs",
  "category": "performance",
  "type": "scheduled",
  "parameters_schema": {
    "type": "object",
    "properties": {
      "date_range": {
        "type": "object",
        "properties": {
          "start_date": {"type": "string", "format": "date"},
          "end_date": {"type": "string", "format": "date"}
        },
        "required": ["start_date", "end_date"]
      },
      "filters": {
        "type": "object",
        "properties": {
          "department": {"type": "array", "items": {"type": "string"}},
          "team": {"type": "array", "items": {"type": "string"}}
        }
      }
    }
  },
  "metrics": [
    "user_engagement",
    "delivery_performance",
    "revenue_metrics",
    "system_health"
  ],
  "formats": ["pdf", "excel"],
  "charts": ["bar", "line"],
  "access_control": {
    "permissions": ["admin", "manager"],
    "departments": ["operations", "analytics"]
  },
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "template_id": "template_123456790",
  "name": "Weekly Performance Report",
  "description": "Weekly performance metrics and KPIs",
  "category": "performance",
  "type": "scheduled",
  "status": "active",
  "version": "1.0.0",
  "created_at": "2024-01-15T12:30:00Z",
  "updated_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "parameters_schema": {
    "type": "object",
    "properties": {
      "date_range": {
        "type": "object",
        "properties": {
          "start_date": {"type": "string", "format": "date"},
          "end_date": {"type": "string", "format": "date"}
        },
        "required": ["start_date", "end_date"]
      },
      "filters": {
        "type": "object",
        "properties": {
          "department": {"type": "array", "items": {"type": "string"}},
          "team": {"type": "array", "items": {"type": "string"}}
        }
      }
    }
  },
  "metrics": [
    "user_engagement",
    "delivery_performance",
    "revenue_metrics",
    "system_health"
  ],
  "formats": ["pdf", "excel"],
  "charts": ["bar", "line"],
  "access_control": {
    "permissions": ["admin", "manager"],
    "departments": ["operations", "analytics"]
  }
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/reporting/templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "name": "Weekly Performance Report",
    "description": "Weekly performance metrics and KPIs",
    "category": "performance",
    "type": "scheduled",
    "parameters_schema": {
      "type": "object",
      "properties": {
        "date_range": {
          "type": "object",
          "properties": {
            "start_date": {"type": "string", "format": "date"},
            "end_date": {"type": "string", "format": "date"}
          },
          "required": ["start_date", "end_date"]
        },
        "filters": {
          "type": "object",
          "properties": {
            "department": {"type": "array", "items": {"type": "string"}},
            "team": {"type": "array", "items": {"type": "string"}}
          }
        }
      }
    },
    "metrics": [
      "user_engagement",
      "delivery_performance",
      "revenue_metrics",
      "system_health"
    ],
    "formats": ["pdf", "excel"],
    "charts": ["bar", "line"],
    "access_control": {
      "permissions": ["admin", "manager"],
      "departments": ["operations", "analytics"]
    },
    "created_by": "admin_123456789"
  }'
```

### 7. Get Report Execution History
**GET** `/reporting/reports/{report_id}/executions`

Retrieves report execution history.

**Path Parameters:**
- `report_id` (string, required): Report identifier

**Query Parameters:**
- `status` (string, optional): Filter by status
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of executions (default: 50)
- `offset` (integer, optional): Number of executions to skip (default: 0)

**Response:**
```json
{
  "executions": [
    {
      "execution_id": "exec_123456789",
      "report_id": "report_123456789",
      "status": "completed",
      "progress": 100,
      "started_at": "2024-01-15T12:30:00Z",
      "completed_at": "2024-01-15T12:32:00Z",
      "duration": 120,
      "result": {
        "file_id": "file_123456789",
        "file_url": "https://storage.delivery.com/reports/report_123456789_2024-01-15.pdf",
        "file_size": 2048000,
        "format": "pdf",
        "pages": 25
      },
      "metrics": {
        "total_deliveries": 15000,
        "success_rate": 0.95,
        "average_delivery_time": 24,
        "revenue": 150000.00
      },
      "error": null,
      "executed_by": "admin_123456789"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "status": "completed",
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/reporting/reports/report_123456789/executions?status=completed&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&limit=50&offset=0"
```

### 8. Get Reporting Analytics
**GET** `/reporting/analytics`

Retrieves reporting service analytics.

**Query Parameters:**
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `category` (string, optional): Filter by category

**Response:**
```json
{
  "overview": {
    "total_reports": 1000,
    "active_reports": 800,
    "total_executions": 10000,
    "successful_executions": 9500,
    "failed_executions": 500,
    "average_execution_time": 300
  },
  "category_breakdown": [
    {
      "category": "delivery",
      "reports": 400,
      "executions": 4000,
      "success_rate": 0.95,
      "average_execution_time": 250
    },
    {
      "category": "performance",
      "reports": 300,
      "executions": 3000,
      "success_rate": 0.90,
      "average_execution_time": 350
    }
  ],
  "format_breakdown": [
    {
      "format": "pdf",
      "executions": 6000,
      "average_file_size": 2048000,
      "average_generation_time": 200
    },
    {
      "format": "excel",
      "executions": 3000,
      "average_file_size": 1024000,
      "average_generation_time": 150
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "reports_created": 10,
      "executions": 100,
      "successful_executions": 95,
      "failed_executions": 5
    }
  ],
  "top_reports": [
    {
      "report_id": "report_123456789",
      "name": "Monthly Delivery Report",
      "executions": 1000,
      "success_rate": 0.98,
      "average_execution_time": 180
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/reporting/analytics?date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&category=delivery"
```

## Database Tables

### reports
Report definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| report_id | text | Report identifier |
| name | text | Report name |
| description | text | Report description |
| category | text | Report category |
| type | text | Report type |
| template_id | uuid | Reference to report_templates |
| parameters | jsonb | Report parameters |
| schedule | jsonb | Schedule configuration |
| recipients | jsonb | Report recipients |
| access_control | jsonb | Access control settings |
| status | text | Report status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| last_executed | timestamptz | Last execution timestamp |
| next_execution | timestamptz | Next execution timestamp |

### report_templates
Report templates.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| template_id | text | Template identifier |
| name | text | Template name |
| description | text | Template description |
| category | text | Template category |
| type | text | Template type |
| status | text | Template status |
| version | text | Template version |
| parameters_schema | jsonb | Parameters schema |
| metrics | text[] | Available metrics |
| formats | text[] | Supported formats |
| charts | text[] | Available charts |
| access_control | jsonb | Access control settings |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| updated_at | timestamptz | Last update timestamp |

### report_schedules
Scheduled reports.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| report_id | uuid | Reference to reports |
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

### report_executions
Report execution logs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| execution_id | text | Execution identifier |
| report_id | uuid | Reference to reports |
| status | text | Execution status |
| progress | integer | Execution progress |
| started_at | timestamptz | Start timestamp |
| completed_at | timestamptz | Completion timestamp |
| duration | integer | Duration in seconds |
| result | jsonb | Execution result |
| metrics | jsonb | Report metrics |
| error | text | Error message |
| executed_by | uuid | Reference to admin_users |
| parameters | jsonb | Execution parameters |

## Key Features

### 1. Report Management
- Report creation
- Template management
- Parameter configuration
- Access control

### 2. Report Execution
- Immediate execution
- Scheduled execution
- Progress tracking
- Result management

### 3. Data Visualization
- Chart generation
- Metric calculation
- Trend analysis
- KPI tracking

### 4. Analytics
- Usage tracking
- Performance metrics
- Success rates
- Execution analytics

## Security Considerations

- Access control
- Data privacy
- Report security
- Audit logging

## Integration Points

- **Analytics Service**: Data aggregation
- **File Service**: Report storage
- **Email Service**: Report delivery
- **Admin Panel Service**: Access control

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_report_data",
  "message": "Invalid report data",
  "details": {
    "field": "parameters",
    "issue": "Missing required parameters"
  }
}
```

**404 Not Found:**
```json
{
  "error": "report_not_found",
  "message": "Report not found",
  "details": {
    "report_id": "report_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Report validation failed",
  "details": {
    "issues": [
      "Missing required field: name",
      "Invalid date range format"
    ]
  }
}
```

## Rate Limiting

- Report creation: 10 per hour per admin
- Report execution: 50 per hour per admin
- Template creation: 5 per hour per admin
- Analytics queries: 100 per hour per admin

## Reporting Features

### 1. Report Management
- Creation
- Templates
- Parameters
- Access control

### 2. Execution
- Immediate
- Scheduled
- Progress
- Results

### 3. Visualization
- Charts
- Metrics
- Trends
- KPIs

### 4. Analytics
- Usage
- Performance
- Success
- Execution