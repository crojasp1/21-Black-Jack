import { crearDeck, valorCarta, pedirCarta, computerTurn, demora, crearCarta, startGame, nuevoJuego, botonPedir } from './use-cases/index';

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
  puntosJugador = botonPedir(deck, jugadorCartas, acumulador, puntosJugador, puntajeJugador, btnPedir, aside);

}
);

btnDetener.addEventListener('click', () => {
    computerTurn( puntosJugador, puntosComputador, deck, btnDetener, computadorCartas, puntajeComputador, aside);
});

btnNuevoJuego.addEventListener('click', async () => {
 const resultado = await nuevoJuego(aside, types, specials, btnNuevoJuego, deck, acumulador, puntajeJugador, puntajeComputador, puntosJugador, puntosComputador, btnDetener, btnPedir);

    deck = resultado.deck;
    puntosJugador = resultado.puntosJugador;
    puntosComputador = resultado.puntosComputador;
} );

})();
