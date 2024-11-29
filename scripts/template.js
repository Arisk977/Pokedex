function pokeCardTemp(index, allPokemon) {
    return `<div id="${allPokemon[index].id}" class="Pokemon-card ${allPokemon[index].type1}">

        <div class="pokemon">
            <img src="${allPokemon[index].svg}" alt="${allPokemon[index].pokemon}" onclick="openPokeCard(${index})">
        </div>

        <div class="pokemon-types">
            <img src="${allPokemon[index].type1_img}" alt="">
            <img src="${allPokemon[index].type2_img}" alt="">
        </div>

        <div class="title">
            <h3>#${allPokemon[index].id} ${allPokemon[index].pokemon}</h3>
        </div>
    </div>`;
}

function pokemonOverlayCardTemp(index, allPokemon) {
    return `<div id="close-button">
    <img src="./img/Pokeball--Streamline-Kameleon.svg">
   
    <h2>#${allPokemon[index].id} ${allPokemon[index].pokemon}</h2>
                 <img src="./img/xmark-solid.svg" alt="" onclick="closePokeInfo()" height="50px" >
            </div>
            <div id="pokemon-overlay">
         
                <div id="sprites" class="${allPokemon[index].type1}">
                <img src="${allPokemon[index].svg}" alt="${allPokemon[index].pokemon}">
                </div>
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

function pokeInfoTemp(index){
    return `<div>
    <span> <h5>abiltity:</h5> ${allPokemon[index].ability}</span>
    <span> <h5>second abiltity:</h5> ${allPokemon[index].ability}</span>
    <span> <h5>hidden abiltity:</h5> ${allPokemon[index].ability}</span>
    <span> <h5>height:</h5> ${allPokemon[index].height}</span>
    <span> <h5>weight:</h5> ${allPokemon[index].weight}</span>
</div>
       `
}