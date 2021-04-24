import { Badge, IconButton,Tooltip } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, InsertEmoticon } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './datastudy.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import Swal from 'sweetalert2';
import ProblemReport from './problemReport';
import { useHistory,useParams } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReplayIcon from '@material-ui/icons/Replay';

function Cube({ fireProblem, fireSync, user, userInfo ,setlogoName }) {
  const folder = "cube";
  setlogoName(' 큐브툴');
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const roomERef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const drawerRef = useRef();
  const backRef = useRef();
  const history = useHistory();
  const Pen = '•'
  const Pen2 = '👁'
  const Pen3 = '👁'

  // data 변수 선언
  const text1 = useRef(); const text2 = useRef(); const text3 = useRef(); const text4 = useRef(); const text5 = useRef();
  const text6 = useRef(); const text7 = useRef(); const text8 = useRef(); const text9 = useRef();
  const T1t1=useRef(); const T1t2=useRef(); const T1t3=useRef(); const T1t4=useRef(); const T1t5=useRef(); const T1t6=useRef(); const T1t7=useRef(); const T1t8=useRef(); const T1t9=useRef();
  const T2t1=useRef(); const T2t2=useRef(); const T2t3=useRef(); const T2t4=useRef(); const T2t5=useRef(); const T2t6=useRef(); const T2t7=useRef(); const T2t8=useRef(); const T2t9=useRef();
  const T3t1=useRef(); const T3t2=useRef(); const T3t3=useRef(); const T3t4=useRef(); const T3t5=useRef(); const T3t6=useRef(); const T3t7=useRef(); const T3t8=useRef(); const T3t9=useRef();
  const T4t1=useRef(); const T4t2=useRef(); const T4t3=useRef(); const T4t4=useRef(); const T4t5=useRef(); const T4t6=useRef(); const T4t7=useRef(); const T4t8=useRef(); const T4t9=useRef();
  const T6t1=useRef(); const T6t2=useRef(); const T6t3=useRef(); const T6t4=useRef(); const T6t5=useRef(); const T6t6=useRef(); const T6t7=useRef(); const T6t8=useRef(); const T6t9=useRef();
  const T7t1=useRef(); const T7t2=useRef(); const T7t3=useRef(); const T7t4=useRef(); const T7t5=useRef(); const T7t6=useRef(); const T7t7=useRef(); const T7t8=useRef(); const T7t9=useRef();
  const T8t1=useRef(); const T8t2=useRef(); const T8t3=useRef(); const T8t4=useRef(); const T8t5=useRef(); const T8t6=useRef(); const T8t7=useRef(); const T8t8=useRef(); const T8t9=useRef();
  const T9t1=useRef(); const T9t2=useRef(); const T9t3=useRef(); const T9t4=useRef(); const T9t5=useRef(); const T9t6=useRef(); const T9t7=useRef(); const T9t8=useRef(); const T9t9=useRef();

  const [data, setdata] = useState({     
    T1:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T2:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T3:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T4:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T5:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T6:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T7:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T8:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    T9:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
    dataId:'',
  });
  const [room, setRoom] = useState({});
  const {id}=useParams(); 

  const [roomAdmin, setroomAdmin] = useState(false)
  const [userClass, setUserClass] = useState(false)
  const [reportId, setReportId] = useState(id||'') ;
  const [roomName, setroomName] = useState('');
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [rightModal,setrightModal] = useState(false);
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true);
  const [linkCopy, setLinkCopy] = useState('');
  const [reportInput, setReportInput] = useState(false);
  //입장중 http://localhost:3000/'+folder+roomName
  const [door, setDoor] = useState('입장')
  const [report, setReport] = useState(false);
  const [userUID, setUserUID] = useState('');
  // const [cube, setCube] = useState('');

   //링크접속
   useEffect(() => {    
    if(id.length===10){  console.log('id.length===10')
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
    
    else if(id.length===12){console.log('id.length===12')
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
      if(data.dataId){ if(data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true)} }
      
      if(roomName){ 
        if(roomName.substr(0,6) === user.uid.substr(0,6)){setroomAdmin(true)} 
        }else if(!roomName&&level>0){
          setroomAdmin(true)
        }
        
      const cf = {
        f1: (p) => { setdata(p) },  f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) },  f4: () => { setRoom({}) },
      }

      if (e && report===false && id.length<10) {   console.log('로그인하고 리포트false','room',room)
        setRoomUid(e.uid.substr(0, roomSubstr));
        setUserUID(e.uid);
        const stopDataSync = fireSync.dataSync(folder, roomName, cf);
        const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
        if(data.dataId){ if(data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true)} }
        return ()=>{stopDataSync();stoproomSync();}
      }       
      else  if(e && report){ console.log('로그인 레포트',data,e,roomName,report)
        setRoomUid(e.uid.substr(0, roomSubstr));
        setUserUID(e.uid);        
        const stopDataSync = fireSync.dataSyncB(folder, roomName, cf);
        const stoproomSync = fireSync.roomSync(folder, roomName, cf);
        if(data.dataId){ if(data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true)} }
        return ()=>{stopDataSync();stoproomSync();}
      }      
      else {return}
  }) 
}, [roomName,fireSync,report,roomUid,user,userInfo]);

  //수업자료와 공지사항 싱크
  useEffect(() => {    
    if(roomName&&!report){ 
      const stopvideoSync = fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      const stopvideoSync2 = fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);})
        return ()=>{stopvideoSync(); stopvideoSync2(); }
    }
     
  },[fireSync,roomName,report]);    

//입장자 카운팅
  // useEffect(() => { if(report){return}
  //   if(entering&&roomERef.current.value&&roomName){
  //     let num = ++data['enterMan']||0 ;
  //     fireSync.cubeUp(folder,roomName, {enterMan:num});
  //   }
  //   return ()=>{ if(entering){manMinus()}}
  // },[entering])
    
    
    //오른쪽 모달 핸들링
    const moveModal = () => {
      setrightModal(true);roomNameReset3();setEntering(false); setroomName("");
      drawerRef.current.classList.add("moveDrawer");
      backRef.current.classList.remove("backNone");    
    }
    const moveModal2 = () => {
      drawerRef.current.classList.remove("moveDrawer");
      backRef.current.classList.add("backNone"); 
      setrightModal(true);
    }
  
  //모달창3
  const fire = () => {if(!video){return}
  Swal.fire({html:video, width:'90%',showConfirmButton: false})
}

  // 자료입력 모달
  const fireInsert = async(e)=>{
    e.preventDefault();
    const { value: text } = await Swal.fire({
      input: 'textarea',
      width:'80%',
      // eslint-disable-next-line no-use-before-define
      inputValue: video||'',
      inputLabel: '참고자료',
      // inputPlaceholder: '이곳에 자료를 입력해주세요.',
      // inputAttributes: {'aria-label': 'Type your message here'},
      // showCancelButton: true
    })
    if (text) {
      Swal.fire({html:text, width:'80%',})
    fireProblem.videoSave(folder, user.uid,'See', text);
    }
  }
