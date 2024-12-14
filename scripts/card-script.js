let EvolutionData = {};
let foundEvolutions = {};

async function renderEvolution(index, array) {
    let evoIndex = array[index].id
    
    let EvoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${evoIndex}/`);
    let EvoJSON = await EvoFetch.json();
    let EvoChainUrl = await fetch(EvoJSON.evolution_chain.url);
    let EvoChainJSON = await EvoChainUrl.json();
    
    await getAllGenPokemon();
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
        let foundPokemon = allGenPokemon.find(pokemon => pokemon.pokemon === pokemonName);
console.log(foundPokemon);
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

function renderPokeCard(index, array) {
    let pokeInfoContainer = document.getElementById('poke-info');
    pokeInfoContainer.innerHTML = "";

    pokeInfoContainer.innerHTML = pokeInfoTemp(index, array);
}

function showPokeInfo(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeInfoTab = document.getElementById('poke-info-tab');
    if(searchedPokemon.length > 0){
    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeInfoTemp(index, searchedPokemon);
}
    else {
        pokeInfoContainer.innerHTML = "";
        pokeInfoContainer.innerHTML = pokeInfoTemp(index, allPokemon);
    }
    
    enableActiveTab(pokeInfoTab)
}

function showPokeStats(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeStatsTab = document.getElementById('poke-stats-tab');


    if(searchedPokemon.length > 0){
        pokeInfoContainer.innerHTML = "";
        pokeInfoContainer.innerHTML = pokeStatsTemp(index, searchedPokemon);
    }
        else {
            pokeInfoContainer.innerHTML = "";
            pokeInfoContainer.innerHTML = pokeStatsTemp(index, allPokemon);
        }
   
    enableActiveTab(pokeStatsTab)
}

async function showPokeEvo(index) {
    let pokeInfoContainer = document.getElementById('poke-info');
    let pokeEvoTab = document.getElementById('poke-evo-tab');
    
    foundEvolutions = {};
    pokeInfoContainer.innerHTML = "";

    pokeInfoContainer.innerHTML = loadingTemp();

    if(searchedPokemon.length > 0){
        await renderEvolution(index, searchedPokemon);
        pokeInfoContainer.innerHTML= "";
        pokeInfoContainer.innerHTML = pokeEvoTemp(foundEvolutions);
    }
        else {
            await renderEvolution(index, allPokemon);
            pokeInfoContainer.innerHTML= "";
            pokeInfoContainer.innerHTML = pokeEvoTemp(foundEvolutions);
        }
    
    enableActiveTab(pokeEvoTab);
    
}


async function showPokeDetails(index) {
 if(searchedPokemon.length > 0){
        let cardIndex = searchedPokemon[index].id
        let pokeInfoContainer = document.getElementById('poke-info');
        let EvoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${cardIndex}/`);
        let EvoJSON = await EvoFetch.json();
        pokeInfoContainer.innerHTML = "";
        pokeInfoContainer.innerHTML = pokeDetailsTemp(EvoJSON.flavor_text_entries[15].flavor_text);
    }
        else {
            let cardIndex = allPokemon[index].id
            let pokeInfoContainer = document.getElementById('poke-info');
            let EvoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${cardIndex}/`);
            let EvoJSON = await EvoFetch.json();
        
            pokeInfoContainer.innerHTML = "";
            pokeInfoContainer.innerHTML = pokeDetailsTemp(EvoJSON.flavor_text_entries[15].flavor_text);
        }
        let pokeDetailsTab = document.getElementById('poke-details-tab');
        enableActiveTab(pokeDetailsTab)
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
