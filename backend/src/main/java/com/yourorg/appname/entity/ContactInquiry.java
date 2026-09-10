package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_inquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(length = 30)
    private String phone;

    @Column(name = "preferred_visit_date", length = 50)
    private String preferredVisitDate;

    @Column(length = 100)
    @Builder.Default
    private String category = "GENERAL";

    @Column(nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String message;

    @Column(length = 30)
    @Builder.Default
    private String status = "NEW";

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
