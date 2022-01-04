import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDfO9uPA8SaJDBg7ND5xTBRY-FQWcO5Ahs",
    authDomain: "hiji-project-b11d0.firebaseapp.com",
    projectId: "hiji-project-b11d0",
    storageBucket: "hiji-project-b11d0.appspot.com",
    messagingSenderId: "536384322866",
    appId: "1:536384322866:web:53512b6d4d2469b6f26b2b"
  };

  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


export { storage };
