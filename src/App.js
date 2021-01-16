import { Drawer } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import LeftMenu from './component/leftMenu/LeftMenu';
import LoginModal from './component/loginModal/LoginModal';
import Todo from './component/todo/Todo';
import Togo from './component/togo/Togo';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';

function App({ fireApp }) {
  const [uid, setUid] = useState('');

  const [state, setState] = useState({ top: false, left: false, right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="App">
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        <LeftMenu />
      </Drawer>
      <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
        <LoginModal />
      </Drawer>
      <header className="header">
          <button className="btnmenu" onClick={toggleDrawer('left', true)}>
            <MenuSharpIcon /></button>
        <div className="headerT">
          <Link className="link" to='/'>
            TOGO <GpsFixedIcon style={{fontSize:'25px'}} /> BOX
          </Link>
        </div>
        <div className="rightMenu">
          {uid ? <button >Logout</button>
            : <button onClick={toggleDrawer('top', true)}> Login </button>}
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path='/'>
            <Togo />
          </Route>
          <Route path='/todo'>
            <Todo service={fireApp} />
          </Route>
        </Switch>
      </main>
      <footer>토고팩토리</footer>
    </div>
  );
}

export default App;