// textArea
  const fireTextarea = async(e,p)=>{ 
    // e.preventDefault();
  if(!roomName){ return}
  if(report&&!userClass){return}
  const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: '제목',
      inputValue:data[p],
      inputPlaceholder: '제목을 입력해주세요.',
      // inputAttributes: {'aria-label': 'Type your message here'},
      showCancelButton: true
    })
    if (text) {
      // Swal.fire(text)
     if(!report){onSubmit2(text,p)}else if(report&&userClass){onSubmit4(text,p)}else{return}
    }
  }
  
  
  // 방생성
  const createRoom = () => {
    const sortNum = fireProblem.roomSortNum(folder,roomUid)
    const num = Date.now().toString().substr(10);
    const roomsortNum = sortNum+num
    const newRoom = roomUid + roomsortNum;
    const data = {      
      T1:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T2:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T3:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T4:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T5:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T6:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T7:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T8:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T9:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T1t1:'1', T1t2:'2', T1t3:'3', T1t4:'4', T1t5:'', T1t6:'5', T1t7:'6', T1t8:'7', T1t9:'8',
      T2t1:'9', T2t2:'10', T2t3:'11', T2t4:'12', T2t5:'', T2t6:'13', T2t7:'14', T2t8:'15', T2t9:'16',
      T3t1:'17', T3t2:'18', T3t3:'19', T3t4:'20', T3t5:'', T3t6:'21', T3t7:'22', T3t8:'23', T3t9:'24',
      T4t1:'25', T4t2:'26', T4t3:'27', T4t4:'28', T4t5:'', T4t6:'29', T4t7:'30', T4t8:'31', T4t9:'32',
      T6t1:'1', T6t2:'2', T6t3:'3', T6t4:'4', T6t5:'', T6t6:'5', T6t7:'6', T6t8:'7', T6t9:'8',
      T7t1:'9', T7t2:'10', T7t3:'11', T7t4:'12', T7t5:'', T7t6:'13', T7t7:'14', T7t8:'15', T7t9:'16',
      T8t1:'17', T8t2:'18', T8t3:'19', T8t4:'20', T8t5:'', T8t6:'21', T8t7:'22', T8t8:'23', T8t9:'24',
      T9t1:'25', T9t2:'26', T9t3:'27', T9t4:'28', T9t5:'', T9t6:'29', T9t7:'30', T9t8:'31', T9t9:'32', 
     
      dataId:newRoom,
      userId:user.uid,
      text1:'', text2:'',text3:'',text4:'',text5:'',text6:'',text7: '',text8: '',  text9: '',
      enterMan:0,
      host:'입장'
    } 
    const abc = fireProblem.roomGetSave(folder, newRoom,level, data)
    if(abc){adminEnter2(newRoom)}else{return}

  }

  // 큐브입력 모달
  const fireArea = async(T,t)=>{ 
    if(!roomName||report){return}
    const cubeData = fireSync.cubeSync(folder, roomName, T, t);
    const cube = cubeData ||'';
    const { value: text } = await Swal.fire({
      input: 'textarea', height:'400px',
      html:cube, width:'80%',
      imageUrl:cube,
      inputValue:cube,
      inputLabel:'❤️ 👉 ✔️ ❌ 🔹 ⚜️',
      inputPlaceholder: '코드입력시: <iframe width="100%" src="주소" /> \n 링크입력시:<a href="링크" target="_blank">제목</a>',
      showCancelButton: true
    })    
    if (text) {
      if(!entering){return};
      Swal.fire(text); 
      const data = {[t]:text};
      fireProblem.cubeDataUp(folder, roomName, T, data);
    }
  }
  // 큐브입력 모달2
  const fireArea2 = async(T,t)=>{ 
    if(!roomName||report){return}
    const cubeData = fireSync.cubeSync(folder, roomName, T, t);
    const cube = cubeData ||'';
    Swal.fire({
      html:cube, width:'80%',
      imageUrl:cube,
    })  
  }
  // 큐브입력 모달3
  const fireArea3 = async(T,t)=>{ console.log(report,reportId.length,userClass)
    if(!roomName||report){return}
    const cubeData = fireSync.cubeSync(folder, roomName, T, t);
    const cube = cubeData ||'';
    const { value: text } = await Swal.fire({
      input: 'url',
      inputValue:cube,
      inputLabel:'링크를 입력해주세요.',
      showCancelButton: true
    })    
    if (text) {
      if(!entering){return};
      // Swal.fire(text); 
      const data = {[t]:text};
      fireProblem.cubeDataUp(folder, roomName, T, data);
    window.open(`${text}`, '_blank');
  }
  }
  // 큐브입력 모달4
  const fireArea4 = async(T,t)=>{ 
    if(!roomName||report){return}
    const cubeData = fireSync.cubeSync(folder, roomName, T, t);
    const cube = cubeData ||'';
    // document.location.href=`${cube}`;    
    window.open(`${cube}`, '_blank');
  }
  
  // 리포트 큐브입력 모달
  const fireAreaReport = async(T,t)=>{ 
    if(!roomName){return}
    if(!userClass){  
      let cubeData = fireSync.cubeReportSync(folder, roomName, T, t);
      const cube = cubeData ||'';
      Swal.fire({html:cube, width:'80%'})
    }else{
      let cubeData = fireSync.cubeReportSync(folder, roomName, T, t);
      const cube = cubeData ||'';
      const { value: text } = await Swal.fire({
        html:cube, width:'80%',
        input: 'textarea',
        inputPlaceholder: '이곳에 내용을 입력해주세요.',
        showCancelButton: true
      }) 
      if (text) {
        Swal.fire(text); 
        const data = {[t]:text};
        fireProblem.cubeReportDataUp(folder, roomName, T, data);
      }
    }
  }
  // 리포트 큐브입력 모달2
  const fireAreaReport2 = async(T,t)=>{ 
    if(!roomName){return}
    if(!userClass){  
      const cubeData = fireSync.cubeReportSync(folder, roomName, T, t);
      const cube = cubeData ||'';
      window.open(`${cube}`, '_blank');
    }else{
      const cubeData = fireSync.cubeReportSync(folder, roomName, T, t);
      const cube = cubeData ||'';
      const { value: text } = await Swal.fire({
        input: 'url',
        inputValue:cube,
        inputLabel:'링크를 입력해주세요.',
        showCancelButton: true
      }) 
      if (text) {
        const data = {[t]:text};
        fireProblem.cubeReportDataUp(folder, roomName, T, data);
    window.open(`${text}`, '_blank');
  }
    }
  }


  //데이터 리셋
  const dataReset = () => {    
   text1.current.value = ''; text2.current.value = ''; text3.current.value = ''; text4.current.value = '';
   text5.current.value = ''; text6.current.value = ''; text7.current.value = ''; text8.current.value = ''; text9.current.value = '';    
   T1t1.current.value=''; T1t2.current.value=''; T1t3.current.value=''; T1t4.current.value=''; T1t5.current.value=''; T1t6.current.value=''; T1t7.current.value=''; T1t8.current.value=''; T1t9.current.value='';
   T2t1.current.value=''; T2t2.current.value=''; T2t3.current.value=''; T2t4.current.value=''; T2t5.current.value=''; T2t6.current.value=''; T2t7.current.value=''; T2t8.current.value=''; T2t9.current.value='';
   T3t1.current.value=''; T3t2.current.value=''; T3t3.current.value=''; T3t4.current.value=''; T3t5.current.value=''; T3t6.current.value=''; T3t7.current.value=''; T3t8.current.value=''; T3t9.current.value='';
   T4t1.current.value=''; T4t2.current.value=''; T4t3.current.value=''; T4t4.current.value=''; T4t5.current.value=''; T4t6.current.value=''; T4t7.current.value=''; T4t8.current.value=''; T4t9.current.value='';
   T6t1.current.value=''; T6t2.current.value=''; T6t3.current.value=''; T6t4.current.value=''; T6t5.current.value=''; T6t6.current.value=''; T6t7.current.value=''; T6t8.current.value=''; T6t9.current.value='';
   T7t1.current.value=''; T7t2.current.value=''; T7t3.current.value=''; T7t4.current.value=''; T7t5.current.value=''; T7t6.current.value=''; T7t7.current.value=''; T7t8.current.value=''; T7t9.current.value='';
   T8t1.current.value=''; T8t2.current.value=''; T8t3.current.value=''; T8t4.current.value=''; T8t5.current.value=''; T8t6.current.value=''; T8t7.current.value=''; T8t8.current.value=''; T8t9.current.value='';
   T9t1.current.value=''; T9t2.current.value=''; T9t3.current.value=''; T9t4.current.value=''; T9t5.current.value=''; T9t6.current.value=''; T9t7.current.value=''; T9t8.current.value=''; T9t9.current.value='';
  }

  //데이터 초기화
  const dataRefresh = ()=>{
   //  dataReset();
      if(!roomName||!user||data.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}    
      Swal.fire({ 
        title: '전체 내용을 삭제하겠습니까?',
        icon:'warning',
        showCancelButton: true})
      .then((result) => { 
      const reData = {
     T1t1:'', T1t2:'', T1t3:'', T1t4:'', T1t5:'', T1t6:'', T1t7:'', T1t8:'', T1t9:'',
     T2t1:'', T2t2:'', T2t3:'', T2t4:'', T2t5:'', T2t6:'', T2t7:'', T2t8:'', T2t9:'',
     T3t1:'', T3t2:'', T3t3:'', T3t4:'', T3t5:'', T3t6:'', T3t7:'', T3t8:'', T3t9:'',
     T4t1:'', T4t2:'', T4t3:'', T4t4:'', T4t5:'', T4t6:'', T4t7:'', T4t8:'', T4t9:'',
     T6t1:'', T6t2:'', T6t3:'', T6t4:'', T6t5:'', T6t6:'', T6t7:'', T6t8:'', T6t9:'',
     T7t1:'', T7t2:'', T7t3:'', T7t4:'', T7t5:'', T7t6:'', T7t7:'', T7t8:'', T7t9:'',
     T8t1:'', T8t2:'', T8t3:'', T8t4:'', T8t5:'', T8t6:'', T8t7:'', T8t8:'', T8t9:'',
     T9t1:'', T9t2:'', T9t3:'', T9t4:'', T9t5:'', T9t6:'', T9t7:'', T9t8:'', T9t9:'', 
     text1:'', text2:'',text3:'',text4:'',text5:'',text6:'',text7: '',text8: '',  text9: '',
    }
    fireProblem.dataUp(folder, roomName, reData);
  })
  }


 // 관리자 방입장
      const adminEnter = (e) => { 
        dataReset();
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
        const cf2 = {
          f1: (p) => { setdata(p);  },
          f2: () => { setdata({}) },
          f3: (p) => { setRoom(p) },
          f4: () => { setRoom({}) },
        }
      fireSync.dataSync(folder,roomname, cf2);
      fireSync.cubeUp(folder,roomname, {host:'입장',roomName:roomname});
      }

        // 관리자 방입장
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
   
      // input roomName 초기화
      const roomNameReset=() => {   
        fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
        fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1);      
        const cf = {  f1: (p) => { setdata({}) }, f2: () => { setdata({}) },
                      f3: (p) => { setRoom({}) }, f4: () => { setRoom({}) },
        }
        const cf2 = () => { setdata({});setroomName("");setRoom({}); }
        fireSync.roomUser(folder,roomUid,cf2,1);        
        fireSync.dataSync(folder, roomName, cf,1);
        fireSync.cubeSync(folder, roomName, 'T1','t1',1);    
        history.push('/cube/:id');
        setDoor('입장'); dataReset(); setdata({}); setroomName("");
        setRoomUid(''); setReport(false); setSee(true); 
        setNotice(''); setVideo(''); 
        // setRoom({});
        roomERef.current.value='';  
        setdata({
          T1:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T2:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T3:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T4:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T5:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T6:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T7:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T8:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
          T9:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
        });        
        if(user.uid){
          if(user.uid.substr(0,roomSubstr)===roomName.substr(0,roomSubstr)){
            fireSync.cubeUp(folder,roomName, {host:'퇴장',enterMan:0});
          }}
      }  
    
   // 토론방 삭제시 데이터 리셋 entering 제거
   const roomNameReset2=() => { 
    fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
    fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1);      
    const cf = {  f1: (p) => { setdata({}) }, f2: () => { setdata({}) },
                  f3: (p) => { setRoom({}) }, f4: () => { setRoom({}) },
    }
    const cf2 = () => { setdata({});setRoom({});  setroomName(""); history.push('/cube/:id');}
    // fireSync.roomUser(folder,roomUid,cf2,1);        
    fireSync.roomUser3(folder,roomUid,cf2,1);        
    fireSync.dataSync(folder, roomName, cf,1);
    fireSync.cubeSync(folder, roomName, 'T1','t1',1);    
    
    setDoor('입장'); 
    dataReset(); 
    setdata({});
   
    setRoomUid('');
    setReport(false);
    setSee(true); 
    setNotice('');
    setVideo('');
    // setReportInput(false);
    // roomERef.current.value='';  
    setdata({
      T1:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T2:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T3:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T4:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T5:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T6:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T7:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T8:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T9:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      });
  }  

  
   // 리포트 목록 모달창 클릭시 실행
   const roomNameReset3=() => { 
    history.push('/cube/:id');
    setDoor('입장'); 
    dataReset(); 
    setdata({});
    setroomName("");
    setRoomUid('');
    setReport(true);
    setSee(true); 
    setNotice('');
    setVideo('');
    roomERef.current.value='';  
    setdata({
      T1:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T2:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T3:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T4:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T5:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T6:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T7:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T8:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      T9:{t1:'',t2:'',t3:'',t4:'',t6:'',t7:'',t8:'',t9:'',t11:'',t22:'',t33:'',t44:'',t66:'',t77:'',t88:'',t99:''},
      });
  }  

  // roomName.substr(0,6) 방입장

  const roomNameHide = ()=>{roomERef.current.value=''; }
  const roomRowReset=() => {
    roomERef.current.value=''; 
      dataReset(); 
      setdata(data);
    setDoor('입장'); 
    // setRoomUid('');
    // setRoom({});
    setNotice('');setVideo('');
  }  

