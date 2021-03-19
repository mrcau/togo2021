// import './itemrow.css';
import React, { memo } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Card } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

function  Itemrow ({item,fireTodo}) {
  const folder = "todo";
  let counter = item.progress;
  const itemDel=() => {
    fireTodo.itemDel(folder,item.uid,item.dataId)
  }
  const plus = () => {
    counter<10&&counter++;
    fireTodo.itemUp(folder,item.uid,item.dataId,counter)
  }
  const minus = () => {
    counter>0&&counter--;
    fireTodo.itemUp(folder,item.uid,item.dataId,counter)
  }
  const now = item.progress*10;
  
  const changeColor = (p)=>{
      fireTodo.itemUp(folder,item.uid,item.dataId,{color:p})
  }
  return (
    <div className="itemrow">
      
      
<Card bg={item.color} text={'white'} style={{ width: '12rem',height:'120px' }} className="mb-2" >      
      <Card.Header style={{display:'flex',justifyContent:"space-between",padding:'2px',height:'30px'}} >
         <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton> 
        
        <ProgressBar animated  now={now}  variant="warning" style={{height:"12px",width:"500px",marginTop:"5px"}} className="headerProgress"/>
         
        <button className="btn btn1" onClick={plus} style={{width:"40px",height:"25px",padding:"0 8px 8px 8px",fontSize:"14px",color:"white",fontWeight:"900"}}>+</button>
        <button className="btn btn2" onClick={minus} style={{width:"40px",height:"25px",padding:"0 8px 8px 8px",fontSize:"14px",color:"white",fontWeight:"900"}}>-</button>
      </Card.Header>      

      <div className="cardTitle">
        <Card.Body style={{padding:"8px",height:"80px",overflowY:"auto" }}>
           <Card.Title style={{fontSize:"16px",fontWeight:"900",color:"black",margin:"0"}} >  {item.title} </Card.Title>
          <Card.Text style={{fontSize:"12px",lineHeight:"14px",padding:"0" }}> {item.text||''} </Card.Text>
        </Card.Body>
      </div>
     </Card>
      
{/*       
      
      <div className="theader">
        <div className="headerToday">{item.today}</div> 
      </div>
      <div className="title">
        {item.title}
      </div>
      <textarea  className="text" cols="30" rows="2" style={{resize: 'none'}} 
            value= {item.text} />
      <div className="btnG">
        <button className="btn0">{item.progress}</button>
        <button className="btn btn3" onClick={itemDel}>완료</button>
      </div> */}

    </div>
  );
}

export default memo(Itemrow);