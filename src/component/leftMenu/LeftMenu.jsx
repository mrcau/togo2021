import './leftMenu.css';
import { Avatar, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { memo, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import mime from 'mime-types';
import { Accordion, Card } from 'react-bootstrap';

function LeftMenu({ fireApp, user, photo, setPhoto }) {
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
        <IconButton component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <h6>{user.email}</h6>
      {/* <hr style={{width:'90%',border:'dashed 1px gray'}} /> */}
      <button className="btnlink" onClick={() => history.push('/todo')}>Todo</button>
      <button className="btnlink" onClick={() => history.push('/scamper')}>scamper</button>
      {level>2 &&
      <button className="btnlink" onClick={() => history.push('/atable')}>회원관리</button>
      }
    
        <Accordion style={{width:'100%'}}>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0"> Click me! </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body onClick={()=>{alert('hi')}} >Hello!</Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
              <Card.Body onClick={()=>{alert('hi')}} >Hello!2</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

    </div>
  );
}

export default memo(LeftMenu);