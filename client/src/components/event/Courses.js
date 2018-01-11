import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Form, Button } from 'semantic-ui-react';
import Navbar from '../navbar/Navbar';


class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.eid, 
      course: this.props.match.params.course,
      name: "",
      servings: ""
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  handleChange(event) {
    event.preventDefault();
    this.setState(
      {[event.target.name]: event.target.value});
    
    console.log(this.state.dish);  
    }

  handleSubmit(event) {
    event.preventDefault();
    
    const createDish = {
      name: this.state.name,
      course: this.state.course,
      eventId: this.state.eventId
    }
    console.log(createDish);
    axios.post('/api/dishes', createDish)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push("/event/" + this.state.eventId)

    }

  //   componentWillMount() {
  //
  // }

  render() {
    return (
      <div>
        <Navbar profileId={this.state.profileId}/>
        <br/>
        <br/>
        <Header as='h1' color='green' textAlign='center'>
          Courses
        </Header>
        
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label={this.props.match.params.course.toUpperCase()} placeholder='Add to the FEAST' name="name" onChange={this.handleChange} />
          </Form.Group>
          <Button color='teal'>Add Dish</Button>
        </Form>

      </div> 
      
    );
  }
}

export default Courses;