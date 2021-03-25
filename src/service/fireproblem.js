import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const roomSubstr = 6;
const roomNumer = 7;

class fireproblem {  
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
 
  //룸 개수계산해서 룸 생성하기
  roomGetSave(folder,newRoom,level, data){ console.log('roomGetSave')
  const roomUid = newRoom.substr(0,roomSubstr);
  const Uid = newRoom.substr(roomSubstr);
  let roomGetNum = 0; 
    const ref = fireInit.database().ref(`${folder}/${roomUid}`);
    ref.on('value',(p)=>{const data = p.val();
      if(data){ roomGetNum = Object.keys(data).length;}
    })
  
  if(roomGetNum < level){
  fireInit.database().ref(`${folder}/${roomUid}/${Uid}`).set(data)
  }else{return}  
}

roomSortNum(folder,roomUid){
  let roomGetNum = 0; 
    const ref = fireInit.database().ref(`${folder}/${roomUid}`);
    ref.on('value',(p)=>{const data = p.val();
      if(data){ roomGetNum = Object.keys(data).length;}
    })
  return roomGetNum
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

    const ref = fireInit.database().ref(`${folder}`);
    const ref2 = fireInit.database().ref(`${folder}/${roomUid}`);
    ref.on('value', (p) => { const data = p.val();
      if(!data){return}
      const dataKey = Object.keys(data);
      if(dataKey.indexOf(roomUid)<0){ ref.off(); return }    
    })

    ref2.on('value', (p) => { const data = p.val();
      if(!data){ return}
      const dataKey = Object.keys(data);
      if(dataKey.indexOf(roomNum)<0){ ref.off(); return }
      // else{
      //   fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).update(data)
      // }
    })
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).update(data)
    
  }


  // 큐브 리포트 데이터 첨부내용 업데이트
  // cubeReportUp(folder, roomName, data) { console.log('cubereport')
  //   const roomUid = roomName.substr(0,roomSubstr);
  // const roomId = roomUid+'REPORT';
  //   fireInit.database().ref(`${folder}/${roomId}/${roomName}`).update(data)
  // }

  cubeReportUp(folder, roomName, data) {console.log(folder,roomName, data)
    const roomUid = roomName.substr(0,roomSubstr);
  const roomId = roomUid+'REPORT';
    // const roomNum = roomName.substr(roomSubstr);

    const ref = fireInit.database().ref(`${folder}`);
    const ref2 = fireInit.database().ref(`${folder}/${roomId}`);
    ref.on('value', (p) => { const data = p.val();
      if(!data){return}
      const dataKey = Object.keys(data);
      if(dataKey.indexOf(roomId)<0){ ref.off(); return }    
    })

    ref2.on('value', (p) => { const data = p.val();
      if(!data){ return}
      const dataKey = Object.keys(data);
      if(dataKey.indexOf(roomName)<0){ ref.off(); return }
      // else{
      //   fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).update(data)
      // }
    })
    fireInit.database().ref(`${folder}/${roomId}/${roomName}`).update(data)
    
  }




  // 큐브 데이터 저장
 cubeDataUp(folder, roomName, T, data) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}/${T}`)
      .update(data)
  }
  // 큐브 리포트 데이터 첨부내용 업데이트
 cubeReportDataUp(folder, roomName, T, data) {
    const roomUid = roomName.substr(0,roomSubstr);
  const roomId = roomUid+'REPORT';
    fireInit.database().ref(`${folder}/${roomId}/${roomName}/${T}`)
      .update(data)
  }
  
  //리포트 데이터 업데이트
  reportUp(folder, roomId,dataId, data) {
    fireInit.database().ref(`${folder}/${roomId}/${dataId}`)
      .update(data)
  }


  // 데이터 삭제
  dataDel(folder, roomName) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }
  // 데이터 삭제2
  dataDel2(folder, roomName,cf) {
    cf();
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }
  // 큐브 데이터 삭제
  cubeDataDel(folder, roomName) {
    const roomUid = roomName.substr(0,roomSubstr);
    const roomNum = roomName.substr(roomSubstr);
    fireInit.database().ref(`${folder}/${roomUid}/${roomNum}`).remove();
  }
    // 리포트데이터 삭제
    reportDel(folder, uid, dataId) {
      fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
    }
 // 리포트데이터 삭제
 reportDel2(folder, uid, dataId,cf) {
   cf();
  fireInit.database().ref(`${folder}/${uid}/${dataId}`).remove();
}

  // 보고서 저장
 async reportSave(folder, roomId, roomName, data) {console.log('리포트세이브')
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


export default fireproblem
