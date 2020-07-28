CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR
);

CREATE TABLE food_item (
    food_id SERIAL PRIMARY KEY,
    name TEXT,
    image TEXT,
    description TEXT,
    price INT
);

CREATE TABLE food_order (
    food_order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE order_item (
    order_item_id SERIAL PRIMARY KEY,
    food_id INT REFERENCES food_item(food_id),
    food_order_id INT REFERENCES food_order(food_order_id)
);