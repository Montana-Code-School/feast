import React, { Component } from 'react';
import "./Login.css";
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import swal from 'sweetalert';

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
        localStorage.setItem("feastAT", res.data.id)
        
        axios.get('/api/profileLists/findOne?filter[where][profileId]=' + res.data.userId +'&access_token=' + localStorage.getItem("feastAT"))
        .then((response) => {
          this.props.history.push("/profile/" + response.data.id)

        })
        .catch((error) => {
         console.log(error)
        });

      })
      .catch((error) => {
        swal({
          text: "Invalid Email or Password"
        })
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <div id="hero-overlay"></div>
        <div className='login-form'>
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
