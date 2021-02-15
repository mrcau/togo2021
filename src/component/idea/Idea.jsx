import { Badge, IconButton, Switch } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, ThumbUp } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './idea.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import IdeaReport from './IdeaReport';
import Swal from 'sweetalert2';
import placeholder from './placeholder';
import { useHistory } from 'react-router-dom';
import firesync from '../../service/firesync';
import Idearow from './Idearow';

function Idea({ fireIdea, fireSync, user, userInfo }) {
  const folder = "idea";
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
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

  //itemrow  
  const [items, setItems] = useState({});
  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef2 = useRef();
  const rocketRef = useRef();
  const [color, setColor] = useState('primary');
  
   //데이터싱크 
  useEffect(() => {
    fireSync.onAuth((e) => {
      const cf = {
        f1: (p) => { setItems(p) },
        f2: () => { setItems({}) },
        f3: (p) => { setRoom(p) },
        f4: () => { setRoom({}) },
      }
      if (e && report===false && roomName) {
        console.log('회원+리포트false',e,'report::',report,'룸네임:',roomName,user,userInfo,'로그인중');
        // const roomUid = e.uid.substr(0, roomSubstr);
        setRoomUid(e.uid.substr(0, roomSubstr));
        setUserUID(e.uid);
       const stopDataSync = fireSync.dataSync(folder, roomName, cf);
       const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
        // fireSync.authSync('auth',e.uid,(p)=>setLevel(p))
        return ()=>{stopDataSync();stoproomSync();}
      }else if(e && !roomName){ console.log('회원이지만 룸네임 없음.')
       const stopdataSyncB =  fireSync.dataSyncB(folder, roomName, cf);
       const stopitemSync = fireSync.itemSync(folder,user.uid, cf);        
       return ()=>{stopdataSyncB();stopitemSync();}
      }
      else {
        console.log('로그인정보 없음','report::',report,roomName,user,userInfo);
        if(!e&&!roomName){ console.log('룸네임이 없으면 퇴장');  return}
       const cf = {
          f1: (p) => { setdata(p) },
          f2: () => { setdata({}) },
          f3: (p) => { setRoom(p) },
          f4: () => { setRoom({}) },
        }
       if(report && roomName){
         console.log('비회원이지만 리포트가 true 이고 룸네임이 있으면','report::',report)         
        const stopdataSyncB =  fireSync.dataSyncB(folder, roomName, cf);
        return ()=>{stopdataSyncB();}
       }
      }
    })
  }, [roomName,fireSync,report,roomUid,user,userInfo]);
  
  //수업자료와 공지사항 싱크
  useEffect(() => {    
    if(roomName&&!report){ 
      const stopvideoSync = fireIdea.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      const stopvideoSync2 = fireIdea.videoSync(folder,roomName,'Tok',(p)=>{
        setNotice(p); 
        titleRef.current.classList.add("noticeFly");
        setTimeout(()=>{titleRef.current.classList.remove("noticeFly")},1000);
      return ()=>{stopvideoSync(); stopvideoSync2(); }
    })
    }
     
  },[fireIdea,roomName,report]);
  
  console.log(items)

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
    setroomName(newRoom);
    const data = {scamP:'',userId:user.uid}
    const roomget = fireIdea.roomGet(folder,roomUid)
    roomget < 8 && 
    fireIdea.roomSave(folder, newRoom, data)
  }
    // input roomName 초기화
    const roomNameReset=() => {console.log('roomNameReset')
      roomERef.current.value=''; 
      const data = {scamP:'', roomName:''}
      setdata(data);setroomName("");setDoor('입장'); setRoomUid('');
      setReport(false); setEntering(false); setSee(true); setRoom({});
      setNotice('');setVideo('');history.push('/problem');
      window.location.reload(false); 
    }  
    const roomRowReset=() => {console.log('roomRowReset')
      roomERef.current.value=''; 
      const data = {scamP:'', roomName:''}
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
    if(entering){roomNameReset(); }
    if(roomvalue.length !== 10||!enterRoomId||entering){return;}
    if(roomvalue.length === 10&&!entering){
        const cf1=()=>{
            setroomName(roomvalue);
            setRoomUid(enterRoomId);
            setDoor('퇴장');
            setReport(false);
            setEntering(true);
            setSee(false);
          }          
       fireIdea.roomUser(folder,enterRoomId,cf1);
        
        const cf2 = {
            f1: (p) => { setdata(p) },
            f2: () => { setdata({}) },
            f3: (p) => { setRoom(p) },
            f4: () => { setRoom({}) },
          }
        firesync.dataSync(folder,roomvalue, cf2);

        }
    }

  // 관리자 방입장
  const adminEnter = (e) => {
    // roomNameReset();
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room;
    setroomName(roomUid +room);
    roomERef.current.value =roomname;     
    setReport(false); 
       setEntering(true);
       setDoor('퇴장');
       // enterRoom();
  }

