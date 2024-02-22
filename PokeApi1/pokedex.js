const myMain$$ = document.querySelector("#pokedex");

/*
Esta función asincrónica fetchPokemons realiza una solicitud a la API de Pokémon.
  para recuperar datos sobre Pokémon. Se necesita un parámetro de "límite" opcional que
  especifica el número de Pokémon que se van a recuperar. Si no se proporciona, el límite predeterminado es 150.

  @param {número} límite: el límite de Pokémon para recuperar (opcional).
  @returns {Mapa}: un mapa que contiene datos de Pokémon, donde la clave es el número de Pokémon y el valor es la información de Pokémon.
*/
const fetchPokemons = async (limit = 150) => {
  try {
    // Crea un nuevo mapa para almacenar datos de Pokémon
    const pokemonMap = new Map();

    // Iterar a través del límite especificado y realizar solicitudes para obtener datos de Pokémon
    for (let i = 0; i < limit; i++) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
      );
      const pokemonData = await response.json();

      // Almacene datos de Pokémon en el mapa con la clave como número de Pokémon
      pokemonMap.set(i + 1, pokemonData);
    }
    return pokemonMap;
  } catch (error) {
    console.error(error);
  }
};

/*
Esta función drawPokemons genera cartas de Pokémon en función de los datos proporcionados.
  Crea una estructura HTML para cada Pokémon y la agrega al contenedor principal.

  @param {Map} mappedPokemons: un mapa que contiene datos de Pokémon, donde la clave es el número de Pokémon y el valor es la información de Pokémon.
*/
const drawPokemons = (mappedPokemons) => {
  myMain$$.innerHTML = "";
  for (const character of mappedPokemons) {
    const divCards$$ = document.createElement("li");
    let pokeId = character[1].id.toString();
    if (pokeId.length === 1) {
      pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
      pokeId = "0" + pokeId;
    }
    const type =
      (character[1].types[0] && character[1].types[0].type.name) || "";
    const type2 =
      (character[1].types[1] && character[1].types[1].type.name) || "";
    const imgSrc = character[1].sprites.other.home.front_default;
    const shinyImgSrc = character[1].sprites.other.home.front_shiny;

    divCards$$.innerHTML = `
    <div class="pokemon ${type}">
    <div class="pokemon-img">
    <img src="${imgSrc}" alt="${character[1].name}" onmouseover="changeImage(this, '${shinyImgSrc}')"
    onmouseout="changeImage(this, '${imgSrc}')">
    </div>
          <div class="pokemon-inf">
          <div class="pokemon-name">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="name">${character[1].name}</h2>
          </div>
          <div class="pokemon-typ">
          <p class="${type} type">${type}</p>
          <p class="${type2} type">${type2}</p>
              </div>
              <div class="pokemon-stats">
              <p class="stat">${character[1].height}M</p>
              <p class="stat">${character[1].weight}KG</p>
              <p class="stat">${character[1].base_experience}HP</p>
              </div>
              </div>
              </div>
              `;
    myMain$$.appendChild(divCards$$);
  }
};

/*
Esta función changeImage es una función auxiliar que cambia la fuente de un elemento de imagen.

  Elemento @param {HTMLImageElement}: el elemento de imagen que se va a cambiar.
  @param {string} newSrc: la nueva fuente de la imagen.
*/
function changeImage(element, newSrc) {
  element.src = newSrc;
};

/*
Esta función drawInputSearch configura un detector de eventos para que se active el elemento de entrada.
  la función searchPokemon cuando cambia el valor de entrada.

  @param {Mapa} caracteres: un mapa que contiene datos de Pokémon, donde la clave es el número de Pokémon y el valor es la información de Pokémon.
*/
const drawInputSearch = (characters) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () =>
    searchPokemon(characters, input$$.value)
  );
};

/*
Esta función busca Pokémon filtra Pokémon según el texto de filtro proporcionado y muestra los Pokémon filtrados.

  @param {Mapa} caracteres: un mapa que contiene datos de Pokémon, donde la clave es el número de Pokémon y el valor es la información de Pokémon.
  @param {string} filter: el texto del filtro para buscar en nombres o tipos de Pokémon.
*/
const searchPokemon = (characters, filter) => {
  const characterArray = Array.from(characters.entries());
  let filteredCharacter;

  // check if filtee include "type:"
  if (filter.toLowerCase().startsWith("type:")) {
    const searchType = filter.substring(5).toLowerCase();
    filteredCharacter = characterArray.filter(([key, character]) =>
      (character.types[0] && character.types[0].type.name.toLowerCase() === searchType) ||
      (character.types[1] && character.types[1].type.name.toLowerCase() === searchType)
    );
  } else {
    // Filtra por nombre
    filteredCharacter = characterArray.filter(([key, character]) =>
      character.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  drawPokemons(filteredCharacter);
};

/*
Esta función init es el punto de entrada de la aplicación. Obtiene datos de Pokémon, roba las cartas de Pokémon iniciales,
  y configura la funcionalidad de búsqueda de entrada.


  @returns {Promise<void>}: una promesa que se resuelve cuando se completa la inicialización.
*/
const init = async () => {
  const pokemons = await fetchPokemons();
  
  const drawPokemon = drawPokemons(pokemons);

  drawInputSearch(pokemons);
};

// Llame a la función init para iniciar la aplicación.
init();
