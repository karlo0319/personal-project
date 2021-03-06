import React from 'react';

function MenuList(props) {
    const {info} = props
    return (
        <div className="product-details">
            <div className="product-name">
                <p className="product-name" onClick={() => props.getItemById(info)}> {info.name} ${info.price} </p>
            </div>
            <div>
                <button className="add-button" onClick ={()=> props.addItemToCart(info)}> ADD ITEM </button>
            </div>
        </div>
    )
}

export default MenuList;