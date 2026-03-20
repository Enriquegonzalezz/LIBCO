package com.librarycomponents.backend.controller;

import com.librarycomponents.backend.service.ComponentAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditController {

    @Autowired
    private ComponentAuditService auditService;

    @GetMapping("/verify-new-components")
    public ResponseEntity<ComponentAuditService.VerificationResponse> verifyNewComponents() {
        ComponentAuditService.VerificationResponse response = auditService.verifyNewComponents();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check-daily")
    public ResponseEntity<ComponentAuditService.VerificationResponse> checkDailyComponents() {
        ComponentAuditService.VerificationResponse response = auditService.verifyNewComponents();
        return ResponseEntity.ok(response);
    }
}
