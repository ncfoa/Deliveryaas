# Security Service

## Overview
The Security Service provides comprehensive security management, threat detection, and security operations for the platform.

## Purpose
- Security management
- Threat detection
- Security operations
- Incident response

## Data Ownership
- `security_policies` - Security policy definitions
- `security_incidents` - Security incident records
- `threat_intelligence` - Threat intelligence data
- `security_controls` - Security control implementations

## API Endpoints

### 1. Create Security Policy
**POST** `/security/policies`

Creates a new security policy.

**Request Body:**
```json
{
  "policy_name": "Data Encryption Policy",
  "description": "Comprehensive data encryption policy for all data at rest and in transit",
  "policy_type": "technical",
  "category": "data_protection",
  "version": "1.0.0",
  "effective_date": "2024-01-01T00:00:00Z",
  "scope": "all_systems",
  "applicable_systems": ["user_service", "payment_service", "delivery_service"],
  "policy_owner": "security_team",
  "approval_status": "approved",
  "approved_by": "admin_123456789",
  "approval_date": "2024-01-01T00:00:00Z",
  "requirements": [
    {
      "requirement_id": "req_123456789",
      "title": "Encryption at Rest",
      "description": "All sensitive data must be encrypted at rest using AES-256",
      "mandatory": true,
      "implementation_guidance": "Use AES-256 encryption for all database fields containing sensitive data",
      "compliance_framework": "ISO27001",
      "risk_level": "high",
      "control_type": "technical"
    },
    {
      "requirement_id": "req_123456790",
      "title": "Encryption in Transit",
      "description": "All data transmission must use TLS 1.3 or higher",
      "mandatory": true,
      "implementation_guidance": "Implement TLS 1.3 for all API communications and web traffic",
      "compliance_framework": "ISO27001",
      "risk_level": "high",
      "control_type": "technical"
    }
  ],
  "controls": [
    {
      "control_id": "ctrl_123456789",
      "title": "Database Encryption",
      "description": "Encrypt all database tables containing sensitive data",
      "control_type": "technical",
      "implementation_status": "implemented",
      "effectiveness_rating": "high",
      "last_tested": "2024-01-15T00:00:00Z",
      "next_test": "2024-02-15T00:00:00Z",
      "test_results": "passed"
    }
  ],
  "monitoring": {
    "automated_monitoring": true,
    "manual_reviews": true,
    "audit_frequency": "monthly",
    "compliance_checks": "continuous",
    "alerting_enabled": true
  },
  "exceptions": [
    {
      "exception_id": "exc_123456789",
      "title": "Legacy System Exception",
      "description": "Legacy system X temporarily exempted from TLS 1.3 requirement",
      "justification": "System scheduled for decommissioning in Q2 2024",
      "expiry_date": "2024-06-30T23:59:59Z",
      "approved_by": "admin_123456789"
    }
  ],
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "policy_id": "policy_123456789",
  "policy_name": "Data Encryption Policy",
  "description": "Comprehensive data encryption policy for all data at rest and in transit",
  "policy_type": "technical",
  "category": "data_protection",
  "version": "1.0.0",
  "effective_date": "2024-01-01T00:00:00Z",
  "scope": "all_systems",
  "applicable_systems": ["user_service", "payment_service", "delivery_service"],
  "policy_owner": "security_team",
  "approval_status": "approved",
  "approved_by": "admin_123456789",
  "approval_date": "2024-01-01T00:00:00Z",
  "requirements": [
    {
      "requirement_id": "req_123456789",
      "title": "Encryption at Rest",
      "description": "All sensitive data must be encrypted at rest using AES-256",
      "mandatory": true,
      "implementation_guidance": "Use AES-256 encryption for all database fields containing sensitive data",
      "compliance_framework": "ISO27001",
      "risk_level": "high",
      "control_type": "technical"
    },
    {
      "requirement_id": "req_123456790",
      "title": "Encryption in Transit",
      "description": "All data transmission must use TLS 1.3 or higher",
      "mandatory": true,
      "implementation_guidance": "Implement TLS 1.3 for all API communications and web traffic",
      "compliance_framework": "ISO27001",
      "risk_level": "high",
      "control_type": "technical"
    }
  ],
  "controls": [
    {
      "control_id": "ctrl_123456789",
      "title": "Database Encryption",
      "description": "Encrypt all database tables containing sensitive data",
      "control_type": "technical",
      "implementation_status": "implemented",
      "effectiveness_rating": "high",
      "last_tested": "2024-01-15T00:00:00Z",
      "next_test": "2024-02-15T00:00:00Z",
      "test_results": "passed"
    }
  ],
  "monitoring": {
    "automated_monitoring": true,
    "manual_reviews": true,
    "audit_frequency": "monthly",
    "compliance_checks": "continuous",
    "alerting_enabled": true
  },
  "exceptions": [
    {
      "exception_id": "exc_123456789",
      "title": "Legacy System Exception",
      "description": "Legacy system X temporarily exempted from TLS 1.3 requirement",
      "justification": "System scheduled for decommissioning in Q2 2024",
      "expiry_date": "2024-06-30T23:59:59Z",
      "approved_by": "admin_123456789"
    }
  ],
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "last_reviewed": null,
  "next_review": "2024-04-15T00:00:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/security/policies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "policy_name": "Data Encryption Policy",
    "description": "Comprehensive data encryption policy for all data at rest and in transit",
    "policy_type": "technical",
    "category": "data_protection",
    "version": "1.0.0",
    "effective_date": "2024-01-01T00:00:00Z",
    "scope": "all_systems",
    "applicable_systems": ["user_service", "payment_service", "delivery_service"],
    "policy_owner": "security_team",
    "approval_status": "approved",
    "approved_by": "admin_123456789",
    "approval_date": "2024-01-01T00:00:00Z",
    "requirements": [
      {
        "requirement_id": "req_123456789",
        "title": "Encryption at Rest",
        "description": "All sensitive data must be encrypted at rest using AES-256",
        "mandatory": true,
        "implementation_guidance": "Use AES-256 encryption for all database fields containing sensitive data",
        "compliance_framework": "ISO27001",
        "risk_level": "high",
        "control_type": "technical"
      },
      {
        "requirement_id": "req_123456790",
        "title": "Encryption in Transit",
        "description": "All data transmission must use TLS 1.3 or higher",
        "mandatory": true,
        "implementation_guidance": "Implement TLS 1.3 for all API communications and web traffic",
        "compliance_framework": "ISO27001",
        "risk_level": "high",
        "control_type": "technical"
      }
    ],
    "controls": [
      {
        "control_id": "ctrl_123456789",
        "title": "Database Encryption",
        "description": "Encrypt all database tables containing sensitive data",
        "control_type": "technical",
        "implementation_status": "implemented",
        "effectiveness_rating": "high",
        "last_tested": "2024-01-15T00:00:00Z",
        "next_test": "2024-02-15T00:00:00Z",
        "test_results": "passed"
      }
    ],
    "monitoring": {
      "automated_monitoring": true,
      "manual_reviews": true,
      "audit_frequency": "monthly",
      "compliance_checks": "continuous",
      "alerting_enabled": true
    },
    "exceptions": [
      {
        "exception_id": "exc_123456789",
        "title": "Legacy System Exception",
        "description": "Legacy system X temporarily exempted from TLS 1.3 requirement",
        "justification": "System scheduled for decommissioning in Q2 2024",
        "expiry_date": "2024-06-30T23:59:59Z",
        "approved_by": "admin_123456789"
      }
    ],
    "created_by": "admin_123456789"
  }'
```

