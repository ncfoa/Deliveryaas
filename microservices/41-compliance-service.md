# Compliance Service

## Overview
The Compliance Service provides comprehensive compliance management, regulatory adherence, and audit capabilities for the platform.

## Purpose
- Regulatory compliance
- Audit management
- Policy enforcement
- Compliance reporting

## Data Ownership
- `compliance_policies` - Compliance policy definitions
- `compliance_audits` - Compliance audit records
- `compliance_violations` - Compliance violation records
- `compliance_reports` - Compliance reports

## API Endpoints

### 1. Create Compliance Policy
**POST** `/compliance/policies`

Creates a new compliance policy.

**Request Body:**
```json
{
  "policy_name": "GDPR Data Protection Policy",
  "description": "Comprehensive GDPR data protection and privacy policy",
  "regulatory_framework": "GDPR",
  "version": "1.0.0",
  "effective_date": "2024-01-01T00:00:00Z",
  "expiry_date": "2024-12-31T23:59:59Z",
  "scope": "data_protection",
  "applicable_regions": ["EU", "EEA", "UK"],
  "policy_type": "regulatory",
  "priority": "critical",
  "requirements": [
    {
      "requirement_id": "req_123456789",
      "title": "Data Minimization",
      "description": "Collect only necessary personal data",
      "category": "data_collection",
      "mandatory": true,
      "implementation_guidance": "Review data collection practices and ensure only necessary data is collected",
      "evidence_required": ["data_inventory", "collection_justification"],
      "monitoring_frequency": "monthly"
    },
    {
      "requirement_id": "req_123456790",
      "title": "Consent Management",
      "description": "Obtain explicit consent for data processing",
      "category": "consent",
      "mandatory": true,
      "implementation_guidance": "Implement consent management system with clear opt-in/opt-out mechanisms",
      "evidence_required": ["consent_records", "consent_forms"],
      "monitoring_frequency": "weekly"
    }
  ],
  "controls": [
    {
      "control_id": "ctrl_123456789",
      "title": "Data Encryption",
      "description": "Encrypt personal data at rest and in transit",
      "control_type": "technical",
      "implementation_status": "implemented",
      "effectiveness_rating": "high",
      "last_tested": "2024-01-15T00:00:00Z",
      "next_test": "2024-02-15T00:00:00Z"
    }
  ],
  "stakeholders": [
    {
      "role": "data_protection_officer",
      "name": "John DPO",
      "email": "dpo@delivery.com",
      "responsibilities": ["policy_oversight", "compliance_monitoring"]
    },
    {
      "role": "compliance_manager",
      "name": "Jane Manager",
      "email": "compliance@delivery.com",
      "responsibilities": ["implementation", "audit_coordination"]
    }
  ],
  "monitoring": {
    "automated_checks": true,
    "manual_reviews": true,
    "audit_frequency": "quarterly",
    "reporting_frequency": "monthly",
    "escalation_threshold": 0.95
  },
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "policy_id": "policy_123456789",
  "policy_name": "GDPR Data Protection Policy",
  "description": "Comprehensive GDPR data protection and privacy policy",
  "regulatory_framework": "GDPR",
  "version": "1.0.0",
  "effective_date": "2024-01-01T00:00:00Z",
  "expiry_date": "2024-12-31T23:59:59Z",
  "scope": "data_protection",
  "applicable_regions": ["EU", "EEA", "UK"],
  "policy_type": "regulatory",
  "priority": "critical",
  "requirements": [
    {
      "requirement_id": "req_123456789",
      "title": "Data Minimization",
      "description": "Collect only necessary personal data",
      "category": "data_collection",
      "mandatory": true,
      "implementation_guidance": "Review data collection practices and ensure only necessary data is collected",
      "evidence_required": ["data_inventory", "collection_justification"],
      "monitoring_frequency": "monthly"
    },
    {
      "requirement_id": "req_123456790",
      "title": "Consent Management",
      "description": "Obtain explicit consent for data processing",
      "category": "consent",
      "mandatory": true,
      "implementation_guidance": "Implement consent management system with clear opt-in/opt-out mechanisms",
      "evidence_required": ["consent_records", "consent_forms"],
      "monitoring_frequency": "weekly"
    }
  ],
  "controls": [
    {
      "control_id": "ctrl_123456789",
      "title": "Data Encryption",
      "description": "Encrypt personal data at rest and in transit",
      "control_type": "technical",
      "implementation_status": "implemented",
      "effectiveness_rating": "high",
      "last_tested": "2024-01-15T00:00:00Z",
      "next_test": "2024-02-15T00:00:00Z"
    }
  ],
  "stakeholders": [
    {
      "role": "data_protection_officer",
      "name": "John DPO",
      "email": "dpo@delivery.com",
      "responsibilities": ["policy_oversight", "compliance_monitoring"]
    },
    {
      "role": "compliance_manager",
      "name": "Jane Manager",
      "email": "compliance@delivery.com",
      "responsibilities": ["implementation", "audit_coordination"]
    }
  ],
  "monitoring": {
    "automated_checks": true,
    "manual_reviews": true,
    "audit_frequency": "quarterly",
    "reporting_frequency": "monthly",
    "escalation_threshold": 0.95
  },
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "last_reviewed": null,
  "next_review": "2024-04-15T00:00:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/compliance/policies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "policy_name": "GDPR Data Protection Policy",
    "description": "Comprehensive GDPR data protection and privacy policy",
    "regulatory_framework": "GDPR",
    "version": "1.0.0",
    "effective_date": "2024-01-01T00:00:00Z",
    "expiry_date": "2024-12-31T23:59:59Z",
    "scope": "data_protection",
    "applicable_regions": ["EU", "EEA", "UK"],
    "policy_type": "regulatory",
    "priority": "critical",
    "requirements": [
      {
        "requirement_id": "req_123456789",
        "title": "Data Minimization",
        "description": "Collect only necessary personal data",
        "category": "data_collection",
        "mandatory": true,
        "implementation_guidance": "Review data collection practices and ensure only necessary data is collected",
        "evidence_required": ["data_inventory", "collection_justification"],
        "monitoring_frequency": "monthly"
      },
      {
        "requirement_id": "req_123456790",
        "title": "Consent Management",
        "description": "Obtain explicit consent for data processing",
        "category": "consent",
        "mandatory": true,
        "implementation_guidance": "Implement consent management system with clear opt-in/opt-out mechanisms",
        "evidence_required": ["consent_records", "consent_forms"],
        "monitoring_frequency": "weekly"
      }
    ],
    "controls": [
      {
        "control_id": "ctrl_123456789",
        "title": "Data Encryption",
        "description": "Encrypt personal data at rest and in transit",
        "control_type": "technical",
        "implementation_status": "implemented",
        "effectiveness_rating": "high",
        "last_tested": "2024-01-15T00:00:00Z",
        "next_test": "2024-02-15T00:00:00Z"
      }
    ],
    "stakeholders": [
      {
        "role": "data_protection_officer",
        "name": "John DPO",
        "email": "dpo@delivery.com",
        "responsibilities": ["policy_oversight", "compliance_monitoring"]
      },
      {
        "role": "compliance_manager",
        "name": "Jane Manager",
        "email": "compliance@delivery.com",
        "responsibilities": ["implementation", "audit_coordination"]
      }
    ],
    "monitoring": {
      "automated_checks": true,
      "manual_reviews": true,
      "audit_frequency": "quarterly",
      "reporting_frequency": "monthly",
      "escalation_threshold": 0.95
    },
    "created_by": "admin_123456789"
  }'
```

