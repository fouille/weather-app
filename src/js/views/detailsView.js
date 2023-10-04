import View from "./View.js";
import {convertTo24Hour} from './../helpers.js';
import details from "url:../../../img/svg/details.svg";


class DetailsView extends View {
  _parentElement = document.querySelector(".d-details");

  insertDetails() {
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderLoading() {
    this._clear();
    const html = `<div class="loading-animation" id="details-load"></div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _convertToKnots(km) {
    return (km * 0.539957).toFixed(1);
  }
  _generateMarkup() {
    return (
      `<div class="d-h-item-1 real-feel">
              <div class="icon-text">
                <svg
                  fill="#9399a2"
                  width="30px"
                  height="30px"
                  viewBox="0 0 505.394 505.395"
                >
                  <use href="${details}#therm"></use>
                </svg>
                <p class="grey-classic">Real Feel</p>
              </div>
              <div class="feel-value">
                <p class="d-value">${
                  this._data.userSettings.temperature === "celsius"
                    ? `${this._data.current.feelslike_c}`
                    : `${this._data.current.feelslike_f}`
                }°</p>
              </div>
            </div>` +
      `<div class="d-h-item-1 wind">
              <div class="icon-text">
                <svg
                  height="27px"
                  width="30px"
                  viewBox="0 0 512 512"
                  fill="#9399a2"
                >
                  <use href="${details}#wind"></use>
                </svg>
                <p class="grey-classic">Wind</p>
              </div>
              <div class="wind-value">
                <p class="d-value">${
                  this._data.userSettings.windSpeed === "km/h"
                    ? `${this._data.current.wind_kph} km/h`
                    : `${
                        this._data.userSettings.windSpeed === "m/h"
                          ? `${this._data.current.wind_mph} m/h`
                          : `${this._convertToKnots(
                              this._data.current.wind_kph
                            )} knots`
                      }`
                } </p>
              </div>
            </div>` +
      `<div class="d-h-item-1 visibility">
              <div class="icon-text">
                <svg
                  height="27px"
                  width="30px"
                  viewBox="0 0 488.85 488.85"
                  fill="#9399a2"
                >
                  <use href="${details}#eye"></use>
                </svg>
                <p class="grey-classic">Visibility</p>
              </div>
              <div class="visibility-value">
                <p class="d-value">${
                  this._data.userSettings.distance === "kilometers"
                    ? `${this._data.current.vis_km} km`
                    : `${this._data.current.vis_miles} miles`
                }</p>
              </div>
            </div>` +
      `<div class="d-h-item-1 rain">
              <div class="icon-text">
                <svg
                  height="28px"
                  width="27px"
                  viewBox="0 0 264.564 264.564"
                  fill="#9399a2"
                >
                  <use href="${details}#water"></use>
                </svg>
                <p class="grey-classic">Chance of rain</p>
              </div>
              <div class="rain-value">
                <p class="d-value">${this._data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
              </div>
            </div>` +
      `<div class="d-h-item-1 uv">
              <div class="icon-text">
                <svg
                  height="28px"
                  width="27px"
                  viewBox="0 0 457.32 457.32"
                  fill="#9399a2"
                >
                  <use href="${details}#sun"></use>
                </svg>
                <p class="grey-classic">UV index</p>
              </div>
              <div class="uv-value">
                <p class="d-value">${this._data.current.uv}</p>
              </div>
            </div>` +
      `<div class="d-h-item-1 sunset">
              <div class="icon-text">
                <svg
                  height="28px"
                  width="27px"
                  viewBox="-1.147 -22.185 141.732 141.732"
                  fill="#9399a2"
                >
                  <use href="${details}#cloud-sun"></use>
                </svg>
                <p class="grey-classic">Sunset</p>
              </div>
              <div class="sunset-value">
                <p class="d-value">${
                  this._data.generalSettings.TFhours
                    ? `${convertTo24Hour(
                        this._data.forecast.forecastday[0].astro.sunset
                      )}`
                    : `${this._data.forecast.forecastday[0].astro.sunset}`
                } </p>
              </div>
            </div>`
    );
  }
}

export default new DetailsView();
