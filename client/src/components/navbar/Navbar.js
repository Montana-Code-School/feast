import React, { Component } from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';
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
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item header>
              <Icon name='food'/>
                FEAST
               </Menu.Item>
               <Menu.Item><Link to={'/profile/' + this.props.profileId}><Icon name='spy'/>Profile</Link></Menu.Item>
               <Menu.Item position='right' onClick={this.handleClick}>Sign Out<Icon name='angellist'/></Menu.Item>
            </Container>
          </Menu>
        )
    }
}

export default Navbar;