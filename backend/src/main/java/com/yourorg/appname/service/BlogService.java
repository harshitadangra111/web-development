package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.BlogPostResponse;

import java.util.List;

public interface BlogService {
    List<BlogPostResponse> getAllPosts();
    BlogPostResponse getPostBySlug(String slug);
}
