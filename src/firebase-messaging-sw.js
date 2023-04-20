importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyC1dPYtopKROtR01CORXpWc2GHvrgznc0g",
    authDomain: "refr-india.firebaseapp.com",
    projectId: "refr-india",
    storageBucket: "refr-india.appspot.com",
    messagingSenderId: "471641178783",
    appId: "1:471641178783:web:43c8aa09c584db065f18aa",
    measurementId: "G-3566SKDF47",

    databaseURL: "https://refr-india-default-rtdb.asia-southeast1.firebasedatabase.app",
    vapidKey: "BHvWoEqN0KY2YDZdfwX3_y5tRoUuALe9a9gJ9dOBLd56Lk7wFmMcLVk9Tylj7IBBoIGf62o76W5DWqlQJqxKBp4"
});

const messaging = firebase.messaging();