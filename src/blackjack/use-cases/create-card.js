
/**
 * 
 * @param {QuerySelector} usuario Espacio en el documento donde se inserta la carta
 * @param {String} carta 
 * @returns HTMLImageElement
 */
const crearCarta = (usuario, carta) => {

    let nuevaCarta = document.createElement('img');
        nuevaCarta.className = 'carta';
        nuevaCarta.src = `assets/cartas/cartas/${carta}.png`;
        usuario.append(nuevaCarta);
        
};

export { crearCarta };