### 2. Create Compliance Audit
**POST** `/compliance/audits`

Creates a new compliance audit.

**Request Body:**
```json
{
  "audit_name": "Q1 2024 GDPR Compliance Audit",
  "description": "Quarterly GDPR compliance audit",
  "policy_id": "policy_123456789",
  "audit_type": "internal",
  "audit_scope": "full",
  "auditor": {
    "name": "Jane Auditor",
    "email": "auditor@delivery.com",
    "role": "internal_auditor",
    "certifications": ["CISA", "CISM"]
  },
  "audit_period": {
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-03-31T23:59:59Z"
  },
  "audit_objectives": [
    "Assess GDPR compliance implementation",
    "Identify compliance gaps",
    "Evaluate control effectiveness",
    "Provide recommendations for improvement"
  ],
  "audit_methodology": [
    "Document review",
    "System testing",
    "Process walkthrough",
    "Control testing",
    "Evidence collection"
  ],
  "audit_criteria": [
    "GDPR Article 5 - Principles of processing",
    "GDPR Article 6 - Lawfulness of processing",
    "GDPR Article 7 - Conditions for consent",
    "GDPR Article 25 - Data protection by design"
  ],
  "audit_areas": [
    {
      "area_id": "area_123456789",
      "name": "Data Collection",
      "description": "Audit data collection practices",
      "requirements": ["req_123456789"],
      "controls": ["ctrl_123456789"],
      "priority": "high"
    },
    {
      "area_id": "area_123456790",
      "name": "Consent Management",
      "description": "Audit consent management system",
      "requirements": ["req_123456790"],
      "controls": ["ctrl_123456790"],
      "priority": "high"
    }
  ],
  "scheduled_start": "2024-04-01T09:00:00Z",
  "scheduled_end": "2024-04-05T17:00:00Z",
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "audit_id": "audit_123456789",
  "audit_name": "Q1 2024 GDPR Compliance Audit",
  "description": "Quarterly GDPR compliance audit",
  "policy_id": "policy_123456789",
  "audit_type": "internal",
  "audit_scope": "full",
  "auditor": {
    "name": "Jane Auditor",
    "email": "auditor@delivery.com",
    "role": "internal_auditor",
    "certifications": ["CISA", "CISM"]
  },
  "audit_period": {
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-03-31T23:59:59Z"
  },
  "audit_objectives": [
    "Assess GDPR compliance implementation",
    "Identify compliance gaps",
    "Evaluate control effectiveness",
    "Provide recommendations for improvement"
  ],
  "audit_methodology": [
    "Document review",
    "System testing",
    "Process walkthrough",
    "Control testing",
    "Evidence collection"
  ],
  "audit_criteria": [
    "GDPR Article 5 - Principles of processing",
    "GDPR Article 6 - Lawfulness of processing",
    "GDPR Article 7 - Conditions for consent",
    "GDPR Article 25 - Data protection by design"
  ],
  "audit_areas": [
    {
      "area_id": "area_123456789",
      "name": "Data Collection",
      "description": "Audit data collection practices",
      "requirements": ["req_123456789"],
      "controls": ["ctrl_123456789"],
      "priority": "high"
    },
    {
      "area_id": "area_123456790",
      "name": "Consent Management",
      "description": "Audit consent management system",
      "requirements": ["req_123456790"],
      "controls": ["ctrl_123456790"],
      "priority": "high"
    }
  ],
  "scheduled_start": "2024-04-01T09:00:00Z",
  "scheduled_end": "2024-04-05T17:00:00Z",
  "status": "scheduled",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "started_at": null,
  "completed_at": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/compliance/audits \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "audit_name": "Q1 2024 GDPR Compliance Audit",
    "description": "Quarterly GDPR compliance audit",
    "policy_id": "policy_123456789",
    "audit_type": "internal",
    "audit_scope": "full",
    "auditor": {
      "name": "Jane Auditor",
      "email": "auditor@delivery.com",
      "role": "internal_auditor",
      "certifications": ["CISA", "CISM"]
    },
    "audit_period": {
      "start_date": "2024-01-01T00:00:00Z",
      "end_date": "2024-03-31T23:59:59Z"
    },
    "audit_objectives": [
      "Assess GDPR compliance implementation",
      "Identify compliance gaps",
      "Evaluate control effectiveness",
      "Provide recommendations for improvement"
    ],
    "audit_methodology": [
      "Document review",
      "System testing",
      "Process walkthrough",
      "Control testing",
      "Evidence collection"
    ],
    "audit_criteria": [
      "GDPR Article 5 - Principles of processing",
      "GDPR Article 6 - Lawfulness of processing",
      "GDPR Article 7 - Conditions for consent",
      "GDPR Article 25 - Data protection by design"
    ],
    "audit_areas": [
      {
        "area_id": "area_123456789",
        "name": "Data Collection",
        "description": "Audit data collection practices",
        "requirements": ["req_123456789"],
        "controls": ["ctrl_123456789"],
        "priority": "high"
      },
      {
        "area_id": "area_123456790",
        "name": "Consent Management",
        "description": "Audit consent management system",
        "requirements": ["req_123456790"],
        "controls": ["ctrl_123456790"],
        "priority": "high"
      }
    ],
    "scheduled_start": "2024-04-01T09:00:00Z",
    "scheduled_end": "2024-04-05T17:00:00Z",
    "created_by": "admin_123456789"
  }'
```

