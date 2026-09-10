package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.ContactInquiryRequest;
import com.yourorg.appname.dto.request.NewsletterRequest;

public interface ContactService {
    void submitInquiry(ContactInquiryRequest request);
    void subscribeNewsletter(NewsletterRequest request);
}
