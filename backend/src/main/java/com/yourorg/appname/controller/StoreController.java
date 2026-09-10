package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.StoreLocationResponse;
import com.yourorg.appname.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StoreLocationResponse>>> getStores(@RequestParam(required = false) String search) {
        List<StoreLocationResponse> stores = storeService.searchStores(search);
        return ResponseEntity.ok(ApiResponse.success("Stores retrieved", stores));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StoreLocationResponse>> getStoreById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Store retrieved", storeService.getStoreById(id)));
    }
}
