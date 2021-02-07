import './leftMenu.css';
import { Avatar,  IconButton } from '@material-ui/core';
import { BatteryCharging20, BatteryCharging50, BatteryCharging80, BatteryChargingFull, PhotoCamera } from '@material-ui/icons';
import React, { memo, useEffect, useState } from 'react';
import {  Link, useHistory } from 'react-router-dom';
import mime from 'mime-types';
import { Accordion, Card } from 'react-bootstrap';


function LeftMenu({ fireApp, user, photo, setPhoto, logout }) {
const [level, setLevel] = useState(0);

useEffect(() => {
  fireApp.onAuth((e) => {
    if (e) {fireApp.authSync('auth',e.uid,(p)=>setLevel(p))}
    else { console.log('no-User') }
  })
}) 

  const upLoad = (e) => {
    const file = e.target.files[0];
    const metaData = { contentType: mime.lookup(file.name) }
    fireApp.imgUpload(user.uid, file, metaData, (e) => setPhoto(e));
  }
  const history = useHistory();
  return (
    <div className="leftMenu">

      {photo ? <div className="imgBg" style={{ backgroundImage: `url("${photo}")` }} />
        : <Avatar style={{ width: '120px', height: '120px' }} />}
      {Object.keys(user).length>0 &&
        <input accept="image/*" style={{ display: 'none' }} id="photoFile" type="file" onChange={upLoad} />
      }
      <label htmlFor="photoFile"> 
        <IconButton size="small" component="span"> <PhotoCamera /> </IconButton>
      </label>
      {user.uid&&<div style={{width:'100%'}}>
        <button className="btnLogout" onClick={logout} > 로그아웃 </button>
        <div className="accordion Bmenu"> <Link className="a" to="/"><div className="icon">icon</div> My Page</Link> </div>
        <div className="accordion Bmenu"> <Link className="a" to="/todo"><BatteryCharging20/> My Todo</Link></div>
        <div className="accordion Bmenu"> <Link className="a" to="/mytool"><BatteryCharging20/> My Tool</Link></div>
        <div className="accordion Bmenu"> <Link className="a" to="/atable"><BatteryCharging20/> My users</Link></div>
      </div>}
      <hr style={{width:'90%',border:'dashed 1px gray'}} />
    
      <div className="btntitle" disabled > 디자인씽킹</div>

        <Accordion  style={{width:'100%'}}>
          <Card className={"card"}>
            <Accordion.Toggle as={Card.Header} className="accordion" eventKey="0">
            <BatteryCharging20/> 문제 찾기 
            </Accordion.Toggle>
            <Accordion.Collapse  eventKey="0">
              <Card.Body  className="accordion  Amenu" onClick={()=>{alert('hi')}} > - 관찰하기 </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
              <Card.Body  className="accordion  Amenu" onClick={()=>{alert('hi')}} > - 페르소나 </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
              <Card.Body  className="accordion  Amenu" onClick={()=>{alert('hi')}} > - 5Why질문 </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header}  className="accordion" eventKey="1">
            <BatteryCharging50/> 데이터 분석
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body  className="accordion Amenu" > - 유투브</Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1">
              <Card.Body  className="accordion Amenu" > - 상권분석</Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1">
              <Card.Body  className="accordion Amenu" > - 구글</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header}  className="accordion" eventKey="2">
            <BatteryCharging80/>  창의적발상
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body  className="accordion Amenu" > - 브레인스톰</Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body  className="accordion Amenu" > - 만다라트</Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body  className="accordion Amenu" onClick={() => history.push('/scamper')}> - 스캠퍼</Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body  className="accordion Amenu" > - 트리즈</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header}  className="accordion" eventKey="3">
            <BatteryChargingFull/> 문제해결
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body  className="accordion Amenu" > - 프로토타입</Card.Body>
            </Accordion.Collapse>            
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header}  className="accordion" eventKey="4">
            🚀 스타트업
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body  className="accordion Amenu" > - SWOT분석</Card.Body>
            </Accordion.Collapse>            
            <Accordion.Collapse eventKey="4">
              <Card.Body  className="accordion Amenu" > - 식스분석</Card.Body>
            </Accordion.Collapse>            
            <Accordion.Collapse eventKey="4">
              <Card.Body  className="accordion Amenu" > - 린캔버스</Card.Body>
            </Accordion.Collapse>            
          </Card>
        </Accordion>
        
        

    </div>
  );
}

export default memo(LeftMenu);