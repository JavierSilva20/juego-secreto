// Variables globales
let numeroSecreto = 0; // Almacena el número secreto a adivinar
let intentos = 0; // Cuenta los intentos realizados por el usuario
let intentosRestantes = 0; // Cuenta los intentos restantes
let listaNumerosSorteados = []; // Guarda los números ya sorteados para evitar repeticiones
let numeroMaximo = 10; // Valor máximo que puede tener el número secreto
let intentosMaximos = 5; // Número máximo de intentos permitidos

// Inicia el juego por primera vez
condicionesIniciales();

// Asigna texto a un elemento del DOM y habilita el input de intento
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    document.querySelector('#intento').removeAttribute('disabled');
    return;
}

// Inicializa las condiciones del juego
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del numero secreto');
    asignarTextoElemento('p', `Indica el numero del 1 al ${numeroMaximo}. <br> Tienes ${intentosMaximos} intentos para adivinar el numero secreto`);
    numeroSecreto = generarNumeroSecreto();  
    intentos = 1;
}

// Genera un número secreto aleatorio que no se haya sorteado antes
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    // Si ya se sortearon todos los números posibles
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
        document.getElementById('intento').setAttribute('disabled','true');
    } else {
        // Si el número generado ya fue sorteado, genera otro
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Limpia el input donde el usuario ingresa su intento
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Verifica si el intento del usuario es correcto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentosRestantes = intentosMaximos - intentos;

    if (numeroDeUsuario === numeroSecreto) {
        // El usuario acertó el número secreto
        asignarTextoElemento('p',`Acertastes el numero en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#intento').setAttribute('disabled','true');
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p',`El numero secreto es menor. <br> Tienes ${intentosRestantes} ${intentosRestantes === 1 ? 'intento.' : 'intentos'}`);
        } else {
            asignarTextoElemento('p',`El numero secreto es mayor. <br> Tienes ${intentosRestantes} ${intentosRestantes === 1 ? 'intento.' : 'intentos.'}`);
        }
        intentos++;
        intentosRestantes--;
        limpiarCaja();
        cantidadIntentos();
    }
    return;
}

// Verifica si se alcanzó el número máximo de intentos
function cantidadIntentos() {
    if (intentos > intentosMaximos) {
        asignarTextoElemento('p', `Llegastes al numero maximo de ${intentosMaximos} intentos. El numero secreto era ${numeroSecreto}`);
        document.querySelector('#reiniciar').removeAttribute('disabled');
        document.querySelector('#intento').setAttribute('disabled','true');
    } 
}

// Reinicia el juego a su estado inicial
function reiniciarJuego() {
    limpiarCaja(); // Limpia el input
    condicionesIniciales(); // Reinicia las condiciones iniciales
    document.querySelector('#reiniciar').setAttribute('disabled','true'); // Deshabilita el botón de reinicio
}