import './scamperReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ScamperReport({ fireApp,fireProblem,setLinkCopy,enterRoom, fireSync,user,folder,roomName,setroomName,
  setReport,moveModal2,userInfo, setdata,setEntering,setDoor,roomNameHide}) {
    const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {console.log('hello')
//글목록 가져오기
  if(!user){return}
  const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }
  const roomId = user.uid.substr(0,6)+'REPORT'
  fireSync.reportSync(folder,roomId,cf);
}, [folder,roomName,fireProblem,user,userInfo,fireSync]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },
];
//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2(); roomNameHide();setDoor('퇴장');setEntering(true);}
  // roomRowReset();  
// level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={data2Del}><DeleteForever /></button>  
//글목록 data2에서 데이터 하나씩 빼기
const rows = Object.values(data2).map((e,i) => {
  return( { id: i, date: e.cDate || '', title: e.input4 || '', good: e.good7 || '', roomName:e.roomName || '', dataId:e.dataId || '', userId:e.userId || '',
            aTitle:e.aTitle || '',bName:e.bName || '',input3:e.input3 || '',input4:e.input4 || '',input5:e.input5 || '',input6:e.input6 || '',
            scamA:e.scamA || '', scamC:e.scamC || '', scamE:e.scamE || '', scamM:e.scamM || '', scamP:e.scamP || '',scamR:e.scamR || '', scamS:e.scamS || '', 
  }) 
  })

  return (
    <div className="reportMenu"  >
     SCAMPER
     <DataGrid  scrollbarSize={10} className="samtoolrow"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{
      setdata(p.data); setroomName(p.data.roomName);enterRoom();setReport(true);
   setLinkCopy('https://samtool.netlify.app/#/'+folder+'/'+p.data.roomName+'re');  }}
      onRowClick={()=>{selectRow();}} />
    </div>
  );
}
export default memo(ScamperReport);

