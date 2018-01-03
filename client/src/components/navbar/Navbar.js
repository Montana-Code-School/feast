import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Navbar extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    axios.post('/api/profiles/logout?access_token=' + localStorage.getItem("feastAT"))
    .then((response) => {
     console.log(response)
    })
    .catch((error) => {
      console.log(error);
  });
    localStorage.removeItem('feastAT');
    window.location = '/';
  }

     render(){
        return (
          <Menu fixed='top'>
            <Container>
              <Menu.Item header>
                FEAST
               </Menu.Item>
               <Link to={'/profile/' + this.props.profileId}><Menu.Item>Profile</Menu.Item></Link>
               <Menu.Item onClick={this.handleClick}>Sign Out</Menu.Item>
            </Container>
          </Menu>
        )
    }
}

export default Navbar;