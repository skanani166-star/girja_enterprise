import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUVBA3HOMnCteLBDYwUfo3WqIJhIQB9xM",
  authDomain: "girja-enterprise.firebaseapp.com",
  projectId: "girja-enterprise",
  storageBucket: "girja-enterprise.firebasestorage.app",
  messagingSenderId: "782313115590",
  appId: "1:782313115590:web:e17c514c83817fc8b56cc7",
};

async function check() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("=== FIRESTORE CATEGORIES ===");
    const catSnap = await getDocs(collection(db, "categories"));
    console.log("Count:", catSnap.docs.length);
    catSnap.docs.forEach((doc) => console.log(doc.id, "=>", doc.data()));

    console.log("\n=== FIRESTORE PRODUCTS ===");
    const prodSnap = await getDocs(collection(db, "products"));
    console.log("Count:", prodSnap.docs.length);
    prodSnap.docs.forEach((doc) => console.log(doc.id, "=>", doc.data()));

    process.exit(0);
  } catch (err) {
    console.error("FIRESTORE CHECK ERROR:", err);
    process.exit(1);
  }
}

check();