### 2. Create Security Incident
**POST** `/security/incidents`

Creates a new security incident.

**Request Body:**
```json
{
  "incident_id": "inc_123456789",
  "title": "Suspicious Login Attempts",
  "description": "Multiple failed login attempts detected from suspicious IP addresses",
  "incident_type": "unauthorized_access",
  "severity": "medium",
  "priority": "high",
  "status": "open",
  "discovered_by": "security_monitoring",
  "discovered_at": "2024-01-15T12:30:00Z",
  "affected_systems": ["user_service", "authentication_service"],
  "affected_users": 150,
  "attack_vector": "brute_force",
  "threat_actor": "unknown",
  "indicators_of_compromise": [
    "Multiple failed login attempts",
    "Suspicious IP addresses",
    "Unusual login patterns"
  ],
  "impact_assessment": {
    "confidentiality": "medium",
    "integrity": "low",
    "availability": "low",
    "business_impact": "medium",
    "financial_impact": 0,
    "reputation_impact": "low"
  },
  "response_plan": {
    "immediate_actions": [
      "Block suspicious IP addresses",
      "Enable additional monitoring",
      "Notify security team"
    ],
    "investigation_steps": [
      "Analyze login logs",
      "Check for data exfiltration",
      "Review user accounts"
    ],
    "remediation_steps": [
      "Implement rate limiting",
      "Enhance monitoring",
      "Update security controls"
    ]
  },
  "timeline": [
    {
      "timestamp": "2024-01-15T12:30:00Z",
      "event": "Incident discovered",
      "description": "Security monitoring detected suspicious activity",
      "actor": "system"
    }
  ],
  "assigned_to": "security_analyst_123456789",
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "incident_id": "inc_123456789",
  "title": "Suspicious Login Attempts",
  "description": "Multiple failed login attempts detected from suspicious IP addresses",
  "incident_type": "unauthorized_access",
  "severity": "medium",
  "priority": "high",
  "status": "open",
  "discovered_by": "security_monitoring",
  "discovered_at": "2024-01-15T12:30:00Z",
  "affected_systems": ["user_service", "authentication_service"],
  "affected_users": 150,
  "attack_vector": "brute_force",
  "threat_actor": "unknown",
  "indicators_of_compromise": [
    "Multiple failed login attempts",
    "Suspicious IP addresses",
    "Unusual login patterns"
  ],
  "impact_assessment": {
    "confidentiality": "medium",
    "integrity": "low",
    "availability": "low",
    "business_impact": "medium",
    "financial_impact": 0,
    "reputation_impact": "low"
  },
  "response_plan": {
    "immediate_actions": [
      "Block suspicious IP addresses",
      "Enable additional monitoring",
      "Notify security team"
    ],
    "investigation_steps": [
      "Analyze login logs",
      "Check for data exfiltration",
      "Review user accounts"
    ],
    "remediation_steps": [
      "Implement rate limiting",
      "Enhance monitoring",
      "Update security controls"
    ]
  },
  "timeline": [
    {
      "timestamp": "2024-01-15T12:30:00Z",
      "event": "Incident discovered",
      "description": "Security monitoring detected suspicious activity",
      "actor": "system"
    }
  ],
  "assigned_to": "security_analyst_123456789",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "resolved_at": null,
  "closed_at": null
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/security/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "incident_id": "inc_123456789",
    "title": "Suspicious Login Attempts",
    "description": "Multiple failed login attempts detected from suspicious IP addresses",
    "incident_type": "unauthorized_access",
    "severity": "medium",
    "priority": "high",
    "status": "open",
    "discovered_by": "security_monitoring",
    "discovered_at": "2024-01-15T12:30:00Z",
    "affected_systems": ["user_service", "authentication_service"],
    "affected_users": 150,
    "attack_vector": "brute_force",
    "threat_actor": "unknown",
    "indicators_of_compromise": [
      "Multiple failed login attempts",
      "Suspicious IP addresses",
      "Unusual login patterns"
    ],
    "impact_assessment": {
      "confidentiality": "medium",
      "integrity": "low",
      "availability": "low",
      "business_impact": "medium",
      "financial_impact": 0,
      "reputation_impact": "low"
    },
    "response_plan": {
      "immediate_actions": [
        "Block suspicious IP addresses",
        "Enable additional monitoring",
        "Notify security team"
      ],
      "investigation_steps": [
        "Analyze login logs",
        "Check for data exfiltration",
        "Review user accounts"
      ],
      "remediation_steps": [
        "Implement rate limiting",
        "Enhance monitoring",
        "Update security controls"
      ]
    },
    "timeline": [
      {
        "timestamp": "2024-01-15T12:30:00Z",
        "event": "Incident discovered",
        "description": "Security monitoring detected suspicious activity",
        "actor": "system"
      }
    ],
    "assigned_to": "security_analyst_123456789",
    "created_by": "admin_123456789"
  }'
```

