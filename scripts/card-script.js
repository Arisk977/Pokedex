function renderPokeCard(index){
    let pokeInfoContainer= document.getElementById('poke-info');
    pokeInfoContainer.innerHTML = "";

    pokeInfoContainer.innerHTML = pokeInfoTemp(index);
}