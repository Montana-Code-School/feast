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
      photoId: props.SuperPhoto
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
      axios.put('/api/profiles/'+ this.props.SuperId + '?access_token=' + localStorage.getItem("feastAT"), {
        photoId: response.body.public_id
      })
      .then((response) => {
        // this.props.history.push("/profile/" + this.props.SuperId)  
        window.location = "profile"     
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
    render() {
        // const list = this.state.images.map((image, i) => {
        //     return (
        //         <li key = {i}>
        //           <img src = {image.secure_url} />
        //         </li>
        //     )
        // })
      if (this.state.photoId === ""){
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
      <img height="42" width="42" src = 'https://res.cloudinary.com/mt-code-school/image/upload/eroxvdu9re91s9v0qjrz.jpg'/>
      );


      }
    ;}}

    export default Photo;