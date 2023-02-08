import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
apiKey: "AIzaSyDEBDLTRmzQrPdyiuyaS1M73vo3aLWw7rs",
authDomain: "jobportalproject0.firebaseapp.com",
projectId: "jobportalproject0",
storageBucket: "jobportalproject0.appspot.com",
messagingSenderId: "862992950814",
appId: "1:862992950814:web:ad0269d97dcbec0c84b00f",
measurementId: "G-VGEX5HMHY3"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };