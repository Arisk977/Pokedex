let offset = 0
let limit = 50
let BASE_URL_PAGE = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
let pokemon = [];
let newPokemon = [];
let PokemonDataArray= {};
let allPokemon= [];

function init() {
    renderPokemon();
}




async function renderPokemon() {
    enableLoadingSpinner();
    let content = document.getElementById('content');
    let response = await fetch(BASE_URL_PAGE);
    let responseToJson = await response.json();

    content.innerHTML = "";
    await getInfoToArray(responseToJson, pokemon);
    mergePokemonData(pokemon);
    renderPokemonCards();

    disableLoadingSpinner();
}

function renderPokemonCards() {
    let content = document.getElementById('content');
    content.innerHTML = "";
    allPokemon.sort((a, b) => a.id - b.id);
    allPokemon.forEach((poke, index) => {
        content.innerHTML += pokeCardTemp(index, allPokemon);
    });
}

async function getInfoToArray(responseToJson, array) {
    let promises = responseToJson.results.map((_, i) =>
        getPokemonData(responseToJson, i)
    );
    let resolvedPokemon = await Promise.all(promises);
    array.push(...resolvedPokemon);
}

function mergePokemonData(newPokemon) {
    for (let poke of newPokemon) {
        if (!allPokemon.find(p => p.id === poke.id)) {
            allPokemon.push(poke);
        }
    }
}

async function promisePokemonCard(responseToJson, array) {
    try {
        let allPokemon = await Promise.all(array);
        for (let index = 0; index < responseToJson.results.length; index++) {
            content.innerHTML += pokeCardTemp(index, allPokemon);
        }
    } catch (error) {
      
    }
}

async function loadMorePokemon() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    enableLoadingSpinner();

    setTimeout(() => {
        offset += 50;
        if (offset + limit > 151) {
            limit = 151 - offset;
        }
        fetchMorePokemon().then(() => {
            if (offset + limit >= 151) {
                let loadingButton = document.getElementById('load-more');
                loadingButton.classList.add('d-none');
            }
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }); }, 1000);
}

async function fetchMorePokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const responseToJson = await response.json();

        pokemon = [];
        await getInfoToArray(responseToJson, pokemon);

        mergePokemonData(pokemon);
        renderPokemonCards();
     
    } catch (error) {
        console.error("Fehler beim Laden von Pokémon:", error);
    } finally {   
        disableLoadingSpinner();
    }
}

function openPokeCard(index) {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.remove('d-none');
    overlayRef.innerHTML = pokemonOverlayCardTemp(index, allPokemon);
    
    renderPokeCard(index);
    addPokeCries(index);
}

function addPokeCries(index){
    let audioIndex = index +1;
    let cries= new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${audioIndex}.ogg`);
   cries.play();
   cries.volume = 0.2;
}

function closePokeInfo(){
    let overlayRef= document.getElementById('overlay');

    overlayRef.classList.add('d-none');
}

function disableLoadingSpinner() {
    let LoadingSpinner = document.getElementById('loading-spinner');
    let loadingText = document.getElementById('loading-text');
    let loadingButton = document.getElementById('load-more');
    let content = document.getElementById('content');

    LoadingSpinner.classList.add('d-none');
    loadingText.classList.add('d-none');
    loadingButton.classList.remove('d-none');
    content.classList.remove('d-none')

}

function enableLoadingSpinner() {
    let LoadingSpinner = document.getElementById('loading-spinner');
    let loadingText = document.getElementById('loading-text');
    let loadingButton = document.getElementById('load-more');
    let content = document.getElementById('content');

    LoadingSpinner.classList.remove('d-none');
    loadingText.classList.remove('d-none');
    loadingButton.classList.add('d-none');
    content.classList.add('d-none')
}