// Navegación suave entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Función para manejar la apertura y cierre de modales
const modals = {
    water: document.getElementById("modalWater"),
    soil: document.getElementById("modalSoil"),
    clima: document.getElementById("modalClima")
};

const buttons = {
    water: document.querySelector('.protocolo-card a[href="#water"]'),
    soil: document.querySelector('.protocolo-card a[href="#soil"]'),
    clima: document.querySelector('.protocolo-card a[href="#clima"]')
};

const spans = document.getElementsByClassName("close");

buttons.water.onclick = function() {
    modals.water.style.display = "flex";
};

buttons.soil.onclick = function() {
    modals.soil.style.display = "flex";
};

buttons.clima.onclick = function() {
    modals.clima.style.display = "flex";
};

for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        modals.water.style.display = "none";
        modals.soil.style.display = "none";
        modals.clima.style.display = "none";
    };
}

window.onclick = function(event) {
    if (event.target == modals.water) {
        modals.water.style.display = "none";
    }
    if (event.target == modals.soil) {
        modals.soil.style.display = "none";
    }
    if (event.target == modals.clima) {
        modals.clima.style.display = "none";
    }
};