### 3. Update Security Incident
**PUT** `/security/incidents/{incident_id}`

Updates a security incident.

**Path Parameters:**
- `incident_id` (string, required): Incident identifier

**Request Body:**
```json
{
  "status": "investigating",
  "priority": "high",
  "assigned_to": "security_analyst_123456789",
  "update_notes": "Incident escalated to security analyst for investigation",
  "timeline": [
    {
      "timestamp": "2024-01-15T12:30:00Z",
      "event": "Incident discovered",
      "description": "Security monitoring detected suspicious activity",
      "actor": "system"
    },
    {
      "timestamp": "2024-01-15T12:35:00Z",
      "event": "Incident assigned",
      "description": "Incident assigned to security analyst",
      "actor": "admin_123456789"
    },
    {
      "timestamp": "2024-01-15T12:40:00Z",
      "event": "Investigation started",
      "description": "Security analyst began investigation",
      "actor": "security_analyst_123456789"
    }
  ],
  "response_plan": {
    "immediate_actions": [
      "Block suspicious IP addresses",
      "Enable additional monitoring",
      "Notify security team",
      "Review user accounts"
    ],
    "investigation_steps": [
      "Analyze login logs",
      "Check for data exfiltration",
      "Review user accounts",
      "Check for lateral movement"
    ],
    "remediation_steps": [
      "Implement rate limiting",
      "Enhance monitoring",
      "Update security controls",
      "Conduct security training"
    ]
  },
  "updated_by": "security_analyst_123456789"
}
```

