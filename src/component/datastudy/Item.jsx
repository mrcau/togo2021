import React from 'react';

function Item({itemitem,Tt,roomName,report,reportId,fireArea,fireAreaReport,onSubmit2,onSubmit4,data,reportInput}) {
  const Pen = '•'
  console.log(Tt)
  return (
    <div className={itemitem}>
      {roomName&&
      <button className="eye" onClick={()=>{if(!report&&reportId.length<11){fireArea(Tt.substr(0,2),Tt.substr(2))}else{fireAreaReport(Tt.substr(0,2),Tt.substr(2))}}} >{Pen}</button>
      }
      <textarea cols="10" rows="1" className="itemArea btnArea" ref={Tt} 
      onChange={()=>{
        if(!report){onSubmit2(Tt,`${Tt}`)}else{onSubmit4(Tt,`${Tt}`)}
      }} 
      value={data.Tt}  disabled={reportInput}  />
    </div>
    
  );
}

export default Item;