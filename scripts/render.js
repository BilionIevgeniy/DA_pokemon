import { generatePokemonCardTemplate } from "./templates.js";

export function renderPokemons(pokemons) {
  const container = document.querySelector(".pokemon-cards-wrapper");

  container.innerHTML += [...pokemons]
    .map((pokemon) => generatePokemonCardTemplate(pokemon))
    .join("");
}
