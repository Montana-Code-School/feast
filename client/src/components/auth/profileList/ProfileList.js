import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Form, Button } from 'semantic-ui-react';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    friendEmail:'',
    friendId: ''

    };
    this.handleChange = this.handleChange.bind(this);
    
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value,
    friendEmail: event.target.value     
    });
    // friendEmail = event.target.value;
  }
 

  handleSubmit(event) {
    event.preventDefault();
    axios.get('/api/profiles/findOne?filter[where][email]=' + this.state.friendEmail)
    .then((response) => {
       console.log(response);
      this.setState({
        friendId: response.data.id
      })
      
      const createFriendship = {
        host: this.props.match.params.pid,
        friend: this.state.friendId
      }

      console.log(createFriendship);
      axios.post('/api/friends', createFriendship)
      .then((response) => {
        console.log(response);
        this.setState({
          //friendId: response.data.pid
        })
      })
      .catch((error) => {
        console.log(error);
      });

    })
    .catch((error) => {
      console.log(error);
    });
  
    
      

      
      
    }

  render() {
    return (
      <div>
       
        <Header as='h1' color='green' textAlign='center'>
          Profile List
        </Header>
        
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Email' placeholder='Email' name="email" onChange={this.handleChange} />
          </Form.Group>
          <Button color='teal'>Find Friend</Button>
        </Form>

      </div> 
      
    );
  }
}

export default ProfileList;