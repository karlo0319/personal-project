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
        this.setState({ selectedProduct: info })
    }

    addItemToCart = info => {
        let inCart = this.state.cart.find(item => info.food_id === item.food_id);
        console.log(inCart)
        if (!inCart) {
            info.quantity = 0;
            info.subTotal = 0;
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
                item.subTotal = item.quantity * item.price;
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
                item.subTotal = item.quantity * item.price;
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
            return tot + sub.subTotal
        }, 0);

        this.setState({ totalAmount: newTotalAmount })
    }

    addCart = () => {
        axios.post('/api/cart', {foodItems: this.state.cart});
    }

    handleToken = async (token) => {
        const { totalAmount } = this.state
        const response = await axios.post('/checkout', { token, totalAmount });
        const { status } = response.data
        if (status === 'success') {
            toast('Success! Check email for details',
                { type: 'success' })
                this.addCart()
                this.setState({cart:[], totalAmount: 0})
        } else {
            toast('Something went wrong! Check email for details',
                { type: 'error' })
        }
    }

    render() {
        console.log(this.state.cart)
        const { totalAmount } = this.state;

        const mappedList = this.state.menuList.map(info => {
            return <MenuList getItemById={this.getItemById} addItemToCart={this.addItemToCart} key={info.name} info={info} />
        })

        let mappedCart = this.state.cart.map(food => {
            return (
                <Cart key={food.food_id}
                    food={food}
                    addQuantityOnClick={this.addQuantityOnClick}
                    minusQuantityOnClick={this.minusQuantityOnClick}
                    deleteItemCart={this.deleteItemCart} />
            )
        })

        

        return (
            <div className="menu-container">
                <div className="menu-list">
                    <h2 style={{ textDecorationLine: 'underline', textAlign: 'center' }}> MENU </h2>
                    {mappedList}
                    <div>
                        <ProductDisplay product={this.state.selectedProduct} />
                    </div>
                    <div className='cart-box'>
                        <h2 style={{ textDecorationLine: 'underline', textAlign: 'center' }}> CART </h2>
                        <h3>{mappedCart}</h3>
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
                            />
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default Menu;