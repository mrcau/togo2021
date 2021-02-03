import React, { useEffect,  useState } from 'react';
import './mytool.css';
import Toolrow from './Toolrow';

function Mytoolbox({ fireApp, user, userName,  }) {

  const [items, setItems] = useState({});
  const folder = "mytool"
  // 데이터 보여주기 싱크
  useEffect(() => {    
    fireApp.onAuth((e) => {
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   e ? fireApp.itemSync(folder,e.uid, cf):console.log('no-User')
    })
  }, [fireApp]);


  return (
    <div className="mytool" style={{background:"var(--Bcolor)"}} >
      <div className='mytool-header'>  My Tools</div>
      <div className="mytool-items" style={{height:"50vh"}}>
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireApp={fireApp} />
          })
        }
      </div>
    </div>
  );
}

export default Mytoolbox;