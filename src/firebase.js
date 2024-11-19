import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLgqa_BKWmbH7T_2Yud-bOAic2EEJWmUw",
  authDomain: "facebook-messanger-clone-8563b.firebaseapp.com",
  projectId: "facebook-messanger-clone-8563b",
  storageBucket: "facebook-messanger-clone-8563b.appspot.com",
  messagingSenderId: "243531833176",
  appId: "1:243531833176:web:ef66f016b916b4db6d4f2d",
  measurementId: "G-G5W58W6N8W",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, collection, onSnapshot, addDoc, serverTimestamp };




