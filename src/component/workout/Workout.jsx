import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import './workout.css';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import placeholder1 from './placeholder';
import placeholder2 from './placeholder2';
import {  DeleteForever } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton, Tooltip } from '@material-ui/core';
import Accordion from 'react-bootstrap/Accordion'
import { Card,Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Workout({ fireTodo, user, userName, setlogoName }) {
  // const memoRef = useRef();
  const folder = "workout"
  const today = new Date().toLocaleDateString();  
  const YYear = new Date().getFullYear();
  let MMonth = new Date().getMonth()+1;
  MMonth = MMonth >= 10 ? MMonth : '0' + MMonth; 
  let DDay = new Date().getDate();
  DDay = DDay >= 10 ? DDay : '0' + DDay;

  const todayId = `${YYear}`+`${MMonth}`+`${DDay}`
  // const textRef = useRef();
  const newFolder = useRef();
  const repeateRef = useRef();

  const [selectStyle1, setselectStyle1] = useState('맨몸운동');
  const [body1, setBody1] = useState('가슴');
  const [gameSelect, setgameSelect] = useState('디클라인푸쉬업');
  const [color1, setColor1] = useState('danger');
  const [color2, setColor2] = useState('danger');
  // const placeholder = youhyung==='맨몸운동'?placeholder1:placeholder2;
  const [placeholder, setplaceholder] = useState(placeholder1)
  const [bodySelect, setbodySelect] = useState(placeholder[0]);
  const [bodySelect2, setbodySelect2] = useState(placeholder[0]);
  const [workRepeat, setworkRepeat] = useState(1)
  const [workWeight, setworkWeight] = useState(0)
  
  const [youhyung, setyouhyung] = useState('');
  const [buwi, setbuwi] = useState('');
  const [jongmock, setjongmock] = useState('');  
  const [totalItems, settotalItems] = useState({});
  const [maxItem, setMaxItem] = useState('')
  const [mentoItem, setmentoItem] = useState({});
  const youhyungRef = useRef();
  const buwiRef = useRef();
  const jongmockRef = useRef();
  const videoLinkRef = useRef();
  const [items, setItems] = useState({});
  const [todayBuwi, setTodayBuwi] = useState(todayId+buwi)
  const [Memo, setMemo] = useState('')
const mentoKey = 'ffB1YI'
  setlogoName(' Workout');

  // 데이터 보여주기 싱크
  useEffect(() => {    
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})},
      f3: (p)=>{settotalItems(p)},
      f4: ()=>{settotalItems({})},
      f5: (p)=>{setmentoItem(p);
        setyouhyung(Object.keys(p)[0])
        setbuwi(Object.keys(Object.values(p)[0])[0]);
        setTodayBuwi(todayId+Object.keys(Object.values(p)[0])[0]);
        setjongmock(Object.keys(Object.values(Object.values(p)[0])[0])[0])
      },
      f6: ()=>{setmentoItem({})},
      }
   if(user){
    // fireTodo.workoutSync0(folder,user.uid,cf) 
    fireTodo.workoutSync(folder,user.uid, cf) 
    fireTodo.totalworkoutSync(folder,user.uid, cf) 
    fireTodo.mentoworkoutSync(folder,mentoKey, cf) 
   }else{console.log('no-User')}
  }, [fireTodo,user]);
  //DB에 글 데이터 저장


