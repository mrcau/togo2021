import { InsertEmoticon, LockOpen, MailOutline, VpnKey } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import "./mypage.css";

function Mypage({fireApp,user,userInfo}) {
  const nameRef = useRef();
  const jobRef = useRef();
  const Swal = require('sweetalert2');

  const folder = "auth";
  const uid = user.uid||"";
  const userEmail = user.email || "";
  const userName = userInfo.name ||"";
  const job = userInfo.job ||"";

  const profileUp = (e) => {
    e.preventDefault();
    const inputName = nameRef.current.value;
    const inputjob = jobRef.current.value
    let level = 0;
    if(inputjob){level = 1}else{level=0};
    if(!inputName){Swal.fire({title:"빈칸을 모두 채워주세요", icon:'warning'})}
    else{
      Swal.fire({ title: '정보를 저장하겠습니까?',  html: "이름: " + nameRef.current.value + 
      ", "+ jobRef.current.value, showCancelButton: true, confirmButtonText: `확인`,})
      .then((result) => { if(result.isConfirmed){ Swal.fire('Saved!');
      fireApp.profileUp(folder,uid,{name:inputName, job:inputjob, level,user:user.uid,email:user.email});
      }});
    };
  }
  return (
    <div className="mypage">      
      <div className="mypageTop"><div className="logo"/>My page</div>

      <form className="mypageForm" onSubmit={profileUp}>
      <VpnKey/> <span style={{textAlign:"left",margin:"0 0 10px 0"}}>{uid.substr(0,6)}</span>
      <MailOutline />  <span style={{textAlign:"left",margin:"0 0 10px 0"}}>{userEmail}</span>
      
      <InsertEmoticon  /> 
      <input className="mypageInput name" name="name" defaultValue={userName} placeholder="name" ref={nameRef} />
       
       
        
        <span style={{textAlign:"left",fontSize:"small"}} >👩🏻‍🏫</span>
        <input className="mypageInput mypagejob" name="job" ref={jobRef}  defaultValue={job}  />
        <span style={{textAlign:"right",fontSize:"small"}} >교사인 경우 학교이름을 적어주세요.</span>
        <button type="submit" style={{marginTop:"30px",borderRadius:"5px"}}>업데이트</button>
      </form>

    </div>
  );
}

export default Mypage;

