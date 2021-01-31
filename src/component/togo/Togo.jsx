import React from 'react';
import { useHistory } from 'react-router-dom';
import './togo.css';


function Togo(props) {
const history = useHistory();
  return (
    <div className="togo">      
      <div className="jumbo"></div>    
      <div className="togoMain">    
        <button className="btnMenu" onClick={() => history.push('/scamper')}>스캠퍼</button>
        <button className="btnMenu">브레인스톰</button>
        <button className="btnMenu">트리즈</button>
        <button className="btnMenu">5Why</button>
        <button className="btnMenu">관찰</button>
        <button className="btnMenu">만다라트</button>
        <button className="btnMenu">SWOT</button>
        <button className="btnMenu">린캔버스</button>
        <button className="btnMenu">페르소나</button>
        <button className="btnMenu">프로토타입</button>
      </div>
    </div>  );}export default Togo;