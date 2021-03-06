/**APIs and URLs**/
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonCardURL ='https://api.pokemontcg.io/v2/cards';
const pokemonCardKey ='d715ea7b-3f3d-43cf-9729-15424b0fd984';

function getCards(searchTerm) {
    console.log('getCards ran');
    searchURL = pokemonURL + searchTerm;
    fetch(searchURL.toLowerCase())
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayCards(responseJson))
    .catch(err => {
        $('#error').append(
            `<p>Oops, something went wrong.</p>
            <p>Please check your search filters and try again.`
        );
    });
    $('#error').empty();
}


function displayCards(responseJson){
    $('#result').empty();
    console.log(responseJson);
    $('#result').append(
        `<h2>${responseJson.name.substring(0, 1).toUpperCase() + responseJson.name.substring(1)}</h2>
         <img src="${responseJson.sprites.other.dream_world.front_default}" alt="${responseJson.name}">
         <h3>${responseJson.types[0].type.name.substring(0, 1).toUpperCase() + responseJson.types[0].type.name.substring(1)} Type</h3>
         <h4>Watch this Poke'mon in action!</h4>
         <iframe src="https://www.dailymotion.com/search/${responseJson.name.substring(0, 1).toUpperCase() + responseJson.name.substring(1)}%20Pokemon/videos" width="100%" height="1000px"></iframe>`
        );
}

function searchBarWatchForm(){
    $('#search-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#search-input').val();
        getCards(searchTerm);
    });
}

$(searchBarWatchForm);