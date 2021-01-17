import React, { useRef, useState } from 'react';
import './scamper.css';

function Scamper({fireApp,user,userName}) {

  const roomNumber = '123123';
  const scamperS = useRef(); 
  const scamperC = useRef();
  const scamperA = useRef();
  const scamperM = useRef();
  const scamperP = useRef();
  const scamperE = useRef();
  const scamperR = useRef();
  // const scampers = scamperS.current.value||'';
  // const scamperc = scamperS.current.value||'';
  // const scampera = scamperA.current.value||'';
  // const scamperm = scamperM.current.value||'';
  // const scampere = scamperE.current.value||'';
  // const scamperr = scamperR.current.value||'';
  const [items, setItems] = useState({});
  

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
          <input type="text" className="s-intemInput input1" ref={scamperS} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">C</div>
          <input type="text" className="s-intemInput input1" ref={scamperC}  />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">A</div>
          <input type="text" className="s-intemInput input1" ref={scamperA}  />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">M</div>
          <input type="text" className="s-intemInput input1" ref={scamperM}  />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">P</div>
          <input type="text" className="s-intemInput input1" ref={scamperP}  />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">E</div>
          <input type="text" className="s-intemInput input1" ref={scamperE}  />
        </div>
        <div className="s-item">
          <div className="s-itemTitle">R</div>
          <input type="text" className="s-intemInput input1" ref={scamperR}  />
        </div>

      </div>
    </div>
  );
}

export default Scamper;