let deck = [];
let types = ['C','D','S','H'];
let specials = ['A', 'J', 'Q', 'K'];
let acumulador = [];

let puntosJugador = 0,
    puntosComputador = 0;

//Referencias html
let btnPedir = document.querySelector('#btn-pedir');
let btnDetener = document.querySelector('#btn-detener');
let btnNuevoJuego = document.querySelector("#btn-nuevo");
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
const pedirCarta = (baraja) => {
    if (baraja.length === 0){
        throw "No hay mas cartas"
    }else{
        const seleccion =  baraja % 2 === 0 ?  baraja.shift() : baraja.pop();

        return seleccion; 
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

    let carta = pedirCarta(deck);

    acumulador.push(valorCarta(carta));
    puntosJugador = puntosJugador + valorCarta(carta);

    let nuevaCarta = document.createElement('img');
        nuevaCarta.className = 'carta';
        nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
        jugadorCartas.append(nuevaCarta);

    puntajeJugador.innerText = puntosJugador;

    if(puntosJugador < 21){
    
        jugadorCartas.append(nuevaCarta);

    }else if(puntosJugador > 21){
        
        let index = acumulador.indexOf(11);
        if (index !== -1){
            acumulador[index] = 1;
            puntosJugador = acumulador.reduce((total, card) => total+card)
            window.alert("As cambia de valor de 11 a 1");
            puntajeJugador.innerText = puntosJugador;

        }else{
            btnPedir.disabled = true;
            aside[0].style.display = 'flex';
            jugadorCartas.append(nuevaCarta);
        }
         
        

       
    }else{
        btnPedir.disabled = true;
        aside[1].style.display = 'flex';
        jugadorCartas.append(nuevaCarta);
    }
    

    console.log(carta);
    console.log(puntosJugador);
}
);

btnDetener.addEventListener('click', async () => {
    btnDetener.disabled = true;
    btnDetener.style.backgroundColor = '#c82333';

    if (puntosJugador == 14 ) {
        while ( puntosComputador < 21 ){
            let carta = pedirCarta(deck);
            puntosComputador = puntosComputador + valorCarta(carta);
            let nuevaCarta = document.createElement('img');
            nuevaCarta.className = 'carta';
            nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;

            if ( puntosComputador > 21 ){
                await demora(2000);
                puntajeComputador[1].innerText = puntosComputador;
                computadorCartas.append(nuevaCarta);
                await demora(2000);
                aside[1].style.display = 'flex';
    
                break;
            }else if ( puntosComputador == 21 ){
                puntajeComputador[1].innerText = puntosComputador;
                computadorCartas.append(nuevaCarta);
                aside[0].style.display = 'flex';
            }

            puntajeComputador[1].innerText = puntosComputador;
            computadorCartas.append(nuevaCarta);
            await demora(2000);
        }
    } else{

    while ( puntosComputador <= puntosJugador && puntosComputador !== 21){
        let carta = pedirCarta(deck);
        console.warn(carta);
        puntosComputador = puntosComputador + valorCarta(carta);
        let nuevaCarta = document.createElement('img');
        
        if (puntosComputador > 21 && puntosJugador !== 21) {
           
            //let puntosDeDiferencia = (puntosJugador-(puntosComputador-valorCarta(carta)));
            let arregloAmañado = (puntosComputador-valorCarta(carta)) == 20 ? deck.filter(cartas => ["AH" , "AD" , "AS" , "AC"].includes(cartas)) : deck.filter(cartas => valorCarta(cartas) > puntosJugador - (puntosComputador-valorCarta(carta)) && valorCarta(cartas)  <= 21 - (puntosComputador-valorCarta(carta)) );
            let cartaAmañada = pedirCarta(arregloAmañado);
            puntosComputador = (puntosComputador-valorCarta(carta)) + (valorCarta(cartaAmañada) == 11 ? 1 : valorCarta(cartaAmañada));
            nuevaCarta.className = 'carta';
            nuevaCarta.src = `assets/cartas/cartas/${cartaAmañada}.png`;
            await demora(2000);
            aside[0].style.display = 'flex';
            
            
        }else {
            
            //let nuevaCarta = document.createElement('img');
            nuevaCarta.className = 'carta';
            nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
            if (puntosComputador > puntosJugador){
                puntajeComputador[1].innerText = puntosComputador;
                computadorCartas.append(nuevaCarta);
                await demora(2000);
                puntosJugador == 21 ? aside[1].style.display = 'flex' : aside[0].style.display = 'flex';
                
                break;
            }
        }

        puntajeComputador[1].innerText = puntosComputador;
        computadorCartas.append(nuevaCarta);
       
        await demora(2000);
        
    }}
});

btnNuevoJuego.addEventListener('click', async () => {
   
    let imagenes = document.querySelectorAll('img');
    imagenes.forEach( (img, index) => setTimeout(() => img.remove() , index*300) );

    await demora(1000);

    puntajeJugador.innerText = 0
    puntajeComputador[1].innerText = 0;

    if (aside[0].style.display == 'flex' || aside[1].style.display == 'flex') {
        aside[0].style.display = 'none';
        aside[1].style.display = 'none';
    }
    btnDetener.disabled = false;
    btnPedir.disabled = false;
    

} );