### 3. Record Compliance Violation
**POST** `/compliance/violations`

Records a compliance violation.

**Request Body:**
```json
{
  "violation_id": "viol_123456789",
  "policy_id": "policy_123456789",
  "requirement_id": "req_123456789",
  "violation_type": "data_breach",
  "severity": "high",
  "description": "Unauthorized access to personal data",
  "discovered_by": "security_team",
  "discovered_at": "2024-01-15T12:30:00Z",
  "affected_systems": ["user_service", "profile_service"],
  "affected_data": {
    "data_types": ["personal_information", "contact_details"],
    "data_subjects": 1000,
    "data_categories": ["customers", "employees"]
  },
  "root_cause": "Insufficient access controls",
  "impact_assessment": {
    "confidentiality": "high",
    "integrity": "medium",
    "availability": "low",
    "business_impact": "medium"
  },
  "remediation_plan": {
    "immediate_actions": [
      "Revoke unauthorized access",
      "Notify affected data subjects",
      "Implement additional monitoring"
    ],
    "long_term_actions": [
      "Review access controls",
      "Implement additional security measures",
      "Conduct security training"
    ],
    "target_completion": "2024-02-15T00:00:00Z"
  },
  "regulatory_notifications": {
    "dpa_notified": true,
    "dpa_notification_date": "2024-01-16T00:00:00Z",
    "data_subjects_notified": true,
    "data_subjects_notification_date": "2024-01-17T00:00:00Z"
  },
  "status": "open",
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "violation_id": "viol_123456789",
  "policy_id": "policy_123456789",
  "requirement_id": "req_123456789",
  "violation_type": "data_breach",
  "severity": "high",
  "description": "Unauthorized access to personal data",
  "discovered_by": "security_team",
  "discovered_at": "2024-01-15T12:30:00Z",
  "affected_systems": ["user_service", "profile_service"],
  "affected_data": {
    "data_types": ["personal_information", "contact_details"],
    "data_subjects": 1000,
    "data_categories": ["customers", "employees"]
  },
  "root_cause": "Insufficient access controls",
  "impact_assessment": {
    "confidentiality": "high",
    "integrity": "medium",
    "availability": "low",
    "business_impact": "medium"
  },
  "remediation_plan": {
    "immediate_actions": [
      "Revoke unauthorized access",
      "Notify affected data subjects",
      "Implement additional monitoring"
    ],
    "long_term_actions": [
      "Review access controls",
      "Implement additional security measures",
      "Conduct security training"
    ],
    "target_completion": "2024-02-15T00:00:00Z"
  },
  "regulatory_notifications": {
    "dpa_notified": true,
    "dpa_notification_date": "2024-01-16T00:00:00Z",
    "data_subjects_notified": true,
    "data_subjects_notification_date": "2024-01-17T00:00:00Z"
  },
  "status": "open",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "assigned_to": null,
  "resolved_at": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/compliance/violations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "violation_id": "viol_123456789",
    "policy_id": "policy_123456789",
    "requirement_id": "req_123456789",
    "violation_type": "data_breach",
    "severity": "high",
    "description": "Unauthorized access to personal data",
    "discovered_by": "security_team",
    "discovered_at": "2024-01-15T12:30:00Z",
    "affected_systems": ["user_service", "profile_service"],
    "affected_data": {
      "data_types": ["personal_information", "contact_details"],
      "data_subjects": 1000,
      "data_categories": ["customers", "employees"]
    },
    "root_cause": "Insufficient access controls",
    "impact_assessment": {
      "confidentiality": "high",
      "integrity": "medium",
      "availability": "low",
      "business_impact": "medium"
    },
    "remediation_plan": {
      "immediate_actions": [
        "Revoke unauthorized access",
        "Notify affected data subjects",
        "Implement additional monitoring"
      ],
      "long_term_actions": [
        "Review access controls",
        "Implement additional security measures",
        "Conduct security training"
      ],
      "target_completion": "2024-02-15T00:00:00Z"
    },
    "regulatory_notifications": {
      "dpa_notified": true,
      "dpa_notification_date": "2024-01-16T00:00:00Z",
      "data_subjects_notified": true,
      "data_subjects_notification_date": "2024-01-17T00:00:00Z"
    },
    "status": "open",
    "created_by": "admin_123456789"
  }'
```

