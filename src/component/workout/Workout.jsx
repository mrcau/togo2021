import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import './workout.css';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';

function Workout({ fireTodo, user, userName, setlogoName }) {

  const folder = "workout"
  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const [items, setItems] = useState({});
  const [color, setColor] = useState('secondary')
  const [todoCount, setTodoCount] = useState(0);
  setlogoName(' Workout');

  // 데이터 보여주기 싱크
  useEffect(() => {    
    // fireTodo.onAuth((e) => {
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   user ? fireTodo.itemSync(folder,user.uid, cf):console.log('no-User')
    // })
  }, [fireTodo,user]);

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
        progress: 0,
        color : color
      }
      fireTodo.itemSave(folder,data)
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
    <div className="workout">
      <div className="workout-items">
        {
          Object.keys(items).map((e) => {
            return <Itemrow key={e} item={items[e]} fireTodo={fireTodo} />
          })
          // <Itemrow  key={uid} item={items} items={items}/> 
        }
      </div>
      <div className="workout-input">
        <form onSubmit={submit} className="workout-form">
          <DropdownButton as={ButtonGroup} variant={color} title="구분" size="sm" >
          <div className="cardSelect">
            <div>
            <Dropdown.Item as="button" onClick={()=>setColor('danger')} style={{color:"#d53343",textAlign:"center", fontSize:"18px",padding:"0 2px"}}>❶</Dropdown.Item>
            </div>
            <div>
            <Dropdown.Item as="button" onClick={()=>setColor('warning')} style={{color:"#f7bb07",textAlign:"center", fontSize:"18px",padding:"0 "}}>❷</Dropdown.Item>
            </div>
            <Dropdown.Item as="button" onClick={()=>setColor('success')} style={{color:"#27a243",textAlign:"center", fontSize:"18px",padding:"0 "}}>❸</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>setColor('primary')} style={{color:"#0077f7",textAlign:"center", fontSize:"18px",padding:"0 "}}>❹</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>setColor('info')} style={{color:"#17a2b8",textAlign:"center", fontSize:"18px",padding:"0 "}}>❺</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>setColor('secondary')} style={{color:"#697179",textAlign:"center", fontSize:"18px",padding:"0 "}}>❻</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>setColor('dark')} style={{color:"#32383e",textAlign:"center", fontSize:"18px",padding:"0 2px"}}>❼</Dropdown.Item>
          </div>
        </DropdownButton>
          <input type="text" ref={titleRef} className="inputTitle" />
          <button className="btnadd" onClick={rocketOn} style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="3" style={{resize: 'none'}} />
        </form>
      </div>


    </div>
  );
}

export default Workout;