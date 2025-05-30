
import { crearDeck } from "./create-deck";
/**
 * 
 * @param {Array<String>} baraja Arreglo de String
 * @returns {String} retorna la carta del deck
 */
// Esta funcion me permite tomar una nueva carta
const pedirCarta = (baraja) => {
    if (baraja.length === 0){
        throw "No hay mas cartas"
    }

        return baraja % 2 === 0 ?  baraja.shift() : baraja.pop();
    }

    export { pedirCarta };




