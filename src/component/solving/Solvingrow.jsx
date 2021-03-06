import './solvingrow.css';
import React, { memo, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import expand, { extract } from 'emmet';

function  Solvingrow ({item,roomAdmin,fireIdea,level,roomName,reportInput,report}) {

  const folder = "solving";
  const Swal = require('sweetalert2');
  const [Switch, setSwitch] = useState(true);
  const textRef = useRef();
  const titleRef = useRef();
  // let emmetText = '';


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

  const onSubmit = (e) => { 
    // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    const data = {
      dataId: item.dataId,
      uid:item.uid,
      title: titleRef.current.value || '',
      text: textRef.current.value || '',      
    }    
    if(roomName){ 
      fireIdea.itemUpdate2(folder, roomName, item.dataId, data)
      }
    else{console.log('룸없음');fireIdea.itemUpdate(folder,data); }
  }
  
// selectionStart : 현재 커서 위치, replace : 기존 태그slicetext를 emmettext로 교체
// function replaceAt (input, index1,index2, word){
//   return input.substr(index1, index2) + word + input.substr(index+word.length);
// }
  const onSubmit2 = (e)=>{
    if(e.key==='Tab'){
      e.preventDefault();
      const source = textRef.current.value; console.log(e.target.selectionStart)
      const data1 = extract(source, e.target.selectionStart);  console.log(data1,e.target.selectionStart)
      if(!data1){return}else{
      const emmetText = expand(data1.abbreviation);
      // const sliceText = source.slice(data1.start,data1.end)
      // const changeText = textRef.current.value.replace(sliceText,emmetText)
      // textRef.current.value = changeText;         
      textRef.current.value = source.substr(0,data1.start)+emmetText+source.substr(data1.end);         

    }
  }
  }
  const fire = () => {Swal.fire({html:item.text, width:'90%',showConfirmButton: false})}


  return ( 
    <div className="solvingrow" style={{flex:'1'}} > {item.color && 
     <Card bg={item.color} text={'white'} style={{ width: '100%',height:'100%' }} className="mb-2" >
      <Card.Header style={{display:'flex',padding:'5px'}} >
        {roomAdmin && <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> }
        <DropdownButton as={ButtonGroup} variant={item.color} title="구분" size="sm"  disabled={reportInput} >
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
        { item.text &&

          <IconButton style={{width:'30px', height:'20px'}} >
          <VisibilityIcon style={{color:'white'}} size="small" onClick={fire} /> 
          </IconButton>
        }
        <input type="text" className="solvingInput"  ref={titleRef} onChange={onSubmit} value={item.title||''}  disabled={reportInput} />
        {!report&&
        <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'top', horizontal: 'right', }}> 
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton>
        }
      </Card.Header>
      
        <Card.Body style={{display:'flex',flexDirection:'column',padding:'5px'}}>    
          <textarea  className="solvingArea"  ref={textRef} onChange={onSubmit} onKeyDown={onSubmit2} value={item.text||''}  disabled={reportInput}  />
        </Card.Body>
     </Card>  }
    </div>
  );

}

export default memo(Solvingrow);

