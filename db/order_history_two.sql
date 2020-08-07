SELECT
    o.food_order_id,
    fo.user_id,
    f.name,
    f.price,
    o.quantity,
    o.subtotal
FROM food_order fo
INNER JOIN order_item o ON fo.food_order_id = o.food_order_id
INNER JOIN food_item f ON o.food_id = f.food_id
WHERE fo.user_id = $1
ORDER BY o.food_order_id DESC;
