import { applyAction } from "../store/store.js";

export async function fetchPokemons(url) {
  try {
    const baseUrl =
      url || "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    const data = await fetchData(baseUrl);
    const { results, next } = data;
    const pokemons = [];
    for (const pokemon of results) {
      const pokemonsData = await fetchPokemon(pokemon.url);
      pokemons.push({ ...pokemon, ...pokemonsData });
    }

    applyAction("renderPokemons", {
      pokemons,
    });
    applyAction("setNextUrl", {
      nextUrl: next,
    });
  } catch (error) {
    console.warn(error);
  }
}

export async function fetchPokemon(url) {
  const data = await fetchData(url);
  return data;
}

export async function fetchData(url, options = {}) {
  let data;
  try {
    const rowdata = await fetch(url, options);
    data = await rowdata.json();
  } catch (error) {
    console.warn(error);
  }

  return data;
}
