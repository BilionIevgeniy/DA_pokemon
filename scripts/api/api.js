export async function fetchPokemons(url) {
  let data;
  try {
    const baseUrl =
      url || "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    data = await fetchData(baseUrl);
  } catch (error) {
    console.warn(error);
  }
  return data;
}

export async function fetchPokemon(url) {
  const data = await fetchData(url);
  return data;
}

export async function fetchPokemonSpecies(id) {
  const url = "https://pokeapi.co/api/v2/pokemon-species/" + id;
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
  } finally {
  }

  return data;
}
