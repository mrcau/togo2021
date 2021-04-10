import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const roomSubstr = 6;
const roomNumer = 10;

class fireidea {  

  //룸 개수계산해서 룸 생성하기
roomGetSave(folder,newRoom, dataId,data){ console.log('roomGetSave111')
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

//회원별 레벨에 따라 룸 개수계산해서 룸 생성하기
roomGetSave2(folder,newRoom, dataId,data,level){  
const roomUid = newRoom.substr(0,roomSubstr);
const Uid = newRoom.substr(roomSubstr);
let roomGetNum = 0; 
  const ref = fireInit.database().ref(`${folder}/${roomUid}`);
  ref.on('value',(p)=>{const data = p.val(); 
    // 데이터 중에서 'tok','see'를 제외한 순수 룸을 찾아 배열로 반환 found
    const data2 = Object.keys(data)
    const found = data2.filter(e => e.length > 3);
    if(data){ roomGetNum = found.length;}
  })
    if(roomGetNum <= level){  console.log(roomGetNum,level)
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
  // 데이터 삭제
  dataDel2(folder, roomName,dataId) {
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
  async reportSave(folder, roomId, roomName, data) {
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
  const ref = fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`);
    ref.update(data)
}

// TODO글  저장 
itemRefresh(folder,roomName, data) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).set(data)
}
// TODO글  저장 
itemSave(folder, data) {
  fireInit.database().ref(`${folder}/${data.uid}/${data.dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log(e))
}

// 로그인 페이지 추가  
itemSave2(folder,roomName, dataId, data) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);
  
  fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log(e))
}  

// 코딩툴 페이지 추가  레벨1 기준 페이지 2개까지 가능
itemSave3(folder,roomName, dataId, data,level) {
  const roomUid = roomName.substr(0,roomSubstr);
  const roomNum = roomName.substr(roomSubstr);

  let roomGetNum = 0; 
  const ref = fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`);
  ref.on('value',(p)=>{const data = p.val();
    if(data){ roomGetNum = Object.keys(data).length; }
  })

    if(roomGetNum <= level+2){ console.log(roomGetNum)
      fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${dataId}`).set(data)
    .then(() => console.log('글 저장성공'))
    .catch((e) => console.log(e))
    }else{return}  

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
// 리포트 일경우 관리자  글  업데이트 저장 
itemUpdate3(folder,roomId,roomName, dataId, data) {
  fireInit.database().ref(`${folder}/${roomId}/${roomName}/${dataId}`).update(data);
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

  // 프로필사진 자료저장
  async imgUpload(imgDataId,file, metaData, cf) { console.log('ideaIMG','imgDataId',imgDataId)
    try {
      const e = await fireInit.storage().ref(`imgData/${imgDataId}`).put(file, metaData)
      const downloadUrl = await e.ref.getDownloadURL();
      cf(downloadUrl);
    }
    catch (error) {
      console.log(error)
    }
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
//

export default fireidea
