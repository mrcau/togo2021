import { Badge, IconButton, Switch } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, ThumbUp } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './startup.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import StartupReport from './startupReport';
import Swal from 'sweetalert2';
import placeholder from './placeholder';
import { useHistory,useParams } from 'react-router-dom';

function Startup({ fireProblem, fireSync, user, userInfo ,setlogoName }) {
  const folder = "startup";
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
  
  const writer = useRef();
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const text4 = useRef();
  const text5 = useRef();
  const text6 = useRef();
  const text7 = useRef();
  const text8 = useRef();
  const text9 = useRef();
  const text10 = useRef();
  const text11 = useRef();
  const text12 = useRef();
  const text13 = useRef();
  // 좋아요
  const [Switch1, setSwitch1] = useState(true);
  const [Switch2, setSwitch2] = useState(true);
  const [Switch3, setSwitch3] = useState(true);
  const [Switch4, setSwitch4] = useState(true);
  const [Switch5, setSwitch5] = useState(true);
  const [Switch6, setSwitch6] = useState(true);
  const [Switch7, setSwitch7] = useState(true);
  const [Switch8, setSwitch8] = useState(true);
  const [Switch9, setSwitch9] = useState(true);

  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const {id}=useParams();
  const [roomName, setroomName] = useState(id||'');
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
  setlogoName('StartUp');
   //데이터싱크 
  useEffect(() => {
    if(id.length===10){roomERef.current.value=id; enterRoom();}
    fireSync.onAuth((e) => {
      const cf = {
        f1: (p) => { setdata(p) }, f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) }, f4: () => { setRoom({}) },
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
        if(!e&&!roomName){ return }
       const cf = { f1: (p) => { setdata(p) },  f2: () => { setdata({}) },
          f3: (p) => { setRoom(p) }, f4: () => { setRoom({}) },
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
        // titleRef.current.classList.add("noticeFly");
        // setTimeout(()=>{titleRef.current.classList.remove("noticeFly")},1000);
      })
        return ()=>{stopvideoSync(); stopvideoSync2(); }
    }  
  },[fireSync,roomName,report]);    
    
    const goodPlus = (goodNum,Switch,setSwitch) => {
      console.log(data)
        if(data[goodNum]===undefined){data[goodNum]=0}
        if(roomName){
      Switch ? data[goodNum]++ : data[goodNum]--;
      setSwitch(!Switch);
      fireProblem.goodUp(folder, roomName,goodNum,data[goodNum]);
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
            data.good5,data.good6,data.good7,data.good8,data.good9]

  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    setroomName(newRoom);
    const data = {userId:user.uid,text1:'',text2:'',text3:'',text4:'',text5:'',text6:'',text7: '',text8: '', 
    text9: '',text10: '',text11: '', text12: '',text13: '', good0:0, good1:0, good2:0, good3:0, good4:0, 
    good5:0, good6:0, good7:0,good8:0, good9:0,writer:''}
    // const roomget = fireProblem.roomGet(folder,roomUid)
    // roomget < 8 && 
    fireProblem.roomGetSave(folder, newRoom, data)
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
         
      dataReset(); setroomName("");setDoor('입장'); setRoomUid('');
      setReport(false); setEntering(false); setSee(true); setRoom({});
      setNotice('');setVideo('');history.push('/startup/:id');
      roomERef.current.value=''; 
    }  

    const roomNameHide = ()=>{roomERef.current.value=''; }
    const roomRowReset=() => {console.log('roomRowReset')
      roomERef.current.value=''; 
      const data = {writer:'',text1:'',text2:'',text3:'',text4:'',text5:'',text6:'',text7: '',text8: '', 
      text9: '',text10: '',text11: '', text12: '',text13: ''}
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
    setSwitch1(true); setSwitch2(true); setSwitch3(true); setSwitch4(true);
    setSwitch5(true); setSwitch6(true); setSwitch7(true); setSwitch8(true); setSwitch9(true); 
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
      text1: text1.current.value || '',
      text2: text2.current.value || '',
      text3: text3.current.value || '',
      text4: text4.current.value || '',
      text5: text5.current.value || '',
      text6: text6.current.value || '',
      text7: text7.current.value || '',
      text8: text8.current.value || '',
      text9: text9.current.value || '',
      text10: text10.current.value || '',
      text11: text11.current.value || '',
      text12: text12.current.value || '',
      text13: text13.current.value || '',
      writer: writer.current.value || '',
    }    
    // const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    // fireProblem.dataUp(folder, roomERef.current.value, data);
    fireProblem.dataUp(folder, roomName, data);
  }
  //데이터 리셋
  const dataReset = () => {    
    text1.current.value = '';
    text2.current.value = '';
    text3.current.value = '';
    text4.current.value = '';
    text5.current.value = '';
    text6.current.value = '';
    text7.current.value = '';
    text8.current.value = '';
    text9.current.value = '';
    text10.current.value = '';
    text11.current.value = '';
    text12.current.value = '';
    text13.current.value = '';
    writer.current.value = '';
    roomERef.current.value='';    
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
      Date : today|| '', 
      dataId : dataId|| '',
      userId : user.uid|| '',
      roomName:roomName || '',
      text1: text1.current.value || '',
      text2: text2.current.value || '',
      text3: text3.current.value || '',
      text4: text4.current.value || '',
      text5: text5.current.value || '',
      text6: text6.current.value || '',
      text7: text7.current.value || '',
      text8: text8.current.value || '',
      text9: text9.current.value || '',
      text10: text10.current.value || '',
      text11: text11.current.value || '',
      text12: text12.current.value || '',
      text13: text13.current.value || '',
      writer: writer.current.value || '',
    }
    // if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    if(!roomName&&userUID){
      const roomId = user.uid;
      if(!data.writer||!data.text10||!data.text11||!data.text12||!data.text13){
        Swal.fire({title:'빈칸을 모두 채워주세요!',icon:'warning'})}else{
          Swal.fire({title:'제출완료',icon:'success'});
          fireProblem.reportSave(folder, roomId, dataId, data);
        }        
    }else{
    const roomUid =  roomERef.current.value.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    if(!data.writer||!data.text10||!data.text11||!data.text12||!data.text13){
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
      .then((result) => { if(result.isConfirmed){ Swal.fire('삭제되었습니다.');
      fireProblem.dataDel(folder,roomName);   
      roomNameReset();
      }});
    }
    
  } 
