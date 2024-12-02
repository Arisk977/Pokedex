let EvolutionData = {};
let foundEvolutions = {};

async function renderEvolution(index) {
    let evoIndex = index + 1
    let EvoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${evoIndex}/`);
    let EvoJSON = await EvoFetch.json();
    let EvoChainUrl = await fetch(EvoJSON.evolution_chain.url);
    let EvoChainJSON = await EvoChainUrl.json();

    getEvoChainNames(EvoChainJSON)
}

function getEvoChainNames(EvoChainJSON) {
    let thirdEvoChain = EvoChainJSON.chain.evolves_to?.[0]?.evolves_to?.[0]?.species?.name || null;
    let secondEvoChain = EvoChainJSON.chain.evolves_to?.[0]?.species?.name || null;
    let firstEvoChain = EvoChainJSON.chain.species?.name;

    let { levelUpSecondEvo, levelUpThirdEvo, evoTriggerSecond, evoTriggerThird } = getLevelUpEvo(EvoChainJSON);

    if (thirdEvoChain) {
        EvolutionData = {
            evo1: firstEvoChain,
            evo2: secondEvoChain,
            evo3: thirdEvoChain,
        };
        findPokemon(levelUpSecondEvo, levelUpThirdEvo, evoTriggerSecond, evoTriggerThird);
    } else if (secondEvoChain) {
        EvolutionData = {
            evo1: firstEvoChain,
            evo2: secondEvoChain,
        };
        findPokemon(levelUpSecondEvo, null, evoTriggerSecond, null);
    } else {
        EvolutionData = {
            evo1: firstEvoChain,
        };
        findPokemon(null, null, null, null);
    }
}

function getLevelUpEvo(EvoChainJSON) {
    let levelUpSecondEvo = EvoChainJSON.chain.evolves_to?.[0]?.evolution_details?.[0]?.min_level || null;
    let levelUpThirdEvo = EvoChainJSON.chain.evolves_to?.[0]?.evolves_to?.[0]?.evolution_details?.[0]?.min_level || null;

    let evoTriggerSecond = EvoChainJSON.chain.evolves_to?.[0]?.evolution_details?.[0]?.trigger?.name || null;
    let evoTriggerThird = EvoChainJSON.chain.evolves_to?.[0]?.evolves_to?.[0]?.evolution_details?.[0]?.trigger?.name || null;

    return {
        levelUpSecondEvo,
        levelUpThirdEvo,
        evoTriggerSecond,
        evoTriggerThird,
    };
}

function findPokemon(levelUpSecondEvo, levelUpThirdEvo, evoTriggerSecond, evoTriggerThird) {
    for (let key in EvolutionData) {
        let pokemonName = EvolutionData[key];
        let foundPokemon = allPokemon.find(pokemon => pokemon.pokemon === pokemonName);

        if (foundPokemon) {
            foundEvolutions[key] = {
                name: foundPokemon.pokemon,
                svg: foundPokemon.svg,
                levelUp: (key === "evo2" && evoTriggerSecond === "level-up") ? levelUpSecondEvo :
                         (key === "evo3" && evoTriggerThird === "level-up") ? levelUpThirdEvo : null,
                trigger: key === "evo2" ? evoTriggerSecond : key === "evo3" ? evoTriggerThird : null,
            };
        }
    }
    return foundEvolutions;
}



function renderPokeCard(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    pokeInfoContainer.innerHTML = "";

    pokeInfoContainer.innerHTML = pokeInfoTemp(index);
}

function showPokeInfo(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeInfoTab = document.getElementById('poke-info-tab');

    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeInfoTemp(index);
    enableActiveTab(pokeInfoTab)
}

function showPokeStats(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeStatsTab = document.getElementById('poke-stats-tab');

    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeStatsTemp(index);
    enableActiveTab(pokeStatsTab)
}

async function showPokeEvo(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeEvoTab = document.getElementById('poke-evo-tab');

    foundEvolutions = {};
    await renderEvolution(index);
    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeEvoTemp(foundEvolutions);
    enableActiveTab(pokeEvoTab);
}


function showPokeMoves(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeMovesTab = document.getElementById('poke-moves-tab');

    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeMovesTemp(index);
    enableActiveTab(pokeMovesTab)
}

function enableActiveTab(enable) {
    const navLinks = document.getElementsByClassName('nav-link');

    for (let index = 0; index < navLinks.length; index++) {
        if (navLinks[index].classList.contains('active')) {
            navLinks[index].classList.remove('active');
        }
    }
    enable.classList.add('active');
}
