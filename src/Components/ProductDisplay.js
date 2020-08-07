import React from 'react';


function ProductDisplay(props) {
    return (
        <div className='item-details'>
            {!props.default ? 
            <div className='item-details2'>
            <h2 style= {{textAlign: 'center', color: 'white'}}> Click any Item Name to see full Product Description </h2>
            <img className="food-image" alt="" src="https://media.istockphoto.com/photos/empty-round-dinner-plate-isolated-on-white-background-clipping-path-picture-id184933994?k=6&m=184933994&s=612x612&w=0&h=amHI6AqRcay2k_AFoGN2iz0pKR1ZlRTBlQtfWX14S5s="/> 
            </div>
            : <div className='item-details2'>
           <h1 style= {{ textDecorationLine: 'underline', textTransform: 'uppercase'}} > {props.product.name} </h1>
           <img alt="" className="food-image" src={props.product.image} />
           <h3 style= {{textAlign: 'center', fontFamily: 'cursive', color: 'white'}}> {props.product.description} </h3>
           </div>
            }
        </div>
    )
}

export default ProductDisplay;