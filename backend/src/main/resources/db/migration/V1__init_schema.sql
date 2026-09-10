-- =====================================================================
-- Luna & Latte Café Platform - MSSQL Initial Schema Migration (V1)
-- =====================================================================

-- 1. Users and Roles
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='roles' AND xtype='U')
BEGIN
    CREATE TABLE roles (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(50) NOT NULL UNIQUE,
        description NVARCHAR(255)
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(100) NOT NULL,
        email NVARCHAR(150) NOT NULL UNIQUE,
        password_hash NVARCHAR(255) NOT NULL,
        phone_number NVARCHAR(30),
        patron_tier NVARCHAR(50) DEFAULT 'CRESCENT_PATRON',
        reward_points INT DEFAULT 0,
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='user_roles' AND xtype='U')
BEGIN
    CREATE TABLE user_roles (
        user_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        PRIMARY KEY (user_id, role_id),
        CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );
END;

-- 2. Menu Categories and Menu Items
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='categories' AND xtype='U')
BEGIN
    CREATE TABLE categories (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL UNIQUE,
        display_name NVARCHAR(100) NOT NULL,
        icon NVARCHAR(50),
        display_order INT DEFAULT 0,
        is_active BIT DEFAULT 1
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='menu_items' AND xtype='U')
BEGIN
    CREATE TABLE menu_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        category_id BIGINT NOT NULL,
        name NVARCHAR(150) NOT NULL,
        description NVARCHAR(MAX),
        price DECIMAL(10,2) NOT NULL,
        image_url NVARCHAR(500),
        is_veg BIT DEFAULT 1,
        is_eggless BIT DEFAULT 1,
        is_featured BIT DEFAULT 0,
        is_available BIT DEFAULT 1,
        rating DECIMAL(3,2) DEFAULT 4.90,
        rating_count INT DEFAULT 120,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT fk_menu_items_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );
END;

-- 3. Store Locations (Sanctuaries)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='store_locations' AND xtype='U')
BEGIN
    CREATE TABLE store_locations (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(150) NOT NULL,
        neighborhood NVARCHAR(100) NOT NULL,
        address NVARCHAR(255) NOT NULL,
        city NVARCHAR(100) NOT NULL,
        state NVARCHAR(100) NOT NULL,
        postal_code NVARCHAR(20),
        phone NVARCHAR(30),
        email NVARCHAR(150),
        opening_hours NVARCHAR(255),
        amenities NVARCHAR(500),
        image_url NVARCHAR(500),
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

-- 4. Table Reservations
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='table_reservations' AND xtype='U')
BEGIN
    CREATE TABLE table_reservations (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        store_id BIGINT NOT NULL,
        user_id BIGINT NULL,
        guest_name NVARCHAR(100) NOT NULL,
        guest_email NVARCHAR(150) NOT NULL,
        guest_phone NVARCHAR(30) NOT NULL,
        party_size INT NOT NULL,
        reservation_time DATETIME2 NOT NULL,
        seating_preference NVARCHAR(50) DEFAULT 'Standard',
        special_requests NVARCHAR(MAX),
        status NVARCHAR(30) DEFAULT 'CONFIRMED',
        created_at DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT fk_reservation_store FOREIGN KEY (store_id) REFERENCES store_locations(id) ON DELETE CASCADE,
        CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
END;

-- 5. Orders and Order Items
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='orders' AND xtype='U')
BEGIN
    CREATE TABLE orders (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_number NVARCHAR(50) NOT NULL UNIQUE,
        user_id BIGINT NULL,
        customer_name NVARCHAR(100) NOT NULL,
        customer_email NVARCHAR(150) NOT NULL,
        customer_phone NVARCHAR(30) NOT NULL,
        order_type NVARCHAR(30) DEFAULT 'DINE_IN',
        store_id BIGINT NULL,
        table_number NVARCHAR(20),
        delivery_address NVARCHAR(MAX),
        subtotal DECIMAL(10,2) NOT NULL,
        tax DECIMAL(10,2) NOT NULL,
        discount DECIMAL(10,2) DEFAULT 0.00,
        total_amount DECIMAL(10,2) NOT NULL,
        status NVARCHAR(30) DEFAULT 'RECEIVED',
        payment_status NVARCHAR(30) DEFAULT 'PAID',
        payment_method NVARCHAR(50) DEFAULT 'CREDIT_CARD',
        notes NVARCHAR(MAX),
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        CONSTRAINT fk_orders_store FOREIGN KEY (store_id) REFERENCES store_locations(id) ON DELETE SET NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='order_items' AND xtype='U')
BEGIN
    CREATE TABLE order_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_id BIGINT NOT NULL,
        menu_item_id BIGINT NOT NULL,
        item_name NVARCHAR(150) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        notes NVARCHAR(255),
        CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_order_items_menu FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
    );
