import React, { useEffect, useRef, useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
    const text = textRef.current.value; // 내용
    const title = titleRef.current.value; //Link

    let text2 = textRef2.current.value; // content
  if(title&&!text2){text2 = `<iframe src=${title} width="90%" height="500px"/>`}
  
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
        <form className="mytool-form">
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
        <div style={{display:"flex",background:"white"}}>
          {level>0 && 
         <Tooltip arrow  placement="top" title="폴더삭제">
          <IconButton size="small" component="span" onClick={deleteFolder} style={{color:"var(--Acolor)",padding:"0 5px 0 0"}}>
                <DeleteForever />  
          </IconButton>
          </Tooltip>
        }
        {level>0 &&       
         <IconButton size="small" component="span" onClick={AddNewFolder} style={{color:"var(--Acolor)",padding:"0 0 0 5px"}} > 
         <Tooltip arrow  placement="top" title="폴더 추가">
          <AddCircleOutlineIcon  />  
          </Tooltip>
        </IconButton>
        }
        </div>
        <input type="text" ref={newFolder} className="inputTitle" style={{flex:"2",minWidth:"50px"}} placeholder="새폴더"/>
        </div>  
       
          <Tooltip arrow  placement="top" title="내용저장"> 
          <IconButton size="small" component="span" onClick={submit} style={{color:"var(--Bcolor)",padding:"0"}}>
          <span className="rocket" ref={rocketRef}>🚀</span>
          <span style={{cursor:"pointer",fontWeight:"900"}}>저장</span> 
          </IconButton>
          </Tooltip> <textarea type="text" cols="30" rows="2"  ref={textRef} className="inputTitle"  style={{textAlign:"center",resize:"none"}} placeholder="내용" />
          <input type="url" ref={titleRef} className="inputTitle" placeholder="  Link"/>
          <textarea className="textarea" ref={textRef2} cols="30" rows="2" placeholder=" Content" />
        </form>
      </div>

    </div>
  );
}

export default Mytool;