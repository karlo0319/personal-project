import React from 'react';


class Cart extends React.Component {
    render() {
        const { food, minusQuantityOnClick, addQuantityOnClick, deleteItemCart } = this.props
        return (
            <table className="cart-details">
                {/* <tbody> */}
                    {/* <tr> */}
                        <td colSpan="2"><h3 className="cart-details" className=""> {food.name} </h3> </td>
                        <td><button className="cart-details" onClick={() => minusQuantityOnClick(food.food_id)} > - </button></td>
                        <td><h3 className="cart-details"> {food.quantity} </h3></td>
                        <td><button className="cart-details" onClick={() => addQuantityOnClick(food.food_id)} > + </button></td>
                        <td><h3 className="cart-details"> ${food.subTotal} </h3></td>
                        <td><button className="cart-details" onClick={() => deleteItemCart(food.food_id)}> DELETE </button></td>
                    {/* </tr>
                </tbody> */}
            </table>
        )
    }
}

export default Cart;