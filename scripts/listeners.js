import {
  filterNameInput,
  morePokemonsBtn,
  wrapper,
  modal,
} from "./existedElements.js";
import { applyAction } from "./store/store.js";

function onAction(event) {
  const { action } = event.target.closest("[data-action]")?.dataset || {};
  if (!action) return;
  const { id } = event.target.closest("[data-id]")?.dataset || {};
  applyAction(action, { id, event });
}

export function addListeners() {
  wrapper.addEventListener("click", onAction);
  morePokemonsBtn.addEventListener("click", onAction);
  modal.addEventListener("click", onAction);
  filterNameInput.addEventListener("input", onAction);
}
