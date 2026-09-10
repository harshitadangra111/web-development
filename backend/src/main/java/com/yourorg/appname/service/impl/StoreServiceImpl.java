package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.StoreLocationResponse;
import com.yourorg.appname.entity.StoreLocation;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.StoreLocationRepository;
import com.yourorg.appname.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreLocationRepository storeRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<StoreLocationResponse> getAllStores() {
        return storeRepository.findByIsActiveTrue()
                .stream()
                .map(mapper::toStoreLocationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StoreLocationResponse> searchStores(String query) {
        String q = (query != null && !query.trim().isEmpty()) ? query.trim() : null;
        return storeRepository.searchStores(q)
                .stream()
                .map(mapper::toStoreLocationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public StoreLocationResponse getStoreById(Long id) {
        StoreLocation store = storeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + id));
        return mapper.toStoreLocationResponse(store);
    }
}
