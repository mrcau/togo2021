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
import postit from './post-it.png';
import caht from './chat.png';
import cube from './cube.png';
import mainLogo from './mainLogo.png';

import Opentoolbox from '../opentool/Opentoolbox';


function Togo({ fireApp, user, userInfo, setlogoName }) {
  setlogoName('');
const history = useHistory();
  return (
    <div className="togo" style={{paddingBottom:"10px"}}>      
       {/* <Jumbotron className="jumbo1" style={{background:"none",flex:"1",height:"100px"}}>
          <h1 style={{fontWeight:"900",color:"var(--Acolor)"}}>샘툴</h1>
                 
        </Jumbotron>  */}
        <div className="jumbo"> <div className="mainlogo"/>  </div>
        <h2 style={{fontWeight:"900",color:"var(--Acolor)"}} > 온라인 쌍방향 협업도구</h2>
        <div className="togoMain1">  

        <Card  className="mainCard1" onClick={() =>{history.push('/postit/:id');}} >
          <Card.Img variant="top" src={postit}  className="cardImg1"  />
          <Card.Body>
            {/* <Card.Title style={{fontWeight:"900"}}>아이디어</Card.Title>
            <Card.Text>
            유연한 사고를 이끌어 내는
            </Card.Text> */}
            <button className="btn1 card1" >포스트잇</button>
          </Card.Body>
        </Card>
        <Card  className="mainCard1"  onClick={() =>{history.push('/solving/:id');}} >
          <Card.Img variant="top" src={caht}  className="cardImg1" />
          <Card.Body>
            {/* <Card.Title style={{fontWeight:"900"}}>문제해결</Card.Title>
            <Card.Text>
            아이디어를 시각·촉각으로 느낄 수 . 
            </Card.Text> */}
            <button className="btn1 card1">실시간톡</button>

          </Card.Body>
        </Card>
        <Card  className="mainCard1" onClick={() =>{history.push('/cube/:id');}}>
          <Card.Img variant="top" src={cube}  className="cardImg1" />
          <Card.Body>
            {/* <Card.Title style={{fontWeight:"900"}}>스타트업</Card.Title>
            <Card.Text>
            문제해결을 위해업을 창출합니다.
            </Card.Text> */}
            <button className="btn1 card1" >큐브씽크</button>

          </Card.Body>
        </Card>
        <Card  className="mainCard1" onClick={() =>{history.push('/opentool');}} >
          <Card.Img variant="top" src={tool}  className="cardImg1"  />
          <Card.Body>
            {/* <Card.Title style={{fontWeight:"900"}}>도구의 인간</Card.Title>
            <Card.Text>
              급변하는 새시대에을 개척해보세요.
            </Card.Text> */}
            <button className="btn1 card1" >공유도구</button>
          </Card.Body>
        </Card>
      </div>





      <div className="togoTop" style={{display:"flex"}} > 
        <div className="jumbo2" >
          <div className="h1" >협업! 도전!</div>
          <div className="ppp" style={{padding:"0"}}>디자인씽킹 프로젝트로 기발한 아이디어와 도전을 이끌어내 보세요.</div>
        </div> 
      </div>
      <div className="togoMain">          
        <Card className="mainCard"  onClick={() =>{history.push('/problem/:id');}} >
          <Card.Img variant="top" src={problem} className="cardImg"  />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>문제찾기</Card.Title>
            <Card.Text>
            다양한 관점의 관찰과 공감을 통해 문제 상황을 인식하고 해결의 <br/> 실마리를 찾을 수 있습니다. 
            </Card.Text>
            <button className="btn1">바로가기</button>

          </Card.Body>
        </Card>      
        <Card className="mainCard"  onClick={() =>{history.push('/datastudy/:id');}}>
          <Card.Img variant="top"  src={anlysis} className="cardImg"  />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>데이터분석</Card.Title>
            <Card.Text>
            데이터 수집/분석은 문제해결을<br/> 위한 최적의 판단을 내리는 과학적 근거가 됩니다.
            </Card.Text>
            <button className="btn1">바로가기</button>

          </Card.Body>
        </Card>
        
        <Card  className="mainCard" onClick={() =>{history.push('/scamper/:id');}}>
          <Card.Img variant="top" src={idea}  className="cardImg"  />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>아이디어</Card.Title>
            <Card.Text>
            유연한 사고를 이끌어 내는 창의적 발상법을 통해 다양한 아이디어를 생각할 수 있습니다.
            </Card.Text>
            <button className="btn1"  >바로가기</button>
          </Card.Body>
        </Card>
        {/* <Card  className="mainCard" >
          <Card.Img variant="top" src={solution}  className="cardImg" />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>문제해결</Card.Title>
            <Card.Text>
            아이디어를 시각·촉각으로 느낄 수 시제품 (Prototype) 을 제작하여 생각을 구체화하고 확장해 나갑니다. 
            </Card.Text>
            <button className="btn1" onClick={() =>history.push('/solving')} >바로가기</button>

          </Card.Body>
        </Card> */}
        <Card  className="mainCard"onClick={() =>{history.push('/startup/:id');}} >
          <Card.Img variant="top" src={rocket}  className="cardImg" />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>스타트업</Card.Title>
            <Card.Text>
            문제해결을 위해 '새로움'을 만들고 '도전'하는 '기업가정신'으로 혁신적인 사업을 창출합니다.
            </Card.Text>
            <button className="btn1" >바로가기</button>

          </Card.Body>
        </Card>
        {/* <Card  className="mainCard" >
          <Card.Img variant="top" src={tool}  className="cardImg"  />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>도구의 인간</Card.Title>
            <Card.Text>
              급변하는 새시대에 나침반 역할을 하는 강력한 디지털 도구로 새로운 길을 개척해보세요.
            </Card.Text>
            <button className="btn1" onClick={() =>history.push('/opentool')}>바로가기</button>
          </Card.Body>
        </Card> */}
      </div>


    </div>  );}    
    export default Togo;


