/* eslint-disable react/jsx-no-target-blank */
import React, { memo, useEffect, useState } from 'react';
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
import {  Link, useHistory } from 'react-router-dom';

function  Toolrow ({fireSync,item,level, user,selectFolder}) {
  const folder = "mytool";
  const Swal = require('sweetalert2');
  const fire = () => {Swal.fire({html:item.text2, width:'90%'})}
  const [Switch, setSwitch] = useState(true);
  let counter = item.progress;
  
    // 아이템 삭제
    const itemDel = () => {      
        Swal.fire({ 
          title: '데이터를 삭제하겠습니까?',
          icon:'warning',
          showCancelButton: true})
        .then((result) => {
          if(result.isConfirmed){fireSync.opentoolDel(folder,user.uid,selectFolder,item.dataId)}});
      }      

  const plus = () => {
    Switch &&counter++;
    fireSync.opentoolUp(folder,user.uid,item.dataId,counter)
    setSwitch(!Switch);

  }
  const minus = () => {
    counter>0&&counter--;
    fireSync.opentoolUp(folder,user.uid,item.dataId,counter)
    setSwitch(!Switch);
  }

  const changeColor = (p)=>{
    fireSync.itemColorUp(folder,user.uid,selectFolder,item.dataId,p);
  }


  return (
    <div className="toolrow">

<Card bg={item.color} text={'white'} style={{ width: '12rem',height:'105px' }} className="mb-2" >
      
      <Card.Header style={{display:'flex',justifyContent:"space-between" ,padding:'1px'}} >
         <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> 
        {/* {user.uid===item.uid && */}
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
        {/* } */}
        {item.text2 && 
          <IconButton style={{width:'30px', height:'20px'}} >
            <CopyToClipboard text={item.text2}>
              <FileCopyIcon style={{color:'white'}} size="small"  /> 
            </CopyToClipboard>
          </IconButton>
        }
        {item.text2 && 
          <IconButton style={{width:'30px', height:'20px'}} >
          <VisibilityIcon style={{color:'white'}} size="small" onClick={fire} /> 
          </IconButton>
        }
        

        {/* <IconButton style={{width:'20px', height:'15px'}} >
          <Badge badgeContent={item.progress} color="secondary"   
            anchorOrigin={{vertical: 'top', horizontal: 'right', }}> 
          <ThumbUp style={{color:'white'}} size="small" onClick={Switch?plus:minus} />
          </Badge>
        </IconButton> */}
        {item.title && 
        <IconButton style={{width:'30px', height:'20px'}} >
           <a className="iconLink" href={item.title} target="_blank">
               <LinkIcon />
           </a>
        </IconButton>
        }

        </Card.Header>      
      <div className="cardTitle" style={{textAlign:"center"}}>
        <Card.Body style={{padding:"8px",height:"65px",overflowY:"auto" }}>
        {/* <Card.Title style={{fontSize:"14px",fontWeight:"900",lineHeight:"14px"}} > {item.title||''}  </Card.Title>  */}
          <Card.Text style={{fontSize:"12px",lineHeight:"14px",padding:"0", whiteSpace:"pre-wrap" }}> {item.text||''} </Card.Text>
        </Card.Body>
      </div>
     </Card>


    </div>
  );
}

export default memo(Toolrow);
