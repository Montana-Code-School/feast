import React, { Component } from 'react';
// import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Image, Form, Grid, Button, Message } from 'semantic-ui-react';
// import './photo';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProfile: [],
      email: "",
      password: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      allergies: ""

    };
  }
  componentWillMount() {
    axios.get('/api/profiles/' + this.props.match.params.id)
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
      axios.get('/api/friends?filter={"include":["profile"],"where":{"host":'+ this.props.match.params.id + '}}')
      .then((response) => {
        console.log(response);
        this.setState({
          // name: response.data.name
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {/* <div id="profile-overlay"></div> */}
        <Header
        as='h1'
        content='PROFILE'
        color='green'
        textAlign='center'
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
        <Button.Group fluid>
          <Button type='submit' color='teal'>JOIN A FEAST</Button>
          <Button.Or />
          <Link to={"/event/create/" + this.props.match.params.id}><Button type='submit' color='purple'>HOST A FEAST</Button></Link>
        </Button.Group>
        <Link to={"/photo/Photo" +this.props.match.params.id}><Button color='teal'>Add Photo</Button></Link>
        <Grid
      textAlign='center'
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 180 }}>
        <Message>
          Add <a href=''>Image</a>
        </Message>
        </Grid.Column>
    </Grid>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group widths={1}>
            <Form.Input label='Email' name="email" onChange={this.handleChange} value={this.state.email} />
            <Form.Input label='Password' name="password" onChange={this.handleChange} value={this.state.password} />
            <Form.Input label='Name' name="name" onChange={this.handleChange} value={this.state.name} />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Input label='Street' name="street" onChange={this.handleChange} value={this.state.street} />
            <Form.Input label='City' name="city" onChange={this.handleChange} value={this.state.city} />
            <Form.Input label='State' name="state" onChange={this.handleChange} value={this.state.state} />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Input label='Zip' name="zip" onChange={this.handleChange} value={this.state.zip} />
            <Form.Input label='Phone'name="phone" onChange={this.handleChange} value={this.state.phone} />
            <Form.Input label='Allergies' name="allergies" onChange={this.handleChange} value={this.state.allergies} />
          </Form.Group>
          <Form.Group widths={2}>
          </Form.Group><br/>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            </Grid.Column>
          </Grid>
        <Link to={"/profile/edit/" + this.props.match.params.id}><Button color='teal'>Edit</Button></Link>
        </Form>
        <br/>
       <Link to={"/friends/list/" +this.props.match.params.id}><Button color='teal'>Add Friends</Button></Link>

      </div>
    );
  }
}

export default Profile;
