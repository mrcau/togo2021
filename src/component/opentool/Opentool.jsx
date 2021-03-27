import React, { useEffect, useRef, useState } from 'react';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';
import './opentool.css';

function Opentool({ fireIdea,fireApp, user, userInfo,setlogoName }) {

  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const [items, setItems] = useState({});
  const folder = "Opentool";
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  setlogoName(' 공유툴');
  // 데이터 보여주기 싱크
  useEffect(() => {    
    // fireApp.onAuth((e) => {
    // const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})} }
    //  if(e){
    //    fireApp.opentoolSync(folder,cf);
    //   }
    //    else{return}
    // })
    const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})} }
    fireApp.opentoolSync(folder,cf);
    
  }, [fireApp]);

  //DB에 글 데이터 저장
  const submit = (e) => { console.log(userInfo.level)
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const title = titleRef.current.value;
    const text = textRef.current.value;
    const text2 = textRef2.current.value;
    if(!userInfo.level){ Swal.fire({title:'로그인을 해주세요.',icon:'warning'})  }else if(!title || !text || !text2){ Swal.fire({title:'빈칸을 모두 채워주세요.',icon:'warning'}) }
    if (userInfo && title && text && text2) {
      rocketOn();
      const dataId = Date.now();
      const data = {
        uid: user.uid||'',
        dataId: dataId,
        name: userInfo.name||'',
        title: title,
        text: text,
        text2: text2,
        today: today,
        progress: 0,
        color : 'secondary'
      }
      fireApp.opentoolSave(folder,data);       
      titleRef.current.value = '';
      textRef.current.value = '';
      textRef2.current.value = '';
    }
  }

  //로켓발사
  const rocketOn = () => {
    rocketRef.current.classList.add("rocketOn");
    setTimeout(() => {
      rocketRef.current.classList.remove("rocketOn");
      clearTimeout(rocketOn);
    }, 1000);
  }
  console.log(items)
  return (
    <div className="opentool">
      <div className="opentool-items">
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} user={user} fireIdea={fireIdea} item={items[e]} fireApp={fireApp} level={level} />
          })
        }
      </div>
      {/* {userInfo.level>0 && */}
      <div className="opentool-input">
        <form onSubmit={submit} className="opentool-form">
          <input type="text" ref={titleRef} className="inputTitle" placeholder="공유자료 링크"/>
          <button className="btnadd" style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="3" placeholder="공유자료 설명" />
          <textarea className="textarea" ref={textRef2} cols="30" rows="3" 
          style={{borderTop: 'dashed 1px'}} placeholder="소스코드를 입력해주세요." />
        </form>
      </div>
      {/* } */}

    </div>
  );
}

export default Opentool;