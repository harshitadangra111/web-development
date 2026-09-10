package com.yourorg.appname;

import com.yourorg.appname.dto.request.LoginRequest;
import com.yourorg.appname.dto.request.RegisterRequest;
import com.yourorg.appname.dto.response.AuthResponse;
import com.yourorg.appname.dto.response.CategoryResponse;
import com.yourorg.appname.entity.Category;
import com.yourorg.appname.entity.GiftCard;
import com.yourorg.appname.entity.Offer;
import com.yourorg.appname.repository.CategoryRepository;
import com.yourorg.appname.repository.GiftCardRepository;
import com.yourorg.appname.repository.OfferRepository;
import com.yourorg.appname.service.AuthService;
import com.yourorg.appname.service.MenuService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LunaLatteApplicationTests {

    @Autowired
    private AuthService authService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private GiftCardRepository giftCardRepository;

    @Test
    void contextLoads() {
        assertNotNull(authService);
        assertNotNull(menuService);
    }

    @Test
    void testUserRegistrationAndLogin() {
        RegisterRequest registerReq = new RegisterRequest();
        registerReq.setFullName("Test Patron");
        registerReq.setEmail("test.patron@lunaandlatte.com");
        registerReq.setPassword("secretPassword123");
        registerReq.setPhoneNumber("+91 98765 43210");

        AuthResponse registerRes = authService.register(registerReq);
        assertNotNull(registerRes);
        assertNotNull(registerRes.getToken());
        assertEquals("test.patron@lunaandlatte.com", registerRes.getUser().getEmail());
        assertEquals(50, registerRes.getUser().getRewardPoints());

        // Now test login
        LoginRequest loginReq = new LoginRequest();
        loginReq.setEmail("test.patron@lunaandlatte.com");
        loginReq.setPassword("secretPassword123");

        AuthResponse loginRes = authService.login(loginReq);
        assertNotNull(loginRes);
        assertNotNull(loginRes.getToken());
        assertEquals("test.patron@lunaandlatte.com", loginRes.getUser().getEmail());
    }

    @Test
    void testMenuCategories() {
        Category cat = Category.builder()
                .name("test-artisanal-brews")
                .displayName("Test Artisanal Brews")
                .icon("coffee")
                .displayOrder(1)
                .build();
        categoryRepository.save(cat);

        List<CategoryResponse> categories = menuService.getAllCategories();
        assertFalse(categories.isEmpty());
        assertTrue(categories.stream().anyMatch(c -> c.getName().equals("test-artisanal-brews")));
    }

    @Test
    void testOfferAndGiftCardEntities() {
        Offer offer = Offer.builder()
                .promoCode("TEST15")
                .title("Test 15% Off")
                .discountPercentage(new BigDecimal("15.00"))
                .minOrderAmount(new BigDecimal("200.00"))
                .validUntil(LocalDateTime.now().plusDays(30))
                .isActive(true)
                .build();
        offerRepository.save(offer);

        var foundOffer = offerRepository.findByPromoCodeAndIsActiveTrue("TEST15");
        assertTrue(foundOffer.isPresent());
        assertEquals(new BigDecimal("15.00"), foundOffer.get().getDiscountPercentage());

        GiftCard giftCard = GiftCard.builder()
                .cardNumber("LUNA-TEST-9999")
                .pin("1234")
                .initialBalance(new BigDecimal("1000.00"))
                .currentBalance(new BigDecimal("850.00"))
                .senderName("Elena Rostova")
                .senderEmail("elena@nocturne.studio")
                .recipientName("Maya Lin")
                .recipientEmail("maya@nocturne.studio")
                .expiresAt(LocalDateTime.now().plusYears(1))
                .status("ACTIVE")
                .build();
        giftCardRepository.save(giftCard);

        var foundCard = giftCardRepository.findByCardNumber("LUNA-TEST-9999");
        assertTrue(foundCard.isPresent());
        assertEquals(new BigDecimal("850.00"), foundCard.get().getCurrentBalance());
    }
}