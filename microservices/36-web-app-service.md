# Web App Service

## Overview
The Web App Service provides web-specific functionality, browser management, and web app features for desktop and mobile web browsers.

## Purpose
- Web app functionality
- Browser management
- Web-specific features
- Progressive Web App (PWA) support

## Data Ownership
- `web_sessions` - Web session management
- `browser_info` - Browser information
- `pwa_installations` - PWA installation tracking
- `web_analytics` - Web analytics data

## API Endpoints

### 1. Create Web Session
**POST** `/web-app/sessions`

Creates a new web session.

**Request Body:**
```json
{
  "session_id": "sess_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "browser_info": {
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "os": "macOS",
    "os_version": "10.15.7",
    "device_type": "desktop",
    "screen_resolution": "1920x1080",
    "viewport": "1920x1080",
    "color_depth": 24,
    "timezone": "America/Toronto",
    "language": "en-CA",
    "country": "CA",
    "cookie_enabled": true,
    "javascript_enabled": true,
    "local_storage_enabled": true,
    "session_storage_enabled": true
  },
  "connection_info": {
    "ip_address": "192.168.1.100",
    "country": "CA",
    "region": "Ontario",
    "city": "Toronto",
    "isp": "Rogers Communications",
    "connection_type": "broadband",
    "connection_speed": "high"
  },
  "referrer": "https://google.com/search?q=delivery+platform",
  "landing_page": "https://delivery.com/search",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "delivery_search",
  "utm_term": "delivery platform",
  "utm_content": "ad_variant_a"
}
```

**Response:**
```json
{
  "session_id": "sess_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "browser_info": {
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "os": "macOS",
    "os_version": "10.15.7",
    "device_type": "desktop",
    "screen_resolution": "1920x1080",
    "viewport": "1920x1080",
    "color_depth": 24,
    "timezone": "America/Toronto",
    "language": "en-CA",
    "country": "CA",
    "cookie_enabled": true,
    "javascript_enabled": true,
    "local_storage_enabled": true,
    "session_storage_enabled": true
  },
  "connection_info": {
    "ip_address": "192.168.1.100",
    "country": "CA",
    "region": "Ontario",
    "city": "Toronto",
    "isp": "Rogers Communications",
    "connection_type": "broadband",
    "connection_speed": "high"
  },
  "referrer": "https://google.com/search?q=delivery+platform",
  "landing_page": "https://delivery.com/search",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "delivery_search",
  "utm_term": "delivery platform",
  "utm_content": "ad_variant_a",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-15T18:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/web-app/sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "session_id": "sess_123456789",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "browser_info": {
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "browser": "Chrome",
      "browser_version": "120.0.0.0",
      "os": "macOS",
      "os_version": "10.15.7",
      "device_type": "desktop",
      "screen_resolution": "1920x1080",
      "viewport": "1920x1080",
      "color_depth": 24,
      "timezone": "America/Toronto",
      "language": "en-CA",
      "country": "CA",
      "cookie_enabled": true,
      "javascript_enabled": true,
      "local_storage_enabled": true,
      "session_storage_enabled": true
    },
    "connection_info": {
      "ip_address": "192.168.1.100",
      "country": "CA",
      "region": "Ontario",
      "city": "Toronto",
      "isp": "Rogers Communications",
      "connection_type": "broadband",
      "connection_speed": "high"
    },
    "referrer": "https://google.com/search?q=delivery+platform",
    "landing_page": "https://delivery.com/search",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "delivery_search",
    "utm_term": "delivery platform",
    "utm_content": "ad_variant_a"
  }'
```

### 2. Update Web Session
**PUT** `/web-app/sessions/{session_id}`

Updates web session information.

**Path Parameters:**
- `session_id` (string, required): Session identifier

**Request Body:**
```json
{
  "browser_info": {
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "os": "macOS",
    "os_version": "10.15.7",
    "device_type": "desktop",
    "screen_resolution": "1920x1080",
    "viewport": "1920x1080",
    "color_depth": 24,
    "timezone": "America/Toronto",
    "language": "en-CA",
    "country": "CA",
    "cookie_enabled": true,
    "javascript_enabled": true,
    "local_storage_enabled": true,
    "session_storage_enabled": true
  },
  "connection_info": {
    "ip_address": "192.168.1.100",
    "country": "CA",
    "region": "Ontario",
    "city": "Toronto",
    "isp": "Rogers Communications",
    "connection_type": "broadband",
    "connection_speed": "high"
  },
  "last_activity": "2024-01-15T14:30:00Z",
  "page_views": 5,
  "session_duration": 1800
}
```

