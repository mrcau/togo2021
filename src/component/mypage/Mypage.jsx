import { InsertEmoticon, LockOpen, MailOutline, VpnKey } from '@material-ui/icons';
import React from 'react';
import { useForm } from "react-hook-form";
import "./mypage.css";

function Mypage({fireApp,user}) {
  const { handleSubmit, watch, errors,name,email } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("example")); 
  console.log(user); 

  return (
    <div className="mypage">
      <div className="mypageTop"><div className="logo"/>My page</div>
      <form className="mypageForm" onSubmit={handleSubmit(onSubmit)}>
        <InsertEmoticon  /> 
        <input className="mypageInput name" name="name" defaultValue="name" ref={name} />
        <MailOutline />  
        <input className="mypageInput email" name="email" defaultValue="email" ref={email} />
        <LockOpen />  
        <input className="mypageInput password" name="password"  defaultValue="password" />
        <input className="mypageInput password" name="confirm"  defaultValue="password confirm" />

        <VpnKey/>
        <input className="mypageInput password" name="userId"  defaultValue="userId" style={{borderBottom:"none"}} />
        
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

