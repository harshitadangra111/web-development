package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.BlogPostResponse;
import com.yourorg.appname.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogPostResponse>>> getPosts() {
        return ResponseEntity.ok(ApiResponse.success("Essays and chronicles retrieved", blogService.getAllPosts()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPostResponse>> getPostBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success("Chronicle retrieved", blogService.getPostBySlug(slug)));
    }
}
