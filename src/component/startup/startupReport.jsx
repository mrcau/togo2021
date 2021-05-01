import './startupReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function StartupReport({ fireProblem, fireSync,user,folder,enterRoom,roomName,setroomName,roomNameHide,
                  setReport, moveModal2,userInfo, setdata,setEntering,setDoor,setLinkCopy}) {
// const [level, setLevel] = useState(0);
const [data2, setData2] = useState({})
//글목록 담는변수 data2
//데이터싱크 
useEffect(() => {console.log('hello')
//글목록 가져오기
  if(!user){return}
  const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }
  const roomId = user.uid.substr(0,6)+'REPORT'
  fireSync.reportSync(folder,roomId,cf);
}, [folder,roomName,fireProblem,user,userInfo,fireSync]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px',sortable: false, },
  { field: 'date', headerName: '날짜', width: '110px',sortable: false, },
  { field: 'title', headerName: '제목', width: '58vw',sortable: false, },
]
//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2(); roomNameHide();setDoor('퇴장');setEntering(true);}
const rows = Object.values(data2).map((e,i) => {

  return({ id: i, date:e.today, title: e.text1|| '', ...e})

  }) 

  return (
    <div className="reportMenu"  >
     Startup
     <DataGrid  scrollbarSize={10} className="samtoolrow"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{
      setdata(p.data); setroomName(p.data.roomName);enterRoom();setReport(true);
   setLinkCopy('https://samtool.netlify.app/#/'+folder+'/'+p.data.roomName+'re');  }}
      onRowClick={()=>{selectRow();}} />
    </div>
  );
}
export default memo(StartupReport);

