import React, { useEffect, useRef, useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';

function Mytool({fireIdea,fireApp, fireSync,user, userInfo, setlogoName }) {
  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const newFolder = useRef();
  const [items, setItems] = useState({});
  const folder = "mytool"
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  
  const [folderBox, setfolderBox] = useState([])
  const [selectFolder, setselectFolder] = useState('기본')
  setlogoName(' My ToolBox');
  // 데이터 보여주기 싱크
  useEffect(() => {    
    fireSync.onAuth((e) => {
      fireApp.authSync('auth',e.uid,(p)=>setfolderBox(p.toolBox))
    const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})}  }
   if(user){ 
      const stopDataSync =fireSync.toolSync(folder,user.uid,selectFolder, cf);
      return ()=>{stopDataSync();}
    }else{console.log('no-User')}
  
    })
  }, [fireSync,user,selectFolder,userInfo.toolBox]);
  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const text = textRef.current.value;
    const text2 = textRef2.current.value;
    const title = titleRef.current.value;
    if( !text ){ Swal.fire({title:'제목을 입력해 주세요.',icon:'warning'}) }
    if (userInfo && text) {
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
        color : 'secondary',
        selectFolder
      }
      fireSync.toolSave(folder,user.uid,selectFolder,data);      
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
  
  const deleteFolder = () =>{
    if(selectFolder==='기본'){return}
    newFolder.current.value = '';

    Swal.fire({ 
      title: selectFolder + ' 폴더와 자료가 모두 삭제됩니다.',
      icon:'warning',
      showCancelButton: true})
    .then((result) => { if(result.isConfirmed){ 
      fireApp.folderDel('auth',user.uid,selectFolder);
      fireApp.toolDataDel('mytool',user.uid,selectFolder);
    setselectFolder('기본')
  }});
    
  }


  const AddNewFolder = () => {
    if(newFolder.current.value===''){return}else{
      const folderName = newFolder.current.value || "";
      setfolderBox({...folderBox,folderName});
      const folder = {...folderBox,[folderName]:folderName}
      newFolder.current.value = '';

      Swal.fire({ 
        title: folderName + ' 폴더가 추가됩니다.',
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){       
        fireApp.profileUp('auth',user.uid,{toolBox:folder});
      setselectFolder(folderName)
    }});


    }  
  }

  return (
    <div className="mytool">
      <div className="mytool-items">
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireSync={fireSync} level={level} user={user} userInfo={userInfo} selectFolder={selectFolder} />
          })
        }
      </div>
      <div className="mytool-input">
        <form onSubmit={submit} className="mytool-form">
        <div style={{display:"flex"}}>
        <DropdownButton as={ButtonGroup} variant="primary" title={selectFolder} size="sm" style={{flex:"1"}} >
          <div className="cardSelect">
            {
            Object.values(folderBox).map((e,i) => {
              return <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>
        <input type="text" ref={newFolder} className="inputTitle" style={{flex:"2",minWidth:"50px"}} placeholder="새폴더"/>
        </div>      
          <button type="button" className="btnadd" style={{ outline: "none", border: "none" }} onClick={AddNewFolder}>추가</button>
          <button type="button" className="btnadd" style={{ outline: "none", border: "none",background:"var(--Dcolor)" }} onClick={deleteFolder}>삭제</button>
          <button className="btnadd" style={{ outline: "none", border: "none"  }} ><span className="rocket" ref={rocketRef}>🚀</span>저장</button>
          {/* <textarea className="textarea" ref={textRef} cols="30" rows="2" placeholder="제목을 입력해 주세요." /> */}
          <input type="text" ref={textRef} className="inputTitle" placeholder="제목" />
          <input type="text" ref={titleRef} className="inputTitle" style={{textAlign:"left"}} placeholder="링크를 입력해주세요."/>
          <textarea className="textarea" ref={textRef2} cols="30" rows="2" 
          style={{borderTop: 'dashed 1px'}} placeholder="소스코드를 입력해주세요." />
        </form>
      </div>


    </div>
  );
}

export default Mytool;