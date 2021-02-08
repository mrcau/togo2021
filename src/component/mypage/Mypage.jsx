import { InsertEmoticon, LockOpen, MailOutline, VpnKey } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import "./mypage.css";

function Mypage({fireApp,user}) {
  const folder = "auth";
  const uid = user.uid||"";
  const userName = user.displayName ||"";
  const userEmail = user.email || "";
  const userPass = user.pa ||"";
  const [userInfo, setUserInfo] = useState({});
  const { handleSubmit, watch, errors,name,email } = useForm();
  const {emailRef,passRef} = useRef();
  const nameRef = useRef();
  const onSubmit = data => console.log(data);
  // console.log(watch("example")); 
  const profileUp = (e) => {
    // setUserInfo({...userInfo,name:nameRef.current.value})
    // const namerefff= nameRef.current.value;
  console.log(nameRef.current.value)
  // fireApp.profileUp(folder,uid,{ level:10})
  }
  return (
    <div className="mypage">
      <button  onClick={profileUp} >프로필저장</button>
      <div className="mypageTop"><div className="logo"/>My page</div>
      <form className="mypageForm" onSubmit={handleSubmit(onSubmit)}>
        <InsertEmoticon  /> 
        <input className="mypageInput name" name="name" defaultValue={userEmail} ref={nameRef} />
        <MailOutline />  
        <input className="mypageInput email" name="email" defaultValue={userEmail} ref={emailRef} />
        <LockOpen />  
        <input className="mypageInput password" name="password"  defaultValue={userPass} ref={passRef}  />
        <input className="mypageInput password" name="confirm"  defaultValue="password confirm" />

        <VpnKey/>
        <input className="mypageInput password" name="userId"  defaultValue={uid.substr(0,6)} style={{borderBottom:"none"}} />
        
        <span style={{textAlign:"left",fontSize:"small"}} >👩🏻‍🏫학교이름</span>
        <input className="mypageInput mypagejob" name="job"  defaultValue="job" />
        <span style={{textAlign:"right",fontSize:"small"}} >교사인 경우 학교이름을 적어주세요.</span>
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit" style={{marginTop:"30px"}}>제출</button>
      </form>

    </div>
  );
}

export default Mypage;

