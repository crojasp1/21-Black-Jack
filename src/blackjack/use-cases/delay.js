

function demora(tiempo){
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

export { demora };