export function generatePokemonCardTemplate(pokemon) {
  const { id, sprites, types, name, bgColor } = pokemon;
  const pokemonsName = name.charAt(0).toUpperCase() + name.slice(1);
  const src = sprites.other["official-artwork"].front_default;
  return /*html*/ `
    <div style="background-color:${bgColor}" data-action="openPokemonsModalAction" class="card pokemon-card" data-id="${id}">
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
          ${types.map(({ type }) => `<span>${type.name}</span>`)}
    </div>
  `;
}

export function generatePokemonsModalTemplate(currentPokemon) {
  log(currentPokemon);
  const { id, name } = currentPokemon;
  const pokemonsName = name.charAt(0).toUpperCase() + name.slice(1);
  return /*html*/ `
    <div class="card pokemon-card" data-id="${id}">
        
        ${pokemonsName}
        
    </div>
  `;
}
