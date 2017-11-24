import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Event.css';
import axios from 'axios';
import { Image, Button } from 'semantic-ui-react';


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      time: "",
      place: "",


    };
  }
  componentWillMount() {
    axios.get('/api/events/' + this.props.match.params.id)
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
      <div id='event-overlay'>
        <Image src='https://placeimg.com/640/480/people' size='medium' rounded centered />
        <Button type='submit'>JOIN IT</Button>
        <Link to={"/event/create/" + this.props.match.params.id}><Button type='submit'>MAKE IT</Button></Link>
        <h1>
          Profile
        </h1>
        <p>
          EMAIL: {this.state.email} <br />
          PASSWORD: {this.state.password}<br />
          NAME: {this.state.name}<br />
          STREET: {this.state.street}<br />
          CITY: {this.state.city}<br />
          STATE: {this.state.state}<br />
          ZIP: {this.state.zip}<br />
          PHONE: {this.state.phone}<br />
          ALLERGIES: {this.state.allergies}
        </p>
        <Link to={"/profile/edit/" + this.props.match.params.id}><Button>Edit</Button></Link>
      </div>
    );
  }
}

export default Event;
