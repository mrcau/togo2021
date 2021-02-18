import firebase from 'firebase/app';
import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const roomSubstr = 6;


class firesync {  
  //회원정보 SYNC
  async onAuth(cf) {
    fireInit.auth().onAuthStateChanged(e => cf(e));
  }  
  //   룸 씽크 관리자
  async roomSync(folder, uid, cf) {
    const ref = fireInit.database().ref(`${folder}/${uid}`);
    ref.on('value', (p) => {
      const data = p.val();
      cf.f3(data);
    })
    if(!uid){ref.off();}    
    return ()=>ref.off();
  }



//  룸 이름 가져오기
roomUser(folder,roomUid,cf) {
  const ref = fireInit.database().ref(`${folder}`);
  ref.on('value', (p) => {
  const data = p.val();
    if(!data){console.log('서버데이터 없음')}
    const dataKey = Object.keys(data);
    if(dataKey.indexOf(roomUid)<0){ return }
     cf();
  })
  return ()=>ref.off('value', (p) => {cf();});
 }
  // 데이터 씽크
  dataSync(folder, roomName, cf) {
  const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    if (!roomName) { return }

    const ref1 = fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`);
    ref1.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    });
    const ref2 = fireInit.database().ref(`${folder}/${roomUid}`);
    ref2.on('value', (p) => {
      const data = p.val();
      data ? cf.f3(data) : cf.f4();
    });   
    return () => {ref1.off(); ref2.off()}

  }
  // Item 씽크
 itemSync(folder, uid, cf) {
  const ref = fireInit.database().ref(`${folder}/${uid}`);
  ref.on('value', (p) => {
    const data = p.val();
    data ? cf.f1(data) : cf.f2();
  })
  }  
    //비로그인 데이터싱크
  dataSyncB(folder, roomName, cf) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomReport = roomUid+'REPORT';
    const ref3 = fireInit.database().ref(`${folder}/${roomReport}/${roomName}`);
    ref3.on('value',(p) => {const data = p.val(); data ? cf.f1(data) : cf.f2(); })
    return ref3.off();
  }
  //보고서 테이블 싱크
async reportSync(folder,roomId, cf) {
    if (!roomId) { return }
    // const roomId = roomName.substr(0,6)+'REPORT'
    const ref1 = fireInit.database().ref(`${folder}/${roomId}`);
    ref1.on('value', (p) => {
      const data = p.val()||{};
      const Data = Object.values(data);
      data ? cf.f1(Data) : cf.f2();
    });
  }
// 비디오 메시지 싱크
videoSync(folder,roomName,spot,cf) {
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  const ref = fireInit.database().ref(`${folder}/${roomUid}/${spot}`);
  ref.on('value', (p) => { 
    const data = p.val();
    cf(data);
  });
  return ()=>ref.off();
}
}


export default firesync
