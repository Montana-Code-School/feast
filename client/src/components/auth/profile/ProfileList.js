import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Form, Button } from 'semantic-ui-react';


class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      

    };
    this.handleChange = this.handleChange.bind(this);
    
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
    //var friendEmail = this.setState({[event.target.name]: event.target.value});
    
  }
 
  componentWillMount() {
    axios.get('/api/profiles')
      .then((response) => {
        console.log(response);
        this.setState({
          
        })
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
        </Form>
        <Link to={"/profile/edit/" + this.props.match.params.id}><Button color='teal'>Find Friend</Button></Link>
      </div> 
      
    );
  }
}

export default ProfileList;