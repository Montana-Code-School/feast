import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Header, Grid, Dropdown } from 'semantic-ui-react';
import Navbar from '../navbar/Navbar';
import './EditEvent.css';

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      host: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      theme: '',
      courses: [],
      dishes: '',
      id: '',
      friends: [],
      friendsInvited: [],
      allergies: [],
      allCourses: ["appetizer", "salad", "soup", "entree", "dessert", "drinks"],
      newCourse: [],
      profileListId: "",
      profileId: ""
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCourses = this.handleChangeCourses.bind(this);
    this.handleChangeFriends = this.handleChangeFriends.bind(this);
  }

  checkFriend (friend) {
    for ( var j = 0; j < this.state.friendsInvited.length; j++) {
      var friendInvitedId = this.state.friendsInvited[j].inviteProfileId;
      if (friendInvitedId === friend) {
        return true;
      }
     }
     return false;
  }

  getfriends() {
    var newFriendsInvite = [];
    for (var i = 0; i < this.state.friends.length; i++) {
      var friendId = this.state.friends[i].friendId;
      var test = this.checkFriend(friendId);
      if (!test) {
        newFriendsInvite.push(this.state.friends[i])
      }

    }

    var options = newFriendsInvite.map((child) => {
      return (
        {key: child.friendName, text: child.friendName.charAt(0).toUpperCase() + child.friendName.slice(1), value: child.friendName }
      )
    })
    return options;
  }

  getCourses(courses) {
    var newCourses = [];
    for (var i = 0; i < this.state.allCourses.length; i++) {
      if (courses.indexOf(this.state.allCourses[i]) === -1) {
        newCourses.push(this.state.allCourses[i])
      }
    }
    var options = newCourses.map((child) => {
      return (
        {key: child, text: child.charAt(0).toUpperCase() + child.slice(1), value: child }
      )
    })
    return options;
  }

  handleChangeCourses(event,data) {
    this.setState({newCourses: data.value});
    
  }

  handleChangeFriends(event,data) {
    console.log(data.text)
    this.setState({friendsInvite: data.value});
    console.log(this.state.friendsInvite);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleSubmit(event){     
    event.preventDefault();
    
    const editEvent = {
      host: this.state.host,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      time: this.state.time,
      date: this.state.date,
      theme: this.state.theme,
      courses: this.state.courses.concat(this.state.newCourses),
      allergies: this.state.allergies
      
    };

    axios.put('/api/events/' + this.props.match.params.eid , editEvent) 
    .then((response) => {
      console.log(response);
      this.setState({
        eventId: response.data.id
      })

       this.props.history.push("/event/" + response.data.id)
    })
    .catch((error) => {
      console.log(error);
      alert("Theme is a required field")
    });   
  }
    componentWillMount() {
   
      axios.get('/api/events/' + this.props.match.params.eid + '?access_token=' + localStorage.getItem("feastAT"))
      .then((response) => {
        console.log(response);
        this.setState({
          date: response.data.date,
          host: response.data.host,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          theme: response.data.theme,
          courses: response.data.courses,
          dishes: response.data.dishes,
          id: response.data.id,
          profileListId: response.data.profileIdList,
          profileId: response.data.profileId          
        })
        axios.get('/api/friends?filter[where][profileId][like]=' + response.data.profileListId)
        .then((response) => {
          console.log(response);
          this.setState({
            friends: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
        axios.get('/api/invites?filter[where][eventId][like]=' + this.props.match.params.eid)
        .then((response) => {
          console.log(response);
          this.setState({
            friendsInvited: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });

      
  }
  

  render() {
    console.log(this.state)
    const options = this.getCourses(this.state.courses)
    const friends = this.getfriends()

    return (
      <div>
      <div id='editEvent-overlay'></div>
        <Navbar profileId={this.state.profileId}/>
        <div id='content'>
        <Header
            as='h1'
            content='EDIT EVENT'
            color='green'
            textAlign='center'
            style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={3}>
            <Form.Input type="text" label='Host'  name="host" onChange={this.handleChange} value={this.state.host} />
            <Form.Input type="date" label='Date' placeholder='Date' name="date" onChange={this.handleChange} value={this.state.date} />
            <Form.Input type ="time" label='Time' placeholder='Time' name="time" onChange={this.handleChange} value={this.state.time} />
          </Form.Group>
          <Form.Group unstackable widths={5}>
            <Form.Input type="text" label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} value={this.state.theme}/>
            <Form.Input type="text" label='Street'  name="street" onChange={this.handleChange} value={this.state.street}/>
            <Form.Input type="text" label='City'  name="city" onChange={this.handleChange} value={this.state.city}/>
            <Form.Input type="text" label='State'  name="state" onChange={this.handleChange} value={this.state.state}/>
            <Form.Input type="number" label='Zip'  name="zip" onChange={this.handleChange} value={this.state.zip}/>
          </Form.Group>
        
        <Grid columns={2} stackable divided>
          <Grid.Row> 
            <Grid.Column>
              <h4>Courses</h4>
              <Dropdown placeholder='Courses' fluid multiple selection options={options} onChange={this.handleChangeCourses} name='courses'/>
            </Grid.Column>
            <Grid.Column>
              <h4>Invite Your Friends!</h4>
              <Dropdown placeholder='Friends' fluid multiple selection options={friends} onChange={this.handleChangeFriends} name='friends'/>
            </Grid.Column>
          </Grid.Row>
        </Grid><br/>      
         <Button type='submit' color='teal'>Submit</Button>
         </Form>
      </div>
      </div>
    );
  }


}



export default EditEvent;
