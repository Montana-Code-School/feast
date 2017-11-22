import React, { Component } from 'react';
// import { Link} from 'react-router-dom';
import axios from 'axios';
import { Button, Form} from 'semantic-ui-react';


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
      this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
      console.log(event.target.value);
      this.setState({[event.target.name]: event.target.value});
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
  // handleChangeEmail(event) {
  //   this.setState({newEmail: event.target.value});
  // }
  // handleChangePassword(event) {
  //   this.setState({newPassword: event.target.value});
  // }
  // handleChangeName(event) {
  //   this.setState({newName: event.target.value});
  // }
  handleSubmit(event) {
    event.preventDefault();
    var updateProfile = this.state;
    console.log (updateProfile)
    axios.put('/api/profiles/'+ this.props.match.params.id, {
          id: this.state.id,
          email: this.state.newEmail,
          password: this.state.newPassword,
          name: this.state.newName,
          street: this.state.newStreet,
          city: this.state.newCity,
          state: this.state.newState,
          zip: this.state.newZip,
          phone: this.state.newPhone,
          allergies: this.state.newAllergies

      
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
        <Form onSubmit={(e) => this.handleSubmit(e)}>
      <Form.Group unstackable widths={2}>
        <Form.Input label='Email' placeholder='Email' name="newEmail" onChange={this.handleChange}  value={this.state.newEmail}/>
        <Form.Input label='Password' placeholder='Password' name="newPassword" onChange={this.handleChange} value={this.state.newPassword}/>
      </Form.Group>
      <Form.Group unstackable widths={1}>
        <Form.Input label='Name' placeholder='Name' name="newName" onChange={this.handleChange} value={this.state.newName}/>
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Street' placeholder='Street' name="newStreet" onChange={this.handleChange} value={this.state.newStreet}/>
        <Form.Input label='City' placeholder='City' name="newCity" onChange={this.handleChange} value={this.state.newCity}/>
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='State' placeholder='State' name="newState" onChange={this.handleChange} value={this.state.newState}/>
        <Form.Input label='Zip' placeholder='Zip' name="newZip" onChange={this.handleChange} value={this.state.newZip}/>
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input label='Phone' placeholder='Phone' name="newPhone" onChange={this.handleChange} value={this.state.newPhone}/>
        <Form.Input label='Allergies' placeholder='Allergies' name="newAllergies" onChange={this.handleChange} value={this.state.newAllergies}/>
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  
       

      </div>
    );
  }
}

export default EditProfile;
