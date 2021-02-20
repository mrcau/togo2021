import { Badge, IconButton, Switch } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, ThumbUp } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './datastudy.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import startupReport from './startupReport';
import Swal from 'sweetalert2';
import placeholder from './placeholder';
import { useHistory } from 'react-router-dom';
import fireproblem from '../../service/fireproblem';

function Cube({ fireProblem, fireSync, user, userInfo }) {
  const folder = "cube";
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const roomERef = useRef();
  const formRef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const drawerRef = useRef();
  const backRef = useRef();
  const history = useHistory();
  const Pen = '•'
  
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

  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomName, setroomName] = useState('');
  const [roomUid, setRoomUid] = useState('');
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const placeData = placeholder
  const [rightModal,setrightModal] = useState(false);
  const [entering, setEntering] = useState(false);
  const [see, setSee] = useState(true)
  //입장중
  const [door, setDoor] = useState('입장')
  const [report, setReport] = useState(false);
  const [userUID, setUserUID] = useState('');
  // const [cube, setCube] = useState('');
  
   //데이터싱크 
  useEffect(() => {
    fireSync.onAuth((e) => {
      const cf = {
        f1: (p) => { setdata(p) },  f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) },  f4: () => { setRoom({}) },
      }
      if (e && report===false) {
        setRoomUid(e.uid.substr(0, roomSubstr));
        setUserUID(e.uid);
       const stopDataSync = fireSync.dataSync(folder, roomName, cf);
       const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
        return ()=>{stopDataSync();stoproomSync();}
      }else if(e && !roomName){
        const stopdataSyncB =  fireSync.dataSyncB(folder, roomName, cf);
       const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
       return ()=>{stopdataSyncB();stoproomSync();}
      }
      else {
        if(!e&&!roomName){ return}
        const cf = { f1: (p) => { setdata(p) }, f2: () => { setdata({}) },
          f3: (p) => { setRoom(p) },  f4: () => { setRoom({}) },
        }
       if(report && roomName){
         const stopdataSyncB =  fireSync.dataSyncB(folder, roomName, cf);
         const stoproomSync = fireSync.roomSync(folder, roomUid, cf);
         return ()=>{stopdataSyncB();stoproomSync();}
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
        titleRef.current.classList.add("noticeFly");
        setTimeout(()=>{titleRef.current.classList.remove("noticeFly")},1000);})
        return ()=>{stopvideoSync(); stopvideoSync2(); }
    }
     
  },[fireSync,roomName,report]);    
    
    // const goodPlus = (goodNum,Switch,setSwitch) => {
    //   console.log(data)
    //     if(data[goodNum]===undefined){data[goodNum]=0}
    //     if(roomName){
    //   Switch ? data[goodNum]++ : data[goodNum]--;
    //   setSwitch(!Switch);
    //   fireProblem.goodUp(folder, roomName,goodNum,data[goodNum]);
    //   }
    // }
    
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
    fireProblem.videoSave(folder, user.uid,'See', text);
    }
  }
  

  // 큐브입력 모달
  const fireArea = async(T,t)=>{
    // e.preventDefault();
    if(!roomName){return}
    const cubeData = fireSync.cubeSync(folder, roomName, T, t);
    const cube = cubeData ||'';
    const { value: text } = await Swal.fire({
      html:cube, width:'80%',height:'90vh',
      input: 'textarea',
      inputPlaceholder: '이곳에 자료를 입력해주세요.',
      inputAttributes: {'aria-label': 'Type your message here'},
      showCancelButton: true
    })
    if (text) {
      Swal.fire(text)
      const data = {[t]:text}
    fireProblem.cubeDataUp(folder, roomName, T, data);
  }
  }

  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    setroomName(newRoom);
    const data = {userId:user.uid,text1:'',text2:'',text3:'',text4:'',text5:'',text6:'',text7: '',text8: '', 
    text9: ''}
    fireProblem.roomGetSave(folder, newRoom, data)
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

    // input roomName 초기화
    const roomNameReset=() => {
      fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); },1);
      fireSync.videoSync(folder,roomName,'Tok',(p)=>{setNotice(p);},1);      
      const cf = {  f1: (p) => { setdata({}) }, f2: () => { setdata({}) },
                    f3: (p) => { setRoom({}) }, f4: () => { setRoom({}) },
      }
      const cf2 = () => { setdata({});setRoom({});  }
      fireSync.roomUser(folder,roomUid,cf2,1);        
      fireSync.dataSync(folder, roomName, cf,1);
      fireSync.cubeSync(folder, roomName, 'T1','t1',1);      
      dataReset(); setroomName("");setDoor('입장'); setRoomUid('');
      setReport(false); setEntering(false); setSee(true); setRoom({});
      setNotice('');setVideo('');history.push('/cube');
      roomERef.current.value='';  setdata({});
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
       fireSync.roomUser(folder,enterRoomId,cf1);
        
        const cf2 = {
            f1: (p) => { setdata(p) },
            f2: () => { setdata({}) },
            f3: (p) => { setRoom(p) },
            f4: () => { setRoom({}) },
          }
        fireSync.dataSync(folder,roomvalue, cf2);
        }
    }

  // 관리자 방입장
  const adminEnter = (e) => {
    if(roomName){roomNameReset();}else{
    dataReset();
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room;
    setroomName(roomUid +room);
    roomERef.current.value =roomname;     
    setReport(false); 
       setEntering(true);
       setDoor('퇴장');
    }
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
    if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
    const data = {
      text1: text1.current.value || '', text2: text2.current.value || '', text3: text3.current.value || '', text4: text4.current.value || '',
      text5: text5.current.value || '', text6: text6.current.value || '', text7: text7.current.value || '', text8: text8.current.value || '', text9: text9.current.value || '',  

    }    
    fireProblem.dataUp(folder, roomName, data);
  }


