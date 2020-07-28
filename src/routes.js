import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Menu from './Components/Menu';
import Dashboard from './Components/Dashboard';
import Contact from './Components/Contact';
import Main from './Components/Main';
import Location from './Components/Location';
import About from './Components/About';

export default (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
        <Route path='/menu' component={Menu} />
        <Route path='/location' component={Location} />
    </Switch>
)