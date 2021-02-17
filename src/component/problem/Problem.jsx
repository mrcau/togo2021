import { Badge, IconButton, Switch } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, ThumbUp } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './problem.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import ProblemReport from './problemReport';
import Swal from 'sweetalert2';
import placeholder from './placeholder';
import { useHistory } from 'react-router-dom';

function Problem({ fireProblem, fireSync, user, userInfo }) {
  const folder = "problem";
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  
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
  
   //데이터싱크 
  useEffect(() => {
    fireSync.onAuth((e) => {
      const cf = {
        f1: (p) => { setdata(p) },
        f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) },
        f4: () => { setRoom({}) },
      }
      if (e && report===false) {
        console.log('회원+리포트false',e,'report::',report,'룸네임:',roomName,user,userInfo,'로그인중');
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
        console.log('로그인정보 없음','report::',report,roomName,user,userInfo);
        // report===false||
        if(!e&&!roomName){
        console.log('룸네임이 없으면 퇴장');
        return}
       const cf = {
          f1: (p) => { setdata(p) },
          f2: () => { setdata({}) },
          f3: (p) => { setRoom(p) },
          f4: () => { setRoom({}) },
        }
       if(report && roomName){
         console.log('비회원이지만 리포트가 true 이고 룸네임이 있으면','report::',report)
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
  
    // 좋아요
    const [Switch0, setSwitch0] = useState(true);
    const [Switch1, setSwitch1] = useState(true);
    const [Switch2, setSwitch2] = useState(true);
    const [Switch3, setSwitch3] = useState(true);
    
    const goodPlus = (goodNum,Switch,setSwitch) => {
      console.log('goodNum,Switch,roomName,report',goodNum,Switch,roomName,'리포트::',report)
        if(data[goodNum]===undefined){data[goodNum]=0}
        if(roomName){
      Switch ? data[goodNum]++ : data[goodNum]--;
      setSwitch(!Switch);
      fireProblem.goodUp(folder, roomName,goodNum,data[goodNum]);
      }
    }
    
    const goodPlus2 = (goodNum,Switch,setSwitch) => {
      console.log('굿플러스2 goodNum,Switch,roomName,report',goodNum,Switch,roomName,report);
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

  let good =[data.good0,data.good1,data.good2,data.good3,data.good4,
            data.good5,data.good6,data.good7]

  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    setroomName(newRoom);
    const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'',aTitle:'',bName: '',input3: '', 
    input4: '',input5: '',input6: '',  good0:0, good1:0, good2:0, good3:0, good4:0, good5:0, good6:0, good7:0,userId:user.uid}
    const roomget = fireProblem.roomGet(folder,roomUid)
    roomget < 8 && 
    fireProblem.roomSave(folder, newRoom, data)
  }
    // input roomName 초기화
    const roomNameReset=() => {
      const stopvideoSync = fireSync.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      stopvideoSync(); 

      const cf = {
        f1: (p) => { setdata({}) },
        f2: () => { setdata({}) },
        f3: (p) => {  setRoom({}) },
        f4: () => { setRoom({}) },
      }
      const stopDataSync = fireSync.dataSync(folder, roomName, cf);
      stopDataSync();

      roomERef.current.value=''; 
      const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'', aTitle:'',bName: '',input3: '',input4:'',input5:'',input6:'', roomName:''}
      setdata(data);setroomName("");setDoor('입장'); setRoomUid('');
      setReport(false); setEntering(false); setSee(true); setRoom({});
      setNotice('');setVideo('');history.push('/problem');
      // window.location.reload(false); 
    }  
    const roomNameHide = ()=>{roomERef.current.value=''; }
    const roomRowReset=() => {console.log('roomRowReset')
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
    if(entering&&roomvalue){roomNameReset(); }else if(entering&&!roomvalue){roomRowReset();}
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
    // roomNameReset();
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room;
    setroomName(roomUid +room);
    roomERef.current.value =roomname;     
    setReport(false); 
    setSwitch0(true); setSwitch1(true); 
    setSwitch2(true); setSwitch3(true); 
       setEntering(true);
       setDoor('퇴장');
       // enterRoom();
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
    if (roomName!==roomERef.current.value||roomERef.current.value===''||report) {
        // setdata({});
        return }
    const data = {
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
    // const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    // fireProblem.dataUp(folder, roomERef.current.value, data);
    fireProblem.dataUp(folder, roomName, data);
  }

  //데이터 리셋
  const dataReset = () => {         
    aTitle.current.value = '';
    bName.current.value = '';
    input3.current.value = '';
    input4.current.value = '';
    input5.current.value = '';
    input6.current.value = '';
    roomERef.current.value = '';
    problemS.current.value = '';
    problemC.current.value = '';
    problemA.current.value = '';
    problemM.current.value = '';
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
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',
      cDate : today|| '', 
      dataId : dataId|| '',
      userId : user.uid|| '',
      input3: input3.current.value || '',
      input4: input4.current.value || '',
      input5: input5.current.value || '',
      input6: input6.current.value || '',
      scamS: problemS.current.value || '',
      scamC: problemC.current.value || '',
      scamA: problemA.current.value || '',
      scamM: problemM.current.value || '',
      scamP: problemP.current.value || '',
      good7:0,
      roomName:roomName || ''
    }
    // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    if(!roomName&&userUID){
      const roomId = user.uid;
      if(!data.aTitle||!data.bName||!data.input3||!data.input4||!data.input5||!data.input6){
        Swal.fire({title:'빈칸을 모두 채워주세요!',icon:'warning'})}else{
          Swal.fire({title:'제출완료',icon:'success'});
          fireProblem.reportSave(folder, roomId, dataId, data);
        }        
    }else{
    const roomUid =  roomERef.current.value.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    if(!data.aTitle||!data.bName||!data.input3||!data.input4||!data.input5||!data.input6){
      Swal.fire({title:'빈칸을 모두 채워주세요.',icon:'warning'})}else{
        Swal.fire({title:'제출완료',icon:'success'});
        fireProblem.reportSave(folder, roomId, roomName, data);
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
      fireProblem.reportDel(folder,user.uid,data.dataId); dataReset();
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
        fireProblem.reportDel(folder,roomId,roomName)
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
      fireProblem.dataDel(folder,roomName);   
      dataReset();
      }});
    }
    
  } 
