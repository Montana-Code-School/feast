import React, { Component } from 'react';
// import { Link} from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Header } from 'semantic-ui-react';
import Navbar from '../navbar/Navbar';

class EditEvent extends Component {
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
    };
      this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
      console.log(event.target.value);
      this.setState({[event.target.name]: event.target.value});
    }
  componentWillMount() {
    axios.get('/api/events/' + this.props.match.params.eid)
    .then((response) => {
      // console.log(response);
      this.setState({
        host: response.data.host,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zip: response.data.zip,
        time: response.data.time,
        date: response.data.date,
        theme: response.data.theme 
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  handleSubmit(event) {
    event.preventDefault();
    var updateProfile = this.state;
    console.log (updateProfile)
    axios.put('/api/events/'+ this.props.match.params.eid, {
      host: this.state.host,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      time: this.state.time,
      date: this.state.date,
      theme: this.state.theme 

      
    })
    .then((response) => {
      // updateProfile.push(response.data);          
      console.log(response.data);
      console.log(this.props.history);
      this.setState({
        newProfile: updateProfile
      })
     this.props.history.push("/event/" + response.data.id)  
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Header
        as='h1'
        content='EDIT EVENT'
        color='green'
        textAlign='center'
        style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        <Form onSubmit={(e) => this.handleSubmit(e)}>
     <Form.Group unstackable widths={2}>
        <Form.Input label='Host' placeholder='Host' name="host" onChange={this.handleChange} value= {this.state.host}/>
        <Form.Input label='Date' placeholder='Date' name="date" onChange={this.handleChange} value= {this.state.date} />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Time' placeholder='Time' name="time" onChange={this.handleChange} value= {this.state.time} />
        <Form.Input label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} value= {this.state.theme}/>
      </Form.Group>
      <Form.Group unstackable widths={1}>
        <Form.Input label='Street' placeholder='Street' name="street" onChange={this.handleChange} value = {this.state.street}/>
        <Form.Input label='City' placeholder='City ' name="city" onChange={this.handleChange} value= {this.state.city}/>
        <Form.Input label='State' placeholder='State' name="state" onChange={this.handleChange} value= {this.state.state}/>
        <Form.Input label='Zip' placeholder='Zip' name="zip" onChange={this.handleChange} value= {this.state.zip}/>
      </Form.Group>
      <Button type='submit' color='teal'>Submit</Button>
    </Form>
  
       

      </div>
    );
  }
}

export default EditEvent;
