package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.GiftCardBalanceCheckRequest;
import com.yourorg.appname.dto.request.GiftCardPurchaseRequest;
import com.yourorg.appname.dto.response.GiftCardResponse;

public interface GiftCardService {
    GiftCardResponse purchaseGiftCard(GiftCardPurchaseRequest request);
    GiftCardResponse checkBalance(GiftCardBalanceCheckRequest request);
}
