import React from 'react';

function MenuList(props) {
    console.log(props)
    const {info} = props
    return (
        <div className="product-details">
            <div className="product-name">
                <p className="product-name" onClick={() => props.getItemById(info.food_id)}> {info.name} ${info.price} </p>
            </div>
            <div>
                <button className="add-button"> ADD ITEM </button>
            </div>
        </div>
    )
}

export default MenuList;