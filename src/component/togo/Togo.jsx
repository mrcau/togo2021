import React from 'react';
import { Jumbotron,Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './togo.css';
import problem from './problem.png';
import anlysis from './analysis.png';
import idea from './idea.png';
import solution from './solution.png';
import tool from './tool.png';
import rocket from './rocket.png';

import Opentoolbox from '../opentool/Opentoolbox';


function Togo({ fireApp, user, userInfo,  }) {
const history = useHistory();
  return (
    <div className="togo" style={{paddingBottom:"10px"}}>      
      <div className="togoTop" style={{display:"flex"}} > 
        <Jumbotron className="jumbo" style={{background:"none",flex:"1"}}>
          <h1 style={{fontWeight:"900",color:"var(--Acolor)"}}>협업! 도전!</h1>
          <p>디자인씽킹 기반의 협업도구로 기발한 아이디어와 도전을 이끌어내 보세요.
             자신만의 도구를 만들고 더욱 편리하게 그룹별 공동작업을 시작할 수 있습니다.
          </p>
          <p>
            <button className="btn1" style={{width:"150px"}}>브레인스톰</button>
            </p>
        </Jumbotron> 
        <div className="togoback" />
      </div>
      <div className="togoMain">          
        <Card className="mainCard" style={{paddingTop:"10px"}} >
          <Card.Img variant="top" src={problem} style={{width:"8rem",height:"7rem",margin:"auto"}}/>
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>문제찾기</Card.Title>
            <Card.Text>
            다양한 관점의 관찰과 공감을 통해 문제 상황을 인식하고 해결의 <br/> 실마리를 찾을 수 있습니다. 
            </Card.Text>
            <button className="btn1">바로가기</button>

          </Card.Body>
        </Card>      
        <Card className="mainCard" style={{paddingTop:"10px"}}>
          <Card.Img variant="top"  src={anlysis} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>데이터분석</Card.Title>
            <Card.Text>
            데이터 수집/분석은 문제해결을<br/> 위한 최적의 판단을 내리는 과학적 근거가 됩니다.
            </Card.Text>
            <button className="btn1">바로가기</button>

          </Card.Body>
        </Card>
        
        <Card  className="mainCard" style={{paddingTop:"10px"}}>
          <Card.Img variant="top" src={idea} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>아이디어</Card.Title>
            <Card.Text>
            유연한 사고를 이끌어 내는 창의적 발상법을 통해 다양한 아이디어를 생각할 수 있습니다.
            </Card.Text>
            <button className="btn1" onClick={() =>history.push('/scamper')} >바로가기</button>
          </Card.Body>
        </Card>
        <Card  className="mainCard" style={{paddingTop:"10px"}}>
          <Card.Img variant="top" src={solution} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>문제해결</Card.Title>
            <Card.Text>
            아이디어를 시각·촉각으로 느낄 수 시제품 (Prototype) 을 제작하여 생각을 구체화하고 확장해 나갑니다. 
            </Card.Text>
            <button className="btn1">바로가기</button>

          </Card.Body>
        </Card>
        <Card  className="mainCard" style={{paddingTop:"10px"}}>
          <Card.Img variant="top" src={rocket} style={{width:"7rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>스타트업</Card.Title>
            <Card.Text>
            문제해결을 위해 '새로움'을 만들고 '도전'하는 '기업가정신'으로 혁신적인 사업을 창출합니다.
            </Card.Text>
            <button className="btn1">바로가기</button>

          </Card.Body>
        </Card>
        <Card  className="mainCard" style={{paddingTop:"10px"}}>
          <Card.Img variant="top" src={tool} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>도구의 인간</Card.Title>
            <Card.Text>
              급변하는 새시대에 나침반 역할을 하는 강력한 디지털 도구로 새로운 길을 개척해보세요.
            </Card.Text>
            <button className="btn1">바로가기</button>
          </Card.Body>
        </Card>
      </div>


    </div>  );}    
    export default Togo;


