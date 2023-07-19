document.addEventListener("DOMContentLoaded", init);

function init() {
  const continentSelect = document.getElementById("continent");
  const searchInput = document.getElementById("search");
  const countryList = document.getElementById("country-list");
  const detailView = document.getElementById("detail-view");
  const closeButton = document.getElementById("close-button");

  continentSelect.addEventListener("change", onContinentSelect);
  searchInput.addEventListener("input", onSearchInput);

  fetchCountries("africa");

  function onContinentSelect() {
    const selectedContinent = continentSelect.value;
    fetchCountries(selectedContinent);
  }

  function onSearchInput() {
    const searchValue = searchInput.value.toLowerCase();
    let countryCards = [...document.querySelectorAll(".countryDiv")];

    countryCards.forEach((card) => {
      const countryName = card.querySelector("h3").innerText.toLowerCase();
      if (countryName.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
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

    data.forEach(function (country) {
      const flag = country.flags.png;
      const name = country.name.common;
      const capital = country.capital[0] || "N/A";
      const population = country.population.toLocaleString();
      const region = country.region;
      const subRegion = country.subregion;
      const language = country.languages[Object.keys(country.languages)[0]] || "N/A";
      const timezone = country.timezone || "N/A";

      const countryCard = createCountryCard(flag, name, population);
      countryCard.addEventListener("click", () => {
        showDetailView(flag, name, capital, population, region, subRegion, language, timezone);
      });

      countryList.appendChild(countryCard);
    });
  }

  function createCountryCard(flag, name, population) {
    let countryCard = document.createElement("div");
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

  function showDetailView(flag, name, capital, population, region, subRegion, language, timezone) {
    const flagImg = document.getElementById("flag-img");
    const countryName = document.getElementById("country-name");
    const countryCapital = document.getElementById("country-capital");
    const countryPopulation = document.getElementById("country-population");
    const countryRegion = document.getElementById("country-region");
    const countrySubRegion = document.getElementById("country-subregion");
    const countryLanguage = document.getElementById("country-language");
    const countryTimezone = document.getElementById("country-timezone");

    flagImg.src = flag;
    countryName.textContent = name;
    countryCapital.textContent = `Capital: ${capital}`;
    countryPopulation.textContent = `Population: ${population}`;
    countryRegion.textContent = `Region: ${region}`;
    countrySubRegion.textContent = `Subregion: ${subRegion}`;
    countryLanguage.textContent = `Language: ${language}`;
    countryTimezone.textContent = `Timezone: ${timezone}`;

    detailView.style.display = "block";
  }

  closeButton.addEventListener("click", () => {
    detailView.style.display = "none";
    
  });
}
