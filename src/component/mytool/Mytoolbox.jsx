import React, { useEffect,  useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';
import { DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';

function Mytoolbox({ fireTodo, user, userName,  }) {

  const [items, setItems] = useState({});
  const folder = "mytool"
  const [folderBox, setfolderBox] = useState([])
  const [selectFolder, setselectFolder] = useState('기본')
  // 데이터 보여주기 싱크
  // useEffect(() => {    
  //   const cf = {
  //     f1: (p)=>{setItems(p)},
  //     f2: ()=>{setItems({})}
  //     }
  //     user ? fireTodo.itemSync(folder,user.uid, cf):console.log('no-User');
  // }, [fireTodo,user]);
  useEffect(() => {    
    fireTodo.onAuth((e) => {
      fireTodo.authSync('auth',e.uid,(p)=>setfolderBox(p.toolBox))
    const cf = { f1: (p)=>{setItems(p)}, f2: ()=>{setItems({})}  }
   if(user){ 
      const stopDataSync =fireTodo.toolSync(folder,user.uid,selectFolder, cf);
      return ()=>{stopDataSync();}
    }else{console.log('no-User')}
  
    })
  }, [fireTodo,user,selectFolder]);

  return (
    <div className="mytool" style={{background:"var(--Ecolor)",boxShadow:"2px 4px 11px -2px rgba(69,69,69,1)"}} >
      <div className="mytool-items" style={{height:"50vh"}}>
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireTodo={fireTodo} />
          })
        }
      </div>
        <div className='mytool-header' style={{height:"30px",background:"var(--Acolor)"}}>
        <DropdownButton as={ButtonGroup} variant="primary" title={selectFolder} size="sm" style={{height:"30px",width:"100px"}} >
          <div className="cardSelect">
            {
            Object.values(folderBox).map((e,i) => {
              return <Dropdown.Item as="button" type="button"  onClick={()=>{setselectFolder(e)}} style={{textAlign:"center", fontSize:"12px",padding:"0",fontWeight:"900"}}>{e}</Dropdown.Item>
            })
            }
          </div>
        </DropdownButton>

        </div>
    </div>
  );
}

export default Mytoolbox;