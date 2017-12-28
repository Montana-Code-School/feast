import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import { Menu, Container } from 'semantic-ui-react';


class Navbar extends Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {profileId: ""}
  // }

  // componentWillMount() {
  //   axios.get('/api/profiles/' + this.props.match.params.id)
  //   .then((response) => {
  //     this.setState({
  //       profileId: response.data
  //     })
  //   })
  //   .catch((error) => {
  //     console.log(error);        
  //     }
  //   );
  // }
  
    render(){
        return (
          <Menu fixed='top' stackable>
            <Container>
              <Menu.Item header>
                FEAST
               </Menu.Item>
              <Menu.Item>Profile</Menu.Item>
              {/* <Link to={"/profiles/" + this.props.match.params.id}><Menu.Item>Profile</Menu.Item></Link> */}
              <Menu.Item>Event</Menu.Item>
              <Menu.Item>Sign Out</Menu.Item>
            </Container>
          </Menu>
        )
    }
}

export default Navbar;