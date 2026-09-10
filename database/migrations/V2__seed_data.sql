-- =====================================================================
-- Luna & Latte Café Platform - Seed Data Migration (V2)
-- Populated with authentic Stitch design items, categories, sanctuaries & offers
-- =====================================================================

-- Roles
IF NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ROLE_USER')
BEGIN
    INSERT INTO roles (name, description) VALUES ('ROLE_USER', 'Standard Café Patron');
    INSERT INTO roles (name, description) VALUES ('ROLE_ADMIN', 'Café Sanctuary Manager / Administrator');
END;

-- Default Users (Passwords BCrypt-hashed for 'password123')
-- Hash: $2a$10$wN3tK81XgM.zFzWv9wB5yeZ5vQ/1G3R8U6.8wL6E5v7Jm4A9n2wIu
IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'maya@nocturne.studio')
BEGIN
    INSERT INTO users (full_name, email, password_hash, phone_number, patron_tier, reward_points, is_active)
    VALUES ('Maya Sengupta', 'maya@nocturne.studio', '$2a$10$wN3tK81XgM.zFzWv9wB5yeZ5vQ/1G3R8U6.8wL6E5v7Jm4A9n2wIu', '+91 98200 12345', 'FULL_MOON_CONNOISSEUR', 450, 1);

    INSERT INTO users (full_name, email, password_hash, phone_number, patron_tier, reward_points, is_active)
    VALUES ('Admin Roaster', 'admin@lunaandlatte.com', '$2a$10$wN3tK81XgM.zFzWv9wB5yeZ5vQ/1G3R8U6.8wL6E5v7Jm4A9n2wIu', '+91 98200 99999', 'CRESCENT_PATRON', 1000, 1);

    -- Assign Roles
    INSERT INTO user_roles (user_id, role_id)
    SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'maya@nocturne.studio' AND r.name = 'ROLE_USER';

    INSERT INTO user_roles (user_id, role_id)
    SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'admin@lunaandlatte.com' AND r.name = 'ROLE_ADMIN';
END;

-- Categories
IF NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Coffee')
BEGIN
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Coffee', '☕ Coffee', 'local_cafe', 1);
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Cold Beverages', '🧊 Cold Beverages', 'ac_unit', 2);
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Tea', '🍵 Botanical Tea', 'emoji_food_beverage', 3);
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Breakfast', '🥑 Breakfast', 'bakery_dining', 4);
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Sandwiches', '🥪 Sandwiches', 'lunch_dining', 5);
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Pizza', '🍕 Sourdough Pizza', 'local_pizza', 6);
    INSERT INTO categories (name, display_name, icon, display_order) VALUES ('Desserts', '🍰 Nocturne Desserts', 'cake', 7);
END;

