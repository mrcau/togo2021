import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


class firetodo {
 //회원정보 SYNC
 async onAuth(cf) {
  fireInit.auth().onAuthStateChanged(e => cf(e));
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

   // workout  저장 
  //  workoutSave(folder, data) {
  //   fireInit.database().ref(`${folder}/${data.uid}`).set(data)
  //     .then(() => console.log('글 저장성공'))
  //     .catch((e) => console.log(e))
  // }
  // workout 씽크
  workoutSync(folder, uid,todayId, cf) {
    const ref = fireInit.database().ref(`${folder}/${uid}/${todayId}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }  
  totalworkoutSync(folder, uid,cf) {
    const ref = fireInit.database().ref(`${folder}/${uid}/totalWokout`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f3(data) : cf.f4();
    })
  }  
  mentoworkoutSync(folder, mentoKey,cf) {
    const ref = fireInit.database().ref(`${folder}/${mentoKey}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f5(data) : cf.f6();
    })
  }  

  workoutSave(folder, data) {
   fireInit.database().ref(`${folder}/${data.uid}/${data.todayId}/${data.body}/${data.gameSelect}`).set(data)
     .then(() => console.log('글 저장성공'))
     .catch((e) => console.log(e))
 }

 addyouhyung(folder,uid,data) {
   // eslint-disable-next-line no-useless-computed-key
   fireInit.database().ref(`${folder}/${uid}/${data}`).update({['부위']:'data'})
 }
 addbuwi(folder,uid,youhyung,data) {
   // eslint-disable-next-line no-useless-computed-key
   fireInit.database().ref(`${folder}/${uid}/${youhyung}/${data}`).update({['부위']:'data'})
 }
 addjongmock(folder,uid,youhyung,buwi,data) {
   // eslint-disable-next-line no-useless-computed-key
   fireInit.database().ref(`${folder}/${uid}/${youhyung}/${buwi}`).update({[data]:'data'})
 }
 addvideoLink(folder,uid,youhyung,buwi,jongmock,data) {
   // eslint-disable-next-line no-useless-computed-key
   fireInit.database().ref(`${folder}/${uid}/${youhyung}/${buwi}`).update({[jongmock]:data})
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
    // workout 업데이트

  workouttotal(folder, uid,todayId, gameSelect,repeat) { 
      fireInit.database().ref(`${folder}/${uid}/totalWokout/${todayId}`)
        .update({ [gameSelect]: repeat })
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
// mytool 씽크
toolSync(folder,uid,selectFolder, cf) {
  const ref = fireInit.database().ref(`${folder}/${uid}/${selectFolder}`);
  ref.on('value', (p) => {
    const data = p.val();
    data ? cf.f1(data) : cf.f2();
  })
  
  return ()=>ref.off();
}
}

export default firetodo;

