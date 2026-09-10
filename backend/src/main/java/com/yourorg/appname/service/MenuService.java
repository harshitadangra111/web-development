package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.MenuItemRequest;
import com.yourorg.appname.dto.response.CategoryResponse;
import com.yourorg.appname.dto.response.MenuItemResponse;

import java.util.List;

public interface MenuService {
    List<CategoryResponse> getAllCategories();
    List<MenuItemResponse> searchMenuItems(String search, String category, Boolean vegOnly, Boolean eggless);
    List<MenuItemResponse> getFeaturedMenuItems();
    MenuItemResponse getMenuItemById(Long id);
    MenuItemResponse createMenuItem(MenuItemRequest request);
    MenuItemResponse updateMenuItem(Long id, MenuItemRequest request);
    void deleteMenuItem(Long id);
}
