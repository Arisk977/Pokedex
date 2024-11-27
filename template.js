function pokeCardTemp(index, allPokemonPromise) {
    return `<div id="${allPokemonPromise[index].id}" class="Pokemon-card ${allPokemonPromise[index].type1}">

        <div class="pokemon">
            <img src="${allPokemonPromise[index].svg}" onclick="openPokeInfo(${index})">
        </div>

        <div class="pokemon-types">
            <img src="${allPokemonPromise[index].type1_img}" alt="">
            <img src="${allPokemonPromise[index].type2_img}" alt="">
        </div>

        <div class="title">
            <h3>#${allPokemonPromise[index].id} ${allPokemonPromise[index].pokemon}</h3>
        </div>
    </div>`;
}

function pokemonOverlayCardTemp(index, allPokemonPromise){
    return `<div id="pokemon-overlay">
         <img src="./img/xmark-solid.svg" alt="" onclick="closePokeInfo()" height="50px">
         <div id="sprite"><img src="${allPokemonPromise[index].svg}"></div>
            <nav id="navbar"></nav>
            <div id="poke-info"></div>
    </div>    
    `
}
