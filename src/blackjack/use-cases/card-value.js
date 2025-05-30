
/**
 * 
 * @param { String } carta Carta con figura
 * @returns { number } Valor de la carta sin figura
 */
export const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    //condiciones
    return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1;
}


