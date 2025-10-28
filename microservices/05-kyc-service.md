# KYC Service

## Overview
The KYC (Know Your Customer) Service handles identity verification, document validation, and compliance checks. It ensures regulatory compliance and user identity verification across the platform.

## Purpose
- Identity verification and validation
- Document processing and validation
- Compliance and regulatory checks
- Risk assessment and scoring

## Data Ownership
- `kyc_verifications` - KYC verification records
- `identity_documents` - Identity document storage
- `compliance_checks` - Compliance verification results
- `risk_assessments` - Risk scoring and assessment

## API Endpoints

### 1. Submit KYC Documents
**POST** `/kyc/submit`

Submits identity documents for KYC verification.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "verification_type": "identity",
  "documents": [
    {
      "type": "passport",
      "document_url": "https://storage.delivery.com/documents/passport_123.jpg",
      "document_number": "A1234567",
      "country_issued": "CA",
      "expiry_date": "2030-12-31"
    },
    {
      "type": "drivers_license",
      "document_url": "https://storage.delivery.com/documents/dl_123.jpg",
      "document_number": "DL123456789",
      "country_issued": "CA",
      "expiry_date": "2028-06-30"
    }
  ],
  "personal_info": {
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-05-15",
    "address": {
      "street": "123 Main St",
      "city": "Montreal",
      "province": "QC",
      "postal_code": "H1A 1A1",
      "country": "CA"
    }
  }
}
```

**Response:**
```json
{
  "verification_id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "verification_type": "identity",
  "status": "pending",
  "submitted_at": "2024-01-15T12:30:00Z",
  "estimated_completion": "2024-01-16T12:30:00Z",
  "documents": [
    {
      "document_id": "uuid",
      "type": "passport",
      "status": "pending",
      "document_url": "https://storage.delivery.com/documents/passport_123.jpg"
    },
    {
      "document_id": "uuid",
      "type": "drivers_license",
      "status": "pending",
      "document_url": "https://storage.delivery.com/documents/dl_123.jpg"
    }
  ]
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/kyc/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "verification_type": "identity",
    "documents": [
      {
        "type": "passport",
        "document_url": "https://storage.delivery.com/documents/passport_123.jpg",
        "document_number": "A1234567",
        "country_issued": "CA",
        "expiry_date": "2030-12-31"
      }
    ],
    "personal_info": {
      "first_name": "John",
      "last_name": "Doe",
      "date_of_birth": "1990-05-15",
      "address": {
        "street": "123 Main St",
        "city": "Montreal",
        "province": "QC",
        "postal_code": "H1A 1A1",
        "country": "CA"
      }
    }
  }'
```

### 2. Get KYC Status
**GET** `/kyc/status/{user_id}`

Retrieves KYC verification status for a user.

**Path Parameters:**
- `user_id` (string, required): User UUID

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "verification_status": "verified",
  "verification_level": "high",
  "verification_type": "identity",
  "verified_at": "2024-01-16T10:30:00Z",
  "expires_at": "2025-01-16T10:30:00Z",
  "documents": [
    {
      "document_id": "uuid",
      "type": "passport",
      "status": "verified",
      "verified_at": "2024-01-16T10:30:00Z",
      "expiry_date": "2030-12-31"
    },
    {
      "document_id": "uuid",
      "type": "drivers_license",
      "status": "verified",
      "verified_at": "2024-01-16T10:30:00Z",
      "expiry_date": "2028-06-30"
    }
  ],
  "compliance_checks": {
    "aml_check": "passed",
    "sanctions_check": "passed",
    "pep_check": "passed"
  },
  "risk_score": 25,
  "risk_level": "low"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/kyc/status/550e8400-e29b-41d4-a716-446655440000
```

### 3. Update KYC Documents
**PUT** `/kyc/documents/{document_id}`

Updates an existing KYC document.

**Path Parameters:**
- `document_id` (string, required): Document UUID

**Request Body:**
```json
{
  "document_url": "https://storage.delivery.com/documents/passport_123_updated.jpg",
  "document_number": "A1234567",
  "expiry_date": "2030-12-31"
}
```

