SELECT *
FROM (SELECT o.food_order_id, fo.user_id, f.name, f.price, o.quantity, o.subtotal,
             RANK() OVER (ORDER BY o.food_order_id DESC) as seqnum
      FROM food_order fo JOIN
           order_item o
           ON fo.food_order_id = o.food_order_id JOIN
           food_item f 
           ON o.food_id = f.food_id
      WHERE fo.user_id = $1
     ) x
WHERE seqnum = 1;