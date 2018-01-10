import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { Header, Image, Grid, Message, Button, Form} from 'semantic-ui-react';
import "./EditProfile.css";


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile: [],
        email: "",
        password: "",
        name: "",
        street:"",
        city:"",
        state: "",
        zip:"",
        phone:"",
        allergies:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.put('/api/profiles/'+ this.props.match.params.id + '?access_token=' + localStorage.getItem("feastAT"), {
      id: this.state.id,
      email: this.state.email,
      password: this.state.password,
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
    axios.get('/api/profiles/' + this.props.match.params.id + '?access_token=' + localStorage.getItem("feastAT"))
    .then((response) => {
      console.log(response);
      this.setState({
        email: response.data.email, 
        password: response.data.password,
        name: response.data.name,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zip: response.data.zip,
        phone: response.data.phone,
        allergies: response.data.allergies
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
        <Header
        as='h1'
        content='EDIT PROFILE'
        color='green'
        textAlign='center'
        style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        <Link to={"/profile/" + this.props.match.params.id}><Button color='teal'>Back</Button></Link>
        <Image src='http://fillmurray.com/200/300' size='small' rounded centered/>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        > 
          <Grid.Column style={{ maxWidth: 180 }}>
            <Message>
              Edit <a href=''>Image</a>
            </Message>
          </Grid.Column>
        </Grid><br/>
        <div className='text'>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group unstackable widths={1}>
              <Form.Input type='text' label='Email' name="email" onChange={this.handleChange}  value={this.state.email}/>
              <Form.Input type='text' label='Password' name="password" onChange={this.handleChange} value={this.state.password}/>
              <Form.Input type='text' label='Name' name="name" onChange={this.handleChange} value={this.state.name}/>
            </Form.Group>
            <Form.Group widths={1}>
              <Form.Input type='text' label='Street' name="street" onChange={this.handleChange} value={this.state.street}/>
              <Form.Input type='text' label='City' name="city" onChange={this.handleChange} value={this.state.city}/>
              <Form.Input type='text' label='State' name="state" onChange={this.handleChange} value={this.state.state}/>
            </Form.Group>
            <Form.Group widths={1}>
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
