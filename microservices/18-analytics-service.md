# Analytics Service

## Overview
The Analytics Service provides comprehensive analytics, reporting, and insights across the platform. It handles data aggregation, metric calculation, and business intelligence reporting.

## Purpose
- Platform analytics and metrics
- Business intelligence reporting
- Performance monitoring
- Data visualization and insights

## Data Ownership
- `analytics_events` - Event tracking data
- `analytics_metrics` - Calculated metrics
- `analytics_reports` - Generated reports
- `analytics_dashboards` - Dashboard configurations

## API Endpoints

### 1. Track Event
**POST** `/analytics/events/track`

Tracks a custom event for analytics.

**Request Body:**
```json
{
  "event_name": "delivery_completed",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_id": "session_123456789",
  "properties": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "delivery_duration": 3600,
    "delivery_distance": 15.5,
    "delivery_rating": 5,
    "delivery_value": 150.00,
    "courier_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "timestamp": "2024-01-15T12:30:00Z",
  "context": {
    "app_version": "1.2.3",
    "platform": "mobile",
    "os": "iOS 17.0",
    "device": "iPhone 15 Pro"
  }
}
```

**Response:**
```json
{
  "event_id": "uuid",
  "event_name": "delivery_completed",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_id": "session_123456789",
  "properties": {
    "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
    "delivery_duration": 3600,
    "delivery_distance": 15.5,
    "delivery_rating": 5,
    "delivery_value": 150.00,
    "courier_id": "550e8400-e29b-41d4-a716-446655440002",
    "trip_id": "550e8400-e29b-41d4-a716-446655440003"
  },
  "context": {
    "app_version": "1.2.3",
    "platform": "mobile",
    "os": "iOS 17.0",
    "device": "iPhone 15 Pro"
  },
  "timestamp": "2024-01-15T12:30:00Z",
  "processed_at": "2024-01-15T12:30:05Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/analytics/events/track \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "event_name": "delivery_completed",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "session_id": "session_123456789",
    "properties": {
      "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
      "delivery_duration": 3600,
      "delivery_distance": 15.5,
      "delivery_rating": 5,
      "delivery_value": 150.00,
      "courier_id": "550e8400-e29b-41d4-a716-446655440002",
      "trip_id": "550e8400-e29b-41d4-a716-446655440003"
    },
    "timestamp": "2024-01-15T12:30:00Z",
    "context": {
      "app_version": "1.2.3",
      "platform": "mobile",
      "os": "iOS 17.0",
      "device": "iPhone 15 Pro"
    }
  }'
```

### 2. Get Platform Metrics
**GET** `/analytics/metrics/platform`

Retrieves platform-wide metrics and KPIs.

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly, yearly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `metrics` (string[], optional): Specific metrics to include

**Response:**
```json
{
  "period": "monthly",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "user_metrics": {
    "total_users": 50000,
    "active_users": 35000,
    "new_users": 5000,
    "user_growth_rate": 0.12,
    "user_retention_rate": 0.85
  },
  "delivery_metrics": {
    "total_deliveries": 125000,
    "completed_deliveries": 120000,
    "failed_deliveries": 5000,
    "completion_rate": 0.96,
    "average_delivery_time": 2.5,
    "average_delivery_rating": 4.7
  },
  "revenue_metrics": {
    "total_revenue": 2500000.00,
    "revenue_growth": 0.15,
    "average_order_value": 20.00,
    "revenue_per_user": 50.00
  },
  "operational_metrics": {
    "total_trips": 80000,
    "active_couriers": 5000,
    "average_trip_duration": 4.2,
    "utilization_rate": 0.75
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/analytics/metrics/platform?period=monthly&metrics=user_metrics,delivery_metrics"
```

### 3. Get User Analytics
**GET** `/analytics/users/{id}`

Retrieves analytics for a specific user.