**Response:**
```json
{
  "incident_id": "inc_123456789",
  "title": "Suspicious Login Attempts",
  "description": "Multiple failed login attempts detected from suspicious IP addresses",
  "incident_type": "unauthorized_access",
  "severity": "medium",
  "priority": "high",
  "status": "investigating",
  "discovered_by": "security_monitoring",
  "discovered_at": "2024-01-15T12:30:00Z",
  "affected_systems": ["user_service", "authentication_service"],
  "affected_users": 150,
  "attack_vector": "brute_force",
  "threat_actor": "unknown",
  "indicators_of_compromise": [
    "Multiple failed login attempts",
    "Suspicious IP addresses",
    "Unusual login patterns"
  ],
  "impact_assessment": {
    "confidentiality": "medium",
    "integrity": "low",
    "availability": "low",
    "business_impact": "medium",
    "financial_impact": 0,
    "reputation_impact": "low"
  },
  "response_plan": {
    "immediate_actions": [
      "Block suspicious IP addresses",
      "Enable additional monitoring",
      "Notify security team",
      "Review user accounts"
    ],
    "investigation_steps": [
      "Analyze login logs",
      "Check for data exfiltration",
      "Review user accounts",
      "Check for lateral movement"
    ],
    "remediation_steps": [
      "Implement rate limiting",
      "Enhance monitoring",
      "Update security controls",
      "Conduct security training"
    ]
  },
  "timeline": [
    {
      "timestamp": "2024-01-15T12:30:00Z",
      "event": "Incident discovered",
      "description": "Security monitoring detected suspicious activity",
      "actor": "system"
    },
    {
      "timestamp": "2024-01-15T12:35:00Z",
      "event": "Incident assigned",
      "description": "Incident assigned to security analyst",
      "actor": "admin_123456789"
    },
    {
      "timestamp": "2024-01-15T12:40:00Z",
      "event": "Investigation started",
      "description": "Security analyst began investigation",
      "actor": "security_analyst_123456789"
    }
  ],
  "assigned_to": "security_analyst_123456789",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "updated_at": "2024-01-15T12:40:00Z",
  "updated_by": "security_analyst_123456789",
  "resolved_at": null,
  "closed_at": null
}
```

**Example Usage:**
```bash
curl -X PUT https://api.delivery.com/security/incidents/inc_123456789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "status": "investigating",
    "priority": "high",
    "assigned_to": "security_analyst_123456789",
    "update_notes": "Incident escalated to security analyst for investigation",
    "timeline": [
      {
        "timestamp": "2024-01-15T12:30:00Z",
        "event": "Incident discovered",
        "description": "Security monitoring detected suspicious activity",
        "actor": "system"
      },
      {
        "timestamp": "2024-01-15T12:35:00Z",
        "event": "Incident assigned",
        "description": "Incident assigned to security analyst",
        "actor": "admin_123456789"
      },
      {
        "timestamp": "2024-01-15T12:40:00Z",
        "event": "Investigation started",
        "description": "Security analyst began investigation",
        "actor": "security_analyst_123456789"
      }
    ],
    "response_plan": {
      "immediate_actions": [
        "Block suspicious IP addresses",
        "Enable additional monitoring",
        "Notify security team",
        "Review user accounts"
      ],
      "investigation_steps": [
        "Analyze login logs",
        "Check for data exfiltration",
        "Review user accounts",
        "Check for lateral movement"
      ],
      "remediation_steps": [
        "Implement rate limiting",
        "Enhance monitoring",
        "Update security controls",
        "Conduct security training"
      ]
    },
    "updated_by": "security_analyst_123456789"
  }'
```

### 4. Add Threat Intelligence
**POST** `/security/threat-intelligence`

Adds threat intelligence data.

**Request Body:**
```json
{
  "threat_id": "threat_123456789",
  "threat_type": "malware",
  "threat_name": "Trojan.Generic.123456",
  "description": "Generic trojan detected in the wild",
  "severity": "high",
  "confidence": 0.85,
  "source": "security_vendor",
  "source_reliability": "high",
  "threat_actor": "unknown",
  "attack_vector": "email_attachment",
  "target_systems": ["windows", "linux"],
  "target_applications": ["email_clients", "web_browsers"],
  "indicators": [
    {
      "type": "file_hash",
      "value": "a1b2c3d4e5f6789012345678901234567890abcd",
      "description": "MD5 hash of malicious file"
    },
    {
      "type": "ip_address",
      "value": "192.168.1.100",
      "description": "Command and control server IP"
    },
    {
      "type": "domain",
      "value": "malicious-domain.com",
      "description": "Malicious domain used for C2"
    }
  ],
  "mitigation_actions": [
    "Block malicious IP addresses",
    "Update antivirus signatures",
    "Implement email filtering",
    "Conduct security awareness training"
  ],
  "references": [
    "https://threat-intel.example.com/reports/trojan-generic-123456",
    "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-1234"
  ],
  "valid_from": "2024-01-15T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z",
  "created_by": "admin_123456789"
}
```

