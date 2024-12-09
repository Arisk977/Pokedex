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
                             <a class="nav-link active" id="poke-info-tab" onclick="showPokeInfo(${index})">Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="poke-stats-tab" onclick="showPokeStats(${index})">Stats</a>
                        </li>
                        <li class="nav-item">
                             <a class="nav-link" id="poke-evo-tab" onclick="showPokeEvo(${index})">Evolution</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="poke-moves-tab" onclick="showPokeMoves(${index})">Moves</a>
                        </li>
                    </ul>
                </nav>
                <div id="poke-info"></div>
            </div>    
    `
}

function pokeInfoTemp(index){
    return `
    <table>
    <tr>
        <th>ability:</th>
        <td>${allPokemon[index].ability}</td>
    </tr>
    <tr>
        <th>second ability:</th>
        <td>${allPokemon[index].secondAbility}</td>
    </tr>
    <tr>
        <th>hidden abitity:</th>
        <td>${allPokemon[index].hiddenAbility}</td>
    </tr>
    <tr>
        <th>height:</th>
        <td>${allPokemon[index].height}</td>
    </tr>
    <tr>
        <th>weight:</th>
        <td>${allPokemon[index].weight}</td>
    </tr>
</table>
       `
}

function pokeStatsTemp(index){
    return `
   <div id="stats-container">
    <table id="stats">
         <tr>
            <th>Stats</th>
            <th>Ev</th>
            <th>Base Stats</th>
            <th></th>
        </tr>
        <tr>
            <td>KP</td>
            <td>${allPokemon[index].ev_hp}</td>
            <td>${allPokemon[index].hp}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${allPokemon[index].hp}px">${allPokemon[index].hp}</div>
</div></td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>${allPokemon[index].ev_atk}</td>
            <td>${allPokemon[index].atk}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="255">
  <div class="progress-bar" style="width: ${allPokemon[index].atk}px">${allPokemon[index].atk}</div>
</div></td>
        </tr>
        <tr>
            <td>Defense</td>
            <td>${allPokemon[index].ev_def}</td>
            <td>${allPokemon[index].def}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${allPokemon[index].def}px">${allPokemon[index].def}</div>
</div></td>
        </tr>
        <tr>
            <td>Sp. Attack</td>
            <td>${allPokemon[index].ev_sp_atk}</td>
            <td>${allPokemon[index].sp_atk}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${allPokemon[index].sp_atk}px">${allPokemon[index].sp_atk}</div>
</div></td>
        </tr>
        <tr>
            <td>Sp. Defense</td>
            <td>${allPokemon[index].ev_sp_def}</td>
            <td>${allPokemon[index].sp_def}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${allPokemon[index].sp_def}px">${allPokemon[index].sp_def}</div>
</div></td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>${allPokemon[index].ev_speed}</td>
            <td>${allPokemon[index].speed}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${allPokemon[index].speed}px">${allPokemon[index].speed}</div>
</div></td>
        </tr>
    </table>
</div>
    `
}

function pokeEvoTemp(foundEvolutions){
    if(Object.keys(foundEvolutions).length === 3){
    return `
     <div id="evo-container">
        <div class="evo-img"><img src="${foundEvolutions.evo1.svg}" alt=""></div>
        <div class="arrow-evo"><img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" alt=""><span>${Evo2Trigger()}</span>
   </div>
        <div class="evo-img"><img src="${foundEvolutions.evo2.svg}" alt=""></div>
        <div class="arrow-evo"><img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" alt=""><span>${Evo3Trigger()}</span>
   </div>
        <div class="evo-img"><img src="${foundEvolutions.evo3.svg}" alt=""></div>
    </div>
    `}
    else if(Object.keys(foundEvolutions).length === 2){
        return `
           <div id="evo-container">
        <div class="evo-img"><img src="${foundEvolutions.evo1.svg}" alt=""></div>
        <div class="arrow-evo"><img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" alt=""><span>${Evo2Trigger()}</span>
   </div>
        <div class="evo-img"><img src="${foundEvolutions.evo2.svg}" alt=""></div>
        </div>
        
       `
    }

    else {
        return `
        <div id="evo-container">
           <div class="evo-img"><img src="${foundEvolutions.evo1.svg}" alt=""></div>
       </div>
       `
    }
}

function pokeMovesTemp(index){
    return `
    
    `
}

function loadingTemp(){
    return `<div id="loading-Evo-container">
            <img id="loading-evo" src="./img/Pokeball--Streamline-Kameleon.svg"
                alt="Pokeball">
        </div>`
}

function Evo2Trigger(){
    if (foundEvolutions.evo2.trigger == "level-up" && foundEvolutions.evo2.levelUp !== null) { 
         return "Level" + " " + foundEvolutions.evo2.levelUp;
    } else {
        return foundEvolutions.evo2.trigger;
    }
    
}

function Evo3Trigger(){
    if (foundEvolutions.evo3.trigger == "level-up"){
        return "Level" + " " + foundEvolutions.evo3.levelUp
    }
    else {return foundEvolutions.evo3.trigger}
}