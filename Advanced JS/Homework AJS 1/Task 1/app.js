const planetEl = document.querySelector(".planet-name");
const buttonFirstPage = document.querySelector(".button");
const buttonNextPage = document.querySelector(".button-next");
const buttonPreviousPage = document.querySelector(".button-previous");
const loading = document.querySelector(".loading");
const starWarsApiFirstPage = "https://swapi.dev/api/planets/?page=1";
const starWarsApiSecondPage = "https://swapi.dev/api/planets/?page=2";

buttonNextPage.style.visibility = "hidden";
buttonPreviousPage.style.visibility = "hidden";

buttonFirstPage.addEventListener("click", () => {
  fetch(starWarsApiFirstPage)
    .then((response) => response.json())
    .then((data) => renderPlanets(data, planetEl));
  loading.textContent = `Loading...`;
  buttonNextPage.style.visibility = "visible";
});

buttonNextPage.addEventListener("click", () => {
  fetch(starWarsApiSecondPage)
    .then((response) => response.json())
    .then((data) => renderPlanets(data, planetEl));
  loading.textContent = `Loading...`;
  buttonNextPage.style.visibility = "hidden";
  buttonPreviousPage.style.visibility = "visible";
});

buttonPreviousPage.addEventListener("click", () => {
  fetch(starWarsApiFirstPage)
    .then((response) => response.json())
    .then((data) => renderPlanets(data, planetEl));
  loading.textContent = `Loading...`;
  buttonNextPage.style.visibility = "visible";
  buttonPreviousPage.style.visibility = "hidden";
});

const renderPlanets = (data, element) => {
  loading.textContent = "";
  element.innerHTML = "";
  data.results.forEach(
    (planet) =>
      (element.innerHTML += `<tr><td>${planet.name}</td> <td>${planet.population}</td> <td>${planet.climate}</td> <td>${planet.gravity}</td></tr>`)
  );
};
