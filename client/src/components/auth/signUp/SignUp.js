import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form} from 'semantic-ui-react';
import "./SignUp.css";
import { Link } from 'react-router-dom';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        name: "",
        street:"",
        city:"",
        state: "",
        zip:"",
        phone:"",
        allergies:""

    }
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
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
      allergies: this.state.alergies
    }
    
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
          // this.setAccessToken(res.data.id);
       
  }
  

  render() {
    return (
      <div>
        <div id="signup-overlay"></div>
        <h1>
          Sign Up
          </h1>
      <Form onSubmit={(e) => this.handleSubmit(e)}>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Email' placeholder='Email' name="email" onChange={this.handleChange} />
        <Form.Input label='Password' placeholder='Password' name="password" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group unstackable widths={1}>
        <Form.Input label='Name' placeholder='Name' name="name" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Street' placeholder='Street' name="street" onChange={this.handleChange} />
        <Form.Input label='City' placeholder='City' name="city" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='State' placeholder='State' name="state" onChange={this.handleChange} />
        <Form.Input label='Zip' placeholder='Zip' name="zip" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Phone' placeholder='Phone' name="phone" onChange={this.handleChange} />
        <Form.Input label='Allergies' placeholder='Allergies' name="allergies" onChange={this.handleChange} />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  
    
    </div>
    );
  }


}



export default SignUp;