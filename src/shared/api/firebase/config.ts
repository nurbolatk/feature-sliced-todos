// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

console.log("Firebase setup")

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIxpmfXbd5oaSvlyFjw9XuNixBUcUkb4Y",
    authDomain: "featureslicedtodos.firebaseapp.com",
    projectId: "featureslicedtodos",
    storageBucket: "featureslicedtodos.appspot.com",
    messagingSenderId: "606963780963",
    appId: "1:606963780963:web:73704882bdb8fc2c6f1756"
};

// Initialize Firebase
initializeApp(firebaseConfig);