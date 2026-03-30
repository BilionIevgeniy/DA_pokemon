import {
  closeModalAction,
  fetchPokemonAction,
  filterPokemonsAction,
  nextModalContentAction,
  openMadalStatsContentAction,
  openPokemonsModalAction,
} from "./actions.js";

export const ACTION_HANDLERS = {
  fetchPokemonsAction: handleFetchPokemons,
  filterPokemonsAction: handleFilterPokemons,
  openPokemonsModalAction: handleOpenPokemonsModal,
  closeModalAction: handleCloseModal,
  nextModalContentAction: handleNextModalContent,
  prevModalContentAction: handlePrevModalContent,
  openMadalStatsContent: handleOpenMadalStatsContent,
};

function handleFetchPokemons(state) {
  const newState = fetchPokemonAction(state);
  return newState;
}

function handleFilterPokemons(state, { event }) {
  filterPokemonsAction(state, event);
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
  return nextModalContentAction(state, true);
}

function handlePrevModalContent(state, payload) {
  return nextModalContentAction(state);
}

function handleOpenMadalStatsContent(state, { event }) {
  const target = event.target;
  openMadalStatsContentAction(target);
  return state;
}
