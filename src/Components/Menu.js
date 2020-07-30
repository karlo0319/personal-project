import React from 'react';
import MenuList from '../Components/MenuList';
import ProductDisplay from '../Components/ProductDisplay';
import axios from 'axios';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            selectedProduct: []
        }
    }

    componentDidMount = () => {
        axios.get(`/api/menu`)
            .then(res => this.setState({ menuList: res.data }))
            .catch(err => console.log(err))
    }

    getItemById = (info) => {
        this.setState({ selectedProduct: info })
    }


    render() {
        console.log(this.state)
        const mappedList = this.state.menuList.map(info => {
            return <MenuList getItemById={this.getItemById} key={info.name} info={info} />
        })

        return (
            <div className="menu-container">
                <div className="menu-list">
                    <h2 style={{ textDecorationLine: 'underline', textAlign: 'center' }}> MENU </h2>
                    {mappedList}
                    <ProductDisplay product={this.state.selectedProduct} />
                </div>

            </div>
        )
    }
}

export default Menu;