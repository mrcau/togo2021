import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


class firetodo {
 
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

   // workout  저장 
   workoutSave(folder, data) {
    fireInit.database().ref(`${folder}/${data.uid}/${data.todayId}/${data.body}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }
  // workout 씽크
  workoutSync(folder, uid,todayId, cf) {
    const ref = fireInit.database().ref(`${folder}/${uid}/${todayId}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }  
  // workout 삭제
  workoutDel(folder, uid, todayId,body,dataId) { 
    fireInit.database().ref(`${folder}/${uid}/${todayId}/${body}/${dataId}`).remove();
  }
  // workout 업데이트
  workoutUp(folder, uid, todayId,body,dataId, counter) { 
    fireInit.database().ref(`${folder}/${uid}/${todayId}/${body}/${dataId}`)
      .update({ progress: counter })
  }


}

export default firetodo;

