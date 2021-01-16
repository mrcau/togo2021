import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {firebaseApp} from './firebase';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const fireApp = new firebaseApp();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App fireApp={fireApp} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

