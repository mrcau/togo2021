import { Badge, IconButton, Switch,Tooltip } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, ThumbUp,InsertEmoticon  } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './problem.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import ProblemReport from './problemReport';
import Swal from 'sweetalert2';
import placeholder from './placeholder';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory,useParams } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';

function Problem({ fireProblem, fireSync, user, userInfo ,setlogoName }) {
  const folder = "problem";
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const today = new Date().toLocaleDateString();
  
  const aTitle = useRef();
  const bName = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const problemS = useRef();
  const problemC = useRef();
  const problemA = useRef();
  const problemM = useRef();
  const problemP = useRef();
  const roomERef = useRef();
  const formRef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const drawerRef = useRef();
  const backRef = useRef();
  const history = useHistory();

  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const {id}=useParams();
  const [roomName, setroomName] = useState('');
  // const '' = userInfo ? userInfo.user.substr(0, 6) :'';
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [state, setState] = useState({ triz:false,  Switch7:true });
  const placeData = state.triz ? placeholder[1] : placeholder[0];
  const [rightModal,setrightModal] = useState(false);
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true)
  //입장중
  const [door, setDoor] = useState('입장')
  const [report, setReport] = useState(false);
  const [userUID, setUserUID] = useState('');
  const [reportInput, setReportInput] = useState(false);
  const [roomAdmin, setroomAdmin] = useState(false)
  const [userClass, setUserClass] = useState(false)
  const [linkCopy, setLinkCopy] = useState('');
  setlogoName(' 문제찾기');

    //링크접속
    useEffect(() => {     
      if(id.length===10){ 
          const enterRoomId =  id.substr(0,roomSubstr)||"";
          const cf1 = { 
          f1: ()=>{setroomName(id); setRoomUid(enterRoomId);setDoor('퇴장');setReport(false);
          setEntering(true);  setSee(false);roomERef.current.value =id;},      
          f2: (p) => { setdata(p) },     
          f3: (p) => { setRoom(p) }, 
          f4: (host) => { setroomName(""); roomNameReset(); setEntering(false)}
        }          
        const stoproomSync = fireSync.roomUser(folder,id,cf1);
        return ()=>{stoproomSync();}
      }
      
      else if(id.length===12){ console.log('hi',id)
        const enterRoomId =  id.substr(0,roomSubstr)||"";
        const cf = { 
        f1: ()=>{setroomName(id.substr(0,10)); setRoomUid(enterRoomId);setDoor('퇴장');setReport(true); setReportInput(true);  
        setEntering(true);  setSee(false);roomERef.current.value ='';},      
        f2: (p) => { setdata(p) },     
        f3: (p) => { setRoom(p) }, 
        }                      
        const stoproomSync =fireSync.roomUser3(folder,id,cf); 
         return ()=>{stoproomSync();}
      }
     },[fireSync,roomName])


     //일반접속
useEffect(() => { 
  fireSync.onAuth((e) => { 
    if(!e&&!roomName){ return}
    if(data.userId){ if(data.userId === user.uid){setUserClass(true)} }          
    if(roomName && e){ console.log('룸네임있고 로그인',roomName)
      if(roomName.substr(0,6) === user.uid.substr(0,6)){setroomAdmin(true); console.log('roomAdmin1 리포트false!',roomAdmin)} 
      }else if(!roomName&&level>0){ setroomAdmin(true) ;console.log('roomAdmin2 리포트false!',roomAdmin,roomName,level)}    
    const cf = {  f1: (p) => { setdata(p) },  f2: () => { setdata({}) },
                  f3: (p) => { setRoom(p) },   f4: () => { setRoom({}) },
               }
    if (e && report===false && id.length<10) {   console.log(data,user)
    setRoomUid(e.uid.substr(0, roomSubstr));
    setUserUID(e.uid);
    const stopDataSync = fireSync.dataSync(folder, roomName, cf);
    const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
    if(data.userId){ if(data.userId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true)}  }
    return ()=>{stopDataSync();stoproomSync(); }
    }       
    else  if(e && report){ console.log('로그인 레포트',data,roomName,report,data.roomName);
    if(data.roomName){ 
      if(data.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true); setdata(data); setReport(true);} 
    }
    } 
    else {return}
  }
  )
}, [roomName,fireSync,report,roomUid,user,userInfo]);




  //수업자료와 공지사항 싱크
  useEffect(() => {    
    if(roomName&&!report){ 
      const stopvideoSync = fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      const stopvideoSync2 = fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p); })
        return ()=>{stopvideoSync(); stopvideoSync2(); }
    }     
  },[fireSync,roomName,report]);
  
