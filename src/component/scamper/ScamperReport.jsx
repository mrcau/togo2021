import './scamperReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp, user, folder,roomName,setroomName,
  handleClose2,setReport,state,setState,roomNameReset, setDoor,moveModal2}) {
// const [level, setLevel] = useState(0);
const [data, setData] = useState({})
// const [Selection, setSelection] = useState('');

//데이터싱크 
useEffect(() => {
    const cf = { f1:(p)=> {setData(p) }, f2:()=> {setData({}) } }
    if (roomName) {fireApp.reportSync(folder,roomName,cf); }
    else { console.log('no-User') }
 
}, [folder,roomName,fireApp]);

// console.log(Selection);
const columns = [
  { field: 'id', headerName: 'I', width: '10vw' },
  { field: 'title', headerName: '제목', width: '40vw' },
  { field: 'date', headerName: '날짜', width: '20vw' }
];
const selectRow = () => {
  // handleClose2();
  setReport(true);
  setState({ ...state, Switch7:true});
  // drawerRef.current.classList.add("moveDrawer");
  moveModal2();
    console.log(roomName)
  roomNameReset();
  // setDoor('입장')
  // console.log('hihi',Selection)
}
// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  

const rows = Object.values(data)
.map((e,i) => {return( { id: i, date: e.cDate, title: e.aTitle, roomName:e.roomName}) })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight  rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>setroomName(p.data.roomName)}
     onRowClick={selectRow} />
    </div>
  );
}
// onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}
export default memo(ScamperReport);

