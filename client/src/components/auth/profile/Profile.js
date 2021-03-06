import React, { Component } from 'react';
import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Photo from '../photo/Photo';
import { Header, Button, Card, Icon } from 'semantic-ui-react';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';
import Navbar from '../../navbar/Navbar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
      profileListId: this.props.match.params.id
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleClickInvite = this.handleClickInvite.bind(this);
  }

  handleClickInvite(event) {
    const inviteRsvp = {
      id: event.target.dataset.invite,
      eventId: event.target.dataset.event,
      inviteProfileId: event.target.dataset.profile,
      inviteName: event.target.dataset.name,
      rsvp: event.target.name,
      hostName: event.target.dataset.host,
      theme: event.target.dataset.theme
    }

    axios.put('/api/invites/' + event.target.dataset.invite, inviteRsvp)
      .then((response) => {
        window.location = '/profile/' + this.props.match.params.id;
      })
      .catch((error) => {
      });
  }

  handleClickEvent(event) {
    event.preventDefault();
    this.props.history.push("/event/" + event.target.value + "/" + this.props.match.params.id)
  };

  componentWillMount() {
    if (localStorage.getItem("feastAT") !== null) {
      axios.get('/api/profileLists/' + this.props.match.params.id +'?access_token=' + localStorage.getItem("feastAT"))
        .then((response) => {
          this.setState({
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

    axios.get('/api/invites?filter[where][inviteProfileId][like]=' + this.props.match.params.id)
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
      return (
        <div key={event.id}>
        <Button onClick={this.handleClickEvent} name='event' value={event.id} key={event.id} color='purple'><Icon name='birthday'/>{event.theme}</Button>
      <br />
      <br />
      </div>
      )
    })

    const acceptedList = this.state.invites.map((accept) => {
      if (accept.rsvp === 'accepted') {
        var output = 
        <div key={accept.id}>
          <Link to={'/event/' + accept.eventId + "/" + this.props.match.params.id}><Button color='teal'>{accept.hostName + "'s " + accept.theme + " Event"}</Button></Link>
        </div>
      }
      return (
        output
      )
    })

    const inviteList = this.state.invites.map((invite) => {
      if (invite.rsvp === 'invited') {
        var output = <div key={invite.id}>
        <h4>{invite.theme}</h4>
        <Button.Group vertical>
        <Button onClick={this.handleClickInvite} name='accepted' data-event={invite.eventId} data-profile={invite.inviteProfileId} data-name={invite.inviteName} data-invite={invite.id} data-host={invite.hostName} data-theme={invite.theme} color='green'><Icon name='thumbs up'/>ACCEPT</Button>
        <Button.Or />
        <Button onClick={this.handleClickInvite} name='declined' data-event={invite.eventId} data-profile={invite.inviteProfileId} data-name={invite.inviteName} data-invite={invite.id} data-host={invite.hostName} data-theme={invite.theme} color='red'><Icon name='thumbs down'/>DECLINE</Button>
        </Button.Group>
      </div>
      }
        return (
          output
        )
    })

    return (
      <div>
        <div id="profile-overlay"></div>
        <Navbar profileId={this.props.match.params.id}/>
        <div id='content'>
        <Header
          as='h1'
          content='PROFILE'
          color='green'
          textAlign='center'
          style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        <div align='center'>
        <Button.Group>
          <Link to={"/event/create/" + this.props.match.params.id}><Button type='submit' color='purple'><Icon name='food'/>HOST A FEAST</Button></Link>
          <Button.Or />
          <Link to={"/profile/edit/" + this.props.match.params.id + '?access_token=' + localStorage.getItem("feastAT")}><Button color='teal'>EDIT YOUR PROFILE</Button></Link>
          <Button.Or />
          <Link to={"/friends/list/" + this.props.match.params.id}><Button color='teal'><Icon name='user plus'/>ADD FRIENDS</Button></Link>
        </Button.Group>
        </div>
        <br />
     <div className="container" align='center'> 
     <Card>
       <Card.Content> 
     <Photo SuperId = {this.state}/>  
      </Card.Content>
    </Card>  
    <br/>
    <br/>
     </div>
        <CardGroup itemsPerRow='5'>
          <Card>
            <Card.Content>
              <Card.Header>
                Profile
              </Card.Header>
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
          </Card>
          <Card>
            <Card.Content>
            <Card.Header>
            Your Friends
            </Card.Header>
            </Card.Content> 
            <Card.Content id='card'>                      
             {friendsList}
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
            <Card.Header>
              Your the Host of these Events!
            </Card.Header>
            </Card.Content> 
            <Card.Content> 
              {eventList}
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
            <Card.Header>
              RSVP to these Invites!
            </Card.Header>
            </Card.Content> 
            <Card.Content> 
              {inviteList}
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
            <Card.Header>
              Events You Are Attending! 
            </Card.Header>
            </Card.Content>
            <Card.Content>
            {acceptedList}
            </Card.Content>  
          </Card>     
        </CardGroup>
      </div>
      </div>
    );
  }
}

export default Profile;