-- Menu Items
IF NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Iced Caramel Nocturne Latte')
BEGIN
    DECLARE @catCoffee BIGINT = (SELECT id FROM categories WHERE name = 'Coffee');
    DECLARE @catCold BIGINT = (SELECT id FROM categories WHERE name = 'Cold Beverages');
    DECLARE @catTea BIGINT = (SELECT id FROM categories WHERE name = 'Tea');
    DECLARE @catBkf BIGINT = (SELECT id FROM categories WHERE name = 'Breakfast');
    DECLARE @catSand BIGINT = (SELECT id FROM categories WHERE name = 'Sandwiches');
    DECLARE @catPizza BIGINT = (SELECT id FROM categories WHERE name = 'Pizza');
    DECLARE @catDessert BIGINT = (SELECT id FROM categories WHERE name = 'Desserts');

    INSERT INTO menu_items (category_id, name, description, price, image_url, is_veg, is_eggless, is_featured, is_available, rating, rating_count)
    VALUES 
    (@catCold, 'Iced Caramel Nocturne Latte', 'Layered double espresso, creamy organic milk, and artisanal golden caramel drizzle over ice.', 340.00, 'https://lh3.googleusercontent.com/aida/AEtjO1UjZ_NQDcRClgxGa-TE7fylvbuTmWFDkXC7w8yykuxzET5yskaT53b01KD4O5UUkdAdR8Y_mLgCizdFzMd7SkkCI1fuB0BMJH4Kdl9DZczS_1LQvsPrNuLMlSuMC1eU1ghmxIvj1wa-iHGF89cgSgWhdvf18DG6PIbuTao3jmlT-QqE7GruuE3sIXe-bMegct8iWtb4eQEzVflV4Q641S0FVzHt2kxAanEKOSYBd99mhhjN7YR0t935ppIG', 1, 1, 1, 1, 4.95, 340),
    
    (@catCoffee, 'Crescent Moon Cappuccino', 'Artisan ceramic cup with signature crescent moon foam art, velvety microfoam and rich espresso notes.', 290.00, 'https://lh3.googleusercontent.com/aida/AEtjO1VzE_BA5-dvsBKsMmJ8Cihs8Jxg3Ll1DuBPWRZSa1vITegtS_obcrmKBXxE8UX1fHDhfzKmex_stQU12VGnjMTkGGn9IPmK0dzdQ9LuraObHjDSAAuzDRCLfDJ3Dr-SPeiYWbcLM8fxtEYYL_76nX6SVNq1pRnu8KhwWhX0In1nijYSFRds-CamnAyypCx_2NFk9SsQV3p__H8NNyjFieKVBzV2fI9wrEXOhwe7I0scsXTaH95EI3Bjg_8', 1, 1, 1, 1, 4.90, 480),
    
    (@catBkf, 'Artisan Avocado Sourdough Toast', 'Wood-fired sourdough topped with sliced Hass avocado, feta crumble, microgreens, and chili citrus dressing.', 380.00, 'https://lh3.googleusercontent.com/aida/AEtjO1WJC5WvLcC0mTpfLSY0oxX3rnCvfK7L7cbGp90yrtky3gBsHLDf-5x-pnCnK7fpaOGbV2p1J6afCfXSm5M8hposunw6kYoSRqLvnyrU_kpWCMOLnpcy6GZXDDxF0jpOFpgnjOKFCGvb4RXYnQmyIyGhSmMdR9DpTBflA9_yoz-faOcXpWpbFIo2xwfrlV0QbgbPv-0Ivy-W8fSvNk2L9vm9zJHeYHstqhSO2XNr-JKMwV-hPCCpBi_lSfZc', 1, 0, 1, 1, 4.85, 210),
    
    (@catDessert, 'Midnight Molten Lava Cake', 'Decadent 70% single-origin dark chocolate cake with oozing warm center, raspberry coulis, and snow dust.', 360.00, 'https://lh3.googleusercontent.com/aida/AEtjO1XF7gW1f500gwKGoL8TFqt-KC8ObaGdQFV1n2VEzpKZSqYhnEhqOpfKqJSFvUMl1Oyaq0HC4tfVM50hGjJRGNh40XGUtV-biqHCNEPoANbasO6bs-1VaOYnY25tJiNYurPBjMk59lNl2HfTypWMQTflyvFBlQDkG1xV8iOTKcIqiOkw0BmBK6TDW4SYZ_yXsa_feDmZ0q6Tz8r3Cv6eEna2GhHUYKwSJhnNdFP8GLubDV_kBXqd7LRoGQlu', 1, 1, 1, 1, 4.98, 520),
    
    (@catCoffee, 'Nocturne Single-Origin Espresso', 'Intense, velvety double shot pulled from our house-roasted Ethiopian Yirgacheffe beans.', 210.00, NULL, 1, 1, 0, 1, 4.88, 145),
    (@catCoffee, 'Vanilla Bean Flat White', 'Smooth ristretto infused with Madagascar bourbon vanilla bean extract and steamed whole milk.', 320.00, NULL, 1, 1, 0, 1, 4.80, 180),
    (@catCold, 'Cold Brew Solstice Elixir', '24-hour slow drip cold brew lightly infused with orange blossom essence and sparkling tonic.', 330.00, NULL, 1, 1, 1, 1, 4.92, 195),
    (@catTea, 'Silver Moon Jasmine Green Tea', 'Delicate whole-leaf green tea scented with midnight night-blooming jasmine flowers.', 260.00, NULL, 1, 1, 0, 1, 4.75, 95),
    (@catSand, 'Truffle Mushroom Melt Sandwich', 'Pan-grilled sourdough filled with sautéed wild mushrooms, aged gruyère, and black truffle aioli.', 420.00, NULL, 1, 1, 1, 1, 4.89, 160),
    (@catPizza, 'Burrata & San Marzano Sourdough Pizza', 'Naturally fermented 48-hour dough topped with fresh burrata ball, fresh basil, and extra virgin olive oil.', 560.00, NULL, 1, 1, 1, 1, 4.94, 230);
