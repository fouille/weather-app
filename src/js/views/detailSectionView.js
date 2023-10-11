import View from "./View.js";
import details from "url:../../../img/svg/details.svg";
import { convertTo24Hour } from "./../helpers.js";

class DetailSectionView extends View {
  _nav = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-3");
  _parentElement = document.querySelector(".details-section-wrapper");

  addHandlerClick(callback) {
    this._nav.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-3");
      if (!target) return;
      callback();
    });
  }

  clearDetailsContainer() {
    this._makeInvisible([this._parentElement]);
  }

  reviveContainer() {
    this._makeVisible([this._parentElement]);
  }

  insertDetails() {
    if (Object.keys(this._data).length === 0) return;
    const html = this._generateMarkup();
    this._clear();
    this._makeVisible([this._parentElement]);
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }
  _generateMarkup() {
    return `
    <div class="air-quality-section">
      <div class="d-s-text">Air quality</div>
      <div class="air-quality">
       <div class="details-item">
        <div class="d-icon-text">
          <svg>
            <use href="${details}#pm-2">
          </svg>
          <p class="d-i-text">Particle Matter 2.5</p>
        </div> 
        <div class="d-i-value">${Math.round(
          this._data.current.air_quality.pm2_5
        )} <span class="d-i-unit">µg/m³<span> </div>
       </div>
       <div class="details-item">
        <div class="d-icon-text">
          <svg>
            <use href="${details}#pm-10">
          </svg>
          <p class="d-i-text">Particle Matter 10</p>
        </div> 
        <div class="d-i-value">${Math.round(
          this._data.current.air_quality.pm10
        )} µg/m³</div>
       </div>
       <div class="details-item">
          <div class="d-icon-text">
          <svg>
            <use href="${details}#no2">
          </svg>
          <p class="d-i-text">Nitrogen dioxide</p>
        </div> 
        <div class="d-i-value">${Math.round(
          this._data.current.air_quality.no2
        )} ppb</div>
       </div>
       <div class="details-item">
        <div class="d-icon-text">
          <svg>
            <use href="${details}#co">
          </svg>
          <p class="d-i-text">Carbon Monoxide</p>
        </div> 
        <div class="d-i-value">${Math.round(
          this._data.current.air_quality.co
        )} ppm</div>
       </div>
       <div class="details-item">
        <div class="d-icon-text">
          <svg>
            <use href="${details}#o3">
          </svg>
          <p class="d-i-text">Ozone</p>
        </div> 
        <div class="d-i-value">${Math.round(
          this._data.current.air_quality.o3
        )} ppb</div>
       </div>
       <div class="details-item">
        <div class="d-icon-text">
          <svg>
            <use href="${details}#so2">
          </svg>
          <p class="d-i-text">Sulfur Dioxide</p>
        </div> 
        <div class="d-i-value">${Math.round(
          this._data.current.air_quality.so2
        )} ppb</div>
       </div>
      </div>
    </div>
    <div class="other-details-section">
      <div class="d-s-text">Miscellaneous details</div>
      <div class="other-details">
        <div class="details-item">
          <div class="d-icon-text">
            <svg>
              <use href="${details}#humidity">
            </svg>
            <p class="d-i-text">Humidity</p>
          </div> 
          <div class="d-i-value">${this._data.current.humidity}%</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg>
              <use href="${details}#precipitation">
            </svg>
            <p class="d-i-text">Precipitation</p>
          </div> 
          <div class="d-i-value">
          ${
            this._data.userSettings.precipitation === "millimiters"
              ? `${Math.round(this._data.current.precip_mm)} mm`
              : `${Math.round(this._data.current.precip_in)} in`
          }</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg>
              <use href="${details}#pressure">
            </svg>
            <p class="d-i-text">Pressure</p>
          </div> 
          <div class="d-i-value">
          ${
            this._data.userSettings.pressure === "mb"
              ? `${this._data.current.pressure_mb} mb`
              : `${
                  this._data.userSettings.pressure === "inches"
                    ? `${Math.round(this._data.current.pressure_in)} in`
                    : `${Math.round(this._data.current.pressure_in * 25.4)} mm`
                } `
          }</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg viewBox="-100 0 605.394 605.395">
              <use href="${details}#thermometer">
            </svg>
            <p class="d-i-text">Temperature</p>
          </div> 
          <div class="d-i-value">
          ${
            this._data.userSettings.temperature === "celsius"
              ? `${Math.round(this._data.current.temp_c)}`
              : `${Math.round(this._data.current.temp_f)}`
          }°</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg viewBox="-100 0 605.394 605.395">
              <use href="${details}#thermometer">
            </svg>
            <p class="d-i-text">Feels Like</p>
          </div> 
          <div class="d-i-value">${
            this._data.userSettings.temperature === "celsius"
              ? `${Math.round(this._data.current.feelslike_c)}`
              : `${Math.round(this._data.current.feelslike_f)}`
          }°</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg viewBox="-50 0 300.564 300.564" id="not-svg">
              <use href="${details}#water">
            </svg>
            <p class="d-i-text">Chance of rain</p>
          </div> 
          <div class="d-i-value">${
            this._data.forecast.forecastday[0].day.daily_chance_of_rain
          }%</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg>
              <use href="${details}#sunrise">
            </svg>
            <p class="d-i-text">Sunrise</p>
          </div> 
          <div class="d-i-value">${
            this._data.generalSettings.TFhours
              ? `${convertTo24Hour(
                  this._data.forecast.forecastday[0].astro.sunrise
                )}`
              : `${this._data.forecast.forecastday[0].astro.sunrise.slice(1)}`
          }</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg viewBox="-1.147 -22.185 141.732 141.732">
              <use href="${details}#cloud-sun">
            </svg>
            <p class="d-i-text">Sunset</p>
          </div> 
          <div class="d-i-value">${
            this._data.generalSettings.TFhours
              ? `${convertTo24Hour(
                  this._data.forecast.forecastday[0].astro.sunset
                )}`
              : `${this._data.forecast.forecastday[0].astro.sunset.slice(1)}`
          }</div>
        </div>
        <div class="details-item">
          <div class="d-icon-text">
            <svg>
              <use href="${details}#moorise">
            </svg>
            <p class="d-i-text">Moonrise</p>
          </div> 
          <div class="d-i-value">${
            this._data.generalSettings.TFhours
              ? `${convertTo24Hour(
                  this._data.forecast.forecastday[0].astro.moonrise
                )}`
              : `${this._data.forecast.forecastday[0].astro.moonrise.slice(1)}`
          }</div>
        </div>
      </div>
    </div>
    `;
  }
}

const svg = `    <svg>
      <use href="${details}#pm-2">
    </svg>
    <svg>
      <use href="${details}#pm-10">
    </svg>
    <svg>
      <use href="${details}#no2">
    </svg>
    <svg>
      <use href="${details}#co">
    </svg>
    <svg>
      <use href="${details}#o3">
    </svg>
    <svg>
      <use href="${details}#so2">
    </svg>`;

const other = `1: humidity, precipitaion, pressure, 
2: temp, real feel, chance of rain
3: sunset, sunrise, moonrise`;

export default new DetailSectionView();
