import { valorCarta, crearCarta, pedirCarta, demora } from "./";
/**
 * 
 * @param { Number } puntosJugador 
 * @param { Number} puntosComputador 
 * @param {Array<String>} deck 
 * @param {QuerySelector} btnDetener 
 * @param {Number} valorCarta 
 * @param {*} computadorCartas 
 * @param {Number} puntajeComputador 
 * @param {*} aside 
 * @returns HTMLImageElement, Number(puntajeComputador, puntajeJugador)
 */

const computerTurn =  async (puntosJugador, puntosComputador, deck, btnDetener, computadorCartas, puntajeComputador, aside) => {
btnDetener.disabled = true;
    btnDetener.style.backgroundColor = '#c82333';

    if (puntosJugador == 14 ) {
        while ( puntosComputador < 21 ){
            let carta = pedirCarta(deck);
            crearCarta(computadorCartas, carta);
            puntosComputador = puntosComputador + valorCarta(carta);
            puntajeComputador[1].innerText = puntosComputador;


            if ( puntosComputador > 21 ){
                await demora(2000);
                aside[2].style.display = 'flex';
    
                break;
            }else if ( puntosComputador == 21 ){
                aside[1].style.display = 'flex';
                break;
            }

            await demora(2000);
        }
    } else{

    while ( puntosComputador <= puntosJugador && puntosComputador !== 21){
        let carta = pedirCarta(deck);

        console.warn(carta);
        console.warn('baraja', deck.length);
        puntosComputador = puntosComputador + valorCarta(carta);

        
        if (puntosComputador > 21 && puntosJugador !== 21) {
           
            let arregloAmañado = (puntosComputador-valorCarta(carta)) == 20 ? deck.filter(cartas => ["AH" , "AD" , "AS" , "AC"].includes(cartas)) : deck.filter(cartas => valorCarta(cartas) > puntosJugador - (puntosComputador-valorCarta(carta)) && valorCarta(cartas)  <= 21 - (puntosComputador-valorCarta(carta)) );
            let cartaAmañada = pedirCarta(arregloAmañado);
            puntosComputador = (puntosComputador-valorCarta(carta)) + (valorCarta(cartaAmañada) == 11 ? 1 : valorCarta(cartaAmañada));
            crearCarta(computadorCartas, cartaAmañada);
            await demora(2000);
            aside[1].style.display = 'flex';
            
            
        }else if (puntosComputador > puntosJugador){
            
                crearCarta(computadorCartas, carta);
                puntajeComputador[1].innerText = puntosComputador;
                await demora(2000);
                puntosJugador == 21 ? aside[2].style.display = 'flex' : aside[1].style.display = 'flex';
                
                break;
        }else{
            crearCarta(computadorCartas, carta);   
        }

        puntajeComputador[1].innerText = puntosComputador;
       
        await demora(2000);
        
    }}
  }

  export { computerTurn };