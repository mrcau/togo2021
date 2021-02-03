import './toolrow.css';
import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Badge from '@material-ui/core/Badge';
import { ThumbUp } from '@material-ui/icons';

function  Toolrow ({item,fireApp}) {
  const folder = "mytool";
  const Swal = require('sweetalert2');
  // const [video, setVideo] = useState('');
  const fire = () => {Swal.fire({html:item.text2, width:'90%'})}
  const [Switch, setSwitch] = useState(true);

  let counter = item.progress;
  const itemDel=() => {
    fireApp.itemDel(folder,item.uid,item.dataId)
  }
  const plus = () => {
    Switch &&counter++;
    fireApp.itemUp(folder,item.uid,item.dataId,counter)
    setSwitch(!Switch);

  }
  // const minus = () => {
  //   counter>0&&counter--;
  //   fireApp.itemUp(folder,item.uid,item.dataId,counter)
  // }
  return (
    <div className="toolrow">
      <div className="theader">
        <Badge badgeContent={item.progress} color="secondary" style={{paddingRight:'10px'}}>
            <ThumbUp style={{color:'var(--Bcolor)'}} />
        </Badge>
        <div className="headerToday">{item.title}</div>
      </div>
      {/* <div className="title"> {item.text}</div>      */}
      <textarea  className="title" cols="30" rows="2" style={{resize: 'none'}} 
            value= {item.text} />
      <textarea  className="text" cols="30" rows="2" style={{resize: 'none'}} 
            value= {item.text2} />
      <div className="btnG">
        <button className="btn btn0" onClick={plus}>좋아요</button>
        <button className="btn btn1" onClick={fire}>보기</button>
        <CopyToClipboard text={item.text2}>
        <button className="btn btn2" >복사</button>
        </CopyToClipboard>
        <button className="btn btn3" onClick={itemDel}>삭제</button>
      </div>
    </div>
  );
}

export default memo(Toolrow);