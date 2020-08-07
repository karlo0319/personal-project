UPDATE FROM order_item
SET food_id = $1, food_order_id = $2, quantity = $3, subtotal = $4
WHERE food_order_id = $1;

UPDATE FROM food_order
SET food_order_id = $1
WHERE food_order_id = $1;
