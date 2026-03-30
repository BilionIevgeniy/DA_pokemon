import {
  fetchPokemon,
  fetchPokemons,
  fetchPokemonSpecies,
} from "../api/api.js";
import { modal } from "../existedElements.js";
import { calcScroll, getRandomHexColor } from "../helpers/helpers.js";
import { renderPokemons } from "../render.js";
import { generatePokemonsModalTemplate } from "../templates.js";

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

export async function openPokemonsModalAction(state, id) {
  const currentPokemon = state.pokemons.find((pokemon) => pokemon.id == id);
  const pokemonsSpecies = state.pokemonsSpeciec.find(
    (pokemon) => pokemon.id == id,
  );
  if (!pokemonsSpecies) {
    const currentPokemonsSpecies = await fetchPokemonSpecies(id);
    state.pokemonsSpeciec.push(currentPokemonsSpecies);
  }
  const modalContent = generatePokemonsModalTemplate({
    ...currentPokemon,
    ...pokemonsSpecies,
  });
  modal.style.display = "flex";
  modal.innerHTML = modalContent;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${calcScroll()}px`;
  return state;
}

export function closeModalAction(event) {
  if (modal == event.target) {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";
  }
}
