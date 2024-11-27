let offset = 0
let limit = 50
let BASE_URL_PAGE = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
let pokemon = [];
let newPokemon = [];
let PokemonDataArray= {};
let allPokemon= [];

function init() {
    renderPokemon();
    console.log(pokemon);
    
    console.log(allPokemon);
    
}

async function renderPokemon() {
    let content = document.getElementById('content');
    let response = await fetch(BASE_URL_PAGE);
    let responseToJson = await response.json();

    content.innerHTML = "";
    getInfoToArray(responseToJson, pokemon);
    promisePokemonCard(responseToJson, pokemon);
    disableLoadingSpinner();
}

async function getPokemonData(responseToJson, i) {
    let PokemonData = await fetch(responseToJson.results[i].url);
    let Pokemon_Json = await PokemonData.json();
    let Pokemon_SVG = Pokemon_Json.sprites.other.dream_world.front_default;
    let Pokemon_type1 = Pokemon_Json.types[0].type.name;

    PokemonDataArray = {
        "id": `${Pokemon_Json.game_indices[3].game_index}`,
        "pokemon": `${Pokemon_Json.forms[0].name}`,
        "svg": `${Pokemon_SVG}`,
        "type1": `${Pokemon_type1}`,
        "type1_img": await getTypesSlot1Image(Pokemon_Json),
        "type2": getTypeSlot2(Pokemon_Json),
        "type2_img": await getTypesSlot2Image(Pokemon_Json)
    }
    
       return PokemonDataArray;
}

function getInfoToArray(responseToJson, array) {
    for (let i = 0; i < responseToJson.results.length; i++) {
        array.push(getPokemonData(responseToJson, i));
    }
}

async function promisePokemonCard(responseToJson, array) {
    try {
        let allPokemonPromise = await Promise.all(array);
        for (let index = 0; index < responseToJson.results.length; index++) {
            content.innerHTML += pokeCardTemp(index, allPokemonPromise);
        }
    } catch (error) {
      
    }
}

async function getTypesSlot1Image(Pokemon_Json) {
    let PokemonTypePage = await fetch(Pokemon_Json.types[0].type.url);
    let PokemonTypeJson = await PokemonTypePage.json();
    let PokemonTypePNG = PokemonTypeJson.sprites["generation-viii"]["sword-shield"].name_icon;

    return PokemonTypePNG;
}

async function getTypesSlot2Image(Pokemon_Json) {
    if (Pokemon_Json.types.length === 2) {
        let PokemonTypePage = await fetch(Pokemon_Json.types[1].type.url);
        let PokemonTypeJson = await PokemonTypePage.json();
        let PokemonTypePNG = PokemonTypeJson.sprites["generation-viii"]["sword-shield"].name_icon;

        return PokemonTypePNG;
    }
    else { return getTypesSlot1Image(Pokemon_Json); }
}

function getTypeSlot2(Pokemon_Json) {
    if (Pokemon_Json.types.length > 1) {
        return Pokemon_Json.types[1].type.name;
    } else {
        return "-";
    }
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

function loadMorePokemon() {
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

        console.log(newPokemon);
}


async function fetchMorePokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const responseToJson = await response.json();
        newPokemon = [];
        getInfoToArray(responseToJson, newPokemon);
        await promisePokemonCard(responseToJson, newPokemon);
     
    } catch (error) {
        console.error("Fehler beim Laden von Pokémon:", error);
    } finally {   
        disableLoadingSpinner();
    }
}

function openPokeInfo(index){
    let overlayRef= document.getElementById('overlay'); 

    overlayRef.classList.remove('d-none');
    
    overlayRef.innerHTML = pokemonOverlayCardTemp(index, allPokemon);

}

function closePokeInfo(){
    let overlayRef= document.getElementById('overlay');

    overlayRef.classList.add('d-none');
}
