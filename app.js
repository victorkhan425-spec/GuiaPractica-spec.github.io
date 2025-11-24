// -------------------- MODO OSCURO --------------------
function aplicarTema() {
    const dark = localStorage.getItem("darkmode");
    if (dark === "true") document.body.classList.add("dark");
}
aplicarTema();

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkmode", document.body.classList.contains("dark"));
}

// -------------------- CARGA DE ARTÍCULOS --------------------
async function cargarArticulos() {
    const res = await fetch("posts.json");
    const posts = await res.json();

    mostrarArticulos(posts);
    window._posts = posts;
}
cargarArticulos();

function mostrarArticulos(lista) {
    const cont = document.getElementById("lista-articulos");
    cont.innerHTML = "";

    lista.forEach(post => {
        const card = document.createElement("a");
        card.href = `post.html?id=${post.id}`;
        card.className = "tarjeta animar";
        card.innerHTML = `
            <h3>${post.titulo}</h3>
            <p class="fecha">${post.fecha}</p>
            <p>${post.descripcion}</p>
        `;
        cont.appendChild(card);
    });

    activarAnimaciones();
}

// -------------------- BÚSQUEDA INTERNA --------------------
function buscarArticulos() {
    const q = document.getElementById("search").value.toLowerCase();
    if (!window._posts) return;

    const filtrados = window._posts.filter(p =>
        p.titulo.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
    );

    mostrarArticulos(filtrados);
}

// -------------------- ANIMACIONES SUAVES --------------------
function activarAnimaciones() {
    const elementos = document.querySelectorAll(".animar");

    const obs = new IntersectionObserver((entradas) => {
        entradas.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = "1";
                e.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all .5s ease";
        obs.observe(el);
    });
}
const progressBar = document.getElementById('reading-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});
