import React, { Component } from 'react';
// import { Link} from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Header, Grid, Checkbox, Dropdown  } from 'semantic-ui-react';
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
      theme: "",
      profileId: ""
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
        <Navbar profileId={this.state.profileId}/>
        <div id='content'>
        <Header
            as='h1'
            content='CREATE A FEAST'
            color='green'
            textAlign='center'
            style={{ fontSize: '4em', fontWeight: 'bold', fontFamily: 'Ribeye Marrow' }}
        />
        </div>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={1}>
            <Form.Input type="text" label='Host'  name="host" onChange={this.handleChange} value={this.state.host} />
            <Form.Input type="date" label='Date' placeholder='Date' name="date" onChange={this.handleChange} />
            <Form.Input type ="time" label='Time' placeholder='Time' name="time" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group unstackable widths={1}>
            <Form.Input type="text" label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} />
            <Form.Input type="text" label='Street'  name="street" onChange={this.handleChange} value={this.state.street}/>
            <Form.Input type="text" label='City'  name="city" onChange={this.handleChange} value={this.state.city}/>
            <Form.Input type="text" label='State'  name="state" onChange={this.handleChange} value={this.state.state}/>
            <Form.Input type="number" label='Zip'  name="zip" onChange={this.handleChange} value={this.state.zip}/>
          </Form.Group>
        <Grid columns={4} stackable divided>
          <Grid.Row> 
            <Grid.Column>
              <h4>Courses</h4>
              <Dropdown placeholder='Courses' fluid multiple selection />
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
              <h4>Invite Your Friends!</h4>
                {/* {friendsList} */}
            </Grid.Column>
            <Grid.Column>
              <h4>Allergies</h4>
              import a list of allergies from the list of confirmed guests
            </Grid.Column>
          </Grid.Row>
        </Grid><br/>      
         <Button type='submit' color='teal'>Submit</Button>
         </Form>
      </div>
    );
  }
}

export default EditEvent;
