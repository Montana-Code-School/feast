import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
 
     render(){
        return (
          <Menu fixed='top'>
            <Container>
              <Menu.Item header>
                FEAST
               </Menu.Item>
              {/* <Menu.Item>Profile</Menu.Item> */}
              <Link to={'/profile/' + this.props.profileId + '?access_token=' + localStorage.getItem("feastAT")}><Menu.Item>Profile</Menu.Item></Link>
              <Menu.Item>Sign Out</Menu.Item>
            </Container>
          </Menu>
        )
    }
}

export default Navbar;