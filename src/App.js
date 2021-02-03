import { Avatar, Chip, Drawer, Tooltip } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import LeftMenu from './component/leftMenu/LeftMenu';
import LoginModal from './component/loginModal/LoginModal';
import Todo from './component/todo/Todo';
import Togo from './component/togo/Togo';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import Scamper from './component/scamper/Scamper';
import Atable from './component/authTable/Atable';
import Mytool from './component/mytool/Mytool';
import Mytoolbox from './component/mytool/Mytoolbox';


function App({ fireApp }) {
  const history = useHistory();
  const [user, setuser] = useState({});
  const [uid, setUid] = useState('');
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');
  //Drawer
  const [state, setState] = useState({ top: false, left: false, right: false });
  const toggleDrawer = (anchor, open) => (event) => setState({ ...state, [anchor]: open });
  const toggleDrawer2 = (anchor, open) => setState({ ...state, [anchor]: open });

  //로그아웃
  const logout =  async() =>{
   await fireApp.logout();
   setuser({}); setUid(''); setPhoto('');setUserName('');
   history.push('/')
  } 


  // 로그인 싱크
  useEffect(() => {
     fireApp.onAuth((e) => {
      const cf = {
        f1: (e) => { setuser(e); setUid(e.uid); setPhoto(e.photoURL); setUserName(e.displayName);
          toggleDrawer2('top', false) },
        f2: () => { setuser({}); setUid(''); setPhoto('')}
      }
      e ? cf.f1(e) : cf.f2();
    })
  }, [fireApp]);

  //본문
  return (
    <div className="App"> 
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        <LeftMenu fireApp={fireApp} user={user} photo={photo} setPhoto={setPhoto} logout={logout} />
      </Drawer>
      <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}  >
      {uid ? <Mytoolbox fireApp={fireApp} user={user} userName={userName} />
           : <LoginModal fireApp={fireApp} setuser={setuser} />  }
      </Drawer> 
      <header className="header" >
        <div className="btnmenu">
          <button onClick={toggleDrawer('left', true)}>
            <MenuSharpIcon /></button>
        </div>
        <div className="headerT">
          <Link className="link" to='/'>
            SSAM <GpsFixedIcon style={{ fontSize: '25px' }} /> TOOL
          </Link>
        </div> 
        <div className="rightMenu" >
          {uid ? <Tooltip arrow title="My toolBox">
          <Chip size="small" avatar={<Avatar src={photo} />} label={uid.substr(0,6)} as="button"  onClick={toggleDrawer('top', true)}/>
          </Tooltip> 
            : <button onClick={toggleDrawer('top', true)}> Login </button>}
        </div>
        
      </header>
      <main>
        <Switch>
          <Route exact path='/'>
            <Togo />
          </Route>
          <Route path='/todo'>
            <Todo fireApp={fireApp} user={user} userName={userName} />
          </Route>
          <Route path='/scamper'> 
            <Scamper fireApp={fireApp} user={user} userName={userName} />
          </Route>
          <Route path='/atable'> 
            <Atable fireApp={fireApp} user={user} userName={userName} />
          </Route>
          <Route path='/mytool'> 
            <Mytool fireApp={fireApp} user={user} userName={userName} />
          </Route>
          
        </Switch>
      </main>
      <footer>토고팩토리</footer>
    </div>
  );
}

export default App;