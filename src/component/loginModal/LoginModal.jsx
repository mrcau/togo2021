import './loginModal.css';
import React, { memo, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function LoginModal({ fireApp, setUserName }) {
  const emailRef = useRef();
  const passRef = useRef();
  const emailRegisterRef = useRef();
  const nameRegisterRef = useRef();
  const passRegisterRef = useRef();
  const repassRegisterRef = useRef();
  const [registerTF, setRegisterTF] = useState(false);

  // 이메일로그인
  const emailLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    fireApp.emailLogin(email,pass)
    //   .then((user) => {
    //     console.log('success');
    //   })
    //   .catch((error) => {
    //     var errorMessage = error.message;
    //     console.log(errorMessage);
    //   });
    // console.log(email,pass);
  }

  // 구글로그인
  const googleLogin = async () => {
    await fireApp.login();
  }

  // 회원가입
  const onSubmit = async (e) => {
    e.preventDefault();
    const registerInfo = {
      name : nameRegisterRef.current.value,
      email : emailRegisterRef.current.value, 
      pass : passRegisterRef.current.value
    }
    const cf = {displayName : ()=>setUserName(registerInfo.name) }
   fireApp.createUser(registerInfo,cf)
}
  return (
    <div className="loginModal">
      {/* LoginModal */}
      {!registerTF &&
        <div className="auth">
        <h4>로그인</h4>
          <Form onSubmit={emailLogin}>
            <Form.Group controlId="formBasicEmailLogin" className="formGroup" >
              <Form.Label className="formLabel"><MailOutlineIcon/></Form.Label>
              <Form.Control className="formInput" type="email" ref={emailRef} placeholder="이메일" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="formGroup" >
              <Form.Label className="formLabel"><LockOpenIcon/></Form.Label>
              <Form.Control className="formInput" type="password" ref={passRef} placeholder="패스워드" />
            </Form.Group>
            <Button variant="primary" type="submit"> 로그인</Button>
          </Form>          
          <button className="btnGoogle" style={{background:"white"}} onClick={googleLogin} >
          <i className="fab fa-google-plus"/>ddd</button>
          <button className="btnRegister" style={{background:"white"}} onClick={() => setRegisterTF(true)} >
          아이디가 없다면...</button>
        </div>
      }

      {/* Register */}
      <div className="auth" style={{ display: !registerTF && 'none' }}>
      <h4>회원가입</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicName" className="formGroup" >
            <Form.Label className="formLabel"><InsertEmoticonIcon/></Form.Label>
            <Form.Control className="formInput" type="text" ref={nameRegisterRef} placeholder="이름" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="formGroup" >
            <Form.Label className="formLabel"><MailOutlineIcon/></Form.Label>
            <Form.Control className="formInput" type="email" ref={emailRegisterRef} placeholder="이메일" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword1" className="formGroup" >
            <Form.Label className="formLabel"><LockOpenIcon/></Form.Label>
            <Form.Control className="formInput" type="password"ref={passRegisterRef} placeholder="패스워드" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword2" className="formGroup" >
            <Form.Label className="formLabel"><LockOpenIcon/></Form.Label>
            <Form.Control className="formInput" type="password"ref={repassRegisterRef} placeholder="패스워드 확인" />
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