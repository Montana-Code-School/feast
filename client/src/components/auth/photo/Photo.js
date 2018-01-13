import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {Image} from 'cloudinary-react';

const CLOUDINARY_UPLOAD_PRESET = 'phhzubtc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mt-code-school/upload';
  
class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
<<<<<<< HEAD
      photoId: props.SuperPhoto,
      profileId: props.SuperId
=======
      photoId: "",
      email: '',
      password: '',
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      allergies: ''
          
>>>>>>> 70da80b1fd23ca61c2cf9289e015ca0c682d268d
    };
    console.log(props)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
     .field('file', file);

    upload.end((err, response) => {
      console.log(response.body.public_id)
      /////
<<<<<<< HEAD
      axios.put('/api/profiles/'+ this.state.profileId+ '?access_token=' + localStorage.getItem("feastAT"), {
        photoId: response.body.public_id
      })
      .then((response) => {
        // this.props.history.push("/profile/" + this.props.SuperId)  
        window.location = '/profile/' + this.state.profileId;
=======
      console.log(this.state);
      axios.put('/api/profiles/'+ this.props.SuperId + '?access_token=' + localStorage.getItem("feastAT"), {
        photoId: response.body.public_id,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        phone: this.state.phone,
        allergies: this.state.allergies
          
      })
      .then((response) => {
        // this.props.history.push("/profile/" + this.props.SuperId)  
        window.location = "/profile/" + this.props.SuperId    
>>>>>>> 70da80b1fd23ca61c2cf9289e015ca0c682d268d
      })
      .catch((error) => {
        console.log(error);
      });
      /////
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  componentWillMount() {
    if (localStorage.getItem("feastAT") !== null) {
      axios.get('/api/profiles/' + this.props.SuperId + '?access_token=' + localStorage.getItem("feastAT"))
        .then((response) => {
          this.setState({
            email: response.data.email,
            password: response.data.password,
            name: response.data.name,
            photoId: response.data.photoId,
            street: response.data.street,
            city: response.data.city,
            state: response.data.state,
            zip: response.data.zip,
            phone: response.data.phone,
            allergies: response.data.allergies
          
          })
        })
        .catch((error) => {
          if (error.response.data.error.statusCode === 401) {
            this.props.history.push("/")
          }
        });
    }
  }
    render() {
      var pic = 'https://res.cloudinary.com/mt-code-school/image/upload/' + this.state.photoId + '.jpg';
        console.log(this.state.photoId)
        if (typeof(this.state.photoId) === "undefined" || this.state.photoId === '') {
        return(
          <div>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Click here to add your profile photo</p>
          </Dropzone>
          <br/>
         
            
        </div>
          )
      }else{
        return(
        <img height="42" width="42" src = {pic}/>
        // <img height="42" width="42" src = {`'https://res.cloudinary.com/mt-code-school/image/upload/${this.state.photoId}.jpg'`}/>

      // <img height="42" width="42" src = 'https://res.cloudinary.com/mt-code-school/image/upload/eroxvdu9re91s9v0qjrz.jpg'/>
      //  <img height="42" width="42" src = 'https://res.cloudinary.com/mt-code-school/image/upload/eroxvdu9re91s9v0qjrz.jpg'/>

      );


      }
    ;}}

    export default Photo;