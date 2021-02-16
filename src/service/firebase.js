import firebase from 'firebase/app';
import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const roomSubstr = 6;

class firebaseApp {
  //회원가입
  async createUser(info, cf) {
    fireInit.auth().createUserWithEmailAndPassword(info.email, info.pass)
      .then((e) => { 
        fireInit.database().ref(`auth/${e.user.uid}`).set({...info,'user':e.user.uid})
          .then(() => {
            fireInit.auth().currentUser.updateProfile({ displayName: info.name });
          })
          .then(() => {
            const newUser = fireInit.auth().currentUser;
            cf(newUser)
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error))
  }

  // 이메일로그인
  async emailLogin(Email, Pass) {
    fireInit.auth().signInWithEmailAndPassword(Email, Pass)
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
    fireInit.auth().signOut();
  }
  //회원정보 SYNC
  async onAuth(cf) {
    fireInit.auth().onAuthStateChanged(e => cf(e));
  }
  // 프로필사진 자료저장
  async imgUpload(uid, file, metaData, cf) {
    try {
      const e = await fireInit.storage().ref(`img/${uid}`).put(file, metaData)
      const downloadUrl = await e.ref.getDownloadURL();
      fireInit.auth().currentUser.updateProfile({ photoURL: downloadUrl });
      cf(downloadUrl);
    }
    catch (error) {
      console.log(error)
    }
  }
  // OpenTool  저장 
  opentoolSave(folder, data) {
    fireInit.database().ref(`${folder}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }

  // OpenTool 씽크
  opentoolSync(folder, cf) {
    const ref = fireInit.database().ref(`${folder}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }
   // OpenTool 업데이트
   opentoolUp(folder, dataId, counter) {
    fireInit.database().ref(`${folder}/${dataId}`)
      .update({ progress: counter })
  }
  // OpenTool 삭제
  opentoolDel(folder,dataId) {
    fireInit.database().ref(`${folder}/${dataId}`).remove();
  }

  // TODO글  저장 
  itemSave(folder, data) {
    fireInit.database().ref(`${folder}/${data.uid}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }
  // TODO 씽크
  itemSync(folder, uid, cf) {
    const ref = fireInit.database().ref(`${folder}/${uid}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }  
  // TODO 삭제
  itemDel(folder, uid, dataId) {
    fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
  }
  // TODO 업데이트
  itemUp(folder, uid, dataId, counter) {
    fireInit.database().ref(`${folder}/${uid}/${dataId}`)
      .update({ progress: counter })
  }

//  룸 개수 가져오기
roomGet(folder,roomUid) {
  let roomGetNum = 0; 
  const ref = fireInit.database().ref(`${folder}/${roomUid}`);
  ref.on('value',(p)=>{const data = p.val();
    if(data){ roomGetNum = Object.keys(data).length;}
  })  
  return roomGetNum
}

//  룸 생성 저장 
  roomSave(folder,newRoom, data) {
    const roomUid = newRoom.substr(0,roomSubstr);
    const Uid = newRoom.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${Uid}`).set(data)
      .then(() => console.log('room생성'))
      .catch((e) => console.log(e))         
  }

  //   룸 씽크 관리자
  async roomSync(folder, uid, cf) {
    // const roomUid = uid.substr(0, roomSubstr);
    // if(!uid){return}
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
    // console.log('dataKey',dataKey.indexOf(roomUid))
    if(dataKey.indexOf(roomUid)<0){ return }
     cf();
  })

  return ref.off('value', (p) => {cf();});
 }
  // 데이터 저장
  dataUp(folder, roomName, data) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`)
      .update(data)
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
    // if(cf){ref1.off(); ref2.off();}
    
    return () => {ref1.off(); ref2.off()}
  }
  
  //비로그인 데이터싱크
  dataSyncB(folder, roomName, cf) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomReport = roomUid+'REPORT';
    const ref3 = fireInit.database().ref(`${folder}/${roomReport}/${roomName}`);
    ref3.on('value',(p) => {const data = p.val(); data ? cf.f1(data) : cf.f2(); })
    return ref3.off();
  }
  // 데이터 삭제
  dataDel(folder, roomName) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }
    // 리포트데이터 삭제
    reportDel(folder, uid, dataId) {
      fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
    }

 

  // 보고서 저장
  reportSave(folder, roomId, roomName, data) {
    fireInit.database().ref(`${folder}/${roomId}/${roomName}`)
      .set(data)
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
  //Auth 테이블 싱크
async authdataSync(auth, cf) {
    if (!auth) { return }
    const ref1 = fireInit.database().ref(`${auth}`);
    ref1.on('value', (p) => {
      const data = p.val();
      const authData = Object.values(data);
      data ? cf.f1(authData) : cf.f2();
    });
  }
    //Auth 테이블 싱크 for left menu
authSync(auth, uid,cf) {
  if (!auth) { return }
  const ref = fireInit.database().ref(`${auth}/${uid}`);
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
  fireInit.database().ref(`${folder}/${uid}`)
    .update({ level: num })
    fireInit.auth().currentUser.updateProfile({ p: num });
}
// 프로필 업데이트
profileUp(folder, uid,data) {
  fireInit.database().ref(`${folder}/${uid}`).update(data);
  fireInit.auth().currentUser.updateProfile(data);
}
// 데이터 삭제 auth/${e.user.uid}
authDel(folder, uid) {
  fireInit.database().ref(`${folder}/${uid}`).remove();
}
// 비디오 메시지 저장
videoSave(folder,roomName,spot,data){
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  fireInit.database().ref(`${folder}/${roomUid}/${spot}`).set(data);
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
  return () => {ref.off();}
}

// Good 업데이트
goodUp(folder, roomName, goodNum,good) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`)
    .update({[goodNum]: good })
}

goodUpB(folder, roomName, goodNum,good) {  
  const roomId = roomName.substr(0,6)+'REPORT'
  fireInit.database().ref(`${folder}/${roomId}/${roomName}`)
    .update({[goodNum]: good })
}

}


export default firebaseApp

 // TODO 업데이트
//  itemUp(folder, uid, dataId, counter) {
//   fireInit.database().ref(`${folder}/${uid}/${dataId}`)
//     .update({ progress: counter })
// }
