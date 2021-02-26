import {  IconButton,Badge} from '@material-ui/core';
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

function Solving({ fireIdea, fireSync, user, userInfo ,setlogoName }) {
  const folder = "solving";
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const roomERef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const history = useHistory();
  const {id}=useParams();
  const [reportId, setReportId] = useState(id||'') ;
  const [roomName, setroomName] = useState(id||'');
  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true)
  const [linkCopy, setLinkCopy] = useState('');
  const [rightModal,setrightModal] = useState(false);
  const drawerRef = useRef();
  const backRef = useRef();
  //입장중
  const [door, setDoor] = useState('입장')
  const [report, setReport] = useState(false);
  const [userUID, setUserUID] = useState('');

  //itemrow  
  const [items, setItems] = useState({});
  const today = new Date().toLocaleDateString();
  const [color, setColor] = useState('primary');
  setlogoName('게시툴');
   //데이터싱크 
  useEffect(() => {console.log('length10')
    if(id.length===10){ 
      const cf = () => {  setroomName(id);enterRoom(); roomERef.current.value=id;  }
      fireSync.roomUser(folder,id,cf)
    }
    if(id.length===12){setroomName(id.substr(0,10)); console.log('length12')
      const cf = () => {roomERef.current.value=id.substr(0,10); setReportId(id); setroomName(id.substr(0,10));setReport(true); enterRoom();} 
      fireSync.roomUser(folder,id.substr(0,10),cf);
    }
    if(id.length===10){roomERef.current.value=id; enterRoom();}

    fireSync.onAuth((e) => {
      if(!e&&!roomName){ return}

      const cf = {
        f1: (p) => { setItems(p) },  f2: () => { setItems({}) },
        f3: (p) => { setRoom(p) },   f4: () => { setRoom({}) },
      }

      if (e && report===false) { console.log('로그인하고 리포트false')
         setRoomUid(e.uid.substr(0, roomSubstr));
         setUserUID(e.uid);
          const stopDataSync = fireSync.dataSync(folder, roomName, cf);
          const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
          return ()=>{stopDataSync();stoproomSync();}
      }
      else if(e && !roomName&& !report){  console.log('로그인하고  룸네임 없고 리포트false',id)
          setRoomUid(e.uid.substr(0, roomSubstr));
          setUserUID(e.uid);
           const stopitemSync = fireSync.itemSync(folder,user.uid, cf);        
           const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
           return ()=>{stopitemSync();stoproomSync();}
      }
      else { console.log('리포트 트루',roomName,data.dataId,data,report,id);
          const cf = { f1: (p) => { setdata(p);setroomName(roomName) }, f2: () => { setdata({}) } }
          if(report){
            const roomId = user.uid ? user.uid.substr(0,6)+'REPORT': id.substr(0,6)+'REPORT';
            const value = data.length>0 ? data.dataId :  id.substr(0,10)
            const stopdataSync = fireSync.reportSync2(folder,roomId,value,cf);     
            return ()=>{stopdataSync();}
           }
      }
    })
  }, [roomName,fireSync,report,roomUid,user,userInfo]);
  
  //수업자료와 공지사항 싱크
  useEffect(() => {    
    if(roomName&&!report){ 
      const stopvideoSync = fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      const stopvideoSync2 = fireSync.videoSync(folder,roomName,'Tok',(p)=>{
        setNotice(p); 
      })
        return ()=>{stopvideoSync(); stopvideoSync2(); }
    }
     
  },[fireSync,roomName,report]);    

  //입장자 카운팅
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
      title:'',text:''

    }
    fireIdea.roomGetSave(folder, newRoom, dataId, data);
  }

    // input roomName 초기화
    const roomNameReset=() => {
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
      //  history.push('/solving/:id');      
    }  
             
  //   const manMinus = () => {
  //     let num = 0;
  //     if(items['enterMan']>0){ num = --items['enterMan']}else{return}
  //   fireIdea.manUp(folder,roomName,{enterMan:num});
  // return;
  //   }
    
  const roomNameHide = ()=>{roomERef.current.value=''; }
  const roomRowReset=() => {
    roomERef.current.value=''; 
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
    if(entering){
      setEntering(false); roomNameReset();
      //  manMinus();
      setroomName("");setDoor('입장');      
    }
    if(roomvalue.length !== 10){ return;}
    if(roomvalue.length === 10&&!entering){       
        const cf1=()=>{
            setroomName(roomvalue);
            setRoomUid(enterRoomId);
            setDoor('퇴장');
            setReport(false);
            setEntering(true);
            setSee(false);
          }          
        fireSync.roomUser(folder,roomvalue,cf1);        
        const cf2 = {
            f1: (p) => { setItems(p) },
            f2: () => { setItems({}) },
            f3: (p) => { setRoom(p) },
            f4: () => { setRoom({}) },
          }
        fireSync.dataSync(folder,roomvalue, cf2);
        // let num = ++data['enterMan']||0 ;
        // fireSync.cubeUp(folder,roomName, {enterMan:num});
        }
      }

  // 관리자 방입장
  const adminEnter = (e) => {
    // roomNameReset();
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room;
    setroomName(roomUid +room);
    roomERef.current.value =roomname; 
  setLinkCopy('http://localhost:3000/'+folder+'/'+roomUid +room);  
  setEntering(true);
       setDoor('퇴장');    
       const cf2 = {
         f1: (p) => { setItems(p);  },
         f2: () => { setItems({}) },
         f3: (p) => { setRoom(p) },
         f4: () => { setRoom({}) },
       }
     fireSync.dataSync(folder,roomname, cf2);
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
    // 아이템 삭제
  const dataDel = () => { 
    if(Object.entries(items).length<1){ return}
    let entry = Object.entries(items)||[];
    const itemUid = entry[0][1].uid||'';
    // const itemUid2 = entry[0][1].uid||'';
    if(!roomName&&itemUid && itemUid === user.uid){ 
      Swal.fire({ 
        title: '내정보를 삭제하겠습니까?',
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
      fireIdea.myIdeaDel(folder,user.uid); 
      }});
      }  
      if(roomName!==roomERef.current.value||roomERef.current.value==='') { return }      
      if(itemUid === user.uid){  
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){
        fireIdea.dataDel(folder,roomName);   
        roomNameReset();
      
      }});
    }
    
  } 
  

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

  return (
    <div className="solving" >     
    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <ProblemReport setLinkCopy={setLinkCopy} fireSync={fireSync} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo} enterRoom={enterRoom}
      moveModal2={moveModal2} report={report} setItems={setItems} setDoor={setDoor} setEntering={setEntering}  /> 
    }
    </div>
    <div className="drawerback backNone" ref={backRef} onClick={moveModal2}></div>
      {level>0 && 
        <form className="adimBar">
          <button className="enterBtn"  onClick={noticeUp}><AddCommentIcon/></button> 
          <input type="text" className="enterInput" placeholder="전달사항" ref={noticeRef} />
          <button className="enterBtn"  style={{width:'30px'}} onClick={fireInsert}><YouTubeIcon/></button> 
        </form>
      }
      {level>0 &&
        <div className="adimBar">
          <div> <button className="enterBtn" onClick={createRoom} style={{fontSize:'12px'}}>개설</button> </div>
          <div className="enterNumber" style={{fontSize:'small'}}>
            {see && room && Object.keys(room).map((e) => e.length>3 &&
              <button key={e} className="btnRoom" onClick={adminEnter} >{e}</button>) 
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
           <IconButton size="small" component="span" onClick={()=> { if(roomName){Swal.fire({ title: '링크가 복사되었습니다.',text:linkCopy,icon:'warning'});}}}
             style={{color:"var(--Bcolor)"}}>
               <CopyToClipboard text={linkCopy}>               
                <div ><LinkIcon /> <span className="topMenuA">링크 </span> </div>
                </CopyToClipboard>
          </IconButton>
          }
          
        {level>0 && entering &&        
        <IconButton size="small" onClick={submit} style={{flex:'auto',color:"var(--Bcolor)",minWidth:"40px",padding:"0"}} > 
          <AddCircleOutlineIcon  />  <span className="topMenuA">추가 </span> 
        </IconButton>
        }

          {level>0 && 
          <IconButton size="small"  onClick={reportSave} style={{color:"var(--Bcolor)",flex:"auto",minWidth:"40px",padding:"0"}}>
                <SaveIcon />  <span className="topMenuA">저장 </span> 
          </IconButton>
          }

        {level>0 && 
          <IconButton size="small" component="span" onClick={dataDel} style={{color:"var(--Bcolor)",padding:"0"}}>
                <DeleteForever />  <span className="topMenuA">삭제 </span> 
          </IconButton>
        }
        {/* 게시판추가 */}
        </div>
        <div className="voicechat"  >             
          <button style={{width:'30px'}}  onClick={fire}>
             <VoiceChatIcon fontSize='small' />
          </button>          
          <button style={{width:'30px'}} onClick={moveModal}> 
            <MenuSharp />
          </button> 
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
      <div className="s-items">
        {/* <div className="s-item"> */}
        {
          Object.keys(items).map((e) => {
            return <div className="s-item"> 
             <Solvingrow roomERef={roomERef} key={e} item={items[e]} roomName={roomName} fireIdea={fireIdea} level={level} setColor={setColor} color={color} />
             </div>
          })
        }
  
        </div>
      </div>      
  );
}
export default memo(Solving);