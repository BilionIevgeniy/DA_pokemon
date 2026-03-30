import { fetchPokemon, fetchPokemons } from "../api/api.js";
import { getRandomHexColor } from "../helpers/helpers.js";
import { renderPokemons } from "../render.js";

export async function fetchPokemonAction(state) {
  const data = await fetchPokemons(state.nextUrl);
  const { results, next } = data;

  const pokemons = [];
  for (const pokemon of results) {
    const pokemonsData = await fetchPokemon(pokemon.url);
    const bgColor = getRandomHexColor();
    pokemons.push({ ...pokemon, ...pokemonsData, bgColor });
  }

  renderPokemons(pokemons);
  state.pokemons = [...state.pokemons, ...pokemons];
  state.nextUrl = next;
  return state;
}

export function filterPokemonsAction(state) {
  const value = event.target.value;
  if (value) {
    const filteredPokemons = state.pokemons.filter((pokemon) =>
      pokemon.name.includes(value.toLowerCase()),
    );
    renderPokemons(filteredPokemons, true);
  } else {
    renderPokemons(state.pokemons);
  }
}
