import {
  closeModalAction,
  fetchPokemonAction,
  filterPokemonsAction,
  openPokemonsModalAction,
} from "./actions.js";

export const ACTION_HANDLERS = {
  fetchPokemonsAction: handleFetchPokemons,
  filterPokemonsAction: handleFilterPokemons,
  openPokemonsModalAction: handleOpenPokemonsModal,
  closeModalAction: handleCloseModal,
  nextModalContentAction: handleNextModalContent,
};

function handleFetchPokemons(state) {
  const newState = fetchPokemonAction(state);
  return newState;
}

function handleFilterPokemons(state, { event }) {
  filterPokemonsAction(state);
  return state;
}

function handleOpenPokemonsModal(state, { id }) {
  return openPokemonsModalAction(state, id);
}

function handleCloseModal(state, { event }) {
  closeModalAction(event);
  return state;
}

function handleNextModalContent(state, payload) {
  return state;
}
