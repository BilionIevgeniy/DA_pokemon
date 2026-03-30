import { generatePokemonCardTemplate } from "./templates.js";

export function renderPokemons(pokemons, replace) {
  const container = document.querySelector(".pokemon-cards-wrapper");
  if (replace) {
    container.innerHTML = [...pokemons]
      .map((pokemon) => generatePokemonCardTemplate(pokemon))
      .join("");
  } else {
    container.innerHTML += [...pokemons]
      .map((pokemon) => generatePokemonCardTemplate(pokemon))
      .join("");
  }
}
