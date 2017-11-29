import React, { Component } from 'react';
import './CreateEvent.css';
import axios from 'axios';
import { Header, Button, Form, Grid, Dropdown, Checkbox } from 'semantic-ui-react';
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
      theme: ""
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

    const options = [
      { key: 1, text: 'Appetizer', value: 1 },
      { key: 2, text: 'Salad', value: 2 },
      { key: 3, text: 'Entree', value: 3 },
      { key: 4, text: 'Dessert', value: 4 },
    ]

    return (
      <div id='event-overlay'>
       <Header
            as='h1'
            content='CREATE A FEAST'
            color='green'
            textAlign='center'
            verticalAlign='middle'            
            style={{ fontSize: '4em', fontWeight: 'bold' }}
          />
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
              <h4>Courses</h4>
              <Dropdown text='Dropdown' options={options} open />
            </Grid.Column>
            <Grid.Column>  
              <h4>TOOLS</h4>
              <Checkbox label='Oven' /> <br/>
              <Checkbox label='Fridge' /> <br/>
              <Checkbox label='Range' /> <br/>
              <Checkbox label='Mixer' /> <br/>
              <Checkbox label='Blender' /> <br/>
              <Checkbox label='Food Processor' /> <br/>
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
          <Button type='submit' color='teal'>Submit</Button>
      </div>
    );
  }
}



export default CreateEvent;