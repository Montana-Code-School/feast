import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button} from 'semantic-ui-react';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProfile: [],
        email: "",
        password: "",
        name: "",
        street:"",
        city:"",
        state: "",
        zip:"",
        phone:"",
        allergies:""
      
    };
    }
  componentWillMount() {
    axios.get('/api/profiles/' + this.props.match.params.id)
    .then((response) => {
      console.log(response);
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
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Button type='submit'>JOIN IT</Button>
        <Button type='submit'>MAKE IT</Button>
        <h1>
          Profile
        </h1>
        <p>
          EMAIL: {this.state.email} <br/>
          PASSWORD: {this.state.password}<br/>
          NAME: {this.state.name}<br/>
          STREET: {this.state.street}<br/>
          CITY: {this.state.city}<br/>
          STATE: {this.state.state}<br/>
          ZIP: {this.state.zip}<br/>
          PHONE: {this.state.phone}<br/>
          ALLERGIES: {this.state.allergies}
        </p>
        <Link to={"/editProfile/" + this.props.match.params.id}><Button>Edit</Button></Link>
      </div>
    );
  }
}

export default Profile;
