import './startupReport.css';
import React, { memo, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

function StartupReport({ fireProblem, fireSync,user,folder,roomName,setroomName,roomNameHide,
                  setReport, moveModal2,userInfo, setdata,setEntering,setDoor}) {
// const [level, setLevel] = useState(0);
//글목록 담는변수 data2
const [data2, setData2] = useState({})
//데이터싱크 
useEffect(() => {
  //글목록 가져오기
    const cf = { f1:(p)=> {setData2(p) }, f2:()=> {setData2({}) } }
    if (user&&roomName){
    const roomId = roomName.substr(0,6)+'REPORT'
    fireSync.reportSync(folder,roomId,cf);
     }
    else if(user&&!roomName) { fireSync.reportSync(folder,user.uid,cf); }
    else { console.log('no-User') }
    //  return ()=>{setData2({})}
 }, [folder,roomName,fireProblem,user,userInfo,fireSync]);

const columns = [
  { field: 'id', headerName: '번호', width: '65px' },
  { field: 'text10', headerName: '제목', width: '58vw' },
];
//글 선택하면 실행함수
const selectRow = () => { setReport(true); moveModal2();roomNameHide();}
const selectRow2 = () => {
   setReport(true); moveModal2(); roomNameHide();
   setEntering(true); setDoor('퇴장');
  }
const rows = Object.values(data2).map((e,i) => {
  return( { id:i, date:e.Date||'', roomName:e.roomName||'', dataId:e.dataId||'', userId:e.userId||'',
          text1:e.text1||'',text2:e.text2||'',text3:e.text3||'',text4:e.text4||'',text5:e.text5||'',
          text6:e.text6||'',text7:e.text7||'',text8:e.text8||'',text9:e.text9||'',text10:e.text10||'',
          text11:e.text11||'',text12:e.text12||'',text13:e.text13||''
  }) 
  }) 

  return (
    <div className="reportMenu"  >
     Startup
     <DataGrid  scrollbarSize={10} className="row"  rows={rows} columns={columns} pageSize={10} 
     autoHeight rowHeight={25} headerHeight={25}  disableColumnMenu 
     onRowSelected={(p)=>{
       if(roomName){setroomName(p.data.roomName);}
       else{ setdata(p.data)}}}
       onRowClick={()=>{if(roomName){selectRow()}else{selectRow2()}}}   />
    </div>
  );
}
export default memo(StartupReport);

