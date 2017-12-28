import React, { Component } from 'react';
// import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Image, Grid, Button, Message, Card} from 'semantic-ui-react';


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
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event){
    if (event.target.name === 'logout') {
      event.preventDefault();
      localStorage.removeItem('feastAT');
      this.props.history.push("/");
      console.log(event.target.name); 
    } 

    if (event.target.name === 'event') {
      event.preventDefault();
      // console.log(event.target.value);
      this.props.history.push("/event/" + event.target.value)
    }

    if (event.target.name === '1' || event.target.name === '2') {
      // event.preventDefault();
      // console.log(event.target.dataset.event)
      const inviteRsvp = {
        id: event.target.dataset.invite,
        eventId: event.target.dataset.event,
        inviteProfileId: event.target.dataset.profile,
        inviteName: event.target.dataset.name,
        rsvp: event.target.name
        
      }

      axios.put('/api/invites/' + event.target.dataset.invite, inviteRsvp)
      .then((response) => {
        // this.setState({
        //   rsvp: true
        // })
        console.log(response)
      })
      .catch((error) => {
        
      });
    }
    
    
    
    
  };

  componentWillMount() {
    if(localStorage.getItem("feastAT") !== null){
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
        // console.log(response)
      })
      .catch((error) => {
        if(error.response.data.error.statusCode === 401){
          this.props.history.push("/")          
        }
      });

   
    }
    
      axios.get('/api/friends?filter[where][profileId][like]=' + this.props.match.params.id)
      .then((response) => {
        // console.log(response.data);
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
        // console.log(response)
      })
      .catch((error) => {
        
      });

      axios.get('/api/invites?filter[where][inviteProfileId][like]=' + this.props.match.params.id + '&filter[where][rsvp]=0')
      .then((response) => {
        this.setState({
          invites: response.data
        })
         console.log(response)
      })
      .catch((error) => {
        
      });

      


  }

  render() {
    const friendsList = this.state.friends.map((friend) => {
      return(
        <div key={friend.id}> 
          {friend.friendName} 
        </div>
      )
    })

    const eventList = this.state.events.map((event) => {
      return(
        // <List.Item key={event.id} content={event.theme} onClick={this.handleClick} name='event' />
        
        <Button onClick={this.handleClick} name='event' value={event.id} key={event.id} color='purple'>{event.theme}</Button>
        
      )
    })

    const inviteList = this.state.invites.map((invite) => {
      return( 
        <div key={invite.id}>
          <h4>{invite.eventId}</h4>       
          <Button onClick={this.handleClick} name='1'  data-event={invite.eventId} data-profile={invite.inviteProfileId} data-name={invite.inviteName} data-invite={invite.id} color='yellow'>ACCEPT</Button>
          <Button onClick={this.handleClick} name='2'  data-event={invite.eventId} data-profile={invite.inviteProfileId} data-name={invite.inviteName} data-invite={invite.id} color='yellow'>DECLINE</Button>
        </div>
      )
    })
    return (
      <div>
        {/* <div id="profile-overlay"></div> */}
        <Header
        as='h1'
        content='PROFILE'
        color='green'
        textAlign='center'
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
        <Button.Group fluid>
          <Button type='submit' color='teal'>JOIN A FEAST</Button>
          <Button.Or />
          <Link to={"/event/create/" + this.props.match.params.id}><Button type='submit' color='purple'>HOST A FEAST</Button></Link>
        </Button.Group>
        <Image src='http://fillmurray.com/200/300' size='small' rounded centered />
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
        <Button onClick={this.handleClick} name='logout' color='teal'>Log Out</Button>
        
        {friendsList}

        <h4>Your the Host of these Events!</h4>
        {/* <List selection items={eventList} >
          {eventList}
        </List>  */}
        {eventList}

        <h4>You Need to RSVP to these Invites!</h4>

        {inviteList}

            
        
      </div>
    );
  }
}

export default Profile;