// 큐브 데이터 저장
  const onSubmit2 = (e,p) => {
    if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
    const  evalue = e.current.value ||'';
    const data = {[p]:evalue}
    fireSync.cubeUp(folder, roomName,data );
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
      fireProblem.reportDel(folder,user.uid,data.dataId); roomNameReset();
      }});
      }
    
    if(roomName && report && data.userId === user.uid){      
        Swal.fire({ 
          title: '정보를 삭제하겠습니까?',
          text:"삭제될 게시물 : "+data.text10,
          icon:'warning',
          showCancelButton: true})
        .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
        const roomUid =  roomName.substr(0,roomSubstr);
        const roomId = roomUid+'REPORT';
        fireProblem.reportDel(folder,roomId,roomName)
        roomNameReset();
        }});
      }

      if(roomName!==roomERef.current.value||roomERef.current.value==='') { return }
      
      if(data.userId === user.uid){  
      Swal.fire({ 
        title: '토론방을 삭제하겠습니까?',
        text:"삭제될 토론방 : "+roomName,
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){ 
      fireProblem.dataDel(folder,roomName);   
      Swal.fire('삭제되었습니다.');
      roomNameReset();
      }});
    }
    
  } 
//  console.log(report)
//titleRef.current.classList.add("noticeFly");
  return (
    <div className="datastudy" >     
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
      <div className="s-header">
        <div className="enterWrap" >
       <button className="enterBtn" onClick={enterRoom} style={{fontSize:'12px'}} >{door}</button>
        
          <input type="text" className="enterInput roomnum" placeholder="방번호" style={{width:'85px'}} ref={roomERef} />
        </div>
        {level>0 && <button className="btnRoomDel" style={{margin:'0'}} onClick={dataDel}><DeleteForever /></button>  }

          {/* 스위치호출 */}
        <div className="enterTitle" > </div>    
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
      
      <div className="mandarat">
        <div className="box">
          <div className="items items1">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t1} onChange={()=>onSubmit2(T1t1,'T1t1')} value={data.T1t1}  /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t2} onChange={()=>onSubmit2(T1t2,'T1t2')} value={data.T1t2}  /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t3} onChange={()=>onSubmit2(T1t3,'T1t3')} value={data.T1t3}  /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t4} onChange={()=>onSubmit2(T1t4,'T1t4')} value={data.T1t4}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text1} ref={T1t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t6} onChange={()=>onSubmit2(T1t6,'T1t6')} value={data.T1t6}  /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t7} onChange={()=>onSubmit2(T1t7,'T1t7')} value={data.T1t7}  /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t8} onChange={()=>onSubmit2(T1t8,'T1t8')} value={data.T1t8}  /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T1','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T1t9} onChange={()=>onSubmit2(T1t9,'T1t9')} value={data.T1t9}  /></div>
          </div>
          <div className="items items2">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t1} onChange={()=>onSubmit2(T2t1,'T2t1')} value={data.T2t1}  /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t2} onChange={()=>onSubmit2(T2t2,'T2t2')} value={data.T2t2}  /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t3} onChange={()=>onSubmit2(T2t3,'T2t3')} value={data.T2t3}  /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t4} onChange={()=>onSubmit2(T2t4,'T2t4')} value={data.T2t4}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text2} ref={T2t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t6} onChange={()=>onSubmit2(T2t6,'T2t6')} value={data.T2t6}  /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t7} onChange={()=>onSubmit2(T2t7,'T2t7')} value={data.T2t7}  /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t8} onChange={()=>onSubmit2(T2t8,'T2t8')} value={data.T2t8}  /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T2','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T2t9} onChange={()=>onSubmit2(T2t9,'T2t9')} value={data.T2t9}  /></div>
          
          </div>
          <div className="items items3">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t1} onChange={()=>onSubmit2(T3t1,'T3t1')} value={data.T3t1}  /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t2} onChange={()=>onSubmit2(T3t2,'T3t2')} value={data.T3t2}  /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t3} onChange={()=>onSubmit2(T3t3,'T3t3')} value={data.T3t3}  /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t4} onChange={()=>onSubmit2(T3t4,'T3t4')} value={data.T3t4}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text3} ref={T3t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t6} onChange={()=>onSubmit2(T3t6,'T3t6')} value={data.T3t6}  /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t7} onChange={()=>onSubmit2(T3t7,'T3t7')} value={data.T3t7}  /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t8} onChange={()=>onSubmit2(T3t8,'T3t8')} value={data.T3t8}  /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T3','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T3t9} onChange={()=>onSubmit2(T3t9,'T3t9')} value={data.T3t9}  /></div>
          
          </div>
          <div className="items items4">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t1} onChange={()=>onSubmit2(T4t1,'T4t1')} value={data.T4t1}  /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t2} onChange={()=>onSubmit2(T4t2,'T4t2')} value={data.T4t2}  /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t3} onChange={()=>onSubmit2(T4t3,'T4t3')} value={data.T4t3}  /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t4} onChange={()=>onSubmit2(T4t4,'T4t4')} value={data.T4t4}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text4} ref={T4t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t6} onChange={()=>onSubmit2(T4t6,'T4t6')} value={data.T4t6}  /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t7} onChange={()=>onSubmit2(T4t7,'T4t7')} value={data.T4t7}  /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t8} onChange={()=>onSubmit2(T4t8,'T4t8')} value={data.T4t8}  /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T4','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T4t9} onChange={()=>onSubmit2(T4t9,'T4t9')} value={data.T4t9}  /></div>
          
          </div>
          <div className="items items5 itemsCenter">
            <div className="item item1"><textarea cols="10" rows="1"  className="itemArea area1" ref={text1} onChange={onSubmit} value={data.text1} /></div>
            <div className="item item2"><textarea cols="10" rows="1"  className="itemArea area2" ref={text2} onChange={onSubmit} value={data.text2} /></div>
            <div className="item item3"><textarea cols="10" rows="1"  className="itemArea area3" ref={text3} onChange={onSubmit} value={data.text3} /></div>
            <div className="item item4"><textarea cols="10" rows="1"  className="itemArea area4" ref={text4} onChange={onSubmit} value={data.text4} /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area5" ref={text5} onChange={onSubmit} value={data.text5} /></div>
            <div className="item item6"><textarea cols="10" rows="1"  className="itemArea area6" ref={text6} onChange={onSubmit} value={data.text6} /></div>
            <div className="item item7"><textarea cols="10" rows="1"  className="itemArea area7" ref={text7} onChange={onSubmit} value={data.text7} /></div>
            <div className="item item8"><textarea cols="10" rows="1"  className="itemArea area8" ref={text8} onChange={onSubmit} value={data.text8} /></div>
            <div className="item item9"><textarea cols="10" rows="1"  className="itemArea area9" ref={text9} onChange={onSubmit} value={data.text9} /></div>
          
          </div>
          <div className="items items6">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t1} onChange={()=>onSubmit2(T6t1,'T6t1')} value={data.T6t1} /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t2} onChange={()=>onSubmit2(T6t2,'T6t2')} value={data.T6t2} /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t3} onChange={()=>onSubmit2(T6t3,'T6t3')} value={data.T6t3} /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t4} onChange={()=>onSubmit2(T6t4,'T6t4')} value={data.T6t4} /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text6} ref={T6t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t6} onChange={()=>onSubmit2(T6t6,'T6t6')} value={data.T6t6} /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t7} onChange={()=>onSubmit2(T6t7,'T6t7')} value={data.T6t7} /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t8} onChange={()=>onSubmit2(T6t8,'T6t8')} value={data.T6t8} /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T6','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T6t9} onChange={()=>onSubmit2(T6t9,'T6t9')} value={data.T6t9} /></div>
          
          </div>
          <div className="items items7">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t1} onChange={()=>onSubmit2(T7t1,'T7t1')} value={data.T7t1} /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t2} onChange={()=>onSubmit2(T7t2,'T7t2')} value={data.T7t2} /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t3} onChange={()=>onSubmit2(T7t3,'T7t3')} value={data.T7t3} /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t4} onChange={()=>onSubmit2(T7t4,'T7t4')} value={data.T7t4} /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text7} ref={T7t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t6} onChange={()=>onSubmit2(T7t6,'T7t6')} value={data.T7t6} /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t7} onChange={()=>onSubmit2(T7t7,'T7t7')} value={data.T7t7} /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t8} onChange={()=>onSubmit2(T7t8,'T7t8')} value={data.T7t8} /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T7','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T7t9} onChange={()=>onSubmit2(T7t9,'T7t9')} value={data.T7t9} /></div>
          
          </div>
          <div className="items items8">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t1} onChange={()=>onSubmit2(T8t1,'T8t1')} value={data.T8t1}  /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t2} onChange={()=>onSubmit2(T8t2,'T8t2')} value={data.T8t2}  /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t3} onChange={()=>onSubmit2(T8t3,'T8t3')} value={data.T8t3}  /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t4} onChange={()=>onSubmit2(T8t4,'T8t4')} value={data.T8t4}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text8} ref={T8t5} /></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t6} onChange={()=>onSubmit2(T8t6,'T8t6')} value={data.T8t6}  /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t7} onChange={()=>onSubmit2(T8t7,'T8t7')} value={data.T8t7}  /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t8} onChange={()=>onSubmit2(T8t8,'T8t8')} value={data.T8t8}  /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T8','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T8t9} onChange={()=>onSubmit2(T8t9,'T8t9')} value={data.T8t9}  /></div>
          
          </div>
          <div className="items items9">
            <div className="item item1">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t1')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t1} onChange={()=>onSubmit2(T9t1,'T9t1')} value={data.T9t1}  /></div>
            <div className="item item2">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t2')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t2} onChange={()=>onSubmit2(T9t2,'T9t2')} value={data.T9t2}  /></div>
            <div className="item item3">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t3')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t3} onChange={()=>onSubmit2(T9t3,'T9t3')} value={data.T9t3}  /></div>
            <div className="item item4">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t4')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t4} onChange={()=>onSubmit2(T9t4,'T9t4')} value={data.T9t4}  /></div>
            <div className="item item5"><textarea cols="10" rows="1"  className="itemArea area" disabled value={data.text9}  ref={T9t5}/></div>
            <div className="item item6">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t6')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t6} onChange={()=>onSubmit2(T9t6,'T9t6')} value={data.T9t6}  /></div>
            <div className="item item7">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t7')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t7} onChange={()=>onSubmit2(T9t7,'T9t7')} value={data.T9t7}  /></div>
            <div className="item item8">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t8')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t8} onChange={()=>onSubmit2(T9t8,'T9t8')} value={data.T9t8}  /></div>
            <div className="item item9">{roomName&&<button className="eye" onClick={()=>fireArea('T9','t9')} >{Pen}</button>}<textarea cols="10" rows="1" className="itemArea btnArea" ref={T9t9} onChange={()=>onSubmit2(T9t9,'T9t9')} value={data.T9t9}  /></div>
          
          </div>
        </div>
      </div>
      </div>
  );
}


export default memo(Cube);