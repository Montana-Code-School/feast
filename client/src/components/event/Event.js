import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Event.css'
import { Header, Image, Grid, List, Button, Card } from 'semantic-ui-react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  // DirectionsRenderer
} from "react-google-maps";
import { 
  compose, 
  withProps, 
  // lifecycle 
} from "recompose";

// const google = window.google;
// const maps = google.maps;
// const DirectionsService = new google.maps.DirectionsService();

// https://www.google.com/maps/place/3028+W+Villard+St,+Bozeman,+MT+59718/@45.6832965,-111.0793269,17z/data=!3m1!4b1!4m13!1m7!3m6!1s0x534545b8cc0a0017:0x35e94083d209dad5!2s3028+W+Villard+St,+Bozeman,+MT+59718!3b1!8m2!3d45.6832965!4d-111.0771436!3m4!1s0x534545b8cc0a0017:0x35e94083d209dad5!8m2!3d45.6832965!4d-111.0771436

// coordinates for directions 45.8174, -110.8966

const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  // lifecycle
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 45.683, lng: -111.077 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 45.683, lng: -111.079 }} onClick={props.onMarkerClick} />}
    {/* {props.directions && <DirectionsRenderer directions={props.directions} />} */}
  </GoogleMap>
);

class Event extends Component {
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
      isMarkerShown: ""      
    };
    }

  componentDidMount() {
    this.delayedShowMarker()
    // DirectionsService.route({
    //   origin: new google.maps.LatLng(45.683, -111.079),
    //   destination: new google.maps.LatLng(45.8174, -110.8966),
    //   travelMode: google.maps.TravelMode.DRIVING,
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result,
    //     });
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  }
  
  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3)
  }
  
  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
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
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
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
        {/* googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo&v=3.exp&libraries=geometry,drawing,places" */}
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo&v=3.exp&libraries=geometry,drawing,places"
          isMarkerShown={this.state.isMarkerShown}
          // directions={this.state.directions}
          onMarkerClick={this.handleMarkerClick}
        />
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
              <h4>ALLERGIES</h4>
              import a list of allergies from the list of confirmed guests
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Link to={"/event/edit/" + this.props.match.params.eid}><Button type='submit' color='teal'>Edit</Button></Link>
      </div>
    );
  }
}

export default Event;
