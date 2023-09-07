
const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon ()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types =  types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset= 0, limit= 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    // Buscando a lista de pokemons
    return fetch(url)
        // Converte o Response do Body para Json (Notação de Objeto Javascript)
        .then((response) => response.json())
        // Recebe a lista de pokemons (Resultados da API)
        .then((jsonBody) => jsonBody.results)
        // Mapeia a lista de pokemons para uma lista de requisicoes de detalhes de pokemons
        .then((pokemons) =>  pokemons.map(pokeApi.getPokemonDetail))
        // Esperando que todas as requisições terminem
        .then((detailsRequests) => Promise.all(detailsRequests))
        // Retornando a lista de detalhes de pokemons
        .then((pokemonsDetails) => pokemonsDetails)
}

