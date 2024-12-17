function pokeCardTemp(index, array) {
    return `<div id="${array[index].id}" class="Pokemon-card ${array[index].type1}">

        <div class="pokemon">
            <img src="${array[index].svg}" alt="${array[index].pokemon}" onclick="openPokeCard(${index})">
        </div>

        <div class="pokemon-types">
            <img src="${array[index].type1_img}" alt="">
            <img src="${array[index].type2_img}" alt="">
        </div>

        <div class="title">
            <h3>#${array[index].id} ${array[index].pokemon}</h3>
        </div>
    </div>`;
}

function pokemonOverlayCardTemp(index, array) {
    return `<div id="close-button">
                 <img src="./img/Pokeball--Streamline-Kameleon.svg">
                 <h2>#${array[index].id} ${array[index].pokemon}</h2>
                 <img src="./img/xmark-solid.svg" alt="" onclick="closePokeInfo()" height="50px" >
            </div>

            <div id="pokemon-overlay">
                <div id="sprites" class="${array[index].type1}">
                <img src="./img/Arrow-Button-Left-3--Streamline-Ultimate.png" alt="arrow-left" onclick="previousPokemon(${index})" class="arrow">
                <img src="${array[index].svg}" alt="${array[index].pokemon}" class="poke-svg">
                <img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" alt="arrow-rigt" onclick="nextPokemon(${index})" class="arrow">
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
                            <a class="nav-link" id="poke-details-tab" onclick="showPokeDetails(${index})">Details</a>
                        </li>
                    </ul>
                </nav>
                <div id="poke-info"></div>
            </div>    
    `
}

function pokeInfoTemp(index, array) {
    return `<div id="poke-info-container">
    <table>
    <tr>
        <th>ability:</th>
        <td>${array[index].ability}</td>
    </tr>
    <tr>
        <th>second ability:</th>
        <td>${array[index].secondAbility}</td>
    </tr>
    <tr>
        <th>hidden abitity:</th>
        <td>${array[index].hiddenAbility}</td>
    </tr>
    <tr>
        <th>height:</th>
        <td>${array[index].height}</td>
    </tr>
    <tr>
        <th>weight:</th>
        <td>${array[index].weight}</td>
    </tr>
</table>
</div>
       `
}

function pokeStatsTemp(index, array) {
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
            <td>${array[index].ev_hp}</td>
            <td>${array[index].hp}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${array[index].hp}px">${array[index].hp}</div>
</div></td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>${array[index].ev_atk}</td>
            <td>${array[index].atk}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="255">
  <div class="progress-bar" style="width: ${array[index].atk}px">${array[index].atk}</div>
</div></td>
        </tr>
        <tr>
            <td>Defense</td>
            <td>${array[index].ev_def}</td>
            <td>${array[index].def}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${array[index].def}px">${array[index].def}</div>
</div></td>
        </tr>
        <tr>
            <td>Sp. Attack</td>
            <td>${array[index].ev_sp_atk}</td>
            <td>${array[index].sp_atk}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${array[index].sp_atk}px">${array[index].sp_atk}</div>
</div></td>
        </tr>
        <tr>
            <td>Sp. Defense</td>
            <td>${array[index].ev_sp_def}</td>
            <td>${array[index].sp_def}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${array[index].sp_def}px">${array[index].sp_def}</div>
</div></td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>${array[index].ev_speed}</td>
            <td>${array[index].speed}</td>
            <td><div class="progress d-none-800px" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: ${array[index].speed}px">${array[index].speed}</div>
</div></td>
        </tr>
    </table>
</div>
    `
}

function pokeEvoTemp(foundEvolutions) {
    if (Object.keys(foundEvolutions).length === 3) {
        return `
     <div id="evo-container">
        <div class="evo-img"><img src="${foundEvolutions.evo1.svg}" alt=""></div>
        <div class="arrow-evo"><img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" class="visible hidden-800px">  <img src="./img/Arrow-Button-Down-3--Streamline-Ultimate.png" class="visible-800px hidden"><span>${Evo2Trigger()}</span>
   </div>
        <div class="evo-img"><img src="${foundEvolutions.evo2.svg}" alt=""></div>
        <div class="arrow-evo"><img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" class="visible hidden-800px">  <img src="./img/Arrow-Button-Down-3--Streamline-Ultimate.png" class="visible-800px hidden"><span>${Evo3Trigger()}</span>
   </div>
        <div class="evo-img"><img src="${foundEvolutions.evo3.svg}"></div>
    </div>
    `}
    else if (Object.keys(foundEvolutions).length === 2) {
        return `
           <div id="evo-container">
        <div class="evo-img"><img src="${foundEvolutions.evo1.svg}" alt=""></div>
        <div class="arrow-evo"><img src="./img/Arrow-Button-Right-3--Streamline-Ultimate.png" class="visible hidden-800px">  <img src="./img/Arrow-Button-Down-3--Streamline-Ultimate.png" class="visible-800px hidden"><span>${Evo2Trigger()}</span>
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

function pokeDetailsTemp(text) {
    return `
       <div id="poke-details">${text}</div>
    `
}

function loadingTemp() {
    return `<div id="loading-Evo-container">
            <img id="loading-evo" src="./img/Pokeball--Streamline-Kameleon.svg"
                alt="Pokeball">
        </div>`
}

function Evo2Trigger() {
    if (foundEvolutions.evo2.trigger == "level-up" && foundEvolutions.evo2.levelUp !== null) {
        return "Level" + " " + foundEvolutions.evo2.levelUp;
    } else {
        return foundEvolutions.evo2.trigger;
    }

}

function Evo3Trigger() {
    if (foundEvolutions.evo3.trigger == "level-up") {
        return "Level" + " " + foundEvolutions.evo3.levelUp
    }
    else { return foundEvolutions.evo3.trigger }
}
