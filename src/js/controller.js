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
import previewView from "./views/previewView.js";
import paginationView from "./views/paginationView.js";
import { forcedReload } from "./helpers.js";

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

    // Render loading animation
    controlLoadAnimation();

    // Disable nav buttons
    landingPageView.toggleOverlay();

    // load weather data from the model
    await model.getCurrentWeather(city);

    await model.getSevenDaysForecast(city);

    await model.getWeatherForSavedCities();

    // Render Data for each element
    sevenDayView.render(model.state);
    hourlyView.render(model.state);
    detailsView.render(model.state);
    cityView.render(model.state);
    settingsView.render(model.state);
    citiesView.render(model.state);
    previewView.render(model.state);
    detailSectionView.render(model.state);

    // Insert city data
    cityView.insertCity();

    // Insert hourly data
    hourlyView.insertHourly();

    // Insert details data
    detailsView.insertDetails();

    // Insert seven day forecast data
    sevenDayView.insertDays();

    // Enable overlay
    landingPageView.toggleOverlay();
  } catch (err) {
    console.error(err);
    cityView.renderError("Failed to fetch");
    controlLoadAnimation(true);
    landingPageView.toggleOverlay();

    // Reload the page by force after 2s
    forcedReload();
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
  controlLanding(false);
};

const controlLanding = function (update = true) {
  landingPageView.enableActive();
  controlActiveElement(landingPageView);

  landingPageView.reviveContentContainer();
  settingsView.clearSettingsContainer();
  citiesView.clearContainer();
  detailSectionView.clearDetailsContainer();
  detailSectionView.disableResponsive();
  settingsView.disableResponsive();
  citiesView.disableResponsive();

  // Update DOM components
  if (!update) return;
  cityView.update(model.state);
  detailsView.update(model.state);
  hourlyView.update(model.state);
  sevenDayView.update(model.state);
};

const controlSettings = function () {
  settingsView.enableActive();
  controlActiveElement(settingsView);

  detailSectionView.disableResponsive();
  landingPageView.clearContentContainer();
  citiesView.clearContainer();
  detailSectionView.clearDetailsContainer();
  settingsView.insertElements();
  settingsView.enableResponsive();
  citiesView.disableResponsive();
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

  landingPageView.clearContentContainer();
  settingsView.clearSettingsContainer();
  detailSectionView.clearDetailsContainer();

  const results = model.getCitiesPage(model.state.page);

  paginationView.render(model.state);
  paginationView.insertPagination();

  citiesView.pageResult = results;

  if (!document.querySelector(".city-saved")) {
    citiesView.insertCities();
    citiesView._reviveCities();
  } else citiesView._reviveCities();

  if (!document.querySelector(".preview-city")) previewView.insertPreview();

  detailSectionView.disableResponsive();
  settingsView.disableResponsive();
  citiesView.enableResponsive();

  //Update preview
  previewView.update(model.state);
  citiesView.update(model.state);
};

const controlActiveCities = async function () {
  const city = citiesView.target;
  if (!city) return;
  await controlShowWeather(city);
  previewView.insertPreview();
};

const controlPagination = function (page) {
  const results = model.getCitiesPage(page);
  citiesView.pageResult = results;
  citiesView.insertCities();

  model.state.page = page;

  paginationView.render(model.state);
  paginationView.insertPagination();
};

const controlDetails = function () {
  detailSectionView.enableActive();
  controlActiveElement(detailSectionView);

  // Clear the page
  landingPageView.clearContentContainer();
  settingsView.clearSettingsContainer();
  citiesView.clearContainer();

  if (!document.querySelector(".air-quality-section"))
    detailSectionView.insertDetails();
  else detailSectionView.reviveContainer();

  // Insert components
  if (!document.querySelector(".preview-city")) previewView.insertPreview();
  previewView.revivePreview();

  detailSectionView.enableResponsive();
  settingsView.disableResponsive();
  citiesView.disableResponsive();

  detailSectionView.update(model.state);
  previewView.update(model.state);
};

const controlActiveElement = function (enabled) {
  navElements.forEach((el) => {
    if (el === enabled) return;
    el.disableActive();
  });
};

const controlSavedCity = function (btn) {
  if (Object.keys(model.state.savedCities).includes(model.state.activeCity)) {
    model.deleteSavedCity(model.state.activeCity);
  } else {
    model.addSavedCity(model.state.activeCity);
  }

  cityView.toggleAnimation(btn);
  cityView.update(model.state);
  // cityView.render(model.state);
  // cityView.insertCity();

  let results = model.getCitiesPage(model.state.page);
  if (Object.keys(results).length === 0 && model.state.page > 1) {
    model.state.page--;
    results = model.getCitiesPage(model.state.page);
  }
  citiesView.pageResult = results;
  citiesView._clear();
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
  citiesView.addHandlerCity(controlActiveCities);
  paginationView.addHandlerPagination(controlPagination);
  cityView.addHandlerSave(controlSavedCity);
  landingPageView.addHandlerSeeMore(controlDetails);
};

init();
