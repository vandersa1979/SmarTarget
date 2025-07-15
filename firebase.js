// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// 1) Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmf4kImeUaJOcisVYGxhaboUWZon36o9A",
  authDomain: "smartarget-web-bd.firebaseapp.com",
  projectId: "smartarget-web-bd",
  storageBucket: "smartarget-web-bd.firebasestorage.app",
  messagingSenderId: "1045284868116",
  appId: "1:1045284868116:web:d6a49d39dd0ca1bb0fd701",
  measurementId: "G-3Q65NT8VV0"
};

// 2) Inicializa o app e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3) Funções genéricas de CRUD
export async function createItem(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

export async function readItems(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateItem(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function deleteItem(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