**Response:**
```json
{
  "session_id": "sess_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "browser_info": {
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "os": "macOS",
    "os_version": "10.15.7",
    "device_type": "desktop",
    "screen_resolution": "1920x1080",
    "viewport": "1920x1080",
    "color_depth": 24,
    "timezone": "America/Toronto",
    "language": "en-CA",
    "country": "CA",
    "cookie_enabled": true,
    "javascript_enabled": true,
    "local_storage_enabled": true,
    "session_storage_enabled": true
  },
  "connection_info": {
    "ip_address": "192.168.1.100",
    "country": "CA",
    "region": "Ontario",
    "city": "Toronto",
    "isp": "Rogers Communications",
    "connection_type": "broadband",
    "connection_speed": "high"
  },
  "referrer": "https://google.com/search?q=delivery+platform",
  "landing_page": "https://delivery.com/search",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "delivery_search",
  "utm_term": "delivery platform",
  "utm_content": "ad_variant_a",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-15T18:30:00Z",
  "last_activity": "2024-01-15T14:30:00Z",
  "page_views": 5,
  "session_duration": 1800,
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/web-app/sessions/sess_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "browser_info": {
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "browser": "Chrome",
      "browser_version": "120.0.0.0",
      "os": "macOS",
      "os_version": "10.15.7",
      "device_type": "desktop",
      "screen_resolution": "1920x1080",
      "viewport": "1920x1080",
      "color_depth": 24,
      "timezone": "America/Toronto",
      "language": "en-CA",
      "country": "CA",
      "cookie_enabled": true,
      "javascript_enabled": true,
      "local_storage_enabled": true,
      "session_storage_enabled": true
    },
    "connection_info": {
      "ip_address": "192.168.1.100",
      "country": "CA",
      "region": "Ontario",
      "city": "Toronto",
      "isp": "Rogers Communications",
      "connection_type": "broadband",
      "connection_speed": "high"
    },
    "last_activity": "2024-01-15T14:30:00Z",
    "page_views": 5,
    "session_duration": 1800
  }'
```

### 3. Get Web Session
**GET** `/web-app/sessions/{session_id}`

Retrieves web session information.

**Path Parameters:**
- `session_id` (string, required): Session identifier

**Response:**
```json
{
  "session_id": "sess_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "browser_info": {
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "os": "macOS",
    "os_version": "10.15.7",
    "device_type": "desktop",
    "screen_resolution": "1920x1080",
    "viewport": "1920x1080",
    "color_depth": 24,
    "timezone": "America/Toronto",
    "language": "en-CA",
    "country": "CA",
    "cookie_enabled": true,
    "javascript_enabled": true,
    "local_storage_enabled": true,
    "session_storage_enabled": true
  },
  "connection_info": {
    "ip_address": "192.168.1.100",
    "country": "CA",
    "region": "Ontario",
    "city": "Toronto",
    "isp": "Rogers Communications",
    "connection_type": "broadband",
    "connection_speed": "high"
  },
  "referrer": "https://google.com/search?q=delivery+platform",
  "landing_page": "https://delivery.com/search",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "delivery_search",
  "utm_term": "delivery platform",
  "utm_content": "ad_variant_a",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "expires_at": "2024-01-15T18:30:00Z",
  "last_activity": "2024-01-15T14:30:00Z",
  "page_views": 5,
  "session_duration": 1800,
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/web-app/sessions/sess_123456789
```

### 4. Track Page View
**POST** `/web-app/page-views`

Tracks a page view.

**Request Body:**
```json
{
  "session_id": "sess_123456789",
  "page_url": "https://delivery.com/search?from=toronto&to=vancouver",
  "page_title": "Search Deliveries - Toronto to Vancouver",
  "page_category": "search",
  "page_section": "main",
  "referrer": "https://delivery.com/",
  "viewport": "1920x1080",
  "scroll_depth": 75,
  "time_on_page": 30,
  "bounce": false,
  "exit": false,
  "custom_data": {
    "search_query": "toronto to vancouver",
    "filters_applied": ["date", "price"],
    "results_count": 25
  }
}
```

