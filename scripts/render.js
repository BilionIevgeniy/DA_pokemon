import { generatePokemonCardTemplate } from "./templates.js";

export function renderPokemons(pokemons, replace) {
  const container = document.querySelector(".pokemon-cards-wrapper");
  if (replace) {
    container.innerHTML =
      pokemons.length > 0
        ? [...pokemons]
            .map((pokemon) => generatePokemonCardTemplate(pokemon))
            .join("")
        : '<span class="no_pokemons">Try another Name</span>';
  } else {
    container.innerHTML += [...pokemons]
      .map((pokemon) => generatePokemonCardTemplate(pokemon))
      .join("");
  }
}
