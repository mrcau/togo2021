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

class firebaseApp {
  //회원가입
  async createUser(info, cf) {
    firebase.auth().createUserWithEmailAndPassword(info.email, info.pass)
      .then((e) => { 
        firebase.database().ref(`auth/${e.user.uid}`).set({...info,'user':e.user.uid})
          .then(() => {
            firebase.auth().currentUser.updateProfile({ displayName: info.name });
          })
          .then(() => {
            const newUser = firebase.auth().currentUser;
            cf(newUser)
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error))
  }

  // 이메일로그인
  async emailLogin(Email, Pass) {
    firebase.auth().signInWithEmailAndPassword(Email, Pass)
      .then(() => console.log('Login Success'))
      .catch((error) => { alert(error) })
  }
  // 구글로그인
  async login() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider);
    }
    catch (error) { console.log(error) }
  }
  //로그아웃
  async logout() {
    firebase.auth().signOut();
  }
  //회원정보 SYNC
  async onAuth(cf) {
    firebase.auth().onAuthStateChanged(e => cf(e));
  }
  // 프로필사진 자료저장
  async imgUpload(uid, file, metaData, cf) {
    try {
      const e = await firebase.storage().ref(`img/${uid}`).put(file, metaData)
      const downloadUrl = await e.ref.getDownloadURL();
      firebase.auth().currentUser.updateProfile({ photoURL: downloadUrl });
      cf(downloadUrl);
    }
    catch (error) {
      console.log(error)
    }
  }
  // TODO글  저장 
  itemSave(folder, data) {
    firebase.database().ref(`${folder}/${data.uid}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }

  // TODO 씽크
  itemSync(folder, uid, cf) {
    const ref = firebase.database().ref(`${folder}/${uid}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }
  // TODO 삭제
  itemDel(folder, uid, dataId) {
    firebase.database().ref(`${folder}/${uid}/${dataId}`).remove();
  }
  // TODO 업데이트
  itemUp(folder, uid, dataId, counter) {
    firebase.database().ref(`${folder}/${uid}/${dataId}`)
      .update({ progress: counter })
  }

//  룸 개수 가져오기
roomGet(folder,roomUid) {
  let roomGetNum = 0; 
  const ref = firebase.database().ref(`${folder}/${roomUid}`);
  ref.on('value',(p)=>{const data = p.val();
    if(data){ roomGetNum = Object.keys(data).length;}
  })  
  return roomGetNum
}

//  룸 생성 저장 
  roomSave(folder,newRoom, data) {
    const roomUid = newRoom.substr(0,roomSubstr);
    const Uid = newRoom.substr(roomSubstr);
    firebase.database().ref(`${folder}/${roomUid}/${Uid}`).set(data)
      .then(() => console.log('room생성'))
      .catch((e) => console.log(e))         
  }

  //  관리자 룸 씽크
  async roomSync(folder, roomUid, cf) {
    const ref = firebase.database().ref(`${folder}/${roomUid}`);
    ref.on('value', (p) => {
      const data = p.val();
      cf.f3(data);
    })
  }
  //  관리자 룸개수 제한 생성
  // async roomSync2(folder, roomUid, cf) {
  //   const ref = firebase.database().ref(`${folder}/${roomUid}`);
  //   ref.on('value', (p) => {
  //     const data = p.val();
  //     console.log(data)
  //     Object.keys(data).length < 7 &&  cf(data);
  //   })
  // }

  
//  룸 이름 가져오기
async roomUser(folder,roomUid,cf) {
  const ref = firebase.database().ref(`${folder}`);
  ref.on('value', (p) => {
  const data = p.val();
    if(!data){console.log('서버데이터 없음')}
    const dataKey = Object.keys(data);
    if(dataKey.indexOf(roomUid)<0){ return }
     cf();
  })
 }
  // 데이터 씽크
  dataSync(folder, roomName, cf) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    if (!roomName) { return }
    const ref1 = firebase.database().ref(`${folder}/${roomUid}/${roomNum}`);
    ref1.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    });

    const ref2 = firebase.database().ref(`${folder}/${roomUid}`);
    ref2.on('value', (p) => {
      const data = p.val();
      data ? cf.f3(data) : cf.f4();
    });
  }

  // 데이터 삭제
  dataDel(folder, roomName) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    firebase.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }

  // 데이터 저장
  dataUp(folder, roomName, data) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    firebase.database().ref(`${folder}/${roomUid}/${roomNum}`)
      .update(data)
  }

  // 보고서 저장
  reportSave(folder, roomId, roomName, data) {
    firebase.database().ref(`${folder}/${roomId}/${roomName}`)
      .set(data)
  }

  //보고서 테이블 싱크
async reportSync(folder,roomName, cf) {
    if (!roomName) { return }
    const roomId = roomName.substr(0,6)+'REPORT'
    const ref1 = firebase.database().ref(`${folder}/${roomId}`);
    ref1.on('value', (p) => {
      const data = p.val();
      const Data = Object.values(data);
      // console.log(roomId,Data)
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
async authSync(auth, uid,cf) {
  if (!auth) { return }
  const ref = firebase.database().ref(`${auth}/${uid}`);
  ref.on('value', (p) => {
    const data = p.val();
    if(data===null){return } 
    else{  
      cf(data.level)
    }
    // cf(data.level)||console.log('no.level')
   });
}
// Auth 테이블  Level 업데이트
level(folder, uid,num) {
  firebase.database().ref(`${folder}/${uid}`)
    .update({ level: num })
    firebase.auth().currentUser.updateProfile({ p: num });
}
// 데이터 삭제
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
}

// Good 업데이트
goodUp(folder, roomName, goodNum,good) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  firebase.database().ref(`${folder}/${roomUid}/${roomNum}`)
    .update({[goodNum]: good })
}

}

export default firebaseApp

 // TODO 업데이트
//  itemUp(folder, uid, dataId, counter) {
//   firebase.database().ref(`${folder}/${uid}/${dataId}`)
//     .update({ progress: counter })
// }
