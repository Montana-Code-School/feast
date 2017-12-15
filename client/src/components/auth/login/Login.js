import React, { Component } from 'react';
import "./Login.css";
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userLogin = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/api/profiles/login', userLogin)
      .then((res) => {
        console.log(res);
        localStorage.setItem("feastAT", res.data.id)
        this.props.history.push("/profile/" + res.data.userId)
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <div id="hero-overlay"></div>
        <div className='login-form'>
          {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
          <Header
            as='h1'
            content='WELCOME TO FEAST'
            inverted
            textAlign='center'
            style={{ fontSize: '6em', fontWeight: 'bold' }}
          />
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h1' color='green' textAlign='center'>
                {' '}Log-in to Feast
        </Header>
              <Form size='large' onSubmit={(e) => this.handleSubmit(e)}>
                <Segment stacked>
                  <Form.Input
                    name='email'
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    name='password'
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                  />

                  <Button color='teal' fluid size='large'>Login</Button>
                </Segment>
              </Form>
              <Message>
                Need to Feast? <a href='./signup'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>

      </div>

    );
  }
}

export default Login;
