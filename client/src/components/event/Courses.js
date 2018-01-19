import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
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
      servings: "",
      profileId: ""
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  handleChange(event) {
    event.preventDefault();
    this.setState(
      {[event.target.name]: event.target.value});
    
    console.log(this.state);  
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

    componentWillMount() {
      axios.get('/api/events/' + this.props.match.params.eid)
      .then((response) => {
        console.log(response);
        this.setState({
          profileId: response.data.profileListId,        
        })
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Form.Input label={this.props.match.params.course.toUpperCase()} placeholder='Add To The FEAST' name="name" onChange={this.handleChange} value={this.state.name} />
          </Form.Group>
          <Button color='teal'>Add Dish</Button>
        </Form>
        </Card.Content>
        </Card>  
          
      </div>
      </div> 
      
    );
  }
}

export default Courses;