import React from 'react';
import axios from 'axios';
import OrderHistoryList from './OrderHistoryList';



class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderHistory: []
        }
    }

    componentDidMount = () => {
        axios.get(`/history`)
            .then(res => this.setState({ orderHistory: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.orderHistory)
        const mappedOrderHistory = this.state.orderHistory.map(order => {
            return (
                <OrderHistoryList className="order-history" key={order.name} order={order} />
            )
        }
        )

        return (
            <div className="menu-container">
                <div>
                    {mappedOrderHistory}
                </div>
            </div>
        )
    }
}

export default OrderHistory;