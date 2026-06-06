import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, query, 
         where, getDocs, deleteDoc, doc, Timestamp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
const db = getFirestore(app);
let usuarioAtual = null;

const provider = new GoogleAuthProvider();

const spanUsuario = document.getElementById("usuario");



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
        usuarioAtual = user;
        spanUsuario.textContent = user.displayName;
        carregaragendamentos();
        btnlogout.style.display = "inline-block"
    } else {
        window.location.href = "index.html"
    }
})

document.getElementById("btnagendar").addEventListener("click" , async () => {
    if (!usuarioAtual) return;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horariosel").value;
    const conf = document.getElementById("confirmacao");

    if(!servico || !data || !horario){
        conf.textContent = "⚠️ Preencha todos os campos.";
        conf.style.color = "#fbfdd8";
        return;
    }
    try {
        await addDoc(collection(db, "agendamentos"),{
            uid: usuarioAtual.uid,
            nome: usuarioAtual.displayName,
            email: usuarioAtual.email,
            servico,
            data,
            horario,
            criadoem: Timestamp.now()
        });
    conf.innerHTML = `✅ Agendado!<br>Serviço: ${servico}<br>Data: ${data}<br>Horário: ${horario}`;
    conf.style.color = "#d8f7db";

    document.getElementById("servico").value="";
    document.getElementById("data").value="";
    document.getElementById("horariosel").value="";
    carregaragendamentos();
    } catch (error) {
        conf.textContent = "❌ Erro ao agendar. Tente novamente.";
        console.error(error);
    }

})

async function carregaragendamentos() {
    const lista = document.getElementById("listaagendamentos");
    lista.innerHTML = "Carregando...";
    try {
        const q = query(
            collection(db, "agendamentos"),
            where("uid" , "==" , usuarioAtual.uid)
        );
        const snapshot = await getDocs(q)
        if (snapshot.empty) {
            lista.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
            return;
        }
        lista.innerHTML = "";
        snapshot.forEach((documento => {
            const d = documento.data();
            const card = document.createElement("div");
            card.className = "card-agendamento"
            card.innerHTML = `
            <p>📅 <strong>${d.data}</strong> às <strong>${d.horario}</strong></p>
            <button class="btncancelar" data-id="${documento.id}">Cancelar</button>
            `;
            lista.appendChild(card);
        }));

        document.querySelectorAll(".btncancelar").forEach((btn) => {
            btn.addEventListener("click" , async () => {
                await deleteDoc(doc(db, "agendamentos" , btn.dataset.id));
                carregaragendamentos();
            });
        });
    } catch (error) {
        lista.innerHTML = "<p>Erro ao carregar agendamentos.</p>";
        console.error(error);
    }
}

