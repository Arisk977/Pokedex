function renderPokeCard(index){
    let pokeInfoContainer= document.getElementById('poke-info');
    pokeInfoContainer.innerHTML = "";

    pokeInfoContainer.innerHTML = pokeInfoTemp(index);
}

function showPokeInfo(index){
    let pokeInfoContainer= document.getElementById('poke-info');
    let pokeInfoTab = document.getElementById('poke-info-tab');

    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML =  pokeInfoTemp(index);
    enableActiveTab(pokeInfoTab)
}

function showPokeStats(index){
    let pokeInfoContainer= document.getElementById('poke-info');
    let pokeStatsTab = document.getElementById('poke-stats-tab');

    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeStatsTemp(index);
    enableActiveTab(pokeStatsTab)
}

function showPokeEvo(index){
    let pokeInfoContainer= document.getElementById('poke-info');
    let pokeEvoTab = document.getElementById('poke-evo-tab');

    pokeInfoContainer.innerHTML = "";
    pokeInfoContainer.innerHTML = pokeEvoTemp(index);
    enableActiveTab(pokeEvoTab)
}


function showPokeMoves(index){
    let pokeInfoContainer= document.getElementById('poke-info');
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