//입장자 카운팅
// useEffect(() => {
//   if(entering&&roomERef.current.value&&roomName){
//     let num = ++data['enterMan']||0 ;
//     console.log(entering,folder,num,roomName,data['enterMan'])
//     fireSync.cubeUp(folder,roomName, {enterMan:num});
//   }
//   return ()=>{manMinus();}
// },[entering])

    // 좋아요
    const [Switch0, setSwitch0] = useState(true);
    const [Switch1, setSwitch1] = useState(true);
    const [Switch2, setSwitch2] = useState(true);
    const [Switch3, setSwitch3] = useState(true);
    
    const goodPlus = (goodNum,Switch,setSwitch) => {
        if(data[goodNum]===undefined){data[goodNum]=0}
        if(roomName){
      Switch ? data[goodNum]++ : data[goodNum]--;
      setSwitch(!Switch);
      fireProblem.goodUp(folder, roomName,goodNum,data[goodNum]);
      }
    }
    
    const goodPlus2 = (goodNum,Switch,setSwitch) => {
      setReport(true);
      if(data[goodNum]===undefined){data[goodNum]=0}
        if(roomName){
        Switch ? data[goodNum]++ : data[goodNum]--;
        setSwitch(!Switch);
      fireProblem.goodUpB(folder, roomName,goodNum,data[goodNum]);
      }
    }
    //오른쪽 모달 핸들링
    const moveModal = () => {
      roomNameReset2();setEntering(false);
      drawerRef.current.classList.add("moveDrawer");
      backRef.current.classList.remove("backNone");    
      setrightModal(true);

    }
    const moveModal2 = () => {
      drawerRef.current.classList.remove("moveDrawer");
      backRef.current.classList.add("backNone"); 
      setrightModal(true);
    }
      //스위치 핸들링
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
  //모달창3
  const fire = () => {
    if(!video){return}
    Swal.fire({html:video, width:'90%'})
  }

  // 자료입력 모달
  const fireInsert = async(e)=>{
    e.preventDefault();
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: '참고자료',
      inputPlaceholder: '이곳에 자료를 입력해주세요.',
      inputAttributes: {'aria-label': 'Type your message here'},
      showCancelButton: true
    })
    if (text) {
      Swal.fire(text)
    fireProblem.videoSave(folder, user.uid,'See', text);
    }
  }

  let good =[data.good0,data.good1,data.good2,data.good3,data.good4,
            data.good5,data.good6,data.good7]

  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    const dataId = Date.now();
    // setroomName(newRoom);
    const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'',aTitle:'',bName: '',input3: '', 
      input4: '',input5: '',input6: '',  good0:0, good1:0, good2:0, good3:0, good4:0, good5:0, good6:0, good7:0,
      userId:user.uid||'',
      enterMan:0,
      dataId: dataId,      
      uid : user.uid||'',
      name: userInfo.name||'',
      roomName : newRoom,
      roomUid : num,
      host:'입장'
    }
  
    const abc = fireProblem.roomGetSave2(folder, newRoom, data, level)
    if(abc){adminEnter2(newRoom)}else{return}
  }

    //데이터 리셋
    const dataReset = () => {         
      aTitle.current.value = '';
      bName.current.value = '';
      input3.current.value = '';
      input4.current.value = '';
      input5.current.value = '';
      input6.current.value = '';
      problemS.current.value = '';
      problemC.current.value = '';
      problemA.current.value = '';
      problemM.current.value = '';
      problemP.current.value = '';
      // roomERef.current.value = '';
    }
      
    // input roomName 초기화
    const roomNameReset=() => {
      fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
      fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1); 
      const cf = {    
        f1: (p) => { setdata({}) },  f2: () => { setdata({}) },
        f3: (p) => {  setRoom({}) }, f4: () => { setRoom({}) },
        }
      const cf2 = () => { setdata({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);

      history.push('/problem/:id');  setdata({});     
      dataReset();setroomName("");setDoor('입장'); setRoomUid('');
      setReport(false); setEntering(false); setSee(true); setRoom({});
      setNotice('');setVideo('');
      // history.push('/problem/:id');
      roomERef.current.value=''; 
      if(!report){
        if(user.uid){
          if(user.uid.substr(0,roomSubstr)===roomName.substr(0,roomSubstr)){
            fireSync.cubeUp(folder,roomName, {host:'퇴장',enterMan:0});
          }}
        }
    }  

    const roomNameReset2=() => {
      fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
      fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1); 
      const cf = {    
        f1: (p) => { setdata({}) },  f2: () => { setdata({}) },
        f3: (p) => {  setRoom({}) }, f4: () => { setRoom({}) },
        }
      const cf2 = () => { setdata({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);
      history.push('/problem/:id');  setdata({});     
      dataReset();setroomName("");setDoor('입장'); setRoomUid('');
      setReport(false); setEntering(false); setSee(true); setRoom({});
      setNotice('');setVideo('');
      roomERef.current.value=''; 

    }  
    //카운터 줄이기
    // const manMinus = () => {
    //   let num = 0;
    //   if(data['enterMan']>0){ num=--data['enterMan']}else{return}
    //   fireSync.cubeUp(folder, roomName,{enterMan:num} );
    //   return;
    // }
    // const manStart = (roomvalue) => {
    //   fireSync.cubeUp(folder,roomvalue,{enterMan:1});
    //   return;
    //   }

    const roomNameHide = ()=>{roomERef.current.value=''; }
    const roomRowReset=() => {
      roomERef.current.value=''; 
      const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'', aTitle:'',bName: '',input3: '',input4:'',input5:'',input6:'', roomName:''}
      setdata(data);
      setDoor('입장'); 
      // setRoomUid('');
      // setRoom({});
      setNotice('');setVideo('');
    }  

           
  // roomName.substr(0,6) 방입장
  const enterRoom = () => {
    const roomvalue = roomERef.current.value || "";
    const enterRoomId =  roomERef.current.value.substr(0,roomSubstr)||"";
    // if(entering&&roomvalue){roomNameReset(); }else if(entering&&!roomvalue){roomRowReset();}
    if(entering){setEntering(false); roomNameReset(); setroomName("");setDoor('입장'); }  
      if(roomvalue.length !== 10){return;}
      if(roomvalue.length === 10&&!entering){
        const cf1 = { 
          f1: ()=>{setroomName(roomvalue); setRoomUid(enterRoomId);setDoor('퇴장');setReport(false);
          setEntering(true);  setSee(false);},      
          f2: (p) => { setdata(p) },     
          f3: (p) => { setRoom(p) }, 
          f4: (host) => { setroomName(""); roomNameReset(); setEntering(false)}
        }          
 fireSync.roomUser(folder,roomvalue,cf1)
//  .then(()=>{ manStart(roomvalue); })        
        }
    }

  // 관리자 방입장
  const adminEnter = (e) => {
    // roomNameReset();
    setEntering(true);
    const textRoom = e.currentTarget.textContent;
    const roomMap = Object.keys(room);
    const roomNumber = roomMap[textRoom]
    const roomname = roomUid +roomNumber;
    setroomName(roomname);
    setLinkCopy('https://samtool.netlify.app/#/'+folder+'/'+roomname);  
    roomERef.current.value =roomname;     
    setReport(false); 
    setDoor('퇴장');
    setSwitch0(true); setSwitch1(true); 
    setSwitch2(true); setSwitch3(true); 
    const cf2 = {
      f1: (p) => { setdata(p);  },
      f2: () => { setdata({}) },
      f3: (p) => { setRoom(p) },
      f4: () => { setRoom({}) },
    }
  fireSync.dataSync(folder,roomname, cf2);
  fireSync.cubeUp(folder,roomname, {host:'입장',roomName:roomname});
  }
  // 관리자 방입장2
  const adminEnter2 = (e) => {
    setEntering(true);
    const roomname = e;
    setroomName(roomname);
    setLinkCopy('https://samtool.netlify.app/#/'+folder+'/'+roomname);  
    roomERef.current.value =roomname; 
  setReport(false); 
  setDoor('퇴장');       
  const cf2 = {
    f1: (p) => { setdata(p);  },
    f2: () => { setdata({}) },
    f3: (p) => { setRoom(p) },
    f4: () => { setRoom({}) },
  }
fireSync.dataSync(folder,roomname, cf2);
fireSync.cubeUp(folder,roomname, {host:'입장',roomName:roomname});
}
// notice 저장 - 공지 보내기
  const noticeUp = (e) => {
    e.preventDefault();
    const data = noticeRef.current.value;
    fireProblem.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';
    
  }
  //problem 글 데이터 저장, 방개수 6개 이하일때만 데이터 저장
  const onSubmit = () => {
    if (roomName!==roomERef.current.value||roomERef.current.value===''||report) {return }
    const dataId = Date.now();

    const data = {
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',
      input3: input3.current.value || '',
      input4: input4.current.value || '',
      input5: input5.current.value || '',
      input6: input6.current.value || '',
      scamS: problemS.current.value || '',   scamC: problemC.current.value || '',
      scamA: problemA.current.value || '',
      scamM: problemM.current.value || '',
      scamP: problemP.current.value || '',      
      uid: user.uid||'',
      dataId: dataId,
      name: userInfo.name||'',
      today: today,
      progress: 0,
    }    
    // const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    // fireProblem.dataUp(folder, roomERef.current.value, data);
    if(roomName){fireProblem.dataUp(folder, roomName, data);}
  }


   // 보고서 제출
   const btnInput = (e) => {
     if (!roomName||!userUID) { return }
    e.preventDefault();
    const today = new Date().toLocaleDateString().substr(5);
    const dataId =  Date.now();
    const data = {
      cDate : today|| '', 
      dataId : dataId|| '',
      userId : user.uid|| '',
      roomName:roomName || '',
      good7:0,
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',
      input3: input3.current.value || '',
      input4: input4.current.value || '',
      input5: input5.current.value || '',
      input6: input6.current.value || '',
      scamS: problemS.current.value || '',
      scamC: problemC.current.value || '',
      scamA: problemA.current.value || '',
      scamM: problemM.current.value || '',
      scamP: problemP.current.value || '',
    }
    const roomUid =  roomERef.current.value.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    if(!aTitle.current.value){
        Swal.fire({title:'처음문제를 입력해주세요.',icon:'warning'})}
    else if(!problemP.current.value){
          Swal.fire({title:'최종문제를 입력해주세요.',icon:'warning'})}
    else{
      Swal.fire({title:'내용을 저장하겠습니까?', showCancelButton: true}).then((result)=>{
        if(result.isConfirmed){
          Swal.fire({title:'제출완료',icon:'success'});
          fireProblem.reportSave(folder, roomId, roomName, data);
        }
      })       
    }
  }
  
   //데이터 초기화
   const dataRefresh = ()=>{     
    Swal.fire({ 
      title: '전체 내용을 삭제하겠습니까?',
      icon:'warning',
      showCancelButton: true})
    .then((result) => { if(result.isConfirmed){ 
      const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'',aTitle:'',bName: '',input3: '', 
      input4: '',input5: '',input6: '',  good0:0, good1:0, good2:0, good3:0, good4:0, good5:0, good6:0, good7:0,}
      fireProblem.dataUp(folder, roomName, data);
      Swal.fire('삭제되었습니다.');       
    }});
 }

    // 아이템 삭제
  // const dataDel = () => {
  //   if(report && data.dataId && data.userId === user.uid){ console.log('리포트 삭제')
  //       Swal.fire({ 
  //         title: '정보를 삭제하겠습니까?',
  //         text:"삭제될 게시물 : "+data.aTitle,
  //         icon:'warning',
  //         showCancelButton: true})
  //       .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
  //       const roomUid =  roomName.substr(0,roomSubstr);
  //       const roomId = roomUid+'REPORT';
  //       fireProblem.reportDel(folder,roomId,roomName)
  //       dataReset();
  //       }});
  //     }
      
  //     if(data.userId === user.uid){  console.log('일반 삭제')
  //     Swal.fire({ 
  //       title: '토론방을 삭제하겠습니까?',
  //       text:"삭제될 토론방 : "+roomName,
  //       icon:'warning',
  //       showCancelButton: true})
  //     .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
  //     fireProblem.dataDel(folder,roomName);   
  //     roomNameReset2();
  //     }});
  //   }    
  // } 
    // 아이템 삭제
    const dataDel = () => {  
      if(!report){
      if(!roomName||!user||data.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}
      }
      if(Object.entries(data).length<1){ return}
      let entry = Object.entries(data)||[];
      const itemUid = entry[0][1].uid||'';
      if(!report && data.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){ console.log('뻥',roomName)
        Swal.fire({ 
          title: '토론방을 삭제하겠습니까?',
          text:"삭제될 토론방 : "+roomName,
          icon:'warning',
          showCancelButton: true})
        .then((result) => { if(result.isConfirmed){ 
        fireProblem.dataDel(folder,roomName); 
          Swal.fire('삭제되었습니다.');
          roomNameReset2();
        }});
        }  
  
        if(report&&data.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){ 
        Swal.fire({ 
          title: '토론방을 삭제하겠습니까?',
          text:"삭제될 토론방 : "+data.roomName,
          icon:'warning',
          showCancelButton: true})
        .then((result) => { if(result.isConfirmed){ 
          const roomUid =   user.uid.substr(0,roomSubstr);
          const roomId = roomUid+'REPORT';
          fireProblem.reportDel(folder,roomId,data.roomName);   
          Swal.fire('삭제되었습니다.');
          roomNameReset();
          setEntering(false); 
          // manMinus();
          setroomName("");setDoor('입장'); 
        }});
      }    
    } 
