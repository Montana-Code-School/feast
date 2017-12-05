import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { Header, Image, Grid, Message, Button, Form} from 'semantic-ui-react';


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
      <div background="teal" >
        <Header
        as='h1'
        content='EDIT PROFILE'
        color='green'
        textAlign='center'
        verticalAlign='middle'            
        style={{ fontSize: '4em', fontWeight: 'bold' }}
      />
        <Link to={"/profile/" + this.props.match.params.id}><Button color='teal'>Back</Button></Link>
        {/* We're gonna have to figure out how to import profile pic to the edit profile page  */}
        <Image src='http://fillmurray.com/200/300' size='small' rounded centered/>
        <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 180 }}>
        <Message>
          Edit <a href=''>Image</a>
        </Message>
        </Grid.Column>
    </Grid><br/>
    <div className='text'>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
      <Form.Group unstackable widths={1}>
        <Form.Input label='Email' name="newEmail" onChange={this.handleChange}  value={this.state.newEmail}/>
        <Form.Input label='Password' name="newPassword" onChange={this.handleChange} value={this.state.newPassword}/>
        <Form.Input label='Name' name="newName" onChange={this.handleChange} value={this.state.newName}/>
      </Form.Group>
      <Form.Group widths={1}>
        <Form.Input label='Street' name="newStreet" onChange={this.handleChange} value={this.state.newStreet}/>
        <Form.Input label='City' name="newCity" onChange={this.handleChange} value={this.state.newCity}/>
        <Form.Input label='State' name="newState" onChange={this.handleChange} value={this.state.newState}/>
      </Form.Group>
      <Form.Group widths={1}>
        <Form.Input label='Zip' name="newZip" onChange={this.handleChange} value={this.state.newZip}/>
        <Form.Input label='Phone' name="newPhone" onChange={this.handleChange} value={this.state.newPhone}/>
        <Form.Input label='Allergies' name="newAllergies" onChange={this.handleChange} value={this.state.newAllergies}/>
      </Form.Group><br />
      <Button type='submit' color='teal'>Submit</Button>
    </Form>
    </div>
    </div>
    );
  }
}

export default EditProfile;
