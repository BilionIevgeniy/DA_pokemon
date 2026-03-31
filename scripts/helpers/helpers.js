export function calcScroll() {
  let div = document.createElement("div");
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}

export function getPokemonsColor(type) {
  const colors = {
    grass: "#70ec32",
    fire: "#e8731f",
    water: "#376eef",
    bug: "#859024",
    flying: "#8b6de6",
    normal: "#c6c67e",
    electric: "#5695d1",
    ice: "#3654dd",
    fighting: "#ef5d55",
    poison: "#e147e1",
    ground: "#6c5b2c",
    psychic: "#5b1b62",
    rock: "#c3c198",
    ghost: "#6c6773",
    dragon: "#3d1a8f",
    dark: "#3a2d25",
    steel: "#74747b",
    fairy: "#f18892",
    stellar: "#39525e",
  };
  return colors[type];
}