//  console.log(report)
//titleRef.current.classList.add("noticeFly");
  return (
    <div className="problem" >     

    <div className="drawer" ref={drawerRef}>
    {rightModal && 
     <StartupReport fireSync={fireSync} fireProblem={fireProblem} user={user} folder={folder} setroomName={setroomName} roomRowReset={roomRowReset}
      roomName={roomName} setReport={setReport} roomNameHide={roomNameHide} userInfo={userInfo} 
      moveModal2={moveModal2} setdata={setdata} setDoor={setDoor} setEntering={setEntering}  /> 
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
      

        <form className="s-items" ref={formRef} >
          
          
          <div className="s-item">
            <div className="s-itemTitle" sty>{placeData.title1} 
            {!report && roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[1]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good1',Switch1,setSwitch1)} />
              </Badge>            
            </IconButton> }
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text1} 
            ref={text1}  onChange={onSubmit} value={data.text1} />
          </div>
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title2}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[2]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good2',Switch2,setSwitch2)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text2} 
            ref={text2} onChange={onSubmit} value={data.text2} />
          </div>
        
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title3}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[3]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good3',Switch3,setSwitch3)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text3} 
            ref={text3} onChange={onSubmit} value={data.text3} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title4}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[4]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good4',Switch4,setSwitch4)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text4} 
            ref={text4} onChange={onSubmit} value={data.text4} />
          </div>
          
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title5}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[5]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good5',Switch5,setSwitch5)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text5} 
            ref={text5} onChange={onSubmit} value={data.text5} />
          </div>
          
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title6}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[6]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good6',Switch6,setSwitch6)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text6} 
            ref={text6} onChange={onSubmit} value={data.text6} />
          </div>

          
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title7}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[7]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good7',Switch7,setSwitch7)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text7} 
            ref={text7} onChange={onSubmit} value={data.text7} />
          </div>

          
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title8}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[8]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good8',Switch8,setSwitch8)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text8} 
            ref={text8} onChange={onSubmit} value={data.text8} />
          </div>

          
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title9}
            {!report &&roomName &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[9]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good9',Switch9,setSwitch9)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text9} 
            ref={text9} onChange={onSubmit} value={data.text9} />
          </div>

          <div className="inputBox" >
            <div className="s-itemTitle" style={{width:"100%"}}>{placeData.title10}</div>
            <textarea cols="30" rows="1" className="problemInput input1" ref={writer} 
            onChange={onSubmit} value={data.writer} placeholder={placeData.writer} />
            <textarea cols="30" rows="1" className="problemInput input2" ref={text10} 
            onChange={onSubmit} value={data.text10} placeholder={placeData.text10} />
            <textarea cols="30" rows="1" className="problemInput input3" ref={text11} 
            onChange={onSubmit} value={data.text11} placeholder={placeData.text11} />            
            <textarea cols="30" rows="1" className="problemInput input4" ref={text12} 
            onChange={onSubmit} value={data.text12} placeholder={placeData.text12} />
            <textarea cols="30" rows="1" className="problemInput input5 " ref={text13} 
            onChange={onSubmit} value={data.text13} placeholder={placeData.text13} />       
            <input type="button" className="problemInput btn" onClick={btnInput} value="저장"/>
          </div>
          
          {/* <div className="s-item">
            <div className="s-itemTitle">문제정의</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder="해결하고자 하는 최종 문제는?" 
            ref={problemP} onChange={onSubmit} value={data.scamP} />
            <input type="button" className="problemInput btn" onClick={btnInput} value="저장"/>
          </div> */}

        </form>
      </div>
  );
}


export default memo(Startup);