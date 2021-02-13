import './scamperReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp, user, folder,roomName,setroomName,
  report,setReport,setSwitch7,roomNameReset, moveModal2}) {
// const [level, setLevel] = useState(0);
const [data, setData] = useState({})

//데이터싱크 
useEffect(() => {
    const cf = { f1:(p)=> {setData(p) }, f2:()=> {setData({}) } }
    if (roomName) {fireApp.reportSync(folder,roomName,cf); }
    else { console.log('no-User') }
 }, [folder,roomName,fireApp]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },
];
//글 선택하면 실행함수
const selectRow = () => {
  setReport(true);
  setSwitch7(true);
  moveModal2();
  // roomNameReset();
}
// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  

const rows = Object.values(data)
.map((e,i) => {return( { id: i, date: e.cDate, title: e.aTitle, good: e.good7, roomName:e.roomName}) })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{setroomName(p.data.roomName)}}
     onRowClick={selectRow}  />
    </div>
  );
}
export default memo(ScamperReport);

