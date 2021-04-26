/* eslint-disable react/jsx-no-target-blank */
// import './idearow.css';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, IconButton, Switch } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinkIcon from '@material-ui/icons/Link';

function  Idearow ({roomAdmin,ipAPI,fireSync, user,item,fireIdea,level,roomName,report}) {
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

  const editText = async()=>{ 
    // e.preventDefault();
  if(user.uid === item.uid || ipAPI === item.ip){
  const { value: text } = await Swal.fire({
      input: 'textarea',
      inputValue:item.text,
      showCancelButton: true
    })
    if (text) {
      // Swal.fire(text)
      fireSync.ideaTextEdit(folder,roomName,item.dataId,text);
    }
  }
  }
  // setselectNumbers([...selectNumbers,item.selectNum])

  return (
    <div className="idearow" > 
     {item.color && 
     <Card bg={item.color} text={'white'} style={{ width: '12rem',height:'120px'}} className="mb-2" >
      {item.roomUid 
      ? <Card.Header style={{fontSize:"large",fontWeight:"900",textAlign:"center"}}>제목</Card.Header>
      :
      <Card.Header style={{display:'flex',justifyContent:"space-between" ,padding:'1px'}} >

        {roomAdmin && !reports ? <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton>   
        :ipAPI === item.ip && !reports && <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> }

        {item.selectNum && item.color !=='warning' && <span>{item.selectNum}</span> }

        {!reports && roomAdmin ?
        <DropdownButton as={ButtonGroup} variant={item.color} title="구분" size="sm" >
          <div className="cardSelect">
            <div>
            <Dropdown.Item as="button" onClick={()=>changeColor('danger')} style={{color:"#d53343",textAlign:"center", fontSize:"16px",padding:"0 2px"}}>❶자랑하기</Dropdown.Item>
            </div>
            <div>
            <Dropdown.Item as="button" onClick={()=>changeColor('warning')} style={{color:"#f7bb07",textAlign:"center", fontSize:"16px",padding:"0 "}}>❷번호감춤</Dropdown.Item>
            </div>
            <Dropdown.Item as="button" onClick={()=>changeColor('success')} style={{color:"#27a243",textAlign:"center", fontSize:"16px",padding:"0 "}}>❸내용감춤</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('primary')} style={{color:"#0077f7",textAlign:"center", fontSize:"16px",padding:"0 "}}>❹</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('info')} style={{color:"#17a2b8",textAlign:"center", fontSize:"16px",padding:"0 "}}>❺</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('secondary')} style={{color:"#697179",textAlign:"center", fontSize:"16px",padding:"0 "}}>❻</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>changeColor('dark')} style={{color:"#32383e",textAlign:"center", fontSize:"16px",padding:"0 2px"}}>❼</Dropdown.Item>
          </div>
        </DropdownButton>
        :ipAPI === item.ip && !reports && <DropdownButton as={ButtonGroup} variant={item.color} title="구분" size="sm" >
        <div className="cardSelect">
          <div>
          <Dropdown.Item as="button" onClick={()=>changeColor('danger')} style={{color:"#d53343",textAlign:"center", fontSize:"16px",padding:"0 2px"}}>❶자랑하기</Dropdown.Item>
          </div>
          <div>
          <Dropdown.Item as="button" onClick={()=>changeColor('warning')} style={{color:"#f7bb07",textAlign:"center", fontSize:"16px",padding:"0 "}}>❷번호감춤</Dropdown.Item>
          </div>
          <Dropdown.Item as="button" onClick={()=>changeColor('success')} style={{color:"#27a243",textAlign:"center", fontSize:"16px",padding:"0 "}}>❸내용감춤</Dropdown.Item>
          <Dropdown.Item as="button" onClick={()=>changeColor('primary')} style={{color:"#0077f7",textAlign:"center", fontSize:"16px",padding:"0 "}}>❹</Dropdown.Item>
          <Dropdown.Item as="button" onClick={()=>changeColor('info')} style={{color:"#17a2b8",textAlign:"center", fontSize:"16px",padding:"0 "}}>❺</Dropdown.Item>
          <Dropdown.Item as="button" onClick={()=>changeColor('secondary')} style={{color:"#697179",textAlign:"center", fontSize:"16px",padding:"0 "}}>❻</Dropdown.Item>
          <Dropdown.Item as="button" onClick={()=>changeColor('dark')} style={{color:"#32383e",textAlign:"center", fontSize:"16px",padding:"0 2px"}}>❼</Dropdown.Item>
        </div>
      </DropdownButton>
      }
      

        { item.text2 || item.photoData ?  item.color !=='success' &&
          <IconButton style={{width:'25px', height:'20px'}} >
          <VisibilityIcon style={{color:'white'}} size="small" onClick={fire} /> 
          </IconButton> : <p/>
        }
        {item.title && 
        <IconButton style={{width:'25px', height:'20px'}} >
           <a className="iconLink" href={item.title} target="_blank">
               <LinkIcon />
           </a>
        </IconButton>
        }
        <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'top', horizontal: 'right', }}> 
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton>
      </Card.Header>
      }


      <div className="cardTitle" style={{textAlign:"center"}}>
        <Card.Body style={{padding:"8px",height:"79px",overflowY:"auto" }}>
          <Card.Title style={{fontSize:"16px",fontWeight:"900"}}  onClick={editText} > {item.text} </Card.Title>
          <Card.Text style={{fontSize:"12px",lineHeight:"14px", whiteSpace:"pre-wrap" }}  onClick={editText} > {item.ip && 'IP : '+ item.ip.substr(8)} </Card.Text>
        </Card.Body>
      </div>
     </Card>}

    </div>
  );
}

export default memo(Idearow);

