import './reportMenu.css';
import React, { memo, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ReportMenu({ fireApp, user}) {
const [level, setLevel] = useState(0);

useEffect(() => {
  fireApp.onAuth((e) => {
    if (e) {fireApp.authSync('auth',e.uid,(p)=>setLevel(p))}
    else { console.log('no-User') }
  })
}) 

  const history = useHistory();

  return (
    <div className="reportMenu">
      <button className="btnlink" onClick={() => history.push('/todo')}>Todo</button>
      <button className="btnlink" onClick={() => history.push('/scamper')}>scamper</button>
    </div>
  );
}

export default memo(ReportMenu);