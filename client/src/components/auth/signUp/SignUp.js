import React, { Component } from 'react';
import axios from 'axios';
import { Header, Button, Form, Message, Grid } from 'semantic-ui-react';
import "./SignUp.css";
// import footer from "./footer.jpg";
// import { Link } from 'react-router-dom';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      allergies: ""

    }
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userSignUp = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      phone: this.state.phone,
      allergies: this.state.allergies,
      emailVerified: true

    }
console.log(event);
    axios.post('/api/profiles', userSignUp)
      .then((res) => {
        console.log(res);
        console.log(this.props.history)
        // this.props.onLogin(res.data.id);          
        this.props.history.push("/profile/" + res.data.id)

      })
      .catch((error) => {
        console.log(error);
      });

  }


  render() {
    return (
      <div>
        <div id="signup-overlay"></div>
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
       <Header
       as='h1'
       content='SIGN UP TO FEAST'
       color='green'
       textAlign='center'
       style={{ fontSize: '4em', fontWeight: 'bold' }}
     /> <br/>
        <br/>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group align="center" widths={1}>
            <Form.Input placeholder='Email' name="email" onChange={this.handleChange} />
            <Form.Input placeholder='Password' name="password" onChange={this.handleChange} />
            <Form.Input placeholder='Name' name="name" onChange={this.handleChange} />
          </Form.Group><br/>
          <Form.Group align="center" widths={1}>
            <Form.Input placeholder='Street' name="street" onChange={this.handleChange} />
            <Form.Input placeholder='City' name="city" onChange={this.handleChange} />
            <Form.Input placeholder='State' name="state" onChange={this.handleChange} />
          </Form.Group><br/>
          <Form.Group align="center" widths={1}>
            <Form.Input placeholder='Zip' name="zip" onChange={this.handleChange} />
            <Form.Input placeholder='Phone' name="phone" onChange={this.handleChange} />
            <Form.Input placeholder='Allergies' name="allergies" onChange={this.handleChange} />
          </Form.Group><br/>
          <Button type='submit' color='teal'>Submit</Button>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Message color='teal'>
                Already signed up? <a href='./'>Log In</a>
              </Message>
            </Grid.Column>
          </Grid>
        </Form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* <Card.Group className='footer'>
        <Card.Content>
        <Card color='orange' fluid image={footer} />
        </Card.Content>
        </Card.Group> */}
      </div>
    );
  }
}



export default SignUp;