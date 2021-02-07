import { Badge, IconButton, Switch } from '@material-ui/core';
import {  DeleteForever,   MenuSharp, ThumbUp } from '@material-ui/icons';
import React, { memo, useEffect,  useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './scamper.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import ScamperReport from './ScamperReport';
import Swal from 'sweetalert2';
import placeholder from './placeholder';

function Scamper({ fireApp, user, userName }) {
  const folder = "scamper";
  const roomSubstr = 6;
  const Swal = require('sweetalert2');
  
  const aTitle = useRef();
  const bName = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const scamperS = useRef();
  const scamperC = useRef();
  const scamperA = useRef();
  const scamperM = useRef();
  const scamperP = useRef();
  const scamperE = useRef();
  const scamperR = useRef();
  const roomERef = useRef();
  const formRef = useRef();
  const noticeRef = useRef();
  const titleRef = useRef();
  const drawerRef = useRef();
  const backRef = useRef();

  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomName, setroomName] = useState('');
  const [roomUid, setRoomUid] = useState('');
  const [level, setLevel] = useState(0);
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');
  const [state, setState] = useState({ triz:false,  Switch7:true });
  const placeData = state.triz ? placeholder[1] : placeholder[0];
 
  //입장중
  const [door, setDoor] = useState('입장')
  const [report, setReport] = useState(false);
  
   //데이터싱크 
  useEffect(() => {
    fireApp.onAuth((e) => {
      const cf = {
        f1: (p) => { setdata(p) },
        f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) },
        f4: () => { setRoom({}) },
      }
      if (e && report===false) {
        const roomUid = e.uid.substr(0, roomSubstr);
        setRoomUid(e.uid.substr(0, roomSubstr));
        fireApp.dataSync(folder, roomName, cf);
        fireApp.roomSync(folder, roomUid, cf);
        fireApp.authSync('auth',e.uid,(p)=>setLevel(p))
      }
      else {
        if(report===false||!roomName){return}
       const cf = {
          f1: (p) => { setdata(p) },
          f2: () => { setdata({}) },
          f3: (p) => { setRoom(p) },
          f4: () => { setRoom({}) },
        }
       if(report && roomName){
        fireApp.dataSyncB(folder, roomName, cf);
       }
      }
    })
  }, [roomName,fireApp,report]);
  
  //수업자료와 공지사항 싱크
  useEffect(() => {    
    if(roomName&&!report){ 
      fireApp.videoSync(folder,roomName,'See',(p)=>{setVideo(p); })
      fireApp.videoSync(folder,roomName,'Tok',(p)=>{
        setNotice(p); 
        titleRef.current.classList.add("noticeFly");
        setTimeout(()=>{titleRef.current.classList.remove("noticeFly")},1000)
      })
    }
  },[roomName,fireApp,report]);
  
    // 좋아요
    const [Switch0, setSwitch0] = useState(true);
    const [Switch1, setSwitch1] = useState(true);
    const [Switch2, setSwitch2] = useState(true);
    const [Switch3, setSwitch3] = useState(true);
    const [Switch4, setSwitch4] = useState(true);
    const [Switch5, setSwitch5] = useState(true);
    const [Switch6, setSwitch6] = useState(true);
    const [Switch7, setSwitch7] = useState(true);
    
    const goodPlus = (goodNum,Switch,setSwitch) => {
      console.log(goodNum,Switch,roomName,report)
        if(data[goodNum]===undefined){data[goodNum]=0}
        if(roomName){
      Switch ? data[goodNum]++ : data[goodNum]--;
      setSwitch(!Switch);
      fireApp.goodUp(folder, roomName,goodNum,data[goodNum]);
      }
    }
    
    const goodPlus2 = (goodNum,Switch,setSwitch) => {
      if(roomName){
        Switch ? data[goodNum]++ : data[goodNum]--;
        setSwitch(!Switch);
      fireApp.goodUpB(folder, roomName,goodNum,data[goodNum]);
      }
    }
    //오른쪽 모달 핸들링
    const moveModal = () => {
      drawerRef.current.classList.add("moveDrawer");
      backRef.current.classList.remove("backNone");    
    }
    const moveModal2 = () => {
      drawerRef.current.classList.remove("moveDrawer");
      backRef.current.classList.add("backNone");    
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
    fireApp.videoSave(folder, user.uid,'See', text);
    }
  }

  let good =[data.good0,data.good1,data.good2,data.good3,data.good4,
            data.good5,data.good6,data.good7]

  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    setroomName(newRoom);
    const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'',scamE:'',scamR:'',aTitle:'',bName: '',input3: '', 
    input4: '',input5: '',input6: '',  good0:0, good1:0, good2:0, good3:0, good4:0, good5:0, good6:0, good7:0,}
    const roomget = fireApp.roomGet(folder,roomUid)
    roomget < 8 && 
    fireApp.roomSave(folder, newRoom, data)
  }

