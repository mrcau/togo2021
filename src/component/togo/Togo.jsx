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
import users from './users.png';
import myinfo from './myinfo.png';
import workout from './workout.png';
import briefcase from './briefcase.png';
import mainLogo2 from './mainLogo.png';

import Opentoolbox from '../opentool/Opentoolbox';

function Togo({ fireApp, user, userInfo, setlogoName, photo }) {
  setlogoName('');
  const history = useHistory()  ;
  return (
    <div className="samtooltogo" style={{paddingBottom:"10px"}}>      
        <div className="samtooljumbo"> <div className="mainlogo"/>  </div>
        {/* <button className="samtoolstart"  onClick={() =>{history.push('/opentool');}}>SamTool Start</button> */}
        {user.uid &&  <div className="ppp" >나의 메뉴</div> }
        {user.uid && 
        <div className="togoMain1">  
            <Card  className="mainCard1" onClick={() =>{history.push('/mypage');}} >          
              <Card.Img variant="top" src={myinfo}  className="cardImg1"  />
              <Card.Body>
                <button className="btn1 card1" >MyPage</button>
              </Card.Body>
            </Card>
            
            <Card  className="mainCard1" onClick={() =>{history.push('/mytool');}} >
              <Card.Img variant="top" src={briefcase}  className="cardImg1"  />
              <Card.Body>
                <button className="btn1 card1" >ToolBox</button>
              </Card.Body>
            </Card>

            {userInfo&&userInfo.level>9&&
            <Card  className="mainCard1" onClick={() =>{history.push('/workout');}} >
              <Card.Img variant="top" src={workout}  className="cardImg1"  />
              <Card.Body>
                <button className="btn1 card1" >Health</button>
              </Card.Body>
            </Card>
            }
             {userInfo&&userInfo.level>9&&
            <Card  className="mainCard1" onClick={() =>{history.push('/atable');}} >
              <Card.Img variant="top" src={users}  className="cardImg1"  />
              <Card.Body>
                <button className="btn1 card1" >Users</button>
              </Card.Body>
            </Card>
            }
        </div>
        }

        <div className="ppp" >실시간 쌍방향 협업도구</div>
        <div className="togoMain1">  
            <Card  className="mainCard1" onClick={() =>{history.push('/postit/:id');}} >          
              <Card.Img variant="top" src={postit}  className="cardImg1"  />
              <Card.Body>
                <button className="btn1 card1" >게시툴</button>
              </Card.Body>
            </Card>

            {user.uid && userInfo&&userInfo.level>9&&
            <Card  className="mainCard1"  onClick={() =>{history.push('/solving/:id');}} >
              <Card.Img variant="top" src={caht}  className="cardImg1" />
              <Card.Body>
                <button className="btn1 card1">코딩툴</button>
              </Card.Body>
            </Card>
            }
            <Card  className="mainCard1" onClick={() =>{history.push('/cube/:id');}}>
              <Card.Img variant="top" src={cube}  className="cardImg1" />
              <Card.Body>
                <button className="btn1 card1" >큐브툴</button>
              </Card.Body>
            </Card>
            <Card  className="mainCard1" onClick={() =>{history.push('/opentool');}} >
              <Card.Img variant="top" src={tool}  className="cardImg1"  />
              <Card.Body>
                <button className="btn1 card1" > 사용법</button>
              </Card.Body>
            </Card>
        </div>

        <div className="togoTop" style={{display:"flex"}} > 
          <div className="samjumbo2" >
            <div className="h1" style={{textAlign:"center"}}> Let's create ideas and challenges </div>
          </div> 
        </div>
            <div className="ppp" >디자인씽킹 프로젝트 
            {/* 기발한 아이디어와 도전을 이끌어내 보세요. */}
            </div>
        <div className="togoMain">          
          <Card className="mainCard"  onClick={() =>{history.push('/problem/:id');}} >
            <Card.Img variant="top" src={problem} className="cardImg"  />
            <Card.Body>
              <Card.Title style={{fontWeight:"900",textAlign:"center"}}>문제찾기</Card.Title>
              <Card.Text>
              다양한 관점의 관찰과 공감을 통해 문제 상황을 인식하고 해결의 <br/> 실마리를 찾을 수 있습니다. 
              </Card.Text>
              <button className="btn1">바로가기</button>
            </Card.Body>
          </Card>      
          {/* <Card className="mainCard"  onClick={() =>{history.push('/datastudy/:id');}}>
            <Card.Img variant="top"  src={anlysis} className="cardImg"  />
            <Card.Body>
              <Card.Title style={{fontWeight:"900",textAlign:"center"}}>데이터분석</Card.Title>
              <Card.Text>
              데이터 수집/분석은 문제해결을<br/> 위한 최적의 판단을 내리는 과학적 근거가 됩니다.
              </Card.Text>
              <button className="btn1">바로가기</button>
            </Card.Body>
          </Card>         */}
          <Card  className="mainCard" onClick={() =>{history.push('/scamper/:id');}}>
            <Card.Img variant="top" src={idea}  className="cardImg"  />
            <Card.Body>
              <Card.Title style={{fontWeight:"900",textAlign:"center"}}>아이디어</Card.Title>
              <Card.Text>
              유연한 사고를 이끌어 내는 창의적 발상법을 통해 다양한 아이디어를 생각할 수 있습니다.
              </Card.Text>
              <button className="btn1"  >바로가기</button>
            </Card.Body>
          </Card>

        {user.uid && userInfo&&userInfo.level>9&&
          <Card  className="mainCard"onClick={() =>{history.push('/startup/:id');}} >
            <Card.Img variant="top" src={rocket}  className="cardImg" />
            <Card.Body>
              <Card.Title style={{fontWeight:"900",textAlign:"center"}}>스타트업</Card.Title>
              <Card.Text>
              문제해결을 위해 '새로움'을 만들고 '도전'하는 '기업가정신'으로 혁신적인 사업을 창출합니다.
              </Card.Text>
              <button className="btn1" >바로가기</button>
            </Card.Body>
          </Card>
        }
        </div>

    </div>  );}    
    export default Togo;


