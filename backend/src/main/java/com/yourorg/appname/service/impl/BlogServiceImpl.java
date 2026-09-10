package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.BlogPostResponse;
import com.yourorg.appname.entity.BlogPost;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.BlogPostRepository;
import com.yourorg.appname.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogPostRepository blogRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<BlogPostResponse> getAllPosts() {
        return blogRepository.findAllByOrderByPublishedDateDesc()
                .stream()
                .map(mapper::toBlogPostResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BlogPostResponse getPostBySlug(String slug) {
        BlogPost post = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + slug));
        return mapper.toBlogPostResponse(post);
    }
}
