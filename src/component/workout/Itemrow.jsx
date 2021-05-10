// import './itemrow.css';
import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

function  Itemrow ({item,fireTodo,todayId}) {
  const itemSet = Object.values(item);
  const itemBody = itemSet[0];

  const folder = "workout";
  let counter = itemBody.progress;
  const itemDel=() => {
    fireTodo.workoutDel(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.gameSelect)
  }
  const plus = () => {
    if(counter<60){counter = counter+5}
    fireTodo.workoutUp(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.gameSelect,counter)
  }
  const minus = () => {
    if(counter>0){counter = counter-5}
    fireTodo.workoutUp(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.gameSelect,counter)
  }
  const now = itemBody.progress;
  
  const changeColor = (p)=>{
      fireTodo.itemUp(folder,item.uid,item.dataId,{color:p})
  }
  return (
    <div className="samtoolitemrow">      
      <Card bg={itemSet[0].color} text={'white'} style={{ width: '100%', height:'120px'}} className="mb-2" >      
        <Card.Header style={{display:'flex',justifyContent:"space-between",padding:'2px',height:'30px'}} >
          <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton>         
          <div>
          {itemSet[0].today}
          </div> 
          <div>{itemSet[0].body}</div>
          <div>
          {now}분        
          <button className="btn btn1 btnRoomLink" onClick={plus} >+</button>
          <button className="btn btn2 btnRoomLink" onClick={minus} >-</button>
          </div>
        </Card.Header>      

        <div className="cardTitle" style={{textAlign:"center"}}>
          <Card.Body style={{padding:"8px",height:"80px",overflowY:"auto"}}>
            {
              Object.values(itemSet).map((e,i) => { 
                return <Card.Text style={{fontSize:"14px",lineHeight:"5px",padding:"0",textAlign:'left'  }}> 
                {i+1} - {e.gameSelect} {e.workoutSet||1}세트  {e.workWeight||1}kg {e.workRepeat||1}회 
                {/* {e.workRepeat.map((e)=>{return e})}  */}
                
                </Card.Text>
              })
            }
          </Card.Body>
        </div>
     </Card>
    </div>
  );
}

export default memo(Itemrow);