**Response:**
```json
{
  "threat_id": "threat_123456789",
  "threat_type": "malware",
  "threat_name": "Trojan.Generic.123456",
  "description": "Generic trojan detected in the wild",
  "severity": "high",
  "confidence": 0.85,
  "source": "security_vendor",
  "source_reliability": "high",
  "threat_actor": "unknown",
  "attack_vector": "email_attachment",
  "target_systems": ["windows", "linux"],
  "target_applications": ["email_clients", "web_browsers"],
  "indicators": [
    {
      "type": "file_hash",
      "value": "a1b2c3d4e5f6789012345678901234567890abcd",
      "description": "MD5 hash of malicious file"
    },
    {
      "type": "ip_address",
      "value": "192.168.1.100",
      "description": "Command and control server IP"
    },
    {
      "type": "domain",
      "value": "malicious-domain.com",
      "description": "Malicious domain used for C2"
    }
  ],
  "mitigation_actions": [
    "Block malicious IP addresses",
    "Update antivirus signatures",
    "Implement email filtering",
    "Conduct security awareness training"
  ],
  "references": [
    "https://threat-intel.example.com/reports/trojan-generic-123456",
    "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-1234"
  ],
  "valid_from": "2024-01-15T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z",
  "status": "active",
  "created_at": "2024-01-15T12:30:00Z",
  "created_by": "admin_123456789",
  "last_updated": "2024-01-15T12:30:00Z"
}
```

**Example Usage:**
```bash
curl -X POST https://api.delivery.com/security/threat-intelligence \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_jwt_token_here" \
  -d '{
    "threat_id": "threat_123456789",
    "threat_type": "malware",
    "threat_name": "Trojan.Generic.123456",
    "description": "Generic trojan detected in the wild",
    "severity": "high",
    "confidence": 0.85,
    "source": "security_vendor",
    "source_reliability": "high",
    "threat_actor": "unknown",
    "attack_vector": "email_attachment",
    "target_systems": ["windows", "linux"],
    "target_applications": ["email_clients", "web_browsers"],
    "indicators": [
      {
        "type": "file_hash",
        "value": "a1b2c3d4e5f6789012345678901234567890abcd",
        "description": "MD5 hash of malicious file"
      },
      {
        "type": "ip_address",
        "value": "192.168.1.100",
        "description": "Command and control server IP"
      },
      {
        "type": "domain",
        "value": "malicious-domain.com",
        "description": "Malicious domain used for C2"
      }
    ],
    "mitigation_actions": [
      "Block malicious IP addresses",
      "Update antivirus signatures",
      "Implement email filtering",
      "Conduct security awareness training"
    ],
    "references": [
      "https://threat-intel.example.com/reports/trojan-generic-123456",
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-1234"
    ],
    "valid_from": "2024-01-15T00:00:00Z",
    "valid_until": "2024-12-31T23:59:59Z",
    "created_by": "admin_123456789"
  }'
```

### 5. Get Security Dashboard
**GET** `/security/dashboard`

Retrieves security dashboard data.

**Query Parameters:**
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `severity` (string, optional): Filter by severity

**Response:**
```json
{
  "overview": {
    "total_incidents": 150,
    "open_incidents": 25,
    "resolved_incidents": 120,
    "critical_incidents": 5,
    "high_priority_incidents": 15,
    "medium_priority_incidents": 30,
    "low_priority_incidents": 100,
    "average_resolution_time": 24,
    "security_score": 0.85
  },
  "incident_summary": [
    {
      "incident_type": "unauthorized_access",
      "count": 50,
      "severity_breakdown": {
        "critical": 5,
        "high": 15,
        "medium": 20,
        "low": 10
      },
      "status_breakdown": {
        "open": 10,
        "investigating": 15,
        "resolved": 25
      }
    },
    {
      "incident_type": "malware",
      "count": 30,
      "severity_breakdown": {
        "critical": 2,
        "high": 8,
        "medium": 15,
        "low": 5
      },
      "status_breakdown": {
        "open": 5,
        "investigating": 10,
        "resolved": 15
      }
    }
  ],
  "threat_intelligence": {
    "total_threats": 500,
    "active_threats": 450,
    "expired_threats": 50,
    "threat_types": [
      {
        "type": "malware",
        "count": 200,
        "severity_breakdown": {
          "critical": 20,
          "high": 80,
          "medium": 80,
          "low": 20
        }
      },
      {
        "type": "phishing",
        "count": 150,
        "severity_breakdown": {
          "critical": 10,
          "high": 60,
          "medium": 60,
          "low": 20
        }
      }
    ]
  },
  "security_policies": {
    "total_policies": 25,
    "active_policies": 20,
    "expired_policies": 3,
    "expiring_soon": 2,
    "compliance_score": 0.90
  },
  "recent_activities": [
    {
      "activity_id": "act_123456789",
      "type": "incident_created",
      "description": "New security incident created: Suspicious Login Attempts",
      "timestamp": "2024-01-15T12:30:00Z",
      "severity": "medium"
    },
    {
      "activity_id": "act_123456790",
      "type": "threat_detected",
      "description": "New threat detected: Trojan.Generic.123456",
      "timestamp": "2024-01-15T11:30:00Z",
      "severity": "high"
    }
  ],
  "alerts": [
    {
      "alert_id": "alert_123456789",
      "type": "warning",
      "title": "High Priority Incident",
      "message": "Critical security incident requires immediate attention",
      "severity": "high",
      "created_at": "2024-01-15T12:30:00Z",
      "acknowledged": false
    }
  ],
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/security/dashboard?date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&severity=high"
```

