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
        {/* googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo&v=3.exp&libraries=geometry,drawing,places" */}
       
      </div>  
    );
  }  
}  

export default Map;