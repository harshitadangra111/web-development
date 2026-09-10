package com.yourorg.appname.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostResponse {
    private Long id;
    private String title;
    private String slug;
    private String excerpt;
    private String content;
    private String author;
    private String category;
    private Integer readTimeMinutes;
    private LocalDateTime publishedDate;
    private String coverImageUrl;
    private Boolean isFeatured;
}
