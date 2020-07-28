import React from 'react';
import {withRouter, Link} from 'react-router-dom';

const Nav = props => {
    // console.log(props)
    return (
        <div className='nav-container'>
            <Link to='/about'className='nav-links'>ABOUT US</Link>
            <Link to='/menu' className='nav-links'>MENU</Link>
            <Link to='/location'className='nav-links'>LOCATION</Link>
            <Link to='/contact' className='nav-links'>CONTACT US</Link>
        </div>
    )
}

export default withRouter(Nav);
