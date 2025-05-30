import { crearDeck, valorCarta, pedirCarta, computerTurn, demora, crearCarta, startGame } from './use-cases/index';

(() =>{
let deck = [],
    types = ['C','D','S','H'],
    specials = ['A', 'J', 'Q', 'K'],
    acumulador = [],

    puntosJugador = 0,
    puntosComputador = 0;

//Referencias html
const btnPedir = document.querySelector('#btn-pedir'),
    btnDetener = document.querySelector('#btn-detener'),
    btnNuevoJuego = document.querySelector("#btn-nuevo"),
    puntajeJugador = document.querySelector('small'),
    jugadorCartas = document.querySelector('#jugador-cartas'),
    computadorCartas = document.querySelector('#computadora-cartas'),
    aside = document.querySelectorAll('aside'),
    puntajeComputador = document.querySelectorAll('small');




// Eventos

btnPedir.addEventListener('click', () =>{

    let carta = pedirCarta(deck);
    crearCarta(jugadorCartas, carta);
    acumulador.push(valorCarta(carta));
    puntosJugador = puntosJugador + valorCarta(carta);
    puntajeJugador.innerText = puntosJugador;

    if(puntosJugador > 21){
        
        let index = acumulador.indexOf(11);
        if (index !== -1 && acumulador.includes(11)){
            acumulador[index] = 1;
            puntosJugador = acumulador.reduce((total, card) => total+card)
            window.alert("As cambia de valor de 11 a 1");
            puntajeJugador.innerText = puntosJugador;

        }else{
            btnPedir.disabled = true;
            aside[1].style.display = 'flex';
            
        }
       
    }else if (puntosJugador == 21){
        btnPedir.disabled = true;
        aside[2].style.display = 'flex';
        
    }
    
    console.log('baraja', deck);
    console.log(carta);
    console.log('puntos Jugador', puntosJugador);
}
);

btnDetener.addEventListener('click', () => {
    computerTurn( puntosJugador, puntosComputador, deck, btnDetener, computadorCartas, puntajeComputador, aside);
});

btnNuevoJuego.addEventListener('click', async () => {

    aside[0].style.display = 'none';
    
    btnNuevoJuego.innerText = 'Nuevo juego';
     deck = startGame(deck, types, specials);

    let imagenes = document.querySelectorAll('img');
    imagenes.forEach( (img, index) => setTimeout(() => img.remove() , index*300) );

    await demora(1000);

    acumulador = [];
    puntajeJugador.innerText = 0
    puntajeComputador[1].innerText = 0;

    puntosJugador = 0;
    puntosComputador = 0;

    if (aside[1].style.display == 'flex' || aside[2].style.display == 'flex') {
        aside[1].style.display = 'none';
        aside[2].style.display = 'none';
    }
    btnDetener.disabled = false;
    btnPedir.disabled = false;
    
    btnDetener.style.backgroundColor = "#0069d9";

    console.log('puntosjaJug', puntajeJugador.innerText);
    console.log('deck', deck);

} );

})();
