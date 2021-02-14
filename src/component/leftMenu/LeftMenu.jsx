import './leftMenu.css';
import { Avatar,  IconButton } from '@material-ui/core';
import { BatteryCharging20, BatteryCharging50, BatteryCharging80, BatteryChargingFull, PhotoCamera } from '@material-ui/icons';
import React, { memo } from 'react';
import {  Link, useHistory } from 'react-router-dom';
import mime from 'mime-types';
import { Accordion, Card } from 'react-bootstrap';


function LeftMenu({ fireApp, user, photo, setPhoto,userInfo, logout,moveModal2 }) {
const upLoad = (e) => {
    const file = e.target.files[0];
    const metaData = { contentType: mime.lookup(file.name) }
    fireApp.imgUpload(user.uid, file, metaData, (e) => setPhoto(e));
  }
const level = userInfo.level || 0;
const history = useHistory();
  return (
    <div className="leftMenu">

      <button className="btnLogout" onClick={() => history.push('/price')} style={{marginBottom:"10px"}} > 업그레이드 </button>
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
        <div style={{width:'100%'}}>
          <button className="btnLogout" onClick={logout} > LOGOUT </button>
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/mypage"><div className="icon">나의 페이지 </div></Link> </div>
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/todo"><div className="icon"> 나의 할일들 </div></Link></div>
          {level>0 &&
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/mytool"><div className="icon"> 나의 툴박스 </div></Link></div>
          }
          {level>0 &&
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/opentool"><div className="icon"> 오픈 툴박스 </div></Link></div>
          }
          {level>5 &&
          <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/atable"><div className="icon"> 회원관리 </div></Link></div>
          }
        </div>
      }
      <hr style={{width:'90%',border:'dashed 1px gray'}} />
    
      <div style={{width:'100%',padding:"0"}}>
        <button className="btnLogout" onClick={() => {history.push('/idea');moveModal2()}} > 디자인씽킹 </button>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/problem"><BatteryCharging20/>문제찾기</Link> </div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/datastudy"><BatteryCharging50/>데이터분석</Link></div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/scamper"><BatteryCharging80/>아이디어</Link> </div>
        <div className="accordion Bmenu" onClick={moveModal2}> <Link className="a" to="/solving"><BatteryChargingFull/>문제해결</Link></div>
      </div>  
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
        
        

    </div>
  );
}

export default memo(LeftMenu);