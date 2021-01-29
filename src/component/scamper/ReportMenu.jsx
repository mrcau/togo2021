import './reportMenu.css';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ReportMenu({ fireApp, user}) {
const [level, setLevel] = useState(0);
const history = useHistory();
const folder = "scamperReport";
const [data, setdata] = useState({});


// useEffect(() => {
//   fireApp.onAuth((e) => {
//     if (e) {fireApp.authSync('auth',e.uid,(p)=>setLevel(p))}
//     else { console.log('no-User') }
//   })
// }) 

const onSubmit = () => {
  // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
  const data = {
    Report1: scamperReport1.current.value || '',
    Report2: scamperReport2.current.value || '',
    Report3: scamperReport3.current.value || '',
    Report4: scamperReport4.current.value || '',
    Report5: scamperReport5.current.value || '',
    Report6: scamperReport6.current.value || '',
    Report7: scamperReport7.current.value || '',
  }
  //방개수 6개 이하일때만 데이터 저장
  // const roomUid =  roomERef.current.value.substr(0,roomSubstr)
  // const roomget = fireApp.roomGet(folder,roomUid)
  // console.log(folder,roomUid,roomget)
}

const dataDel = () => {
  // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
  // fireApp.dataDel(folder,roomName);        
  scamperReportRef.current.value = '';
  scamperReport1.current.value = '';
  scamperReport2.current.value = '';
  scamperReport3.current.value = '';
  scamperReport4.current.value = '';
  scamperReport5.current.value = '';
  scamperReport6.current.value = '';
  scamperReport7.current.value = '';
}
const scamperReportRef = useRef();
const scamperReport1 = useRef();
const scamperReport2 = useRef();
const scamperReport3 = useRef();
const scamperReport4 = useRef();
const scamperReport5 = useRef();
const scamperReport6 = useRef();
const scamperReport7 = useRef();

  return (
    <div className="reportMenu">
      <button className="btnlink" onClick={() => history.push('/todo')}>Todo</button>
      <button className="btnlink" onClick={() => history.push('/scamper')}>scamper</button>
   
      <form className="scamperReport" ref={scamperReportRef} >
          <div className="s-item">
          <div className="s-itemTitle">S</div>
          <input type="text" className="scamperReport1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport1}  onChange={onSubmit} value={data.Report1} />
          </div>
        
        <div className="reportBox">
          <div className="s-itemTitle">C</div>
          <textarea  className="scamperReport2" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport2} onChange={onSubmit} value={data.Report2} />
        </div>

        <div className="reportBox">
          <div className="s-itemTitle">A</div>
          <textarea  className="scamperReport3" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport3} onChange={onSubmit} value={data.Report3} />
        </div>

        <div className="reportBox">
          <div className="s-itemTitle">M</div>
          <textarea  className="scamperReport4" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport4} onChange={onSubmit} value={data.Report4} />
        </div>

        <div className="reportBox">
          <div className="s-itemTitle">P</div>
          <textarea  className="scamperReport5" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport5} onChange={onSubmit} value={data.Report5} />
        </div>

        <div className="reportBox">
          <div className="s-itemTitle">E</div>
          <textarea  className="scamperReport6" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport6} onChange={onSubmit} value={data.Report6} />
        </div>

        <div className="reportBox">
          <div className="s-itemTitle">R</div>
          <textarea  className="scamperReport7" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperReport7} onChange={onSubmit} value={data.Report7} />
        </div>
        </form>
   
   
   
    </div>
  );
}

export default memo(ReportMenu);