### 6. Get Security Analytics
**GET** `/security/analytics`

Retrieves security analytics.

**Query Parameters:**
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `metric_type` (string, optional): Filter by metric type

**Response:**
```json
{
  "incident_analytics": {
    "incident_trends": [
      {
        "date": "2024-01-15",
        "incidents": 10,
        "resolved": 8,
        "net_incidents": 2
      }
    ],
    "incident_categories": [
      {
        "category": "unauthorized_access",
        "count": 50,
        "percentage": 33.3,
        "trend": "increasing"
      },
      {
        "category": "malware",
        "count": 30,
        "percentage": 20.0,
        "trend": "stable"
      }
    ],
    "severity_distribution": [
      {
        "severity": "critical",
        "count": 5,
        "percentage": 3.3
      },
      {
        "severity": "high",
        "count": 25,
        "percentage": 16.7
      },
      {
        "severity": "medium",
        "count": 60,
        "percentage": 40.0
      },
      {
        "severity": "low",
        "count": 60,
        "percentage": 40.0
      }
    ],
    "resolution_times": [
      {
        "severity": "critical",
        "average_time": 4,
        "median_time": 2
      },
      {
        "severity": "high",
        "average_time": 12,
        "median_time": 8
      },
      {
        "severity": "medium",
        "average_time": 48,
        "median_time": 24
      },
      {
        "severity": "low",
        "average_time": 168,
        "median_time": 72
      }
    ]
  },
  "threat_analytics": {
    "threat_trends": [
      {
        "date": "2024-01-15",
        "threats": 5,
        "expired": 2,
        "net_threats": 3
      }
    ],
    "threat_sources": [
      {
        "source": "security_vendor",
        "count": 200,
        "percentage": 40.0,
        "reliability": "high"
      },
      {
        "source": "internal_research",
        "count": 150,
        "percentage": 30.0,
        "reliability": "medium"
      }
    ],
    "attack_vectors": [
      {
        "vector": "email_attachment",
        "count": 100,
        "percentage": 20.0,
        "trend": "increasing"
      },
      {
        "vector": "web_exploit",
        "count": 80,
        "percentage": 16.0,
        "trend": "stable"
      }
    ]
  },
  "policy_analytics": {
    "policy_compliance": [
      {
        "policy_id": "policy_123456789",
        "policy_name": "Data Encryption Policy",
        "compliance_score": 0.95,
        "requirements_met": 19,
        "total_requirements": 20,
        "last_audit": "2024-01-15T00:00:00Z"
      }
    ],
    "control_effectiveness": [
      {
        "control_id": "ctrl_123456789",
        "title": "Database Encryption",
        "effectiveness_rating": "high",
        "last_tested": "2024-01-15T00:00:00Z",
        "test_result": "passed"
      }
    ]
  },
  "generated_at": "2024-01-15T14:30:00Z"
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/security/analytics?date_from=2024-01-01T00:00:00Z&date_to=2024-01-31T23:59:59Z&metric_type=incident_trends"
```

### 7. Get Security Incidents
**GET** `/security/incidents`

Retrieves security incidents.

**Query Parameters:**
- `incident_type` (string, optional): Filter by type
- `severity` (string, optional): Filter by severity
- `status` (string, optional): Filter by status
- `assigned_to` (string, optional): Filter by assignee
- `date_from` (string, optional): Start date filter
- `date_to` (string, optional): End date filter
- `limit` (integer, optional): Number of incidents (default: 50)
- `offset` (integer, optional): Number of incidents to skip (default: 0)

