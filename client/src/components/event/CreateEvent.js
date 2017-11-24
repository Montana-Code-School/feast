import React, { Component } from 'react';
import './CreateEvent.css';
import axios from 'axios';
import { Header, Button, Form, Menu } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';


class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      time: "",
      date: "",
      theme: "",
      activeItem: ""
    }
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })  

  handleSubmit(event) {
    event.preventDefault();
    const createEvent = {
      host: this.state.host,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      time: this.state.time,
      date: this.state.date,
      theme: this.state.theme,
      profileId: this.props.match.params.hid
    };
    axios.post('/api/events', createEvent)
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
  componentWillMount() {
    axios.get('/api/profiles/' + this.props.match.params.id)
      .then((response) => {
        // console.log(response);
        this.setState({

          host: response.data.name,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,

        })
      })
      .catch((error) => {
        console.log(error);
      });



    // this.setAccessToken(res.data.id);

  }


  render() {

    const { activeItem } = this.state;    

    return (
      <div id='event-overlay'>
        <Header as='h1' color='green' textAlign='center'>
          CREATE A FEAST!
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
          <Button type='submit' color='teal'>Submit</Button>
        </Form>
        <Menu pointing secondary>
          <Menu.Item name='appatizer' active={activeItem === 'appatizer'} onClick={this.handleItemClick} />
          <Menu.Item name='salad' active={activeItem === 'salad'} onClick={this.handleItemClick} />
          <Menu.Item name='entree' active={activeItem === 'entree'} onClick={this.handleItemClick} />
          <Menu.Item name='dessert' active={activeItem === 'dessert'} onClick={this.handleItemClick} />
        </Menu>

      </div>
    );
  }


}



export default CreateEvent;