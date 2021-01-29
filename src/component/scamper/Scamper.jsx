import { Drawer } from '@material-ui/core';
import { DeleteForever, MenuSharp } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import VideocamIcon from '@material-ui/icons/Videocam';
import './scamper.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import RightMenu from './ReportMenu';
import { Modal } from 'react-bootstrap';

function Scamper({ fireApp, user, userName }) {
  const folder = "scamper";
  const roomSubstr = 6;

  const scamperS = useRef();
  const scamperC = useRef();
  const scamperA = useRef();
  const scamperM = useRef();
  const scamperP = useRef();
  const scamperE = useRef();
  const scamperR = useRef();
  const roomERef = useRef();
  const formRef = useRef();
  const videoRef = useRef();
  const noticeRef = useRef();
  const [data, setdata] = useState({});
  const [room, setRoom] = useState({});
  const [roomName, setroomName] = useState('');
  const [roomUid, setRoomUid] = useState('');
  const [level, setLevel] = useState(0);
  const [video, setVideo] = useState('');
  const [notice, setNotice] = useState('');

  //오른쪽 report 메뉴
  const [state, setState] = useState({ top: false, left: false, right: false });
  const toggleDrawer = (anchor, open) => (event) => setState({ ...state, [anchor]: open });
  //모달창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //입장중
  const [door, setDoor] = useState('입장')
  //데이터싱크 
  useEffect(() => {
    fireApp.onAuth((e) => {
      const cf = {
        f1: (p) => { setdata(p) },
        f2: () => { setdata({}) },
        f3: (p) => { setRoom(p) },
        f4: () => { setRoom({}) }
      }
      if (e) {
        const roomUid = e.uid.substr(0, roomSubstr);
        setRoomUid(e.uid.substr(0, roomSubstr));
        fireApp.dataSync(folder, roomName, cf);
        fireApp.roomSync(folder, roomUid, cf);
        fireApp.authSync('auth',e.uid,(p)=>setLevel(p))
        fireApp.videoSync(folder,roomName,'See',(p)=>setVideo(p))
        fireApp.videoSync(folder,roomName,'Tok',(p)=>setNotice(p))
      }
      else { console.log('no-User') }
    })
  }, [roomName]);


  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    setroomName(newRoom);
    const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'',scamE:'',scamR:''}
    const roomget = fireApp.roomGet(folder,roomUid)
    roomget < 8 && fireApp.roomSave(folder, newRoom, data)
  }
// 동영상 주소 저장
  const videoUp = (e) => {
    e.preventDefault();

    const data = videoRef.current.value;
    fireApp.videoSave(folder, user.uid,'See', data)
  }
// notice 저장
  const noticeUp = (e) => {
    e.preventDefault();
    const data = noticeRef.current.value;
    fireApp.videoSave(folder, user.uid,'Tok', data)
    noticeRef.current.value='';
  }
  //scamper 글 데이터 저장
  const onSubmit = () => {
    if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    const data = {
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }
    //방개수 6개 이하일때만 데이터 저장
    const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    const roomget = fireApp.roomGet(folder,roomUid)
    console.log(folder,roomUid,roomget)
    roomget < 10 &&  fireApp.dataUp(folder, roomName, data)
  }

  // roomName.substr(0,6) 방입장
    const enterRoom = () => {
    const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    const cf=()=>{
      if(roomERef.current.value.length === 10){
       setroomName(roomERef.current.value);
       setDoor('입장중');
      }}
    fireApp.roomUser(folder,roomUid,cf)
    }

  // 관리자 방입장
  const adminEnter = (e) => {
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room
    setroomName(roomUid +room)
    roomERef.current.value =roomname;     
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
    roomERef.current.value = '';
    scamperS.current.value = '';
    scamperC.current.value = '';
    scamperA.current.value = '';
    scamperM.current.value = '';
    scamperP.current.value = '';
    scamperE.current.value = '';
    scamperR.current.value = '';
  }
  return (
    <div className="scamper" >      
      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
        <RightMenu fireApp={fireApp} user={user} /> 
      </Drawer> 
      <Modal show={show} onHide={handleClose} animation={true} size={'xl'} > 
      <h5 style={{background:'var(--Acolor)',color:'var(--Bcolor)'}}>
        <VideocamIcon/>
      </h5>
      {video ? 
      <iframe width="100%" height="400" src ={video} title="video" frameBorder="0" />
      : '연결에 실패했습니다.'  }
      
      <button onClick={handleClose} style={{fontSize:'large'}}> Close </button>           
      </Modal>

      {level>0 && 
        <form className="adimBar">
           <button className="enterBtn" onClick={noticeUp}><AddCommentIcon/></button> 
          <input type="text" className="enterInput" placeholder="공지사항" ref={noticeRef} style={{borderRight:'1px dashed'}} />
          <input type="text" className="enterInput" placeholder="동영상링크" ref = {videoRef} />
          <button className="enterBtn" style={{width:'30px'}} onClick={videoUp}><YouTubeIcon/></button> 
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

        <div className="enterTitle" style={{animation:'noticeFly'}}>{notice}</div>       
        <div style={{ width: '100px',display:'flex',justifyContent:'flex-end' }}>             
          {/* <button className="btnRoomDel" style={{background:'#424242'}} onClick={inputReset} > <AutorenewIcon /> </button> */}
          <button style={{width:'30px'}}  onClick={handleShow}>
             <VoiceChatIcon fontSize='small' /></button>
          <button style={{width:'30px'}} onClick={toggleDrawer('right', true)}> <MenuSharp /></button> 
        </div>
      </div>

        <form className="s-items" ref={formRef} >
          <div className="s-item">
          <div className="s-itemTitle">S</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperS}  onChange={onSubmit} value={data.scamS} />
          </div>
        
        <div className="s-item">
          <div className="s-itemTitle">C</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperC} onChange={onSubmit} value={data.scamC} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">A</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperA} onChange={onSubmit} value={data.scamA} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">M</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperM} onChange={onSubmit} value={data.scamM} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">P</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperP} onChange={onSubmit} value={data.scamP} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">E</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperE} onChange={onSubmit} value={data.scamE} />
        </div>

        <div className="s-item">
          <div className="s-itemTitle">R</div>
          <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
           ref={scamperR} onChange={onSubmit} value={data.scamR} />
        </div>
        </form>
      </div>
  );
}

export default Scamper;