**Response:**
```json
{
  "page_view_id": "pv_123456789",
  "session_id": "sess_123456789",
  "page_url": "https://delivery.com/search?from=toronto&to=vancouver",
  "page_title": "Search Deliveries - Toronto to Vancouver",
  "page_category": "search",
  "page_section": "main",
  "referrer": "https://delivery.com/",
  "viewport": "1920x1080",
  "scroll_depth": 75,
  "time_on_page": 30,
  "bounce": false,
  "exit": false,
  "custom_data": {
    "search_query": "toronto to vancouver",
    "filters_applied": ["date", "price"],
    "results_count": 25
  },
  "timestamp": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/web-app/page-views \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "session_id": "sess_123456789",
    "page_url": "https://delivery.com/search?from=toronto&to=vancouver",
    "page_title": "Search Deliveries - Toronto to Vancouver",
    "page_category": "search",
    "page_section": "main",
    "referrer": "https://delivery.com/",
    "viewport": "1920x1080",
    "scroll_depth": 75,
    "time_on_page": 30,
    "bounce": false,
    "exit": false,
    "custom_data": {
      "search_query": "toronto to vancouver",
      "filters_applied": ["date", "price"],
      "results_count": 25
    }
  }'
```

### 5. Track User Event
**POST** `/web-app/events`

Tracks a user event.

**Request Body:**
```json
{
  "session_id": "sess_123456789",
  "event_type": "button_click",
  "event_name": "search_submit",
  "event_category": "interaction",
  "event_value": 1,
  "page_url": "https://delivery.com/search",
  "element_id": "search-submit-button",
  "element_class": "btn btn-primary",
  "element_text": "Search Deliveries",
  "custom_data": {
    "search_query": "toronto to vancouver",
    "filters_count": 3,
    "results_expected": 25
  }
}
```

**Response:**
```json
{
  "event_id": "evt_123456789",
  "session_id": "sess_123456789",
  "event_type": "button_click",
  "event_name": "search_submit",
  "event_category": "interaction",
  "event_value": 1,
  "page_url": "https://delivery.com/search",
  "element_id": "search-submit-button",
  "element_class": "btn btn-primary",
  "element_text": "Search Deliveries",
  "custom_data": {
    "search_query": "toronto to vancouver",
    "filters_count": 3,
    "results_expected": 25
  },
  "timestamp": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/web-app/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "session_id": "sess_123456789",
    "event_type": "button_click",
    "event_name": "search_submit",
    "event_category": "interaction",
    "event_value": 1,
    "page_url": "https://delivery.com/search",
    "element_id": "search-submit-button",
    "element_class": "btn btn-primary",
    "element_text": "Search Deliveries",
    "custom_data": {
      "search_query": "toronto to vancouver",
      "filters_count": 3,
      "results_expected": 25
    }
  }'
```

### 6. Install PWA
**POST** `/web-app/pwa/install`

Tracks PWA installation.

**Request Body:**
```json
{
  "session_id": "sess_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "platform": "desktop",
  "browser": "Chrome",
  "browser_version": "120.0.0.0",
  "os": "macOS",
  "os_version": "10.15.7",
  "device_type": "desktop",
  "screen_resolution": "1920x1080",
  "timezone": "America/Toronto",
  "language": "en-CA",
  "country": "CA",
  "install_source": "browser_prompt",
  "install_method": "add_to_homescreen",
  "custom_data": {
    "prompt_displayed": true,
    "prompt_accepted": true,
    "install_time": 5
  }
}
```

**Response:**
```json
{
  "installation_id": "pwa_123456789",
  "session_id": "sess_123456789",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "platform": "desktop",
  "browser": "Chrome",
  "browser_version": "120.0.0.0",
  "os": "macOS",
  "os_version": "10.15.7",
  "device_type": "desktop",
  "screen_resolution": "1920x1080",
  "timezone": "America/Toronto",
  "language": "en-CA",
  "country": "CA",
  "install_source": "browser_prompt",
  "install_method": "add_to_homescreen",
  "custom_data": {
    "prompt_displayed": true,
    "prompt_accepted": true,
    "install_time": 5
  },
  "status": "installed",
  "installed_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/web-app/pwa/install \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "session_id": "sess_123456789",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "platform": "desktop",
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "os": "macOS",
    "os_version": "10.15.7",
    "device_type": "desktop",
    "screen_resolution": "1920x1080",
    "timezone": "America/Toronto",
    "language": "en-CA",
    "country": "CA",
    "install_source": "browser_prompt",
    "install_method": "add_to_homescreen",
    "custom_data": {
      "prompt_displayed": true,
      "prompt_accepted": true,
      "install_time": 5
    }
  }'
```

