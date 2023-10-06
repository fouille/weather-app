import * as model from "./model.js";
import landingPageView from "./views/landingPageView.js";
import sevenDayView from "./views/sevenDayView.js";
import hourlyView from "./views/hourlyView.js";
import detailsView from "./views/detailsView.js";
import cityView from "./views/cityView.js";
import searchView from "./views/searchView.js";
import settingsView from "./views/settingsView.js";
import citiesView from "./views/citiesView.js";
import detailSectionView from "./views/detailSectionView.js";

const navElements = [
  landingPageView,
  settingsView,
  citiesView,
  detailSectionView,
];

const controlShowWeather = async function (city = undefined) {
  try {
    if (typeof city === "object") {
      city = await model.getLocation();
      if (!city) city = "Zhytomyr";
    }
    // load weather data from the model
    await model.getCurrentWeather(city);

    await model.getFiveDaysForecast(city);

    // Render loading animation
    controlLoadAnimation();

    // Render Data for each element
    sevenDayView.render(model.state);
    hourlyView.render(model.state);
    detailsView.render(model.state);
    cityView.render(model.state);
    settingsView.render(model.state);

    // Insert city data
    cityView.insertCity();

    // Insert hourly data
    hourlyView.insertHourly();

    // Insert details data
    detailsView.insertDetails();

    // Insert seven day forecast data
    sevenDayView.insertDays();
  } catch (err) {
    console.error(err);
    cityView.renderError("Failed to fetch");
    controlLoadAnimation(true);
  }
};

const controlLoadAnimation = function (error = false) {
  sevenDayView.renderLoading();
  hourlyView.renderLoading();
  detailsView.renderLoading();
  if (!error) cityView.renderSpinner();
};

const controlSearchResult = function () {
  const query = searchView.getQuery();
  if (!query) return;
  controlShowWeather(query);
};

const controlLanding = function () {
  landingPageView.enableActive();
  controlActiveElement(landingPageView);

  landingPageView.reviveContentContainer();
  settingsView.clearSettingsContainer();

  // Update DOM components
  cityView.update(model.state);
  detailsView.update(model.state);
  hourlyView.update(model.state);
  sevenDayView.update(model.state);
};

const controlSettings = function () {
  settingsView.enableActive();
  controlActiveElement(settingsView);

  landingPageView.clearContentContainer();
  settingsView.insertElements();
};

const controlSettingsOption = function (target) {
  settingsView.toggleActive(model.saveOptions(target));
};

const controlGeneralSettings = function (target) {
  model.saveGeneral(target);
};

const controlCities = function () {
  citiesView.enableActive();
  controlActiveElement(citiesView);
};

const controlDetails = function () {
  detailSectionView.enableActive();
  controlActiveElement(detailSectionView);
};

const controlActiveElement = function (enabled) {
  navElements.forEach((el) => {
    if (el === enabled) return;
    el.disableActive();
  });
};

const init = function () {
  landingPageView.addHandlerRender(controlShowWeather);
  searchView.addHandlerSearch(controlSearchResult);
  landingPageView.addHandlerClick(controlLanding);
  settingsView.addHandlerClick(controlSettings);
  citiesView.addHandlerClick(controlCities);
  detailSectionView.addHandlerClick(controlDetails);
  settingsView.addHandlerSettings(controlSettingsOption);
  settingsView.addHandlerGeneralSettings(controlGeneralSettings);
};

init();