**Response:**
```json
{
  "incidents": [
    {
      "incident_id": "inc_123456789",
      "title": "Suspicious Login Attempts",
      "description": "Multiple failed login attempts detected from suspicious IP addresses",
      "incident_type": "unauthorized_access",
      "severity": "medium",
      "priority": "high",
      "status": "investigating",
      "discovered_by": "security_monitoring",
      "discovered_at": "2024-01-15T12:30:00Z",
      "affected_systems": ["user_service", "authentication_service"],
      "affected_users": 150,
      "attack_vector": "brute_force",
      "threat_actor": "unknown",
      "indicators_of_compromise": [
        "Multiple failed login attempts",
        "Suspicious IP addresses",
        "Unusual login patterns"
      ],
      "impact_assessment": {
        "confidentiality": "medium",
        "integrity": "low",
        "availability": "low",
        "business_impact": "medium",
        "financial_impact": 0,
        "reputation_impact": "low"
      },
      "assigned_to": "security_analyst_123456789",
      "created_at": "2024-01-15T12:30:00Z",
      "created_by": "admin_123456789",
      "updated_at": "2024-01-15T12:40:00Z",
      "updated_by": "security_analyst_123456789",
      "resolved_at": null,
      "closed_at": null
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "incident_type": "unauthorized_access",
    "severity": "medium",
    "status": "investigating"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/security/incidents?incident_type=unauthorized_access&severity=medium&status=investigating&limit=50&offset=0"
```

### 8. Get Security Policies
**GET** `/security/policies`

Retrieves security policies.

**Query Parameters:**
- `policy_type` (string, optional): Filter by type
- `category` (string, optional): Filter by category
- `status` (string, optional): Filter by status
- `policy_owner` (string, optional): Filter by owner
- `limit` (integer, optional): Number of policies (default: 50)
- `offset` (integer, optional): Number of policies to skip (default: 0)

**Response:**
```json
{
  "policies": [
    {
      "policy_id": "policy_123456789",
      "policy_name": "Data Encryption Policy",
      "description": "Comprehensive data encryption policy for all data at rest and in transit",
      "policy_type": "technical",
      "category": "data_protection",
      "version": "1.0.0",
      "effective_date": "2024-01-01T00:00:00Z",
      "scope": "all_systems",
      "applicable_systems": ["user_service", "payment_service", "delivery_service"],
      "policy_owner": "security_team",
      "approval_status": "approved",
      "approved_by": "admin_123456789",
      "approval_date": "2024-01-01T00:00:00Z",
      "requirements": [
        {
          "requirement_id": "req_123456789",
          "title": "Encryption at Rest",
          "description": "All sensitive data must be encrypted at rest using AES-256",
          "mandatory": true,
          "implementation_guidance": "Use AES-256 encryption for all database fields containing sensitive data",
          "compliance_framework": "ISO27001",
          "risk_level": "high",
          "control_type": "technical"
        },
        {
          "requirement_id": "req_123456790",
          "title": "Encryption in Transit",
          "description": "All data transmission must use TLS 1.3 or higher",
          "mandatory": true,
          "implementation_guidance": "Implement TLS 1.3 for all API communications and web traffic",
          "compliance_framework": "ISO27001",
          "risk_level": "high",
          "control_type": "technical"
        }
      ],
      "controls": [
        {
          "control_id": "ctrl_123456789",
          "title": "Database Encryption",
          "description": "Encrypt all database tables containing sensitive data",
          "control_type": "technical",
          "implementation_status": "implemented",
          "effectiveness_rating": "high",
          "last_tested": "2024-01-15T00:00:00Z",
          "next_test": "2024-02-15T00:00:00Z",
          "test_results": "passed"
        }
      ],
      "monitoring": {
        "automated_monitoring": true,
        "manual_reviews": true,
        "audit_frequency": "monthly",
        "compliance_checks": "continuous",
        "alerting_enabled": true
      },
      "exceptions": [
        {
          "exception_id": "exc_123456789",
          "title": "Legacy System Exception",
          "description": "Legacy system X temporarily exempted from TLS 1.3 requirement",
          "justification": "System scheduled for decommissioning in Q2 2024",
          "expiry_date": "2024-06-30T23:59:59Z",
          "approved_by": "admin_123456789"
        }
      ],
      "status": "active",
      "created_at": "2024-01-15T12:30:00Z",
      "created_by": "admin_123456789",
      "last_reviewed": null,
      "next_review": "2024-04-15T00:00:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0,
  "filters": {
    "policy_type": "technical",
    "category": "data_protection",
    "status": "active"
  }
}
```

**Example Usage:**
```bash
curl -X GET "https://api.delivery.com/security/policies?policy_type=technical&category=data_protection&status=active&limit=50&offset=0"
```

## Database Tables

