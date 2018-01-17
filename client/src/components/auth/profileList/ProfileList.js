import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Form, Button, Card } from 'semantic-ui-react';
import './ProfileList.css';
import Navbar from '../../navbar/Navbar';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    friendEmail:'',
    friendId: '',
    friendName: '',
    friendAllergies: '',
    profileId: props.match.params.pid,
    friends: []
    };
    console.log(props.match.params.pid)
    this.handleChange = this.handleChange.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value,
    friendEmail: event.target.value     
    });
    // friendEmail = event.target.value;
  }
 
  handleClickLogout(event) {
    event.preventDefault();
    localStorage.removeItem('feastAT');
    this.props.history.push("/");
  };

  lookingForFriendId(response) {
    for(var i=0; i < this.state.friends.length; i++ ){
      if(response.data.id === this.state.friends[i].friendId){
      return true;
      }
    }
    return false;

  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get('/api/profileLists/findOne?filter[where][email]=' + this.state.friendEmail + '&access_token=' + localStorage.getItem("feastAT"))
    .then((response) => {
       console.log(response);
       var friendFound = this.lookingForFriendId(response);

        if(friendFound){
          alert("You have already added this friend") 
        } else if(response.data.id === this.state.profileId) {
          alert("You cannot add yourself as a friend")
        } else {


          this.setState({
            friendId: response.data.id,
            friendName: response.data.name,
            friendAllergies: response.data.allergies
          })
          
          const createFriendship = {
            profileId: this.props.match.params.pid,
            friendId: this.state.friendId,
            friendName: this.state.friendName,
            friendAllergies: this.state.friendAllergies
          }
    
          console.log(createFriendship);
    
          axios.post('/api/friends', createFriendship)
          .then((response) => {
            console.log(response);
            window.location = "/friends/list/" + this.props.match.params.pid;
           
            // this.props.history.push("/friends/list/" + this.props.match.params.pid)        
          })
          .catch((error) => {
           
            console.log(error);
          });
        }
    })
    .catch((error) => {
      console.log(error);
      alert("Friend Email Not Found")
    });
  }
  componentDidMount() {
    axios.get('/api/friends?filter[where][profileId][like]=' + this.props.match.params.pid)
      .then((response) => {
        //console.log(this.props.match.params.pid)
        console.log(response.data)
        this.setState({
          friends: response.data
        })
      })
      .catch((error) => {
        console.log(error);
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

    return (
      <div>
      <div id='friend-overlay'>
      </div>
      <div id='content'>
      <Navbar profileId={this.state.profileId} />

        <Header as='h1' textAlign='center'>
          FEASTS' SIGNATURE FRIEND FINDER
        </Header>
        
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Your Friends Email Address' placeholder='Email' name="email" onChange={this.handleChange} />
          </Form.Group>
          <Button color='teal'>Find Your Friends</Button>
        </Form>
        <Card>
          <Card.Content>
            <Card.Header>
              You've Added These Friends!
            </Card.Header>
          </Card.Content>
          <Card.Content>
            {friendsList}
          </Card.Content>
        </Card>  
      </div> 
    </div>  
    );
  }
}

export default ProfileList;