import { fetchPokemons } from "../api/api.js";
import { renderPokemons } from "../render.js";

export const ACTION_HANDLERS = {
  renderPokemons: handleRenderPokemons,
  setNextUrl: handleSetNextUrl,
  fetchMorePokemons: handleFetchMorePokemons,
};

function handleRenderPokemons(state, { pokemons }) {
  renderPokemons(pokemons);
  state.pokemons = [...state.pokemons, ...pokemons];
  return state;
}

function handleSetNextUrl(state, { nextUrl }) {
  state.nextUrl = nextUrl;
  return state;
}

async function handleFetchMorePokemons(state) {
  await fetchPokemons(state.nextUrl);
  return state;
}
