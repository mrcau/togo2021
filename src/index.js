import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {firebaseApp} from './firebase';


const fireApp = new firebaseApp();
ReactDOM.render(
  <React.StrictMode>
    <App fireApp={fireApp} />
  </React.StrictMode>,
  document.getElementById('root')
);

