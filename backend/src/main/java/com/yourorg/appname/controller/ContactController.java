package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.ContactInquiryRequest;
import com.yourorg.appname.dto.request.NewsletterRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<Void>> submitInquiry(@Valid @RequestBody ContactInquiryRequest request) {
        contactService.submitInquiry(request);
        return ResponseEntity.ok(ApiResponse.success("Thank you for reaching out. Our roastery team will reply shortly.", null));
    }

    @PostMapping("/newsletter/subscribe")
    public ResponseEntity<ApiResponse<Void>> subscribeNewsletter(@Valid @RequestBody NewsletterRequest request) {
        contactService.subscribeNewsletter(request);
        return ResponseEntity.ok(ApiResponse.success("You are subscribed to the Nocturne Letters.", null));
    }
}
