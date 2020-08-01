import React from 'react';


function ProductDisplay({product}) {

    return (
        <div className='item-details'>
           <h1 style= {{ textDecorationLine: 'underline', textTransform: 'uppercase'}} > {product.name} </h1>
           <img alt="" className="food-image" src={product.image} />
           <h3 style= {{textAlign: 'center', fontFamily: 'cursive', color: 'white'}}> {product.description} </h3>
        </div>
    )
}

export default ProductDisplay;