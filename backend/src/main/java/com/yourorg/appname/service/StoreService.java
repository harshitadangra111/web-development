package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.StoreLocationResponse;

import java.util.List;

public interface StoreService {
    List<StoreLocationResponse> getAllStores();
    List<StoreLocationResponse> searchStores(String query);
    StoreLocationResponse getStoreById(Long id);
}
