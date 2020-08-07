module.exports = {
    getMenu: (req, res) => {
        const { name, price, image, description } = req.body,
            db = req.app.get('db');

        db.get_menu({ name, price, image, description })
            .then(menu => res.status(200).send(menu))
            .catch(err => res.status(500).send(err))
    },

    getItemById: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db');
        db.get_item_id(id)
            .then(item => res.status(200).send(item))
            .catch(err => res.status(500).send(err))
    },

    insertItem: async (req, res) => {
        const db = req.app.get('db')
        const { foodItems } = req.body
        const { user_id } = req.session.user;
        const foodOrder = await db.create_food_order(user_id)
        const { food_order_id } = foodOrder[0]
        // console.log({foodOrder})
        foodItems.forEach(async item => {
            await db.insert_item(item.food_id, food_order_id, item.quantity, item.subtotal)
            console.log(item)
        });
        res.sendStatus(200)
    },

    getOrderHistory: (req, res) => {
        db = req.app.get('db');
        db.order_history(req.session.user.user_id)
            .then(orders => res.status(200).send(orders))
            .catch(err => res.status(500).send(err))
    },

    deleteCart: (req, res) => {
        db = req.app.get('db');
        db.delete_order(req.params.id)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },

    updateCart: (req, res) => {
        console.log('hit')
        const {food_id, food_order_id, quantity, subtotal} = req.body,
        db = req.app.get('db');

        db.update_cart({food_id, food_order_id, quantity, subtotal})
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
}
