import 'firebase/firestore'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyABOEf2bOI_J7asFeoHrGN8DRaKyhqcCQs",
    authDomain: "conant-physics.firebaseapp.com",
    projectId: "conant-physics",
    storageBucket: "conant-physics.appspot.com",
    messagingSenderId: "96788085276",
    appId: "1:96788085276:web:430e4d6de051e74361fdd9",
    measurementId: "G-X15M65HNRE"
})

const db = firebase.firestore()

db.settings({
    timestampsInSnapshots: true,
    merge: true
})

// const onSnapshot = firebaseApp.onSnapshot();

const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { db, auth, storage }