//  console.log(report)
//titleRef.current.classList.add("noticeFly");
  return (
    <div className="problem" >     

    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <ProblemReport fireSync={fireSync} fireProblem={fireProblem} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo} 
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
          <span > 관찰 </span>
          <Switch checked={state.triz} name="triz" onChange={handleChange} size="small" 
          color="default" />  
          <span > 공감 </span>
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
      

        <form className="s-items" ref={formRef} >
          
          
          <div className="s-item">
            <div className="s-itemTitle" sty>{placeData.title1} 
            {!report && roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[0]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good0',Switch0,setSwitch0)} />
              </Badge>            
            </IconButton> }
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text1} 
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
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text2} 
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
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text3} 
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
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text4} 
            ref={problemM} onChange={onSubmit} value={data.scamM} />
          </div>

          <div className="inputBox" >
            <div className="s-itemTitle" style={{width:"100%"}}>5WHY질문</div>
            <textarea cols="30" rows="1" className="problemInput input1" ref={aTitle} 
            onChange={onSubmit} value={data.aTitle} placeholder="해결하려고 하는 문제는?" />
            <textarea cols="30" rows="1" className="problemInput input2" ref={bName} 
            onChange={onSubmit} value={data.bName} placeholder={placeData.why1} />
            <textarea cols="30" rows="1" className="problemInput input3" ref={input3} 
            onChange={onSubmit} value={data.input3} placeholder={placeData.why2} />            
            <textarea cols="30" rows="1" className="problemInput input4" ref={input4} 
            onChange={onSubmit} value={data.input4} placeholder={placeData.why3} />
            <textarea cols="30" rows="1" className="problemInput input5 " ref={input5} 
            onChange={onSubmit} value={data.input5} placeholder={placeData.why4} />
            <textarea cols="30" rows="1" className="problemInput input6" ref={input6} 
            onChange={onSubmit} value={data.input6} placeholder={placeData.why5} />            
          </div>
          
          <div className="s-item">
            <div className="s-itemTitle">문제정의</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder="해결하고자 하는 최종 문제는?" 
            ref={problemP} onChange={onSubmit} value={data.scamP} />
            <input type="button" className="problemInput btn" onClick={btnInput} value="저장"/>
          </div>

        </form>
      </div>
  );
}


export default memo(Problem);