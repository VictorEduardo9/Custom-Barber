import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNBbCyTBYcA40cYurcqlNbHNchnQeFXlI",
  authDomain: "custom-barber-e1923.firebaseapp.com",
  projectId: "custom-barber-e1923",
  storageBucket: "custom-barber-e1923.firebasestorage.app",
  messagingSenderId: "31135192308",
  appId: "1:31135192308:web:b18a42cf763c1f17e67aa1",
  measurementId: "G-7DK05VWZ8X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const spanUsuario = document.getElementById("usuario");


document.getElementById("logingoogle").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        document.getElementById("usuario").textContent =
            result.user.displayName;

        console.log("Nome:", result.user.displayName);
        console.log("Email:", result.user.email);

    } catch (error) {
        console.error(error);
    }
});

const btnlogout = document.getElementById("logoutgoogle");
btnlogout.addEventListener("click" , async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error("Erro no Logout:" , error);
    }

})

onAuthStateChanged(auth, (user)=>{
    if (user) {
        spanUsuario.textContent = user.displayName
        logingoogle.style.display = "none"
        btnlogout.style.display = "inline-block"
    } else {
        spanUsuario.textContent = ""
        logingoogle.style.display = "inline-block"
        btnlogout.style.display = "none"
    }
})
