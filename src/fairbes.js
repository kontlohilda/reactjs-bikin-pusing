import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAUwwCpA03K0bK85TeAsyQSMnbfQAW0c-E",
  authDomain: "reactjs-136d2.firebaseapp.com",
  databaseURL: "https://reactjs-136d2.firebaseio.com",
  projectId: "reactjs-136d2",
  storageBucket: "",
  messagingSenderId: "566425307637",
  appId: "1:566425307637:web:b5a2e32f176febf4"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;