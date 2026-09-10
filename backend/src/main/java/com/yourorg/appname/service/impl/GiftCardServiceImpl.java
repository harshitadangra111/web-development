package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.GiftCardBalanceCheckRequest;
import com.yourorg.appname.dto.request.GiftCardPurchaseRequest;
import com.yourorg.appname.dto.response.GiftCardResponse;
import com.yourorg.appname.entity.GiftCard;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.GiftCardRepository;
import com.yourorg.appname.service.GiftCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GiftCardServiceImpl implements GiftCardService {

    private final GiftCardRepository giftCardRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional
    public GiftCardResponse purchaseGiftCard(GiftCardPurchaseRequest request) {
        Random random = new Random();
        String cardNumber = String.format("%04d-%04d-%04d-%04d",
                1000 + random.nextInt(9000),
                1000 + random.nextInt(9000),
                1000 + random.nextInt(9000),
                1000 + random.nextInt(9000));
        String pin = String.format("%04d", 1000 + random.nextInt(9000));

        GiftCard card = GiftCard.builder()
                .cardNumber(cardNumber)
                .pin(pin)
                .initialBalance(request.getAmount())
                .currentBalance(request.getAmount())
                .recipientName(request.getRecipientName())
                .recipientEmail(request.getRecipientEmail())
                .senderName(request.getSenderName())
                .senderEmail(request.getSenderEmail())
                .message(request.getMessage())
                .theme(request.getTheme() != null ? request.getTheme() : "CRESCENT_GOLD")
                .status("ACTIVE")
                .expiresAt(LocalDateTime.now().plusYears(1))
                .createdAt(LocalDateTime.now())
                .build();

        return mapper.toGiftCardResponse(giftCardRepository.save(card));
    }

    @Override
    @Transactional(readOnly = true)
    public GiftCardResponse checkBalance(GiftCardBalanceCheckRequest request) {
        String formattedNum = request.getCardNumber().trim().replace(" ", "-");
        GiftCard card = giftCardRepository.findByCardNumberAndPin(formattedNum, request.getPin().trim())
                .orElseThrow(() -> new BadRequestException("Invalid gift card number or PIN"));

        if (!"ACTIVE".equalsIgnoreCase(card.getStatus()) || card.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("This gift card has expired or is no longer active");
        }

        return mapper.toGiftCardResponse(card);
    }
}
