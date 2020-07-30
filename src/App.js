import React from 'react';
import './App.css';
import Header from './Components/Header';
import Nav from './Components/Nav';
import routes from './routes';
import {withRouter} from 'react-router-dom'



function App(props) {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      {props.location.pathname === '/' || props.location.pathname === '/dashboard' ? <img alt="adobo" className="adobo-background" src="https://simply-delicious-food.com/wp-content/uploads/2019/09/Easy-Chicken-Adobo-3-480x270.jpg"/> : null}
      {routes}
    </div>
  );
}

export default withRouter(App);