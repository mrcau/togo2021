import React, { useEffect, useRef, useState } from 'react';
import Toolrow from './Toolrow';
import Swal from 'sweetalert2';
import './opentool.css';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
import { IconButton, Tooltip } from '@material-ui/core';
import {  DeleteForever } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import mime from 'mime-types';
import Compressor from 'compressorjs';

function Opentool({ fireSync, fireApp, fireIdea, user, userInfo,setlogoName }) {

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
  const [selectFolder, setselectFolder] = useState('사용방법')
  const [anchorEl, setAnchorEl] = useState('');
  const [photoData, setPhotoData] = useState('');
  const [addLink, setAddLink] = useState('')
  const [addCon, setAddCon] = useState('')

  const handleClick = (e) => { setAnchorEl(e.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };


  setlogoName('사용법 / 공유툴');

  useEffect(() => {    
    const cf = { f1: (p)=>{setItems(p);setfolderBox(p.toolbox)}, f2: ()=>{setItems({})}  }
  //  if(user){ 
      const stopDataSync =fireApp.opentoolSync(folder,cf);
      return ()=>{stopDataSync();}
    // }else{console.log('no-User')}
      // })
  }, [user,selectFolder,fireApp]);
  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    if(e.currentTarget == null){return;}
    const text = textRef.current.value; // 내용
    let text2 = addCon; //ContentYYY
    if(addLink&&!addCon){text2 = `<iframe src=${addLink} width="90%" height="500px"/>`}
    if( !text ){ Swal.fire({title:'내용을 입력해 주세요.',icon:'warning'}) }

    if (userInfo && text && !photoData ) { 
      const dataId = Date.now();
      const data = {
        uid: user.uid||'',
        userName : userInfo.name,
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
      fireApp.opentoolSave(folder,data);  
      textRef.current.value = '';
      setPhotoData(''); setAddLink(''); setAddCon('')
    }
    
    if (userInfo && text && photoData) {
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
        fireApp.opentoolSave(folder,data);     
      })      
      textRef.current.value = '';
      setPhotoData(''); setAddLink(''); setAddCon('')      
    }
  }

//사진업로드
const upLoad = (e) => {  
  const file = e.target.files[0]||'';     
  setPhotoData(file)


// new Compressor(file, {
//   quality: 0.6, 
//   success(result) {
// const metaData = { contentType: mime.lookup(file.name) } ||''
// const formData = new FormData();
//     formData.append(imgDataId, result, result.name);
// fireIdea.imgUpload( imgDataId, formData, metaData, (e) => setPhotoData(e));
// }
// })

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
    if(selectFolder==='사용방법'){return}
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
    setselectFolder('사용방법')
  }});    
  }

  
  const AddNewFolder = () => {
    if(newFolder.current.value===''){return}else{
      const folderName = '📁'+newFolder.current.value || "";
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
    <div className="opentool">
      
      {user.uid && userInfo && userInfo.level>9 && 
      <div className="mytool-input">
        <input type="text" className="textarea titleText" ref={textRef} cols="20" rows="4"  minlength="4" size="10" placeholder="제목/내용을 입력해주세요."/>
        <div onSubmit={submit} className="mytool-form">
        <div className="mytoolInputMenu" style={{flex:"auto", display: "flex"}}>
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
        </div>
      </div>
      }

    <div style={{display:"flex",background:"var(--Bcolor)",height:"30px"}}>
      {
         folderBox && Object.values(folderBox).map((e,i) => {
           return <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} 
           style={{textAlign:"center", fontSize:"14px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
         })
      }
    </div>
       
       
      <div className="opentool-items">
        {
          // eslint-disable-next-line array-callback-return
          Object.keys(items).map((e) => { 
            return e>10&&selectFolder===items[e].selectFolder&&<Toolrow key={e} fireIdea={fireIdea} user={user} item={items[e]} fireApp={fireApp} level={level} />
          })
        }
      </div>

    </div>
  );
}

export default Opentool;