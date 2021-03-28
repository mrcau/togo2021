import './idearow.css';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
function  Idearow ({item,fireIdea,level,roomName,report}) {
  const folder = "postit";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const [Switch, setSwitch] = useState(true);
  // const [color, setColor] = useState('');
const [reports, setReports] = useState(report)
  let counter = item.progress;
  const plus = () => {
    if(report){return}
    Switch &&counter++;
    if(roomName){
    fireIdea.itemUp2(folder,roomName,item.dataId,counter)
  }else{
    fireIdea.itemUp(folder,item.uid,item.dataId,counter)
    }
    setSwitch(!Switch);
  }
  const minus = () => {
    if(report){return}
    counter>0&&counter--;
    if(roomName){
    fireIdea.itemUp2(folder,roomName,item.dataId,counter)
  }else{
    fireIdea.itemUp(folder,item.uid,item.dataId,counter)
    }
    setSwitch(!Switch);
  }
   const itemDel = () => {
     if(report){return}
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
    
  const changeColor = (p)=>{
    if(roomName){
      fireIdea.itemColorUp2(folder,roomName,item.dataId,p)
    }else{
      fireIdea.itemColorUp(folder,item.uid,item.dataId,p);
      }
  }
  const fire = () => {Swal.fire({html:item.text2,imageUrl:item.photoData, width:'90%'})}
  return (
    <div className="idearow" >  {item.color && 
     <Card bg={item.color} text={'white'} style={{ width: '12rem',height:'10rem' }} className="mb-2" >
      {item.roomUid 
      ? <Card.Header style={{fontSize:"large",fontWeight:"900",color:"black"}}>룸ID</Card.Header>
      :
      <Card.Header style={{display:'flex',justifyContent:"space-between" ,padding:'5px'}} >
        {level>0 && !reports && <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> }
        {!reports && 
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
      }
        { item.text2 || item.photoData ?
          <IconButton style={{width:'30px', height:'20px',transform:"translateX(-10px)"}} >
          <VisibilityIcon style={{color:'white'}} size="small" onClick={fire} /> 
          </IconButton> : <p/>
        }
        <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'top', horizontal: 'right', }}> 
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton>
      </Card.Header>
      }

      <div className="cardTitle">
        <Card.Body style={{padding:"8px",height:"100px",overflowY:"auto" }}>
        {item.roomUid
          ? <Card.Title style={{fontSize:"16px",fontWeight:"900",color:"black"}} > {item.roomName} </Card.Title>
          : <Card.Title style={{fontSize:"16px",fontWeight:"900",lineHeight:"16px"}} > {item.title}  </Card.Title> 
        }
          <Card.Text style={{fontSize:"12px",lineHeight:"14px" }}> {item.text||''} </Card.Text>
        </Card.Body>
      </div>
     </Card>}

    </div>
  );
}

export default memo(Idearow);

