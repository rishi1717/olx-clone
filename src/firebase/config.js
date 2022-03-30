import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCpHG3SLw6SBqwUZ-80V10YvucFfYOwJpM",
  authDomain: "olx-clone-f25f1.firebaseapp.com",
  projectId: "olx-clone-f25f1",
  storageBucket: "olx-clone-f25f1.appspot.com",
  messagingSenderId: "73527993942",
  appId: "1:73527993942:web:8d4faabbf4148e0a857df7",
  measurementId: "G-95628V3SVH"
}

export default firebase.initializeApp(firebaseConfig)