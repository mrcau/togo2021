import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const roomSubstr = 6;
const roomNumer = 6;

class fireidea {  

  //룸 개수계산해서 룸 생성하기
roomGetSave(folder,newRoom, dataId,data){ console.log('roomGetSave')
  const roomUid = newRoom.substr(0,roomSubstr);
  const Uid = newRoom.substr(roomSubstr);
  let roomGetNum = 0; 
    const ref = fireInit.database().ref(`${folder}/${roomUid}`);
    ref.on('value',(p)=>{const data = p.val();
      if(data){ roomGetNum = Object.keys(data).length;}
    })
  
    if(roomGetNum < roomNumer){
      fireInit.database().ref(`${folder}/${roomUid}/${Uid}/${dataId}`).set(data)
    }else{return}  
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
  roomSave(folder,newRoom, dataId,data) {
    const roomUid = newRoom.substr(0,roomSubstr);
    const Uid = newRoom.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${Uid}/${dataId}`).set(data)
      .then(() => console.log('room생성'))
      .catch((e) => console.log(e))         
  }
 
//  룸 이름이 서버에 없으면 퇴장 있으면 입장
roomUser(folder,roomUid,cf) {
  const ref = fireInit.database().ref(`${folder}`);
  ref.on('value', (p) => {
  const data = p.val();
    if(!data){console.log('서버데이터 없음')}
    const dataKey = Object.keys(data);
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

  // 데이터 삭제
  dataDel(folder, roomName) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }
    // 리포트데이터 삭제
    reportDel(folder, uid, dataId) { console.log(folder,uid, dataId)
      fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
    }
    // 내방 삭제
    myIdeaDel(folder, uid) { console.log(folder,uid)
      fireInit.database().ref(`${folder}/${uid}`).remove();
    }
  // 보고서 저장
  reportSave(folder, roomId, roomName, data) {
    fireInit.database().ref(`${folder}/${roomId}/${roomName}`)
      .set(data)
  }
// 비디오 메시지 저장
videoSave(folder,roomName,spot,data){
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  fireInit.database().ref(`${folder}/${roomUid}/${spot}`).set(data);
}
// 비디오 메시지 싱크
async videoSync(folder,roomName,spot,cf) {
  const roomUid = roomName.substr(0,roomSubstr);
  if (!roomUid) { return }
  const ref = fireInit.database().ref(`${folder}/${roomUid}/${spot}`);
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
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`)
    .update({[goodNum]: good })
}
goodUpB(folder, roomName, goodNum,good) {  
  const roomId = roomName.substr(0,6)+'REPORT'
  fireInit.database().ref(`${folder}/${roomId}/${roomName}`)
    .update({[goodNum]: good })
}
// manUpdate 업데이트
manUp(folder, roomName, data) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`)
    .update(data)
}

// TODO글  저장 
itemSave(folder, data) {
  fireInit.database().ref(`${folder}/${data.uid}/${data.dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log(e))
}

// 로그인 TODO글  저장 
itemSave2(folder,roomName, dataId, data) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log(e))
}  

// 룸네임 없으면  저장 
itemUpdate(folder, data) {
  fireInit.database().ref(`${folder}/${data.uid}/${data.dataId}`).update(data);
}

// 룸네임 있으면 글  저장 
itemUpdate2(folder,roomName, dataId, data) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).update(data);
}  


// 룸네임 없으면 TODO 삭제
itemDel(folder, uid, dataId) {
  fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
}
//룸네임 있으면  TODO 삭제
itemDel2(folder,roomName,dataId) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).remove();
}
// 룸네임 없으면 좋아요 업데이트
itemUp(folder, uid, dataId, counter) {
  fireInit.database().ref(`${folder}/${uid}/${dataId}`)
    .update({ progress: counter })
}
// 룸네임 있으면 좋아요 업데이트 

itemUp2(folder,roomName, dataId, counter) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).update({ progress: counter })
}
// 룸네임 없으면 컬러 업데이트
itemColorUp(folder, uid, dataId, color) {
  fireInit.database().ref(`${folder}/${uid}/${dataId}`)
    .update({ color: color })
}
// 룸네임 있으면  업데이트
itemColorUp2(folder, roomName, dataId, color) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).update({ color: color })
}
}


export default fireidea
