import React, { useEffect, useRef, useState } from 'react';
import './scamper.css';

function Scamper({ fireApp, user, userName }) {
  const folder = "scamper";
  const roomNumber = '123123';
  const scamperS = useRef();
  const scamperC = useRef();
  const scamperA = useRef();
  const scamperM = useRef();
  const scamperP = useRef();
  const scamperE = useRef();
  const scamperR = useRef();
  const [items, setItems] = useState({});

  //데이터싱크 
  useEffect(() => {    
    fireApp.onAuth((e) => {
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   e ? fireApp.itemSync(folder,e.uid, cf):console.log('no-User')
    })
  }, []);



  //데이터 저장
  const onSubmit = () => {
    const dataId = Date.now();
    const data = {
      uid: user.uid,
      dataId: dataId,
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }
    fireApp.dataSave(folder,data)
  }



  return (
    <div className="scamper">
      {userName &&
        <div className="adimBar">
          <div className="enterNumber">방번호 {roomNumber} </div>
          <button className="enterBtn">방개설</button>
        </div>
      }

      <div className="s-header">
        <div className="enterWrap" >
          <div className="enterNumber">방번호 {roomNumber} </div>

        </div>
        <div className="enterTitle">SCAMPER</div>
        <input type="text" className="enterInput" placeholder="방번호" />
        <button className="enterBtn">입장</button>
      </div>

      <div className="s-items">

        <div className="s-item">
          <div className="s-itemTitle">S</div>
          <input type="text" className="s-intemInput input1" ref={scamperS} onChange={onSubmit} value={items.scamS}/>
        </div>

        <div className="s-item">
          <div className="s-itemTitle">C</div>
          <input type="text" className="s-intemInput input1" ref={scamperC} onChange={onSubmit} value={items.scamC}/>
        </div>

        <div className="s-item">
          <div className="s-itemTitle">A</div>
          <input type="text" className="s-intemInput input1" ref={scamperA} onChange={onSubmit} value={items.scamA}/>
        </div>

        <div className="s-item">
          <div className="s-itemTitle">M</div>
          <input type="text" className="s-intemInput input1" ref={scamperM} onChange={onSubmit} value={items.scamM}/>
        </div>

        <div className="s-item">
          <div className="s-itemTitle">P</div>
          <input type="text" className="s-intemInput input1" ref={scamperP} onChange={onSubmit} value={items.scamP}/>
        </div>

        <div className="s-item">
          <div className="s-itemTitle">E</div>
          <input type="text" className="s-intemInput input1" ref={scamperE} onChange={onSubmit} value={items.scamE} />
        </div>
        <div className="s-item">
          <div className="s-itemTitle">R</div>
          <input type="text" className="s-intemInput input1" ref={scamperR} onChange={onSubmit} value={items.scamR}/>
        </div>

      </div>
    </div>
  );
}

export default Scamper;