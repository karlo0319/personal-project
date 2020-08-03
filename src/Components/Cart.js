import React from 'react';


class Cart extends React.Component {
    render() {
        const { food, minusQuantityOnClick, addQuantityOnClick, deleteItemCart } = this.props
        return (
            <div className="cart-details">
                        <div className="item-name"><h3> {food.name} </h3> </div>
                        <div className="item"><button onClick={() => minusQuantityOnClick(food.food_id)} > - </button></div>
                        <div className="item"><h3 > {food.quantity} </h3></div>
                        <div className="item"><button onClick={() => addQuantityOnClick(food.food_id)} > + </button></div>
                        <div className="item"><h3> ${food.subTotal} </h3></div>
                        <div className="item"><button onClick={() => deleteItemCart(food.food_id)}> DELETE </button></div>
            </div>
        )
    }
}

export default Cart;