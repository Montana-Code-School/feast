import React, { Component } from 'react';
// import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './photo';

import { Header, Image, Grid, Button, Message, Card } from 'semantic-ui-react';
import Navbar from '../../navbar/Navbar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProfile: [],
      email: "",
      password: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      allergies: "",
      friends: [],
      events: [],
      invites: []
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickInvite = this.handleClickInvite.bind(this);
  }

  handleClickInvite(event){
    const inviteRsvp = {
      id: event.target.dataset.invite,
      eventId: event.target.dataset.event,
      inviteProfileId: event.target.dataset.profile,
      inviteName: event.target.dataset.name,
      rsvp: event.target.name       
    }

    axios.put('/api/invites/' + event.target.dataset.invite, inviteRsvp)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {     
    });   
  }

  handleClickLogout(event) {
    event.preventDefault();
    localStorage.removeItem('feastAT');
    this.props.history.push("/");
  };

  handleClickEvent(event){
    event.preventDefault();
    this.props.history.push("/event/" + event.target.value)
  };


  componentWillMount() {
    if (localStorage.getItem("feastAT") !== null) {
      axios.get('/api/profiles/' + this.props.match.params.id + '?access_token=' + localStorage.getItem("feastAT"))
        .then((response) => {
          this.setState({
            email: response.data.email,
            password: response.data.password,
            name: response.data.name,
            street: response.data.street,
            city: response.data.city,
            state: response.data.state,
            zip: response.data.zip,
            phone: response.data.phone,
            allergies: response.data.allergies

          })
        })
        .catch((error) => {
          if (error.response.data.error.statusCode === 401) {
            this.props.history.push("/")
          }
        });
    }
    axios.get('/api/friends?filter[where][profileId][like]=' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          friends: response.data
        })
      })
      .catch((error) => {
        console.log(error);
    });

    axios.get('/api/events?filter[where][profileId][like]=' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          events: response.data
        })
    })
    .catch((error) => {
    });

    axios.get('/api/invites?filter[where][inviteProfileId][like]=' + this.props.match.params.id + '&filter[where][rsvp]=invited')
    .then((response) => {
      this.setState({
        invites: response.data
      })
    })
    .catch((error) => {
    });
  }

  render() {
    const friendsList = this.state.friends.map((friend) => {
      return (
        <div key={friend.id}>
          {friend.friendName}
        </div>
      )
    })

    const eventList = this.state.events.map((event) => {
      return(        
        <Button onClick={this.handleClickEvent} name='event' value={event.id} key={event.id} color='purple'>{event.theme}</Button>
      )
    })

    const inviteList = this.state.invites.map((invite) => {
      return( 
        <div key={invite.id}>
          <h4>{invite.eventId}</h4>       
          <Button onClick={this.handleClickInvite} name='accepted'  data-event={invite.eventId} data-profile={invite.inviteProfileId} data-name={invite.inviteName} data-invite={invite.id} color='yellow'>ACCEPT</Button>
          <Button onClick={this.handleClickInvite} name='delicned'  data-event={invite.eventId} data-profile={invite.inviteProfileId} data-name={invite.inviteName} data-invite={invite.id} color='yellow'>DECLINE</Button>
        </div>
      )
    })
    return (
      <div>
        <Navbar />
        {/* <div id="profile-overlay"></div> */}
        <Header
          as='h1'
          content='PROFILE'
          color='green'
          textAlign='center'
          style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        {/* {<Button.Group fluid>
          <Button type='submit' color='teal'>JOIN A FEAST</Button>
          <Button.Or /> */}
          <Link to={"/event/create/" + this.props.match.params.id}><Button type='submit' color='purple'>HOST A FEAST</Button></Link>
          <Link to={"/photo/Photo" +this.props.match.params.id}><Button color='teal'>Add Photo</Button></Link>
        {/* </Button.Group> */}
   
        <Grid
          textAlign='center'
        >
          <Grid.Column style={{ maxWidth: 180 }}>
            <Message>
              Add <a href=''>Image</a>
            </Message>
          </Grid.Column>
        </Grid>
        <Card>
          <Card.Content>
            <Card.Header>
              Profile
            </Card.Header>
            <Card.Content>
              Email: {this.state.email}
            </Card.Content>
            <Card.Content>
              Name: {this.state.name}
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
            <Card.Content>
              Phone: {this.state.phone}
            </Card.Content>
            <Card.Content>
              Allergies: {this.state.allergies}
            </Card.Content>
          </Card.Content>
        </Card>
        <Link to={"/profile/edit/" + this.props.match.params.id}><Button color='teal'>Edit</Button></Link>
        <Link to={"/friends/list/" +this.props.match.params.id}><Button color='teal'>Add Friends</Button></Link>
        <Button onClick={this.handleClickLogout} name='logout' color='teal'>Log Out</Button>
        {friendsList}
        <h4>Your the Host of these Events!</h4>
        {eventList}
        <h4>You Need to RSVP to these Invites!</h4>
        {inviteList}   
      </div>
    );
  }
}

export default Profile;
