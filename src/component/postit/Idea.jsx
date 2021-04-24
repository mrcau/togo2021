/* eslint-disable jsx-a11y/iframe-has-title */
import { Badge, IconButton, Switch,Tooltip } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, InsertEmoticon } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './idea.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory, useParams } from 'react-router-dom';
import Idearow from './Idearow';
import LinkIcon from '@material-ui/icons/Link';
import ProblemReport from './problemReport';
import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';
import mime from 'mime-types';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CollectionsIcon from '@material-ui/icons/Collections';
import domtoimage from 'dom-to-image';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function Idea({ fireIdea, fireSync, user, userInfo ,setlogoName}) {
  const folder = "postit";
  const {id}=useParams();
  const [roomName, setroomName] = useState('');
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const roomERef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const history = useHistory();
  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true)
  const [photoData, setPhotoData] = useState('');
  const [addLink, setAddLink] = useState('')
  const [addCon, setAddCon] = useState('')
  //입장중
  const [door, setDoor] = useState('입장')
  const [userUID, setUserUID] = useState('');
  const [ipAPI, setipAPI] = useState('')
  //itemrow  
  const [roomAdmin, setroomAdmin] = useState(false)
  const [userClass, setUserClass] = useState(false)
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef2 = useRef();
  const rocketRef = useRef();
  const [rightModal,setrightModal] = useState(false);
  const [linkCopy, setLinkCopy] = useState('');
  const backRef = useRef();
  const drawerRef = useRef();
  const [report, setReport] = useState(false);
  const [reportInput, setReportInput] = useState(false);
  //itemrow  
  const [items, setItems] = useState({});
  const today = new Date().toLocaleDateString();
  const [color, setColor] = useState('primary');
  setlogoName(' 게시툴');
  
   //링크접속
   useEffect(() => {     
    if(id.length===10){ 
        const enterRoomId =  id.substr(0,roomSubstr)||"";
        const cf1 = { 
        f1: ()=>{setroomName(id); setRoomUid(enterRoomId);setDoor('퇴장');setReport(false);
        setEntering(true);  setSee(false);roomERef.current.value =id;},      
        f2: (p) => { setItems(p) },     
        f3: (p) => { setRoom(p) }, 
        f4: (host) => { setroomName(""); roomNameReset(); setEntering(false)}
      }          
      const stoproomSync = fireSync.roomUser(folder,id,cf1);
      return ()=>{stoproomSync();}
    }
    
    else if(id.length===12){ console.log('hi',id)
      const enterRoomId =  id.substr(0,roomSubstr)||"";
      const cf = { 
      f1: ()=>{setroomName(id.substr(0,10)); setRoomUid(enterRoomId);setDoor('퇴장');
      setReport(true); setReportInput(true);setEntering(true);  setSee(false);roomERef.current.value ='';},      
      f2: (p) => { setItems(p) },     
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
    if(roomName&&e){ 
      if(roomName.substr(0,6) === user.uid.substr(0,6)){setroomAdmin(true)} 
      }else if(!roomName&&level>0){ setroomAdmin(true) }    
    const cf = {  f1: (p) => { setItems(p) },  f2: () => { setItems({}) },
                  f3: (p) => { setRoom(p) },   f4: () => { setRoom({}) },
               }
    if (e && report===false && id.length<10) {   console.log('로그인하고 리포트false!')
    setRoomUid(e.uid.substr(0, roomSubstr));
    setUserUID(e.uid);
    const stopDataSync = fireSync.dataSync(folder, roomName, cf);
    const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
    if(data.dataId){ if(data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true)}  }
      return ()=>{stopDataSync();stoproomSync();}    
    }       
    else  if(e && report){ console.log('로그인 레포트');
    if(items.roomName){ if(items.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true); setItems(items); setReport(true)} }
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

  useEffect(()=>{    
  const ipip = '//api.ipify.org?format=json'
  fetch(ipip).then(response => response.json()).then(computer => setipAPI(computer.ip)).catch(() => {
    Swal.insertQueueStep({
      icon: 'error',
      title: 'Unable to get your public IP'
    })
  })

  },[])

//   // 입장자 카운팅
const manMinus = () => {
  let num = 0;
  if(items['enterMan']>0){ num = --items['enterMan']}else{return}
fireIdea.manUp(folder,roomName,{enterMan:num});
return;
}
const manStart = (roomvalue) => {
fireIdea.manUp(folder,roomvalue,{enterMan:1});
return;
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

   
  const downloadScreenshot = async() => {
    domtoimage.toJpeg(document.getElementById('divToPrint'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'saveIMG.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }
  
    
  // 화면캡쳐 모달창3
  const fire = () => {
    if(!video){return}
    Swal.fire({  html:`<div id="divToPrint" >${video}`,width:'90%',
    confirmButtonText: '캡쳐 및 저장', showCancelButton: true,})
    .then((result)=>{if(result.isConfirmed){downloadScreenshot()}})  
    }

  // 자료입력 모달
  const fireInsert = async(e)=>{
    e.preventDefault();
    const { value: text } = await Swal.fire({
      input: 'textarea', 
      width:'80%', height:'500px',
      inputValue: video||'',
      title: '공유자료',
      // showCancelButton: false
    })
    if (text) {
      Swal.fire({html:text,width:'90%'})
    fireIdea.videoSave(folder, user.uid,'See', text);
    }
  }
   // 링크입력 모달
   const linkInsert = async(e)=>{
    e.preventDefault();
    const { value: text } = await Swal.fire({
      input: 'url', 
      inputValue: addLink ,
      title: '링크를 입력해주세요.',
      showCancelButton: true
    })
    if (text) {
    setAddLink(text)
    console.log(addLink)
    }
  }

     // 내용추가입력 모달
     const contentInsert = async(e)=>{
      e.preventDefault();
      const { value: text } = await Swal.fire({
        input: 'textarea', 
        inputValue: addCon ,
        title: '내용을 입력해주세요.',
        showCancelButton: false
      })
      if (text) {
      setAddCon(text)
      console.log(addCon)
      }
    }

  // 방생성
  const createRoom = () => { 
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    const dataId = Date.now();
    const data = {
      dataId: dataId,      
      uid : user.uid||'',
      name: userInfo.name||'',
      roomName : newRoom,
      title: '룸 ID',
      color : 'dark',
      userId : user.uid,
      roomUid : num,
      text:newRoom,
      text2:'',
      host:'입장'
    }
    const abc = fireIdea.roomGetSave2(folder, newRoom, dataId, data,level)
    if(abc){adminEnter2(newRoom)}else{return}
    
  }
  
  //데이터 초기화
  const dataRefresh = ()=>{
      if(!roomName||!user||items.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}     
      if(Object.entries(items).length<1){ return}
      let entry = Object.entries(items)||[];
      const itemUid = entry[0][1].uid||'';
      if(!report && items.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){ console.log('뻥',roomName)
        Swal.fire({ 
          title: '전체 내용을 삭제하겠습니까?',
          icon:'warning',
          showCancelButton: true})
        .then((result) => { if(result.isConfirmed){ 
          const data = { roomName : roomName,  host:'입장' }
          fireIdea.itemRefresh(folder, roomName, data);
          Swal.fire('삭제되었습니다.');
         
        }});
        }  
   }

  // 관리자 방입장
  const adminEnter = (e) => {
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
    f1: (p) => { setItems(p);  },
    f2: () => { setItems({}) },
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
    f1: (p) => { setItems(p);  },
    f2: () => { setItems({}) },
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
      const cf = {
        f1: (p) => { setItems({}) },  f2: () => { setItems({}) },
        f3: (p) => {  setRoom({}) },  f4: () => { setRoom({}) },
      }
      const cf2 = () => { setItems({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);
      history.push('/postit/:id');
      setDoor('입장'); setItems({});setroomName("");setRoomUid('');
      setReport(false); setSee(true); setRoom({});
      setNotice('');setVideo('');        
      roomERef.current.value=''; 
      if(!report){
      if(user.uid){
        if(user.uid.substr(0,roomSubstr)===roomName.substr(0,roomSubstr)){
          fireSync.cubeUp(folder,roomName, {host:'퇴장',enterMan:0});
        }}
      }
    }  

    // 토론방 삭제시 데이터 리셋 entering 제거
    const roomNameReset2=() => { 
      fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
      fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1);      
      const cf = {  f1: (p) => { setItems({}) }, f2: () => { setItems({}) },
                    f3: (p) => { setRoom({}) }, f4: () => { setRoom({}) },
      }
      const cf2 = () => { setItems({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);
      history.push('/postit/:id');
      setDoor('입장'); 
      setItems({});
      setroomName("");
      setRoomUid('');
      setReport(false);
      setSee(true); 
      setRoom({});
      setNotice('');
      setVideo('');
      roomERef.current.value='';  
    }  

    const roomNameHide = ()=>{roomERef.current.value=''; }
    const roomRowReset=() => {
      roomERef.current.value=''; 
        setItems(data);
      setDoor('입장'); 
      setNotice('');setVideo('');
    }  

             
  // roomName.substr(0,6) 방입장
  const enterRoom = (createRoomNum) => { 
    const roomvalue = createRoomNum || roomERef.current.value || "";
    const enterRoomId = createRoomNum || roomERef.current.value.substr(0,roomSubstr)||"";
    if(entering){
      setEntering(false); 
      roomNameReset();
      manMinus();
      setroomName("");setDoor('입장'); 
    }
    if(roomvalue.length !== 10){return;}
    if(roomvalue.length === 10&&!entering){  
        const cf1 = { 
          f1: ()=>{setroomName(roomvalue); setRoomUid(enterRoomId);setDoor('퇴장');setReport(false);
          setEntering(true);  setSee(false);},      
          f2: (p) => { setItems(p) },     
          f3: (p) => { setRoom(p) }, 
          f4: (host) => { setroomName(""); roomNameReset(); setEntering(false)}
        }          
 fireSync.roomUser(folder,roomvalue,cf1)
        }
      }

// notice 저장 - 공지 보내기
  const noticeUp = (e) => {
    e.preventDefault();
    if(!roomName){return}
    const data = noticeRef.current.value;
    fireIdea.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';    
  }

    //리포트 저장
    const reportSave = () => { console.log(items,Object.values(items)[0])
      // if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
      if(!roomName||!user||items.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}    
      if (!Object.values(items)[0]){Swal.fire('제목을 입력해주세요.'); return}
      else{   
      // fireIdea.reportSave(folder, roomId, roomName, value).then(()=>{Swal.fire('저장완료')})
          Swal.fire({ title: '내용을 저장하겠습니까?', icon:'warning', showCancelButton: true})
          .then((result) => { if(result.isConfirmed){  
            const roomUid =  user.uid.substr(0,roomSubstr);
            const roomId = roomUid+'REPORT';
            const value = items
          fireIdea.reportSave(folder, roomId, roomName, value);
          Swal.fire('저장되었습니다.');        
      }})
    }}
      
    // 아이템 삭제
  const dataDel = () => {  
    if(!report){
    if(!roomName||!user||items.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}
    }
    if(Object.entries(items).length<1){ return}
    let entry = Object.entries(items)||[];
    const itemUid = entry[0][1].uid||'';
    if(!report && items.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){ console.log('뻥',roomName)
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
      fireIdea.dataDel(folder,roomName); 
        Swal.fire('삭제되었습니다.');
        roomNameReset2();
      }});
      }  

      if(report&&items.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){ 
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+items.roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
        const roomUid =   user.uid.substr(0,roomSubstr);
        const roomId = roomUid+'REPORT';
        fireIdea.reportDel(folder,roomId,items.roomName);   
        Swal.fire('삭제되었습니다.');
        roomNameReset();
        setEntering(false); 
        manMinus();
        setroomName("");setDoor('입장'); 
      }});
    }
    
  } 
  //로켓발사
  const rocketOn = () => {
    rocketRef.current.classList.add("rocketOn");
    setTimeout(() => {
      rocketRef.current.classList.remove("rocketOn");
      clearTimeout(rocketOn);
    }, 500);
  }


const submit = (e) => {
  // e.preventDefault();
  if(!roomName){return;}
  // const title = titleRef2.current.value ||'';//Link
  const text = textRef.current.value; //내용
  let text2 = addCon; //Content
  if(roomAdmin&&addLink&&!addCon){text2 = `<iframe src=${addLink} width="90%" height="500px"/>`}
  if(!text){ Swal.fire({title:'내용을 입력해주세요.',icon:'warning'}) }
  if (userInfo && text ) { 
          const dataId = Date.now();
          const data = {
            uid: user.uid||'',
            dataId: dataId,
            name: userInfo.name||'',
            title: addLink,
            text: text,
            text2: text2,
            today: today,
            progress: 0,
            color : 'secondary',
            ip : ipAPI,
            photoData
          }
          fireIdea.itemSave2(folder, roomName, dataId, data)
          textRef.current.value = '';
          setPhotoData(''); rocketOn();
          setAddLink(''); setAddCon('')
      }
    }

const upLoad = (e) => { console.log('uplod')
  const imgDataId = Date.now();
  const file = e.target.files[0];
  
  const metaData = { contentType: mime.lookup(file.name) } ||''
  fireIdea.imgUpload( imgDataId, file, metaData, (e) => setPhotoData(e));
  console.log(file.name,file,metaData)
}
  return (
    <div className="idea" >       
    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <ProblemReport setLinkCopy={setLinkCopy} fireSync={fireSync} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo} enterRoom={enterRoom}
      moveModal2={moveModal2} report={report} setItems={setItems} setDoor={setDoor} setEntering={setEntering}  /> 
    }
    </div> 
    <div className="drawerback backNone" ref={backRef} onClick={moveModal2} style={{zIndex:"1"}}></div>
   
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
<<<<<<< HEAD
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'85px'}} ref={roomERef} />
=======
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'85px',borderBottom:"solid 1px",borderTop:"solid 1px"}} ref={roomERef} />
>>>>>>> 0bd8cd7a6933ee1c57929c3afd2f2795e49e24fd
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
<<<<<<< HEAD
        <form className="adimBar"  onSubmit={noticeUp} >
         {/* <Tooltip arrow placement="left" title="메시지 전송">
          <button className="btnRoomLink" style={{width:"40px"}} onClick={noticeUp}><AddCommentIcon/></button> 
=======
        <form className="adimBar" onSubmit={noticeUp} >
         {/* <Tooltip arrow placement="left" title="메시지 전송" style={{visibility:"none"}}>
          <button className="btnRoomLink" style={{width:"40px",visibility:"none"}} onClick={noticeUp}><AddCommentIcon/></button> 
          </Tooltip> */}
          <input type="text" className="enterInput" placeholder="전달사항" ref={noticeRef} />
         {/* <Tooltip arrow placement="left" title="회의자료 입력">
          <button className="enterBtn"  style={{width:'30px'}} onClick={fireInsert}><YouTubeIcon/></button> 
>>>>>>> 0bd8cd7a6933ee1c57929c3afd2f2795e49e24fd
          </Tooltip> */}
          <input type="text" className="enterInput" placeholder="전달사항" ref={noticeRef} />
        </form>
      }
        {/* <div className="noticeTitle" > 공지 </div> */}
      <div className="s-header noticeHeader" ref={titleRef}>
         {/* 접속자 카운트 */}
         <Badge badgeContent={items.enterMan||0} color="error" style={{width:'40px', paddingLeft:'10px',marginTop:'2px'}}>
          <InsertEmoticon /> 
        </Badge> 
        <div className="enterTitle" >{notice}</div>  
      </div>

