// import './itemrow.css';
import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import {  DeleteForever, } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

function  Itemrow2 ({item,iteme,fireTodo,todayId,buwi}) {
  const folder = "workout";

  // const itemBuwi = item[buwi]
  // const itemSet00 = Object.values(itemBuwi)||'';
  // const itemSet =item;

  // const itemSet0 = Object.values(item);
  // const itemSet1 =Object.values(...itemSet0);
  const itemSet = Object.values(item);
  const itemBody = itemSet[0]
  const now = itemBody.progress;
  let counter = itemBody.progress;

  console.log(itemSet);

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


  const returnData = (e,gameSelect)=>{ 
    // fireTodo.workouttotal(folder,itemBody.uid,todayId,gameSelect,e)
    return e
  }

  return (
    <div className="samtoolitemrow">     <h1>hihi</h1>
          {/* <Card bg={itemSet[0].color} text={'white'} style={{ width: '100%',maxHeight:"280px"  }} className="mb-2" >      
        <Card.Header  style={{display:'flex',justifyContent:"space-between",padding:'2px',height:'30px',background:'black'}} >
          <div>
          <IconButton style={{width:'20px', height:'15px'}} > <DeleteForever onClick={itemDel} style={{color:'white'}} /></IconButton>         
          {itemSet[0].today}
          </div> 
          <div> {itemSet[0].body}</div>
          <div>
          {now}분     
          <button className="btn btn1 btnRoomLink" onClick={plus} >+</button>
          <button className="btn btn2 btnRoomLink" onClick={minus} >-</button>
          </div>
        </Card.Header>      
        <div className="cardTitle" style={{textAlign:"center"}}>
          <Card.Body style={{padding:"8px",overflowY:"auto",maxHeight:"240px"}}>
            <div style={{height:"100%",width:"100%",background:"white",color:"black",borderRadius:"5px"}}>
            {
              itemSet.map((e,i) => { e.workRepeat.map((k)=>{return k + '회 '})
                return <Card.Text style={{fontSize:"15px",lineHeight:"20px",padding:"0",textAlign:'left' }}> 
                💪 {e.gameSelect} {e.workoutSet||1}세트 / 총 
                {
                 returnData( e.workRepeat.reduce(function add(sum, currValue) { return sum + currValue; }, 0),e.gameSelect)

                }회 
                {e.workWeight[0] !==0 && ' / 최대'  }    
                {e.workWeight[0] !==0 && 
                 returnData(  Math.max(...e.workWeight),e.gameSelect) 
                } 

                {e.workWeight[0] !==0 && 'kg'}
                {<br/>}
                {e.workWeight[0] !==0 && <FitnessCenterIcon/> } 
                {e.workWeight[0] !==0 && "무게 : " } 
                {e.workWeight[0] !==0 && <br/>} 
                 <FitnessCenterIcon/> 횟수 : {e.workRepeat.map((e)=>{return e + '회 '})} 
                </Card.Text>
              }) 
            }
            </div>
          </Card.Body>
        </div>
     </Card> */}
    </div>
  );
}

export default memo(Itemrow2);