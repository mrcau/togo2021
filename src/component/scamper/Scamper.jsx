import { Box, Drawer } from '@material-ui/core';
import { CalendarViewDay, DeleteForever, Favorite, FavoriteOutlined, MenuSharp } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import AddCommentIcon from '@material-ui/icons/AddComment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import VideocamIcon from '@material-ui/icons/Videocam';
import './scamper.css';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import ScamperReport from './ScamperReport';
import Rating from '@material-ui/lab/Rating';
import { Modal } from 'react-bootstrap';

function Scamper({ fireApp, user, userName }) {
  const folder = "scamper";
  const roomSubstr = 6;

  const aTitle = useRef();
  const bName = useRef();
  const dContent = useRef();
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
    const data = {scamS:'',scamC:'',scamA:'',scamM:'',scamP:'',scamE:'',scamR:'',
                  aTitle:'',bName: '',dContent: '' }
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
  //scamper 글 데이터 저장, 방개수 6개 이하일때만 데이터 저장
  const onSubmit = () => {
    if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    const data = {
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',
      dContent: dContent.current.value || '',
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }
    
    const roomUid =  roomERef.current.value.substr(0,roomSubstr)
    const roomget = fireApp.roomGet(folder,roomUid)
    roomget < 10 &&  fireApp.dataUp(folder, roomName, data)
  }

   // 보고서 제출
   const btnInput = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString().substr(5);
    // const id = Date.now();
    if (roomName!==roomERef.current.value||roomERef.current.value==='') { return }
    const data = {
      cDate : today,
      aTitle: aTitle.current.value || '',
      bName: bName.current.value || '',
      dContent: dContent.current.value || '',
      scamS: scamperS.current.value || '',
      scamC: scamperC.current.value || '',
      scamA: scamperA.current.value || '',
      scamM: scamperM.current.value || '',
      scamP: scamperP.current.value || '',
      scamE: scamperE.current.value || '',
      scamR: scamperR.current.value || '',
    }
    const roomUid =  roomERef.current.value.substr(0,roomSubstr);
    const roomId = roomUid+'REPORT';
    fireApp.reportSave(folder, roomId, roomName, data);
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
    aTitle.current.value = '';
    bName.current.value = '';
    dContent.current.value = '';
    roomERef.current.value = '';
    scamperS.current.value = '';
    scamperC.current.value = '';
    scamperA.current.value = '';
    scamperM.current.value = '';
    scamperP.current.value = '';
    scamperE.current.value = '';
    scamperR.current.value = '';
  }
  // 좋아요
  const [value, setValue] = React.useState(2);
  return (
    <div className="scamper" >      
      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
        <ScamperReport fireApp={fireApp} user={user} folder={folder} roomName={roomName} /> 
      </Drawer> 

      <Modal show={show} onHide={handleClose} animation={true} size={'xl'} > 
        <h5 style={{background:'var(--Acolor)',color:'var(--Bcolor)'}}>
          <VideocamIcon/>
        </h5>
        {video 
        ? <iframe width="100%" height="400" src ={video} title="video" frameBorder="0" />
        : '연결에 실패했습니다.'  
        }
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
          {/* 공지사항 */}
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
            <div className="s-itemTitle" sty> S 
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating 
                name="customized-color" value={value}   
                icon={<Favorite fontSize="inherit" /> } 
                onChange={(event, newValue) => {setValue(newValue); }} 
              />
            </Box>
            </div>
            <textarea  className="s-intemInput input1" cols="30" rows="2"  
            ref={scamperS}  onChange={onSubmit} value={data.scamS} />
          </div>
        
          <div className="s-item">
            <div className="s-itemTitle">C</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2"  
            ref={scamperC} onChange={onSubmit} value={data.scamC} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">A</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2"  
            ref={scamperA} onChange={onSubmit} value={data.scamA} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">M</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2"  
            ref={scamperM} onChange={onSubmit} value={data.scamM} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">P</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2"  
            ref={scamperP} onChange={onSubmit} value={data.scamP} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">E</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2"  
            ref={scamperE} onChange={onSubmit} value={data.scamE} />
          </div>

          <div className="s-item">
            <div className="s-itemTitle">R</div>
            <textarea  className="s-intemInput input1" cols="30" rows="2" style={{resize: 'none'}} 
            ref={scamperR} onChange={onSubmit} value={data.scamR} />
          </div>
          
          <div className="inputBox" >
            <div className="s-itemTitle" style={{width:"100%"}}>보고서</div>
            <div></div>
            <textarea cols="30" rows="1" className="scamperInput input1" ref={aTitle} 
            onChange={onSubmit} value={data.aTitle} placeholder="제목" />
            <textarea cols="30" rows="1" className="scamperInput input2" ref={bName} 
            onChange={onSubmit} value={data.bName} placeholder="작성자" />
            <textarea cols="30" rows="2" className="scamperInput input3" ref={dContent} 
            onChange={onSubmit} value={data.dContent} placeholder="내용" />
            <input type="button" className="scamperInput btn" onClick={btnInput} value="제출"/>
          </div>

        </form>
      </div>
  );
}

export default Scamper;