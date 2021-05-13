import React, { useEffect, useRef, useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import {  DeleteForever } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import mime from 'mime-types';

function Mytool({fireIdea,fireApp, fireSync,user, userInfo, setlogoName }) {
  const today = new Date().toLocaleDateString();
  const textRef = useRef();
  const textRef2 = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const newFolder = useRef();
  const youhyungRef = useRef();
  const jongmockRef = useRef();
  const buwiRef = useRef();
  const videoLinkRef = useRef();
  
  const [items, setItems] = useState({});
  const folder = "mytool"
  const Swal = require('sweetalert2');
  const level = userInfo.level || 0;
  const [photoData, setPhotoData] = useState('');
  const [addLink, setAddLink] = useState('')
  const [addCon, setAddCon] = useState('')
  const [youhyung, setYouhyung] = useState('맨몸운동')
  const [jongmock, setJongmock] = useState('팔굽혀펴기')
  const [buwi, setbuwi] = useState('가슴')
  const [videoLink, setVideoLink] = useState('')
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
    let text2 = addCon; //Content
    if(addLink&&!addCon){text2 = `<iframe src=${addLink} width="90%" height="500px"/>`}
    if( !text ){ Swal.fire({title:'내용을 입력해 주세요.',icon:'warning'}) }
    if (userInfo && text && !photoData) {
      rocketOn();
      const dataId = Date.now();
      const data = {
        uid: user.uid||'',
        dataId: dataId,
        name: userInfo.name||'',
        title: addLink,
        text: text,
        text2: text2,
        today: today,
        progress: 0,
        color : 'secondary',
        photoData,
        selectFolder
      }
      fireSync.toolSave(folder,user.uid,selectFolder,data);      
      textRef.current.value = '';
      setPhotoData(''); rocketOn();
      setAddLink(''); setAddCon('')
    }
  
    if (userInfo && text && photoData) {
      rocketOn();
      const dataId = Date.now();
      const metaData = { contentType: mime.lookup(photoData.name) } ||''
      fireIdea.imgUpload( dataId, photoData, metaData).then((e)=>{        
        const data = {
          uid: user.uid||'',
          dataId: dataId,
          name: userInfo.name||'',
          title: addLink,
          text: text,
          text2: text2,
          today: today,
          progress: 0,
          color : 'secondary',
          photoData : e||'',
          selectFolder
        }
        fireSync.toolSave(folder,user.uid,selectFolder,data);      
      })      
      textRef.current.value = '';
      setPhotoData(''); rocketOn();
      setAddLink(''); setAddCon('')      
    }
  }

//사진업로드
const upLoad = (e) => { 
  const file = e.target.files[0]||'';     
  setPhotoData(file)
}
// const upLoad = (e) => { 
//   const imgDataId = Date.now();
//   const file = e.target.files[0];    
//   const metaData = { contentType: mime.lookup(file.name) } ||''
//   fireIdea.imgUpload( imgDataId, file, metaData, (e) => setPhotoData(e));
// }

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
   // 링크입력 모달
   const linkInsert = async(e)=>{
    e.preventDefault();
    const { value: text } = await Swal.fire({
      input: 'url', 
      inputValue: addLink ,
      title: '링크를 입력해주세요.',
      showCancelButton: true
    })
    if (text) {
    setAddLink(text)
    console.log(addLink)
    }
  }

     // 내용추가입력 모달
     const contentInsert = async(e)=>{
      e.preventDefault();
      const { value: text } = await Swal.fire({
        input: 'textarea', 
        inputValue: addCon ,
        title: '내용을 입력해주세요.',
        showCancelButton: false
      })
      if (text) {
      setAddCon(text)
      console.log(addCon)
      }
    }


  return (
    <div className="samtoolmytool">
      <div className="mytool-items">
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireSync={fireSync} level={level} user={user} userInfo={userInfo} selectFolder={selectFolder} />
          })
        }
      </div>

      <div className="mytool-input">
        <div onSubmit={submit} className="mytool-form">
        <div className="mytoolInputMenu" style={{flex:"auto"}}>
          <div className="folderDorpDown" style={{flex:"auto"}}>
              <DropdownButton as={ButtonGroup} variant="primary" title={selectFolder} size="sm" style={{flex:"1"}} >
               <div className="cardSelect">
                 {
                 folderBox && Object.values(folderBox).map((e,i) => {
                   return <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
                 })
                 }
               </div>
              </DropdownButton>
          </div>
          <div style={{display:"flex",background:"white"}}>
                {level>0 && 
               <Tooltip arrow  placement="top" title="폴더삭제">
                <IconButton size="small" component="span" onClick={deleteFolder} style={{color:"var(--Acolor)",padding:"0 5px 0 0"}}>
                      <DeleteForever />  
                </IconButton>
                </Tooltip>
                }
                <input type="text" ref={newFolder} className="inputTitle" style={{flex:"3",minWidth:"50px"}} placeholder="새폴더"/>
                {level>0 &&       
                 <IconButton size="small" component="span" onClick={AddNewFolder} style={{color:"var(--Acolor)",padding:"0 0 0 5px"}} > 
                 <Tooltip arrow  placement="top" title="폴더 추가">
                  <AddCircleOutlineIcon  />  
                  </Tooltip>
                </IconButton>
                }
          </div>
        </div>  
          <Tooltip arrow  placement="top" title="링크첨부"> 
            <button className="samtoolbtnadd" style={{ outline: "none", border: "none" }} onClick={linkInsert} >
            <LinkIcon  /> {addLink?'첨부됨!':'링크'}</button>
          </Tooltip>
          
          <Tooltip arrow  placement="top" title="추가내용 첨부"> 
            <button className="samtoolbtnadd" style={{ outline: "none", border: "none" }} onClick={contentInsert}>
              <VisibilityIcon/> {addCon?'첨부됨!':'내용'}</button>
          </Tooltip>
          
          <input accept="image/*" style={{ display: 'none' }} id="imgData" type="file" onChange={upLoad} /> 
          <Tooltip arrow  className="samtoolbtnadd" placement="top" title="사진첨부"> 
          <label htmlFor="imgData" style={{ height:"25px",margin:"0",textAlign:"center"}}> 
              <IconButton  className="samtoolbtnadd" size="small" component="span" style={{height:"22px",color:"var(--Bcolor)"}}> 
              <AddPhotoAlternateIcon />  {photoData?'추가됨!':'사진'}
                </IconButton>
            </label>
          </Tooltip>        
       
        <Tooltip arrow  placement="top" title="내용저장"> 
          <button size="small" className="samtoolbtnadd" onClick={submit} style={{ outline: "none", color:"white",fontSize:'16px' }}>
          <span className="rocket" ref={rocketRef}>🚀</span>
          저장 
          </button>
        </Tooltip> 
        <input type="text" className="textarea titleText" ref={textRef} cols="20" rows="4"  minlength="4" size="10" placeholder="제목/내용을 입력해주세요."
            // maxlength="20" 
            />
        </div>
      </div>

    </div>
  );
}

export default Mytool;