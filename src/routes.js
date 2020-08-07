import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Menu from './Components/Menu';
import Nav from './Components/Nav';
import Main from './Components/Main';
import OrderHistory from './Components/OrderHistory';
import About from './Components/About';

export default (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/logout' component={Nav} />
        <Route path='/about' component={About} />
        <Route path='/menu' component={Menu} />
        <Route path='/history' component={OrderHistory} />
    </Switch>
)