import _ from 'underscore';

// Esta funcion me permite crear una nueva baraja 
/**
 * 
 * @param {array} deck 
 * @param {array<string>} types Ejemplo: ['C','D','S','H']
 * @param {array<string>} specials Ejemplo: ['A', 'J', 'Q', 'K']
 * @returns {array<string>}
 */
const crearDeck = (deck, types, specials) => {

  if (!types || types.length == 0) throw new Error ('types es obligatorio como un arreglo de String');
  if (!specials || specials.length == 0) throw new Error ('specials tiene que ser un arreglo de String');

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

export { crearDeck };