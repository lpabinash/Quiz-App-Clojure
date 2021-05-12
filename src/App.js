import React, { Component } from 'react'
import { Router, Switch, Route } from "react-router-dom";

import Desc from "./components/Desc";
import history from './history';
import Main from "./Main";
import Admin from './Admin'
import Login from './Login'
import { User } from "./User";

export class App extends Component {
  state = {
    loggedIn: false,
  };
  render() {
    return (
      <div>
         <Router history={history}>
                <Switch>
                    <Route path="/admin" exact component={Admin} />
                    <Route path="/user" exact component={User} />
                    <Route path="/Desc" exact component={Desc} />
                    <Route path="/quiz" exact component={Main} />
                    <Route path="/"  component={Login} />
                    
                </Switch>
            </Router>
      </div>
    )
  }
}

export default App

