import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import './todo.css';

function Todo({ fireApp, user, userName,  }) {

  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const [items, setItems] = useState({});
  const [todoCount, setTodoCount] = useState(0);
  const folder = "todo"
  // 데이터 보여주기 싱크
  useEffect(() => {    
    fireApp.onAuth((e) => {
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   e ? fireApp.itemSync(folder,e.uid, cf):console.log('no-User')
    })
  }, [fireApp]);

  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const text = textRef.current.value;
    const title = titleRef.current.value;
    if (userName && title) {
    console.log(title)
      const dataId = Date.now();
      const data = {
        uid: user.uid,
        dataId: dataId,
        name: userName,
        title: title,
        text: text,
        today: today,
        progress: 0
      }
      fireApp.itemSave(folder,data)
    }
    titleRef.current.value = '';
    textRef.current.value = '';
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
    <div className="todo">
      <div className='todo-header'> {userName} 오늘-할일 {todoCount}개</div>
      <div className="todo-items">
        {
          Object.keys(items).map((e) => {
            return <Itemrow key={e} item={items[e]} fireApp={fireApp} />
          })
          // <Itemrow  key={uid} item={items} items={items}/> 
        }
      </div>
      <div className="todo-input">
        <form onSubmit={submit} className="todo-form">
          <input type="text" ref={titleRef} className="inputTitle" />
          <button className="btnadd" onClick={rocketOn} style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="2" style={{resize: 'none'}} />
        </form>
      </div>


    </div>
  );
}

export default Todo;