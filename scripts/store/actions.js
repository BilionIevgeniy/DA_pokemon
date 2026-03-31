import Chart from "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/auto/+esm";
import {
  fetchPokemon,
  fetchPokemons,
  fetchPokemonsSpecies,
} from "../api/api.js";
import { modal, morePokemonsBtn, spinner } from "../existedElements.js";
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
    showMorePokemonsBtn(false);
    const filteredPokemons = state.pokemons.filter((pokemon) =>
      pokemon.name.includes(value.toLowerCase()),
    );
    state.filteredPokemons = filteredPokemons;
    renderPokemons(filteredPokemons, true);
  } else {
    showMorePokemonsBtn(true);
    state.filteredPokemons = null;
    renderPokemons(state.pokemons);
  }
  return state;
}

export async function openPokemonsModalAction(state, id) {
  const [newState, modalContent] = await getModalsContent(state, id);
  state.currentPokemonsId = id;
  showModal(modalContent);
  return newState;
}

export function closeModalAction(event) {
  if (
    modal == event.target ||
    event.target.classList.contains("close_pokemon")
  ) {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";
  }
}

export async function nextModalContentAction(state, isNext) {
  const pokemons = state.filteredPokemons || state.pokemons;
  const pokemonsIndex = calcPokemonsIndex(state, isNext);
  const { id } = pokemons[pokemonsIndex];
  const [newState, modalContent] = await getModalsContent(state, id);
  state.currentPokemonsId = id;
  modal.innerHTML = modalContent;
  return newState;
}

export function openMadalStatsContentAction(target) {
  const { content } = target.dataset || {};
  if (!content) return;
  const card = target.closest(".card");
  const allContainers = card.querySelectorAll(`.stats-content`);
  const allLinkContainers = card.querySelectorAll(`.stats-links li`);
  console.log(allLinkContainers);

  allLinkContainers.forEach((item) => item.classList.remove("active_link"));
  target.classList.add("active_link");
  allContainers.forEach((item) => item.classList.remove("active"));
  const container = card.querySelector(`.stats-content:nth-child(${content})`);
  container.classList.add("active");

  const ctx = container.querySelector("canvas");
  const { data } = container.dataset || {};
  console.log(ctx.innerHTML);

  if (ctx && data) {
    generateStats(ctx, data);
  }
}

// HELPRES
function showSpinner(show) {
  spinner.style.display = show ? "flex" : "none";
}
function showMorePokemonsBtn(show) {
  morePokemonsBtn.style.display = show ? "block" : "none";
}

function showModal(modalContent) {
  modal.style.display = "flex";
  modal.innerHTML = modalContent;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${calcScroll()}px`;
}

function calcPokemonsIndex(state, isNext) {
  const pokemons = state.filteredPokemons || state.pokemons;
  let currentPokemonsIdx = pokemons.findIndex(
    (pokemon) => pokemon.id == state.currentPokemonsId,
  );
  if (currentPokemonsIdx === 0 && !isNext) {
    currentPokemonsIdx = pokemons.length - 1;
  } else if (currentPokemonsIdx === pokemons.length - 1 && isNext) {
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

function generateStats(ctx, data) {
  const [statsLabels, statsValue, statsLabel] = generateStatsData(
    JSON.parse(data),
  );
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: statsLabels,
      datasets: [
        {
          label: statsLabel,
          data: statsValue,
          borderWidth: 1,
          backgroundColor: getRandomHexColor(),
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });
}

function generateStatsData(data) {
  let statsLabels = [];
  let statsValue = [];
  let statsLabel = "";
  data.forEach((item) => {
    if (item.base_stat) {
      statsLabels.push(item.stat.name);
      statsValue.push(item.base_stat);
      statsLabel = "Base Statistic";
    } else {
      statsLabels.push(item.pokedex.name);
      statsValue.push(item.entry_number);
      statsLabel = "Regional Indexes";
    }
  });
  return [statsLabels, statsValue, statsLabel];
}
