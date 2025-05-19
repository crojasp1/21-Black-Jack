let deck = [];
let types = ['C','D','S','H'];
let specials = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputador = 0;

//Referencias html
let btnPedir = document.querySelector('#btn-pedir');
let btnDetener = document.querySelector('#btn-detener');
let puntajeJugador = document.querySelector('small');
let jugadorCartas = document.querySelector('#jugador-cartas');
let computadorCartas = document.querySelector('#computadora-cartas');
let aside = document.querySelectorAll('aside');
let puntajeComputador = document.querySelectorAll('small');

// Esta funcion me permite crear una nueva baraja 
const crearDeck = () => {

    for(let i=2; i<=10; i++){
        //for( let j=0; j<=types.length-1; j++){
        for(let type of types){
            deck.push(i + type)
        }
    }
    for(let type of types){
        for(let special of specials){
            deck.push(special+type)
        }
    }
    deck = _.shuffle(deck);

    return deck;
}

// Esta funcion me permite tomar una nueva carta
const pedirCarta = () => {
    if (deck.length === 0){
        throw "No hay mas cartas"
    }else{
        const carta =  deck % 2 === 0 ?  deck.shift() : deck.pop();

        return carta; 
    }
    
}

function demora(tiempo){
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

crearDeck();

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    //condiciones
    return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1;
}

// Eventos

btnPedir.addEventListener('click', () =>{
    let carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntajeJugador.innerText = puntosJugador;

    if(puntosJugador < 21){
    
        //Crear carta
        let nuevaCarta = document.createElement('img');
        nuevaCarta.className = 'carta';
        nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
        jugadorCartas.append(nuevaCarta);

    }else if(puntosJugador > 21){
        let nuevaCarta = document.createElement('img');
        nuevaCarta.className = 'carta';
        nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
        jugadorCartas.append(nuevaCarta);
        btnPedir.disabled = true;
        aside[0].style.display = 'flex';
       
    }else{
        btnPedir.disabled = true;
        aside[1].style.display = 'flex';
    }

    console.log(carta);
    console.log(puntosJugador);
}
);

btnDetener.addEventListener('click', async () => {

    while ( puntosComputador <= puntosJugador ){
        let carta = pedirCarta();
        puntosComputador = puntosComputador + valorCarta(carta);
        let nuevaCarta = document.createElement('img');
        
        if (puntosComputador > 21) {
            //let puntosDeDiferencia = (puntosJugador-(puntosComputador-valorCarta(carta)));
            let puntosAdicionales = Math.floor(Math.random()*3)+1;
            let cartaAmañada = (puntajeJugador+puntosAdicionales<21) ? puntosAdicionales : 2;
            puntosComputador = (puntosComputador-valorCarta(carta)) + cartaAmañada;
            //let nuevaCarta = document.createElement('img');
            nuevaCarta.className = 'carta';
            nuevaCarta.src = `assets/cartas/cartas/${(cartaAmañada==1 ? A : cartaAmañada)}H.png`;
            
        }else {
            
            //let nuevaCarta = document.createElement('img');
            nuevaCarta.className = 'carta';
            nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
            
        }

        puntajeComputador[1].innerText = puntosComputador;
        computadorCartas.append(nuevaCarta);
       
        await demora(2000);
        
    }


    
    
})

