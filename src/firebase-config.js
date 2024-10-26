// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpk8e_Kfm0rm4oyU2vlUG0cbMqtnyrCrE',
  authDomain: 'property-rental-1.firebaseapp.com',
  projectId: 'property-rental-1',
  storageBucket: 'property-rental-1.appspot.com',
  messagingSenderId: '133514511510',
  appId: '1:133514511510:web:acc24482e3750f2614eeb7',
  measurementId: 'G-R5RFNLNSR2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore(app)
