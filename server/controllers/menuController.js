module.exports = {
    getMenu: (req, res) => {
        const {name, price, image, description} = req.body,
               db = req.app.get('db');

        db.get_menu({name, price, image, description})
        .then(menu=> res.status(200).send(menu))
        .catch(err => res.status(500).send(err))
    },

    getItemById: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db');
        db.get_item_id(id)
        .then(item => res.status(200).send(item))
        .catch(err => res.status(500).send(err))
    },

    insertItem: async (req, res) => {
        const db = req.app.get('db')
        const {foodItems} = req.body
        const {user_id} = req.session.user;
        const [foodOrder] = await db.create_food_order(user_id)
        console.log({foodOrder})
        foodItems.forEach(async item => {
            await db.insert_item(item.food_id, item.food_order_id, item.quantity, item.subTotal)
            console.log(item)
        });
        res.sendStatus(200)
    },
    
    getOrderHistory: async (req,res) => {
          const {order_id, name, price, quantity, subtotal} = req.body;
            db = req.app.get('db');

            db.order_history({order_id, name, price, quantity, subtotal})
            .then(order=> res.status(200).send(order))
            .catch(err => res.status(500).send(err))
    }
}