### 4. Generate Compliance Report
**POST** `/compliance/reports`

Generates a compliance report.

**Request Body:**
```json
{
  "report_name": "Q1 2024 Compliance Report",
  "description": "Quarterly compliance status report",
  "report_type": "quarterly",
  "reporting_period": {
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-03-31T23:59:59Z"
  },
  "policies": ["policy_123456789"],
  "report_sections": [
    "executive_summary",
    "policy_compliance",
    "audit_results",
    "violations_summary",
    "remediation_status",
    "recommendations"
  ],
  "audience": "executive",
  "format": "pdf",
  "include_charts": true,
  "include_details": true,
  "distribution": {
    "recipients": ["ceo@delivery.com", "cfo@delivery.com", "dpo@delivery.com"],
    "delivery_method": "email",
    "scheduled_delivery": "2024-04-01T09:00:00Z"
  },
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "report_id": "report_123456789",
  "report_name": "Q1 2024 Compliance Report",
  "description": "Quarterly compliance status report",
  "report_type": "quarterly",
  "reporting_period": {
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-03-31T23:59:59Z"
  },
  "policies": ["policy_123456789"],
  "report_sections": [
    "executive_summary",
    "policy_compliance",
    "audit_results",
    "violations_summary",
    "remediation_status",
    "recommendations"
  ],
  "audience": "executive",
  "format": "pdf",
  "include_charts": true,
  "include_details": true,
  "distribution": {
    "recipients": ["ceo@delivery.com", "cfo@delivery.com", "dpo@delivery.com"],
    "delivery_method": "email",
    "scheduled_delivery": "2024-04-01T09:00:00Z"
  },
  "status": "generating",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "generated_at": null,
  "file_url": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/compliance/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "report_name": "Q1 2024 Compliance Report",
    "description": "Quarterly compliance status report",
    "report_type": "quarterly",
    "reporting_period": {
      "start_date": "2024-01-01T00:00:00Z",
      "end_date": "2024-03-31T23:59:59Z"
    },
    "policies": ["policy_123456789"],
    "report_sections": [
      "executive_summary",
      "policy_compliance",
      "audit_results",
      "violations_summary",
      "remediation_status",
      "recommendations"
    ],
    "audience": "executive",
    "format": "pdf",
    "include_charts": true,
    "include_details": true,
    "distribution": {
      "recipients": ["ceo@delivery.com", "cfo@delivery.com", "dpo@delivery.com"],
      "delivery_method": "email",
      "scheduled_delivery": "2024-04-01T09:00:00Z"
    },
    "created_by": "admin_123456789"
  }'
```

