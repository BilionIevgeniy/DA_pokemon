import { getFromLocalStorage } from "./store/store.js";
import { addListeners } from "./listeners.js";
import { renderPokemons } from "./render.js";
import { fetchPokemons } from "./api/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  // getFromLocalStorage();
  await fetchPokemons();
  addListeners();
});