**Response:**
```json
{
  "document_id": "uuid",
  "type": "passport",
  "status": "pending",
  "document_url": "https://storage.delivery.com/documents/passport_123_updated.jpg",
  "document_number": "A1234567",
  "expiry_date": "2030-12-31",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/kyc/documents/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "document_url": "https://storage.delivery.com/documents/passport_123_updated.jpg",
    "document_number": "A1234567",
    "expiry_date": "2030-12-31"
  }'
```

### 4. Run Compliance Check
**POST** `/kyc/compliance/check`

Runs compliance checks for a user.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "check_types": ["aml", "sanctions", "pep"],
  "force_refresh": false
}
```

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "check_id": "uuid",
  "checks": {
    "aml_check": {
      "status": "passed",
      "score": 15,
      "checked_at": "2024-01-15T14:30:00Z",
      "details": "No AML risks detected"
    },
    "sanctions_check": {
      "status": "passed",
      "score": 0,
      "checked_at": "2024-01-15T14:30:00Z",
      "details": "No sanctions matches found"
    },
    "pep_check": {
      "status": "passed",
      "score": 5,
      "checked_at": "2024-01-15T14:30:00Z",
      "details": "No PEP matches found"
    }
  },
  "overall_status": "passed",
  "overall_score": 20,
  "risk_level": "low"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/kyc/compliance/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "check_types": ["aml", "sanctions", "pep"],
    "force_refresh": false
  }'
```

### 5. Get Risk Assessment
**GET** `/kyc/risk/{user_id}`

Retrieves risk assessment for a user.

**Path Parameters:**
- `user_id` (string, required): User UUID

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "risk_score": 25,
  "risk_level": "low",
  "risk_factors": [
    {
      "factor": "document_verification",
      "score": 10,
      "status": "positive"
    },
    {
      "factor": "compliance_checks",
      "score": 5,
      "status": "positive"
    },
    {
      "factor": "transaction_history",
      "score": 10,
      "status": "positive"
    }
  ],
  "recommendations": [
    "Continue monitoring",
    "Regular compliance updates"
  ],
  "assessed_at": "2024-01-15T14:30:00Z",
  "next_assessment": "2024-04-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/kyc/risk/550e8400-e29b-41d4-a716-446655440000
```

### 6. Update Risk Score
**PUT** `/kyc/risk/{user_id}`

Updates risk score for a user based on new information.

**Path Parameters:**
- `user_id` (string, required): User UUID

**Request Body:**
```json
{
  "risk_factors": [
    {
      "factor": "transaction_volume",
      "score": 15,
      "reason": "High transaction volume detected"
    },
    {
      "factor": "geographic_risk",
      "score": 5,
      "reason": "Low risk geography"
    }
  ],
  "manual_override": false,
  "notes": "Updated based on recent activity"
}
```

**Response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "previous_risk_score": 25,
  "new_risk_score": 35,
  "risk_level": "medium",
  "risk_factors": [
    {
      "factor": "transaction_volume",
      "score": 15,
      "reason": "High transaction volume detected"
    },
    {
      "factor": "geographic_risk",
      "score": 5,
      "reason": "Low risk geography"
    }
  ],
  "updated_at": "2024-01-15T14:30:00Z",
  "updated_by": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/kyc/risk/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token_here" \
  -d '{
    "risk_factors": [
      {
        "factor": "transaction_volume",
        "score": 15,
        "reason": "High transaction volume detected"
      }
    ],
    "manual_override": false,
    "notes": "Updated based on recent activity"
  }'
```

### 7. List KYC Verifications
**GET** `/kyc/verifications`

Lists KYC verifications with filtering options.

**Query Parameters:**
- `status` (string, optional): Filter by verification status
- `verification_type` (string, optional): Filter by verification type
- `risk_level` (string, optional): Filter by risk level
- `limit` (integer, optional): Number of results to return (default: 20)
- `offset` (integer, optional): Number of results to skip (default: 0)

**Response:**
```json
{
  "verifications": [
    {
      "verification_id": "uuid",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "verification_type": "identity",
      "status": "verified",
      "verification_level": "high",
      "verified_at": "2024-01-16T10:30:00Z",
      "risk_score": 25,
      "risk_level": "low",
      "documents_count": 2
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/kyc/verifications?status=verified&risk_level=low&limit=10"
```

### 8. Get Document Details
**GET** `/kyc/documents/{document_id}`

Retrieves detailed information about a specific document.

