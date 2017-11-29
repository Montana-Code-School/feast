import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Event.css';
import axios from 'axios';
import { Header, Image, Form, Grid, List } from 'semantic-ui-react';


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      time: "",
      place: "",


    };
  }
  componentWillMount() {
    axios.get('/api/events/' + this.props.match.params.id)
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
      <div id='event-overlay'>
        <Header
        as='h1'
        content='WELCOME TO THE FEAST'
        color='green'
        textAlign='center'
        verticalAlign='middle'            
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
        <Image src='https://placeimg.com/640/480/people' size='medium' rounded centered />
        <Header as='h1' color='green' textAlign='center'>
          YOUR HOST
        </Header>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Host' placeholder='Host' name="host" onChange={this.handleChange} value={this.state.name} />
            <Form.Input label='Date' placeholder='Date' name="date" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Time' placeholder='Time' name="time" onChange={this.handleChange} />
            <Form.Input label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group unstackable widths={1}>
            <Form.Input label='Street' placeholder='Street' name="street" onChange={this.handleChange} />
            <Form.Input label='City' placeholder='City ' name="city" onChange={this.handleChange} />
            <Form.Input label='State' placeholder='State' name="state" onChange={this.handleChange} />
            <Form.Input label='Zip' placeholder='Zip' name="zip" onChange={this.handleChange} />
          </Form.Group>
        </Form>
        <Grid columns={4} divided>
          <Grid.Row> 
            <Grid.Column>
            <List>
              <List.Item>
                <List.Header as='h4'>COURSES</List.Header>
                Import our courses with the number of fields per course we have created.
              </List.Item>
            </List> 
            </Grid.Column>
            <Grid.Column>  
              <h4>TOOLS</h4>
              import list of tools offered <br/>
              display feild for reservation of tool
            </Grid.Column>
            <Grid.Column>
              <h4>GUESTS</h4>
              import list of guest as the confirm that they are coming
            </Grid.Column>
            <Grid.Column>
              <h4>Allergies</h4>
              import a list of allergies from the list of confirmed guests
            </Grid.Column>
          </Grid.Row>
        </Grid>  
      </div>
    );
  }
}

export default Event;
