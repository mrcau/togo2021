import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


class fireopentool {
 
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

}


export default fireopentool;
