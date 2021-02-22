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
roomUser(folder,roomUid,cf,off) {
  const ref = fireInit.database().ref(`${folder}`);
  ref.on('value', (p) => {
  const data = p.val();
    if(!data){console.log('서버데이터 없음')}
    const dataKey = Object.keys(data);
    if(dataKey.indexOf(roomUid)<0){ ref.off(); return }
     cf();
  })

  if(off){ref.off();}
  
  return ()=>ref.off('value', (p) => {cf();});
 }
  // 데이터 씽크
  dataSync(folder, roomName, cf,off) {
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
    
    if(off){ref1.off(); ref1.off();}
    
    return () => {ref1.off(); ref2.off()}

  }

  // Item 씽크
 itemSync(folder, uid, cf, off) {
  const ref = fireInit.database().ref(`${folder}/${uid}`);
  ref.on('value', (p) => {
    const data = p.val();
    data ? cf.f1(data) : cf.f2();
  })
  if(off){ref.off();}
  
  }  
    //비로그인 데이터싱크
  dataSyncB(folder, roomName, cf,off) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomReport = roomUid+'REPORT';
    const ref3 = fireInit.database().ref(`${folder}/${roomReport}/${roomName}`);
    ref3.on('value',(p) => {const data = p.val(); data ? cf.f1(data) : cf.f2(); })
    
    if(off){ref3.off();}
    
    return ref3.off();
  }
  //보고서 테이블 싱크
async reportSync(folder,roomId, cf,off) {
    if (!roomId) { return }
    // const roomId = roomName.substr(0,6)+'REPORT'
    const ref1 = fireInit.database().ref(`${folder}/${roomId}`);
    ref1.on('value', (p) => {
      const data = p.val()||{};
      const Data = Object.values(data);
      data ? cf.f1(Data) : cf.f2();
    });

    if(off){ref1.off();}
    
  }
// 비디오 메시지 싱크
videoSync(folder,roomName,spot,cf, off) {
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  const ref = fireInit.database().ref(`${folder}/${roomUid}/${spot}`);
  ref.on('value', (p) => { 
    const data = p.val();
    cf(data);
  });

  if(off){ref.off();}
    
  return ()=>ref.off();
}

// 큐브 싱크
cubeSync(folder, roomName, T, t, off) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    let cubeData = '';
  const ref =  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${T}`);
  ref.on('value', (p) => {     
    const data = p.val();
    if(!data){return}
    if(!data[t]){return}else{ cubeData=data[t] }
  });

  if(off){ref.off();}
    
  return cubeData
}

  // 데이터 저장
  cubeUp(folder, roomName, data) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`)
      .update(data)
  }

 // mytool  저장 
 toolSave(folder,uid, data) {
  fireInit.database().ref(`${folder}/${uid}/${data.dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log('저장실패'))
}

// mytool 씽크
toolSync(folder,uid, cf) {
  const ref = fireInit.database().ref(`${folder}/${uid}`);
  ref.on('value', (p) => {
    const data = p.val();
    data ? cf.f1(data) : cf.f2();
  })
  
  return ()=>ref.off();
}
// 룸네임 없으면 컬러 업데이트
itemColorUp(folder, uid,dataId, color) {
fireInit.database().ref(`${folder}/${uid}/${dataId}`)
  .update({ color: color })
}
 // mytool 업데이트
 opentoolUp(folder,uid, dataId, counter) {
  fireInit.database().ref(`${folder}/${uid}/${dataId}`)
    .update({ progress: counter })
}
// mytool 삭제
opentoolDel(folder,uid,dataId) {
  fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
}



}
export default firesync

