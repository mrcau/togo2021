import './idearow.css';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card } from 'react-bootstrap';

function  Idearow ({item,fireIdea}) {
  const folder = "idea";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const fire = () => {Swal.fire({html:item.text2, width:'90%'})}
  const [Switch, setSwitch] = useState(true);

  let counter = item.progress;
  const itemDel=() => {
    fireIdea.itemDel(folder,item.uid,item.dataId)
  }
  const plus = () => {
    Switch &&counter++;
    fireIdea.itemUp(folder,item.uid,item.dataId,counter)
    setSwitch(!Switch);
  }
  const minus = () => {
    counter>0&&counter--;
    fireIdea.itemUp(folder,item.uid,item.dataId,counter)
    setSwitch(!Switch);
  }
  const cardColor =  [
    'primary','secondary','success','danger','warning','info','dark',// 'Light',
  ]
  return (
    <div className="idearow" >
     <Card bg={cardColor[0]} text={'white'} style={{ width: '18rem' }} className="mb-2" >
      <Card.Header style={{display:'flex'}} >
        <div className="headerToday">{item.title}</div>
        <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'bottom', horizontal: 'left', }}>
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton>
      </Card.Header>
      <Card.Body>
        <Card.Title> {item.text} </Card.Title>
        <Card.Text> {item.text2} </Card.Text>
      </Card.Body>
     </Card>

      {/* <div className="theader">
        <div className="headerToday">{item.title}</div>
        <Badge badgeContent={item.progress} color="secondary" style={{right:'10px'}}  
          anchorOrigin={{vertical: 'bottom', horizontal: 'left', }}/>
        <ThumbUp style={{color:'var(--Bcolor)'}} size="small" />        
      </div>
      <div className="title"> {item.text}</div>     
      <textarea  className="title" cols="30" rows="2" style={{resize: 'none'}} 
            value= {item.text} />
      <textarea  className="text" cols="30" rows="2" style={{resize: 'none'}} 
            value= {item.text2} />
      <div className="btnG">
        <button className="btn btn0" onClick={plus}>좋아요</button>
        <button className="btn btn1" onClick={fire}>보기</button>
        <CopyToClipboard text={item.text2}>
        <button className="btn btn2" >복사</button>
        </CopyToClipboard>
        <button className="btn btn3" onClick={itemDel}>삭제</button>
      </div> */}

    </div>
  );
}

export default memo(Idearow);

