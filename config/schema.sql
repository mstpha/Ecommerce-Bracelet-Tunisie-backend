-- Create Products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_count INTEGER DEFAULT 1,
    folder VARCHAR(50),
    gender VARCHAR(20),
    rating DECIMAL(3, 2),
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    availability VARCHAR(50),
    material VARCHAR(100),
    stone VARCHAR(100),
    finish VARCHAR(100),
    style VARCHAR(100),
    includes JSONB,
    clasp VARCHAR(100),
    length VARCHAR(50),
    color VARCHAR(50),
    adjustable BOOLEAN,
    closure VARCHAR(50),
    breathable BOOLEAN,
    size VARCHAR(50),
    diameter VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cart Items table (optimized with product reference)
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Create Orders table (optimized with product reference)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    display_string TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Favorites table (optimized with product reference)
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Create Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    review_message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_gender ON products(gender);
CREATE INDEX idx_products_availability ON products(availability);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);

-- Insert product data
INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, stone, finish, style, includes, clasp) VALUES
(1, 'Silver Rhinestone Necklace Bracelet', 'Silver Rhinestone Necklace Bracelet', 5, '1', 'men', 4.5, 130.00, 'necklace', 'in_stock', 'Sterling Silver', 'Rhinestone', 'Polished', 'Luxury', '["Necklace", "Bracelet"]', 'Lobster Clasp'),
(2, 'Gold Rhinestone Necklace Bracelet', 'Gold Rhinestone Necklace Bracelet', 5, '2', 'men', 5.0, 130.00, 'necklace', 'in_stock', 'Gold Plated', 'Rhinestone', 'Polished', 'Luxury', '["Necklace", "Bracelet"]', 'Lobster Clasp'),
(3, 'Silver Cartier Necklace Bracelet', 'Silver Cartier Necklace Bracelet', 1, '3', 'men', 5.0, 44.00, 'necklace', 'in_stock', 'Stainless Steel', NULL, 'Silver Tone', 'Cartier Inspired', '["Necklace", "Bracelet"]', 'Box Clasp'),
(4, 'Gold Cartier Necklace Bracelet', 'Gold Cartier Necklace Bracelet for men', 2, '4', 'men', 5.0, 44.00, 'necklace', 'in_stock', 'Stainless Steel', NULL, 'Gold Tone', 'Cartier Inspired', '["Necklace", "Bracelet"]', 'Box Clasp'),
(5, 'Coffee Bean Necklace Bracelet', 'Coffee Bean Necklace Bracelet', 1, '5', 'men', 5.0, 54.00, 'necklace', 'in_stock', 'Stainless Steel', NULL, 'Polished', 'Coffee Bean Chain', '["Necklace", "Bracelet"]', 'Lobster Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, finish, length, clasp) VALUES
(6, 'Gold Men''s Necklace', 'Gold men''s necklace', 2, '6', 'men', 4.4, 39.00, 'necklace', 'in_stock', 'Gold Plated', 'Classic Chain', 'High Polish', '22 inches', 'Lobster Clasp'),
(7, 'Silver Swiss Necklace Bracelet', 'Silver Swiss Necklace Bracelet', 2, '7', 'men', 4.1, 44.00, 'necklace', 'in_stock', 'Stainless Steel', 'Swiss Link', 'Silver Tone', NULL, 'Box Clasp'),
(8, 'Silver Swiss Necklace', 'Silver Swiss Necklace', 2, '8', 'men', 4.6, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Swiss Link', 'Silver Tone', '22 inches', 'Box Clasp'),
(9, 'Silver Coffee Bean Necklace', 'Silver Coffee Bean Necklace', 6, '9', 'men', 4.8, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Coffee Bean Chain', 'Silver Tone', '22 inches', 'Lobster Clasp'),
(10, 'Gold Twisted Necklace', 'Gold Twisted Necklace', 8, '10', 'men', 4.9, 39.00, 'necklace', 'in_stock', 'Gold Plated', 'Twisted Rope', 'High Polish', '22 inches', 'Lobster Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, finish, length, clasp) VALUES
(11, 'Silver Cartier Necklace', 'Silver Cartier Necklace', 2, '11', 'men', 4.3, 29.00, 'necklace', 'in_stock', 'Stainless Steel', 'Cartier Inspired', 'Silver Tone', '20 inches', 'Box Clasp'),
(12, 'Gold Cartier Necklace', 'Gold Cartier Necklace', 5, '12', 'men', 4.5, 29.00, 'necklace', 'in_stock', 'Stainless Steel', 'Cartier Inspired', 'Gold Tone', '20 inches', 'Box Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, stone, finish, style, includes, clasp) VALUES
(13, 'Gold Rhinestone Watch Necklace Bracelet', 'Gold Rhinestone Watch Necklace Bracelet', 2, '13', 'men', 4.7, 190.00, 'necklace', 'limited_stock', 'Gold Plated', 'Rhinestone', 'Polished', 'Luxury Set', '["Watch", "Necklace", "Bracelet"]', 'Lobster Clasp'),
(14, 'Silver Rhinestone Watch Necklace Bracelet', 'Silver Rhinestone Watch Necklace Bracelet', 1, '14', 'men', 4.6, 190.00, 'necklace', 'limited_stock', 'Sterling Silver', 'Rhinestone', 'Polished', 'Luxury Set', '["Watch", "Necklace", "Bracelet"]', 'Lobster Clasp'),
(15, 'Silver Rhinestone Necklace', 'Silver Rhinestone Necklace', 1, '15', 'men', 4.4, 75.00, 'necklace', 'in_stock', 'Sterling Silver', 'Rhinestone', 'Polished', 'Luxury', NULL, 'Lobster Clasp'),
(16, 'Gold Rhinestone Necklace', 'Gold Rhinestone Necklace', 2, '16', 'men', 4.5, 75.00, 'necklace', 'in_stock', 'Gold Plated', 'Rhinestone', 'Polished', 'Luxury', NULL, 'Lobster Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, finish, length, clasp) VALUES
(17, 'Silver Men''s Necklace', 'Silver Men''s Necklace', 4, '17', 'men', 4.2, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Classic Chain', 'Silver Tone', '22 inches', 'Lobster Clasp'),
(18, 'Silver Snake Bracelet', 'Silver Snake Bracelet', 3, '18', 'men', 4.1, 25.00, 'bracelet', 'in_stock', 'Stainless Steel', 'Snake Chain', 'Silver Tone', '8 inches', 'Magnetic Clasp'),
(19, 'Gold Snake Bracelet', 'Gold Snake Bracelet', 5, '19', 'men', 4.3, 25.00, 'bracelet', 'in_stock', 'Stainless Steel', 'Snake Chain', 'Gold Tone', '8 inches', 'Magnetic Clasp'),
(20, 'Silver Men''s Necklace', 'Silver Men''s Necklace', 2, '20', 'men', 4.0, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Classic Chain', 'Silver Tone', '22 inches', 'Lobster Clasp'),
(21, 'Gold Swiss Necklace', 'Gold Swiss Necklace', 2, '21', 'men', 4.4, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Swiss Link', 'Gold Tone', '22 inches', 'Box Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, finish, length, clasp) VALUES
(22, 'Mixed Necklace', 'Mixed Necklace', 4, '22', 'men', 4.6, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Two-Tone', 'Silver & Gold', '22 inches', 'Lobster Clasp'),
(23, 'Mixed Bracelet', 'Mixed Bracelet', 1, '23', 'men', 3.9, 25.00, 'bracelet', 'in_stock', 'Stainless Steel', 'Two-Tone', 'Silver & Gold', '8 inches', 'Lobster Clasp'),
(24, 'Africa Necklace', 'Africa Necklace', 1, '24', 'men', 4.2, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Africa Map Pendant', 'Gold Tone', '24 inches', 'Lobster Clasp'),
(25, 'Silver Cross Necklace', 'Silver Cross Necklace', 1, '25', 'men', 4.1, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Cross Pendant', 'Silver Tone', '24 inches', 'Lobster Clasp'),
(26, 'Cross Necklace', 'Cross Necklace', 1, '26', 'men', 4.0, 39.00, 'necklace', 'in_stock', 'Stainless Steel', 'Cross Pendant', 'Gold Tone', '24 inches', 'Lobster Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, stone, finish, style, length, clasp) VALUES
(27, 'Silver Rhinestone Bracelet', 'Silver Rhinestone Bracelet', 2, '27', 'men', 4.5, 55.00, 'bracelet', 'in_stock', 'Sterling Silver', 'Rhinestone', 'Polished', 'Luxury', '8 inches', 'Box Clasp'),
(28, 'Gold Rhinestone Bracelet', 'Gold Rhinestone Bracelet', 1, '28', 'men', 4.4, 55.00, 'bracelet', 'in_stock', 'Gold Plated', 'Rhinestone', 'Polished', 'Luxury', '8 inches', 'Box Clasp'),
(29, 'Gold Swiss Bracelet', 'Gold Swiss Bracelet', 4, '29', 'men', 4.7, 25.00, 'bracelet', 'in_stock', 'Stainless Steel','Rhinestone', 'Swiss Link', 'Gold Tone', '8 inches', 'Box Clasp');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, color, adjustable, closure) VALUES
(30, 'Black Classic Cap', 'Simple black classic men''s cap', 3, '30', 'men', 4.3, 20.00, 'cap', 'in_stock', 'Cotton Blend', 'Baseball Cap', 'Black', TRUE, 'Strap Back'),
(31, 'Beige Streetwear Cap', 'Trendy beige men''s streetwear cap', 1, '31', 'men', 4.6, 22.00, 'cap', 'in_stock', 'Cotton Blend', 'Streetwear', 'Beige', TRUE, 'Strap Back');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, color, adjustable, closure, breathable) VALUES
(32, 'White Sports Cap', 'Lightweight white men''s sports cap', 1, '32', 'men', 4.5, 21.00, 'cap', 'in_stock', 'Polyester', 'Sports Cap', 'White', TRUE, 'Strap Back', TRUE);

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, finish, size, closure) VALUES
(33, 'Silver Stud Earrings', 'Classic silver stud earrings for men', 1, '33', 'men', 4.7, 19.00, 'earring', 'in_stock', 'Stainless Steel', 'Stud', 'Silver Tone', '6mm', 'Push Back');

INSERT INTO products (id, name, description, image_count, folder, gender, rating, price, category, availability, material, style, finish, diameter, closure) VALUES
(34, 'Black Hoop Earrings', 'Minimalist black hoop earrings for men', 1, '34', 'men', 4.5, 18.00, 'earring', 'in_stock', 'Stainless Steel', 'Hoop', 'Black Tone', '15mm', 'Hinged Clasp');