import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import MenuItem from 'semantic-ui-react/dist/commonjs/collections/Menu/MenuItem';


class Navbar extends Component {
 
     render(){
        return (
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item header style={{ fontFamily: 'Ribeye Marrow' }}>
                FEAST
              </Menu.Item>
              <Menu.Item>
              <Link to={'/profile/' + this.props.profileId}><Menu.Item>Profile</Menu.Item></Link>
              </Menu.Item>
              <Menu.Item position='right'>
              <Button onClick={this.handleClickLogout} name='logout' position='right'>Log Out</Button>
              </Menu.Item>
            </Container>
          </Menu>
        )
    }
}

export default Navbar;