import {  IconButton} from '@material-ui/core';
import {  DeleteForever,   MenuSharp } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './solving.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import Swal from 'sweetalert2';
// import placeholder from './placeholder';
import { useHistory,useParams } from 'react-router-dom';
// import firesync from '../../service/firesync';
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
  const [roomName, setroomName] = useState(id||'');
  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true)
  //입장중
  const [door, setDoor] = useState('입장')
  const [userUID, setUserUID] = useState('');

  //itemrow  
  const [items, setItems] = useState({});
  const today = new Date().toLocaleDateString();
  const [color, setColor] = useState('primary');
  setlogoName('실시간톡');
   //데이터싱크 
  useEffect(() => {
    if(id.length===10){roomERef.current.value=id; enterRoom();}
    fireSync.onAuth((e) => {
      const cf = {
        f1: (p) => { setItems(p) },
        f2: () => { setItems({}) },
        f3: (p) => { setRoom(p) },
        f4: () => { setRoom({}) },
      }
      if (e && roomName) {
         setRoomUid(e.uid.substr(0, roomSubstr));
         setUserUID(e.uid);
          const stopDataSync = fireSync.dataSync(folder, roomName, cf);
          const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
          return ()=>{stopDataSync();stoproomSync();}
      }
      else if(e && !roomName){ 
          setRoomUid(e.uid.substr(0, roomSubstr));
          setUserUID(e.uid);
           const stopitemSync = fireSync.itemSync(folder,user.uid, cf);        
           const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
           return ()=>{stopitemSync();stoproomSync();}
      }
      else {
          if(!e&&!roomName){  return}
          if(roomName){
            const stopDataSync = fireSync.dataSync(folder, roomName, cf);
          const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
          return ()=>{stopDataSync();stoproomSync();}

           }
      }
    })
  }, [roomName,fireSync,roomUid,user,userInfo,data]);
  
  //수업자료와 공지사항 싱크
  useEffect(() => {    
    if(!roomName){return}
    if(roomName){ 
      const stopvideoSync = fireIdea.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      const stopvideoSync2 = fireIdea.videoSync(folder,roomName,'Tok',(p)=>{
        setNotice(p); 
        // titleRef.current.classList.add("noticeFly");
        // setTimeout(()=>{titleRef.current.classList.remove("noticeFly")},500);
      return ()=>{stopvideoSync(); stopvideoSync2(); }
    })
    }
     
  },[fireIdea,roomName]);

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
    }
    fireIdea.roomGetSave(folder, newRoom, dataId, data);
  }

    // input roomName 초기화
    const roomNameReset=() => {
      fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
      fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1);  
      const cf = {
        f1: (p) => { setItems({}) },  f2: () => { setItems({}) },
        f3: (p) => {  setRoom({}) },  f4: () => { setRoom({}) },
      }
      const cf2 = () => { setdata({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);
      roomERef.current.value=''; 
      setdata({});setroomName("");setDoor('입장'); setRoomUid('');
      setEntering(false); setSee(true); setRoom({}); setItems({});
      setNotice('');setVideo('');  history.push('/solving/:id');      
    }  
             
  // roomName.substr(0,6) 방입장
  const enterRoom = () => { 
    const roomvalue = roomERef.current.value || "";
    const enterRoomId =  roomERef.current.value.substr(0,roomSubstr)||"";
    if(entering){roomNameReset(); }
    if(roomvalue.length !== 10||!enterRoomId||entering){return;}
    if(roomvalue.length === 10&&!entering){       
        const cf1=()=>{
            setroomName(roomvalue);
            setRoomUid(enterRoomId);
            setDoor('퇴장');
            setEntering(true);
            setSee(false);
          }          
        fireSync.roomUser(folder,enterRoomId,cf1);
        
        const cf2 = {
            f1: (p) => { setItems(p) },
            f2: () => { setItems({}) },
            f3: (p) => { setRoom(p) },
            f4: () => { setRoom({}) },
          }
        fireSync.dataSync(folder,roomvalue, cf2);
        }
      }

  // 관리자 방입장
  const adminEnter = (e) => {
    // roomNameReset();
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room;
    setroomName(roomUid +room);
    roomERef.current.value =roomname; 
       setEntering(true);
       setDoor('퇴장');
       // enterRoom();
  }

// notice 저장 - 공지 보내기
  const noticeUp = (e) => {
    e.preventDefault();
    if(!roomName){return}
    const data = noticeRef.current.value;
    fireIdea.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';
    
  }
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
        roomERef.current.value='';
        //  Swal.fire('삭제되었습니다.');
      
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
      <div className="s-header">
        <div className="enterWrap" >
       <button className="enterBtn" onClick={enterRoom} style={{fontSize:'12px'}} >{door}</button>
        
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'85px'}} ref={roomERef} />
        </div>
        {level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  }
          {/* 스위치호출 */}
        <div className="enterTitle" > 
        <IconButton size="small" onClick={submit}  > 
          <AddCircleOutlineIcon style={{color:"var(--Bcolor)"}}   /> 
        </IconButton>
        </div>    

        <div className="voicechat" style={{marginLeft:"86px"}} >             
          <button style={{width:'30px'}}  onClick={fire}>
             <VoiceChatIcon fontSize='small' />
          </button>
          {/* onClick={moveModal} */}
          {/* <button style={{width:'30px'}} > 
            <MenuSharp />
          </button>  */}
        </div>        
      </div>
        {/* <div className="noticeTitle" > 공지 </div> */}
      <div className="s-header noticeHeader" ref={titleRef}>
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