### 5. Get Compliance Dashboard
**GET** `/compliance/dashboard`

Retrieves compliance dashboard data.

**Query Parameters:**
- `policy_id` (string, optional): Filter by policy
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter

**Response:**
```json
{
  "overview": {
    "total_policies": 25,
    "active_policies": 20,
    "expired_policies": 3,
    "expiring_soon": 2,
    "total_audits": 100,
    "completed_audits": 95,
    "ongoing_audits": 5,
    "total_violations": 50,
    "open_violations": 10,
    "resolved_violations": 40,
    "overall_compliance_score": 0.85
  },
  "policy_compliance": [
    {
      "policy_id": "policy_123456789",
      "policy_name": "GDPR Data Protection Policy",
      "compliance_score": 0.90,
      "requirements_met": 18,
      "total_requirements": 20,
      "last_audit": "2024-01-15T00:00:00Z",
      "next_audit": "2024-04-15T00:00:00Z",
      "status": "compliant"
    }
  ],
  "violation_summary": [
    {
      "violation_type": "data_breach",
      "count": 5,
      "severity_breakdown": {
        "high": 2,
        "medium": 2,
        "low": 1
      },
      "status_breakdown": {
        "open": 1,
        "in_progress": 2,
        "resolved": 2
      }
    },
    {
      "violation_type": "consent_violation",
      "count": 3,
      "severity_breakdown": {
        "high": 1,
        "medium": 1,
        "low": 1
      },
      "status_breakdown": {
        "open": 0,
        "in_progress": 1,
        "resolved": 2
      }
    }
  ],
  "audit_schedule": [
    {
      "audit_id": "audit_123456789",
      "audit_name": "Q1 2024 GDPR Compliance Audit",
      "policy_id": "policy_123456789",
      "scheduled_start": "2024-04-01T09:00:00Z",
      "scheduled_end": "2024-04-05T17:00:00Z",
      "status": "scheduled",
      "auditor": "Jane Auditor"
    }
  ],
  "recent_activities": [
    {
      "activity_id": "act_123456789",
      "type": "violation_created",
      "description": "New data breach violation recorded",
      "timestamp": "2024-01-15T12:30:00Z",
      "policy_id": "policy_123456789",
      "severity": "high"
    },
    {
      "activity_id": "act_123456790",
      "type": "audit_completed",
      "description": "Q4 2023 GDPR audit completed",
      "timestamp": "2024-01-10T15:30:00Z",
      "policy_id": "policy_123456789",
      "result": "passed"
    }
  ],
  "alerts": [
    {
      "alert_id": "alert_123456789",
      "type": "warning",
      "title": "Policy Expiring Soon",
      "message": "GDPR Data Protection Policy expires in 30 days",
      "severity": "medium",
      "created_at": "2024-01-15T12:30:00Z",
      "acknowledged": false
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/compliance/dashboard?policy_id=policy_123456789&date_from=2024-01-01T00:00:00Z&date_to=2024-03-31T23:59:59Z"
```