END;

-- Store Locations (Sanctuaries)
IF NOT EXISTS (SELECT 1 FROM store_locations WHERE neighborhood = 'Bandra West')
BEGIN
    INSERT INTO store_locations (name, neighborhood, address, city, state, postal_code, phone, email, opening_hours, amenities, image_url)
    VALUES 
    ('Luna & Latte - Flagship Roastery', 'Bandra West', '14 Pali Hill, Near Nargis Dutt Road', 'Mumbai', 'Maharashtra', '400050', '+91 22 2640 8890', 'bandra@lunaandlatte.com', '7:00 AM – 1:00 AM (Midnight Roastery)', 'Quiet Booths, Specialty Pour-Over, Valet Parking, Pet Friendly, Free High-Speed Wi-Fi', 'https://lh3.googleusercontent.com/aida/AEtjO1Xd-k2HGZWt_jtfrcCflT8XiBlse6sfVbnFhxvROaYjqS3gSQVB1uC6RwuABV8p3I_q5-s9R2TyxZnKrnKCMg5GUDBRGYmWi5Hxt5s82k4W7W5Q5L1idlKZ--Vbcni2z3e0ZOdcdaqX964WaEvbawaF8nZI3hXl6JJTNvSj-pmxsbfdKSjtE4OfdvJ2jvNNrb_yKqvoAZmOGDkr7zsq4Rth9o01T_lbVkXErpHjy7v0aOFNeX9icFfLVTjr'),

    ('Luna & Latte - Heritage Reserve', 'Colaba', 'Plot 8, B.K. Boman Behram Marg, Behind Taj', 'Mumbai', 'Maharashtra', '400001', '+91 22 2282 4430', 'colaba@lunaandlatte.com', '8:00 AM – 12:00 AM', 'Historic Vault Seating, Siphon Coffee Bar, Terrace Garden, Book Library', NULL),

    ('Luna & Latte - Silicon Lounge', 'Indiranagar', '100 Feet Road, 12th Main Junction', 'Bengaluru', 'Karnataka', '560038', '+91 80 4120 7700', 'indiranagar@lunaandlatte.com', '7:30 AM – 12:30 AM', 'Co-Working Lounges, Meeting Pods, Specialty Cold Brew Bar, Pet Courtyard', NULL);
END;

-- Offers & Promo Codes
IF NOT EXISTS (SELECT 1 FROM offers WHERE promo_code = 'NOCTURNE20')
BEGIN
    INSERT INTO offers (title, promo_code, description, discount_percentage, discount_amount, min_order_amount, valid_until, terms, tier_required)
    VALUES 
    ('Nocturne Twilight Welcome', 'NOCTURNE20', 'Enjoy 20% off your artisanal coffee and baked delicacies on your inaugural visit.', 20.00, 0, 300.00, DATEADD(month, 3, GETDATE()), 'Valid once per patron. Applicable on all freshly brewed beverages and bakery selections.', 'ALL'),

    ('Midnight Eclipse Special', 'ECLIPSE50', 'Flat Rs. 50 off on all orders above Rs. 400 placed between 8:00 PM and midnight.', 0.00, 50.00, 400.00, DATEADD(month, 6, GETDATE()), 'Valid every evening after 8 PM at all sanctuaries and online orders.', 'ALL'),

    ('Full Moon Connoisseur Perk', 'CRESCENTGOLD', 'Exclusive 25% privilege discount for registered Crescent & Full Moon patrons.', 25.00, 0, 500.00, DATEADD(month, 12, GETDATE()), 'Requires active Crescent Patron tier membership in your Luna & Latte profile.', 'CRESCENT_PATRON');
