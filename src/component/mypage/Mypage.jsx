import { InsertEmoticon, LockOpen, MailOutline, VpnKey } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import "./mypage.css";

function Mypage({fireApp,user}) {
  const passRef = useRef();
  const passRef2 = useRef();
  const nameRef = useRef();
  const jobRef = useRef();
  const Swal = require('sweetalert2');

  const folder = "auth";
  const uid = user.uid||"";
  const userName = user.displayName ||"";
  const userEmail = user.email || "";
  const [userInfo, setUserInfo] = useState({});  
  useEffect(() => {
    fireApp.onAuth((e) => {
      if(e){
        fireApp.authSync(folder,uid,(p)=>setUserInfo(p))
      }
    })
  },[fireApp,uid])
  const userPass = userInfo.pass ||"";
  
  const profileUp = (e) => {
    e.preventDefault();
    const inputName = nameRef.current.value;
    const inputPass = passRef.current.value;
    const inputPass2 = passRef2.current.value;
    const inputjob = jobRef.current.value
    let level = 0;
    if(inputjob){level = 1}else{level=0};
    if(!inputName||!inputPass){Swal.fire({title:"빈칸을 모두 채워주세요", icon:'warning'})}
    else if(inputPass!==inputPass2){Swal.fire({title:'비밀번호가 맞지 않습니다',icon:'error'})}
    else{
      Swal.fire({ title: '정보를 저장하겠습니까?',  html: "이름: " + nameRef.current.value + 
      ", 비밀번호: " + passRef.current.value +", "+ jobRef.current.value, showCancelButton: true, confirmButtonText: `확인`,})
      .then((result) => { if(result.isConfirmed){ Swal.fire('Saved!');
      fireApp.profileUp(folder,uid,{name:inputName, pass:inputPass, job:inputjob, level});
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
      <input className="mypageInput name" name="name" defaultValue={userName} ref={nameRef} />
       
      <LockOpen />  
      <input className="mypageInput password" name="password" type="password" defaultValue={userPass} ref={passRef}  />
      <input className="mypageInput password" name="confirm" type="password" defaultValue={userPass} ref={passRef2} />

       
        
        <span style={{textAlign:"left",fontSize:"small"}} >👩🏻‍🏫</span>
        <input className="mypageInput mypagejob" name="job" ref={jobRef} />
        <span style={{textAlign:"right",fontSize:"small"}} >교사인 경우 학교이름을 적어주세요.</span>
        <button type="submit" style={{marginTop:"30px",borderRadius:"5px"}}>제출</button>
      </form>

    </div>
  );
}

export default Mypage;

