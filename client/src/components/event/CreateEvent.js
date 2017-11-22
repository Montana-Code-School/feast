// import React, { React } from 'react';

import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form} from 'semantic-ui-react';
// import { Link } from 'react-router-dom';


class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        host: "",
        place: "",
        time: "",
        date: "",
        theme: ""
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
    const createEvent = {
      host: this.state.host,
      place: this.state.place,
      time: this.state.time,
      date: this.state.date,
      theme: this.state.theme,
      profileId: this.props.match.params.hid
    }
    
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
          // this.setAccessToken(res.data.id);
       
  }
  

  render() {
    return (
      <div>
        {/* <div id="signup-overlay"></div> */}
        <h1>
          Create Event
          </h1>
      <Form onSubmit={(e) => this.handleSubmit(e)}>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Host' placeholder='Host' name="host" onChange={this.handleChange} />
        <Form.Input label='Place' placeholder='Place' name="place" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group unstackable widths={1}>
        <Form.Input label='Date' placeholder='Date' name="date" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Time' placeholder='Time' name="time" onChange={this.handleChange} />
        <Form.Input label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} />
      </Form.Group>
      
      <Button type='submit'>Submit</Button>
    </Form>
  
    
    </div>
    );
  }


}



export default CreateEvent;