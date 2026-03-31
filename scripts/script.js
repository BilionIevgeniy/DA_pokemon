import { addListeners } from "./listeners.js";
import { applyAction } from "./store/store.js";

document.addEventListener("DOMContentLoaded", async () => {
  applyAction("fetchPokemons");
  addListeners();
});
