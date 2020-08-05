insert into food_order (user_id)
values ($1)
returning *;