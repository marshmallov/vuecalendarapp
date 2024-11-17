import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEOQgNUsoxBxxVh1h5-mFWEQ2w_sVcgls",
    authDomain: "vuecalendarapp-e04b1.firebaseapp.com",
    projectId: "vuecalendarapp-e04b1",
    storageBucket: "vuecalendarapp-e04b1.firebasestorage.app",
    messagingSenderId: "214673450367",
    appId: "1:214673450367:web:ada133550465ce0ded664a"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = createApp(App);

// Provide the store to the entire application
// app.provide('store', store);
app.provide('db', db);
app.use(router)
app.mount('#app');