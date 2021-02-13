import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASURE,

  apiKey: "AIzaSyCBPpFDf-hl-jFikjFq-WV439n74JBnWeA",
  authDomain: "togo-9d17b.firebaseapp.com",
  databaseURL: "https://togo-9d17b-default-rtdb.firebaseio.com",
  projectId: "togo-9d17b",
  storageBucket: "togo-9d17b.appspot.com",
  messagingSenderId: "95500958643",
  appId: "1:95500958643:web:0b4d456c52baebb147a9c6",
  measurementId: "G-H72GT2QL69"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const roomSubstr = 6;

class fireReportApp { 
  
  //비로그인 데이터싱크
  dataSyncB(folder, roomName, cf) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomReport = roomUid+'REPORT';
    const ref3 = firebase.database().ref(`${folder}/${roomReport}/${roomName}`);
    ref3.on('value',(p) => {const data = p.val(); data ? cf.f1(data) : cf.f2(); })
    return ref3.off();
  }
  // 데이터 삭제
  dataDel(folder, roomName) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    firebase.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }
    // 리포트데이터 삭제
    reportDel(folder, uid, dataId) {
      firebase.database().ref(`${folder}/${uid}/${dataId}`).remove();
    }

 
  // 보고서 저장
  reportSave(folder, roomId, roomName, data) {
    firebase.database().ref(`${folder}/${roomId}/${roomName}`)
      .set(data)
  }

  //보고서 테이블 싱크
async reportSync(folder,roomId, cf) {
    if (!roomId) { return }
    // const roomId = roomName.substr(0,6)+'REPORT'
    const ref1 = firebase.database().ref(`${folder}/${roomId}`);
    ref1.on('value', (p) => {
      const data = p.val()||{};
      const Data = Object.values(data);
      data ? cf.f1(Data) : cf.f2();
    });
  }
  //Auth 테이블 싱크
async authdataSync(auth, cf) {
    if (!auth) { return }
    const ref1 = firebase.database().ref(`${auth}`);
    ref1.on('value', (p) => {
      const data = p.val();
      const authData = Object.values(data);
      data ? cf.f1(authData) : cf.f2();
    });
  }
    //Auth 테이블 싱크 for left menu
authSync(auth, uid,cf) {
  if (!auth) { return }
  const ref = firebase.database().ref(`${auth}/${uid}`);
  ref.on('value', (p) => {
    const data = p.val();
    if(data===null){return } 
    else{  
      cf(data)
    }
   });
}
// Auth 테이블  Level 업데이트
level(folder, uid,num) {
  firebase.database().ref(`${folder}/${uid}`)
    .update({ level: num })
    firebase.auth().currentUser.updateProfile({ p: num });
}
// 프로필 업데이트
profileUp(folder, uid,data) {
  firebase.database().ref(`${folder}/${uid}`).update(data);
  firebase.auth().currentUser.updateProfile(data);
}
// 데이터 삭제 auth/${e.user.uid}
authDel(folder, uid) {
  firebase.database().ref(`${folder}/${uid}`).remove();
}
// 비디오 메시지 저장
videoSave(folder,roomName,spot,data){
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  firebase.database().ref(`${folder}/${roomUid}/${spot}`).set(data);
}
// 비디오 메시지 싱크
async videoSync(folder,roomName,spot,cf) {
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  const ref = firebase.database().ref(`${folder}/${roomUid}/${spot}`);
  ref.on('value', (p) => { 
    const data = p.val();
    cf(data);
  });
  return ()=>ref.off();
}

// Good 업데이트
goodUp(folder, roomName, goodNum,good) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  firebase.database().ref(`${folder}/${roomUid}/${roomNum}`)
    .update({[goodNum]: good })
}

goodUpB(folder, roomName, goodNum,good) {  
  const roomId = roomName.substr(0,6)+'REPORT'
  firebase.database().ref(`${folder}/${roomId}/${roomName}`)
    .update({[goodNum]: good })
}

}


export default fireReportApp

 // TODO 업데이트
//  itemUp(folder, uid, dataId, counter) {
//   firebase.database().ref(`${folder}/${uid}/${dataId}`)
//     .update({ progress: counter })
// }
