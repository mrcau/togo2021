import React, { useEffect, useRef, useState } from 'react';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';
import './opentool.css';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import { IconButton, Tooltip } from '@material-ui/core';
import {  DeleteForever } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function Opentool({ fireSync, fireApp, user, userInfo,setlogoName }) {

  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const newFolder = useRef();
  const [items, setItems] = useState({});
  const folder = "Opentool";
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const [folderBox, setfolderBox] = useState([])
  const [selectFolder, setselectFolder] = useState('기본')

  setlogoName(' 공유툴');
  // 데이터 보여주기 싱크
  // useEffect(() => {    
  //   // fireApp.onAuth((e) => {
  //   // const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})} }
  //   //  if(e){
  //   //    fireApp.opentoolSync(folder,cf);
  //   //   }
  //   //    else{return}
  //   // })
  //   const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})} }
  //   fireApp.opentoolSync(folder,cf);
    
  // }, [fireApp]);

  useEffect(() => {    
    // fireSync.onAuth((e) => {
      fireApp.openFolderSync(folder,(p)=>setfolderBox(p.toolBox))
    const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})}  }
  //  if(user){ 
      const stopDataSync =fireApp.opentoolSync(folder,cf);
      return ()=>{stopDataSync();}
    // }else{console.log('no-User')}
  
    // })
  }, [user,selectFolder,fireApp]);
console.log(items,folderBox,folder)
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
      const folders = {...folderBox,[folderName]:folderName}
      newFolder.current.value = '';

      Swal.fire({ 
        title: folderName + ' 폴더가 추가됩니다.',
        icon:'warning',
        showCancelButton: true})
      .then((result) => { if(result.isConfirmed){       
        fireApp.openFolderUp(folder,'toolbox',folders);
      // setselectFolder(folderName)
    }});
    }  
  }

  return (
    <div className="opentool">
      <div className="opentool-items">
        {
          // eslint-disable-next-line array-callback-return
          Object.keys(items).map((e) => {
            return e>10&&<Toolrow key={e} user={user} item={items[e]} fireApp={fireApp} level={level} />
          })
        }
      </div>
      {userInfo && userInfo.level>5 &&
      <div className="opentool-input">
        <form onSubmit={submit} className="opentool-form">
          {/* <input type="text" ref={titleRef} className="inputTitle" placeholder="공유자료 링크"/>
          <button className="btnadd" style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="3" placeholder="공유자료 설명" />
          <textarea className="textarea" ref={textRef2} cols="30" rows="3" 
          style={{borderTop: 'dashed 1px'}} placeholder="소스코드를 입력해주세요." /> */}
            <div style={{display:"flex"}}>
            <DropdownButton as={ButtonGroup} variant="primary" title={selectFolder} size="sm" style={{flex:"1"}} >
          {/* <div className="cardSelect">
            {
            Object.values(folderBox).map((e,i) => {
              return <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div> */}
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
       } 

    </div>
  );
}

export default Opentool;