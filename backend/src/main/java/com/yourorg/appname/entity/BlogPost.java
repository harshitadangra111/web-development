package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String excerpt;

    @Column(nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String content;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "read_time_minutes")
    @Builder.Default
    private Integer readTimeMinutes = 5;

    @Column(name = "published_date")
    @Builder.Default
    private LocalDateTime publishedDate = LocalDateTime.now();

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;
}
