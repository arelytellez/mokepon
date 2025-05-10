let vidasJugador = 3;
let vidasEnemigo = 3;
let juegoTerminado = false;
let nombreMascotaJugador = '';
let nombreMascotaEnemigo = '';

function iniciarJuego() {
    const botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    // Botones de ataque
    document.getElementById('Fuego').addEventListener('click', () => ataqueJugador('FUEGO'));
    document.getElementById('Agua').addEventListener('click', () => ataqueJugador('AGUA'));
    document.getElementById('Tierra').addEventListener('click', () => ataqueJugador('TIERRA'));
}

function seleccionarMascotaJugador() {
    const inputHipodoge = document.getElementById('Hipodoge');
    const inputCapipepo = document.getElementById('Capipepo');
    const inputRatigueya = document.getElementById('Ratigueya');
    const spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputHipodoge.checked) {
        nombreMascotaJugador = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        nombreMascotaJugador = 'Capipepo';
    } else if (inputRatigueya.checked) {
        nombreMascotaJugador = 'Ratigueya';
    } else {
        alert('Selecciona una mascota antes de continuar');
        return;
    }

    spanMascotaJugador.textContent = nombreMascotaJugador;
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    const mascotas = ['Hipodoge', 'Capipepo', 'Ratigueya'];
    const aleatorio = Math.floor(Math.random() * mascotas.length);
    nombreMascotaEnemigo = mascotas[aleatorio];
    spanMascotaEnemigo.textContent = nombreMascotaEnemigo;
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueJugador(ataque) {
    if (juegoTerminado) return;
    let ataqueEnemigo = ataqueAleatorioEnemigo();
    combate(ataque, ataqueEnemigo);
}

function ataqueAleatorioEnemigo() {
    let numero = aleatorio(1, 3);
    if (numero === 1) return 'FUEGO';
    if (numero === 2) return 'AGUA';
    return 'TIERRA';
}

function combate(ataqueJugador, ataqueEnemigo) {
    if (juegoTerminado) return;

    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("EMPATE", ataqueJugador, ataqueEnemigo);
    } else if (
        (ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA') ||
        (ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO') ||
        (ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA')
    ) {
        crearMensaje("GANASTE", ataqueJugador, ataqueEnemigo);
        vidasEnemigo--;
        if (vidasEnemigo < 0) vidasEnemigo = 0;
        spanVidasEnemigo.textContent = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE", ataqueJugador, ataqueEnemigo);
        vidasJugador--;
        if (vidasJugador < 0) vidasJugador = 0;
        spanVidasJugador.textContent = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("🎉 Felicitaciones, GANASTE el juego 🎉");
        juegoTerminado = true;
    } else if (vidasJugador === 0) {
        crearMensajeFinal("😞 Lo siento, PERDISTE el juego 😞");
        juegoTerminado = true;
    }
}

function crearMensaje(resultado, ataqueJugador, ataqueEnemigo) {
    const sectionMensajes = document.getElementById('mensajes');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = `${nombreMascotaJugador} atacó con ${ataqueJugador}, ${nombreMascotaEnemigo} atacó con ${ataqueEnemigo} - <strong>${resultado}</strong>`;
    sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
    const sectionMensajes = document.getElementById('mensajes');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = `<strong>${resultadoFinal}</strong>`;
    sectionMensajes.appendChild(parrafo);
}

window.addEventListener('load', iniciarJuego);
