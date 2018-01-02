import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Header, Image, Grid, List, Button, Card } from 'semantic-ui-react';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
//   // DirectionsRenderer
// } from "react-google-maps";
// import { 
//   compose, 
//   withProps 
//   // lifecycle 
// } from "recompose";
 
  // const MyMapComponent = compose(
  //   withProps({
  //     loadingElement: <div style={{ height: `100%` }} />,
  //     containerElement: <div style={{ height: `400px` }} />,
  //     mapElement: <div style={{ height: `100%` }} />,
  //   }),
  //   withScriptjs,
  //   withGoogleMap,
  //   // lifecycle
  // )((props) =>
  //   <GoogleMap
  //     defaultZoom={15}
  //     defaultCenter={{ lat: 45.683, lng: -111.077 }}
  //   >
  //     {props.isMarkerShown && <Marker position={{ lat: 45.683, lng: -111.079 }} onClick={props.onMarkerClick} />}
  //     {/* {props.directions && <DirectionsRenderer directions={props.directions} />} */}
  //   </GoogleMap>
  // );

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
    // DirectionsService.route({
    //   origin: new google.maps.LatLng(45.683, -111.079),
    //   destination: new google.maps.LatLng(45.8174, -110.8966),
    //   travelMode: google.maps.TravelMode.DRIVING,
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result,
    //     });
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div>
        {/* googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo&v=3.exp&libraries=geometry,drawing,places" */}
        {/* <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9PiSbLBtc_elQvDoxHFs-MeFceId1abo&v=3.exp&libraries=geometry,drawing,places"
          isMarkerShown={this.state.isMarkerShown}
          // directions={this.state.directions}
          onMarkerClick={this.handleMarkerClick}
        /> */}
      </div>  
    );
  }  
}  

export default Map;