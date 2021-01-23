import { Drawer } from '@material-ui/core';
import { DeleteForever, MenuSharp } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './scamper.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import RightMenu from './ReportMenu';
import { Modal } from 'react-bootstrap';

function Scamper({ fireApp, user, userName }) {
  const folder = "scamper";
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
        const roomUid = e.uid.substr(0, 4);
        setRoomUid(e.uid.substr(0, 4));
        fireApp.dataSync(folder, roomName, cf);
        fireApp.roomSync(folder, roomUid, cf);
        fireApp.authSync('auth',e.uid,(p)=>setLevel(p))
        fireApp.videoSync(folder,e.uid,'video',(p)=>setVideo(p))
        fireApp.videoSync(folder,e.uid,'notice',(p)=>setNotice(p))
      }
      else { console.log('no-User') }
    })
  }, [roomName]);



  // 방입장
  const enterRoom = () => {
    roomERef.current.value.length === 8 && setroomName(roomERef.current.value);
  }
  // 관리자 방입장
  const adminEnter = (e) => {
    const room = e.currentTarget.textContent;
    const roomname = roomUid +room
    setroomName(roomUid +room)
    roomERef.current.value =roomname;     
  }
  // 방생성
  const createRoom = () => {
    const num = Date.now().toString().substr(9);
    const newRoom = roomUid + num;
    setroomName(newRoom);
    const data = {
      scamS: '',
      scamC: '',
      scamA: '',
      scamM: '',
      scamP: '',
      scamE: '',
      scamR: '',
    }
    const roomget = fireApp.roomGet(folder,roomUid)
    //방개수 6개로 제한
    roomget < 6 && fireApp.roomSave(folder, newRoom, data)
  }
// 동영상 주소 저장
  const videoUp = () => {
    const data = videoRef.current.value;
    fireApp.videoSave(folder, user.uid,'video', data)
  }
// notice 저장
  const noticeUp = () => {
    const data = noticeRef.current.value;
    fireApp.videoSave(folder, user.uid,'notice', data)
  }
  //scamper 글 데이터 저장
  const onSubmit = () => {
    // const dataId = Date.now();
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
    fireApp.dataUp(folder, roomName, data)
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
const abc ="https://www.daum.net/"
  return (
    <div className="scamper" >      
      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
        <RightMenu fireApp={fireApp} user={user} /> 
      </Drawer> 
      <Modal show={show} onHide={handleClose} animation={true} size={'xl'} > 
      <h3 style={{background:'var(--Acolor)',color:'var(--Bcolor)'}}>제목</h3>
      {/* <object type="text/html" width="100%"  height="500px" data="//www.youtube.com/embed/qFmXLGheyqs" allowFullScreen/> */}
     {/* {video} style={{ src: `url("${photo}")` }} */}
     {/* `<video src="${video}" controls></video>` */}
      {/* <iframe width="100%" height="500" src= {`"${video}"`}  frameborder="0" /> */}
      <iframe width="100%" height="315" src ="https://youtu.be/ZUTwJICj1ng" frameBorder="0"></iframe>
      {abc} {`"${abc}"`}
      {/* <object type="text/html" width="560" height="315" data={`"${abc}"`}> </object> */}

      <button onClick={handleClose} style={{fontSize:'x-large'}}> Close </button>           
      </Modal>

      {level>0 &&
        <div className="adimBar">
           <button className="enterBtn" onClick={noticeUp}><AddCommentIcon/></button> 
          <input type="text" className="enterInput" placeholder="공지" ref={noticeRef} style={{borderRight:'1px dashed'}} />
          <input type="text" className="enterInput" placeholder="동영상링크" ref = {videoRef} />
          <button className="enterBtn" style={{width:'30px'}} onClick={videoUp}><YouTubeIcon/></button> 
        </div>
      }
      {level>0 &&
        <div className="adimBar">
          <div> <button className="enterBtn" onClick={createRoom}>개설</button> </div>
          <div className="enterNumber">{room && Object.keys(room).map((e) =>
              <button key={e} className="btnRoom" onClick={adminEnter} >{e}</button>) }
          </div>
        </div>
      }
      <div className="s-header">
        <div className="enterWrap" >
          <button className="enterBtn" onClick={enterRoom}>입장</button>
          <input type="text" className="enterInput" placeholder="방번호" style={{width:'80px'}} ref={roomERef} />
        </div>
        <div className="enterTitle">{notice}</div>       
        <div style={{ width: '100px',display:'flex',justifyContent:'flex-end' }}>             
          {/* <button className="btnRoomDel" style={{background:'#424242'}} onClick={inputReset} > <AutorenewIcon /> </button> */}
          {level>0 && 
           <button style={{background:'#424242'}} className="btnRoomDel" onClick={dataDel} >
             <DeleteForever /></button>  
          }
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