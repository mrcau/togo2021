import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
const  firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

class firebaseApp {
  //회원가입
  async createUser(info, cf) {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(info.email, info.pass)
        .then((e) => {
          firebase.database().ref(`auth/${e.user.uid}`).set(info)
            .then(() => console.log('회원정보 저장성공'))
            .catch((e) => console.log(e))
        })
      await firebase.auth().currentUser.updateProfile({ displayName: info.name });
      cf.displayName();
      cf.closeModal();
      console.log('회원가입 완료');
    }
    catch (error) {
      alert(error);
    }
  }
  // 이메일로그인
  emailLogin(Email, Pass) {
    firebase.auth().signInWithEmailAndPassword(Email, Pass)
      .then(() => console.log('success'))
      .catch((error) => {
        alert(error);
      });
  }
  // 구글로그인
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }
  logout() {
    firebase.auth().signOut();
  }
  // 글 데이터저장 
  dataSave(data) {
    firebase.database().ref(`items/${data.uid}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }
  //회원정보 SYNC
  async onAuth(cf) {
    firebase.auth().onAuthStateChanged(e => cf(e));
  }

  // 데이터 SYNC
  itemSync(uid,cf) {
    const ref = firebase.database().ref(`items/${uid}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) :cf.f2();
    })
  }
  // 데이터 삭제
  itemDel(uid,dataId){
    firebase.database().ref(`items/${uid}/${dataId}`).remove();
  }
  // 데이터 업데이트
  itemUp(uid,dataId,counter){
    firebase.database().ref(`items/${uid}/${dataId}`)
    .update({progress:counter})
  }
  // 자료저장
  async imgUpload(uid,file,metaData,cf){
    try{
      const e = await firebase.storage().ref(`img/${uid}`).put(file,metaData)
      const downloadUrl = await e.ref.getDownloadURL();
       firebase.auth().currentUser.updateProfile({ photoURL: downloadUrl });
     cf(downloadUrl);
    }
    catch(error){
      console.log(error)
    }     
    
  }

}

export {firebaseApp}