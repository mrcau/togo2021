import './problemReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ProblemReport({ fireProblem, fireSync,user,folder,roomName,setroomName,
  setReport,moveModal2,userInfo, setdata,setEntering,setDoor,roomNameHide}) {
// const [level, setLevel] = useState(0);
//글목록 담는변수 data2
const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {
  //글목록 가져오기
    if(!user || !roomName){return}
    const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }
    if (user&&roomName){
    const roomId = roomName.substr(0,6)+'REPORT'
    fireSync.reportSync(folder,roomId,cf);
     }
    //  return ()=>{setData2({})}
 }, [folder,roomName,fireProblem,user,userInfo,fireSync]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },
];
//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2(); roomNameHide();}
const selectRow2 = () => {
   setReport(true); moveModal2();  roomNameHide();
   setEntering(true); setDoor('퇴장');
  }
  // setSwitch7(true);
  // roomRowReset();  

// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={data2Del}><DeleteForever /></button>  
//글목록 data2에서 데이터 하나씩 빼기
const rows = Object.values(data2).map((e,i) => {
  return( { id: i, date: e.cDate || '', title: e.aTitle || '', good: e.good7 || '', roomName:e.roomName || '',
           dataId:e.dataId || '', userId:e.userId || '', aTitle:e.aTitle || '',bName:e.bName || '',
           input3:e.input3 || '',input4:e.input4 || '',input5:e.input5 || '',input6:e.input6 || '',
            scamA:e.scamA || '', scamC:e.scamC || '', scamE:e.scamE || '', scamM:e.scamM || '', scamP:e.scamP || '',scamR:e.scamR || '', scamS:e.scamS || '', 
  }) 
  })

  return (
    <div className="reportMenu"  >
     Problem
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{if(roomName){setroomName(p.data.roomName);}
       else{ setdata(p.data)}}}
       onRowClick={()=>{if(roomName){selectRow()}else{selectRow2()}}}   />
    </div>
  );
}
export default memo(ProblemReport);

