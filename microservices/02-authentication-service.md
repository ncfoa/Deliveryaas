# Authentication Service

## Overview
The Authentication Service handles user authentication, authorization, and session management. It provides secure login/logout functionality, JWT token management, multi-factor authentication, device management, and session security features.

## Purpose
- User login and logout
- JWT token management
- Multi-factor authentication (MFA)
- Device management
- Session security and management

## Data Ownership
- `auth_identities` - External identity linkages
- `sessions` - User login sessions
- `devices` - Device metadata for security
- `mfa_factors` - MFA configuration
- `mfa_challenges` - MFA verification challenges

## API Endpoints

### 1. User Login
**POST** `/auth/login`

Authenticates a user and creates a session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password123",
  "device_fingerprint": "device_12345",
  "remember_me": true
}
```

**Response:**
```json
{
  "user_id": "uuid",
  "session_id": "uuid",
  "access_token": "jwt_token_here",
  "refresh_token": "refresh_token_here",
  "expires_at": "2024-01-15T18:30:00Z",
  "requires_mfa": false,
  "device_id": "uuid"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure_password123",
    "device_fingerprint": "device_12345",
    "remember_me": true
  }'
```

### 2. User Logout
**POST** `/auth/logout`

Logs out a user and invalidates their session.

**Request Body:**
```json
{
  "session_id": "uuid",
  "device_id": "uuid"
}
```

**Response:**
```json
{
  "message": "Successfully logged out",
  "logged_out_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "device_id": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 3. Refresh Token
**POST** `/auth/refresh`

Refreshes an expired access token using a valid refresh token.

**Request Body:**
```json
{
  "refresh_token": "refresh_token_here",
  "device_id": "uuid"
}
```

**Response:**
```json
{
  "access_token": "new_jwt_token_here",
  "refresh_token": "new_refresh_token_here",
  "expires_at": "2024-01-15T18:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "refresh_token_here",
    "device_id": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

### 4. MFA Verification
**POST** `/auth/mfa/verify`

Verifies multi-factor authentication challenge.

**Request Body:**
```json
{
  "user_id": "uuid",
  "factor_id": "uuid",
  "code": "123456",
  "challenge_id": "uuid"
}
```

**Response:**
```json
{
  "verified": true,
  "session_id": "uuid",
  "access_token": "jwt_token_here",
  "expires_at": "2024-01-15T18:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/auth/mfa/verify \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "factor_id": "550e8400-e29b-41d4-a716-446655440002",
    "code": "123456",
    "challenge_id": "550e8400-e29b-41d4-a716-446655440003"
  }'
```

### 5. List Active Sessions
**GET** `/auth/sessions`

Retrieves all active sessions for a user.

**Query Parameters:**
- `user_id` (string, required): User UUID
- `limit` (integer, optional): Number of sessions to return (default: 20)
- `offset` (integer, optional): Number of sessions to skip (default: 0)

**Response:**
```json
{
  "sessions": [
    {
      "id": "uuid",
      "device_id": "uuid",
      "device_fingerprint": "device_12345",
      "platform": "ios",
      "last_seen_at": "2024-01-15T12:00:00Z",
      "created_at": "2024-01-15T10:30:00Z",
      "expires_at": "2024-01-15T18:30:00Z",
      "is_current": true
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/auth/sessions?user_id=550e8400-e29b-41d4-a716-446655440000&limit=10"
```

### 6. Revoke Session
**DELETE** `/auth/sessions/{id}`

Revokes a specific session.

**Path Parameters:**
- `id` (string, required): Session UUID

**Response:**
```json
{
  "message": "Session revoked successfully",
  "revoked_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X DELETE https://api.delivery.com/auth/sessions/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer jwt_token_here"
```

### 7. Setup MFA
**POST** `/auth/mfa/setup`

Sets up multi-factor authentication for a user.

**Request Body:**
```json
{
  "user_id": "uuid",
  "type": "totp",
  "phone_e164": "+1234567890"
}
```

**Response:**
```json
{
  "factor_id": "uuid",
  "qr_code": "otpauth://totp/DeliveryApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=DeliveryApp",
  "backup_codes": [
    "12345678",
    "87654321",
    "11223344"
  ],
  "expires_at": "2024-01-15T13:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/auth/mfa/setup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "totp"
  }'
```

### 8. Verify MFA Setup
**POST** `/auth/mfa/verify-setup`

Verifies MFA setup with a test code.

**Request Body:**
```json
{
  "factor_id": "uuid",
  "code": "123456"
}
```

**Response:**
```json
{
  "verified": true,
  "enabled": true,
  "enabled_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/auth/mfa/verify-setup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "factor_id": "550e8400-e29b-41d4-a716-446655440002",
    "code": "123456"
  }'
```

## Database Tables

### auth_identities
External identity linkages for different authentication providers.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| provider | text | Authentication provider (password, google, apple) |
| provider_user_id | text | Provider's user identifier |
| email | text | Email from provider |
| email_verified | boolean | Email verification status from provider |
| created_at | timestamptz | Creation timestamp |

### sessions
User login sessions and token management.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| device_id | uuid | Foreign key to devices table |
| session_token | text | Unique session identifier |
| access_token_hash | text | Hashed access token |
| refresh_token_hash | text | Hashed refresh token |
| last_seen_at | timestamptz | Last activity timestamp |
| expires_at | timestamptz | Session expiration timestamp |
| created_at | timestamptz | Session creation timestamp |

### devices
Device metadata for security and push notifications.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| device_fingerprint | text | Unique device identifier |
| push_token | text | Push notification token |
| platform | text | Device platform (ios, android, web) |
| last_seen_at | timestamptz | Last activity timestamp |
| created_at | timestamptz | Device registration timestamp |

### mfa_factors
Multi-factor authentication configuration.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| type | mfa_factor_type_enum | MFA type (totp, sms, webauthn) |
| secret_hash | text | Encrypted secret for TOTP |
| phone_e164 | text | Phone number for SMS |
| enabled | boolean | Whether factor is enabled |
| created_at | timestamptz | Creation timestamp |

### mfa_challenges
MFA verification challenges and attempts.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| factor_id | uuid | Foreign key to mfa_factors table |
| status | mfa_challenge_status_enum | Challenge status |
| issued_at | timestamptz | Challenge creation timestamp |
| verified_at | timestamptz | Verification timestamp |
| expires_at | timestamptz | Challenge expiration timestamp |
| attempts | integer | Number of verification attempts |

## Key Features

### 1. JWT Token Management
- Secure access token generation
- Refresh token rotation
- Token expiration handling
- Token revocation

### 2. Multi-Factor Authentication
- TOTP (Time-based One-Time Password) support
- SMS-based verification
- WebAuthn support
- Backup codes generation

### 3. Device Management
- Device fingerprinting
- Push notification token management
- Device-based security policies
- Session tracking per device

### 4. Session Security
- Session timeout management
- Concurrent session limits
- Suspicious activity detection
- Session invalidation

## Security Considerations

- All passwords hashed with bcrypt
- JWT tokens signed with RS256
- MFA secrets encrypted at rest
- Session tokens are cryptographically secure
- Rate limiting on authentication attempts
- Device fingerprinting for security

## Integration Points

- **User Service**: User account validation
- **Authorization Service**: Permission checking
- **Notification Service**: MFA code delivery
- **Audit Service**: Security event logging

## Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "error": "invalid_credentials",
  "message": "Invalid email or password"
}
```

**403 Forbidden:**
```json
{
  "error": "mfa_required",
  "message": "Multi-factor authentication required",
  "challenge_id": "uuid"
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many login attempts",
  "retry_after": 300
}
```

**400 Bad Request:**
```json
{
  "error": "invalid_mfa_code",
  "message": "Invalid or expired MFA code"
}
```

## Rate Limiting

- Login attempts: 5 per minute per IP
- MFA verification: 3 per minute per user
- Token refresh: 10 per minute per user
- Session creation: 20 per hour per user
- MFA setup: 3 per hour per user

## JWT Token Structure

### Access Token Payload
```json
{
  "sub": "user_uuid",
  "iat": 1642248000,
  "exp": 1642251600,
  "iss": "delivery-app",
  "aud": "delivery-api",
  "session_id": "session_uuid",
  "device_id": "device_uuid",
  "roles": ["traveller"],
  "permissions": ["read:profile", "write:trips"]
}
```

### Refresh Token Payload
```json
{
  "sub": "user_uuid",
  "iat": 1642248000,
  "exp": 1642334400,
  "iss": "delivery-app",
  "aud": "delivery-api",
  "session_id": "session_uuid",
  "device_id": "device_uuid",
  "type": "refresh"
}
```