{/* 여기부터 todo스타일 */}
      <div className="ideas" >
        <div className="idea-items">
        {
          Object.keys(items).map((e) => {
            return <Idearow key={e} ipAPI={ipAPI} user={user} fireSync={fireSync} roomAdmin={roomAdmin} item={items[e]} roomName={roomName} fireIdea={fireIdea} level={level} setColor={setColor} color={color} report={report} />
          })
        }
        </div>
        {/* {entering && */}
        <div className="idea-input">
          <div onSubmit={submit} className="idea-form">

          <Tooltip arrow  placement="top" title="링크첨부"> 
            <button className="btnadd" style={{ outline: "none", border: "none" }} onClick={linkInsert} >
            <LinkIcon  /> {addLink?'첨부됨!':'링크추가'}</button>
          </Tooltip>
          
          <Tooltip arrow  placement="top" title="추가내용 첨부"> 
            <button className="btnadd" style={{ outline: "none", border: "none" }} onClick={contentInsert}>
              <VisibilityIcon/> {addCon?'첨부됨!':'내용추가'}</button>
          </Tooltip>
          
          {roomName && <input accept="image/*" style={{ display: 'none' }} id="imgData" type="file" onChange={upLoad} /> }
          <Tooltip arrow className="btnadd" placement="top" title="사진첨부"> 
          <label htmlFor="imgData" style={{ height:"25px",margin:"0",textAlign:"center"}}> 
              <IconButton  className="btnadd" size="small" component="span" style={{height:"22px",color:"var(--Bcolor)"}}> <AddPhotoAlternateIcon />
                {photoData?'추가됨!':'사진추가'}</IconButton>
            </label>
          </Tooltip>
         
          <Tooltip arrow  placement="top" title="내용저장"> 
            <button className="btnadd" style={{ outline: "none", border: "none",color:"white",fontSize:'16px' }} onClick={()=>{submit();}} >
              <span className="rocket" ref={rocketRef} style={{fontSize:"16px"}} >🚀</span>  저장</button>
          </Tooltip>

            <input type="text"className="textarea titleText" ref={textRef} cols="20" rows="4"  minlength="4" size="10" style={{height:"80px",fontSize:"20px"}} placeholder="제목/내용을 입력해주세요."
            // maxlength="20" 
            />
          </div>
        </div>    
        </div>
      </div>      
  );
}
export default memo(Idea);