import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore, 
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
  // Paste your firebase config here
  apiKey: "AIzaSyA63HRfs6S5AcpgVr_3r9fjmJLqWkXLH4w",
  authDomain: "fir-app-tuto-f1660.firebaseapp.com",
  projectId: "fir-app-tuto-f1660",
  storageBucket: "fir-app-tuto-f1660.appspot.com",
  messagingSenderId: "254963524834",
  appId: "1:254963524834:web:c37bff96dac33fe0b22abb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


/* Consultas a FIREBASE */
export const savePost = (title, content, url, datetime) => {
  addDoc(collection(db, "posts"), { title, content, url, datetime})
};

export const deletePost = (id) => deleteDoc(doc(db, "posts", id));

export const getPost = (id) => getDoc(doc(db, "posts", id));

export const updatePost = (id, newFields) =>
  updateDoc(doc(db, "posts", id), newFields);

export const getAdmin = (id) => getDoc(doc(db, "admin", id)); 