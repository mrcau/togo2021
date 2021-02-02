import './scamperReport.css';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp, user, folder,roomName,handleClose2}) {
// const [level, setLevel] = useState(0);
const history = useHistory();
const [data, setData] = useState({})
const [Selection, setSelection] = useState('');

//데이터싱크 
useEffect(() => {
    const cf = { f1:(p)=> {setData(p) }, f2:()=> {setData({}) } }
    if (roomName) {fireApp.reportSync(folder,roomName,cf); }
    else { console.log('no-User') }
 
}, []);
console.log('select',Selection)

// console.log(Selection);
const columns = [
  { field: 'id', headerName: 'I', width: '10vw' },
  { field: 'title', headerName: '제목', width: '40vw' },
  { field: 'date', headerName: '날짜', width: '20vw' }
];
const selectRow = () => {
  handleClose2();
  console.log('hihi',Selection)
}
// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  

const rows = Object.values(data)
.map((e,i) => {return( { id: i, date: e.cDate, title: e.aTitle}) })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight  rowHeight={25} headerHeight={25}  disableColumnMenu 
     onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}
     onRowSelected={(p)=>setSelection(p.data.id)}
     onRowClick={selectRow} />
    </div>
  );
}

export default memo(ScamperReport);

