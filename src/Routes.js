import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Desc from "./components/Desc";
// import Contact from "./Contact/Contact";
// import Products from "./Product/Products";
// import Home from "./Home/Home";
import history from './history';
import Main from "./Main";
import Admin from './Admin'
import Login from './Login'
import { User } from "./User";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/admin" exact component={Admin} />
                    <Route path="/user" exact component={User} />
                    <Route path="/Desc" exact component={Desc} />
                    <Route path="/quiz" exact component={Main} />
                    <Route path="/" component={Login} />
                    {/* <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}