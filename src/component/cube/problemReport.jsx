import './problemReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ProblemReport({ setLinkCopy, fireProblem, fireSync,user,folder,roomName,setroomName,
  setReport,moveModal2,userInfo, setdata,setEntering,setDoor,report}) {
const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {  
  //글목록 가져오기
    if(!user){return}
    const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }   
    const roomId = user.uid.substr(0,6)+'REPORT'
    const stopReportSync = fireSync.reportSync(folder,roomId,cf);     
     return ()=>{stopReportSync()}
 }, [folder,roomName,fireProblem,user,userInfo,fireSync,report]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },

];

//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2();setDoor('퇴장');setEntering(true);}

  // roomRowReset();  
const rows = Object.values(data2).map((e,i) => { 
  return( { id: i, title: e.text5, ...e}) 
  })

  return (
    <div className="reportMenu"  >
     큐브툴
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{ setdata({...p.data}); setroomName(p.data.dataId);
  setLinkCopy('https://samtool.netlify.app/#/'+folder+'/'+p.data.dataId+'re');  }}
     onRowClick={()=>{selectRow();}} />
    </div>
  );
}
export default memo(ProblemReport);

