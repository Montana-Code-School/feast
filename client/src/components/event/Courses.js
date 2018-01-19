import React, { Component } from 'react';
import axios from 'axios';
import { Header, Form, Button, Card } from 'semantic-ui-react';
import Navbar from '../navbar/Navbar';
import './Courses.css';


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
    }

  handleSubmit(event) {
    event.preventDefault();
    
    const createDish = {
      name: this.state.name,
      course: this.state.course,
      eventId: this.state.eventId
    }
    axios.post('/api/dishes', createDish)
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push("/event/" + this.state.eventId)

    }

  render() {
    return (
      <div>
        <div id='courses-overlay'>
        </div>
        <Navbar profileId={this.state.profileId}/>
        <div id='content'>
        <Header
            as='h1'
            content='Course'
            color='green'
            textAlign='center'
            style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        <Card>
        <Card.Content>  
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={1}>
            <Form.Input label={this.props.match.params.course.toUpperCase()} placeholder='Add To The FEAST' name="name" onChange={this.handleChange} />
          </Form.Group>
        </Form>
        </Card.Content>
        </Card>  
          <Button color='teal'>Add Dish</Button>
      </div>
      </div> 
      
    );
  }
}

export default Courses;