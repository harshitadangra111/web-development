package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.OfferResponse;

import java.util.List;

public interface OfferService {
    List<OfferResponse> getActiveOffers();
    OfferResponse getOfferByPromoCode(String promoCode);
}
