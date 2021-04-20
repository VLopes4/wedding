import React from  'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
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
            </Switch>
        </BrowserRouter>
    );
}