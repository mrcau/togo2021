import './idearow.css';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
function  Idearow ({item,fireIdea,level,roomName}) {
  const folder = "idea";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const [Switch, setSwitch] = useState(true);
  // const [color, setColor] = useState('');

  let counter = item.progress;
 
  const plus = () => {
    Switch &&counter++;
    if(roomName){
    fireIdea.itemUp2(folder,roomName,item.dataId,counter)
  }else{
    fireIdea.itemUp(folder,item.uid,item.dataId,counter)
    }
    setSwitch(!Switch);
  }
  const minus = () => {
    counter>0&&counter--;
    if(roomName){
    fireIdea.itemUp2(folder,roomName,item.dataId,counter)
  }else{
    fireIdea.itemUp(folder,item.uid,item.dataId,counter)
    }
    setSwitch(!Switch);
  }
   const itemDel = () => {
     if(!roomName){
      Swal.fire({ 
        title: '내정보를 삭제하겠습니까?',
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
      fireIdea.itemDel(folder,item.uid,item.dataId); 
      }});
    }else{
      Swal.fire({ 
        title: '내정보를 삭제하겠습니까?',
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
      fireIdea.itemDel2(folder,roomName,item.dataId); 
      }});
    }
    }
  const cardColor =  [
    'primary','secondary','success','danger','warning','info','dark',// 'Light',
  ]
  const changeColor = (p)=>{
    if(roomName){
      fireIdea.itemColorUp2(folder,roomName,item.dataId,p)
    }else{
      fireIdea.itemColorUp(folder,item.uid,item.dataId,p);
      }
  }
  const fire = () => {Swal.fire({html:item.text2, width:'90%'})}

  return (
    <div className="idearow" >
     <Card bg={item.color} text={'white'} style={{ width: '12rem',height:'10rem' }} className="mb-2" >
      {!item.uid 
      ? <Card.Header style={{fontSize:"large",fontWeight:"900",color:"black"}}>룸ID</Card.Header>
      :
      <Card.Header style={{display:'flex',justifyContent:"space-between" ,padding:'5px'}} >
        {level>0 && <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> }
        <DropdownButton as={ButtonGroup} variant={item.color} title="구분" size="sm" >
          <div className="cardSelect">
            <div>
            <Dropdown.Item as="button" onClick={()=>changeColor('danger')} style={{color:"#d53343",textAlign:"center", fontSize:"18px",padding:"0 2px"}}>❶</Dropdown.Item>
            </div>
            <div>
            <Dropdown.Item as="button" onClick={()=>changeColor('warning')} style={{color:"#f7bb07",textAlign:"center", fontSize:"18px",padding:"0 "}}>❷</Dropdown.Item>
            </div>
            <Dropdown.Item as="button" onClick={()=>changeColor('success')} style={{color:"#27a243",textAlign:"center", fontSize:"18px",padding:"0 "}}>❸</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('primary')} style={{color:"#0077f7",textAlign:"center", fontSize:"18px",padding:"0 "}}>❹</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('info')} style={{color:"#17a2b8",textAlign:"center", fontSize:"18px",padding:"0 "}}>❺</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('secondary')} style={{color:"#697179",textAlign:"center", fontSize:"18px",padding:"0 "}}>❻</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('dark')} style={{color:"#32383e",textAlign:"center", fontSize:"18px",padding:"0 2px"}}>❼</Dropdown.Item>
          </div>
        </DropdownButton>
        <IconButton style={{width:'30px', height:'20px',transform:"translateX(-10px)"}} >
        {item.text2 ? <VisibilityIcon style={{color:'white'}} size="small" onClick={fire} />
        :  <VisibilityIcon style={{color:'black'}} size="small" onClick={fire} />  }
        </IconButton>
        <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'top', horizontal: 'right', }}>
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton>
      </Card.Header>
      }

      <div className="cardTitle">
        <Card.Body>
        {!item.uid
          ? <Card.Title style={{fontSize:"16px",fontWeight:"900",color:"black"}} > {item.roomName} </Card.Title>
          : <Card.Title style={{fontSize:"16px",fontWeight:"900",lineHeight:"5px"}} > {item.title}  </Card.Title> 
        }
          <Card.Text style={{fontSize:"12px",lineHeight:"14px" }}> {item.text||''} </Card.Text>
        </Card.Body>
      </div>
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
