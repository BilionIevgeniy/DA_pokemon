import { modal } from "../existedElements.js";
import { calcScroll, getRandomHexColor } from "../helpers/helpers.js";
import { renderPokemons } from "../render.js";
import { fetchPokemonAction, filterPokemonsAction } from "./actions.js";

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
  const currentPokemon = state.pokemons.find((pokemon) => pokemon.id == id);
  const modalContent = generatePokemonsModalContent(currentPokemon);
  modal.style.display = "flex";
  const scroll = calcScroll();
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scroll}px`;
  return state;
}

function handleCloseModal(state, { event }) {
  if (modal == event.target) {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";
  }
  return state;
}

function handleNextModalContent(state, payload) {
  return state;
}
