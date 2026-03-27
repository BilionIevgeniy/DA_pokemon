import { applyAction } from "./store/store.js";

const wrapper = document.querySelector(".pokemon-cards-wrapper");
const morePokemonsBtn = document.querySelector(".more-pokemons-btn");

function onAction(event) {
  const { action } = event.target.closest("[data-action]")?.dataset || {};
  if (!action) return;
  const card = event.target.closest(".card");

  if (card) {
    const { id } = card.dataset;
    applyAction(action, { id });
  } else {
    applyAction(action);
  }
}

export function addListeners() {
  wrapper.addEventListener("click", onAction);
  morePokemonsBtn.addEventListener("click", onAction);
}
