DELETE FROM order_item
where food_order_id = $1;

DELETE FROM food_order
where food_order_id = $1;