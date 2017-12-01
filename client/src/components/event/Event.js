import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Image, Form, Grid,List,Button} from 'semantic-ui-react';


class Event extends Component {
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
    }


  componentWillMount() {
    axios.get('/api/events/' + this.props.match.params.eid)
    .then((response) => {
      console.log(response);
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

  

  render() {
    return (
      <div id='event-overlay'>
        <Header
        as='h1'
        content='WELCOME TO THE FEAST'
        color='green'
        textAlign='center'
        verticalAlign='middle'            
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
        <Image src='https://placeimg.com/640/480/people' size='medium' rounded centered />
        <Header as='h1' color='green' textAlign='center'>
          YOUR HOST
        </Header>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Host' name="host" onChange={this.handleChange} value={this.state.host} />
            <Form.Input label='Date'  name="date" onChange={this.handleChange} value={this.state.date}/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Time'  name="time" onChange={this.handleChange} value={this.state.time}/>
            <Form.Input label='Theme'  name="theme" onChange={this.handleChange} value={this.state.theme}/>
          </Form.Group>
          <Form.Group unstackable widths={1}>
            <Form.Input label='Street' name="street" onChange={this.handleChange} value={this.state.street}/>
            <Form.Input label='City' name="city" onChange={this.handleChange} value={this.state.city}/>
            <Form.Input label='State' name="state" onChange={this.handleChange} value={this.state.state}/>
            <Form.Input label='Zip' name="zip" onChange={this.handleChange} value={this.state.zip}/>
          </Form.Group>
        </Form> 
        <Grid columns={4} divided>
          <Grid.Row> 
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header as='h4'>COURSES</List.Header>
                  Import our courses with the number of fields per course we have created.
                </List.Item>
              </List> 
            </Grid.Column>
            <Grid.Column>  
              <h4>TOOLS</h4>
              import list of tools offered <br/>
              display feild for reservation of tool
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
        <Link to={"/event/edit/" + this.props.match.params.eid}><Button type='submit' color='teal'>Edit</Button></Link>
        <Link to={"/profile/list/"}><Button type='submit' color='teal'>Add Friends</Button></Link>

      </div>
    );
  }
}

export default Event;
