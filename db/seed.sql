CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(250),
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
    food_order_id INT REFERENCES food_order(food_order_id),
    quantity INT,
    subtotal INT
);

Insert into food_order (user_id)
values (1)
returning *;

Insert into order_item (food_id, food_order_id, quantity, subtotal)
values (1, 1, 1, 1);    