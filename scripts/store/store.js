import { initialState } from "../../db.js";
import { ACTION_HANDLERS } from "./hendlers.js";

export let state = { ...initialState };

export function applyAction(action, payload = {}) {
  const handler =
    ACTION_HANDLERS[action] ||
    function () {
      console.warn("no action: " + action);
    };
  state = handler(state, payload);
  // saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem("pokemonsState", JSON.stringify(state));
}

export function getFromLocalStorage() {
  const lsState = JSON.parse(localStorage.getItem("pokemonsState"));
  if (lsState) {
    Object.assign(state, lsState);
  }
}
