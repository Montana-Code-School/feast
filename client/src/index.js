import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {Image} from 'cloudinary-react';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
