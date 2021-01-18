import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE,

  // apiKey: "AIzaSyCBPpFDf-hl-jFikjFq-WV439n74JBnWeA",
  authDomain: "togo-9d17b.firebaseapp.com",
  // databaseURL: "https://togo-9d17b-default-rtdb.firebaseio.com",
  // projectId: "togo-9d17b",
  // storageBucket: "togo-9d17b.appspot.com",
  // messagingSenderId: "95500958643",
  // appId: "1:95500958643:web:0b4d456c52baebb147a9c6",
  // measurementId: "G-H72GT2QL69"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

class firebaseApp {

  //회원가입
  async createUser(info, cf) {
    firebase.auth().createUserWithEmailAndPassword(info.email, info.pass)
      .then((e) => {
        firebase.database().ref(`auth/${e.user.uid}`).set(info)
          .then(() => {
            firebase.auth().currentUser.updateProfile({ displayName: info.name });
          })
          .then(() => {
            const newUser = firebase.auth().currentUser;
            cf(newUser)
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error))
  }

  // 이메일로그인
  async emailLogin(Email, Pass) {
    firebase.auth().signInWithEmailAndPassword(Email, Pass)
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
    firebase.auth().signOut();
  }
  //회원정보 SYNC
  async onAuth(cf) {
    firebase.auth().onAuthStateChanged(e => cf(e));
  }
  // 프로필사진 자료저장
  async imgUpload(uid, file, metaData, cf) {
    try {
      const e = await firebase.storage().ref(`img/${uid}`).put(file, metaData)
      const downloadUrl = await e.ref.getDownloadURL();
      firebase.auth().currentUser.updateProfile({ photoURL: downloadUrl });
      cf(downloadUrl);
    }
    catch (error) {
      console.log(error)
    }
  }
  // TODO글  저장 
  itemSave(folder,data) {
    firebase.database().ref(`${folder}/${data.uid}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }

  // TODO 씽크
  itemSync(folder,uid, cf) {
    const ref = firebase.database().ref(`${folder}/${uid}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }
  // TODO 삭제
  itemDel(folder,uid, dataId) {
    firebase.database().ref(`${folder}/${uid}/${dataId}`).remove();
  }
  // TODO 업데이트
  itemUp(folder,uid, dataId, counter) {
    firebase.database().ref(`${folder}/${uid}/${dataId}`)
      .update({ progress: counter })
  }

  //  방 생성 저장 
  dataSave(folder,roomNum,data) {
    firebase.database().ref(`${folder}/${roomNum}`).set(data)
      .then(() => console.log('room생성'))
      .catch((e) => console.log(e))
  }

  // 데이터 씽크
  dataSync(folder,roomNum, cf) {
    if(!roomNum){return}
    const ref = firebase.database().ref(`${folder}/${roomNum}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.f1(data) : cf.f2();
    })
  }
  // 데이터 ROOM 번호
 async roomSync(folder, cf) {
    const ref = firebase.database().ref(`${folder}`);
    ref.on('value', (p) => {      
      const data = p.val();
      cf(data); 
     })
  }
  // 데이터 삭제
  dataDel(folder,roomNum) {
    firebase.database().ref(`${folder}/${roomNum}`).remove();
  }
  // 데이터 저장
  dataUp(folder,roomNum, data) {
    firebase.database().ref(`${folder}/${roomNum}`)
      .update(data)
  }
  


}

export default firebaseApp