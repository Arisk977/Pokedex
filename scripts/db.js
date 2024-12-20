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
        "type2_img": await getTypesSlot2Image(Pokemon_Json),
        "weight": `${Pokemon_Json.weight}`,
        "height": `${Pokemon_Json.height}0`,
        "ability": `${Pokemon_Json.abilities[0].ability.name}`,
        "secondAbility": getSecondAbility(Pokemon_Json),
        "hiddenAbility": getHiddenAbility(Pokemon_Json),
        "hp": `${Pokemon_Json.stats[0].base_stat}`,
        "atk": `${Pokemon_Json.stats[1].base_stat}`,
        "def": `${Pokemon_Json.stats[2].base_stat}`,
        "sp_atk": `${Pokemon_Json.stats[3].base_stat}`,
        "sp_def": `${Pokemon_Json.stats[4].base_stat}`,
        "speed": `${Pokemon_Json.stats[5].base_stat}`,
        "ev_hp": `${Pokemon_Json.stats[0].effort}`,
        "ev_atk": `${Pokemon_Json.stats[1].effort}`,
        "ev_def": `${Pokemon_Json.stats[2].effort}`,
        "ev_sp_atk": `${Pokemon_Json.stats[3].effort}`,
        "ev_sp_def": `${Pokemon_Json.stats[4].effort}`,
        "ev_speed": `${Pokemon_Json.stats[5].effort}`,

    }
       return PokemonDataArray;
}


function getSecondAbility(Pokemon_Json){ 
if(Pokemon_Json.abilities.length == 3){
    return Pokemon_Json.abilities[1].ability.name
}
else {return "-"}
}

function getHiddenAbility(Pokemon_Json){ 
    if(Pokemon_Json.abilities.length == 3){
        return Pokemon_Json.abilities[2].ability.name
    }
    else if (Pokemon_Json.abilities.length == 2)
        {return Pokemon_Json.abilities[1].ability.name}
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