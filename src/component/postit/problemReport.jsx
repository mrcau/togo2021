import './problemReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ProblemReport({ setLinkCopy, fireSync,user,folder,roomName,setroomName,enterRoom,
  setReport,moveModal2,userInfo, setItems,setDoor,roomNameHide,setEntering}) {
const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {
  //글목록 가져오기
    if(!user){return}
    const cf = { f1:(p)=> {setData2(p); }, f2:()=> {setData2({}) } }   
    const roomId = user.uid.substr(0,6)+'REPORT'
    fireSync.reportSync(folder,roomId,cf);     
 }, [folder,roomName,user,userInfo,fireSync]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },
];

//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2(); roomNameHide();setDoor('퇴장');setEntering(true);}
  // roomRowReset();  
const rows = Object.values(data2).map((e,i) => { 
  return({ id: i, title: Object.values(e)[0].title, ...e}) 
  })

  return (
    <div className="reportMenu"  >
     포스툴
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{ 
     setItems(p.data); setroomName(p.data.roomName);enterRoom();setReport(true);
  setLinkCopy('https://samtool.netlify.app/#/'+folder+'/'+p.data.roomName+'re');  }}
     onRowClick={()=>{selectRow();}} />
    </div>
  );
}
export default memo(ProblemReport);

