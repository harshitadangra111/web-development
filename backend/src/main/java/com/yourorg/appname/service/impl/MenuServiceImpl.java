package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.MenuItemRequest;
import com.yourorg.appname.dto.response.CategoryResponse;
import com.yourorg.appname.dto.response.MenuItemResponse;
import com.yourorg.appname.entity.Category;
import com.yourorg.appname.entity.MenuItem;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.CategoryRepository;
import com.yourorg.appname.repository.MenuItemRepository;
import com.yourorg.appname.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(mapper::toCategoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuItemResponse> searchMenuItems(String search, String category, Boolean vegOnly, Boolean eggless) {
        String query = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String cat = (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) ? category.trim() : null;

        return menuItemRepository.searchMenuItems(query, cat, vegOnly, eggless)
                .stream()
                .map(mapper::toMenuItemResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuItemResponse> getFeaturedMenuItems() {
        return menuItemRepository.findByIsFeaturedTrueAndIsAvailableTrue()
                .stream()
                .map(mapper::toMenuItemResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return mapper.toMenuItemResponse(item);
    }

    @Override
    @Transactional
    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        MenuItem item = MenuItem.builder()
                .category(category)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .isVeg(request.getIsVeg())
                .isEggless(request.getIsEggless())
                .isFeatured(request.getIsFeatured())
                .isAvailable(request.getIsAvailable())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return mapper.toMenuItemResponse(menuItemRepository.save(item));
    }

    @Override
    @Transactional
    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        item.setCategory(category);
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setImageUrl(request.getImageUrl());
        item.setIsVeg(request.getIsVeg());
        item.setIsEggless(request.getIsEggless());
        item.setIsFeatured(request.getIsFeatured());
        item.setIsAvailable(request.getIsAvailable());
        item.setUpdatedAt(LocalDateTime.now());

        return mapper.toMenuItemResponse(menuItemRepository.save(item));
    }

    @Override
    @Transactional
    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }
}