//입장자 카운팅
  const manMinus = () => {
    let num = 0;
    if(data['enterMan']>0){ num=--data['enterMan']}else{return}
    fireSync.cubeUp(folder, roomName,{enterMan:num} );
    return;
  }
// 방입장
const enterRoom = () => {  console.log('entering입장', data)
const roomvalue = roomERef.current.value || "";
const enterRoomId =  roomERef.current.value.substr(0,roomSubstr)||"";
if(entering){   console.log('entering퇴장', data)
  if(!report){
  setEntering(false); roomNameReset(); manMinus();
  setroomName("");setDoor('입장');   
  if(data.id){
  if(data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){
    fireSync.cubeUp(folder,roomvalue, {host:'퇴장',roomName:roomvalue});
  }   }
}else{
  setEntering(false); roomNameReset2(); manMinus();
  setroomName("");setDoor('입장');  
}
}
if(roomvalue.length !== 10){ return;}
if(roomvalue.length === 10&&!entering&&!report){ 
    const cf1 = { 
        f1: ()=>{setroomName(roomvalue); setRoomUid(enterRoomId);setDoor('퇴장');setReport(false);
        setEntering(true);  
        setSee(false)
      },      
        f2: (p) => { setdata({...data,...p}) },     
        f3: (p) => { setRoom(p) }, 
        f4: (host) => { setroomName(""); roomNameReset(); setEntering(false)}
      }          
   fireSync.roomUser(folder,roomvalue,cf1);
  }   
}


