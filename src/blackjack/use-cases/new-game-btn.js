import { startGame, demora } from './';

const nuevoJuego = async (aside, types, specials, btnNuevoJuego, deck, acumulador, puntajeJugador, puntajeComputador, puntosJugador, puntosComputador, btnDetener, btnPedir ) => {
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

    return {deck, puntosJugador, puntosComputador};
}

export { nuevoJuego };

