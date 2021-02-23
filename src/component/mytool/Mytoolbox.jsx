import React, { useEffect,  useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';

function Mytoolbox({ fireTodo, user, userName,  }) {

  const [items, setItems] = useState({});
  const folder = "mytool"
  // 데이터 보여주기 싱크
  useEffect(() => {    
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
      user ? fireTodo.itemSync(folder,user.uid, cf):console.log('no-User');
  }, [fireTodo,user]);


  return (
    <div className="mytool" style={{background:"var(--Ecolor)",boxShadow:"2px 4px 11px -2px rgba(69,69,69,1)"}} >
      <div className='mytool-header' style={{height:"30px",background:"var(--Acolor)",fontSize:"large"}}>My ToolBox</div>
      <div className="mytool-items" style={{height:"50vh"}}>
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireTodo={fireTodo} />
          })
        }
      </div>
    </div>
  );
}

export default Mytoolbox;