END;

-- 6. Offers and Promo Codes
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='offers' AND xtype='U')
BEGIN
    CREATE TABLE offers (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(150) NOT NULL,
        promo_code NVARCHAR(50) NOT NULL UNIQUE,
        description NVARCHAR(MAX),
        discount_percentage DECIMAL(5,2) DEFAULT 0,
        discount_amount DECIMAL(10,2) DEFAULT 0,
        min_order_amount DECIMAL(10,2) DEFAULT 0,
        valid_until DATETIME2,
        terms NVARCHAR(MAX),
        tier_required NVARCHAR(50),
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

-- 7. Gift Cards
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='gift_cards' AND xtype='U')
BEGIN
    CREATE TABLE gift_cards (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        card_number NVARCHAR(20) NOT NULL UNIQUE,
        pin NVARCHAR(10) NOT NULL,
        initial_balance DECIMAL(10,2) NOT NULL,
        current_balance DECIMAL(10,2) NOT NULL,
        recipient_name NVARCHAR(100) NOT NULL,
        recipient_email NVARCHAR(150) NOT NULL,
        sender_name NVARCHAR(100) NOT NULL,
        sender_email NVARCHAR(150) NOT NULL,
        message NVARCHAR(MAX),
        theme NVARCHAR(50) DEFAULT 'CRESCENT_GOLD',
        status NVARCHAR(30) DEFAULT 'ACTIVE',
        expires_at DATETIME2 NOT NULL,
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

-- 8. Celebration & Birthday Bookings
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='celebration_bookings' AND xtype='U')
BEGIN
    CREATE TABLE celebration_bookings (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        celebration_type NVARCHAR(50) NOT NULL,
        contact_name NVARCHAR(100) NOT NULL,
        contact_email NVARCHAR(150) NOT NULL,
        contact_phone NVARCHAR(30) NOT NULL,
        event_date DATETIME2 NOT NULL,
        time_slot NVARCHAR(50) NOT NULL,
        guest_count INT NOT NULL,
        cake_preference NVARCHAR(100),
        package_tier NVARCHAR(50) DEFAULT 'CELESTIAL',
        special_requests NVARCHAR(MAX),
        status NVARCHAR(30) DEFAULT 'IN_REVIEW',
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

-- 9. Nocturne Chronicles (Blog Posts)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='blog_posts' AND xtype='U')
BEGIN
    CREATE TABLE blog_posts (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(255) NOT NULL,
        slug NVARCHAR(255) NOT NULL UNIQUE,
        excerpt NVARCHAR(MAX),
        content NVARCHAR(MAX) NOT NULL,
        author NVARCHAR(100) NOT NULL,
        category NVARCHAR(100) NOT NULL,
        read_time_minutes INT DEFAULT 5,
        published_date DATETIME2 DEFAULT GETDATE(),
        cover_image_url NVARCHAR(500),
        is_featured BIT DEFAULT 0
    );
END;

-- 10. Contact Inquiries & Newsletter
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='contact_inquiries' AND xtype='U')
BEGIN
    CREATE TABLE contact_inquiries (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        email NVARCHAR(150) NOT NULL,
        phone NVARCHAR(30),
        preferred_visit_date NVARCHAR(50),
        category NVARCHAR(100) DEFAULT 'GENERAL',
        message NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(30) DEFAULT 'NEW',
        created_at DATETIME2 DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='newsletter_subscriptions' AND xtype='U')
BEGIN
    CREATE TABLE newsletter_subscriptions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(150) NOT NULL UNIQUE,
        subscribed_at DATETIME2 DEFAULT GETDATE(),
        is_active BIT DEFAULT 1
    );
END;
