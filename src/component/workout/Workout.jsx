import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import './workout.css';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import placeholder1 from './placeholder';
import placeholder2 from './placeholder2';

function Workout({ fireTodo, user, userName, setlogoName }) {

  const folder = "workout"
  const today = new Date().toLocaleDateString();  
  const today1 = new Date().getFullYear();
  const today2 = new Date().getMonth()+1;
  const today3 = new Date().getDate();
  const todayId = `${today1}`+`${today2}`+`${today3}`
  // const textRef = useRef();
  const repeateRef = useRef();
  const [items, setItems] = useState({});


  const [body1, setBody1] = useState('가슴');
  const [body2, setBody2] = useState('가슴');
  const [color1, setColor1] = useState('danger');
  const [color2, setColor2] = useState('danger');
  const [selectStyle1, setselectStyle1] = useState('맨몸운동');
  const [selectStyle2, setselectStyle2] = useState('맨몸운동');
  const [gameSelect, setgameSelect] = useState('종목');
  const [gameSelect2, setgameSelect2] = useState('종목');
  // const placeholder = selectStyle2==='맨몸운동'?placeholder1:placeholder2;
  const [placeholder, setplaceholder] = useState(placeholder1)
  const [bodySelect, setbodySelect] = useState(placeholder[0]);
  const [bodySelect2, setbodySelect2] = useState(placeholder[0]);
const [workRepeat, setworkRepeat] = useState(1)
const [workWeight, setworkWeight] = useState(0)

  setlogoName(' Workout');

  // 데이터 보여주기 싱크
  useEffect(() => {    
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   user ? fireTodo.workoutSync(folder,user.uid,todayId, cf):console.log('no-User')
  }, [fireTodo,user]);
  //DB에 글 데이터 저장

  const submit = (e) => {
    e.preventDefault();
    // console.log('items', items,'itemsbody2', items[body2], items[body2][gameSelect2],items[body2][gameSelect2].workoutSet)
    if(gameSelect2==='종목'){return}
    let addSet = 1;

    if(items[body2]){
      if(items[body2][gameSelect2]){
        addSet = 1+ items[body2][gameSelect2].workoutSet
      }
    }else{ console.log('운동부위 언디파인')}
    
    let addworkWeight = [workWeight];
    if(items[body2]){
      if(items[body2][gameSelect2]){

        addworkWeight = [...items[body2][gameSelect2].workWeight,workWeight]
        // addworkWeight = workWeight+ items[body2][gameSelect2].workWeight
      }
    }else{ console.log('운동부위 언디파인')}

    let addworkRepeat = [workRepeat];
    if(items[body2]){
      if(items[body2][gameSelect2]){

        addworkRepeat = [...items[body2][gameSelect2].workRepeat,workRepeat]
      // addworkRepeat = workRepeat+ items[body2][gameSelect2].workRepeat
      }
    }else{ console.log('운동부위 언디파인')}
    
    if(e.currentTarget == null){return;}
    if(selectStyle2==='웨이트운동' && workWeight === 0){return;}

    if (userName) {
      const dataId = Date.now();
      const data = {
        uid: user.uid,
        dataId: dataId,
        name: userName,
        today: today,
        progress: 5,
        color : color2,
        todayId,
        body: body2,
        workoutTime:5,
        workoutSet:addSet,
        gameSelect:gameSelect2,
        selectStyle:selectStyle2,
        workWeight : addworkWeight,
        workRepeat : addworkRepeat,
      }
      fireTodo.workoutSave(folder,data)
      // fireTodo.workoutSave(folder,data)
    }
  }
  function valuetext(value) {
    return value;
  }

  const handleSliderChange = (event, newValue) => {
    setworkRepeat(newValue);
  };
  const handleSliderChange0 = (event, newValue) => {
    setworkWeight(newValue);
  };


  return (
    <div className="samworkout">

       <div className="workout-input">
        {/* <form onSubmit={submit} className="workout-form"> */}
        <div className="topSelect"  >
        <button  className="btnRoomLink" >{today}</button>

        <DropdownButton as={ButtonGroup} title={selectStyle1} size="sm" variant={'dark'} style={{width:"100%",border:"soid 1px", background:"var(--Ccolor)"}} >
            <Dropdown.Item as="button" onClick={()=>{setselectStyle1('맨몸운동')}}   style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>맨몸운동</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setselectStyle1('웨이트운동')}} style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>웨이트운동</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setselectStyle1('유산소운동')}} style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>유산소운동</Dropdown.Item>
        </DropdownButton>

        <DropdownButton as={ButtonGroup} variant={'dark'} title={body1} size="sm" >
          <div className="cardSelect">
            <Dropdown.Item as="button" onClick={()=>{setColor1('danger');setbodySelect(placeholder[0]); setBody1('가슴')}} style={{color:"#d53343",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>가슴</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor1('primary');setbodySelect(placeholder[1]); setBody1('어깨')}} style={{color:"#0077f7",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>어깨</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor1('warning');setbodySelect(placeholder[2]); setBody1('등')}} style={{color:"#f7bb07",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>등</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor1('info');setbodySelect(placeholder[3]); setBody1('삼두')}} style={{color:"#17a2b8",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>삼두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor1('secondary');setbodySelect(placeholder[4]); setBody1('이두')}} style={{color:"#697179",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>이두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor1('dark');setbodySelect(placeholder[5]); setBody1('복근')}} style={{color:"#32383e",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>복근</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor1('success');setbodySelect(placeholder[6]); setBody1('다리')}} style={{color:"#27a243",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>다리</Dropdown.Item>
          </div>
        </DropdownButton>
        
        <DropdownButton as={ButtonGroup} variant='dark' title={gameSelect} size="sm" >
          <div className="cardSelect">
            {
            Object.values(bodySelect).map((e,i) => {
              return <Dropdown.Item as="button" onClick={()=>setgameSelect(e)} style={{textAlign:"center", fontSize:"14px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>
          
        </div>
      </div>

      
      <div className="workout-items">
        {
          Object.keys(items).map((e) => {
            return <Itemrow key={e} item={items[e]} fireTodo={fireTodo} todayId={todayId} />
          })
        }
      </div>

      <div className="workout-input">
        {/* <form onSubmit={submit} className="workout-form"> */}
        <div className="topSelect">
          
        <DropdownButton as={ButtonGroup} title={selectStyle2} size="sm" variant={'dark'} style={{width:"100%",border:"soid 1px", background:"var(--Ccolor)"}} >
            <Dropdown.Item as="button" onClick={()=>{setselectStyle2('맨몸운동');setColor2('danger');setplaceholder(placeholder1);setbodySelect2(placeholder1[0]);setgameSelect2(Object.values(placeholder1[0])[0]); setBody2('가슴'); setworkWeight(0)}}   style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>맨몸운동</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setselectStyle2('웨이트운동');setColor2('danger');setplaceholder(placeholder2);setbodySelect2(placeholder2[0]);setgameSelect2(Object.values(placeholder2[0])[0]); setBody2('가슴')}} style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>웨이트운동</Dropdown.Item>
        </DropdownButton>

        <DropdownButton as={ButtonGroup} variant={color2} title={body2} size="sm" >
        <div className="cardSelect">
            <Dropdown.Item as="button" onClick={()=>{setColor2('danger');setbodySelect2(placeholder[0]);   setgameSelect2(Object.values(placeholder[0])[0]); setBody2('가슴')}} style={{color:"#d53343",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>가슴</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('primary');setbodySelect2(placeholder[1]);  setgameSelect2(Object.values(placeholder[1])[0]); setBody2('어깨')}} style={{color:"#0077f7",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>어깨</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('warning');setbodySelect2(placeholder[2]);  setgameSelect2(Object.values(placeholder[2])[0]); setBody2('등')}} style={{color:"#f7bb07",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>등</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('info');setbodySelect2(placeholder[3]);     setgameSelect2(Object.values(placeholder[3])[0]); setBody2('삼두')}} style={{color:"#17a2b8",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>삼두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('secondary');setbodySelect2(placeholder[4]);setgameSelect2(Object.values(placeholder[4])[0]); setBody2('이두')}} style={{color:"#697179",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>이두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('dark');setbodySelect2(placeholder[5]);     setgameSelect2(Object.values(placeholder[5])[0]); setBody2('복근')}} style={{color:"#32383e",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>복근</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('success');setbodySelect2(placeholder[6]);  setgameSelect2(Object.values(placeholder[6])[0]); setBody2('다리')}} style={{color:"#27a243",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>다리</Dropdown.Item>
          </div>
        </DropdownButton>
        
        <DropdownButton as={ButtonGroup} variant="dark" title={gameSelect2} size="sm" >
          <div className="cardSelect">
            {
            Object.values(bodySelect2).map((e,i) => { 
              return <Dropdown.Item as="button" onClick={()=>setgameSelect2(e)} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>
          
        <button  className="btnRoomLink">동영상</button>
        </div>
        
        {selectStyle2 === '웨이트운동' && 
        <div className="slider" >
          <h5 style={{margin:"auto",marginLeft:"0"}}>무게: {workWeight}kg</h5>
              <Slider style={{width:'99%',margin:'auto',color:"red"}} ref={repeateRef}
               defaultValue={1}
               getAriaValueText={valuetext}
               aria-labelledby="discrete-slider"
               valueLabelDisplay="auto"
               step={1}
               marks 
               min={1}
               max={190}
               onChange={handleSliderChange0}
             />         
        </div>
        }
        <div className="slider" >
          <h5 style={{margin:"auto",marginLeft:"0"}}>횟수: {workRepeat}회</h5>
              <Slider style={{width:'99%',margin:'auto',color:"red"}} ref={repeateRef}
               defaultValue={1}
               getAriaValueText={valuetext}
               aria-labelledby="discrete-slider"
               valueLabelDisplay="auto"
               step={1}
               marks 
               min={1}
               max={110}
               onChange={handleSliderChange}
             />         
        </div>
        
        {/* <textarea className="samtextarea" ref={textRef} cols="30" rows="3" style={{resize: 'none'}} /> */}
        <button className="btnWorkoutAdd" onClick={submit}> 추가</button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Workout;