const sortItems = Object.keys(items).sort(function(a, b) {
  const upperCaseA = a.toUpperCase();
  const upperCaseB = b.toUpperCase();
   if(upperCaseA < upperCaseB) return 1;
   if(upperCaseA > upperCaseB) return -1;
   if(upperCaseA === upperCaseB) return 0; 
 })

  const maxChange = (selectGame)=>{
    const ttt = Object.values(totalItems)
    const total = ttt.map((e)=>{ return e[selectGame]||0 })
    const totalResult = Math.max(...total)
    if(totalResult){
      setMaxItem(totalResult)
      console.log('기록있음',totalItems)
    }else{console.log('기록없음'); setMaxItem(0)}
  }
   
  const addyouhyung = ()=>{
    const data = youhyungRef.current.value;
    const uid6 = user.uid.substr(0,6);
    if(!data){return}
    fireTodo.addyouhyung(folder,uid6,data)
    youhyungRef.current.value ='';
  }
  const addbuwi = ()=>{    
    const data = buwiRef.current.value;
    const uid6 = user.uid.substr(0,6);
    if(!data){return}
    fireTodo.addbuwi(folder,uid6,youhyung,data)
    buwiRef.current.value ='';
  }
  const addjongmock = ()=>{    
    const data = jongmockRef.current.value;
    const uid6 = user.uid.substr(0,6);
    if(!data){return}
    fireTodo.addjongmock(folder,uid6,youhyung,buwi,data)
    jongmockRef.current.value ='';
  }
  const videoLink = ()=>{    
    const data = videoLinkRef.current.value;
    const uid6 = user.uid.substr(0,6);
    if(!data){return}
    fireTodo.addvideoLink(folder,uid6,youhyung,buwi,jongmock,data)
    videoLinkRef.current.value ='';
  }
  const delbuwi = ()=>{    
    const uid6 = user.uid.substr(0,6);
    fireTodo.delbuwi(folder,uid6,youhyung,buwi,buwi)
  }
  const deljongmok = ()=>{    
    const uid6 = user.uid.substr(0,6);
    fireTodo.deljongmok(folder,uid6,youhyung,buwi,buwi,jongmock)
  }


  const submit = (e) => {
    e.preventDefault();
    if(jongmock==='종목'){return}
    let addSet = 1;
    if(items[todayBuwi]){
      if(items[todayBuwi][jongmock]){
        addSet = 1+ items[todayBuwi][jongmock].workoutSet
      }
    }else{ console.log('운동부위 언디파인')}
    
    let addworkWeight = [workWeight];
    if(items[todayBuwi]){
      if(items[todayBuwi][jongmock]){
        addworkWeight = [...items[todayBuwi][jongmock].workWeight,workWeight]
        // addworkWeight = workWeight+ items[buwi][jongmock].workWeight
      }
    }else{ console.log('운동부위 언디파인')}

    let addworkRepeat = [workRepeat];
    if(items[todayBuwi]){
      if(items[todayBuwi][jongmock]){
        addworkRepeat = [...items[todayBuwi][jongmock].workRepeat,workRepeat]
      // addworkRepeat = workRepeat+ items[buwi][jongmock].workRepeat
      }
    }else{ console.log('운동부위 언디파인')}
    let todayMemo = '';
    if(Memo){todayMemo = Memo}
    if(e.currentTarget == null){return;}
    if(youhyung==='웨이트운동' && workWeight === 0){return;}
    if (userName) {
      const dataId = Date.now();
      const data = {
        year:YYear,
        month:MMonth,
        day:DDay,
        uid: user.uid,
        dataId: dataId,
        name: userName,
        today: today,
        progress: 5,
        color : color2,
        todayId,
        body: buwi,
        workoutTime:5,
        workoutSet:addSet,
        gameSelect:jongmock,
        selectStyle:youhyung,
        workWeight : addworkWeight,
        workRepeat : addworkRepeat,
        todayBuwi:todayBuwi,
        memo:todayMemo!==''&&todayMemo
      }
      fireTodo.workoutSave(folder,data)
      if(youhyung==='맨몸운동'){
        if(totalItems[jongmock]===undefined){fireTodo.workouttotal(folder,user.uid,jongmock,addworkRepeat.reduce((first, end)=> { return first + end; }))}
        else if(totalItems[jongmock]<addworkRepeat.reduce((first, end)=> { return first + end; })){
          fireTodo.workouttotal(folder,user.uid,jongmock,addworkRepeat.reduce((first, end)=> { return first + end; }))}
      }
      else{
        if(totalItems[jongmock]===undefined){fireTodo.workouttotal(folder,user.uid,jongmock,workWeight)}
        else if(totalItems[jongmock]<Math.max(...items[todayBuwi][jongmock].workWeight,workWeight)){
          fireTodo.workouttotal(folder,user.uid,jongmock,Math.max(...items[todayBuwi][jongmock].workWeight,workWeight))}
      }

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
 
  const totalGame = (e)=>{
  }

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
          sortItems.map((e) => {
            if(e.length>6){ 
              // console.log(e);
              return <Itemrow key={e} item={items[e]} fireTodo={fireTodo} todayBuwi={todayBuwi} todayId={todayId} totalItems={totalItems} />
            }
          })
        }

      </div>

      <div className="workout-input">
        {/* <form onSubmit={submit} className="workout-form"> */}
        <Accordion>
        <Card style={{background:"gray",borderRadius:"12px 12px 0 0"}}>
          <Card.Header style={{height:"30px",padding:"0",background:"dimgray",borderRadius:"12px 12px 0 0"}}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{margin:"0",padding:"0",color:"white"}}>
              종목선택
            </Accordion.Toggle>
          </Card.Header>         
        
        <Accordion.Collapse eventKey="0">
        {/* defaultActiveKey="0" */}
        <div className="topSelect">
          <div style={{display:"flex",background:"gray"}}>
           <IconButton size="small" component="span" style={{color:"var(--Acolor)",margin:"auto"}}>
             <DeleteForever />  
           </IconButton>
           <input type="text" placeholder="유형" ref={youhyungRef} style={{height:"100%",width:"100%",textAlign:"center"}}/>
            <IconButton size="small" component="span" onClick={addyouhyung} style={{color:"var(--Acolor)",margin:"auto"}} > 
             <AddCircleOutlineIcon  />  
           </IconButton>
          </div>
          
          <div style={{display:"flex",background:"gray"}}>
           <IconButton size="small" component="span" onClick={delbuwi} style={{color:"var(--Acolor)",margin:"auto"}}>
             <DeleteForever />  
           </IconButton>
           <input type="text" placeholder="부위" ref={buwiRef} style={{height:"100%",width:"100%",textAlign:"center"}}/>
            <IconButton size="small" component="span" onClick={addbuwi} style={{color:"var(--Acolor)",margin:"auto"}} > 
             <AddCircleOutlineIcon  />  
           </IconButton>
          </div>
          
          <div style={{display:"flex",background:"gray"}}>
           <IconButton size="small" component="span" onClick={deljongmok} style={{color:"var(--Acolor)",margin:"auto"}}>
             <DeleteForever />  
           </IconButton>
           <input type="text" placeholder="종목" ref={jongmockRef} style={{height:"100%",width:"100%",textAlign:"center"}}/>
            <IconButton size="small" component="span"  onClick={addjongmock} style={{color:"var(--Acolor)",margin:"auto"}} > 
             <AddCircleOutlineIcon  />  
           </IconButton>
          </div>

          <div style={{display:"flex",background:"gray"}}>
           <IconButton size="small" component="span" style={{color:"var(--Acolor)",margin:"auto"}}>
             <DeleteForever />  
           </IconButton>
           <input type="text" placeholder="링크" ref={videoLinkRef} style={{height:"100%",width:"100%",textAlign:"center"}}/>
            <IconButton size="small" component="span" onClick={videoLink} style={{color:"var(--Acolor)",margin:"auto"}} > 
             <AddCircleOutlineIcon  />  
           </IconButton>
          </div>
        </div>
        </Accordion.Collapse>
        </Card>
        </Accordion>

        <div className="topSelect">          
        <DropdownButton as={ButtonGroup} title={youhyung} size="sm" variant={'dark'} style={{width:"100%",border:"soid 1px", background:"var(--Ccolor)"}} >
           {
            Object.keys(mentoItem).map((e,i) => {  
              return <Dropdown.Item as="button" onClick={()=>{setyouhyung(e);setbuwi(Object.keys(mentoItem[e])[0]); setTodayBuwi(todayId+Object.keys(mentoItem[e])[0]);setworkWeight(0); setjongmock( Object.keys(Object.values(mentoItem[e])[0])[0]) }} 
              style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
            {/* <Dropdown.Item as="button" onClick={()=>{ setyouhyung('맨몸운동');setColor2('danger');setplaceholder(placeholder1);setbodySelect2(placeholder1[0]);setjongmock(Object.values(placeholder1[0])[0]); maxChange(Object.values(placeholder1[0])[0]); setbuwi('가슴'); setworkWeight(0)}}   
            style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>맨몸운동</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setyouhyung('웨이트운동');setColor2('danger');setplaceholder(placeholder2);setbodySelect2(placeholder2[0]);setjongmock(Object.values(placeholder2[0])[0]); maxChange(Object.values(placeholder2[0])[0]); setbuwi('가슴')}} 
            style={{textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>웨이트운동</Dropdown.Item> */}
        </DropdownButton>

        <DropdownButton as={ButtonGroup} variant={color2} title={buwi} size="sm" >
        <div className="cardSelect"> 

            {  
            youhyung &&
              Object.keys(mentoItem[youhyung]).map((e,i) => {  
                       return <Dropdown.Item as="button" onClick={()=>{setbuwi(e); setTodayBuwi(todayId+e); setjongmock(Object.keys(mentoItem[youhyung][e])[0]) }} 
                       style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
              })
            }
            {/* <Dropdown.Item as="button" onClick={()=>{setColor2('danger');setbodySelect2(placeholder[0]);   setjongmock(Object.values(placeholder[0])[0]); setbuwi('가슴')}} style={{color:"#d53343",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>가슴</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('primary');setbodySelect2(placeholder[1]);  setjongmock(Object.values(placeholder[1])[0]); setbuwi('어깨')}} style={{color:"#0077f7",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>어깨</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('warning');setbodySelect2(placeholder[2]);  setjongmock(Object.values(placeholder[2])[0]); setbuwi('등')}} style={{color:"#f7bb07",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>등</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('info');setbodySelect2(placeholder[3]);     setjongmock(Object.values(placeholder[3])[0]); setbuwi('삼두')}} style={{color:"#17a2b8",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>삼두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('secondary');setbodySelect2(placeholder[4]);setjongmock(Object.values(placeholder[4])[0]); setbuwi('이두')}} style={{color:"#697179",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>이두</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('dark');setbodySelect2(placeholder[5]);     setjongmock(Object.values(placeholder[5])[0]); setbuwi('복근')}} style={{color:"#32383e",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>복근</Dropdown.Item>
            <Dropdown.Item as="button" onClick={()=>{setColor2('success');setbodySelect2(placeholder[6]);  setjongmock(Object.values(placeholder[6])[0]); setbuwi('다리')}} style={{color:"#27a243",textAlign:"center", fontSize:"18px",padding:"0",fontWeight:"900"}}>다리</Dropdown.Item> */}
          </div>
        </DropdownButton>
        
        <DropdownButton as={ButtonGroup} variant="dark" title={jongmock} size="sm" >
          <div className="cardSelect">
            {
            youhyung && buwi &&
            Object.keys(mentoItem[youhyung][buwi]).map((e,i) => { 
              return <Dropdown.Item as="button" onClick={()=>{setjongmock(e);totalGame(e);maxChange(e);}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>
        { 
            youhyung && buwi && jongmock &&
        <a href={mentoItem[youhyung][buwi][jongmock]} target="_blank" rel="noreferrer">
          <button  className="btnRoomLink" style={{fontSize:"13px"}} >
            동영상
          </button>
        </a>
        }
        </div>

        <div className="slider" >
          <h5 style={{margin:"auto",marginLeft:"0"}}>횟수: {workRepeat}회</h5>
              <Slider style={{width:'99%',margin:'auto',color:"red"}} ref={repeateRef}
               defaultValue={1}
               getAriaValueText={valuetext}
               aria-labelledby="discrete-slider"
               valueLabelDisplay="auto"
               step={1}
              //  marks 
               min={1}
               max={110}
               onChange={handleSliderChange}
             />         
        </div>
        
        {youhyung === '웨이트운동' && 
        <div className="slider" >
          <h5 style={{margin:"auto",marginLeft:"0"}}>무게: {workWeight}kg</h5>
              <Slider style={{width:'99%',margin:'auto',color:"red"}} ref={repeateRef}
               defaultValue={1}
               getAriaValueText={valuetext}
               aria-labelledby="discrete-slider"
               valueLabelDisplay="auto"
               step={1}
              //  marks 
               min={1}
               max={190}
               onChange={handleSliderChange0}
             />         
        </div>
        }
        {/* <textarea className="samtextarea" ref={textRef} cols="30" rows="3" style={{resize: 'none'}} /> */}
        <div style={{display:"flex"}}>
        <button className="btnWorkoutAdd" >
        최고기록 {totalItems[jongmock]} {youhyung==='맨몸운동'?'(회)':'(kg)'} 
        </button>
        <button className="btnWorkoutAdd" onClick={submit}> 추가</button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Workout;