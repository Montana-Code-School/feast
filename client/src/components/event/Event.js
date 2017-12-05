import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Event.css'
import { Header, Image, Grid, List, Button, Card } from 'semantic-ui-react';


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
        {/* GoogleMap API KEY AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo */}
        <Card.Group itemsPerRow={2}>
        <Card>
        <Image src='http://fillmurray.com/200/300' size='small' rounded centered />
          <Card.Content>
            <Card.Header>
              Your Host
            </Card.Header>
            <Card.Content>
              Host: {this.state.host} 
            </Card.Content>
            <Card.Content>
              Date: {this.state.date} 
            </Card.Content> 
            <Card.Content>
              Time: {this.state.time} 
            </Card.Content>
            <Card.Content> 
              Theme: {this.state.theme} 
            </Card.Content>
            <Card.Content> 
              Street: {this.state.street} 
            </Card.Content>
            <Card.Content>    
              City: {this.state.city} 
            </Card.Content>
            <Card.Content>
              State: {this.state.state} 
            </Card.Content>
            <Card.Content>
              Zip: {this.state.zip} 
          </Card.Content>
          </Card.Content>
        </Card>
        <Card float='right'>
        Map
        </Card>
        </Card.Group>
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
