// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG-wFKOW7EtmJARtOkRlvlvy_zdxwatT0",
  authDomain: "deji-firegram.firebaseapp.com",
  databaseURL: "https://deji-firegram.firebaseio.com",
  projectId: "deji-firegram",
  storageBucket: "deji-firegram.appspot.com",
  messagingSenderId: "402064162401",
  appId: "1:402064162401:web:9a4ddb82c645c536c33420",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
