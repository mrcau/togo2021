import './itemrow.css';
import React, { memo } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

function  Itemrow ({item,fireApp}) {
  
  let counter = item.progress;
  const itemDel=() => {
    fireApp.itemDel(item.uid,item.dataId)
  }
  const plus = () => {
    counter<10&&counter++;
    fireApp.itemUp(item.uid,item.dataId,counter)
  }
  const minus = () => {
    counter>0&&counter--;
    fireApp.itemUp(item.uid,item.dataId,counter)
  }
  const now = item.progress*10;
  return (
    <div className="itemrow">
      <div className="theader">
        <div className="headerToday">{item.today}</div> 
        <ProgressBar animated  now={now}  variant="warning"
          style={{height:"12px"}} className="headerProgress"/>
      </div>
      <div className="title">
        {item.title}
      </div>
      <div className="text">
        {item.text}
      </div>
      <div className="btnG">
        <button className="btn0">{item.progress}</button>
        <button className="btn btn1" onClick={plus}>+</button>
        <button className="btn btn2" onClick={minus}>-</button>
        <button className="btn btn3" onClick={itemDel}>완료</button>
      </div>
    </div>
  );
}

export default memo(Itemrow);