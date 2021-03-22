import {  IconButton,Badge,Tooltip} from '@material-ui/core';
import {  DeleteForever,   MenuSharp ,InsertEmoticon } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './solving.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import Swal from 'sweetalert2';
import ProblemReport from './problemReport';
import { useHistory,useParams } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Solvingrow from './Solvingrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';

function Solving({ fireIdea, fireSync, user, userInfo ,setlogoName }) {
  const folder = "solving";
  const {id}=useParams();
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const roomERef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const history = useHistory();
  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [reportId, setReportId] = useState(id||'') ;
  const [roomName, setroomName] = useState('');
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true)
  const [rightModal,setrightModal] = useState(false);
  const drawerRef = useRef();
  const [linkCopy, setLinkCopy] = useState('');
  const backRef = useRef();
  const [reportInput, setReportInput] = useState(false);
  const [userClass, setUserClass] = useState(false)
  //입장중
  const [door, setDoor] = useState('입장')
  const [report, setReport] = useState(false);
  const [userUID, setUserUID] = useState('');

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
    f1: ()=>{setroomName(id.substr(0,10)); setRoomUid(enterRoomId);setDoor('퇴장');setReport(true); setReportInput(true);  
    setEntering(true);  setSee(false);roomERef.current.value ='';},      
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
      const cf = {
        f1: (p) => { setItems(p) },  f2: () => { setItems({}) },
        f3: (p) => { setRoom(p) },   f4: () => { setRoom({}) },
      }

      if (e && report===false && id.length<10) {   console.log('로그인하고 리포트false','room',room)
         setRoomUid(e.uid.substr(0, roomSubstr));
         setUserUID(e.uid);
          const stopDataSync = fireSync.dataSync(folder, roomName, cf);
          const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
          if(data.dataId){ if(data.dataId.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true)} }
          return ()=>{stopDataSync();stoproomSync();}
      }  
      else  if(e && report){ console.log('로그인 레포트',items,roomName,report,items.roomName);
      if(items.roomName){ if(items.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){setUserClass(true); setItems(items); setReport(true)} }
      } 
      else {return}
    })
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
  
  // useEffect(() => {
  //   if(entering&&roomERef.current.value&&roomName){
  //     let num = ++items['enterMan']||0 ;
  //     console.log(entering,folder,num,roomName,items,items['enterMan'])
  // fireIdea.manUp(folder,roomName,{enterMan:num});
  //   }
  //   return ()=>{manMinus();}
  // },[entering])
  
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

  //모달창3
  const fire = () => {Swal.fire({html:video, width:'90%'})}
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
    fireIdea.videoSave(folder, user.uid,'See', text);
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
      roomUid : num,
      progress: 0,
      color : 'secondary',
      title:'',text:'',
      host:'입장'
    }
    fireIdea.roomGetSave(folder, newRoom, dataId, data);
  }

  //데이터 초기화
  const dataRefresh = ()=>{
    if(!roomName||!user||items.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}     
    if(Object.entries(items).length<1){ return}
    let entry = Object.entries(items)||[];
    // const itemUid = entry[0][1].uid||'';
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
         f1: (p) => { setItems(p); },
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
      history.push('/solving/:id');
      setDoor('입장');setItems({});setroomName("");
      setRoomUid('');setReport(false); setSee(true); setRoom({}); 
      setNotice('');setVideo(''); 
      roomERef.current.value=''; 
      
      if(user.uid){
        if(user.uid.substr(0,roomSubstr)===roomName.substr(0,roomSubstr)){
          fireSync.cubeUp(folder,roomName, {host:'퇴장',enterMan:0});
        }}
    }  
             
    // 토론방 삭제시 데이터 리셋 entering 제거
    const roomNameReset2=() => {
      fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
      fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1);  
      const cf = { f1: (p) => { setItems({}) },  f2: () => { setItems({}) },
                   f3: (p) => {  setRoom({}) },  f4: () => { setRoom({}) },
      }
      const cf2 = () => { setItems({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);
      history.push('/solving/:id');
      setDoor('입장');setItems({});setroomName("");
      setRoomUid('');setReport(false); setSee(true); setRoom({}); 
      setNotice('');setVideo(''); 
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
  const enterRoom = () => { 
    const roomvalue = roomERef.current.value || "";
    const enterRoomId =  roomERef.current.value.substr(0,roomSubstr)||"";
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
 fireSync.roomUser(folder,roomvalue,cf1).then(()=>{ manStart(roomvalue); })
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
   const reportSave = () => {
     if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
    if (Object.values(items)[0].title.length<1){Swal.fire('내용을 입력해주세요.')}else{
     const roomUid =  user.uid.substr(0,roomSubstr);
     const roomId = roomUid+'REPORT';
     const value = items
     fireIdea.reportSave(folder, roomId, roomName, value).then(()=>{Swal.fire('저장완료')})
       }}

  

const submit = (e) => {
  if(!roomName&&!user.uid){return;}
   
  if (userInfo  ) {
    // rocketOn();
    const dataId = Date.now();
    const data = {
      dataId: dataId,
      uid: user.uid||'',
      name: userInfo.name||'',
      title: '',
      text: '',
      today: today,
      progress: 0,
      color : 'secondary'
    }
    if(roomName){fireIdea.itemSave2(folder, roomName, dataId, data)}
    else{fireIdea.itemSave(folder,data); }
  }
}

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

    if(report&&items.roomName.substr(0,roomSubstr) === user.uid.substr(0,roomSubstr)){  console.log('치지마',user.uid.substr(0,roomSubstr))
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
    // 아이템 삭제
    // const dataDel = () => { 
    //   if(!report){
    //   if(!roomName||!user||items.roomName.substr(0,roomSubstr) !== user.uid.substr(0,roomSubstr)){return}
    //   }

    //   if(Object.entries(items).length<1){ return}
    //   let entry = Object.entries(items)||[];
    //   const itemUid = entry[0][1].uid||'';
    //   // const itemUid2 = entry[0][1].uid||'';
    //   if(!roomName&&itemUid && itemUid === user.uid){ 
    //     Swal.fire({ 
    //       title: '내정보를 삭제하겠습니까?',
    //       icon:'warning',
    //       showCancelButton: true})
    //     .then((result) => { if(result.isConfirmed){ 
    //     fireIdea.myIdeaDel(folder,user.uid); 
    //     Swal.fire('삭제되었습니다.');
    //     roomNameReset2();
    //     }});
    //   }  
    //     if(roomName!==roomERef.current.value||roomERef.current.value==='') { return }      
    //     if(itemUid === user.uid){  
    //     Swal.fire({ 
    //       title: '토론방을 삭제하겠습니까?',
    //       text:"삭제될 토론방 : "+roomName,
    //       icon:'warning',
    //       showCancelButton: true})
    //     .then((result) => { if(result.isConfirmed){
    //       fireIdea.dataDel(folder,roomName);   
    //     Swal.fire('삭제되었습니다.');
    //     roomNameReset2();        
    //     }});
    //   }      
    // } 

  return (
    <div className="solving" >     
    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <ProblemReport setLinkCopy={setLinkCopy} fireSync={fireSync} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo} enterRoom={enterRoom}
      moveModal2={moveModal2} report={report} setItems={setItems} setDoor={setDoor} setEntering={setEntering}  /> 
    }
    </div>
    <div className="drawerback backNone" ref={backRef} onClick={moveModal2} style={{zIndex:"1"}}></div>
      {level>0 && 
        <form className="adimBar">
         <Tooltip arrow placement="left" title="메시지 전송">
          <button className="enterBtn"  onClick={noticeUp}><AddCommentIcon/></button> 
          </Tooltip>
          <input type="text" className="enterInput" placeholder="전달사항" ref={noticeRef} />
         <Tooltip arrow placement="left" title="회의자료 입력">
          <button className="enterBtn"  style={{width:'30px'}} onClick={fireInsert}><YouTubeIcon/></button> 
          </Tooltip>
        </form>
      }
      {level>0 &&
        <div className="adimBar">
         <Tooltip arrow placement="left" title="새로운 룸 생성">
          <div> <button className="enterBtn" onClick={createRoom} style={{fontSize:'12px'}}>개설</button> </div>
          </Tooltip>
          <div className="enterNumber" style={{fontSize:'small'}}>
            {see && room && Object.keys(room).map((e,i) => e.length>3 &&
              <button key={e} className="btnRoom" onClick={adminEnter} >{i}</button>) 
            }
          </div>
        </div>
      }
      <div className="s-header" style={{display:'flex'}}>
        <div className="enterWrap" >
          <button className="enterBtn" onClick={enterRoom} style={{fontSize:'12px'}} >{door}</button>        
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'85px'}} ref={roomERef} />
        </div>

        <div style={{width:"100%", display:'flex'}}>
        {level>0 && 
         <Tooltip arrow  placement="top" title="룸링크 복사">
         <IconButton size="small" component="span" onClick={()=> { if(roomName){Swal.fire({ title: '링크가 복사되었습니다.',text:linkCopy,icon:'warning'});}}}
             style={{color:"var(--Bcolor)"}}>
               <CopyToClipboard text={linkCopy}>               
                <LinkIcon />
                </CopyToClipboard>
          </IconButton>
          </Tooltip>
          }
          
        {level>0 && entering && !report &&       
         <IconButton size="small" onClick={submit} style={{flex:'auto',color:"var(--Bcolor)",width:'30px', height:'25px'}} > 
         <Tooltip arrow  placement="top" title="페이지 추가">
          <AddCircleOutlineIcon  />  
          </Tooltip>
        </IconButton>
        }

          {level>0 && !report &&
         <IconButton size="small"  onClick={reportSave} style={{color:"var(--Bcolor)",flex:"auto",width:'30px', height:'25px'}}>
         <Tooltip arrow placement="top"  title="저장">
                <SaveIcon /> 
          </Tooltip>
          </IconButton>
          }
          {level>0 && !report &&
          <IconButton size="small" component="span" onClick={dataRefresh} style={{color:"var(--Bcolor)",flex:"auto",width:'30px', height:'25px'}}>
         <Tooltip arrow placement="top"  title="초기화">
                <ReplayIcon /> 
          </Tooltip>
          </IconButton>
          } 

        {level>0 && 
         <Tooltip arrow  placement="top" title="삭제">
          <IconButton size="small" component="span" onClick={dataDel} style={{color:"var(--Bcolor)",padding:"0",marginLeft:"auto"}}>
                <DeleteForever />  
          </IconButton>
          </Tooltip>
        }
        </div>

        <div className="voicechat"  >             
         <Tooltip arrow  placement="top" title="회의자료 보기">
          <button style={{width:'30px'}}  onClick={fire}>
             <VoiceChatIcon fontSize='small' />
          </button>          
          </Tooltip>
         <Tooltip arrow  placement="top" title="저장자료 보기">
          <button style={{width:'30px'}} onClick={moveModal}> 
            <MenuSharp />
          </button> 
          </Tooltip>
        </div>    
            
      </div>

        {/* <div className="noticeTitle" > 공지 </div> */}
      <div className="s-header noticeHeader" ref={titleRef}>
         {/* 접속자 카운트 */}
         <Badge badgeContent={items.enterMan||0} color="error" style={{width:'40px',background:'var(--Acolor)', paddingLeft:'10px',marginTop:'2px'}}>
          <InsertEmoticon  /> 
        </Badge> 
        <div className="enterTitle" style={{background:"var(--Acolor)"}} >{notice}</div>  
      </div>

{/* 여기부터 todo스타일 */}
      <div className="s-itemsv">
        {/* <div className="s-item"> */}
        {
          Object.keys(items).map((e) => { console.log(e); if(e.length>10){
            return <div className="s-item" > 
             <Solvingrow roomERef={roomERef} key={e} reportInput={reportInput} report={report} item={items[e]} roomName={roomName} fireIdea={fireIdea} level={level} setColor={setColor} color={color} />
             </div>
          }
          })
        }
  
        </div>
      </div>      
  );
}
export default memo(Solving);