// notice 저장 - 공지 보내기
  const noticeUp = (e) => {
    e.preventDefault();
    const data = noticeRef.current.value;
    fireApp.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';
    
  }
  //scamper 글 데이터 저장, 방개수 6개 이하일때만 데이터 저장
  const onSubmit = () => {
    if (roomName!==roomERef.current.value||roomERef.current.value===''||report) { return }
    const data = {
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',

      input3: input3.current.value || '',
      input4: input4.current.value || '',
      input5: input5.current.value || '',
      input6: input6.current.value || '',
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }    
    const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    fireApp.dataUp(folder, roomName, data)
  }
   // 보고서 제출
   const btnInput = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString().substr(5);
    // const id = Date.now();
    if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    const data = {
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',
      cDate : today,
      input3: input3.current.value || '',
      input4: input4.current.value || '',
      input5: input5.current.value || '',
      input6: input6.current.value || '',
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
      good7:0,
      roomName:roomName
    }
    const roomUid =  roomERef.current.value.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    fireApp.reportSave(folder, roomId, roomName, data);
  }

  // input roomName 초기화
  const roomNameReset=() => {roomERef.current.value=''; }

  // roomName.substr(0,6) 방입장
    const enterRoom = () => {
    const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    const currentRoom = roomERef.current.value;
    const roomGet=()=>{
      if(roomERef.current.value.length !== 10 || !roomUid){return}
      if(roomERef.current.value.length === 10){
       setroomName(currentRoom);
       setDoor('입장중');
       setReport(false);
      }else{return}
    }
      const cf = {
        f1: (p) => { setdata(p) },
        f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) },
        f4: () => { setRoom({}) },
      }

    fireApp.roomUser(folder,roomUid,roomGet);
    fireApp.dataSync(folder, currentRoom, cf);
    }

  // 관리자 방입장
  const adminEnter = (e) => {
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room;
    setroomName(roomUid +room);
    roomERef.current.value =roomname;     
    setReport(false); 
    setSwitch0(true); setSwitch1(true); 
    setSwitch2(true); setSwitch3(true); 
    setSwitch4(true); setSwitch5(true); 
    setSwitch6(true);
  }


  // Input 초기화
  // const inputReset = () => {   
  //   const data = {
  //     scamS: scamperS.current.value = '',
  //     scamC: scamperC.current.value = '',
  //     scamA: scamperA.current.value = '',
  //     scamM: scamperM.current.value = '',
  //     scamP: scamperP.current.value = '',
  //     scamE: scamperE.current.value = '',
  //     scamR: scamperR.current.value = '',
  //   }
  //   fireApp.dataUp(folder, roomName, data)
  // }

 // 아이템 삭제
  const dataDel = () => {
    if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    fireApp.dataDel(folder,roomName);        
    aTitle.current.value = '';
    bName.current.value = '';
    input3.current.value = '';
    input4.current.value = '';
    input5.current.value = '';
    input6.current.value = '';
    roomERef.current.value = '';
    scamperS.current.value = '';
    scamperC.current.value = '';
    scamperA.current.value = '';
    scamperM.current.value = '';
    scamperP.current.value = '';
    scamperE.current.value = '';
    scamperR.current.value = '';
  } 

