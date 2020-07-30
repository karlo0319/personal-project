import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../redux/reducer';
import './Dashboard';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleRegister = () => {
        console.log(this.state)
        const { username, email, password } = this.state;
        if (password) {
            axios.post('/api/auth/register',{username, email, password})
                .then(res => {
                    this.props.updateUser(res.data)
                    this.props.history.push('/dashboard')
                })
                .catch(err => console.log(err))
        } else {
            alert('Password do not match');
        }
    }

    render() {
        const { username, email, password } = this.state
        return (
            <div className="register-box">
                <h2 className="Mew-user"> New user? </h2>
                <div>
                    <span> USERNAME: </span> <br/>
                    <input className="input-box"
                        type='text'
                        name='username'
                        value={username}
                        onChange={e => this.handleChange(e)} />
                </div>
                <div>
                    <span> E-MAIL: </span><br/>
                    <input className="input-box"
                        type='text'
                        name='email'
                        value={email}
                        onChange={e => this.handleChange(e)} />
                </div>
                <div>
                    <span> PASSWORD: </span><br/>
                    <input className="input-box"
                        type='text'
                        name='password'
                        value={password}
                        onChange={this.handleChange} />
                </div>
                <div className="auth-button-section">
                    <div >
                        <button className="auth-button" onClick={e => this.handleRegister(e)}> REGISTER </button>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = reduxState => reduxState;

export default connect(null, { updateUser })(Main);