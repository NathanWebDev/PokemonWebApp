/**APIs and URLs**/
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';
const youtubeAPI = 'https://www.googleapis.com/youtube/v3/search';
const youtubeAPIKey = 'AIzaSyBfRcnz-01qbwN6mMpDtOd68L3eEdo1RCQ';


function colorFinder(responseJson){
    var colorType = ''
    switch(responseJson.types[0].type.name){
        case 'normal':
            colorType = '#78515c';
        break;
        case 'fire':
            colorType = '#ad1d24';
        break;
        case 'water':
            colorType = '#1552e1';
        break;
        case 'grass':
            colorType = '#1b7742';
        break;
        case 'electric':
            colorType = '#e0e42e';
        break;
        case 'ice':
            colorType = '#86d2f4';
        break;
        case 'fighting':
            colorType = '#964223';
        break;
        case 'poison':
            colorType = '#5d2e87';
        break;
        case 'ground':
            colorType = '#a56f2e';
        break;
        case 'flying':
            colorType = '#49677f';
        break;
        case 'psychic':
            colorType = '#a5296c';
        break;
        case 'bug':
            colorType = '#1d4a29';
        break;
        case 'rock':
            colorType = '#491809';
        break;
        case 'ghost':
            colorType = '#323468';
        break;
        case 'dark':
            colorType = '#040708';
        break;
        case 'dragon':
            colorType = '#438a96';
        break;
        case 'steel':
            colorType = '#61756e';
        break;
        case 'fairy':
            colorType = '#941b46';
        break;
    }
    return colorType;
}


function getYouTubeVideos(responseJson, youtubeAPIKey) {
    const videosURL = youtubeAPI + `?part=snippet&key=${youtubeAPIKey}&q=${responseJson.name}%20Pokemon%20Videos`;
  
    fetch(videosURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson2 => displayVideos(responseJson2))
      .catch(err => {
        $('#error').append(
            `<p>Oops, something went wrong. ${err.message}</p>
            <p>Please check your search filters and try again.</p>`);
      });
      $('#error').empty();
      console.log(videosURL);
    }

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
            `<p>Oops, something went wrong. ${err.message}</p>
            <p>Please check your search filters and try again.</p>`
        );
    });
    $('#error').empty();
};


function displayCards(responseJson){
    var colorType = colorFinder(responseJson);
    console.log(colorType);
    $('#home-text').remove();
    $('#result').empty();
    console.log(responseJson);
    $('#result').append(
        `<div id="pokemon-card" style="background-color:${colorType}">
            <div id="pokemon-card-header">
                <h2>${responseJson.name.substring(0, 1).toUpperCase() + responseJson.name.substring(1)}</h2>
                <h2>${responseJson.stats[0].base_stat} HP</h2>
            </div>
         <img src="${responseJson.sprites.other.dream_world.front_default}" alt="${responseJson.name}">
         <p>Height: ${responseJson.height} | Weight: ${responseJson.weight}</p>
         <h3>${responseJson.types[0].type.name.substring(0, 1).toUpperCase() + responseJson.types[0].type.name.substring(1)} Type</h3>
         </div>
         <h4>Click on one of the boxes below to watch this Pokèmon in action!</h4>`
        );
    getYouTubeVideos(responseJson, youtubeAPIKey);
};

function displayVideos(responseJson2){
    $('#video-results').empty();
    console.log(responseJson2);
    for (let i = 0; i < responseJson2.items.length; i++){
        $('#video-results').append(
            `<div class="video" onClick="window.open('https://www.youtube.com/watch?v=${responseJson2.items[i].id.videoId}', '_blank');">
                <img src="${responseJson2.items[i].snippet.thumbnails.high.url}">
                    <div class="video-info">
                        <h3>${responseJson2.items[i].snippet.title}</h3>
                        <h4>Video by: ${responseJson2.items[i].snippet.channelTitle}</h4> 
                    </div>
             </div>`
        )};
};

function searchBarWatchForm(){
    $('#search-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#search-input').val();
        getCards(searchTerm);
    });
};

$(searchBarWatchForm);