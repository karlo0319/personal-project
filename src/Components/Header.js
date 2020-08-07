import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../redux/reducer';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

toast.configure();


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        axios.post('/api/auth/login', { email, password })
            .then(res => {
                this.props.updateUser(res.data);
                this.props.history.push('/about');
            })
            .catch(err => toast('Invalid Email or Password'));
    }


    render() {
        const { username, password } = this.state
        return (
            <div className='header-container'>
                <div>
                    <img className="gabinas-logo" alt="logo" src="https://static.wixstatic.com/media/b7a70a_676e377cb23346a1a506efc23a727bbb~mv2_d_1700_2200_s_2.jpg/v1/crop/x_0,y_497,w_1700,h_1100/fill/w_980,h_634,al_c,q_85,usm_0.66_1.00_0.01/gabina's%20logo%20digitized.webp" />
                </div>
                {this.props.location.pathname === '/'
                    ? (<div className="login-area">
                        <div className="login-box">
                            <input className="username-box"
                                type='text'
                                placeholder='E-mail'
                                name='email'
                                value={username}
                                onChange={e => this.handleChange(e)} />
                            <input className="password-box"
                                type='text'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={this.handleChange} />
                            <button className="auth-button" onClick={e => this.handleLogin(e)}> LOGIN </button>
                        </div>
                    </div>)
                    : null}
                {this.props.location.pathname !== '/' 
                    ? 
                    <h2 className="welcome"> Welcome {this.props.user.username} ! </h2>
                    : 
                    null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { updateUser })(Header));