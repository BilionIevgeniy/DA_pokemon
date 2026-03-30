import Chart from "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js";

import {
  fetchPokemon,
  fetchPokemons,
  fetchPokemonsSpecies,
} from "../api/api.js";
import { modal, spinner } from "../existedElements.js";
import { calcScroll, getRandomHexColor } from "../api/helpers/helpers.js";
import { renderPokemons } from "../render.js";
import { generatePokemonsModalTemplate } from "../templates.js";

export async function fetchPokemonAction(state) {
  showSpinner(true);
  const data = await fetchPokemons(state.nextUrl);

  const { results, next } = data;

  const pokemons = [];
  for (const pokemon of results) {
    const pokemonsData = await fetchPokemon(pokemon.url);
    const bgColor = getRandomHexColor();
    pokemons.push({ ...pokemon, ...pokemonsData, bgColor });
  }
  showSpinner(false);

  renderPokemons(pokemons);
  state.pokemons = [...state.pokemons, ...pokemons];
  state.nextUrl = next;
  return state;
}

export function filterPokemonsAction(state, event) {
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
  const [newState, modalContent] = await getModalsContent(state, id);
  state.currentPokemonsId = id;
  showModal(modalContent);
  return newState;
}

export function closeModalAction(event) {
  if (modal == event.target) {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";
  }
}

export async function nextModalContentAction(state, isNext) {
  const pokemonsIndex = calcPokemonsIndex(state, isNext);
  const { id } = state.pokemons[pokemonsIndex];
  const [newState, modalContent] = await getModalsContent(state, id);
  state.currentPokemonsId = id;
  modal.innerHTML = modalContent;
  return newState;
}

// HELPRES
function showSpinner(show) {
  spinner.style.display = show ? "flex" : "none";
}

function showModal(modalContent) {
  modal.style.display = "flex";
  modal.innerHTML = modalContent;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${calcScroll()}px`;
}

function calcPokemonsIndex(state, isNext) {
  let currentPokemonsIdx = state.pokemons.findIndex(
    (pokemon) => pokemon.id == state.currentPokemonsId,
  );
  if (currentPokemonsIdx === 0 && !isNext) {
    currentPokemonsIdx = state.pokemons.length - 1;
  } else if (currentPokemonsIdx === state.pokemons.length - 1 && isNext) {
    currentPokemonsIdx = 0;
  } else {
    currentPokemonsIdx = isNext
      ? currentPokemonsIdx + 1
      : currentPokemonsIdx - 1;
  }
  return currentPokemonsIdx;
}

async function getModalsContent(state, id) {
  const currentPokemon = state.pokemons.find((pokemon) => pokemon.id == id);
  let pokemonsSpecies = state.pokemonsSpecies.find(
    (pokemon) => pokemon.id == id,
  );
  if (!pokemonsSpecies) {
    showSpinner(true);
    pokemonsSpecies = await fetchPokemonsSpecies(id);
    showSpinner();
    state.pokemonsSpecies.push(pokemonsSpecies);
  }

  const modalContent = generatePokemonsModalTemplate({
    ...currentPokemon,
    ...pokemonsSpecies,
  });
  return [state, modalContent];
}

export function openMadalStatsContentAction(target) {
  const { content } = target.dataset || {};
  const card = target.closest(".card");
  const ctx = card.querySelector(`.stats-content:nth-child(${content})`);
  generateStats(ctx);
}

function generateStats(ctx) {
  const char = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
