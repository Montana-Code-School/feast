import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {Image} from 'cloudinary-react';

const CLOUDINARY_UPLOAD_PRESET = 'phhzubtc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mt-code-school/upload';
  
class Photo extends React.Component {
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
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>

      Hi 
      </div>
      );}}

    export default Photo;