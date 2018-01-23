import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Header, Grid, Dropdown } from 'semantic-ui-react';
import Navbar from '../navbar/Navbar';
import './EditEvent.css';
import { geocodeByAddress} from 'react-places-autocomplete'

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
      friendsInvite: [],
      allergies: [],
      allCourses: ["appetizer", "salad", "soup", "entree", "dessert", "drinks"],
      newCourse: [],
      profileListId: "",
      profileId: "",
      lat: "",
      lng: "",
      deleteInvites: ""
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCourses = this.handleChangeCourses.bind(this);
    this.handleChangeFriends = this.handleChangeFriends.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  addName(idList) {
    var twoD = [];
    var f = this.state.friends;
    for (var i = 0; i < idList.length; i++) {
      var id = idList[i];
      for (var j = 0; j < f.length; j++) {
        var friendId = f[j].friendId;
        if (id === friendId) {
          var adding = [id,f[j].friendName,f[j].friendAllergies];
          twoD.push(adding);
          this.state.allergies.push(f[j].friendAllergies);
        }
      }
    }
    return twoD;
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
        {key: child.friendId, text: child.friendName.charAt(0).toUpperCase() + child.friendName.slice(1), value: child.friendId }
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

  handleClickDelete(event) {
    event.preventDefault();
    axios.delete('/api/events/' + this.state.id + '?access_token=' + localStorage.getItem("feastAT"))
      .then((response) => {
        console.log(response)

        // axios.delete('/api/invites?filter[where][eventId][like]=' + this.state.id + '&access_token=' + localStorage.getItem("feastAT")) 
        // .then((response) => {
        //   console.log(response)
        //   this.props.history.push("/profile/" + this.state.profileId)
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

        axios.get('/api/invites?filter[where][eventId][like]=' + this.state.id + '&access_token=' + localStorage.getItem("feastAT")) 
        .then((response) => {
          console.log(response.data[0].id)
         for (var i = 0; i < response.data.length; i++) {
            axios.delete('/api/invites/' + response.data[i].id + '?access_token=' + localStorage.getItem("feastAT")) 
              .then((response) => {
                console.log(response)
                // this.props.history.push("/profile/" + this.state.profileId)
              })
              .catch((error) => {
                console.log(error);
              });
         }

        })
        .catch((error) => {
          console.log(error);
        });


        this.props.history.push("/profile/" + this.state.profileId)
      })
      .catch((error) => {
        console.log(error);
      });
   
  };

  handleChangeCourses(event,data) {
    this.setState({newCourses: data.value});  
  }

  handleChangeFriends(event,data) {
    this.setState({friendsInvite: data.value});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){     
    event.preventDefault();
    geocodeByAddress(this.state.street + this.state.city + this.state.state)
      .then((results) => { 
        var finalCourses = []
        if(this.state.newCourses === undefined) {
          finalCourses = this.state.courses
        } else {
          finalCourses = this.state.courses.concat(this.state.newCourses)
        }
        
        const editEvent = {
          host: this.state.host,
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          time: this.state.time,
          date: this.state.date,
          theme: this.state.theme,
          courses: finalCourses,
          allergies: this.state.allergies,
          profileListId: this.state.profileListId,
          profileId: this.state.profileId,
          id: this.state.id,
          lat: (results[0].geometry.viewport.f.f + results[0].geometry.viewport.f.b)/2,
          lng: (results[0].geometry.viewport.b.b + results[0].geometry.viewport.b.f)/2      
        };
        var invite = this.addName(this.state.friendsInvite);

        axios.put('/api/events/' + this.props.match.params.eid , editEvent) 
        .then((response) => {
          this.setState({
            eventId: response.data.id
          })

          for (var i = 0; i < invite.length; i++) {  
            const createInvite = {
              eventId: this.state.eventId,
              inviteProfileId: invite[i][0],
              inviteName: invite[i][1],
              hostName: this.state.host,
              theme: this.state.theme
            }
            axios.post('/api/invites', createInvite)
            .then((response) => {
            })
            .catch((error) => {
              console.log(error);
            });      
          }
          this.props.history.push("/event/" + this.props.match.params.eid)
        })
        .catch((error) => {
          console.log(error);
          alert("Theme is a required field")
        });
    })    
  }

    componentWillMount() {
      axios.get('/api/events/' + this.props.match.params.eid + '?access_token=' + localStorage.getItem("feastAT"))
      .then((response) => {
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
          profileListId: response.data.profileListId,
          profileId: response.data.profileId,
          lat: response.data.lat,
          lng: response.data.lng,
          allergies: response.data.allergies          
        })
        axios.get('/api/friends?filter[where][profileId][like]=' + response.data.profileListId)
        .then((response) => {
          this.setState({
            friends: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
        axios.get('/api/invites?filter[where][eventId][like]=' + this.props.match.params.eid)
        .then((response) => {
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
         <Button onClick={this.handleClickDelete} type='submit' color='teal'>Delete Event</Button>

      </div>
      </div>
    );
  }
}

export default EditEvent;