### security_policies
Security policy definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| policy_id | text | Policy identifier |
| policy_name | text | Policy name |
| description | text | Policy description |
| policy_type | text | Policy type |
| category | text | Policy category |
| version | text | Policy version |
| effective_date | timestamptz | Effective date |
| scope | text | Policy scope |
| applicable_systems | text[] | Applicable systems |
| policy_owner | text | Policy owner |
| approval_status | text | Approval status |
| approved_by | uuid | Reference to admin_users |
| approval_date | timestamptz | Approval date |
| requirements | jsonb | Policy requirements |
| controls | jsonb | Policy controls |
| monitoring | jsonb | Monitoring configuration |
| exceptions | jsonb | Policy exceptions |
| status | text | Policy status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| last_reviewed | timestamptz | Last review timestamp |
| next_review | timestamptz | Next review timestamp |

### security_incidents
Security incident records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| incident_id | text | Incident identifier |
| title | text | Incident title |
| description | text | Incident description |
| incident_type | text | Incident type |
| severity | text | Incident severity |
| priority | text | Incident priority |
| status | text | Incident status |
| discovered_by | text | Discovered by |
| discovered_at | timestamptz | Discovery timestamp |
| affected_systems | text[] | Affected systems |
| affected_users | integer | Affected users count |
| attack_vector | text | Attack vector |
| threat_actor | text | Threat actor |
| indicators_of_compromise | text[] | IOCs |
| impact_assessment | jsonb | Impact assessment |
| response_plan | jsonb | Response plan |
| timeline | jsonb | Incident timeline |
| assigned_to | uuid | Reference to admin_users |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| updated_at | timestamptz | Last update timestamp |
| updated_by | uuid | Reference to admin_users |
| resolved_at | timestamptz | Resolution timestamp |
| closed_at | timestamptz | Closure timestamp |

### threat_intelligence
Threat intelligence data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| threat_id | text | Threat identifier |
| threat_type | text | Threat type |
| threat_name | text | Threat name |
| description | text | Threat description |
| severity | text | Threat severity |
| confidence | decimal | Confidence level |
| source | text | Threat source |
| source_reliability | text | Source reliability |
| threat_actor | text | Threat actor |
| attack_vector | text | Attack vector |
| target_systems | text[] | Target systems |
| target_applications | text[] | Target applications |
| indicators | jsonb | Threat indicators |
| mitigation_actions | text[] | Mitigation actions |
| references | text[] | References |
| valid_from | timestamptz | Valid from timestamp |
| valid_until | timestamptz | Valid until timestamp |
| status | text | Threat status |
| created_at | timestamptz | Creation timestamp |
| created_by | uuid | Reference to admin_users |
| last_updated | timestamptz | Last update timestamp |

### security_controls
Security control implementations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| control_id | text | Control identifier |
| policy_id | uuid | Reference to security_policies |
| title | text | Control title |
| description | text | Control description |
| control_type | text | Control type |
| implementation_status | text | Implementation status |
| effectiveness_rating | text | Effectiveness rating |
| last_tested | timestamptz | Last test timestamp |
| next_test | timestamptz | Next test timestamp |
| test_results | text | Test results |
| test_evidence | jsonb | Test evidence |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Key Features

### 1. Policy Management
- Policy creation
- Requirement definition
- Control management
- Exception handling

### 2. Incident Management
- Incident creation
- Investigation tracking
- Response planning
- Resolution management

### 3. Threat Intelligence
- Threat data collection
- Indicator management
- Mitigation actions
- Source reliability

### 4. Security Analytics
- Incident analytics
- Threat trends
- Policy compliance
- Control effectiveness

## Security Considerations

- Access control
- Audit logging
- Data encryption
- Secure communications

## Integration Points

- **Monitoring Service**: Security monitoring
- **Notification Service**: Security alerts
- **Audit Service**: Security auditing
- **Compliance Service**: Security compliance

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "invalid_security_policy",
  "message": "Invalid security policy",
  "details": {
    "field": "requirements",
    "issue": "Missing required requirements"
  }
}
```

**404 Not Found:**
```json
{
  "error": "incident_not_found",
  "message": "Security incident not found",
  "details": {
    "incident_id": "inc_123456789"
  }
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "validation_failed",
  "message": "Security policy validation failed",
  "details": {
    "issues": [
      "Missing required field: policy_name",
      "Invalid severity level"
    ]
  }
}
```

## Rate Limiting

- Policy creation: 10 per hour per admin
- Incident creation: 50 per hour per admin
- Threat intelligence: 100 per hour per admin
- Dashboard queries: 100 per hour per admin

## Security Features

### 1. Policy Management
- Creation
- Requirements
- Controls
- Exceptions

### 2. Incident Management
- Creation
- Investigation
- Response
- Resolution

### 3. Threat Intelligence
- Collection
- Indicators
- Mitigation
- Sources

### 4. Analytics
- Incidents
- Threats
- Policies
- Controls