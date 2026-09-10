package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.MenuItemRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.CategoryResponse;
import com.yourorg.appname.dto.response.MenuItemResponse;
import com.yourorg.appname.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success("Categories retrieved", menuService.getAllCategories()));
    }

    @GetMapping("/menu")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getMenuItems(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean vegOnly,
            @RequestParam(required = false) Boolean eggless
    ) {
        List<MenuItemResponse> items = menuService.searchMenuItems(search, category, vegOnly, eggless);
        return ResponseEntity.ok(ApiResponse.success("Menu items retrieved", items));
    }

    @GetMapping("/menu/featured")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getFeaturedItems() {
        return ResponseEntity.ok(ApiResponse.success("Featured items retrieved", menuService.getFeaturedMenuItems()));
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItem(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Menu item retrieved", menuService.getMenuItemById(id)));
    }

    @PostMapping("/menu")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MenuItemResponse>> createMenuItem(@Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Menu item created", menuService.createMenuItem(request)));
    }

    @PutMapping("/menu/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody MenuItemRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Menu item updated", menuService.updateMenuItem(id, request)));
    }

    @DeleteMapping("/menu/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.ok(ApiResponse.success("Menu item deleted", null));
    }
}
