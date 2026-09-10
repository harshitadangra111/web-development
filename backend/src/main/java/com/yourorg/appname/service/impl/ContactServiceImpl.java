package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.ContactInquiryRequest;
import com.yourorg.appname.dto.request.NewsletterRequest;
import com.yourorg.appname.entity.ContactInquiry;
import com.yourorg.appname.entity.NewsletterSubscription;
import com.yourorg.appname.repository.ContactInquiryRepository;
import com.yourorg.appname.repository.NewsletterSubscriptionRepository;
import com.yourorg.appname.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactInquiryRepository inquiryRepository;
    private final NewsletterSubscriptionRepository newsletterRepository;

    @Override
    @Transactional
    public void submitInquiry(ContactInquiryRequest request) {
        ContactInquiry inquiry = ContactInquiry.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .preferredVisitDate(request.getPreferredVisitDate())
                .category(request.getCategory() != null ? request.getCategory() : "GENERAL")
                .message(request.getMessage())
                .status("NEW")
                .createdAt(LocalDateTime.now())
                .build();

        inquiryRepository.save(inquiry);
    }

    @Override
    @Transactional
    public void subscribeNewsletter(NewsletterRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (!newsletterRepository.existsByEmail(email)) {
            NewsletterSubscription sub = NewsletterSubscription.builder()
                    .email(email)
                    .subscribedAt(LocalDateTime.now())
                    .isActive(true)
                    .build();
            newsletterRepository.save(sub);
        }
    }
}