**Path Parameters:**
- `id` (string, required): User UUID

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly, yearly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "period": "monthly",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "activity_metrics": {
    "total_deliveries": 25,
    "completed_deliveries": 24,
    "failed_deliveries": 1,
    "completion_rate": 0.96,
    "average_rating": 4.8,
    "total_distance": 125.5,
    "total_earnings": 500.00
  },
  "behavior_metrics": {
    "session_count": 45,
    "average_session_duration": 15.5,
    "feature_usage": {
      "tracking": 20,
      "messaging": 15,
      "reviews": 10,
      "payments": 25
    },
    "preferred_times": ["morning", "afternoon"],
    "preferred_routes": ["downtown", "airport"]
  },
  "performance_metrics": {
    "on_time_deliveries": 22,
    "on_time_rate": 0.92,
    "customer_satisfaction": 4.8,
    "repeat_customer_rate": 0.75
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/analytics/users/550e8400-e29b-41d4-a716-446655440000?period=monthly"
```

### 4. Get Delivery Analytics
**GET** `/analytics/deliveries`

Retrieves delivery analytics and insights.

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly, yearly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `filters` (json, optional): Additional filters

**Response:**
```json
{
  "period": "monthly",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "delivery_volume": {
    "total_deliveries": 125000,
    "daily_average": 4032,
    "peak_day": "2024-01-15",
    "peak_volume": 5500
  },
  "delivery_performance": {
    "completion_rate": 0.96,
    "on_time_rate": 0.92,
    "average_delivery_time": 2.5,
    "average_rating": 4.7
  },
  "geographic_insights": {
    "top_cities": [
      {
        "city": "Toronto",
        "deliveries": 25000,
        "completion_rate": 0.97
      },
      {
        "city": "Vancouver",
        "deliveries": 20000,
        "completion_rate": 0.95
      }
    ],
    "route_efficiency": {
      "average_distance": 12.5,
      "fuel_efficiency": 0.85,
      "time_efficiency": 0.90
    }
  },
  "courier_insights": {
    "top_performers": [
      {
        "courier_id": "550e8400-e29b-41d4-a716-446655440001",
        "deliveries": 150,
        "rating": 4.9,
        "completion_rate": 0.98
      }
    ],
    "average_performance": {
      "deliveries_per_courier": 25,
      "average_rating": 4.7,
      "completion_rate": 0.96
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/analytics/deliveries?period=monthly&filters={\"city\":\"Toronto\"}"
```

### 5. Get Revenue Analytics
**GET** `/analytics/revenue`

Retrieves revenue analytics and financial insights.

**Query Parameters:**
- `period` (string, optional): Time period (daily, weekly, monthly, yearly)
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `breakdown` (string[], optional): Revenue breakdown categories

**Response:**
```json
{
  "period": "monthly",
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "revenue_summary": {
    "total_revenue": 2500000.00,
    "revenue_growth": 0.15,
    "revenue_per_day": 80645.16,
    "revenue_per_delivery": 20.00
  },
  "revenue_breakdown": {
    "delivery_fees": 1500000.00,
    "commission": 750000.00,
    "premium_services": 200000.00,
    "other_fees": 50000.00
  },
  "payment_methods": {
    "credit_card": 0.60,
    "debit_card": 0.25,
    "digital_wallet": 0.10,
    "bank_transfer": 0.05
  },
  "geographic_revenue": {
    "top_cities": [
      {
        "city": "Toronto",
        "revenue": 750000.00,
        "growth": 0.18
      },
      {
        "city": "Vancouver",
        "revenue": 600000.00,
        "growth": 0.12
      }
    ]
  },
  "trends": {
    "revenue_trend": "increasing",
    "growth_rate": 0.15,
    "seasonal_patterns": {
      "peak_months": ["December", "January"],
      "low_months": ["February", "March"]
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/analytics/revenue?period=monthly&breakdown=delivery_fees,commission"
```

### 6. Create Custom Report
**POST** `/analytics/reports/create`

Creates a custom analytics report.

**Request Body:**
```json
{
  "name": "Monthly Delivery Performance",
  "description": "Comprehensive delivery performance metrics for January 2024",
  "metrics": [
    "delivery_volume",
    "completion_rate",
    "average_rating",
    "revenue_per_delivery"
  ],
  "filters": {
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z",
    "city": "Toronto"
  },
  "format": "pdf",
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "time": "09:00"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Monthly Delivery Performance",
  "description": "Comprehensive delivery performance metrics for January 2024",
  "metrics": [
    "delivery_volume",
    "completion_rate",
    "average_rating",
    "revenue_per_delivery"
  ],
  "filters": {
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z",
    "city": "Toronto"
  },
  "format": "pdf",
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "time": "09:00"
  },
  "status": "active",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/analytics/reports/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "name": "Monthly Delivery Performance",
    "description": "Comprehensive delivery performance metrics for January 2024",
    "metrics": [
      "delivery_volume",
      "completion_rate",
      "average_rating",
      "revenue_per_delivery"
    ],
    "filters": {
      "date_from": "2024-01-01T00:00:00Z",
      "date_to": "2024-01-31T23:59:59Z",
      "city": "Toronto"
    },
    "format": "pdf",
    "schedule": {
      "frequency": "monthly",
      "day_of_month": 1,
      "time": "09:00"
    }
  }'
```

### 7. Get Report
**GET** `/analytics/reports/{id}`

Retrieves a specific analytics report.

**Path Parameters:**
- `id` (string, required): Report UUID

**Response:**
```json
{
  "id": "uuid",
  "name": "Monthly Delivery Performance",
  "description": "Comprehensive delivery performance metrics for January 2024",
  "metrics": [
    "delivery_volume",
    "completion_rate",
    "average_rating",
    "revenue_per_delivery"
  ],
  "filters": {
    "date_from": "2024-01-01T00:00:00Z",
    "date_to": "2024-01-31T23:59:59Z",
    "city": "Toronto"
  },
  "format": "pdf",
  "status": "active",
  "last_generated": "2024-01-15T14:30:00Z",
  "download_url": "https://storage.delivery.com/reports/monthly_delivery_performance.pdf",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/analytics/reports/550e8400-e29b-41d4-a716-446655440000
```

### 8. Get Dashboard Data
**GET** `/analytics/dashboards/{id}`

Retrieves dashboard data and visualizations.

**Path Parameters:**
- `id` (string, required): Dashboard UUID

**Response:**
```json
{
  "id": "uuid",
  "name": "Executive Dashboard",
  "description": "High-level platform metrics and KPIs",
  "widgets": [
    {
      "id": "widget_1",
      "type": "metric_card",
      "title": "Total Deliveries",
      "value": 125000,
      "change": 0.15,
      "trend": "up"
    },
    {
      "id": "widget_2",
      "type": "chart",
      "title": "Delivery Volume Over Time",
      "chart_type": "line",
      "data": {
        "labels": ["Jan 1", "Jan 2", "Jan 3"],
        "datasets": [
          {
            "label": "Deliveries",
            "data": [1000, 1200, 1100]
          }
        ]
      }
    }
  ],
  "layout": {
    "columns": 3,
    "rows": 2,
    "widget_positions": {
      "widget_1": {"row": 0, "column": 0},
      "widget_2": {"row": 0, "column": 1, "span": 2}
    }
  },
  "last_updated": "2024-01-15T14:30:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/analytics/dashboards/550e8400-e29b-41d4-a716-446655440000
```

## Database Tables

### analytics_events
Event tracking data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| event_name | text | Event name |
| user_id | uuid | Foreign key to users table |
| session_id | text | Session identifier |
| properties | jsonb | Event properties |
| context | jsonb | Event context |
| timestamp | timestamptz | Event timestamp |
| processed_at | timestamptz | Processing timestamp |
| created_at | timestamptz | Creation timestamp |

### analytics_metrics
Calculated metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| metric_name | text | Metric name |
| metric_type | text | Metric type |
| value | decimal | Metric value |
| dimensions | jsonb | Metric dimensions |
| period | text | Time period |
| calculated_at | timestamptz | Calculation timestamp |
| created_at | timestamptz | Creation timestamp |

### analytics_reports
Generated reports.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Report name |
| description | text | Report description |
| metrics | text[] | Included metrics |
| filters | jsonb | Report filters |
| format | text | Report format |
| schedule | jsonb | Report schedule |
| status | text | Report status |
| last_generated | timestamptz | Last generation timestamp |
| created_at | timestamptz | Creation timestamp |

### analytics_dashboards
Dashboard configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Dashboard name |
| description | text | Dashboard description |
| widgets | jsonb | Dashboard widgets |
| layout | jsonb | Dashboard layout |
| permissions | jsonb | Access permissions |
| last_updated | timestamptz | Last update timestamp |
| created_at | timestamptz | Creation timestamp |

## Key Features

### 1. Event Tracking
- Custom event tracking
- Real-time processing
- Event properties
- Context awareness

### 2. Metrics Calculation
- Automated metric calculation
- Real-time updates
- Historical data
- Trend analysis

### 3. Reporting
- Custom report generation
- Scheduled reports
- Multiple formats
- Export capabilities

### 4. Dashboards
- Interactive dashboards
- Real-time data
- Customizable widgets
- Role-based access

## Security Considerations

- Analytics data is encrypted
- Access control enforced
- Data privacy protected
- Audit trail maintained

## Integration Points

- **All Services**: Event tracking
- **User Service**: User analytics
- **Delivery Service**: Delivery metrics
- **Payment Service**: Revenue analytics

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_event_data",
  "message": "Invalid event data provided",
  "details": {
    "field": "event_name",
    "issue": "Event name is required"
  }
}
```

**404 Not Found:**
```json
{
  "error": "report_not_found",
  "message": "Analytics report not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "invalid_metric_calculation",
  "message": "Unable to calculate metric",
  "details": {
    "metric": "delivery_volume",
    "issue": "Insufficient data for time period"
  }
}
```

## Rate Limiting

- Event tracking: 1000 per hour per user
- Metric queries: 100 per hour per user
- Report generation: 10 per hour per user
- Dashboard access: 200 per hour per user

## Analytics Categories

### 1. User Analytics
- User behavior
- Engagement metrics
- Retention analysis
- Feature usage

### 2. Delivery Analytics
- Delivery performance
- Route optimization
- Courier performance
- Customer satisfaction

### 3. Revenue Analytics
- Revenue tracking
- Payment analytics
- Pricing insights
- Financial performance

### 4. Operational Analytics
- System performance
- Resource utilization
- Efficiency metrics
- Quality metrics