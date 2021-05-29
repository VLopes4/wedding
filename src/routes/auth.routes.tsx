import React from  'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
import Event from '../pages/Event';
import Gift from '../pages/Gift';
import Home from '../pages/Home';
import Message from '../pages/Message';
import Order from '../pages/Order';
import Profile from '../pages/Profile';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/message" component={Message}/>
                <Route path="/gifts" component={Gift}/>
                <Route path="/event" component={Event}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/order" component={Order}/>
            </Switch>
        </BrowserRouter>
    );
}