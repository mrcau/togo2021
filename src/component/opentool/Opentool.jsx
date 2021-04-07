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

  useEffect(() => {    
    const cf = { f1: (p)=>{setItems(p);setfolderBox(p.toolbox)}, f2: ()=>{setItems({})}  }
  //  if(user){ 
      const stopDataSync =fireApp.opentoolSync(folder,cf);
      return ()=>{stopDataSync();}
    // }else{console.log('no-User')}
      // })
  }, [user,selectFolder,fireApp]);
  //DB에 글 데이터 저장
  const submit = (e) => { console.log(userInfo)
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const title = titleRef.current.value;
    const text = textRef.current.value;
    const text2 = textRef2.current.value;
    if(!text){ Swal.fire({title:'내용을 입력해주세요.',icon:'warning'}) }
    if (userInfo && text ) { console.log(text)
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
        color : 'secondary',
        selectFolder
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
    let imsiFolder = folderBox
    delete imsiFolder[selectFolder]
    console.log(folderBox,imsiFolder )
     const folders =  delete folderBox.selectFolder
        fireApp.openfolderDel(folder,'toolbox',folderBox);
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
      
      <div className="opentool-input">
          {userInfo && userInfo.level>5 &&
          <div style={{display:"flex",flexDirection:"column"}}>
            <input type="url" ref={titleRef} className="inputTitle" placeholder="  Link"/> 
            <textarea ref={textRef2} cols="30" rows="2" className="inputTitle" placeholder="  Content" />
            <textarea ref={textRef}  cols="30" rows="2"   className="inputTitle" placeholder="내용" style={{textAlign:"center",border:"1px"}} />
          </div>
          }

        {/* <form onSubmit={submit} className="opentool-form"> */}
        <div style={{width:"100%",height:"1px", background:"black"}} /> 
        <div style={{display:"flex",background:"var(--Acolor)",border:"1px"}}>
          <DropdownButton as={ButtonGroup} variant="primary" title={selectFolder} size="sm" style={{flex:"1"}} >
            <div className="cardSelect">
            {
            folderBox && Object.values(folderBox).map((e,i) => {
            return  <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
            </div>
          </DropdownButton>
          {level>5 && 
           <div style={{display:"flex",background:"white"}}>
             <Tooltip arrow  placement="top" title="폴더삭제">
              <IconButton size="small" component="span" onClick={deleteFolder} style={{color:"var(--Acolor)",padding:"0 5px 0 0"}}>
                <DeleteForever />  
              </IconButton>
             </Tooltip>
             
            <Tooltip arrow  placement="top" title="폴더 추가">
              <IconButton size="small" component="span" onClick={AddNewFolder} style={{color:"var(--Acolor)",padding:"0 0 0 5px"}} > 
                <AddCircleOutlineIcon  />  
              </IconButton>
            </Tooltip>
           </div>
          }

          {userInfo && userInfo.level>5 &&
           <input type="text" ref={newFolder} className="inputTitle" style={{flex:"1",minWidth:"50px",border:"1px"}} placeholder="새폴더"/>
          }

          {userInfo && userInfo.level>5 &&
            <Tooltip arrow  placement="top" title="내용저장"> 
              <IconButton size="small" component="span" onClick={submit} style={{color:"var(--Bcolor)",padding:"0 5px"}}>
                <span className="rocket" ref={rocketRef}>🚀</span>
                <span style={{cursor:"pointer",fontWeight:"900"}}>저장</span> 
              </IconButton>
            </Tooltip> 
          }                  
        </div>           
          {/* </form> */}
      </div>
       
       
      <div className="opentool-items">
        {
          // eslint-disable-next-line array-callback-return
          Object.keys(items).map((e) => { 
            return e>10&&selectFolder===items[e].selectFolder&&<Toolrow key={e} user={user} item={items[e]} fireApp={fireApp} level={level} />
          })
        }
      </div>

    </div>
  );
}

export default Opentool;