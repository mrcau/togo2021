import './idearow.css';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';

function  Idearow ({item,fireIdea,level,color,setColor}) {
  const folder = "idea";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const fire = () => {Swal.fire({html:item.text2, width:'90%'})}
  const [Switch, setSwitch] = useState(true);
  // const [color, setColor] = useState('');

  let counter = item.progress;
 
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
   const itemDel = () => {
      Swal.fire({ 
        title: '내정보를 삭제하겠습니까?',
        text:"삭제될 게시물 : "+item.aTitle,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
      fireIdea.itemDel(folder,item.uid,item.dataId); 
      }});
     
    }
  const cardColor =  [
    'primary','secondary','success','danger','warning','info','dark',// 'Light',
  ]
  const changeColor = (p)=>{
    fireIdea.itemColorUp(folder,item.uid,item.dataId,p)
  }
  return (
    <div className="idearow" >
     <Card bg={item.color} text={'white'} style={{ width: '12rem',height:'10rem' }} className="mb-2" >
      <Card.Header style={{display:'flex',justifyContent:"space-between" ,padding:'5px'}} >
        {level>0 && 
        <IconButton style={{width:'20px', height:'15px'}} >
        <DeleteForever onClick={itemDel} style={{color:'white'}} />
        </IconButton>
        }
  
      <DropdownButton as={ButtonGroup} variant={item.color} title="구분" size="sm" >
        <Dropdown.Item as="button" onClick={()=>changeColor('danger')} style={{color:"#d53343",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❶</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>changeColor('warning')} style={{color:"#f7bb07",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❷</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>changeColor('success')} style={{color:"#27a243",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❸</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>changeColor('primary')} style={{color:"#0077f7",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❹</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>changeColor('info')} style={{color:"#17a2b8",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❺</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>changeColor('secondary')} style={{color:"#697179",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❻</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>changeColor('dark')} style={{color:"#32383e",textAlign:"center", fontSize:"22px",padding:"0 5px"}}>❼</Dropdown.Item>
      </DropdownButton>

      <IconButton style={{width:'20px', height:'15px'}} >
        <Badge badgeContent={item.progress} color="secondary"   
          anchorOrigin={{vertical: 'top', horizontal: 'right', }}>
        <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
        </Badge>
      </IconButton>

      </Card.Header>
      <Card.Body>
        <Card.Title> {item.title} </Card.Title>
        <Card.Text> {item.text} </Card.Text>
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

