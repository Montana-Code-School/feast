import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/auth/login/Login';
import SignUp from './components/auth/signUp/SignUp';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/> 
        <Route exact path="/signUp" component={SignUp}/> 
      </Switch>
      
      </BrowserRouter>
    
    );
  }
}

export default App;
