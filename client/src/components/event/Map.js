import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
      super(props);
      this.state = {
        host: "",
        profileId: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        isMarkerShown: "",      
      };
    } 

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3)
  }

  render() {
    return (
      <div>       
      </div>  
    );
  }  
}  

export default Map;