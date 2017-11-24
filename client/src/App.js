import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/auth/login/Login';
import SignUp from './components/auth/signUp/SignUp';
import Profile from './components/auth/profile/Profile';
import EditProfile from './components/auth/editProfile/EditProfile';
import CreateEvent from './components/event/CreateEvent';
import Event from './components/event/Event';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {userId:""}
  }
  setAccessToken(newAccessToken){
    this.setState({
      userId:newAccessToken
    }) 
    
  }
  render() {
    // console.log(this.userId);
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/> 
        <Route exact path="/signup" onLogin= {this.setAccessToken} component={SignUp}/> 
        <Route exact path="/profile/edit/:id" component={EditProfile}/> 
        <Route exact path="/profile/:id" component={Profile}/> 
        <Route exact path="/event/create/:hid" component={CreateEvent}/> 
        <Route exact path="/event" component={Event}/> 

      </Switch>
      
      </BrowserRouter>
    
    );
  }
}

export default App;
