import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseApp from './service/firebase';
import firelogin from './service/firelogin';
import firetodo from './service/firetodo';
import fireidea from './service/fireidea';
import fireopentool from './service/fireopentool';
import fireproblem from './service/fireproblem';
import firesync from './service/firesync';


const fireApp = new firebaseApp();
const fireLogin = new firelogin();
const fireTodo = new firetodo();
const fireIdea = new fireidea();
const fireOpentool = new fireopentool();
const fireProblem = new fireproblem();
const fireSync = new firesync();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App fireApp={fireApp} fireLogin={fireLogin} fireTodo={fireTodo} fireSync={fireSync}
    fireIdea={fireIdea} fireOpentool={fireOpentool} fireProblem={fireProblem} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

