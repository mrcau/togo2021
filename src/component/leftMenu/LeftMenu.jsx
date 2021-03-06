import './leftMenu.css';
import { Avatar,  IconButton } from '@material-ui/core';
import { BatteryCharging20, BatteryCharging50, BatteryCharging80, BatteryChargingFull, PhotoCamera } from '@material-ui/icons';
import React, { memo } from 'react';
import {  Link, useHistory } from 'react-router-dom';
import mime from 'mime-types';
import { Accordion, Card } from 'react-bootstrap';


function LeftMenu({ fireApp, user, photo, setPhoto,userInfo, logout,moveModal2,setlogoName }) {
const upLoad = (e) => {
    const file = e.target.files[0];
    const metaData = { contentType: mime.lookup(file.name) }
    fireApp.imgUpload(user.uid, file, metaData, (e) => setPhoto(e));
  }
const level = userInfo.level || 0;
const history = useHistory();
  return (
    <div className="samtoolleftMenu">

      {/* <button className="btnLogout" onClick={() => history.push('/price')} style={{marginBottom:"10px"}} > 업그레이드 </button> */}
      {photo 
      ? <div className="imgBg" style={{ backgroundImage: `url("${photo}")` }} />
      : <Avatar style={{ width: '120px', height: '120px' }} />}
      {Object.keys(user).length>0 &&
        <input accept="image/*" style={{ display: 'none' }} id="photoFile" type="file" onChange={upLoad} />
      }
      <label htmlFor="photoFile"> 
        <IconButton size="small" component="span"> <PhotoCamera /> </IconButton>
      </label>
      {user.uid && 
        <div style={{width:'100%',padding:"0"}}>
          <button className="btnLogout" onClick={logout} style={{marginLeft:"10px"}} > LOGOUT </button>
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/mypage"><div className="samtoolicon">MyPage </div></Link> </div>
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/mytool"><div className="samtoolicon">ToolBox </div></Link></div>
          {/* <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/todo"><div className="samtoolicon"> 나의 할일들 </div></Link></div> */}
          {level>9 &&
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/workout"><div className="samtoolicon">Workout </div></Link></div>
          }
          {/* {level>0 &&
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/opentool"><div className="samtoolicon"> 오픈 툴박스 </div></Link></div>
          } */}
          {level>5 &&
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/atable"><div className="samtoolicon"> 회원관리 </div></Link></div>
          }
        </div>
      }
      <hr style={{width:'90%',border:'dashed 1px gray'}} />    
      <div style={{width:'100%',padding:"0"}}>
        <div className="menuTitle"  > 협업도구 </div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/postit/:id"><div className="samtoolicon">게시툴</div></Link> </div>
        {user.uid && userInfo&&userInfo.level>9&&
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/solving/:id"><div className="samtoolicon">코딩툴</div></Link></div>
        }
        {user.uid && userInfo&&userInfo.level>9&&
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/cube/:id"><div className="samtoolicon">큐브툴</div></Link> </div>
        }
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/opentool"><div className="samtoolicon">사용법</div></Link></div>
      </div>  

      <hr style={{width:'90%',border:'dashed 1px gray'}} />    
      {user.uid && userInfo&&userInfo.level>9&&
      <div style={{width:'100%',padding:"0"}}>
        <div className="menuTitle"  > 디자인씽킹 </div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/problem/:id"><BatteryCharging20/>문제찾기</Link> </div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/datastudy/:id"><BatteryCharging50/>데이터분석</Link></div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/scamper/:id"><BatteryCharging80/>아이디어</Link> </div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/startup/:id">🚀 스타트업</Link></div>
      </div>  
      }
{/* 
        <Accordion  style={{width:'100%'}}>         
          <Card>
            <Accordion.Toggle as={Card.Header}  className="accordion" eventKey="4">
            🚀 스타트업
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body  className="accordion Amenu" > - 마케팅 </Card.Body>
            </Accordion.Collapse>        
            <Accordion.Collapse eventKey="4">
              <Card.Body  className="accordion Amenu" onClick={() =>history.push('/startup')}> - 사업분석</Card.Body>
            </Accordion.Collapse>            
          </Card>
        </Accordion>
         */}
        

    </div>
  );
}

export default memo(LeftMenu);