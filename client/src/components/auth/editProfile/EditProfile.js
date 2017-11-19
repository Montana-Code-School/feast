import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button} from 'semantic-ui-react';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProfile: [],
        newEmail: "",
        newPassword: "",
        newName: "",
        newStreet:"",
        newCity:"",
        newState: "",
        newZip:"",
        newPhone:"",
        newAllergies:""
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  componentWillMount() {
    axios.get('/api/profiles/' + this.props.match.params.id)
    .then((response) => {
      // console.log(response);
      this.setState({
        newEmail: response.data.email, 
        newPassword: response.data.password,
        newName: response.data.name,
        newStreet: response.data.street,
        newCity: response.data.city,
        newState: response.data.state,
        newZip: response.data.zip,
        newPhone: response.data.phone,
        newAllergies: response.data.allergies
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
  handleChangeEmail(event) {
    this.setState({newEmail: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({newPassword: event.target.value});
  }
  handleChangeName(event) {
    this.setState({newName: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    var updateProfile = this.state;
    console.log (updateProfile)
    axios.put('/api/profiles/'+ this.props.match.params.id, {
          id: this.state.id,
          email: this.state.newEmail,
          password: this.state.newPassword,
          name: this.state.newName
      
    })
    .then((response) => {
      // updateProfile.push(response.data);          
      console.log(response.data);
      console.log(this.props.history);
      this.setState({
        newProfile: updateProfile
      })
     this.props.history.push("/profile/" + response.data.id)  
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>
          Profile
        </h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          EMAIL:<br/>
          <input type="text" onChange={this.handleChangeEmail} value={this.state.newEmail}/><br/>
          PASSWORD:<br/>
          <input type="text" onChange={this.handleChangePassword} value={this.state.newPassword}/><br/>
          NAME:<br/>
          <input type="text" onChange={this.handleChangeName} value={this.state.newName}/><br/>
          {/* EMAIL:<br/>
          <input type="text" onChange={this.handleChangeEmail} value={this.state.newEmail}/><br/>
          EMAIL:<br/>
          <input type="text" onChange={this.handleChangeEmail} value={this.state.newEmail}/><br/>
          EMAIL:<br/>
          <input type="text" onChange={this.handleChangeEmail} value={this.state.newEmail}/><br/> */}
         <Button type='submit'>Submit</Button>

        </form>
        <p>
          {/* EMAIL: {this.state.email} <br/>
          PASSWORD: {this.state.password}<br/>
          NAME: {this.state.name}<br/>
          STREET: {this.state.street}<br/>
          CITY: {this.state.city}<br/>
          STATE: {this.state.state}<br/>
          ZIP: {this.state.zip}<br/>
          PHONE: {this.state.phone}<br/>
          ALLERGIES: {this.state.allergies} */}
        </p>

      </div>
    );
  }
}

export default EditProfile;
