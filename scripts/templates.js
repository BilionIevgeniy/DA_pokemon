export function generatePokemonCardTemplate(pokemon) {
  const { id, sprites, types, name, bgColor } = pokemon;
  const pokemonsName = name.charAt(0).toUpperCase() + name.slice(1);
  const src = sprites.other["official-artwork"].front_default;
  return /*html*/ `
    <div style="background-color:${bgColor}" data-action="openPokemonsModal" class="card pokemon-card" data-id="${id}">
        <h2>${pokemonsName}</h2>
        ${generatePokemonsTypes(types)}
        <div class="sprite">
          <img src="${src}" alt="${pokemonsName}">
        </div>
        
    </div>
  `;
}

function generatePokemonsTypes(types) {
  return /*html*/ `
    <div class="types">
          ${types.map(({ type }) => `<span>${type.name}</span>`).join(" ")}
    </div>
  `;
}

export function generatePokemonsModalTemplate(currentPokemon) {
  const {
    id,
    name,
    stats,
    sprites,
    pokedex_numbers,
    height,
    weight,
    base_experience,
  } = currentPokemon;
  const src = sprites.other.showdown.front_default;
  const pokemonsName = name.charAt(0).toUpperCase() + name.slice(1);
  return /*html*/ `
    <div class="card modal-card" data-id="${id}" data-content="">
      <div data-action="closeModalAction" class="close_pokemon">X</div>
      <div class="pokemon_image">
        <img src="assets/img/bg.png" alt="background image">
        <img class="pokemons_gif" src="${src}" alt="pokemons gif">
      </div>
      <div class="main_content">
        <ul class="stats-links" data-action="openMadalStatsContent">
          <li class="active-link" data-content="1">General</li>
          <li data-content="2">Base Statistic</li>
          <li data-content="3">Regional Indexes</li>
        </ul>
        <div class="stats-content-wrapper">
          <div class="active stats-content">
            <p><span>Name:</span> ${pokemonsName}</p>
            <p><span>Heigth:</span> ${height}</p>
            <p><span>Weigth:</span> ${weight}</p>
            <p><span>Base Experience:</span> ${base_experience}</p>
          </div>
          <div class="stats-content" data-data='${JSON.stringify(stats)}'><canvas></canvas></div>
          <div class="stats-content" data-data='${JSON.stringify(pokedex_numbers)}'><canvas></canvas></div>
        </div>

        <div class="buttons-wrapper">
          <button data-action="prevModalContent" color="prev">PREV</button>
          <button data-action="nextModalContent" color="next">NEXT</button>
        </div>
      </div>

</div>
  `;
}
