import View from "./View.js";

class SettingsView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-4");
  _container = document.querySelector(".content");
  _generalContainer = document.querySelector(".seven-day");
  _seachElement = document.querySelector(".search_form");
  _contentElement = document.querySelector(".content");

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-4");
      if (!target) return;
      callback();
    });
  }

  addHandlerGeneralSettings(callback) {
    this._generalContainer.addEventListener("click", (e) => {
      const toggle = e.target.closest(".toggle-switch");
      if (!toggle) return;
      callback(e.target);
    });
  }

  addHandlerSettings(callback) {
    this._container.addEventListener("click", (e) => {
      const pressure = e.target.closest(".pressure");
      const temperature = e.target.closest(".temperature");
      const distance = e.target.closest(".distance");
      const precipitation = e.target.closest(".precipitation");
      const windSpeed = e.target.closest(".wind-speed");
      if (
        !pressure &&
        !temperature &&
        !distance &&
        !precipitation &&
        !windSpeed
      )
        return;
      callback(e.target);
    });
  }

  toggleActive(target) {
    if (!target) return;
    const elArray = Array.from(
      target.closest(".toggle").querySelectorAll(".toggle-el")
    );
    elArray.forEach((el) => el.classList.remove("toggle-el--active"));
    target.classList.add("toggle-el--active");
  }

  clearSettingsContainer() {
    if (!document.querySelector(".settings")) return;
    const setCont = [
      document.querySelector(".units"),
      document.querySelector(".settings"),
      document.querySelector(".general"),
      document.querySelector(".general-settings"),
      document.querySelector(".sign-up-container"),
    ];
    this._makeInvisible(setCont);
  }

  reviveSettings() {
    const setCont = [
      document.querySelector(".units"),
      document.querySelector(".settings"),
      document.querySelector(".general"),
      document.querySelector(".general-settings"),
      document.querySelector(".sign-up-container"),
    ];
    this._makeVisible(setCont);
  }

  enableResponsive() {
    this._seachElement.classList.add("search--responsive");
    this._contentElement.classList.add("content__settings--responsive");
  }

  disableResponsive() {
    this._seachElement.classList.remove("search--responsive");
    this._contentElement.classList.remove("content__settings--responsive");
  }

  insertElements() {
    if (document.querySelector(".settings")) return this.reviveSettings();
    const html = `<div class="setting-text units">Unités</div>
    <div class="settings">
      <div class="setting-option">
        <div class="setting-o-text">TEMPERATURE</div>
        <div class="toggle-container">
          <div class="toggle temperature">
            <div class="toggle-el ${
              this._data.userSettings.temperature === "celsius"
                ? "toggle-el--active"
                : ""
            } celsius" data-setting="temperature">Celsius</div>
            <div class="toggle-el ${
              this._data.userSettings.temperature === "fahrenheit"
                ? "toggle-el--active"
                : ""
            } fahrenheit" data-setting="temperature">Fahrenheit</div>
          </div>
        </div>
      </div>
      <div class="setting-option">
        <div class="setting-o-text">VITESSE DU VENT</div>
        <div class="toggle-container">
          <div class="toggle wind-speed">
            <div class="toggle-el ${
              this._data.userSettings.windSpeed === "km/h"
                ? "toggle-el--active"
                : ""
            } wind-km" data-setting="windSpeed">km/h</div>
            <div class="toggle-el ${
              this._data.userSettings.windSpeed === "m/h"
                ? "toggle-el--active"
                : ""
            } wind-miles" data-setting="windSpeed">m/h</div>
            <div class="toggle-el ${
              this._data.userSettings.windSpeed === "knots"
                ? "toggle-el--active"
                : ""
            } wind-knots" data-setting="windSpeed">Noeuds</div>
          </div>
        </div>
      </div>
      <div class="setting-option">
        <div class="setting-o-text">PRESSION</div>
        <div class="toggle-container">
          <div class="toggle pressure">
            <div class="toggle-el ${
              this._data.userSettings.pressure === "inches"
                ? "toggle-el--active"
                : ""
            } pressure-in" data-setting="pressure">Pouces</div>
            <div class="toggle-el ${
              this._data.userSettings.pressure === "mb"
                ? "toggle-el--active"
                : ""
            } pressure-mb" data-setting="pressure">mb</div>
            <div class="toggle-el ${
              this._data.userSettings.pressure === "mm"
                ? "toggle-el--active"
                : ""
            } pressure-mm" data-setting="pressure">mm</div>
          </div>
        </div>
      </div>
      <div class="setting-option">
        <div class="setting-o-text">PRECIPITATION</div>
        <div class="toggle-container">
          <div class="toggle precipitation">
            <div class="toggle-el ${
              this._data.userSettings.precipitation === "inches"
                ? "toggle-el--active"
                : ""
            } precipitation-in" data-setting="precipitation">Pouces</div>
            <div class="toggle-el ${
              this._data.userSettings.precipitation === "millimiters"
                ? "toggle-el--active"
                : ""
            } precipitation-mm" data-setting="precipitation">Millimètres</div>
          </div>
        </div>
      </div>
          <div class="setting-option">
        <div class="setting-o-text">DISTANCE</div>
        <div class="toggle-container">
          <div class="toggle distance">
            <div class="toggle-el ${
              this._data.userSettings.distance === "kilometers"
                ? "toggle-el--active"
                : ""
            } distance-km" data-setting="distance">Kilomètres</div>
            <div class="toggle-el ${
              this._data.userSettings.distance === "miles"
                ? "toggle-el--active"
                : ""
            } distance-miles" data-setting="distance">Miles</div>
          </div>
        </div>
      </div>
    </div>
    `;
    this._container.insertAdjacentHTML("beforeend", html);

    const generalhtml = `
    <div class="setting-text general">General</div>
    <div class="general-settings">
      <div class="general-option t-f-hours">
        <div class="general-row">
          <p class="general-text ">Format 24H</p>
          <div class="toggle-switch-container">
            <input type="checkbox" class="toggle-switch" ${
              this._data.generalSettings.TFhours ? "checked" : ""
            } data-general="TFhours">
          </div>
        </div>
      </div>
      <div class="general-option location">
        <div class="general-row">
          <p class="general-text">Lieu</p>
          <div class="toggle-switch-container">
            <input type="checkbox" class="toggle-switch" ${
              this._data.generalSettings.location ? "checked" : ""
            } data-general="location">
          </div>
        </div>
        <div class="general-row row-small">
          <p class="general-desc">Obtenez la météo de votre emplacement</p>
        </div>
      </div>
      <div class="general-option notifications">
        <div class="general-row">
          <p class="general-text ">Notifications</p>
          <div class="toggle-switch-container">
            <input type="checkbox" class="toggle-switch" ${
              this._data.generalSettings.notifications ? "checked" : ""
            } data-general="notifications">
          </div>
        </div>
        <div class="general-row row-small">
          <p class="general-desc">Etre notifié de la météo</p>
        </div>
      </div>
    </div>
    `;
    this._generalContainer.insertAdjacentHTML("beforeend", generalhtml);
  }
}

export default new SettingsView();
