import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import './workout.css';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';

function Workout({ fireTodo, user, userName, setlogoName }) {

  const folder = "workout"
  const today = new Date().toLocaleDateString();  
  const today1 = new Date().getFullYear();
  const today2 = new Date().getMonth()+1;
  const today3 = new Date().getDate();
  const todayId = `${today1}`+`${today2}`+`${today3}`
  const textRef = useRef();
  // const titleRef = useRef();
  const rocketRef = useRef();
  const [items, setItems] = useState({});
  const [todoCount, setTodoCount] = useState(0);
  const [color, setColor] = useState('danger')
  const [body, setBody] = useState('가슴')
  const [chest, setChest] = useState(['팔굽혀펴기','팔굽혀펴기(무릎)','벤치프레스','덤벨플라이'])
  const [sholder, setSholder] = useState(['파이크푸쉬업','리버스크로스','비하인드넥프레스','사이드레터럴'])
  const [sports, setSports] = useState(chest)
  const [selectBody, setselectBody] = useState('종목선택')
  setlogoName(' Workout');

  // 데이터 보여주기 싱크
  useEffect(() => {    
    // fireTodo.onAuth((e) => {
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   user ? fireTodo.workoutSync(folder,user.uid,todayId, cf):console.log('no-User')
    // })
  }, [fireTodo,user]);
console.log(items)
  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const text = textRef.current.value;
    // const title = titleRef.current.value;
    if (userName && text) {
      const dataId = Date.now();
      const data = {
        uid: user.uid,
        dataId: dataId,
        name: userName,
        // title: title,
        text: text,
        today: today,
        progress: 0,
        color : color,
        todayId,
        body,
        selectBody
      }
      fireTodo.workoutSave(folder,data)
    }
    // titleRef.current.value = '';
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
  function valuetext() {
    return `${100}°C`;
  }
  return (
    <div className="workout">
      {today}
      <div className="workout-items">
        {
          Object.keys(items).map((e) => {
            return <Itemrow key={e} item={items[e]} fireTodo={fireTodo} todayId={todayId} />
          })
        }
      </div>
      <div className="workout-input">
        <form onSubmit={submit} className="workout-form">
          <DropdownButton as={ButtonGroup} variant={color} title={body} size="sm" >
          <div className="cardSelect">
            <Dropdown.Item as="button" onClick={()=>{setColor('danger');setSports(chest); setBody('가슴')}} style={{color:"#d53343",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>가슴</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor('warning'); setBody('등')}} style={{color:"#f7bb07",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>등</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor('success'); setBody('다리')}} style={{color:"#27a243",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>다리</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor('primary');setSports(sholder); setBody('어깨')}} style={{color:"#0077f7",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>어깨</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor('info'); setBody('삼두')}} style={{color:"#17a2b8",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>삼두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor('secondary'); setBody('이두')}} style={{color:"#697179",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>이두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor('dark'); setBody('복근')}} style={{color:"#32383e",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>복근</Dropdown.Item>
          </div>
        </DropdownButton>
        
        <DropdownButton as={ButtonGroup} variant="dark" title={selectBody} size="sm" >
          <div className="cardSelect">
            {
            Object.values(sports).map((e,i) => {
              return <Dropdown.Item as="button" onClick={()=>setselectBody(e)} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>
          {/* <input type="text" ref={titleRef} className="inputTitle" /> */}
          
          <button className="btnadd" onClick={rocketOn} style={{outline:"none", border:"none" }}>동영상</button>
          <button className="btnadd" onClick={rocketOn} style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
            <div className="slider" >
              <Slider style={{width:'90vw',margin:'auto'}}
               defaultValue={30}
               getAriaValueText={valuetext}
               aria-labelledby="discrete-slider"
               valueLabelDisplay="auto"
               step={10}
               marks
               min={10}
               max={110}
             />
           </div>
          <textarea className="textarea" ref={textRef} cols="30" rows="3" style={{resize: 'none'}} />
        </form>
      </div>
    </div>
  );
}

export default Workout;