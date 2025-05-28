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

// Funcion para crear nuevo juego

const startGame = () => {
    deck = crearDeck();
}

// Esta funcion me permite crear una nueva baraja 
const crearDeck = () => {

    deck = [];

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
    

    return _.shuffle(deck);;
}

// Esta funcion me permite tomar una nueva carta
const pedirCarta = (baraja) => {
    if (baraja.length === 0){
        throw "No hay mas cartas"
    }

        return baraja % 2 === 0 ?  baraja.shift() : baraja.pop();
    }
    

function demora(tiempo){
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    //condiciones
    return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1;
}

const crearCarta = (usuario, carta) => {

    let nuevaCarta = document.createElement('img');
        nuevaCarta.className = 'carta';
        nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
        usuario.append(nuevaCarta);
        
}

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

btnDetener.addEventListener('click', async () => {
    btnDetener.disabled = true;
    btnDetener.style.backgroundColor = '#c82333';

    if (puntosJugador == 14 ) {
        while ( puntosComputador < 21 ){
            let carta = pedirCarta(deck);
            crearCarta(computadorCartas, carta);
            puntosComputador = puntosComputador + valorCarta(carta);
            

            if ( puntosComputador > 21 ){
                await demora(2000);
                puntajeComputador[1].innerText = puntosComputador;
                //computadorCartas.append(nuevaCarta);
                await demora(2000);
                aside[2].style.display = 'flex';
    
                break;
            }else if ( puntosComputador == 21 ){
                puntajeComputador[1].innerText = puntosComputador;
                //computadorCartas.append(nuevaCarta);
                aside[1].style.display = 'flex';
            }

            puntajeComputador[1].innerText = puntosComputador;
            //computadorCartas.append(nuevaCarta);
            await demora(2000);
        }
    } else{

    while ( puntosComputador <= puntosJugador && puntosComputador !== 21){
        let carta = pedirCarta(deck);
        //crearCarta(computadorCartas, carta);

        console.warn(carta);
        console.warn('baraja', deck.length);
        puntosComputador = puntosComputador + valorCarta(carta);

        
        if (puntosComputador > 21 && puntosJugador !== 21) {
           
            //let puntosDeDiferencia = (puntosJugador-(puntosComputador-valorCarta(carta)));
            let arregloAmañado = (puntosComputador-valorCarta(carta)) == 20 ? deck.filter(cartas => ["AH" , "AD" , "AS" , "AC"].includes(cartas)) : deck.filter(cartas => valorCarta(cartas) > puntosJugador - (puntosComputador-valorCarta(carta)) && valorCarta(cartas)  <= 21 - (puntosComputador-valorCarta(carta)) );
            let cartaAmañada = pedirCarta(arregloAmañado);
            puntosComputador = (puntosComputador-valorCarta(carta)) + (valorCarta(cartaAmañada) == 11 ? 1 : valorCarta(cartaAmañada));
            crearCarta(computadorCartas, cartaAmañada);
            await demora(2000);
            aside[1].style.display = 'flex';
            
            
        }else if (puntosComputador > puntosJugador){
            
                crearCarta(computadorCartas, carta);
                puntajeComputador[1].innerText = puntosComputador;
                //computadorCartas.append(nuevaCarta);
                await demora(2000);
                puntosJugador == 21 ? aside[2].style.display = 'flex' : aside[1].style.display = 'flex';
                
                break;
        }else{
            crearCarta(computadorCartas, carta);   
        }

        puntajeComputador[1].innerText = puntosComputador;
        //computadorCartas.append(nuevaCarta);
       
        await demora(2000);
        
    }}
});

btnNuevoJuego.addEventListener('click', async () => {

    aside[0].style.display = 'none';
    
    btnNuevoJuego.innerText = 'Nuevo juego';
    startGame();

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

} );

})();
