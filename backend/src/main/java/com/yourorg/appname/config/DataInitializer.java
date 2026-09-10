package com.yourorg.appname.config;

import com.yourorg.appname.entity.*;
import com.yourorg.appname.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;
    private final StoreLocationRepository storeLocationRepository;
    private final OfferRepository offerRepository;
    private final GiftCardRepository giftCardRepository;
    private final BlogPostRepository blogPostRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.count() > 0 && userRepository.count() > 0) {
            log.info("Database already seeded. Skipping initial data load.");
            return;
        }

        log.info("Seeding initial data for Luna & Latte Platform...");

        // 1. Roles
        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_USER").description("Café Patron").build()));
        Role roleAdmin = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_ADMIN").description("Café Administrator").build()));

        // 2. Demo Users
        if (userRepository.findByEmail("maya@nocturne.studio").isEmpty()) {
            userRepository.save(User.builder()
                    .fullName("Maya Lin")
                    .email("maya@nocturne.studio")
                    .password(passwordEncoder.encode("password123"))
                    .phoneNumber("+91 98765 43210")
                    .patronTier("CRESCENT_PATRON")
                    .rewardPoints(420)
                    .isActive(true)
                    .roles(Set.of(roleUser))
                    .build());
        }

        if (userRepository.findByEmail("admin@lunaandlatte.com").isEmpty()) {
            userRepository.save(User.builder()
                    .fullName("Head Roaster & Admin")
                    .email("admin@lunaandlatte.com")
                    .password(passwordEncoder.encode("password123"))
                    .phoneNumber("+91 99887 76655")
                    .patronTier("NOCTURNE_ROYAL")
                    .rewardPoints(9999)
                    .isActive(true)
                    .roles(Set.of(roleUser, roleAdmin))
                    .build());
        }

        // 3. Categories
        Category catSignatures = categoryRepository.save(Category.builder()
                .name("nocturne-signatures")
                .displayName("Nocturne Signatures")
                .icon("magic_button")
                .displayOrder(1)
                .build());

        Category catCoffee = categoryRepository.save(Category.builder()
                .name("artisanal-coffee")
                .displayName("Artisanal Brews")
                .icon("coffee")
                .displayOrder(2)
                .build());

        Category catBakery = categoryRepository.save(Category.builder()
                .name("pastries-bakery")
                .displayName("Boulangerie & Bakery")
                .icon("bakery_dining")
                .displayOrder(3)
                .build());

        Category catSavory = categoryRepository.save(Category.builder()
                .name("savory-plates")
                .displayName("Savory Plates")
                .icon("restaurant")
                .displayOrder(4)
                .build());

        // 4. Menu Items
        menuItemRepository.save(MenuItem.builder()
                .name("Iced Caramel Nocturne Latte")
                .category(catSignatures)
                .description("Slow-steeped cold brew with house-made salted dark caramel, velvety oat milk, and edible gold leaf shimmer.")
                .price(new BigDecimal("340.00"))
                .imageUrl("https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop")
                .isVeg(true)
                .isEggless(true)
                .isFeatured(true)
                .isAvailable(true)
                .rating(new BigDecimal("4.95"))
                .ratingCount(340)
                .build());

        menuItemRepository.save(MenuItem.builder()
                .name("Midnight Truffle Mocha")
                .category(catSignatures)
                .description("Valrhona 70% dark chocolate ganache swirled into single-origin double espresso with micro-foamed milk.")
                .price(new BigDecimal("380.00"))
                .imageUrl("https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop")
                .isVeg(true)
                .isEggless(true)
                .isFeatured(true)
                .isAvailable(true)
                .rating(new BigDecimal("4.92"))
                .ratingCount(215)
                .build());

        menuItemRepository.save(MenuItem.builder()
                .name("Crescent Moon Cappuccino")
                .category(catCoffee)
                .description("Classic balanced Italian cappuccino dusted with spiced Ceylon cinnamon in a signature crescent stencil.")
                .price(new BigDecimal("260.00"))
                .imageUrl("https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop")
                .isVeg(true)
                .isEggless(true)
                .isFeatured(false)
                .isAvailable(true)
                .rating(new BigDecimal("4.88"))
                .ratingCount(512)
                .build());

        menuItemRepository.save(MenuItem.builder()
                .name("Butter & Vanilla Almond Croissant")
                .category(catBakery)
                .description("Double-baked 72-layer French viennoiserie soaked in vanilla syrup, filled with rich frangipane.")
                .price(new BigDecimal("280.00"))
                .imageUrl("https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop")
                .isVeg(true)
                .isEggless(false)
                .isFeatured(true)
                .isAvailable(true)
                .rating(new BigDecimal("4.96"))
                .ratingCount(180)
                .build());

        menuItemRepository.save(MenuItem.builder()
                .name("Avocado Tartine with Za'atar & Confit Tomato")
                .category(catSavory)
                .description("Hass avocado smash on toasted artisanal sourdough, slow-roasted cherry tomatoes, and cold-pressed olive oil.")
                .price(new BigDecimal("420.00"))
                .imageUrl("https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop")
                .isVeg(true)
                .isEggless(true)
                .isFeatured(false)
                .isAvailable(true)
                .rating(new BigDecimal("4.85"))
                .ratingCount(94)
                .build());

        // 5. Store Locations
        storeLocationRepository.save(StoreLocation.builder()
                .name("Luna & Latte - Flagship Sanctuary")
                .neighborhood("Bandra West")
                .address("14 Pali Hill Road, Bandra West")
                .city("Mumbai")
                .state("Maharashtra")
                .postalCode("400050")
                .phone("+91 22 2640 9801")
                .email("bandra@lunaandlatte.com")
                .openingHours("Mon - Sun: 7:00 AM - 1:00 AM")
                .amenities("High-Speed Wi-Fi, Valet Parking, Outdoor Terrace, Cupping Lab")
                .imageUrl("https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop")
                .isActive(true)
                .build());

        storeLocationRepository.save(StoreLocation.builder()
                .name("Luna & Latte - The Heritage Roastery")
                .neighborhood("Colaba")
                .address("B-4 Walton Road, Behind Taj Mahal Palace, Colaba")
                .city("Mumbai")
                .state("Maharashtra")
                .postalCode("400001")
                .phone("+91 22 2288 3412")
                .email("colaba@lunaandlatte.com")
                .openingHours("Mon - Sun: 8:00 AM - Midnight")
                .amenities("Historic Architecture, Private Cupping Room, Bookshelf Corner")
                .imageUrl("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop")
                .isActive(true)
                .build());

        storeLocationRepository.save(StoreLocation.builder()
                .name("Luna & Latte - Urban Veranda")
                .neighborhood("Indiranagar")
                .address("777 100ft Road, HAL 2nd Stage, Indiranagar")
                .city("Bengaluru")
                .state("Karnataka")
                .postalCode("560038")
                .phone("+91 80 4120 7690")
                .email("indiranagar@lunaandlatte.com")
                .openingHours("Mon - Sun: 7:30 AM - 11:30 PM")
                .amenities("Green Garden Veranda, Roastery Showcase, Pet Friendly")
                .imageUrl("https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop")
                .isActive(true)
                .build());

        // 6. Offers
        offerRepository.save(Offer.builder()
                .promoCode("NOCTURNE20")
                .title("20% Off Your Twilight Brews")
                .description("Enjoy 20% off all signature cold brews and hot espresso creations after 6:00 PM.")
                .discountPercentage(new BigDecimal("20.00"))
                .minOrderAmount(new BigDecimal("300.00"))
                .validUntil(LocalDateTime.now().plusMonths(3))
                .tierRequired("ALL")
                .isActive(true)
                .build());

        offerRepository.save(Offer.builder()
                .promoCode("ECLIPSE50")
                .title("Flat ₹50 Off Artisanal Pastries")
                .description("Flat ₹50 discount on fresh boulangerie items with any espresso beverage.")
                .discountAmount(new BigDecimal("50.00"))
                .minOrderAmount(new BigDecimal("250.00"))
                .validUntil(LocalDateTime.now().plusMonths(2))
                .tierRequired("CRESCENT_PATRON")
                .isActive(true)
                .build());

        // 7. Gift Card Sample
        giftCardRepository.save(GiftCard.builder()
                .cardNumber("LUNA-8821-4490")
                .pin("4821")
                .initialBalance(new BigDecimal("2000.00"))
                .currentBalance(new BigDecimal("1740.00"))
                .senderName("Elena Rostova")
                .senderEmail("elena@nocturne.studio")
                .recipientName("Maya Lin")
                .recipientEmail("maya@nocturne.studio")
                .message("Enjoy your midnight writing sessions at the Pali Hill sanctuary!")
                .theme("CRESCENT_GOLD")
                .status("ACTIVE")
                .expiresAt(LocalDateTime.now().plusYears(1))
                .build());

        // 8. Blog Posts
        blogPostRepository.save(BlogPost.builder()
                .title("The Alchemy of Twilight Roasting: Balancing Acid and Crema")
                .slug("alchemy-of-twilight-roasting")
                .excerpt("An in-depth look at our nocturnal 220°C profile that coax floral top-notes from high-altitude Ethiopian Yirgacheffe beans.")
                .content("<p>Every bean possesses a secret rhythm. When roasted in small artisanal batches under ambient conditions, the Maillard reactions unfold with unprecedented precision...</p>")
                .author("Kaelen Vance, Master Roaster")
                .category("Roastery & Craft")
                .coverImageUrl("https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop")
                .publishedDate(LocalDateTime.now().minusDays(5))
                .readTimeMinutes(4)
                .isFeatured(true)
                .build());

        log.info("Initial data seeding completed successfully.");
    }
}