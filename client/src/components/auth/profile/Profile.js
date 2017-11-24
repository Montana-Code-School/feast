import React, { Component } from 'react';
import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Image, Form, Grid, Button} from 'semantic-ui-react';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProfile: [],
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
  }

  render() {
    return (
      <div>
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
          <div id="profile-overlay"></div>
        <Header as='h1' color='green' textAlign='center'>
        Profile
        </Header>  
        <Button.Group fluid>
        <Button type='submit' color='teal'>JOIN A FEAST</Button>
        <Button.Or />
        <Link to={"/event/create/"+this.props.match.params.id}><Button type='submit' color='purple'>HOST A FEAST</Button></Link>
        </Button.Group>
        <Image src='https://placeimg.com/640/480/people' size='small' circular centered/>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Email' placeholder='Email' name="email" onChange={this.handleChange} value={this.state.email} />
        <Form.Input label='Password' placeholder='Password' name="password" onChange={this.handleChange} value={this.state.password} />
      </Form.Group>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Name' placeholder='Name' name="name" onChange={this.handleChange} value={this.state.name} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Street' placeholder='Street' name="street" onChange={this.handleChange} value={this.state.street} />
        <Form.Input label='City' placeholder='City' name="city" onChange={this.handleChange} value={this.state.city} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='State' placeholder='State' name="state" onChange={this.handleChange} value={this.state.state} />
        <Form.Input label='Zip' placeholder='Zip' name="zip" onChange={this.handleChange} value={this.state.zip} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Phone' placeholder='Phone' name="phone" onChange={this.handleChange} value={this.state.phone} />
        <Form.Input label='Allergies' placeholder='Allergies' name="allergies" onChange={this.handleChange} value={this.state.allergies} />
      </Form.Group>
      <Grid textAlign='center'style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      </Grid.Column>
    </Grid>
    </Form>
        <Link to={"/profile/edit/" + this.props.match.params.id}><Button color='teal'>Edit</Button></Link>
      </div>
    );
  }
}

export default Profile;
