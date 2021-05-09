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
  const itemDel=() => {console.log(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.dataId)
    fireTodo.workoutDel(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.dataId)
  }
  const plus = () => {
    counter<60&&counter++;
    fireTodo.workoutUp(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.dataId,counter)
  }
  const minus = () => {
    counter>0&&counter--;
    fireTodo.workoutUp(folder,itemBody.uid,itemBody.todayId,itemBody.body,itemBody.dataId,counter)
  }
  const now = itemBody.progress;
  
  const changeColor = (p)=>{
      fireTodo.itemUp(folder,item.uid,item.dataId,{color:p})
  }
  return (
    <div className="samtoolitemrow">      
      <Card bg={itemSet[0].color} text={'white'} style={{ width: '100%', height:'120px'}} className="mb-2" >      
        <Card.Header style={{display:'flex',justifyContent:"space-between",padding:'2px',height:'30px'}} >
          <div>
          {itemSet[0].today}
          </div> 
          <div>{itemSet[0].body}</div>
          <div>
          {now}분        
          <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton>         
          <button className="btn btn1" onClick={plus} style={{width:"20px",height:"25px",padding:"0 8px 8px 4px",fontSize:"14px",color:"white",fontWeight:"900"}}>+</button>
          <button className="btn btn2" onClick={minus} style={{width:"20px",height:"25px",padding:"0 8px 8px 4px",fontSize:"14px",color:"white",fontWeight:"900"}}>-</button>
          </div>
        </Card.Header>      

        <div className="cardTitle" style={{textAlign:"center"}}>
          <Card.Body style={{padding:"8px",height:"80px",overflowY:"auto"}}>
            {
              Object.values(itemSet).map((e,i) => { 
                return <Card.Text style={{fontSize:"12px",lineHeight:"5px",padding:"0",textAlign:'left'  }}> 
                {i+1} - {e.gameSelect} {e.workoutSet||1}세트 </Card.Text>
              })
            }
          </Card.Body>
        </div>
     </Card>
    </div>
  );
}

export default memo(Itemrow);