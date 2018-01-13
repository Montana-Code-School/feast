import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Header, Grid, Dropdown, Checkbox} from 'semantic-ui-react';
//import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const options = [
  { key: 'appetizer', text: 'Appetizer', value: 'appetizer' },
  { key: 'salad', text: 'Salad', value: 'salad' },
  { key: 'soup', text: 'Soup', value: 'soup' },
  { key: 'entree', text: 'Entree', value: 'entree' },
  { key: 'dessert', text: 'Dessert', value: 'dessert' },
  { key: 'drinks', text: 'Drinks', value: 'drinks' }
]


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
      allergies: []
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCourses = this.handleChangeCourses.bind(this);
    this.handleChangeFriends = this.handleChangeFriends.bind(this);
  }

  // addName(idList) {
  //   var twoD = [];
  //   var f = this.state.friends;
  //   for (var i = 0; i < idList.length; i++) {
  //     var id = idList[i];

  //     for (var j = 0; j < f.length; j++) {
  //       var friendId = f[j].friendId;

  //       if (id === friendId) {
  //         var adding = [id,f[j].friendName,f[j].friendAllergies];
  //         twoD.push(adding);
  //         this.state.allergies.push(f[j].friendAllergies);
  //       }
  //     }
  //   }
  //   return twoD;
  // }

 

  handleChangeCourses(event,data) {
    this.setState({courses: data.value});
    console.log(this.state.courses);
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
      courses: this.state.courses,
      allergies: this.state.allergies
      
    };
    // var invite = this.addName(this.state.friendsInvite);
    //   console.log(invite);

    axios.put('/api/events/' + this.props.match.params.eid , editEvent) 
    .then((response) => {
      console.log(response);
      this.setState({
        eventId: response.data.id
      })

      console.log(this.state.friendsInvite);

      // for (var i = 0; i < invite.length; i++) {
        
      //   const createInvite = {
      //     eventId: this.state.eventId,
      //     inviteProfileId: invite[i][0],
      //     inviteName: invite[i][1],
      //     hostName: this.state.host,
      //     theme: this.state.theme
      //   }
      //   axios.post('/api/invites', createInvite)
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });      
      // }
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
          id: response.data.id
          
        })
        axios.get('/api/friends?filter[where][profileId][like]=' + response.data.id)
      .then((response) => {
        console.log(response);
        this.setState({
          friends: response.data
        })
        //console.log(this.state)

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

    const friendsList = this.state.friends.map((friend) => {
      return(
       {key: friend.friendId, text: friend.friendName, value: friend.friendId}
        // <Button id={friend.friendName}onClick={this.handleClick} color='purple' value={friend.friendId} key={friend.friendId}>{friend.friendName}</Button>
       
      )
    })
    return (
      <div>
        <Navbar profileId={this.state.profileId}/>
        <div id='content'>
        <Header
            as='h1'
            content='EDIT EVENT'
            color='green'
            textAlign='center'
            style={{ fontSize: '4em', fontWeight: 'bold' }}
        />
        </div>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={1}>
            <Form.Input type="text" label='Host'  name="host" onChange={this.handleChange} value={this.state.host} />
            <Form.Input type="date" label='Date' placeholder='Date' name="date" onChange={this.handleChange} value={this.state.date} />
            <Form.Input type ="time" label='Time' placeholder='Time' name="time" onChange={this.handleChange} value={this.state.time} />
          </Form.Group>
          <Form.Group unstackable widths={1}>
            <Form.Input type="text" label='Theme' placeholder='Theme' name="theme" onChange={this.handleChange} value={this.state.theme}/>
            <Form.Input type="text" label='Street'  name="street" onChange={this.handleChange} value={this.state.street}/>
            <Form.Input type="text" label='City'  name="city" onChange={this.handleChange} value={this.state.city}/>
            <Form.Input type="text" label='State'  name="state" onChange={this.handleChange} value={this.state.state}/>
            <Form.Input type="number" label='Zip'  name="zip" onChange={this.handleChange} value={this.state.zip}/>
          </Form.Group>
        
        <Grid columns={3} stackable divided>
          <Grid.Row> 
            <Grid.Column>
              <h4>Courses</h4>
              <Dropdown placeholder='Courses' fluid multiple selection options={options} onChange={this.handleChangeCourses} name='courses'/>
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
              <Dropdown placeholder='Friends' fluid multiple selection options={friendsList} onChange={this.handleChangeFriends} name='friends'/>

              {/* <List selection onClick={this.handleClick}> */}
                {/* {friendsList} */}
                {/* <Button color='teal'>Invite</Button>
              </List>  */}
            </Grid.Column>
            {/* <Grid.Column>
              <h4>Allergies</h4>
              {f[j].friendAllergies}
            </Grid.Column> */}
          </Grid.Row>
        </Grid><br/>      
         <Button type='submit' color='teal'>Submit</Button>
         </Form>
      </div>
    );
  }


}



export default EditEvent;