// notice 저장 - 공지 보내기
  const noticeUp = (e) => {
    e.preventDefault();
    const data = noticeRef.current.value;
    fireIdea.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';
    
  }
  //problem 글 데이터 저장, 방개수 6개 이하일때만 데이터 저장
  const onSubmit = () => {
    if (roomName!==roomERef.current.value||roomERef.current.value===''||report) {
        // setdata({});
        return }
    const data = {
      scamP: problemP.current.value || '',
    }    
    // const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    // fireIdea.dataUp(folder, roomERef.current.value, data);
    fireIdea.dataUp(folder, roomName, data);
  }

  //데이터 리셋
  const dataReset = () => {    
    problemP.current.value = '';
  }
    

   // 보고서 제출
   const btnInput = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString().substr(5);
    const dataId =  Date.now();
    // const id = Date.now();
    // if (Object.keys(user).length<1) { return }
    if (!roomName&&!userUID) { return }
    const data = {
      cDate : today|| '', 
      dataId : dataId|| '',
      userId : user.uid|| '',
      scamP: problemP.current.value || '',
      good7:0,
      roomName:roomName || ''
    }
    // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    if(!roomName&&userUID){
      const roomId = user.uid;
      if(!data.scamP){
        Swal.fire({title:'빈칸을 모두 채워주세요!',icon:'warning'})}else{
          Swal.fire({title:'제출완료',icon:'success'});
          fireIdea.reportSave(folder, roomId, dataId, data);
        }        
    }else{
    const roomUid =  roomERef.current.value.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    if(!data.scamP){
      Swal.fire({title:'빈칸을 모두 채워주세요.',icon:'warning'})}else{
        Swal.fire({title:'제출완료',icon:'success'});
        fireIdea.reportSave(folder, roomId, roomName, data);
      }
    }
  }

    // 아이템 삭제
  const dataDel = () => {
    console.log(report,data.userId,user.uid)
    if(report && data.dataId && data.userId === user.uid){ 
      Swal.fire({ 
        title: '내정보를 삭제하겠습니까?',
        text:"삭제될 게시물 : "+data.aTitle,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
      fireIdea.reportDel(folder,user.uid,data.dataId); dataReset();
      }});
      }
    
    if(roomName && report && data.userId === user.uid){      
        Swal.fire({ 
          title: '정보를 삭제하겠습니까?',
          text:"삭제될 게시물 : "+data.aTitle,
          icon:'warning',
          showCancelButton: true})
        .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
        const roomUid =  roomName.substr(0,roomSubstr);
        const roomId = roomUid+'REPORT';
        fireIdea.reportDel(folder,roomId,roomName)
        dataReset();
        }});
      }

      if(roomName!==roomERef.current.value||roomERef.current.value==='') { return }
      
      if(data.userId === user.uid){  
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
      fireIdea.dataDel(folder,roomName);   
      dataReset();
      }});
    }
    
  } 
//  console.log(report)
//titleRef.current.classList.add("noticeFly");

  //로켓발사
  const rocketOn = () => {
    rocketRef.current.classList.add("rocketOn");
    setTimeout(() => {
      rocketRef.current.classList.remove("rocketOn");
      clearTimeout(rocketOn);
    }, 1000);
  }

const submit = (e) => {
  e.preventDefault();
  if(e.currentTarget == null){return;}
  const title = titleRef2.current.value;
  const text = textRef.current.value;
  const text2 = textRef2.current.value;
  console.log(title,user,userInfo)
  if(!title || !text){ Swal.fire({title:'제목과 내용을 입력해주세요.',icon:'warning'}) }
  if (userInfo && title && text ) {
    rocketOn();
    const dataId = Date.now();
    const data = {
      uid: user.uid,
      dataId: dataId,
      name: userInfo.name,
      title: title,
      text: text,
      text2: text2,
      today: today,
      progress: 0,
      color : 'secondary'
    }
    fireIdea.itemSave(folder,data);      
    titleRef2.current.value = '';
    textRef.current.value = '';
    textRef2.current.value = '';
  }
}

  return (
    <div className="idea" >     

    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <IdeaReport fireIdea={fireIdea} user={user} userUID={userUID} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} drawerRef={drawerRef} userInfo={userInfo} 
      moveModal2={moveModal2} report={report} setdata={setdata} setDoor={setDoor} setEntering={setEntering}  /> 
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
            {see && room && Object.keys(room).map((e) =>
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
        </div>    
        <div className="voicechat" >             
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
        <div className="enterTitle" >{notice}</div>  
      </div>

{/* 여기부터 todo스타일 */}
      <div className="ideas">
        <div className="idea-items">
        {
          Object.keys(items).map((e) => {
            return <Idearow key={e} item={items[e]} fireIdea={fireIdea} level={level} setColor={setColor} color={color} />
          })
        }
        </div>

        <div className="idea-input">
          <form onSubmit={submit} className="idea-form">
            <input type="text" ref={titleRef2} className="inputTitle" placeholder="제목"/>
            <button className="btnadd" style={{ outline: "none", border: "none" }} >
              <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
            <textarea className="textarea" ref={textRef} cols="30" rows="2" placeholder="내용" />
            <textarea className="textarea" ref={textRef2} cols="30" rows="2" 
            style={{borderTop: 'dashed 1px'}} placeholder="소스코드" />
          </form>
        </div>
        
        <form  ref={formRef}  onSubmit={btnInput}  >  
          <div className="s-item"  >
            {/* <div className="s-itemTitle">최종아이디어</div> */}
            <textarea  className="textarea" cols="30" rows="3" placeholder="최종 아이디어" 
            ref={problemP} onChange={onSubmit} value={data.scamP} />
            <input type="button" className="problemInput btn" onClick={btnInput} value="저장"/>
          </div>
        </form>
        </div>



      </div>
      
  );
}


export default memo(Idea);