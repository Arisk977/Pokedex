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

function pokemonOverlayCardTemp(index, allPokemonPromise) {
    return `<div id="close-button">
    <img src="./img/Pokeball--Streamline-Kameleon.svg">
   
    <h2>#${allPokemonPromise[index].id} ${allPokemonPromise[index].pokemon}</h2>
                 <img src="./img/xmark-solid.svg" alt="" onclick="closePokeInfo()" height="50px" >
            </div>
            <div id="pokemon-overlay">
         
                <div id="sprites" class="${allPokemonPromise[index].type1}"><img src="${allPokemonPromise[index].svg}"></div>
                <nav id="navbar">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                             <a class="nav-link active" aria-current="page" href="#">Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Stats</a>
                        </li>
                        <li class="nav-item">
                             <a class="nav-link" href="#">Evolution</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Moves</a>
                        </li>
                    </ul>
                </nav>
                <div id="poke-info"></div>
            </div>    
    `
}
