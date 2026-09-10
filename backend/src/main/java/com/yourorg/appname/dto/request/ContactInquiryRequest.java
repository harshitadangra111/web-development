package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactInquiryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    private String preferredVisitDate;
    private String category = "GENERAL";

    @NotBlank(message = "Message is required")
    private String message;
}
