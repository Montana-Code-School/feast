import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Form, Button } from 'semantic-ui-react';
import Navbar from '../navbar/Navbar';


class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "",
      profileId: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      time: "",
      date: "",
      theme: "", 
      allergies: [], 
      courses: [],
      dish: ""   

    };
    this.handleChange = this.handleChange.bind(this);

  }
  
 

  handleChange(event) {
    event.preventDefault();
    this.setState(
      {[event.target.name]: event.target.value});
    console.log(this.state.dish);  
    }

    componentWillMount() {
    
      axios.get('/api/events/' + this.props.match.params.eid)
      .then((response) => {
        console.log(response);
        this.setState({
          host: response.data.host,
          profileId: response.data.profileId,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          time: response.data.time,
          date: response.data.date,
          theme: response.data.theme, 
          allergies: response.data.allergies, 
          courses: response.data.courses   
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }



  render() {
    const coursesList = this.state.courses.map((course) => {
      return(
        <div key={course.course}> 
          {/* {course.course.toUpperCase()}<Button>Add to {course.course.toUpperCase()}</Button> */}

          <Form.Group unstackable widths={2}>
            <Form.Input label={course.course.toUpperCase()} placeholder='Dish' name={course.course} onChange={this.handleChange} value={this.state.dish} />
          </Form.Group>
          <Button color='teal'>Add Dish</Button>
          <br/>
          <br/>

        </div>
      )
    })

    return (
      <div>
        <Navbar profileId={this.state.profileId}/>
        <br/>
        <br/>
        <Header as='h1' color='green' textAlign='center'>
          Courses
        </Header>
        
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          {/* <Form.Group unstackable widths={2}>
            <Form.Input label='Email' placeholder='Email' name="email" onChange={this.handleChange} />
          </Form.Group>
          <Button color='teal'>Find Friend</Button> */}
        {coursesList}
        </Form>

      </div> 
      
    );
  }
}

export default Courses;