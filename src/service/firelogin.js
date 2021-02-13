import firebase from 'firebase/app';
import fireInit from './fire';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

class firelogin {
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
  // 프로필 업데이트
  profileUp(folder, uid,data) {
    fireInit.database().ref(`${folder}/${uid}`).update(data);
    fireInit.auth().currentUser.updateProfile(data);
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
// 데이터 삭제 auth/${e.user.uid}
authDel(folder, uid) {
fireInit.database().ref(`${folder}/${uid}`).remove();
}

}

export default firelogin
