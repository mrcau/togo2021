/* eslint-disable react/jsx-no-target-blank */
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Badge from '@material-ui/core/Badge';
import { ThumbUp } from '@material-ui/icons';
import { Card, DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/Link';

function  Toolrow ({item,fireApp,level, fireIdea,user}) {
  const folder = "Opentool";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const fire = () => { 
    if(item.text2){
    Swal.fire({html:item.text2, width:'90%'})
  }}
  const [Switch, setSwitch] = useState(true);
  let counter = item.progress;

  
    // 아이템 삭제
    const itemDel = () => {      
      Swal.fire({ 
        title: '데이터를 삭제하겠습니까?',
        icon:'warning',
        showCancelButton: true})
      .then((result) => {
        fireApp.opentoolDel(folder,item.dataId);
        if(item.photoData){ 
          fireIdea.imgDel(item.dataId)
          }
      });
    }      
    
  const plus = () => {
    Switch &&counter++;
    fireApp.opentoolUp(folder,item.dataId,counter)
    setSwitch(!Switch);

  }
  const minus = () => {
    counter>0&&counter--;
    fireApp.opentoolUp(folder,item.dataId,counter)
    setSwitch(!Switch);
  }

  const changeColor = (p)=>{
    fireApp.itemColorUp(folder,item.dataId,p);
  }

  const editText = async()=>{ 
    // e.preventDefault();
  if(user.uid === item.uid){
  const { value: text } = await Swal.fire({
      input: 'textarea',
      inputValue:item.text,
      showCancelButton: true
    })
    if (text) {
      // Swal.fire(text)
      fireApp.openFolderdataUp(folder,item.dataId,text);  
    }
  }
  }

  return (
    <div className="toolrow">

<Card bg={item.color} text={'white'} style={{ width: '15rem'}} className="mb-2" >
      
      <Card.Header style={{display:'flex',justifyContent:"space-between" ,padding:'5px'}} >
        {user.uid===item.uid && <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> }
        {user.uid===item.uid &&
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
        </DropdownButton>}
        {item.text2 && 
          <IconButton style={{width:'30px', height:'20px'}} onClick={()=>{Swal.fire("자료가 복사되었습니다.\n 필요한곳에 붙여넣기 하세요 Ctrl+V ")} } >
            <CopyToClipboard text={item.text2} >
              <FileCopyIcon style={{color:'white'}} size="small"  /> 
            </CopyToClipboard>
          </IconButton>
        }
        {item.text2  || item.photoData ? 
        <IconButton style={{width:'30px', height:'20px'}} >
          <VisibilityIcon style={{color:'white'}} size="small" onClick={fire} /> 
          </IconButton> : <p/>
        }
        
        {item.title && 
          <IconButton style={{width:'30px', height:'20px'}} >
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

    {item.photoData &&      
      <Card.Img variant="top" src={item.photoData} onClick={()=>{Swal.fire({imageUrl:item.photoData, width:'90%'})}} 
      style={{cursor:"pointer",maxHeight:"105px",margin:"auto"}} />
    }

      <div className="cardTitle" style={{textAlign:"center"}}>
        <Card.Body style={{padding:"8px",height:"55px",overflowY:"auto" }}>
          <Card.Title style={{fontSize:"16px",fontWeight:"900",cursor:"pointer"}}  onClick={fire} > {item.text||''} </Card.Title>
          <Card.Text style={{fontSize:"12px",lineHeight:"6px",padding:"0", whiteSpace:"pre-wrap"  }}> {item.name} </Card.Text>
        </Card.Body>
      </div>
     </Card>









    </div>
  );
}

export default memo(Toolrow);
