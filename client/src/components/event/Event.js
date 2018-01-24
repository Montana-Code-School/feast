import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Event.css';
import { Header, Image, Grid, List, Button, Card, Icon } from 'semantic-ui-react';
import './Map.js';
import {
  // withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {
  compose,
  withProps
} from "recompose";
import Navbar from '../navbar/Navbar';
import party from './party.jpg';
import two from './two.jpg';
import Photo from '../auth/photo/Photo';
// import { geocodeByAddress} from 'react-places-autocomplete'
// import PlacesAutocomplete from 'react-places-autocomplete'
// https://www.google.com/maps/place/3028+W+Villard+St,+Bozeman,+MT+59718/@45.6832965,-111.0793269,17z/data=!3m1!4b1!4m13!1m7!3m6!1s0x534545b8cc0a0017:0x35e94083d209dad5!2s3028+W+Villard+St,+Bozeman,+MT+59718!3b1!8m2!3d45.6832965!4d-111.0771436!3m4!1s0x534545b8cc0a0017:0x35e94083d209dad5!8m2!3d45.6832965!4d-111.0771436
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
      isMarkerShown: "",
      invites: [],
      allergies: [],
      courses: [],
      dishes: [],
      lat: "",
      lng: "",
      photoId: "",
      profileListId: this.props.match.params.id, 
      userModel: { name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      allergies: "",
      friends: [],
      events: [],
      invites: [],
      photoId: "",
      profileId: "",
      profileListId: this.props.match.params.id}
      };
    }
  componentDidMount() {
    this.delayedShowMarker()
  }
  allergiesornot(){
    var r = this.state.allergies.filter(function(entry) {return entry.trim() !== '';})
    // console.log(r)
    if(r.length !== 0){
      return r;
    }else{
      return ['No Allergies'];
    }
  }
  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 30)
  }
  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }
  componentWillMount() {
    axios.get('/api/events/' + this.props.match.params.eid)
    .then((response) => {
      console.log(response)
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
        courses: response.data.courses,
        lat: response.data.lat,
        lng: response.data.lng,
        photoId: response.data.photoId,
      })
      if (localStorage.getItem("feastAT") !== null) {
        axios.get('/api/profileLists/' + response.data.profileId +'?access_token=' + localStorage.getItem("feastAT"))
          .then((response) => {
            // console.log(response)
            this.setState({
              userModel:{
                email: response.data.email,
                name: response.data.name,
                street: response.data.street,
                city: response.data.city,
                state: response.data.state,
                zip: response.data.zip,
                phone: response.data.phone,
                allergies: response.data.allergies,
                photoId: response.data.photoId,
                profileId: response.data.profileId
              }
            })
          })
          .catch((error) => {
            if (error.response.data.error.statusCode === 401) {
              this.props.history.push("/")
            }
          });
      }
      // geocodeByAddress(response.data.street + response.data.city + response.data.state)
      // .then((results) => {
      //   console.log(results)
      //   this.setState({
      //     lat: (results[0].geometry.viewport.f.f + results[0].geometry.viewport.f.b)/2,
      //     lng: (results[0].geometry.viewport.b.b + results[0].geometry.viewport.b.f)/2,
      //     place: results[0].place_id,
      //     location: results[0].geometry.location
      //   })
      // })
      // .catch(error => console.error('Error', error))
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get('/api/invites?filter[where][eventId][like]=' + this.props.match.params.eid )
    .then((response) => {
      // console.log(response);
      this.setState({
      invites: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get('/api/dishes?filter[where][eventId][like]=' + this.props.match.params.eid )
    .then((response) => {
      // console.log(response);
      this.setState({
      dishes: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
  invitedPeople(status){
    var people = this.state.invites;
    var peoplelist = [];
    for (var i = 0; i < people.length; i++) {
      var person = people[i];
      if(person.rsvp.includes(status.substring(0, 2))){
        peoplelist.push(person.inviteName);
      }
    }
    return peoplelist;
  }
  render() {
    console.log(this.state)
    var accept = this.invitedPeople('accepted').map((invite) => {
      return(
        <div key={invite}>
          {invite}
        </div>
      )
    });
    var decline = this.invitedPeople('declined').map((invite) => {
      return(
        <div key={invite}>
          {invite}
        </div>
      )
    });
    const MyMapComponent = compose(
      withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `575px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      // withScriptjs,
      withGoogleMap,
    )((props) =>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }}
      >
        <Marker position={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }} onClick={props.onMarkerClick} />
      </GoogleMap>
    );
    const dishesList = this.state.dishes.map((dish) => {
      return(
        <div key={dish.id}>
          {dish.name.toUpperCase()}
          <br/>
          <br/>
        </div>
      )
    })
    const allergyList = this.allergiesornot().map((a) => {
      return(
        <div key={a}>
          {a}
        </div>
      )
    })
    const coursesList = this.state.courses.map((course) => {
      return(
        <div key={course}> 
          {course.toUpperCase()} <Link to={"/event/courses/" + course + "/" + this.props.match.params.eid + "/" + this.props.match.params.pid}><Button color='teal'><Icon name='cocktail'/>Add {course}</Button></Link>
          <br/>
          <br/>
        </div>
      )
    })
    // console.log(this.state.allergies)
    return (
      <div>
        <div id='event-overlay'>
        </div>
        <Navbar profileId={this.props.match.params.pid}/>
        <div id='content'>
        <Header
        as='h1'
        content='WELCOME TO THE FEAST'
        textAlign='center'
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
        <Card.Group itemsPerRow={3}>
        <Card>
        <Card.Content>
        <div className="container" align='center'>  
        <Photo SuperId = {this.state.userModel}/>
        </div>
        </Card.Content>
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
        <Card>
        <Card.Content>
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo&v=3.exp&libraries=geometry,drawing,places"
          isMarkerShown={true}
          onMarkerClick={this.handleMarkerClick}
        />
        </Card.Content>
        </Card>
          <Card>
          <Card.Content>
            <Image src={party}/>
          </Card.Content>
          <Card.Content>
            <Image src={two}/>
          </Card.Content>
          </Card>
        </Card.Group>
        </div>
        <div id='grid'>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <List>
                <List.Item>
                <Card>
                  <Card.Content>
                  <h4>COURSES</h4>
                  </Card.Content>
                    <Card.Content>
                  {coursesList}
                    </Card.Content>
                  </Card>
                  <Card>
                    <Card.Content>
                  {dishesList}
                    </Card.Content>
                  </Card>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
              <h4>GUESTS</h4>
                </Card.Content>
                <Card.Content>
                  We're Coming To The FEAST
                </Card.Content>
                <Card.Content>
                  {accept}
                </Card.Content>
                <Card.Content>
                  We Can Not Make It To The FEAST
                </Card.Content>
                <Card.Content>
                  {decline}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
              <Card.Content>
              <h4>ALLERGIES</h4>
              </Card.Content>
              <Card.Content>
              {allergyList}
              </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
        <Link to={"/event/edit/" + this.props.match.params.eid + "/" + this.props.match.params.pid}><Button color='black' fluid>Click Here To Edit Your Event</Button></Link>
        <br/>
      </div>
      </div>
    );
  }
}
export default Event;
