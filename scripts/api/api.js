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

export async function fetchPokemonsSpecies(id) {
  const url = "https://pokeapi.co/api/v2/pokemon-species/" + id;
  const data = await fetchData(url);
  return data;
}

export async function fetchPokemonsGender(id) {
  const url = "https://pokeapi.co/api/v2/gender/" + id;
  const data = await fetchData(url);
  return data;
}

export async function fetchData(url, options = {}) {
  let data;
  try {
    const rowdata = await fetch(url, options);
    data = await rowdata.json();
  } catch (error) {
    throw new Error(error);
  }
  return data;
}
