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

const btnentrar = document.getElementById("agendar");
    btnentrar.addEventListener("click",  () => {
        const user = auth.currentUser;
        if (user) {
            window.location.href = "agendar.html"
        } else {
            document.getElementById("logingoogle").click();
            
        }});


//Pontos de Referência
const imagens = [
    "ReferenciaLocal.jpg",
    "ReferenciaLocal2.jpg"
];

let indice = 0;
const local = document.getElementById("local");
setInterval(()=>{
    local.style.opacity = "0";
    setTimeout(()=>{
    indice = (indice+1) % imagens.length;
    local.src = imagens[indice];
    local.style.opacity = "1";
    }, 800)
},3000)

//Cortes
const imagens2 = [
    "ReferenciaCorte.jpg",
    "ReferenciaCorte2.jpg"
];

let indice_c = 0;
const cortes = document.getElementById("cortes");
setInterval(()=>{
    cortes.style.opacity = "0";
    setTimeout(()=>{
    indice_c = (indice_c+1) % imagens2.length;
    cortes.src = imagens2[indice_c];
    cortes.style.opacity = "1";
    }, 800)
},3000)



//Produtos
const imagens3 = [
    "Produto1.png",
    "Produto2.png"
];

let indice_3 = 0;
const produtos1 = document.getElementById("produtos1");
setInterval(()=>{
    produtos1.style.opacity = "0";
    setTimeout(()=>{
    indice_3 = (indice_3+1) % imagens3.length;
    produtos1.src = imagens3[indice_3];
    produtos1.style.opacity = "1";
    }, 800)
},3000)



const imagens4 = [
    "Produto3.png",
    "Produto4.png"
];

let indice_4 = 0;
const produtos2 = document.getElementById("produtos2");
setInterval(()=>{
    produtos2.style.opacity = "0";
    setTimeout(()=>{
    indice_4 = (indice_4+1) % imagens4.length;
    produtos2.src = imagens4[indice_4];
    produtos2.style.opacity = "1";
    }, 800)
},3000)




const imagens5 = [
    "Produto5.png",
    "Produto6.png"
];

let indice_5 = 0;
const produtos3 = document.getElementById("produtos3");
setInterval(()=>{
    produtos3.style.opacity = "0";
    setTimeout(()=>{
    indice_5 = (indice_5+1) % imagens5.length;
    produtos3.src = imagens5[indice_5];
    produtos3.style.opacity = "1";
    }, 800)
},3000)