//  console.log(report)
//titleRef.current.classList.add("noticeFly");
  return (
    <div className="samtoolproblem" >     

    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <ProblemReport enterRoom={enterRoom} setLinkCopy={setLinkCopy} fireSync={fireSync} fireProblem={fireProblem} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo} 
      moveModal2={moveModal2} report={report} setdata={setdata} setDoor={setDoor} setEntering={setEntering}  /> 
    }
    </div>
    <div className="drawerback backNone" ref={backRef} onClick={moveModal2}  style={{zIndex:"1"}}></div>
       
       
    {roomAdmin &&
        <div className="RoomLink">
          <div style={{flex:"1"}}> <button className="btnRoomLink" onClick={createRoom} style={{width:"100%"}}>룸개설</button> </div>
          <div style={{flex:"1"}}> 
            <button className="btnRoomLink" style={{width:"100%"}} 
            onClick={()=> { if(roomName){Swal.fire({ title: '링크가 복사되었습니다.',text:linkCopy,icon:'warning'});}}}>
               <CopyToClipboard text={linkCopy}>               
               <span>룸링크</span>
               </CopyToClipboard>
            </button>
           </div>           
          <div style={{flex:"1"}}> <button className="btnRoomLink" onClick={fireInsert} style={{width:"100%"}}>공유자료</button> </div>
          <div style={{flex:"1"}}> <button className="btnRoomLink" onClick={moveModal} style={{width:"100%"}}>저장자료</button> </div>
        </div>
      }

      {roomAdmin &&
        <div className="samtoolAdminbar">       
         <div className="enterNumber" style={{fontSize:'small'}}>
           {see && room && Object.keys(room).map((e,i) => e.length>3 &&
             <button key={e} className="btnRoom" onClick={adminEnter} >{i}</button>) 
           }
         </div>
       </div>
      }

      <div className="s-header" style={{display:'flex'}}>
        <div className="enterWrap" >
          <button className="btnRoomLink" onClick={enterRoom} style={{width:"40px"}} >{door}</button>
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'80px'}} ref={roomERef}/>
        </div>

        {roomAdmin && !report &&
         <IconButton size="small"  onClick={btnInput} style={{color:"var(--Bcolor)",flex:"1"}}>
         <Tooltip arrow placement="top"  title="저장" style={{width:"30px"}}>
                <SaveIcon /> 
          </Tooltip>
          </IconButton>
        }
          {/* 스위치호출 */}
        <div className="enterTitle" >
          <span > 관찰 </span>
          <Switch checked={state.triz} name="triz" onChange={handleChange} size="small" 
          color="default" />  
          <span > 공감 </span>
        </div>    

        {roomAdmin && !report &&
          <IconButton size="small"  onClick={dataRefresh} style={{color:"var(--Bcolor)",flex:"1"}}>
         <Tooltip arrow placement="top"  title="초기화" style={{width:"30px"}}>
                <ReplayIcon /> 
          </Tooltip>
          </IconButton>
          } 

        {roomAdmin && 
          <IconButton size="small"  onClick={dataDel} style={{color:"var(--Bcolor)",flex:"1"}}>
         <Tooltip arrow  placement="top" title="룸삭제" style={{width:"30px"}}>
                <DeleteForever />  
          </Tooltip>
          </IconButton>
        }
        
           {video&&
          <button style={{width:'150px',cursor:"pointer"}}  className="btnRoomLink"  onClick={fire}>공유자료</button>          
        }

      </div>
   
      {roomAdmin && 
        <form className="samtoolAdminbar"  onSubmit={noticeUp} >
          <input type="text" className="enterInput" placeholder="전달사항" ref={noticeRef} />
        </form>
      }
        {/* <div className="noticeTitle" > 공지 </div> */}
      <div className="s-header noticeHeader" ref={titleRef}>
        {/* 접속자 카운트 */}
        <Badge badgeContent={data.enterMan||0} color="error" style={{width:'40px', paddingLeft:'10px',marginTop:'2px'}}>
          <InsertEmoticon /> 
        </Badge> 
        <div className="enterTitle" >{notice}</div>  
      </div>      

        <form className="s-items" ref={formRef} >         
          <div className="inputBox" >
            <div className="s-itemTitle" style={{width:"100%"}}>5WHY질문</div>
            <textarea cols="30" rows="1" className="problemInput saminput1" ref={aTitle} style={{padding:"3px",background:"lightpink"}}
            onChange={onSubmit} value={data.aTitle} placeholder="처음문제 : 해결하려고 하는 문제는?" />
            <textarea cols="30" rows="1" className="problemInput saminput2" ref={bName} 
            onChange={onSubmit} value={data.bName} placeholder={placeData.why1} />
            <textarea cols="30" rows="1" className="problemInput saminput3" ref={input3} 
            onChange={onSubmit} value={data.input3} placeholder={placeData.why2} />            
            <textarea cols="30" rows="1" className="problemInput saminput4" ref={input4} 
            onChange={onSubmit} value={data.input4} placeholder={placeData.why3} />
            <textarea cols="30" rows="1" className="problemInput saminput5 " ref={input5} 
            onChange={onSubmit} value={data.input5} placeholder={placeData.why4} />
            <textarea cols="30" rows="1" className="problemInput saminput6" ref={input6} 
            onChange={onSubmit} value={data.input6} placeholder={placeData.why5} />            
          </div>   
          
          <div className="s-item">
            <div className="s-itemTitle" sty>{placeData.title1} 
            {!report && roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[0]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good0',Switch0,setSwitch0)} />
              </Badge>            
            </IconButton> }
            </div>
            <textarea  className="s-intemInput saminput1" cols="30" rows="2" placeholder={placeData.text1} 
            ref={problemS}  onChange={onSubmit} value={data.scamS} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title2}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[1]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good1',Switch1,setSwitch1)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput saminput1" cols="30" rows="2" placeholder={placeData.text2} 
            ref={problemC} onChange={onSubmit} value={data.scamC} />
          </div>
        
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title3}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[2]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good2',Switch2,setSwitch2)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput saminput1" cols="30" rows="2" placeholder={placeData.text3} 
            ref={problemA} onChange={onSubmit} value={data.scamA} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title4}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[3]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good3',Switch3,setSwitch3)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput saminput1" cols="30" rows="2" placeholder={placeData.text4} 
            ref={problemM} onChange={onSubmit} value={data.scamM} />
          </div>

          
          <div className="s-item">
            <div className="s-itemTitle">문제정의</div>
            <textarea  className="s-intemInput saminput1" cols="30" rows="2" placeholder="최종문제 : 5why질문/관찰/공감을 통해 찾게된 최종 문제는?" 
            ref={problemP} onChange={onSubmit} value={data.scamP} style={{background:"lightpink"}} />
          </div>

        </form>
      </div>
  );
}


export default memo(Problem);