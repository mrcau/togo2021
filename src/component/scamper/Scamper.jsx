import React, { useEffect, useRef, useState } from 'react';
import './scamper.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Scamper({ fireApp, user, userName }) {
  const folder = "scamper";
  const scamperS = useRef();
  const scamperC = useRef();
  const scamperA = useRef();
  const scamperM = useRef();
  const scamperP = useRef();
  const scamperE = useRef();
  const scamperR = useRef();
  const roomERef = useRef();
  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomNum, setRoomNum] = useState('');
  const [roomUid, setRoomUid] = useState('');
console.log('room',room);
console.log('roomNum',roomNum);
  //데이터싱크 
  useEffect(() => {
    fireApp.onAuth((e) => {
      const cf = {
        f1: (p) => { setdata(p) },
        f2: () => { setdata({}) },
        f3: (p) => {setRoom(p)},
        f4: () => {setRoom({})}
      }
      if(e){ 
        const roomUid = e.uid.substr(0,4);
        setRoomUid(e.uid.substr(0,4));
        fireApp.dataSync(folder,roomUid, roomNum,cf);
        fireApp.roomSync(folder,roomUid, cf);
      }
      else{ console.log('no-User')}
    })
  }, [roomNum]);



  // 방입장
  const enterRoom = () => {
    setRoomNum(roomERef.current.value);
  }
  // 관리자 방입장
  const adminEnter = (e) => {
    setRoomNum(e.currentTarget.textContent);
    roomERef.current.value = e.currentTarget.textContent;
  }
  // 방생성
  const createRoom = () => {
    const num = Date.now().toString();
    const roomNum = num.substr(9);
    setRoomNum(roomNum);
    const data = {
      // roomUid : roomUid || '',
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }
    fireApp.roomSave(folder,roomUid, roomNum, data)
  }

  //데이터 저장
  const onSubmit = () => {
    // const dataId = Date.now();
    if (!roomNum) { return }
    const data = {
      // roomUid : roomUid || '',
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }
    fireApp.dataUp(folder,roomUid, roomNum, data)
  }

// 아이템 삭제
// const dataDel = () => {
//   fireApp.dataDel(folder,roomUid,roomNum)  
// }

  return (
    <div className="scamper">
      {userName &&
        <div className="adimBar">
          <div>
            <button className="enterBtn" onClick={createRoom}>개설</button>
          </div>
          <div className="enterNumber">{
            room && 
            Object.keys(room).map((e) =>
            <button key={e} className="btnRoom" onClick={adminEnter} >{e}</button>)
            
            }</div>
        </div>
      }

      <div className="s-header">
        <div className="enterWrap" >
        <button className="enterBtn" onClick={enterRoom}>입장</button>
        <input type="text" className="enterInput" placeholder="방번호" ref={roomERef} />
        </div>
        <div className="enterTitle">SCAMPER</div>
        <div style={{width:'100px'}}>
        <button className="btnRoomDel" > <DeleteForeverIcon/> </button>
        </div>
      </div>

      <div className="s-items">

        <div className="s-item">
          <div className="s-itemTitle">S</div>
          <input type="text" className="s-intemInput input1" ref={scamperS} onChange={onSubmit} value={data.scamS} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">C</div>
          <input type="text" className="s-intemInput input1" ref={scamperC} onChange={onSubmit} value={data.scamC} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">A</div>
          <input type="text" className="s-intemInput input1" ref={scamperA} onChange={onSubmit} value={data.scamA} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">M</div>
          <input type="text" className="s-intemInput input1" ref={scamperM} onChange={onSubmit} value={data.scamM} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">P</div>
          <input type="text" className="s-intemInput input1" ref={scamperP} onChange={onSubmit} value={data.scamP} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">E</div>
          <input type="text" className="s-intemInput input1" ref={scamperE} onChange={onSubmit} value={data.scamE} />
        </div>
        <div className="s-item">
          <div className="s-itemTitle">R</div>
          <input type="text" className="s-intemInput input1" ref={scamperR} onChange={onSubmit} value={data.scamR} />
        </div>

      </div>
    </div>
  );
}

export default Scamper;