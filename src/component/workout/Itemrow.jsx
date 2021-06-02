// import './itemrow.css';
import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

function  Itemrow ({item,fireTodo,todayId}) {
  const folder = "workout";
  const itemSet = Object.values(item);
  const itemBody = itemSet[0];
  const now = itemBody.progress;
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
  // const changeColor = (p)=>{ fireTodo.itemUp(folder,item.uid,item.dataId,{color:p}) }

  const returnData = (e,gameSelect)=>{ 
    // let sum = [];
    //   if(item){
    //     sum = [...totalsum,e]
    //   }

    // fireTodo.workouttotal(folder,itemBody.uid,todayId,gameSelect,e)
    // console.log(e,gameSelect)
    // return e
  }

  return (
    <div className="samtoolitemrow">      
    {/* height:'120px' bg={itemSet[0].color */ }
      <Card bg={itemSet[0].color} text={'white'} style={{ width: '100%',maxHeight:"280px"  }} className="mb-2" >      
        <Card.Header  style={{display:'flex',justifyContent:"space-between",padding:'2px',height:'30px',background:'black'}} >
          <div>
          <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton>         
          {itemSet[0].today}
          </div> 
          <div>{itemSet[0].body}</div>
          <div>
          {now}분        
          <button className="btn btn1 btnRoomLink" onClick={plus} >+</button>
          <button className="btn btn2 btnRoomLink" onClick={minus} >-</button>
          </div>
        </Card.Header>      
        {/* height:"80px", */}
        <div className="cardTitle" style={{textAlign:"center"}}>
          <Card.Body style={{padding:"8px",overflowY:"auto",maxHeight:"240px"}}>
            <div style={{height:"100%",width:"100%",background:"white",color:"black",borderRadius:"5px"}}>
            {
              Object.values(itemSet).map((e,i) => { 
                return <Card.Text style={{fontSize:"15px",lineHeight:"20px",padding:"0",textAlign:'left' }}> 
                💪 {e.gameSelect} {e.workoutSet||1}세트     
                {
                  e.workRepeat.reduce((first, end)=> { return first + end; })
                } 회 
           
                {
                 returnData( e.workRepeat.reduce((first, end)=> { return first + end; }),e.gameSelect)
                }
                {e.workWeight[0] !==0 && ' / 최대?'  }
                {e.workWeight[0] !==0 && 
                 returnData(  Math.max(...e.workWeight),e.gameSelect) 
                } 
                {e.workWeight[0] !==0 && 'kg'}
                {<br/>}
                {e.workWeight[0] !==0 && <FitnessCenterIcon/> } 
                {e.workWeight[0] !==0 && "무게 : " } 
                {e.workWeight[0] !==0 && e.workWeight.map((e)=>{return e + 'kg '})} 
                {e.workWeight[0] !==0 && <br/>} 
                 <FitnessCenterIcon/> 횟수 : {e.workRepeat.map((e)=>{return e + '회 '})} 
                </Card.Text>
              })
            }
            </div>
          </Card.Body>
        </div>
     </Card>
    </div>
  );
}

export default memo(Itemrow);