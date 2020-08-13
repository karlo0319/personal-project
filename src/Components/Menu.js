import React from 'react';
import MenuList from '../Components/MenuList';
import ProductDisplay from '../Components/ProductDisplay';
import Cart from '../Components/Cart';
import axios from 'axios';
import StripeCheckOut from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            selectedProduct: [],
            default: false,
            cart: [],
            totalAmount: 0
        }
    }

    componentDidMount = () => {
        axios.get(`/api/menu`)
            .then(res => this.setState({ menuList: res.data }))
            .catch(err => console.log(err))
    }

    getItemById = info => {
        this.setState({ selectedProduct: info, default: true })
    }

    addItemToCart = info => {
        let inCart = this.state.cart.find(item => info.food_id === item.food_id);
        console.log(inCart)
        if (!inCart) {
            info.quantity = 0;
            info.subtotal = 0;
            console.log(info)
            this.setState({ cart: [...this.state.cart, info] }, () => {
                this.calculateTotalAmount();
            })
        }
    }

    deleteItemCart = deletedItem => {
        let itemDelete = this.state.cart.filter(food => food.food_id !== deletedItem);
        console.log(itemDelete)
        this.setState({ cart: itemDelete }, () => {
            this.calculateTotalAmount();
        })
    }


    addQuantityOnClick = id => {
        let updatedCart = this.state.cart.map(item => {
            if (item.food_id === id) {
                item.quantity += 1;
                item.subtotal = item.quantity * item.price;
                return item
            } else {
                return item
            }
        });
        this.setState({ cart: updatedCart }, () => {
            this.calculateTotalAmount();
        })
    }

    minusQuantityOnClick = id => {
        let subtractedCart = this.state.cart.map(item => {
            if (item.food_id === id && item.quantity > 0) {
                item.quantity -= 1;
                item.subtotal = item.quantity * item.price;
                return item
            } else {
                return item
            }
        });
        this.setState({ cart: subtractedCart }, () => {
            this.calculateTotalAmount();
        })
    }

    calculateTotalAmount() {
        let newTotalAmount = this.state.cart.reduce(function (tot, sub) {
            return tot + sub.subtotal
        }, 0);

        this.setState({ totalAmount: newTotalAmount })
    }

    addCartonClick = () => {
        axios.post('/api/cart', {foodItems: this.state.cart});
        this.setState({cart:[]})

    }

    handleToken = async (token) => {
        const { totalAmount } = this.state
        const response = await axios.post('/checkout', { token, totalAmount });
        const { status } = response.data
        if (status === 'success') {
            toast('Success! Check email for details',
            { type: 'success' })
            // this.addCart()
            // this.setState({cart:[], totalAmount: 0})
        } else {
            toast('Something went wrong! Check email for details',
                { type: 'error' })
        }
    }

    editCartonClick = () => {
        console.log(this.state.cart)
        axios.get(`/history`)
        .then(res => this.setState({cart:res.data}))
        .catch(err => console.log(err))
    }

    deleteCartOnClick = (food_order_id) => {
        axios.delete(`/deletecart/${food_order_id}`)
        .then(() => this.editCartonClick(), this.setState({cart:[], totalAmount: 0}))
        .catch(err => console.log(err))
    }

    updateCartOnClick = (food_order_id) => {
        const {cart} = this.state
        axios.put(`/updatecart/${food_order_id}`, {food_id: cart.food_id, food_order_id: cart.food_order_id, quantity: cart.quantity, subtotal: cart.subtotal})
        .then(() => this.editCartonClick(), this.setState({cart:[]}))
        .catch(err => console.log(err))
    }

    render() {
        const { totalAmount } = this.state;
        const mappedList = this.state.menuList.map(info => {
            return <MenuList getItemById={this.getItemById} addItemToCart={this.addItemToCart} key={info.name} info={info} />
        })

        let mappedCart = this.state.cart.map(food => {
            return (
                <Cart key={food.name}
                    food={food}
                    addQuantityOnClick={this.addQuantityOnClick}
                    minusQuantityOnClick={this.minusQuantityOnClick}
                    deleteItemCart={this.deleteItemCart} />
            )
        })

        // disable or enable clear button 
        

        return (
            <div className="menu-container">
                <div className="menu-list">
                    <h2 style={{ textDecorationLine: 'underline', textAlign: 'center' }}> MENU </h2>
                    {mappedList}
                    <div>
                        <ProductDisplay default={this.state.default} product={this.state.selectedProduct} />
                    </div>
                    <div className='cart-box'>
                        <h2 style={{ textDecorationLine: 'underline', textAlign: 'center' }}> CART </h2>
                        <h3>{mappedCart}</h3>
                    </div>
                    <div>
                        <button className='confirm-button' onClick={() => this.addCartonClick()}> CONFIRM </button>
                    </div>
                    <div className='cart-buttons'> 
                        <button className='add-button' onClick={() => this.editCartonClick()}> EDIT </button>
                        <button disabled={this.state.cart.length === 0} className='add-button' onClick={() => this.updateCartOnClick(this.state.cart[0].food_order_id)}> UPDATE </button>
                        <button disabled={this.state.cart.length === 0} className='add-button' onClick={() => this.deleteCartOnClick(this.state.cart[0].food_order_id)}> CLEAR </button>
                    </div>
                    <div className="cart-total">
                        <div className="cart-amount">
                            <h2> TOTAL = ${totalAmount} </h2>
                        </div>
                        <div className='checkout-button'>
                            <StripeCheckOut
                                stripeKey="pk_test_51HCbk0GbfOcJRAjdR4Uf0oittDSmezS2yJ6XytZLcFu6cqCvdVp7q1ECamvqoU6iddryMPD8zxKe0Yere4tdHg0j00ISbvnsMU"
                                token={this.handleToken}
                                billingAddress
                                shippingAddress
                                amount={totalAmount * 100}
                                disabled={this.state.totalAmount === 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;