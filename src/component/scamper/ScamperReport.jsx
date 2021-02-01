import './scamperReport.css';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp, user, folder,roomName}) {
const [level, setLevel] = useState(0);
const history = useHistory();
const [data, setData] = useState({})
const [Selection, setSelection] = useState([]);
//데이터싱크 
useEffect(() => {
  fireApp.onAuth((e) => {
    const cf = { f1:(p)=> {setData(p) }, f2:()=> {setData({}) } }
    if (e) {fireApp.reportSync(folder,roomName,cf); }
    else { console.log('no-User') }
  })
}, []);
console.log(Selection);
const columns = [
  { field: 'id', headerName: 'ID', width: '13vw' },
  { field: 'title', headerName: '제목', width: '40vw' },
  { field: 'date', headerName: '날짜', width: '20vw' }
];

// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  

const rows = Object.values(data)
.map((e,i) => {return( { id: i, date: e.cDate, title: e.aTitle}) })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid scrollbarSize={10} rows={rows} columns={columns} pageSize={10} 
     autoHeight  rowHeight={25} headerHeight={25}  disableColumnMenu  
     onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}
     onRowClick={()=>{console.log('hi')}} />
    </div>
  );
}

export default memo(ScamperReport);