### 7. Get Web Analytics
**GET** `/web-app/analytics`

Retrieves web app analytics.

**Query Parameters:**
- `session_id` (string, optional): Filter by session
- `user_id` (string, optional): Filter by user
- `browser` (string, optional): Filter by browser
- `os` (string, optional): Filter by OS
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_sessions": 100000,
    "active_sessions": 5000,
    "total_page_views": 500000,
    "average_session_duration": 1800,
    "bounce_rate": 0.35,
    "pwa_installations": 10000
  },
  "browser_breakdown": [
    {
      "browser": "Chrome",
      "sessions": 60000,
      "page_views": 300000,
      "average_session_duration": 2000,
      "bounce_rate": 0.30
    },
    {
      "browser": "Safari",
      "sessions": 25000,
      "page_views": 125000,
      "average_session_duration": 1500,
      "bounce_rate": 0.40
    }
  ],
  "os_breakdown": [
    {
      "os": "macOS",
      "sessions": 40000,
      "page_views": 200000,
      "average_session_duration": 2200,
      "bounce_rate": 0.25
    },
    {
      "os": "Windows",
      "sessions": 35000,
      "page_views": 175000,
      "average_session_duration": 1600,
      "bounce_rate": 0.40
    }
  ],
  "page_analytics": [
    {
      "page_url": "/search",
      "page_title": "Search Deliveries",
      "page_views": 100000,
      "unique_visitors": 50000,
      "average_time_on_page": 120,
      "bounce_rate": 0.20,
      "exit_rate": 0.30
    },
    {
      "page_url": "/delivery/123",
      "page_title": "Delivery Details",
      "page_views": 50000,
      "unique_visitors": 25000,
      "average_time_on_page": 300,
      "bounce_rate": 0.10,
      "exit_rate": 0.15
    }
  ],
  "event_analytics": [
    {
      "event_name": "search_submit",
      "event_count": 50000,
      "unique_users": 25000,
      "conversion_rate": 0.80
    },
    {
      "event_name": "delivery_book",
      "event_count": 10000,
      "unique_users": 8000,
      "conversion_rate": 0.90
    }
  ],
  "time_series": [
    {
      "date": "2024-01-15",
      "sessions": 5000,
      "page_views": 25000,
      "pwa_installations": 100
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/web-app/analytics?session_id=sess_123456789&browser=Chrome&date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z"
```

### 8. Get Browser Compatibility
**GET** `/web-app/browser-compatibility`

Retrieves browser compatibility information.

**Query Parameters:**
- `browser` (string, optional): Filter by browser
- `version` (string, optional): Filter by version
- `feature` (string, optional): Filter by feature

**Response:**
```json
{
  "compatibility": [
    {
      "browser": "Chrome",
      "version": "120.0.0.0",
      "status": "fully_supported",
      "features": {
        "service_worker": true,
        "push_notifications": true,
        "background_sync": true,
        "web_manifest": true,
        "offline_storage": true,
        "geolocation": true,
        "camera": true,
        "microphone": true
      },
      "limitations": [],
      "recommendations": [
        "Update to latest version for best performance"
      ]
    },
    {
      "browser": "Safari",
      "version": "17.2",
      "status": "mostly_supported",
      "features": {
        "service_worker": true,
        "push_notifications": false,
        "background_sync": false,
        "web_manifest": true,
        "offline_storage": true,
        "geolocation": true,
        "camera": true,
        "microphone": true
      },
      "limitations": [
        "Push notifications not supported",
        "Background sync not supported"
      ],
      "recommendations": [
        "Consider alternative notification methods",
        "Use polling for background updates"
      ]
    }
  ],
  "feature_support": {
    "service_worker": {
      "supported_browsers": ["Chrome", "Firefox", "Safari", "Edge"],
      "support_rate": 0.95
    },
    "push_notifications": {
      "supported_browsers": ["Chrome", "Firefox", "Edge"],
      "support_rate": 0.80
    },
    "background_sync": {
      "supported_browsers": ["Chrome", "Edge"],
      "support_rate": 0.60
    }
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/web-app/browser-compatibility?browser=Chrome&version=120.0.0.0&feature=service_worker"
```

## Database Tables

### web_sessions
Web session management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| session_id | text | Session identifier |
| user_id | uuid | Reference to users |
| browser_info | jsonb | Browser information |
| connection_info | jsonb | Connection information |
| referrer | text | Referrer URL |
| landing_page | text | Landing page URL |
| utm_source | text | UTM source |
| utm_medium | text | UTM medium |
| utm_campaign | text | UTM campaign |
| utm_term | text | UTM term |
| utm_content | text | UTM content |
| status | text | Session status |
| created_at | timestamptz | Creation timestamp |
| expires_at | timestamptz | Expiration timestamp |
| last_activity | timestamptz | Last activity timestamp |
| page_views | integer | Page view count |
| session_duration | integer | Session duration in seconds |

### browser_info
Browser information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| session_id | uuid | Reference to web_sessions |
| user_agent | text | User agent string |
| browser | text | Browser name |
| browser_version | text | Browser version |
| os | text | Operating system |
| os_version | text | OS version |
| device_type | text | Device type |
| screen_resolution | text | Screen resolution |
| viewport | text | Viewport size |
| color_depth | integer | Color depth |
| timezone | text | Timezone |
| language | text | Language |
| country | text | Country code |
| cookie_enabled | boolean | Cookie support |
| javascript_enabled | boolean | JavaScript support |
| local_storage_enabled | boolean | Local storage support |
| session_storage_enabled | boolean | Session storage support |

### pwa_installations
PWA installation tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| installation_id | text | Installation identifier |
| session_id | uuid | Reference to web_sessions |
| user_id | uuid | Reference to users |
| platform | text | Platform |
| browser | text | Browser name |
| browser_version | text | Browser version |
| os | text | Operating system |
| os_version | text | OS version |
| device_type | text | Device type |
| screen_resolution | text | Screen resolution |
| timezone | text | Timezone |
| language | text | Language |
| country | text | Country code |
| install_source | text | Installation source |
| install_method | text | Installation method |
| custom_data | jsonb | Custom installation data |
| status | text | Installation status |
| installed_at | timestamptz | Installation timestamp |

### web_analytics
Web analytics data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| session_id | uuid | Reference to web_sessions |
| event_type | text | Event type |
| event_name | text | Event name |
| event_category | text | Event category |
| event_value | decimal | Event value |
| page_url | text | Page URL |
| element_id | text | Element ID |
| element_class | text | Element class |
| element_text | text | Element text |
| custom_data | jsonb | Custom event data |
| timestamp | timestamptz | Event timestamp |

## Key Features

### 1. Session Management
- Session creation
- Browser tracking
- Connection monitoring
- UTM tracking

### 2. Analytics
- Page view tracking
- Event tracking
- User behavior
- Performance metrics

### 3. PWA Support
- Installation tracking
- Feature detection
- Compatibility checking
- Offline support

### 4. Browser Management
- Compatibility checking
- Feature detection
- Capability tracking
- Performance monitoring

## Security Considerations

- Session security
- Data privacy
- Cross-site scripting prevention
- Content security policy

## Integration Points

- **Analytics Service**: Web analytics
- **Authentication Service**: Session management
- **Push Notification Service**: Web push notifications
- **Location Service**: Geolocation

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_session_data",
  "message": "Invalid session data",
  "details": {
    "field": "browser_info",
    "issue": "Missing required browser information"
  }
}
```

**404 Not Found:**
```json
{
  "error": "session_not_found",
  "message": "Web session not found",
  "details": {
    "session_id": "sess_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Session validation failed",
  "details": {
    "issues": [
      "Missing required field: session_id",
      "Invalid browser version format"
    ]
  }
}
```

## Rate Limiting

- Session creation: 100 per hour per IP
- Page view tracking: 1000 per hour per session
- Event tracking: 500 per hour per session
- Analytics queries: 100 per hour per user

## Web App Features

### 1. Session Management
- Creation
- Tracking
- Updates
- Analytics

### 2. Analytics
- Page views
- Events
- User behavior
- Performance

### 3. PWA Support
- Installation
- Features
- Compatibility
- Offline

### 4. Browser Management
- Compatibility
- Features
- Capabilities
- Performance