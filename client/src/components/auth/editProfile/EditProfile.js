import React, { Component } from 'react';
import axios from 'axios';
import { Header, Grid, Message, Button, Form } from 'semantic-ui-react';
import "./EditProfile.css";
import Navbar from '../../navbar/Navbar'


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile: [],
        // email: "",
        // password: "",
        name: "",
        street:"",
        city:"",
        state: "",
        zip:"",
        phone:"",
        allergies:"",
        listId: "",
        profileId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state.phone)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('updating')
    axios.put('/api/profileLists/'+ this.state.listId + '?access_token=' + localStorage.getItem("feastAT"), {
      profileId: this.state.profileId,
      email: this.state.email,
      name: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      phone: this.state.phone,
      allergies: this.state.allergies      
    })
    .then((response) => {
      this.props.history.push("/profile/" + response.data.id)       
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
    axios.get('/api/profileLists/'+ this.props.match.params.id +'?access_token=' + localStorage.getItem("feastAT"))
    .then((response) => {
      console.log(response);
      this.setState({
        email: response.data.email, 
        name: response.data.name,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zip: response.data.zip,
        phone: response.data.phone,
        allergies: response.data.allergies,
        listId: response.data.id,
        profileId: response.data.profileId
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  render() {
    return (
      <div>
      <div id='background'></div>
      <Navbar profileId={this.state.profileId}/>
      <div id='content'>
        <Header
        as='h1'
        content='EDIT PROFILE'
        color='green'
        textAlign='center'
        style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
          <Grid.Column style={{ maxWidth: 180 }}>
            <Message>
              Edit <a href=''>Image</a>
            </Message>
          </Grid.Column>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group unstackable widths={2}>
              <Form.Input type='text' label='Name' name="name" onChange={this.handleChange} value={this.state.name}/>
            </Form.Group>
            <Form.Group widths={3}>
              <Form.Input type='text' label='Street' name="street" onChange={this.handleChange} value={this.state.street}/>
              <Form.Input type='text' label='City' name="city" onChange={this.handleChange} value={this.state.city}/>
              <Form.Input type='text' label='State' name="state" onChange={this.handleChange} value={this.state.state}/>
            </Form.Group>
            <Form.Group widths={3}>
              <Form.Input type='text' label='Zip' name="zip" onChange={this.handleChange} value={this.state.zip}/>
              <Form.Input type='text' label='Phone' name="phone" onChange={this.handleChange} value={this.state.phone}/>
              <Form.Input type='text' label='Allergies' name="allergies" onChange={this.handleChange} value={this.state.allergies}/>
            </Form.Group><br />
            <Button type='submit' color='teal'>Submit</Button>
          </Form>
      </div>
    </div>
    );
  }
}

export default EditProfile;
