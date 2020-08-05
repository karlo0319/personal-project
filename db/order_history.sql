SELECT
	f.food_id,
	f.name,
	f.price,
	o.quantity,
	o.subtotal,
	o.food_order_id
FROM
	food_item f
INNER JOIN order_item o
    ON o.food_id = f.food_id
INNER JOIN food_order fo
    ON o.food_order_id = fo.food_order_id;
