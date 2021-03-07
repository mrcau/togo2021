import './problemReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function ProblemReport({ setLinkCopy, fireProblem, fireSync,user,folder,roomName,setroomName,
  setReport,moveModal2,userInfo, setdata,setEntering,setDoor,roomNameHide}) {
const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {
  //글목록 가져오기
    if(!user){return}
    const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }   
    const roomId = user.uid.substr(0,6)+'REPORT'
    fireSync.reportSync(folder,roomId,cf);     
    //  return ()=>{setData2({})}
 }, [folder,roomName,fireProblem,user,userInfo,fireSync]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'title', headerName: '제목', width: '58vw' },
];

//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2(); roomNameHide();}
  // roomRowReset();  
const rows = Object.values(data2).map((e,i) => { 
  return( { id: i, title: e.text5, ...e}) 
  })

  return (
    <div className="reportMenu"  >
     데이터분석
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{ setdata({...p.data}); setroomName(p.data.dataId);
  setLinkCopy('http://localhost:3000/'+folder+'/'+p.data.dataId+'re');  }}
     onRowClick={()=>{selectRow();}} />
    </div>
  );
}
export default memo(ProblemReport);