// notice 저장 - 공지 보내기
  const noticeUp = (e) => {
    e.preventDefault();
    if(!roomName){return}
    const data = noticeRef.current.value;
    fireProblem.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';    
  }

 //리포트 저장
 const reportSave = () => { console.log(data)
  if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
  if (text5.current.value.length<2){Swal.fire('주제를 입력해주세요.')}
  else{
  const roomUid =  user.uid.substr(0,roomSubstr);
  const roomId = roomUid+'REPORT';
  fireProblem.reportSave(folder, roomId, roomName, data).then(()=>{Swal.fire('저장완료')})
 }
}

  //problem 글 데이터 저장, 방개수 6개 이하일때만 데이터 저장
  const onSubmit = () => {   
    if(!roomName && !report){  return  }
    if( roomName===roomERef.current.value && !report ){
        const data = {dataId:roomName || '',
          text1: text1.current.value || '', text2: text2.current.value || '', text3: text3.current.value || '', text4: text4.current.value || '',
          text5: text5.current.value || '', text6: text6.current.value || '', text7: text7.current.value || '', text8: text8.current.value || '', text9: text9.current.value || '',  
          }    
        fireProblem.dataUp(folder, roomName, data);
      }  

  }

// 큐브 데이터 저장
const onSubmit2 = (e,p) => { 
  if(!roomName && !report){ return}
  // if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
  if( roomName===roomERef.current.value && !report ){
  // const  evalue = e.current.value ||'';
  const data = {[p]:e}
  fireSync.cubeUp(folder, roomName,data );
  }
}
  // 큐브 리포트 가운데 input 저장
  const onSubmit3 = () => { 
    // if (!report||!user.uid) { return }
    const roomUid =  user.uid.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    const value = {dataId:roomName || '',
      text1: text1.current.value || '', text2: text2.current.value || '', text3: text3.current.value || '', text4: text4.current.value || '',
      text5: text5.current.value || '', text6: text6.current.value || '', text7: text7.current.value || '', text8: text8.current.value || '', text9: text9.current.value || '',  
      }
      fireSync.cubeReportUp(folder, roomId, roomName, value);
  }

// 큐브 리포트 테두리 input 저장
const onSubmit4 = (e,p) => { 
// if (!report||user.uid===undefined) { return }else{
  const roomUid =   user.uid.substr(0,roomSubstr);
  const roomId = roomUid+'REPORT';
  // const  evalue = e.current.value ||'';
    const value = {[p]:e}
    fireSync.reportUp(folder, roomId, roomName, value);
// }
}
    
    // 아이템 삭제
  const dataDel = () => {  
    if(!report){
    if(!roomName||!user||data.dataId.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}
    }
      if(!report && data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){  
        console.log( '토론방을 삭제하겠습니까?');
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
      const cf = ()=>{setroomName(""); roomNameReset(); setEntering(false); manMinus(); setDoor('입장'); }
      fireProblem.dataDel2(folder,roomName,cf);  
      Swal.fire('삭제되었습니다.');   
      }});
    }

    if(report&&roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){  
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
        const roomUid =   user.uid.substr(0,roomSubstr);
        const roomId = roomUid+'REPORT';
        const cf = ()=>{setroomName(""); roomNameReset2(); setEntering(false); manMinus(); setDoor('입장'); }
      fireProblem.reportDel2(folder,roomId,roomName,cf);   

      fireSync.reportSync(folder,roomId,cf,1); 
      Swal.fire('삭제되었습니다.');
      }});
    }
  }  

