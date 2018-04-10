import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/login/Login';
import Home from '../pages/home/Home';

class MainRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
            </Switch>
        );
    }
}


export default MainRouter;
