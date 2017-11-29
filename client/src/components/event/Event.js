import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button} from 'semantic-ui-react';


class Event extends Component {
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
      theme: ""      
    };
    }
  componentWillMount() {
    axios.get('/api/events/' + this.props.match.params.eid)
    .then((response) => {
      console.log(response);
      this.setState({
        host: response.data.host,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zip: response.data.zip,
        time: response.data.time,
        date: response.data.date,
        theme: response.data.theme      
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {/* <Button type='submit'>JOIN IT</Button>
        <Link to={"/event/create/"+this.props.match.params.id}><Button type='submit'>MAKE IT</Button></Link> */}
        <h1>
          EVENT
        </h1>
        <p>
          HOST: {this.state.host} <br/>
          DATE: {this.state.date}<br/>
          TIME: {this.state.time}<br/>
          THEME: {this.state.theme}<br/>
          STREET: {this.state.street}<br/>
          CITY: {this.state.city}<br/>
          STATE: {this.state.state}<br/>
          ZIP: {this.state.zip}<br/>
        </p>
        <Link to={"/event/edit/" + this.props.match.params.eid}><Button>Edit</Button></Link>
      </div>
    );
  }
}

export default Event;