//titleRef.current.classList.add("noticeFly");
  return (
    <div className="datastudy" >     
    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <ProblemReport setLinkCopy={setLinkCopy} fireSync={fireSync} fireProblem={fireProblem} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo}
      moveModal2={moveModal2} report={report} setdata={setdata} setDoor={setDoor} setEntering={setEntering}  /> 
    }
    </div>
    <div className="drawerback backNone" ref={backRef} onClick={moveModal2}></div>
       
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
        <div className="adimBar">
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
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'85px'}} ref={roomERef} />
        </div>

        <div style={{width:"100%", display:'flex'}}>
          {roomAdmin && !report &&
         <IconButton size="small"  onClick={reportSave} style={{color:"var(--Bcolor)",flex:"auto",width:'30px', height:'25px',padding:"0"}}>
         <Tooltip arrow placement="top"  title="저장">
                <SaveIcon /> 
          </Tooltip>
          </IconButton>
          }    
          {roomAdmin && !report &&
          <IconButton size="small" component="span" onClick={dataRefresh} style={{color:"var(--Bcolor)",flex:"auto",width:'30px', height:'25px'}}>
         <Tooltip arrow placement="top"  title="초기화">
                <ReplayIcon /> 
          </Tooltip>
          </IconButton>
          } 
        {roomAdmin && 
         <Tooltip arrow  placement="top" title="룸삭제">
          <IconButton size="small" component="span" onClick={dataDel} style={{color:"var(--Bcolor)",flex:"auto",width:'30px', height:'25px'}}>
                <DeleteForever />  
          </IconButton>
          </Tooltip>
        }
        </div>
        {video&&
          <button style={{width:'85px',cursor:"pointer"}}  className="btnRoomLink"  onClick={fire}>공유자료</button>          
        }
       </div>            
    {roomAdmin && 
        <form className="adimBar"  onSubmit={noticeUp} >
         {/* <Tooltip arrow placement="left" title="메시지 전송">
          <button className="btnRoomLink" style={{width:"40px"}} onClick={noticeUp}><AddCommentIcon/></button> 
          </Tooltip> */}
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
      
      <div className="mandarat">
        <div className="box">
          <div className="items items1">
            <div className="item item1"> <div style={{display:'flex'}}>
                                        {roomName&&data.T1.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t1')}else{fireAreaReport('T1','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t1')}else{fireAreaReport('T1','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t11')}else{fireAreaReport2('T1','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t11')}else{fireAreaReport2('T1','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t1} onClick={()=>{fireTextarea(T1t1,'T1t1')}} value={data.T1t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T1.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t2')}else{fireAreaReport('T1','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t2')}else{fireAreaReport('T1','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t22')}else{fireAreaReport2('T1','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t22')}else{fireAreaReport2('T1','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t2} onClick={()=>{fireTextarea(T1t2,'T1t2')}} value={data.T1t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T1.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t3')}else{fireAreaReport('T1','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t3')}else{fireAreaReport('T1','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t33')}else{fireAreaReport2('T1','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t33')}else{fireAreaReport2('T1','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t3} onClick={()=>{fireTextarea(T1t3,'T1t3')}} value={data.T1t3}  disabled={reportInput}  /></div>
            <div className="item item4"> <div style={{display:'flex'}}>
                                        {roomName&&data.T1.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t4')}else{fireAreaReport('T1','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t4')}else{fireAreaReport('T1','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t44')}else{fireAreaReport2('T1','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t44')}else{fireAreaReport2('T1','t44')}}} >{Pen}</button>}
                                        </div>              
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t4} onClick={()=>{fireTextarea(T1t4,'T1t4')}} value={data.T1t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text1} ref={T1t5} /></div>
            <div className="item item6"> <div style={{display:'flex'}}>
                                        {roomName&&data.T1.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t6')}else{fireAreaReport('T1','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t6')}else{fireAreaReport('T1','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t66')}else{fireAreaReport2('T1','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t66')}else{fireAreaReport2('T1','t66')}}} >{Pen}</button>}
                                        </div>              
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t6} onClick={()=>{fireTextarea(T1t6,'T1t6')}} value={data.T1t6}  disabled={reportInput}  /></div>
            <div className="item item7"> <div style={{display:'flex'}}>
                                        {roomName&&data.T1.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t7')}else{fireAreaReport('T1','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t7')}else{fireAreaReport('T1','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t77')}else{fireAreaReport2('T1','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t77')}else{fireAreaReport2('T1','t77')}}} >{Pen}</button>}
                                        </div>              
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t7} onClick={()=>{fireTextarea(T1t7,'T1t7')}} value={data.T1t7}  disabled={reportInput}  /></div>
            <div className="item item8"> <div style={{display:'flex'}}>
                                        {roomName&&data.T1.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t8')}else{fireAreaReport('T1','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t8')}else{fireAreaReport('T1','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t88')}else{fireAreaReport2('T1','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t88')}else{fireAreaReport2('T1','t88')}}} >{Pen}</button>}
                                        </div>              
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t8} onClick={()=>{fireTextarea(T1t8,'T1t8')}} value={data.T1t8}  disabled={reportInput}  /></div>
            <div className="item item9"> <div style={{display:'flex'}}>
                                        {roomName&&data.T1.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t9')}else{fireAreaReport('T1','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T1.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T1','t9')}else{fireAreaReport('T1','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T1.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t99')}else{fireAreaReport2('T1','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T1.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T1','t99')}else{fireAreaReport2('T1','t99')}}} >{Pen}</button>}
                                        </div>
              
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t9} onClick={()=>{fireTextarea(T1t9,'T1t9')}} value={data.T1t9}  disabled={reportInput}  /></div>
          </div>
          <div className="items items2">
            <div className="item item1"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t1')}else{fireAreaReport('T2','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t1')}else{fireAreaReport('T2','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t11')}else{fireAreaReport2('T2','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t11')}else{fireAreaReport2('T2','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t1} onClick={()=>{fireTextarea(T2t1,'T2t1')}} value={data.T2t1}  disabled={reportInput}  /></div>
            <div className="item item2"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t2')}else{fireAreaReport('T2','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t2')}else{fireAreaReport('T2','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t22')}else{fireAreaReport2('T2','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t22')}else{fireAreaReport2('T2','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t2} onClick={()=>{fireTextarea(T2t2,'T2t2')}} value={data.T2t2}  disabled={reportInput}  /></div>
            <div className="item item3"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t3')}else{fireAreaReport('T2','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t3')}else{fireAreaReport('T2','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t33')}else{fireAreaReport2('T2','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t33')}else{fireAreaReport2('T2','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t3} onClick={()=>{fireTextarea(T2t3,'T2t3')}} value={data.T2t3}  disabled={reportInput}  /></div>
            <div className="item item4"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t4')}else{fireAreaReport('T2','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t4')}else{fireAreaReport('T2','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t44')}else{fireAreaReport2('T2','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t44')}else{fireAreaReport2('T2','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t4} onClick={()=>{fireTextarea(T2t4,'T2t4')}} value={data.T2t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text2} ref={T2t5} /></div>
            <div className="item item6"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t6')}else{fireAreaReport('T2','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t6')}else{fireAreaReport('T2','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t66')}else{fireAreaReport2('T2','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t66')}else{fireAreaReport2('T2','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t6} onClick={()=>{fireTextarea(T2t6,'T2t6')}} value={data.T2t6}  disabled={reportInput}  /></div>
            <div className="item item7"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t7')}else{fireAreaReport('T2','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t7')}else{fireAreaReport('T2','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t77')}else{fireAreaReport2('T2','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t77')}else{fireAreaReport2('T2','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t7} onClick={()=>{fireTextarea(T2t7,'T2t7')}} value={data.T2t7}  disabled={reportInput}  /></div>
            <div className="item item8"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t8')}else{fireAreaReport('T2','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t8')}else{fireAreaReport('T2','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t88')}else{fireAreaReport2('T2','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t88')}else{fireAreaReport2('T2','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t8} onClick={()=>{fireTextarea(T2t8,'T2t8')}} value={data.T2t8}  disabled={reportInput}  /></div>
            <div className="item item9"> <div style={{display:'flex'}}>
                                        {roomName&&data.T2.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t9')}else{fireAreaReport('T2','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T2.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T2','t9')}else{fireAreaReport('T2','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T2.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t99')}else{fireAreaReport2('T2','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T2.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T2','t99')}else{fireAreaReport2('T2','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t9} onClick={()=>{fireTextarea(T2t9,'T2t9')}} value={data.T2t9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items3">
            <div className="item item1"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t1')}else{fireAreaReport('T3','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t1')}else{fireAreaReport('T3','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t11')}else{fireAreaReport2('T3','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t11')}else{fireAreaReport2('T3','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t1} onClick={()=>{fireTextarea(T3t1,'T3t1')}} value={data.T3t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t2')}else{fireAreaReport('T3','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t2')}else{fireAreaReport('T3','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t22')}else{fireAreaReport2('T3','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t22')}else{fireAreaReport2('T3','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t2} onClick={()=>{fireTextarea(T3t2,'T3t2')}} value={data.T3t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t3')}else{fireAreaReport('T3','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t3')}else{fireAreaReport('T3','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t33')}else{fireAreaReport2('T3','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t33')}else{fireAreaReport2('T3','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t3} onClick={()=>{fireTextarea(T3t3,'T3t3')}} value={data.T3t3}  disabled={reportInput}  /></div>
            <div className="item item4"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t4')}else{fireAreaReport('T3','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t4')}else{fireAreaReport('T3','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t44')}else{fireAreaReport2('T3','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t44')}else{fireAreaReport2('T3','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t4} onClick={()=>{fireTextarea(T3t4,'T3t4')}} value={data.T3t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text3} ref={T3t5} /></div>
            <div className="item item6"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t6')}else{fireAreaReport('T3','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t6')}else{fireAreaReport('T3','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t66')}else{fireAreaReport2('T3','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t66')}else{fireAreaReport2('T3','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t6} onClick={()=>{fireTextarea(T3t6,'T3t6')}} value={data.T3t6}  disabled={reportInput}  /></div>
            <div className="item item7"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t7')}else{fireAreaReport('T3','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t7')}else{fireAreaReport('T3','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t77')}else{fireAreaReport2('T3','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t77')}else{fireAreaReport2('T3','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t7} onClick={()=>{fireTextarea(T3t7,'T3t7')}} value={data.T3t7}  disabled={reportInput}  /></div>
            <div className="item item8"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t8')}else{fireAreaReport('T3','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t8')}else{fireAreaReport('T3','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t88')}else{fireAreaReport2('T3','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t88')}else{fireAreaReport2('T3','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t8} onClick={()=>{fireTextarea(T3t8,'T3t8')}} value={data.T3t8}  disabled={reportInput}  /></div>
            <div className="item item9"><div style={{display:'flex'}}>
                                        {roomName&&data.T3.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t9')}else{fireAreaReport('T3','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T3.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T3','t9')}else{fireAreaReport('T3','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T3.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t99')}else{fireAreaReport2('T3','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T3.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T3','t99')}else{fireAreaReport2('T3','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t9} onClick={()=>{fireTextarea(T3t9,'T3t9')}} value={data.T3t9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items4">
            <div className="item item1"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t1')}else{fireAreaReport('T4','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t1')}else{fireAreaReport('T4','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t11')}else{fireAreaReport2('T4','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t11')}else{fireAreaReport2('T4','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t1} onClick={()=>{fireTextarea(T4t1,'T4t1')}} value={data.T4t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t2')}else{fireAreaReport('T4','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t2')}else{fireAreaReport('T4','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t22')}else{fireAreaReport2('T4','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t22')}else{fireAreaReport2('T4','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t2} onClick={()=>{fireTextarea(T4t2,'T4t2')}} value={data.T4t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t3')}else{fireAreaReport('T4','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t3')}else{fireAreaReport('T4','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t33')}else{fireAreaReport2('T4','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t33')}else{fireAreaReport2('T4','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t3} onClick={()=>{fireTextarea(T4t3,'T4t3')}} value={data.T4t3}  disabled={reportInput}  /></div>
            <div className="item item4"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t4')}else{fireAreaReport('T4','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t4')}else{fireAreaReport('T4','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t44')}else{fireAreaReport2('T4','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t44')}else{fireAreaReport2('T4','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t4} onClick={()=>{fireTextarea(T4t4,'T4t4')}} value={data.T4t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text4} ref={T4t5} /></div>
            <div className="item item6"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t6')}else{fireAreaReport('T4','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t6')}else{fireAreaReport('T4','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t66')}else{fireAreaReport2('T4','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t66')}else{fireAreaReport2('T4','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t6} onClick={()=>{fireTextarea(T4t6,'T4t6')}} value={data.T4t6}  disabled={reportInput}  /></div>
            <div className="item item7"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t7')}else{fireAreaReport('T4','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t7')}else{fireAreaReport('T4','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t77')}else{fireAreaReport2('T4','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t77')}else{fireAreaReport2('T4','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t7} onClick={()=>{fireTextarea(T4t7,'T4t7')}} value={data.T4t7}  disabled={reportInput}  /></div>
            <div className="item item8"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t8')}else{fireAreaReport('T4','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t8')}else{fireAreaReport('T4','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t88')}else{fireAreaReport2('T4','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t88')}else{fireAreaReport2('T4','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t8} onClick={()=>{fireTextarea(T4t8,'T4t8')}} value={data.T4t8}  disabled={reportInput}  /></div>
            <div className="item item9"><div style={{display:'flex'}}>
                                        {roomName&&data.T4.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t9')}else{fireAreaReport('T4','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T4.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T4','t9')}else{fireAreaReport('T4','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T4.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t99')}else{fireAreaReport2('T4','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T4.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T4','t99')}else{fireAreaReport2('T4','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t9} onClick={()=>{fireTextarea(T4t9,'T4t9')}} value={data.T4t9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items5 itemsCenter">
            <div className="item item1"><textarea cols="10" rows="1"  className="itemArea area1" ref={text1} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text1}  disabled={reportInput}  /></div>
            <div className="item item2"><textarea cols="10" rows="1"  className="itemArea area2" ref={text2} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text2}  disabled={reportInput}  /></div>
            <div className="item item3"><textarea cols="10" rows="1"  className="itemArea area3" ref={text3} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text3}  disabled={reportInput}  /></div>
            <div className="item item4"><textarea cols="10" rows="1"  className="itemArea area4" ref={text4} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area5" ref={text5} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text5}  disabled={reportInput}  placeholder="주제" /></div>
            <div className="item item6"><textarea cols="10" rows="1"  className="itemArea area6" ref={text6} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text6}  disabled={reportInput}  /></div>
            <div className="item item7"><textarea cols="10" rows="1"  className="itemArea area7" ref={text7} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text7}  disabled={reportInput}  /></div>
            <div className="item item8"><textarea cols="10" rows="1"  className="itemArea area8" ref={text8} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text8}  disabled={reportInput}  /></div>
            <div className="item item9"><textarea cols="10" rows="1"  className="itemArea area9" ref={text9} onChange={()=>{if(report){onSubmit3()}else{onSubmit()}}} value={data.text9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items6">
            <div className="item item1"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t1')}else{fireAreaReport('T6','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t1')}else{fireAreaReport('T6','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t11')}else{fireAreaReport2('T6','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t11')}else{fireAreaReport2('T6','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t1} onClick={()=>{fireTextarea(T6t1,'T6t1')}} value={data.T6t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t2')}else{fireAreaReport('T6','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t2')}else{fireAreaReport('T6','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t22')}else{fireAreaReport2('T6','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t22')}else{fireAreaReport2('T6','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t2} onClick={()=>{fireTextarea(T6t2,'T6t2')}} value={data.T6t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t3')}else{fireAreaReport('T6','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t3')}else{fireAreaReport('T6','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t33')}else{fireAreaReport2('T6','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t33')}else{fireAreaReport2('T6','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t3} onClick={()=>{fireTextarea(T6t3,'T6t3')}} value={data.T6t3}  disabled={reportInput}  /></div>
            <div className="item item4"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t4')}else{fireAreaReport('T6','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t4')}else{fireAreaReport('T6','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t44')}else{fireAreaReport2('T6','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t44')}else{fireAreaReport2('T6','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t4} onClick={()=>{fireTextarea(T6t4,'T6t4')}} value={data.T6t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text6} ref={T6t5} /></div>
            <div className="item item6"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t6')}else{fireAreaReport('T6','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t6')}else{fireAreaReport('T6','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t66')}else{fireAreaReport2('T6','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t66')}else{fireAreaReport2('T6','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t6} onClick={()=>{fireTextarea(T6t6,'T6t6')}} value={data.T6t6}  disabled={reportInput}  /></div>
            <div className="item item7"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t7')}else{fireAreaReport('T6','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t7')}else{fireAreaReport('T6','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t77')}else{fireAreaReport2('T6','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t77')}else{fireAreaReport2('T6','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t7} onClick={()=>{fireTextarea(T6t7,'T6t7')}} value={data.T6t7}  disabled={reportInput}  /></div>
            <div className="item item8"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t8')}else{fireAreaReport('T6','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t8')}else{fireAreaReport('T6','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t88')}else{fireAreaReport2('T6','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t88')}else{fireAreaReport2('T6','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t8} onClick={()=>{fireTextarea(T6t8,'T6t8')}} value={data.T6t8}  disabled={reportInput}  /></div>
            <div className="item item9"><div style={{display:'flex'}}>
                                        {roomName&&data.T6.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t9')}else{fireAreaReport('T6','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T6.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T6','t9')}else{fireAreaReport('T6','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T6.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t99')}else{fireAreaReport2('T6','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T6.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T6','t99')}else{fireAreaReport2('T6','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t9} onClick={()=>{fireTextarea(T6t9,'T6t9')}} value={data.T6t9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items7">
            <div className="item item1"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t1')}else{fireAreaReport('T7','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t1')}else{fireAreaReport('T7','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t11')}else{fireAreaReport2('T7','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t11')}else{fireAreaReport2('T7','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t1} onClick={()=>{fireTextarea(T7t1,'T7t1')}} value={data.T7t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t2')}else{fireAreaReport('T7','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t2')}else{fireAreaReport('T7','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t22')}else{fireAreaReport2('T7','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t22')}else{fireAreaReport2('T7','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t2} onClick={()=>{fireTextarea(T7t2,'T7t2')}} value={data.T7t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t3')}else{fireAreaReport('T7','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t3')}else{fireAreaReport('T7','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t33')}else{fireAreaReport2('T7','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t33')}else{fireAreaReport2('T7','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t3} onClick={()=>{fireTextarea(T7t3,'T7t3')}} value={data.T7t3}  disabled={reportInput}  /></div>
            <div className="item item4"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t4')}else{fireAreaReport('T7','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t4')}else{fireAreaReport('T7','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t44')}else{fireAreaReport2('T7','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t44')}else{fireAreaReport2('T7','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t4} onClick={()=>{fireTextarea(T7t4,'T7t4')}} value={data.T7t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text7} ref={T7t5} /></div>
            <div className="item item6"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t6')}else{fireAreaReport('T7','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t6')}else{fireAreaReport('T7','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t66')}else{fireAreaReport2('T7','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t66')}else{fireAreaReport2('T7','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t6} onClick={()=>{fireTextarea(T7t6,'T7t6')}} value={data.T7t6}  disabled={reportInput}  /></div>
            <div className="item item7"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t7')}else{fireAreaReport('T7','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t7')}else{fireAreaReport('T7','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t77')}else{fireAreaReport2('T7','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t77')}else{fireAreaReport2('T7','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t7} onClick={()=>{fireTextarea(T7t7,'T7t7')}} value={data.T7t7}  disabled={reportInput}  /></div>
            <div className="item item8"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t8')}else{fireAreaReport('T7','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t8')}else{fireAreaReport('T7','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t88')}else{fireAreaReport2('T7','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t88')}else{fireAreaReport2('T7','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t8} onClick={()=>{fireTextarea(T7t8,'T7t8')}} value={data.T7t8}  disabled={reportInput}  /></div>
            <div className="item item9"><div style={{display:'flex'}}>
                                        {roomName&&data.T7.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t9')}else{fireAreaReport('T7','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T7.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T7','t9')}else{fireAreaReport('T7','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T7.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t99')}else{fireAreaReport2('T7','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T7.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T7','t99')}else{fireAreaReport2('T7','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t9} onClick={()=>{fireTextarea(T7t9,'T7t9')}} value={data.T7t9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items8">
            <div className="item item1"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t1')}else{fireAreaReport('T8','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t1')}else{fireAreaReport('T8','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t11')}else{fireAreaReport2('T8','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t11')}else{fireAreaReport2('T8','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t1} onClick={()=>{fireTextarea(T8t1,'T8t1')}} value={data.T8t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t2')}else{fireAreaReport('T8','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t2')}else{fireAreaReport('T8','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t22')}else{fireAreaReport2('T8','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t22')}else{fireAreaReport2('T8','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t2} onClick={()=>{fireTextarea(T8t2,'T8t2')}} value={data.T8t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t3')}else{fireAreaReport('T8','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t3')}else{fireAreaReport('T8','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t33')}else{fireAreaReport2('T8','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t33')}else{fireAreaReport2('T8','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t3} onClick={()=>{fireTextarea(T8t3,'T8t3')}} value={data.T8t3}  disabled={reportInput}  /></div>
            <div className="item item4"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t4')}else{fireAreaReport('T8','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t4')}else{fireAreaReport('T8','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t44')}else{fireAreaReport2('T8','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t44')}else{fireAreaReport2('T8','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t4} onClick={()=>{fireTextarea(T8t4,'T8t4')}} value={data.T8t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text8} ref={T8t5} /></div>
            <div className="item item6"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t6')}else{fireAreaReport('T8','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t6')}else{fireAreaReport('T8','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t66')}else{fireAreaReport2('T8','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t66')}else{fireAreaReport2('T8','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t6} onClick={()=>{fireTextarea(T8t6,'T8t6')}} value={data.T8t6}  disabled={reportInput}  /></div>
            <div className="item item7"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t7')}else{fireAreaReport('T8','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t7')}else{fireAreaReport('T8','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t77')}else{fireAreaReport2('T8','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t77')}else{fireAreaReport2('T8','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t7} onClick={()=>{fireTextarea(T8t7,'T8t7')}} value={data.T8t7}  disabled={reportInput}  /></div>
            <div className="item item8"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t8')}else{fireAreaReport('T8','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t8')}else{fireAreaReport('T8','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t88')}else{fireAreaReport2('T8','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t88')}else{fireAreaReport2('T8','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t8} onClick={()=>{fireTextarea(T8t8,'T8t8')}} value={data.T8t8}  disabled={reportInput}  /></div>
            <div className="item item9"><div style={{display:'flex'}}>
                                        {roomName&&data.T8.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t9')}else{fireAreaReport('T8','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T8.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T8','t9')}else{fireAreaReport('T8','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T8.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t99')}else{fireAreaReport2('T8','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T8.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T8','t99')}else{fireAreaReport2('T8','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t9} onClick={()=>{fireTextarea(T8t9,'T8t9')}} value={data.T8t9}  disabled={reportInput}  /></div>
          
          </div>
          <div className="items items9">
            <div className="item item1"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t1===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t1')}else{fireAreaReport('T9','t1')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t1!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t1')}else{fireAreaReport('T9','t1')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t11!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t11')}else{fireAreaReport2('T9','t11')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t11===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t11')}else{fireAreaReport2('T9','t11')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t1} onClick={()=>{fireTextarea(T9t1,'T9t1')}} value={data.T9t1}  disabled={reportInput}  /></div>
            <div className="item item2"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t2===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t2')}else{fireAreaReport('T9','t2')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t2!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t2')}else{fireAreaReport('T9','t2')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t22!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t22')}else{fireAreaReport2('T9','t22')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t22===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t22')}else{fireAreaReport2('T9','t22')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t2} onClick={()=>{fireTextarea(T9t2,'T9t2')}} value={data.T9t2}  disabled={reportInput}  /></div>
            <div className="item item3"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t3===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t3')}else{fireAreaReport('T9','t3')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t3!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t3')}else{fireAreaReport('T9','t3')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t33!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t33')}else{fireAreaReport2('T9','t33')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t33===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t33')}else{fireAreaReport2('T9','t33')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t3} onClick={()=>{fireTextarea(T9t3,'T9t3')}} value={data.T9t3}  disabled={reportInput}  /></div>
            <div className="item item4"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t4===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t4')}else{fireAreaReport('T9','t4')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t4!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t4')}else{fireAreaReport('T9','t4')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t44!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t44')}else{fireAreaReport2('T9','t44')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t44===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t44')}else{fireAreaReport2('T9','t44')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t4} onClick={()=>{fireTextarea(T9t4,'T9t4')}} value={data.T9t4}  disabled={reportInput}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text9}  ref={T9t5}/></div>
            <div className="item item6"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t6===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t6')}else{fireAreaReport('T9','t6')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t6!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t6')}else{fireAreaReport('T9','t6')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t66!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t66')}else{fireAreaReport2('T9','t66')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t66===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t66')}else{fireAreaReport2('T9','t66')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t6} onClick={()=>{fireTextarea(T9t6,'T9t6')}} value={data.T9t6}  disabled={reportInput}  /></div>
            <div className="item item7"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t7===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t7')}else{fireAreaReport('T9','t7')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t7!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t7')}else{fireAreaReport('T9','t7')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t77!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t77')}else{fireAreaReport2('T9','t77')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t77===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t77')}else{fireAreaReport2('T9','t77')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t7} onClick={()=>{fireTextarea(T9t7,'T9t7')}} value={data.T9t7}  disabled={reportInput}  /></div>
            <div className="item item8"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t8===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t8')}else{fireAreaReport('T9','t8')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t8!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t8')}else{fireAreaReport('T9','t8')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t88!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t88')}else{fireAreaReport2('T9','t88')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t88===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t88')}else{fireAreaReport2('T9','t88')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t8} onClick={()=>{fireTextarea(T9t8,'T9t8')}} value={data.T9t8}  disabled={reportInput}  /></div>
            <div className="item item9"><div style={{display:'flex'}}>
                                        {roomName&&data.T9.t9===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t9')}else{fireAreaReport('T9','t9')}}} >{Pen}</button>}
                                        {roomName&&data.T9.t9!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea('T9','t9')}else{fireAreaReport('T9','t9')}}} >{Pen2}</button>}
                                        {roomName&&data.T9.t99!==''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t99')}else{fireAreaReport2('T9','t99')}}} >{Pen3}</button>}
                                        {roomName&&data.T9.t99===''&&<button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea3('T9','t99')}else{fireAreaReport2('T9','t99')}}} >{Pen}</button>}
                                        </div>
            <textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t9} onClick={()=>{fireTextarea(T9t9,'T9t9')}} value={data.T9t9}  disabled={reportInput}  /></div>
          
          </div>
        </div>
      </div>
      </div>
  );
}


export default memo(Cube);