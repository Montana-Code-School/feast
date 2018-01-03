import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {Image} from 'cloudinary-react';

const CLOUDINARY_UPLOAD_PRESET = 'phhzubtc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mt-code-school/upload';
  
class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
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
      
      return(
      <div>
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}>
        <p>Click here to add your profile photo</p>
      </Dropzone>
      {/* <br/>
      <Image publicId= 'mpqcxf82bceyzcyhqbuq.jpg' >
      </Image> */}
      <img src = 'https://res.cloudinary.com/mt-code-school/image/upload/mpqcxf82bceyzcyhqbuq.jpg'/>
        
    </div>
      );}}

    export default Photo;