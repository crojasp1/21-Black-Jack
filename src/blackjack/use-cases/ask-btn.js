import {pedirCarta, crearCarta, valorCarta} from './'

const botonPedir = (deck, jugadorCartas, acumulador, puntosJugador, puntajeJugador, btnPedir, aside) => {
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

    return puntosJugador;
  };

export { botonPedir };
