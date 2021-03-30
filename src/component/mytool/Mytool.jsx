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
    if(!title || !text || !text2){ Swal.fire({title:'빈칸을 모두 채워주세요.',icon:'warning'}) }
    if (userInfo && title && text && text2) {
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
    fireApp.folderDel('auth',user.uid,selectFolder);
    newFolder.current.value = '';
    setselectFolder('기본')
  }


  const AddNewFolder = () => {
    if(newFolder.current.value===''){return}else{
      const folderName = newFolder.current.value || "";
      setfolderBox({...folderBox,folderName});
      const folder = {...folderBox,[folderName]:folderName}
      newFolder.current.value = '';
      fireApp.profileUp('auth',user.uid,{toolBox:folder});
    }  
  }

  return (
    <div className="mytool">
      <div className="mytool-items">
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireSync={fireSync} level={level} user={user} userInfo={userInfo} />
          })
        }
      </div>
      <div className="mytool-input">
        <form onSubmit={submit} className="mytool-form">
        <DropdownButton as={ButtonGroup} variant="primary" title={selectFolder} size="sm" style={{width:"50px"}} >
          <div className="cardSelect">
            {
            Object.values(folderBox).map((e,i) => {
              return <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>
          <input type="text" ref={newFolder} className="inputTitle" placeholder="새폴더"/>
          <button type="button" className="btnadd" style={{ outline: "none", border: "none",background:"var(--Dcolor)" }} onClick={deleteFolder}>삭제</button>
          <button type="button" className="btnadd" style={{ outline: "none", border: "none" }} onClick={AddNewFolder}>추가</button>
          <input type="text" ref={titleRef} className="inputTitle" placeholder="링크"/>
          <button className="btnadd" style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  저장</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="3" placeholder="설명을 적어주세요." />
          <textarea className="textarea" ref={textRef2} cols="30" rows="3" 
          style={{borderTop: 'dashed 1px'}} placeholder="소스코드를 입력해주세요." />
        </form>
      </div>


    </div>
  );
}

export default Mytool;