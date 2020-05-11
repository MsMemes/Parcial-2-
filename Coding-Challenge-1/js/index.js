
//funcion que hace el fetch a la api
function fectchPoke(poke){
    let url = `https://pokeapi.co/api/v2/pokemon/${poke}/`;

    let settings = {
        method : 'GET'
    };

    let results = document.querySelector('.js-search-results');

    fetch( url, settings )
    .then( response => {
        if(response.ok){
            console.log('here');
            return response.json();
        }
        else{
            
            throw new Error (response.statusText);
        }
    })
    .then( responseJSON => {
        results.innerHTML = "";
        results.innerHTML = `
        <div class="pokemon">
            <div>
                ${responseJSON.name}
            </div>
            <div>
                <img src="${responseJSON.sprites.front_shiny}">
            </div>
            <div>
                <p> Moves </p>
                <div>
                ${responseJSON.moves[0].move.name}
                </div>
                <div>
                ${responseJSON.moves[1].move.name}
                </div>
                <div>
                ${responseJSON.moves[2].move.name}
                </div>
                <div>
                ${responseJSON.moves[3].move.name}
                </div>
                <div>
                ${responseJSON.moves[4].move.name}
                </div>
            </div>
            <div>
                <p> Stats </p>
                <div>
                ${responseJSON.stats[0].base_stat}
                </div>
                <div>
                ${responseJSON.stats[0].effort}
                </div>
                <div>
                ${responseJSON.stats[0].stat.name}
                </div>
            </div>
        </div>
        `
    })
    .catch( err => {
        results.innerHTML = err.message;
    });
}


//funcion para la parte del form
function pokeForm(){

    let formPoke = document.querySelector('.js-search-form');

    formPoke.addEventListener( 'submit', (event) => {
        event.preventDefault();

        let poke = document.getElementById('query').value;
        console.log(poke);
        fectchPoke(poke);
    })
}

function init(){
    pokeForm();
}

init();