### 6. Get Compliance Analytics
**GET** `/compliance/analytics`

Retrieves compliance analytics.

**Query Parameters:**
- `policy_id` (string, optional): Filter by policy
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `metric_type` (string, optional): Filter by metric type

**Response:**
```json
{
  "compliance_metrics": {
    "overall_compliance_score": 0.85,
    "policy_compliance_scores": [
      {
        "policy_id": "policy_123456789",
        "policy_name": "GDPR Data Protection Policy",
        "compliance_score": 0.90,
        "trend": "improving"
      }
    ],
    "requirement_compliance": [
      {
        "requirement_id": "req_123456789",
        "title": "Data Minimization",
        "compliance_score": 0.95,
        "trend": "stable"
      },
      {
        "requirement_id": "req_123456790",
        "title": "Consent Management",
        "compliance_score": 0.85,
        "trend": "improving"
      }
    ],
    "control_effectiveness": [
      {
        "control_id": "ctrl_123456789",
        "title": "Data Encryption",
        "effectiveness_rating": "high",
        "last_tested": "2024-01-15T00:00:00Z",
        "test_result": "passed"
      }
    ]
  },
  "violation_analytics": {
    "violation_trends": [
      {
        "date": "2024-01-15",
        "violations": 5,
        "resolved": 3,
        "net_violations": 2
      }
    ],
    "violation_categories": [
      {
        "category": "data_breach",
        "count": 5,
        "percentage": 50.0,
        "trend": "decreasing"
      },
      {
        "category": "consent_violation",
        "count": 3,
        "percentage": 30.0,
        "trend": "stable"
      }
    ],
    "severity_distribution": [
      {
        "severity": "high",
        "count": 3,
        "percentage": 30.0
      },
      {
        "severity": "medium",
        "count": 4,
        "percentage": 40.0
      },
      {
        "severity": "low",
        "count": 3,
        "percentage": 30.0
      }
    ]
  },
  "audit_analytics": {
    "audit_frequency": [
      {
        "audit_type": "internal",
        "count": 80,
        "average_duration": 5,
        "success_rate": 0.95
      },
      {
        "audit_type": "external",
        "count": 20,
        "average_duration": 10,
        "success_rate": 0.90
      }
    ],
    "audit_results": [
      {
        "result": "passed",
        "count": 85,
        "percentage": 85.0
      },
      {
        "result": "failed",
        "count": 10,
        "percentage": 10.0
      },
      {
        "result": "conditional",
        "count": 5,
        "percentage": 5.0
      }
    ]
  },
  "remediation_analytics": {
    "remediation_times": [
      {
        "severity": "high",
        "average_time": 7,
        "median_time": 5
      },
      {
        "severity": "medium",
        "average_time": 14,
        "median_time": 10
      },
      {
        "severity": "low",
        "average_time": 30,
        "median_time": 21
      }
    ],
    "remediation_effectiveness": [
      {
        "remediation_type": "technical_control",
        "effectiveness": 0.90,
        "recurrence_rate": 0.10
      },
      {
        "remediation_type": "process_improvement",
        "effectiveness": 0.85,
        "recurrence_rate": 0.15
      }
    ]
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/compliance/analytics?policy_id=policy_123456789&date_from=2024-01-01T00:00:00Z&date_to=2024-03-31T23:59:59Z&metric_type=compliance_score"
```

