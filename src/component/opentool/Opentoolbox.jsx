import React, { useEffect,  useState } from 'react';
import Toolrow from './Toolrow';
import { Link} from 'react-router-dom';

function Opentoolbox({ fireApp, user, userInfo,  }) {

  const [items, setItems] = useState({});
  const folder = "Opentool";
  // 데이터 보여주기 싱크
  useEffect(() => {    
    fireApp.onAuth((e) => {
    const cf = {
      f1: (p)=>{setItems(p)},
      f2: ()=>{setItems({})}
      }
   e ? fireApp.opentoolSync(folder,cf):console.log('no-User')
  })
  }, [fireApp]);


  return (
    <div className="openTool" style={{background:"none"}} >
          <Link className="link" to='/opentool' style={{fontWeight:"900",color:"var(--Acolor)"}}> Open ToolBox </Link>
      <div className="mytool-items" style={{height:"20vh"}}>
        {
          Object.keys(items).map((e) => {
            return <Toolrow key={e} item={items[e]} fireApp={fireApp} />
          })
        }
      </div>
    </div>
  );
}

export default Opentoolbox;