import './loginModal.css';
import React, { memo, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Swal from 'sweetalert2';
import google from './goolge.png';
import { useHistory } from 'react-router-dom';

function LoginModal({ fireApp, setuser,moveModal4,registerTF, setRegisterTF, user, userInfo }) {
  const emailRef = useRef();
  const passRef = useRef();
  const emailRegisterRef = useRef();
  const nameRegisterRef = useRef();
  const passRegisterRef = useRef();
  const repassRegisterRef = useRef();
  const Swal = require('sweetalert2');
  const history = useHistory();
  // 이메일로그인
  const emailLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    fireApp.emailLogin(email, pass);
  }

  // 구글로그인
  const googleLogin = () => fireApp.login();

  // 회원가입
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = nameRegisterRef.current.value;
    const email = emailRegisterRef.current.value;
    const pass = passRegisterRef.current.value;
    const pass2 = repassRegisterRef.current.value;
    const level = 0;
    const info = { name, email,pass,level }
    const cf =  (e) => setuser(e);

    if(!name||!email||!pass||!pass2){Swal.fire({title:"빈칸을 모두 채워주세요",icon:'warning'})}
    else if(pass!==pass2){Swal.fire({title:'비밀번호가 맞지 않습니다',icon:'error'})}
    else{
      Swal.fire({title: '저장하겠습니까?',html: "이름: "+name+", 이메일: "+ email +", 비밀번호: " + pass,
       showCancelButton: true, confirmButtonText: `확인`,}).then((result) => {
        if(result.isConfirmed){
          fireApp.createUser(info, cf);
         }
       })
    }

  }

  return (
    <div className="loginModal">
      {/* LoginModal */}
      {!registerTF &&
        <div className="auth">
          <h4>로그인</h4>
          {/* <Form onSubmit={emailLogin}>
            <Form.Group controlId="formBasicEmailLogin" className="formGroup" >
              <Form.Label className="formLabel"><MailOutlineIcon /></Form.Label>
              <Form.Control className="formInput" type="email" ref={emailRef} placeholder="이메일" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="formGroup" >
              <Form.Label className="formLabel"><LockOpenIcon /></Form.Label>
              <Form.Control className="formInput" type="password" ref={passRef} placeholder="패스워드" />
            </Form.Group>
            <Button variant="primary" type="submit"> 로그인</Button>
          </Form> */}
          <button className="btnGoogle" style={{ background: "white" }} onClick={googleLogin} >
            <img src={google} alt="googe" width="50px" /> </button>
          <Button variant="primary"  onClick={googleLogin} style={{marginTop:"30px"}}> 
          구글계정으로 로그인
          </Button>
          <h6 style={{marginTop:"16px"}} >로그인후 Mypage에서 기본정보를 업데이트해주세요.</h6>
          {/* <Button variant="primary"  onClick={() => setRegisterTF(true)} style={{marginTop:"30px"}}> 회원가입</Button> */}

        </div>
      }

      {/* Register */}
      <div className="auth reigster" style={{ display: !registerTF && 'none' }}>
        <h4>회원가입</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicName" className="formGroup" >
            <Form.Label className="formLabel"><InsertEmoticonIcon /></Form.Label>
            <Form.Control className="formInput" type="text" ref={nameRegisterRef} placeholder="이름" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="formGroup" >
            <Form.Label className="formLabel"><MailOutlineIcon /></Form.Label>
            <Form.Control className="formInput" type="email" ref={emailRegisterRef} placeholder="이메일" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword1" className="formGroup" >
            <Form.Label className="formLabel"><LockOpenIcon /></Form.Label>
            <Form.Control className="formInput" type="password" ref={passRegisterRef} placeholder="패스워드" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword2" className="formGroup" >
            <Form.Label className="formLabel"><LockOpenIcon /></Form.Label>
            <Form.Control className="formInput" type="password" ref={repassRegisterRef} placeholder="패스워드 확인" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default memo(LoginModal);