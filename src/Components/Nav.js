import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../redux/reducer';
import axios from 'axios';


const Nav = props => {

    const handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser();
            this.props.history.push('/');
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='nav-container'>
            <Link to='/about'className='nav-links'>ABOUT US</Link>
            <Link to='/menu' className='nav-links'>MENU</Link>
            <Link to='/history'className='nav-links'> ORDER HISTORY</Link>
            <Link to='/' className='nav-links' onClick={handleLogout} > LOGOUT</Link>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { clearUser })(Nav));
