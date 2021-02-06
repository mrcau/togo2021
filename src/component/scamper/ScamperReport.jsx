import './scamperReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp, user, folder,roomName,setroomName,
  report,setReport,state,setState,roomNameReset, moveModal2}) {
// const [level, setLevel] = useState(0);
const [data, setData] = useState({})

//데이터싱크 
useEffect(() => {
    const cf = { f1:(p)=> {setData(p) }, f2:()=> {setData({}) } }
    if (roomName) {fireApp.reportSync(folder,roomName,cf); }
    else { console.log('no-User') }
 }, [folder,roomName,fireApp]);

const columns = [
  { field: 'id', headerName: 'I', width: '10vw' },
  { field: 'title', headerName: '제목', width: '40vw' },
  { field: 'date', headerName: '날짜', width: '20vw' }
];
//글 선택
const selectRow = () => {
  setReport(true);
  setState({ ...state, Switch7:true});
  moveModal2();
  roomNameReset();
  console.log('리포트값',roomName,report)
  // setDoor('입장')
}
// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  

const rows = Object.values(data)
.map((e,i) => {return( { id: i, date: e.cDate, title: e.aTitle, roomName:e.roomName}) })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight  rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{setroomName(p.data.roomName)}}
     onRowClick={selectRow} />
    </div>
  );
}
export default memo(ScamperReport);

