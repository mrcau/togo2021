import React from 'react';
import { Jumbotron,Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './togo.css';
import problem from './problem.png';
import anlysis from './analysis.png';
import idea from './idea.png';
import solution from './solution.png';

import Opentoolbox from '../opentool/Opentoolbox';


function Togo({ fireApp, user, userInfo,  }) {
const history = useHistory();
  return (
    <div className="togo" style={{paddingBottom:"20px"}}>      
      <div className="jumbo" style={{width:"50%"}}>
        <Jumbotron>
          <h1>디자인씽킹!, 기업가정신!</h1>
          <p>컴퓨터와 인공지능 기술로 대체 될 수 없는 인간 고유의 <br/>
          창의성과 공감능력을 통해 틀에 박힌 문제가 아닌 다양한 문제를 스스로 만들어 내고 
          답을 찾을 수 능력을 길러주는 기업가정신 교육</p>
          <p><Button variant="primary">Learn more</Button></p>
        </Jumbotron> 
      </div>    
      <div className="togoMain">          
        <div className="cardWrap">
        <Card className="mainCard" style={{paddingTop:"10px"}} >
          <Card.Img variant="top" src={problem} style={{width:"8rem",height:"7rem",margin:"auto"}}/>
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>문제찾기</Card.Title>
            <Card.Text>
            다양한 관점의 관찰과 공감을 통해 문제 상황을 인식하고 해결의 <br/> 실마리를 찾을 수 있습니다. 
            </Card.Text>
            <Button variant="primary">바로가기</Button>
          </Card.Body>
        </Card>      
        <Card className="mainCard" style={{marginLeft:"2vw",paddingTop:"10px"}}>
          <Card.Img variant="top"  src={anlysis} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>데이터분석</Card.Title>
            <Card.Text>
            데이터 수집/분석은 문제해결을<br/> 위한 최적의 판단을 내리는 과학적 근거가 됩니다.
            </Card.Text>
            <Button  variant="primary">바로가기</Button>
          </Card.Body>
        </Card>
        </div>
        <div className="cardWrap" >
        <Card  className="mainCard" style={{paddingTop:"10px"}}>
          <Card.Img variant="top" src={idea} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>아이디어</Card.Title>
            <Card.Text>
            유연한 사고를 이끌어 내는 창의적 발상법을 통해 다양한 아이디어를 생각할 수 있습니다.
            </Card.Text>
            <Button variant="primary" onClick={() =>history.push('/scamper')} >바로가기</Button>
          </Card.Body>
        </Card>
        <Card  className="mainCard" style={{marginLeft:"2vw",paddingTop:"10px"}}>
          <Card.Img variant="top" src={solution} style={{width:"8rem",height:"7rem",margin:"auto"}} />
          <Card.Body>
            <Card.Title style={{fontWeight:"900"}}>문제해결</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">바로가기</Button>
          </Card.Body>
        </Card>
        </div>
      </div>
      {userInfo.level>0 &&
      <div className="cardWrap" style={{width:"90vw",margin:"auto"}} >
        <div className="mainOpenTool" style={{width:"48%",marginRight:"20px"}} >
          <Opentoolbox fireApp={fireApp} user={user} userInfo={userInfo}/>
        </div>
        <div className="mainOpenTool" style={{width:"48%",margin:"auto"}} >
          <Opentoolbox fireApp={fireApp} user={user} userInfo={userInfo}/>
        </div>
      </div>
      }

    </div>  );}export default Togo;



        // <button className="btnMenu" onClick={() => history.push('/scamper')}>스캠퍼</button>
        // <button className="btnMenu">브레인스톰</button>
        // <button className="btnMenu">트리즈</button>
        // <button className="btnMenu">5Why</button>
        // <button className="btnMenu">관찰</button>
        // <button className="btnMenu">만다라트</button>
        // <button className="btnMenu">SWOT</button>
        // <button className="btnMenu">린캔버스</button>
        // <button className="btnMenu">페르소나</button>
        // <button className="btnMenu">프로토타입</button>