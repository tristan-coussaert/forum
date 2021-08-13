import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDR_MKerxglvR-wAIbV5ZNP40wKgljMVVs",
    authDomain: "forum-7f98c.firebaseapp.com",
    projectId: "forum-7f98c",
    storageBucket: "forum-7f98c.appspot.com",
    messagingSenderId: "452779583750",
    appId: "1:452779583750:web:adbed6483cb26fe4be9687"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};