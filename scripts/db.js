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