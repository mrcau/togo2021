import './scamperReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp, user,userUID, folder,roomName,setroomName,
  report,setReport,setSwitch7,roomRowReset, moveModal2,userInfo, setdata}) {
// const [level, setLevel] = useState(0);
const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {
    const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }
    if (user&&roomName){
    const roomId = roomName.substr(0,6)+'REPORT'
      fireApp.reportSync(folder,roomId,cf);
     }
    else if(user&&!roomName) { fireApp.reportSync(folder,user.uid,cf); }
    else { console.log('no-User') }
    //  return ()=>{setData2({})}
 }, [folder,roomName,fireApp,user,userInfo]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },
];
//글 선택하면 실행함수
const selectRow = () => {
  setReport(true);
  setSwitch7(true);
  moveModal2();
  roomRowReset();
  
}
// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={data2Del}><DeleteForever /></button>  

const rows = Object.values(data2).map((e,i) => {
  return( { id: i, date: e.cDate || '', title: e.aTitle || '', good: e.good7 || '', roomName:e.roomName || '', dataId:e.dataId || '', userId:e.userId || '',
            aTitle:e.aTitle || '',bName:e.bName || '',input3:e.input3 || '',input4:e.input4 || '',input5:e.input5 || '',input6:e.input6 || '',
            scamA:e.scamA || '', scamC:e.scamC || '', scamE:e.scamE || '', scamM:e.scamM || '', scamP:e.scamP || '',scamR:e.scamR || '', scamS:e.scamS || '', 
  }) 
  })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{console.log(p.data); if(roomName){setroomName(p.data.roomName);}else{setdata(p.data)}}}
     onRowClick={selectRow}  />
    </div>
  );
}
export default memo(ScamperReport);