### 7. Update Compliance Status
**PUT** `/compliance/policies/{policy_id}/status`

Updates compliance policy status.

**Path Parameters:**
- `policy_id` (string, required): Policy identifier

**Request Body:**
```json
{
  "status": "under_review",
  "review_notes": "Policy under review for updates",
  "reviewed_by": "admin_123456789",
  "review_date": "2024-01-15T12:30:00Z",
  "next_review_date": "2024-04-15T00:00:00Z",
  "compliance_score": 0.90,
  "requirements_met": 18,
  "total_requirements": 20,
  "last_audit_date": "2024-01-15T00:00:00Z",
  "next_audit_date": "2024-04-15T00:00:00Z"
}
```

**Response:**
```json
{
  "policy_id": "policy_123456789",
  "status": "under_review",
  "review_notes": "Policy under review for updates",
  "reviewed_by": "admin_123456789",
  "review_date": "2024-01-15T12:30:00Z",
  "next_review_date": "2024-04-15T00:00:00Z",
  "compliance_score": 0.90,
  "requirements_met": 18,
  "total_requirements": 20,
  "last_audit_date": "2024-01-15T00:00:00Z",
  "next_audit_date": "2024-04-15T00:00:00Z",
  "updated_at": "2024-01-15T12:30:00Z",
  "updated_by": "admin_123456789"
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/compliance/policies/policy_123456789/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "status": "under_review",
    "review_notes": "Policy under review for updates",
    "reviewed_by": "admin_123456789",
    "review_date": "2024-01-15T12:30:00Z",
    "next_review_date": "2024-04-15T00:00:00Z",
    "compliance_score": 0.90,
    "requirements_met": 18,
    "total_requirements": 20,
    "last_audit_date": "2024-01-15T00:00:00Z",
    "next_audit_date": "2024-04-15T00:00:00Z"
  }'
```

### 8. Get Compliance Violations
**GET** `/compliance/violations`

Retrieves compliance violations.

**Query Parameters:**
- `policy_id` (string, optional): Filter by policy
- `violation_type` (string, optional): Filter by type
- `severity` (string, optional): Filter by severity
- `status` (string, optional): Filter by status
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of violations (default: 50)
- `offset` (integer, optional): Number of violations to skip (default: 0)

**Response:**
```json
{
  "violations": [
    {
      "violation_id": "viol_123456789",
      "policy_id": "policy_123456789",
      "requirement_id": "req_123456789",
      "violation_type": "data_breach",
      "severity": "high",
      "description": "Unauthorized access to personal data",
      "discovered_by": "security_team",
      "discovered_at": "2024-01-15T12:30:00Z",
      "affected_systems": ["user_service", "profile_service"],
      "affected_data": {
        "data_types": ["personal_information", "contact_details"],
        "data_subjects": 1000,
        "data_categories": ["customers", "employees"]
      },
      "root_cause": "Insufficient access controls",
      "impact_assessment": {
        "confidentiality": "high",
        "integrity": "medium",
        "availability": "low",
        "business_impact": "medium"
      },
      "remediation_plan": {
        "immediate_actions": [
          "Revoke unauthorized access",
          "Notify affected data subjects",
          "Implement additional monitoring"
        ],
        "long_term_actions": [
          "Review access controls",
          "Implement additional security measures",
          "Conduct security training"
        ],
        "target_completion": "2024-02-15T00:00:00Z"
      },
      "regulatory_notifications": {
        "dpa_notified": true,
        "dpa_notification_date": "2024-01-16T00:00:00Z",
        "data_subjects_notified": true,
        "data_subjects_notification_date": "2024-01-17T00:00:00Z"
      },
      "status": "open",
      "created_at": "2024-01-15T12:30:00Z",
      "created_by": "admin_123456789",
      "assigned_to": null,
      "resolved_at": null
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "policy_id": "policy_123456789",
    "violation_type": "data_breach",
    "severity": "high",
    "status": "open"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/compliance/violations?policy_id=policy_123456789&violation_type=data_breach&severity=high&status=open&limit=50&offset=0"
```

## Database Tables

