import { Avatar, Chip, IconButton, Tooltip } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import LeftMenu from './component/leftMenu/LeftMenu';
import LoginModal from './component/loginModal/LoginModal';
import Todo from './component/todo/Todo';
import Togo from './component/togo/Togo';
import Scamper from './component/scamper/Scamper';
import Atable from './component/authTable/Atable';
import Mytool from './component/mytool/Mytool';
import Mytoolbox from './component/mytool/Mytoolbox';
import Mypage from './component/mypage/Mypage';

function App({ fireApp }) {
  const history = useHistory();
  const [user, setuser] = useState({});
  const [uid, setUid] = useState('');
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');
  const drawerRef = useRef();
  const backRef = useRef();
  const drawerTopRef = useRef();
  const backTopRef = useRef();
  
 //왼쪽 모달 핸들링
 const moveModal = () => {
  drawerRef.current.classList.add("moveDrawerLeft");
  backRef.current.classList.remove("backNoneLeft");    
 }
 const moveModal2 = () => {
  drawerRef.current.classList.remove("moveDrawerLeft");
  backRef.current.classList.add("backNoneLeft");    
 }
 //위쪽 모달 핸들링
 const moveModal3 = () => {
  drawerTopRef.current.classList.add("moveDraweTop");
  backTopRef.current.classList.remove("backNonTop");    
 }
 const moveModal4 = () => {
  drawerTopRef.current.classList.remove("moveDraweTop");
  backTopRef.current.classList.add("backNonTop");    
 }
//  const moveModal0 = (drawref,backref,drawclass,backclass) =>{
//   drawref.current.classList.add(drawclass);
//   backref.current.classList.remove(backclass); 
//  }

  //로그아웃
  const logout =  async() =>{
   await fireApp.logout();
   setuser({}); setUid(''); setPhoto('');setUserName('');
   history.push('/');
   moveModal2();
  } 

  // 로그인 싱크
  useEffect(() => {
     fireApp.onAuth(
    (e) => {
      const cf = {
        f1: (e) => { setuser(e); setUid(e.uid); setPhoto(e.photoURL); setUserName(e.displayName);moveModal4(); },
        f2: () => { setuser({}); setUid(''); setPhoto('')}
      }
      e ? cf.f1(e) : cf.f2();
    })
  }, [fireApp]);
  //본문
  return (
    <div className="App"> 
      <div className="drawerLeft" ref={drawerRef}>
        <LeftMenu fireApp={fireApp} user={user} photo={photo} setPhoto={setPhoto} logout={logout} moveModal2={moveModal2} />
      </div>
      <div className="drawerbackLeft backNoneLeft" ref={backRef} onClick={moveModal2}></div>
      {/* 위쪽메뉴 */}
      <div className="drawerTop " ref={drawerTopRef}>
        {uid ? <Mytoolbox fireApp={fireApp} user={user} userName={userName} />
           : <LoginModal fireApp={fireApp} setuser={setuser} moveModal4={moveModal4}/>  }
      </div>
      <div className="drawerbackTop backNonTop" ref={backTopRef} onClick={moveModal4}></div>

      <header className="header" >
        {/* 좌측메유 */}
        {/* <div className="btnmenu"> <button onClick={moveModal}><MenuSharpIcon/></button> </div> */}
        <IconButton size="small" component="span" onClick={moveModal} style={{paddingLeft:"10px",width:"90px"}} > 
          <MenuSharpIcon style={{color:"var(--Bcolor)",marginRight:"auto"}}   /> 
        </IconButton>
        {/* /타이틀 */}
        <div className="headerT">
          <Link className="link" to='/'> SamTool </Link>
        </div> 
        {/* 탑메뉴 */}
        <div className="rightMenu" style={{textAlign:"right",paddingRight:"10px",lineHeight:"20px"}}>
          {uid ? <Tooltip arrow title="My ToolBox">
          <Chip size="small" avatar={<Avatar src={photo}/>} label={uid.substr(0,6)} as="button"  onClick={moveModal3}/>
          </Tooltip> 
            : <IconButton size="small" component="span" onClick={moveModal3} 
            style={{color:"var(--Bcolor)"}}> Login </IconButton>
          }
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
            <Scamper fireApp={fireApp} user={user} />
          </Route>
          <Route path='/atable'> 
            <Atable fireApp={fireApp} user={user} userName={userName} />
          </Route>
          <Route path='/mytool'> 
            <Mytool fireApp={fireApp} user={user}/>
          </Route>
          <Route path='/mypage'> 
            <Mypage fireApp={fireApp} user={user} />
          </Route>
          
        </Switch>
      </main>
      <footer>by SamFactory</footer>
    </div>
  );
}

export default App;