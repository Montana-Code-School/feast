import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Image } from 'semantic-ui-react';
import "./SignUp.css";
import footer from "./footer.jpg";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    }
  }
  render() {
    return (
      <div>
        <div id="signup-overlay"></div>
        <h1>
          Sign Up
          </h1>
      <Form>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Email' placeholder='Email' />
        <Form.Input label='Password' placeholder='Password' />
      </Form.Group>
      <Form.Group unstackable widths={2}>
        <Form.Input label='First name' placeholder='First name' />
        <Form.Input label='Last name' placeholder='Last name' />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Street' placeholder='Street' />
        <Form.Input label='City' placeholder='City' />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='State' placeholder='State' />
        <Form.Input label='Zip' placeholder='Zip' />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Phone' placeholder='Phone' />
        <Form.Input label='Alergies' placeholder='Alergies' />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
    <div>
    {/* <Image src={footer} size="huge" alt="drinks" width="100%" verticalAlign="bottom"/> */}
    </div>
    
    </div>
    );
  }


}



export default SignUp;