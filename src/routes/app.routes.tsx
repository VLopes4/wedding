import React from  'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
import Event from '../pages/Event';
import Gift from '../pages/Gift';
import Home from '../pages/Home';
import Message from '../pages/Message';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path="/message" component={Message}/>
                <Route path="/gifts" component={Gift}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/event" component={Event}/>
                <Route exact path="/profile">
                    <Redirect exact to="/"/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}