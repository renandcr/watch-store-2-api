CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cart(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_units INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    installment VARCHAR NOT NULL, 
    shipping FLOAT NOT NULL);

CREATE TABLE IF NOT EXISTS customer(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL UNIQUE,
    admin BOOLEAN DEFAULT false,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    "cartId" uuid UNIQUE NOT NULL,
    FOREIGN KEY("cartId") REFERENCES cart(id));

CREATE TABLE IF NOT EXISTS address(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    street VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    house_number VARCHAR(10) NOT NULL,
    complement VARCHAR(50),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(8) NOT NULL,
    phone VARCHAR(14) NOT NULL,
    main BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    "customerId" uuid,
    FOREIGN KEY("customerId") REFERENCES customer(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS product(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(50) NOT NULL,
    img VARCHAR NOT NULL,
    description VARCHAR(150) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL);

CREATE TABLE IF NOT EXISTS product_cart(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    units INTEGER DEFAULT 1,
    "productId" uuid,
    FOREIGN KEY("productId") REFERENCES product(id),
    "cartId" uuid,
    FOREIGN KEY("cartId") REFERENCES cart(id),
    "customerId" uuid,
    FOREIGN KEY("customerId") REFERENCES customer(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS purchase_order(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_units INTEGER NOT NULL,
    total_price FLOAT NOT NULL,
    shipping FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    "customerId" uuid,
    FOREIGN KEY("customerId") REFERENCES customer(id) ON DELETE CASCADE,
    "productCartId" uuid,
    FOREIGN KEY("productCartId") REFERENCES product_cart(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS purchase_order_products_product_cart(
    "purchaseOrderId"  uuid,
    FOREIGN KEY("purchaseOrderId") REFERENCES purchase_order(id) ON DELETE CASCADE,
    "productCartId" uuid,
    FOREIGN KEY("productCartId") REFERENCES product_cart(id) ON DELETE CASCADE);