**Path Parameters:**
- `document_id` (string, required): Document UUID

**Response:**
```json
{
  "document_id": "uuid",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "passport",
  "status": "verified",
  "document_url": "https://storage.delivery.com/documents/passport_123.jpg",
  "document_number": "A1234567",
  "country_issued": "CA",
  "expiry_date": "2030-12-31",
  "verified_at": "2024-01-16T10:30:00Z",
  "verification_details": {
    "document_quality": "high",
    "data_extraction": "successful",
    "fraud_indicators": "none",
    "confidence_score": 95
  },
  "created_at": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET https://api.delivery.com/kyc/documents/550e8400-e29b-41d4-a716-446655440000
```

## Database Tables

### kyc_verifications
KYC verification records and status.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| verification_type | text | Type of verification |
| status | text | Verification status |
| verification_level | text | Level of verification achieved |
| verified_at | timestamptz | Verification completion timestamp |
| expires_at | timestamptz | Verification expiration timestamp |
| risk_score | integer | Risk assessment score |
| risk_level | text | Risk level classification |
| compliance_status | jsonb | Compliance check results |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### identity_documents
Identity document storage and metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| verification_id | uuid | Foreign key to kyc_verifications table |
| type | text | Document type |
| document_url | text | URL to document image |
| document_number | text | Document number |
| country_issued | text | Country that issued the document |
| expiry_date | date | Document expiry date |
| status | text | Document verification status |
| verified_at | timestamptz | Verification completion timestamp |
| verification_details | jsonb | Detailed verification results |
| created_at | timestamptz | Creation timestamp |

### compliance_checks
Compliance verification results and history.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| check_type | text | Type of compliance check |
| status | text | Check result status |
| score | integer | Risk score for this check |
| details | text | Additional check details |
| checked_at | timestamptz | Check completion timestamp |
| expires_at | timestamptz | Check expiration timestamp |
| created_at | timestamptz | Creation timestamp |

### risk_assessments
Risk scoring and assessment records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to users table |
| risk_score | integer | Overall risk score |
| risk_level | text | Risk level classification |
| risk_factors | jsonb | Individual risk factors |
| recommendations | text[] | Risk mitigation recommendations |
| assessed_at | timestamptz | Assessment timestamp |
| next_assessment | timestamptz | Next assessment due date |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Document Verification
- Multiple document type support
- OCR and data extraction
- Fraud detection
- Quality assessment

### 2. Compliance Checks
- AML (Anti-Money Laundering) checks
- Sanctions screening
- PEP (Politically Exposed Person) checks
- Regulatory compliance

### 3. Risk Assessment
- Automated risk scoring
- Risk factor analysis
- Risk level classification
- Mitigation recommendations

### 4. Verification Levels
- Basic verification
- Standard verification
- Premium verification
- Enterprise verification

## Security Considerations

- Documents are encrypted at rest
- PII data is protected
- Audit trail for all changes
- Secure document storage

## Integration Points

- **User Service**: User account integration
- **File Service**: Document storage
- **Profile Service**: Verification status updates
- **Risk Service**: Risk assessment integration

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_document",
  "message": "Document format not supported",
  "supported_formats": ["jpg", "png", "pdf"]
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "verification_failed",
  "message": "Document verification failed",
  "details": {
    "reason": "Document quality insufficient",
    "retry_after": "24h"
  }
}
```

**403 Forbidden:**
```json
{
  "error": "compliance_failed",
  "message": "User failed compliance checks",
  "details": {
    "failed_checks": ["aml", "sanctions"],
    "risk_level": "high"
  }
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many verification requests",
  "retry_after": 3600
}
```

## Rate Limiting

- Document submissions: 5 per day per user
- Compliance checks: 10 per hour per user
- Risk assessments: 20 per hour per user
- Status checks: 100 per hour per user

## Verification Types

### 1. Identity Verification
- Government-issued ID
- Passport verification
- Driver's license verification
- National ID verification

### 2. Address Verification
- Utility bill verification
- Bank statement verification
- Government correspondence
- Rental agreement verification

### 3. Business Verification
- Business registration
- Tax ID verification
- Bank account verification
- Compliance documentation

### 4. Enhanced Verification
- Biometric verification
- Video verification
- In-person verification
- Third-party verification