//titleRef.current.classList.add("noticeFly");
  return (
    <div className="scamper" >     

    <div className="drawer" ref={drawerRef}>
     <ScamperReport fireApp={fireApp} user={user} folder={folder} setroomName={setroomName} roomNameReset={roomNameReset}
      roomName={roomName} setReport={setReport} drawerRef={drawerRef} 
      moveModal2={moveModal2} setSwitch7={setSwitch7} report={report} /> 
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
          <div className="enterNumber" style={{fontSize:'small'}}>{room && Object.keys(room).map((e) =>
              <button key={e} className="btnRoom" onClick={adminEnter} >{e}</button>) }
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
          <span style={{fontSize:'14px',fontWeight:'900'}}>SCAMPER </span>
          <Switch checked={state.triz} name="triz" onChange={handleChange} size="small" 
          color="default" />  
          <span style={{fontSize:'14px',fontWeight:'900'}}> TRIZ</span>
        </div>    

        <div style={{ width: '100px',display:'flex',justifyContent:'flex-end' }}>             
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
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[0]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good0',Switch0,setSwitch0)} />
              </Badge>            
            </IconButton> }
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text1} 
            ref={scamperS}  onChange={onSubmit} value={data.scamS} />
          </div>
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title2}
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[1]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good1',Switch1,setSwitch1)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text2} 
            ref={scamperC} onChange={onSubmit} value={data.scamC} />
          </div>
        
          <div className="s-item">
            <div className="s-itemTitle">{placeData.title3}
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[2]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good2',Switch2,setSwitch2)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text3} 
            ref={scamperA} onChange={onSubmit} value={data.scamA} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title4}
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[3]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good3',Switch3,setSwitch3)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text4} 
            ref={scamperM} onChange={onSubmit} value={data.scamM} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title5}
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[4]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good4',Switch4,setSwitch4)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text5} 
            ref={scamperP} onChange={onSubmit} value={data.scamP} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title6}
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[5]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good5',Switch5,setSwitch5)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" placeholder={placeData.text6}  
            ref={scamperE} onChange={onSubmit} value={data.scamE} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">{placeData.title7}
            {!report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[6]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>goodPlus('good6',Switch6,setSwitch6)} />
              </Badge>
            </IconButton>} 
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
            ref={scamperR} onChange={onSubmit} value={data.scamR} placeholder={placeData.text7} />
          </div>
          
          <div className="inputBox" >
            <div className="s-itemTitle" style={{width:"100%"}}>최종아이디어
            {report &&
            <IconButton style={{width:'25px', height:'25px'}} >
              <Badge badgeContent={good[7]} color="secondary" style={{paddingRight:'10px'}}>
                <ThumbUp style={{color:'var(--Bcolor)'}} onClick={()=>{goodPlus2('good7',Switch7,setSwitch7)}} />
              </Badge>
            </IconButton> 
            }
            </div>
            <div></div>
            <textarea cols="30" rows="1" className="scamperInput input1" ref={aTitle} 
            onChange={onSubmit} value={data.aTitle} placeholder="제목" />
            <textarea cols="30" rows="1" className="scamperInput input2" ref={bName} 
            onChange={onSubmit} value={data.bName} placeholder="작성자" />

            <textarea cols="30" rows="1" className="scamperInput input3" ref={input3} 
            onChange={onSubmit} value={data.input3} placeholder={placeData.goodidea} />            
            <textarea cols="30" rows="1" className="scamperInput input4" ref={input4} 
            onChange={onSubmit} value={data.input4} placeholder={placeData.bestidea} />
            <textarea cols="30" rows="1" className="scamperInput input5 " ref={input5} 
            onChange={onSubmit} value={data.input5} placeholder={placeData.plusidea} />
            <textarea cols="30" rows="1" className="scamperInput input6" ref={input6} 
            onChange={onSubmit} value={data.input6} placeholder={placeData.minusidea} />            
            <input type="button" className="scamperInput btn" onClick={btnInput} value="제출"/>
          </div>

        </form>
      </div>
  );
}


export default memo(Scamper);