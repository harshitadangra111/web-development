package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.OfferResponse;
import com.yourorg.appname.entity.Offer;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.OfferRepository;
import com.yourorg.appname.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<OfferResponse> getActiveOffers() {
        return offerRepository.findByIsActiveTrue()
                .stream()
                .map(mapper::toOfferResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OfferResponse getOfferByPromoCode(String promoCode) {
        Offer offer = offerRepository.findByPromoCodeAndIsActiveTrue(promoCode.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Active promo code not found: " + promoCode));
        return mapper.toOfferResponse(offer);
    }
}
