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
import Price from './component/price/Price';
import Opentool from './component/opentool/Opentool';
import Problem from './component/problem/Problem';
import Datastudy from './component/datastudy/Datastudy';
import Solving from './component/solving/Solving';
import Startup from './component/startup/Startup';
import Idea from './component/postit/Idea';
import steering from './component/togo/steering.png';
import Cube from './component/cube/Cube';
import Workout from './component/workout/Workout';

function App({ fireApp,fireLogin,fireSync, fireTodo, fireIdea, fireOpentool,fireProblem}) {
  const history = useHistory();
  const [user, setuser] = useState({});
  const [uid, setUid] = useState('');
  const [logoName, setlogoName] = useState('처음');
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');
  const drawerRef = useRef();
  const backRef = useRef();
  const drawerTopRef = useRef();
  const backTopRef = useRef();
  const [registerTF, setRegisterTF] = useState(false);
  const [userInfo, setUserInfo] = useState('');  
  
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
  setRegisterTF(false);
 }

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
        f2: () => { setuser({}); setUid(''); setPhoto('')},
        f3: (e) => {fireApp.authSync('auth',e.uid,(p)=>setUserInfo(p))},
        f4: () => { setUserInfo({})},

      }
      if(e){cf.f1(e); cf.f3(e);}else{cf.f2(); cf.f4();}
      // e ? cf.f1(e) : cf.f2();
    })
  }, [fireApp]);
  //본문
  return (
    <div className="App"> 
      <div className="drawerLeft" ref={drawerRef}>
        <LeftMenu setlogoName={setlogoName} fireApp={fireApp} user={user} photo={photo} setPhoto={setPhoto} logout={logout} userInfo={userInfo} moveModal2={moveModal2} />
      </div>
      <div className="drawerbackLeft backNoneLeft" ref={backRef} onClick={moveModal2}></div>
      {/* 위쪽메뉴 */}
      <div className="drawerTop " ref={drawerTopRef}>
        {uid ? <Mytoolbox userInfo={userInfo} fireTodo={fireTodo} user={user} userName={userName} fireSync={fireSync} />
           : <LoginModal fireApp={fireApp} setuser={setuser} moveModal4={moveModal4} user={user} userInfo={userInfo}  registerTF={registerTF} setRegisterTF={setRegisterTF} /> }
      </div>
      <div className="drawerbackTop backNonTop" ref={backTopRef} onClick={moveModal4}></div>

      <header className="header" >
        {/* 좌측메유 */}
        {/* <div className="btnmenu"> <button onClick={moveModal}><MenuSharpIcon/></button> </div> */}
        <IconButton size="small" component="span" onClick={moveModal} style={{paddingLeft:"10px",width:"90px"}} > 
        <Tooltip arrow placement="left" title="메뉴보기">
          <MenuSharpIcon style={{color:"var(--Bcolor)",marginRight:"auto"}}   /> 
          </Tooltip> 
        </IconButton>
        {/* /타이틀 */}
        <div className="headerT" onClick={()=>setlogoName('')}>
          <Tooltip arrow placement="left"  title="홈으로 이동">
            <Link className="link" to='/' > 
            <img src={steering} className="steering" alt="logo"/> 
            <span style={{fontSize:'large',color:'white',padding:'3px',margin:"5px 0"}}>{logoName}</span>  
            </Link>
          </Tooltip> 
        </div> 
        {/* 탑메뉴 */}
        <div className="rightMenu" style={{textAlign:"right",paddingRight:"10px",lineHeight:"20px"}}>
          {uid ? <Tooltip arrow placement="left"  title="나의 툴 보기">
          <Chip size="small" avatar={<Avatar src={photo}/>} label="ToolBox" as="button"  onClick={moveModal3}/>
          {/* <Chip size="small" avatar={<Avatar src={photo}/>} label={userInfo.name||''} as="button"  onClick={moveModal3}/> */}
          </Tooltip> 
            : <IconButton size="small" component="span" onClick={moveModal3} 
            style={{color:"var(--Bcolor)"}}> Login </IconButton>
          }
        </div>        
      </header>
      <main>
        <Switch>
          <Route exact path='/'>
            <Togo setlogoName={setlogoName} fireApp={fireApp} user={user} userInfo={userInfo} photo={photo}/>
          </Route>
          <Route path='/mypage'> 
            <Mypage fireApp={fireApp} setlogoName={setlogoName} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          <Route path='/todo'>
            <Todo fireTodo={fireTodo} user={user} userName={userName} setlogoName={setlogoName} />
          </Route>
          
          <Route path='/workout'>
            <Workout fireTodo={fireTodo} user={user} userName={userName} setlogoName={setlogoName} />
          </Route>
          <Route path='/mytool'> 
            <Mytool fireApp={fireApp}fireSync={fireSync} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          <Route path='/opentool'> 
            <Opentool fireApp={fireApp} fireSync={fireSync}  fireIdea={fireIdea}  user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          <Route path='/scamper/:id'> 
            <Scamper fireApp={fireApp}  fireProblem={fireProblem} fireSync={fireSync} user={user} userInfo={userInfo} setlogoName={setlogoName}  />
          </Route>
          <Route path='/atable'> 
            <Atable fireApp={fireApp} user={user} userName={userName} setlogoName={setlogoName} />
          </Route>  
          <Route path='/price'> 
            <Price fireApp={fireApp} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          <Route path='/problem/:id'>           
            <Problem fireSync={fireSync} fireProblem={fireProblem} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          <Route path="/postit/:id"> 
            <Idea fireSync={fireSync} fireProblem={fireProblem} fireIdea={fireIdea} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          <Route path='/datastudy/:id'>           
            <Datastudy fireProblem={fireProblem} fireSync={fireSync} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          
          <Route path='/cube/:id'>           
            <Cube fireProblem={fireProblem} fireSync={fireSync} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>

          <Route path='/solving/:id'>           
            <Solving fireIdea={fireIdea} fireSync={fireSync} user={user} userInfo={userInfo}setlogoName={setlogoName}  />
          </Route>
          <Route path='/startup/:id'> 
            <Startup fireProblem={fireProblem} fireSync={fireSync} user={user} userInfo={userInfo} setlogoName={setlogoName} />
          </Route>
          
          
        </Switch>
      </main>
      <footer>by SamFactory</footer>
    </div>
  );
}

export default App;