### compliance_policies
Compliance policy definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| policy_id | text | Policy identifier |
| policy_name | text | Policy name |
| description | text | Policy description |
| regulatory_framework | text | Regulatory framework |
| version | text | Policy version |
| effective_date | timestamptz | Effective date |
| expiry_date | timestamptz | Expiry date |
| scope | text | Policy scope |
| applicable_regions | text[] | Applicable regions |
| policy_type | text | Policy type |
| priority | text | Policy priority |
| requirements | jsonb | Policy requirements |
| controls | jsonb | Policy controls |
| stakeholders | jsonb | Policy stakeholders |
| monitoring | jsonb | Monitoring configuration |
| status | text | Policy status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| last_reviewed | timestamptz | Last review timestamp |
| next_review | timestamptz | Next review timestamp |

### compliance_audits
Compliance audit records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| audit_id | text | Audit identifier |
| policy_id | uuid | Reference to compliance_policies |
| audit_name | text | Audit name |
| description | text | Audit description |
| audit_type | text | Audit type |
| audit_scope | text | Audit scope |
| auditor | jsonb | Auditor information |
| audit_period | jsonb | Audit period |
| audit_objectives | text[] | Audit objectives |
| audit_methodology | text[] | Audit methodology |
| audit_criteria | text[] | Audit criteria |
| audit_areas | jsonb | Audit areas |
| scheduled_start | timestamptz | Scheduled start |
| scheduled_end | timestamptz | Scheduled end |
| status | text | Audit status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| started_at | timestamptz | Start timestamp |
| completed_at | timestamptz | Completion timestamp |

### compliance_violations
Compliance violation records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| violation_id | text | Violation identifier |
| policy_id | uuid | Reference to compliance_policies |
| requirement_id | text | Requirement identifier |
| violation_type | text | Violation type |
| severity | text | Violation severity |
| description | text | Violation description |
| discovered_by | text | Discovered by |
| discovered_at | timestamptz | Discovery timestamp |
| affected_systems | text[] | Affected systems |
| affected_data | jsonb | Affected data |
| root_cause | text | Root cause |
| impact_assessment | jsonb | Impact assessment |
| remediation_plan | jsonb | Remediation plan |
| regulatory_notifications | jsonb | Regulatory notifications |
| status | text | Violation status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| assigned_to | uuid | Reference to admin_users |
| resolved_at | timestamptz | Resolution timestamp |

### compliance_reports
Compliance reports.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| report_id | text | Report identifier |
| report_name | text | Report name |
| description | text | Report description |
| report_type | text | Report type |
| reporting_period | jsonb | Reporting period |
| policies | text[] | Policy identifiers |
| report_sections | text[] | Report sections |
| audience | text | Report audience |
| format | text | Report format |
| include_charts | boolean | Include charts |
| include_details | boolean | Include details |
| distribution | jsonb | Distribution settings |
| status | text | Report status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| generated_at | timestamptz | Generation timestamp |
| file_url | text | Report file URL |

## Key Features

### 1. Policy Management
- Policy creation
- Requirement definition
- Control management
- Stakeholder assignment

### 2. Audit Management
- Audit planning
- Execution tracking
- Results recording
- Follow-up actions

### 3. Violation Management
- Violation recording
- Impact assessment
- Remediation planning
- Regulatory notifications

### 4. Reporting
- Report generation
- Dashboard analytics
- Compliance metrics
- Trend analysis

## Security Considerations

- Access control
- Audit logging
- Data privacy
- Regulatory compliance

## Integration Points

- **Audit Service**: Audit integration
- **Notification Service**: Alerts and notifications
- **Reporting Service**: Report generation
- **Admin Panel Service**: Management interface

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_policy_data",
  "message": "Invalid policy data",
  "details": {
    "field": "requirements",
    "issue": "Missing required requirements"
  }
}
```

**404 Not Found:**
```json
{
  "error": "policy_not_found",
  "message": "Compliance policy not found",
  "details": {
    "policy_id": "policy_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Policy validation failed",
  "details": {
    "issues": [
      "Missing required field: policy_name",
      "Invalid regulatory framework"
    ]
  }
}
```

## Rate Limiting

- Policy creation: 10 per hour per admin
- Audit creation: 20 per hour per admin
- Violation recording: 50 per hour per admin
- Report generation: 10 per hour per admin

## Compliance Features

### 1. Policy Management
- Creation
- Requirements
- Controls
- Stakeholders

### 2. Audit Management
- Planning
- Execution
- Results
- Follow-up

### 3. Violation Management
- Recording
- Assessment
- Remediation
- Notifications

### 4. Reporting
- Generation
- Analytics
- Metrics
- Trends