END;

-- Gift Cards Demo
IF NOT EXISTS (SELECT 1 FROM gift_cards WHERE card_number = '8820-4491-3302-1194')
BEGIN
    INSERT INTO gift_cards (card_number, pin, initial_balance, current_balance, recipient_name, recipient_email, sender_name, sender_email, message, theme, status, expires_at)
    VALUES 
    ('8820-4491-3302-1194', '4491', 2500.00, 2160.00, 'Devika Sharma', 'devika@nocturne.in', 'Alistair Vance', 'alistair@nocturne.cafe', 'To slow, moonlit evenings and cups filled to the brim with comfort.', 'CRESCENT_GOLD', 'ACTIVE', DATEADD(year, 1, GETDATE()));
END;

-- Nocturne Chronicles (Blog Posts)
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'art-of-nocturnal-roasting')
BEGIN
    INSERT INTO blog_posts (title, slug, excerpt, content, author, category, read_time_minutes, cover_image_url, is_featured)
    VALUES 
    ('The Art of Nocturnal Roasting: Why Twilight Changes Flavor', 'art-of-nocturnal-roasting', 'Explore why temperature, calm atmospheric pressure, and late-hour extraction unearth delicate caramel undertones in our single-origin harvests.', 'Behind every cup at Luna & Latte lies an obsession with the quiet hours. When daytime noise fades, coffee tasting transitions from a hasty morning caffeine rush into a contemplative sensorial ritual. Our master roasters slow down bean development in the drum, teasing out rich cacao notes and wildflower undertones without ever imparting harsh char.', 'Master Roaster Kabir Mehta', 'Roastery Philosophy', 6, 'https://lh3.googleusercontent.com/aida/AEtjO1Xd-k2HGZWt_jtfrcCflT8XiBlse6sfVbnFhxvROaYjqS3gSQVB1uC6RwuABV8p3I_q5-s9R2TyxZnKrnKCMg5GUDBRGYmWi5Hxt5s82k4W7W5Q5L1idlKZ--Vbcni2z3e0ZOdcdaqX964WaEvbawaF8nZI3hXl6JJTNvSj-pmxsbfdKSjtE4OfdvJ2jvNNrb_yKqvoAZmOGDkr7zsq4Rth9o01T_lbVkXErpHjy7v0aOFNeX9icFfLVTjr', 1),

    ('Pour-Over vs. Siphon: Deciphering the Delicate Extraction', 'pour-over-vs-siphon-guide', 'A sensory companion to choosing between the crisp clarity of an origami dripper and the full-bodied velvet texture of a vacuum siphon brew.', 'If you have sat at our Bandra West marble brew bar after dusk, you will have seen the mesmerizing halogen flame of our Hario glass siphons. But when should you order a V60 versus a siphon? In this extraction essay, we detail grind size, contact duration, and temperature curves.', 'Barista Lead Anya Roy', 'Brew Guides', 4, NULL, 0),

    ('Avocado Sourdough: Sourcing 48-Hour Naturally Leavened Loaves', 'avocado-sourdough-artisan-baking', 'How we partnered with local wood-fired bakeries to craft the crisp, airy crumb that cradles our creamy Hass avocado slices.', 'Great brunch is an architectural achievement. The base cannot collapse under citrus dressing, nor should the crust resist the fork. Read the tale of how our pastry kitchen tested 32 variations of heirloom sourdough starter.', 'Chef Patron Rohan Sen', 'Culinary Craft', 5, NULL, 0);
END;
