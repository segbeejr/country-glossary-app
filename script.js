document.addEventListener("DOMContentLoaded", init);

function init() {
  const continentSelect = document.getElementById("continent");
  const searchInput = document.getElementById("search");
  const countryList = document.getElementById("country-list");

  continentSelect.addEventListener("change", onContinentSelect);
  searchInput.addEventListener("input", onSearchInput);

  fetchCountries("africa");

  function onContinentSelect() {
    const selectedContinent = continentSelect.value;
    fetchCountries(selectedContinent);
  }

  function onSearchInput() {
    const searchValue = searchInput.value.toLowerCase();
    const countryCards = countryList.getElementsByClassName("countryDiv");

    Array.from(countryCards).forEach(function(card) {
      const countryName = card.getElementsByTagName("h3")[0].innerText.toLowerCase();
      card.style.display = countryName.includes(searchValue) ? "block" : "none";
    });
  }

  function fetchCountries(continent) {
    const url = `https://restcountries.com/v3.1/region/${continent}`;

    fetch(url)
      .then(handleResponse)
      .then(displayCountries)
      .catch(handleError);
  }

  function handleResponse(response) {
    return response.json();
  }

  function displayCountries(data) {
    countryList.innerHTML = "";

    data.forEach(function(country) {
      const flag = country.flags.png;
      const name = country.name.common;
      const population = country.population;

      const countryCard = createCountryCard(flag, name, population);
      countryList.appendChild(countryCard);
    });
  }

  function createCountryCard(flag, name, population) {
    const countryCard = document.createElement("div");
    countryCard.className = "countryDiv";

    const flagImage = document.createElement("img");
    flagImage.src = flag;
    flagImage.alt = `${name} flag`;
    countryCard.appendChild(flagImage);

    const countryName = document.createElement("h3");
    countryName.textContent = name;
    countryCard.appendChild(countryName);

    const countryPopulation = document.createElement("p");
    countryPopulation.textContent = `Population: ${population}`;
    countryCard.appendChild(countryPopulation);
    return countryCard;
  }

  function handleError(error) {
    console.log(error);
  }
}