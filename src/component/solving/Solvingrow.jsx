import './solvingrow.css';
import React, { memo, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';

function  Solvingrow ({item,roomERef,fireIdea,level,roomName}) {
  const folder = "solving";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const [Switch, setSwitch] = useState(true);
  // const [color, setColor] = useState('');
const textRef = useRef();
const titleRef = useRef();

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

  const onSubmit = () => { 
    // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    const data = {
      dataId: item.dataId,
      uid:item.uid,
      title: titleRef.current.value || '',
      text: textRef.current.value || '',      
    }    

    if(roomName){console.log('룸있음'); 
      fireIdea.itemUpdate2(folder, roomName, item.dataId, data)
      }
    else{console.log('룸없음');fireIdea.itemUpdate(folder,data); }
  }
  return ( 
    <div className="solvingrow" style={{flex:'auto'}} > {item.color && 
     <Card bg={item.color} text={'white'} style={{ width: '100%',height:'100%' }} className="mb-2" >
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
        <input type="text" className="solvingInput"  ref={titleRef} onChange={onSubmit} value={item.title||''}/>
        <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'top', horizontal: 'right', }}> 
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton>
      </Card.Header>
      
        <Card.Body style={{display:'flex',flexDirection:'column',padding:'5px'}}>    
          <textarea  className="solvingArea"  ref={textRef} onChange={onSubmit} value={item.text||''} />
        </Card.Body>
     </Card>  }
    </div>
  );

}

export default memo(Solvingrow);

