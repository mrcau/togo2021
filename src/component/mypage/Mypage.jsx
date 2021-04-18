import { InsertEmoticon, LockOpen, MailOutline, VpnKey } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import "./mypage.css";
import StarsIcon from '@material-ui/icons/Stars';
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

function Mypage({fireApp,user,userInfo,setlogoName}) {
  const nameRef = useRef();
  const mentorRef = useRef();
  const jobRef = useRef();
  const Swal = require('sweetalert2');
  setlogoName('My page')
  const folder = "auth";
  const uid = user.uid||"";
  const userEmail = user.email || "";
  const userName = userInfo.name ||"";
  const Mentor = userInfo.mentor ||"";
  const Company = userInfo.company ||"";
  const [selectjob, setslectJob] = useState('학생');
  

  const profileUp = (e) => {
    e.preventDefault();
    const inputName = nameRef.current.value;
    const inputjob = jobRef.current.value;
    const mentor = mentorRef.current.value; 
    console.log(selectjob,inputName,inputjob)
    let level = 0;
    if(inputName&&selectjob!=='교사'){level = 1}else if(inputName&&inputjob&&selectjob==='교사'){level=2}else if(inputName&&!inputjob&&selectjob==='교사'){level=1};
    if(!inputName){Swal.fire({title:"이름을 입력해 주세요", icon:'warning'})}
    else{
      Swal.fire({ title: '정보를 저장하겠습니까?',  text: selectjob +  ", " + nameRef.current.value + ", " +level +
      jobRef.current.value, showCancelButton: true, confirmButtonText: `확인`,})
      .then((result) => { if(result.isConfirmed){ Swal.fire('Saved!');
      fireApp.profileUp(folder,uid,{name:inputName, company:inputjob, level,user:user.uid,email:user.email,job:selectjob,mentor});
      }});
    };
  }
  return (
    <div className="mypage">      
      {/* <div className="mypageTop"><div className="logo"/>My page</div> */}
      <h3 style={{textAlign:"center",fontWeight:"900"}}>- 기본정보 -</h3>
      <form className="mypageForm" onSubmit={profileUp}>
        <div className="mypageList"> <VpnKey style={{fontSize:"40px"}}  /> <span className="mypageTitle" >Key</span> </div>
              <span className="mypageIcon" >{uid.substr(0,6)}</span>
        <div className="mypageList"> <MailOutline style={{fontSize:"40px"}} />  <span className="mypageTitle" >e-mail</span> </div>
              <span className="mypageIcon" >{userEmail}</span>
        <div className="mypageList"> <StarsIcon style={{fontSize:"40px"}} />  <span className="mypageTitle" >Level</span> </div>
              <span className="mypageIcon" >{userInfo.level||0}</span>

        <div className="mypageList"> <PersonIcon style={{fontSize:"40px"}} />  <span className="mypageTitle" >JOB</span> </div>
        <select name="jobSelect"  className="jobdropDown" onChange={e=>{setslectJob(e.currentTarget.value);}}>
          <option value="학생">학생</option>
          <option value="교사">교사</option>
          <option value="일반인">일반인</option>
        </select>

        <div className="mypageList"> <FaceIcon style={{fontSize:"40px"}} /> <span className="mypageTitle" >Name</span> </div>
              <input className="mypageInput" name="name" defaultValue={userName} placeholder="닉네임 입력" ref={nameRef} />
        <div className="mypageList"> <ApartmentIcon style={{fontSize:"40px"}}/> <span className="mypageTitle" >Campany</span> </div>
              <input className="mypageInput job" name="job" ref={jobRef}  defaultValue={Company} placeholder="교사는 학교명 입력"  />
        <div className="mypageList"> <SupervisorAccountIcon style={{fontSize:"40px"}}/> <span className="mypageTitle" >Mentor</span> </div>
              <input className="mypageInput job" name="job" ref={mentorRef}  defaultValue={Mentor} placeholder="멘토가 있으면 멘토Key 입력"  />

        <button type="submit" style={{fontSize:"30px", marginTop:"30px",borderRadius:"5px"}}>
         업데이트
        </button>
      </form>

    </div>
  );
}

export default Mypage;

