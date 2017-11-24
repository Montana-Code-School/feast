import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Event.css';
import axios from 'axios';
import { Header, Image, Form, List } from 'semantic-ui-react';


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
        <Header as='h1' color='green' textAlign='center'>
          WELCOME TO THE FEAST!
        </Header>
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
        <List>
          <List.Item>
            <List.Header>Appetizer</List.Header>
            Pass in our apps
          </List.Item>
          <List.Item>
            <List.Header>Salad</List.Header>
            Pass in our salads
          </List.Item>
          <List.Item>
            <List.Header>Entree</List.Header>
            Pass in our entrees
          </List.Item>
          <List.Item>
            <List.Header>Dessert</List.Header>
            Pass in our desserts
          </List.Item>
        </List>

      </div>
    );
  }
}

export default Event;
