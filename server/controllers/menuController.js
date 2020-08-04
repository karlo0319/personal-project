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
        let check = await db.get_item_id(id)
        console.log(check)
        db.get_item_id(id)
        .then(item => res.status(200).send(item))
        .catch(err => res.status(500).send(err))
    },

    
    insertItem: async (req, res) => {
        const db = req.app.get('db'),
        const {foodItems} = req.body,
        const {id} = req.session;
        const [foodOrder] = db.create_food_order(id)
        foodItems.forEach(item => {
    
            await db.insert_item(food_item.food_id)
        });



    }

}

    