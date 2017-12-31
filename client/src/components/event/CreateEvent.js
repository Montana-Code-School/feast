import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Header, Grid, Dropdown, Checkbox} from 'semantic-ui-react';
//import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const options = [
  { key: 'appatizer', text: 'Appatizer', value: 'appatizer' },
  { key: 'salad', text: 'Salad', value: 'salad' },
  { key: 'soup', text: 'Soup', value: 'soup' },
  { key: 'entree', text: 'Entree', value: 'entree' },
  { key: 'dessert', text: 'Dessert', value: 'dessert' },
]


class CreateEvent extends Component {
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
        friends: [],
        friend: "",
        events:[],
        eventHost: {
          host: this.props.match.params.hid
        },
        eventId: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
     console.log(this.state.eventId)
    const createInvite = {
      eventId: this.state.eventId,
      inviteProfileId: event.target.value,
      inviteName: event.target.id
    }
    axios.post('/api/invites', createInvite)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
   


  }
  
  handleSubmit(event){     
    event.preventDefault();
    const createEvent = {
      host: this.state.host,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      time: this.state.time,
      date: this.state.date,
      theme: this.state.theme,
      profileId: this.props.match.params.hid
      
    };
    axios.put('/api/events/' + this.state.eventId, createEvent) 
    .then((response) => {
       console.log(response);
       this.props.history.push("/event/" + response.data.id)

    })
    .catch((error) => {
      console.log(error);
    });
    
  }
    componentWillMount() {
        axios.post('/api/events/', this.state.eventHost) 
      .then((response) => {
        this.setState({
          eventId: response.data.id
        })
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get('/api/profiles/' + this.props.match.params.hid + '?access_token=' + localStorage.getItem("feastAT"))
      .then((response) => {
        // console.log(response);
        this.setState({
          
          host: response.data.name,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          
        })
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get('/api/friends?filter[where][profileId][like]=' + this.props.match.params.hid)
      .then((response) => {
        // console.log(response);
        this.setState({
          friends: response.data
        })
        //console.log(this.state)

      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  render() {
     //console.log(this.state.friends)

    const friendsList = this.state.friends.map((friend) => {
      return(
        
        <Button id={friend.friendName}onClick={this.handleClick} color='purple' value={friend.friendId} key={friend.friendId}>{friend.friendName}</Button>
      )
    })
    return (
      <div>
        <Navbar />
       <Header
            as='h1'
            content='CREATE A FEAST'
            color='green'
            textAlign='center'
            style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={1}>
            <Form.Input label='Host'  name="host" onChange={this.handleChange} value={this.state.host} />
            <Form.Input label='Date' placeholder='Date' name="date" onChange={this.handleChange} />
            <Form.Input label='Time' placeholder='Time' name="time" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group unstackable widths={1}>
            <Form.Input label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} />
            <Form.Input label='Street'  name="street" onChange={this.handleChange} value={this.state.street}/>
            <Form.Input label='City'  name="city" onChange={this.handleChange} value={this.state.city}/>
            <Form.Input label='State'  name="state" onChange={this.handleChange} value={this.state.state}/>
            <Form.Input label='Zip'  name="zip" onChange={this.handleChange} value={this.state.zip}/>
          </Form.Group>
        
        <Grid columns={4} stackable divided>
          <Grid.Row> 
            <Grid.Column>
              <h4>Courses</h4>
              <Dropdown placeholder='Courses' fluid multiple selection options={options} />
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
              {/* <List selection onClick={this.handleClick}> */}
                {friendsList}
                {/* <Button color='teal'>Invite</Button>
              </List>  */}
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



export default CreateEvent;