import React, { useEffect, useRef, useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';

function Mytool({fireIdea,fireApp, fireSync,user, userInfo, setlogoName }) {
  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const [items, setItems] = useState({});
  const folder = "mytool"
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  setlogoName('My ToolBox');
  // 데이터 보여주기 싱크
  useEffect(() => {    
    fireSync.onAuth((e) => {
    const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})}  }
   if(user){ 
      const stopDataSync =fireSync.toolSync(folder,user.uid, cf);
      return ()=>{stopDataSync();}
    }else{console.log('no-User')}
  
    })
  }, [fireSync,user]);

  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const text = textRef.current.value;
    const text2 = textRef2.current.value;
    const title = titleRef.current.value;
    if(!title || !text || !text2){ Swal.fire({title:'빈칸을 모두 채워주세요.',icon:'warning'}) }
    if (userInfo && title && text && text2) {
      rocketOn();
      const dataId = Date.now();
      const data = {
        uid: user.uid,
        dataId: dataId,
        name: userInfo.name,
        title: title,
        text: text,
        text2: text2,
        today: today,
        progress: 0,
        color : 'secondary'
      }
      fireSync.toolSave(folder,user.uid,data);      
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

  return (
    <div className="mytool">
      <div className="mytool-items">
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireSync={fireSync} level={level} user={user} userInfo={userInfo} />
          })
        }
      </div>
      <div className="mytool-input">
        <form onSubmit={submit} className="mytool-form">
          <input type="text" ref={titleRef} className="inputTitle" placeholder="제목"/>
          <button className="btnadd" style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="2" placeholder="설명을 적어주세요." />
          <textarea className="textarea" ref={textRef2} cols="30" rows="4" 
          style={{borderTop: 'dashed 1px'}} placeholder="소스코드를 입력해주세요." />
        </form>
      </div>


    </div>
  );
}

export default Mytool;