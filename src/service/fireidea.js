import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const roomSubstr = 6;

class fireidea {  
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
    reportDel(folder, uid, dataId) {
      fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
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


// TODO글  저장 
itemSave(folder, data) {
  fireInit.database().ref(`${folder}/${data.uid}/${data.dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log(e))
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
// TODO 업데이트
itemColorUp(folder, uid, dataId, color) {
  fireInit.database().ref(`${folder}/${uid}/${dataId}`)
    .update({ color: color })
}

}


export default fireidea
