import React from 'react';

function OrderHistoryList(props) {
    const { order } = props
    return (
        <div>
            {/* <div>
                <div><h1 >Item Name </h1></div>
                <div><h1> Price </h1></div>
                <div><h1> Quantity </h1></div>
                <div><h1> Subtotal</h1></div>
            </div> */}
            <div className="order-history">
                <div className="item"><h3> {order.name} </h3> </div>
                <div className="item"><h3> ${order.price} </h3> </div>
                <div className="item"><h3 > {order.quantity} </h3></div>
                <div className="item"><h3> ${order.subtotal} </h3></div>
            </div>
        </div>
    )
}

export default OrderHistoryList;