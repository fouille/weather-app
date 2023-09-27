import View from "./View.js";
import sunny from "url:../../../img/weather-imgs/sun/sunny.png";
import clear from "url:../../../img/weather-imgs/moon/clear.png";
import cloud from "url:../../../img/weather-imgs/cloud/cloudy.png";
import cloudySun from "url:../../../img/weather-imgs/sun/cloudy-sun.png";
import cloudyMoon from "url:../../../img/weather-imgs/moon/cloudy-moon.png";
import rainyCloud from "url:../../../img/weather-imgs/cloud/rainy-cloud.png";
import rainyCloudySun from "url:../../../img/weather-imgs/sun/rainy-cloudy-sun.png";
import rainyCloudyMoon from "url:../../../img/weather-imgs/moon/rainy-cloudy-moon.png";
import snowyRainyCloud from "url:../../../img/weather-imgs/cloud/snowy-rainy-cloud.png";
import snowyCloudyMoon from "url:../../../img/weather-imgs/moon/snowy-cloudy-moon.png";
import snowyCloud from "url:../../../img/weather-imgs/cloud/snowy-cloud.png";
import snowyRainyMoon from "url:../../../img/weather-imgs/moon/snowy-rainy-cloudy-moon.png";
import lightningRainyCloudySun from "url:../../../img/weather-imgs/sun/lightning-rainy-cloudy-sun.png";
import lightningSnowyCloud from "url:../../../img/weather-imgs/cloud/lightning-snowy-cloud.png";
import lightningRainyCloud from "url:../../../img/weather-imgs/cloud/lightning-rainy-cloud.png";
import lightningCloud from "url:../../../img/weather-imgs/cloud/lightning-cloud.png";
import windySun from "url:../../../img/weather-imgs/sun/windy-sun.png";
import windyMoon from "url:../../../img/weather-imgs/moon/windy-moon.png";
import windyCloudySun from "url:../../../img/weather-imgs/sun/windy-cloudy-sun.png";
import windyCloudyMoon from "url:../../../img/weather-imgs/moon/windy-cloudy-moon.png";
import rainyWindyCloudySun from "url:../../../img/weather-imgs/sun/rainy-windy-cloudy-sun.png";
import rainyWindyCloudyMoon from "url:../../../img/weather-imgs/moon/rainy-windy-cloudy-moon.png";
import lightningSnowyWindyCloud from "url:../../../img/weather-imgs/cloud/lightning-snowy-windy-cloud.png";
import rainyWindyCloud from "url:../../../img/weather-imgs/cloud/windy-rainy-cloud.png";

class CityView extends View {
  _parentElement = document.querySelector(".city");

  renderSpinner() {
    this._clear();
    const html =
      '<div class="spinner"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle id="spinner" cx="12" cy="12" r="0"></circle></svg></div>';
    this._parentElement.insertAdjacentHTML("afterbegin", html);
    this._toggleCenter();
  }

  _toggleCenter() {
    if (this._parentElement.style.justifyContent === "center") {
      this._parentElement.style.justifyContent = "space-between";
      return;
    }
    this._parentElement.style.justifyContent = "center";
  }

  _getSrc() {
    const allImports = {
      sunny: sunny,
      clear: clear,
      cloud: cloud,
      cloudySun: cloudySun,
      cloudyMoon: cloudyMoon,
      rainyCloud: rainyCloud,
      rainyCloudySun: rainyCloudySun,
      rainyCloudyMoon: rainyCloudyMoon,
      snowyRainyCloud: snowyRainyCloud,
      snowyCloudyMoon: snowyCloudyMoon,
      snowyCloud: snowyCloud,
      snowyRainyMoon: snowyRainyMoon,
      lightningRainyCloudySun: lightningRainyCloudySun,
      lightningSnowyCloud: lightningSnowyCloud,
      lightningRainyCloud: lightningRainyCloud,
      lightningCloud: lightningCloud,
      lightningSnowyWindyCloud: lightningSnowyWindyCloud,
      windySun: windySun,
      windyMoon: windyMoon,
      windyCloudySun: windyCloudySun,
      windyCloudyMoon: windyCloudyMoon,
      rainyWindyCloudySun: rainyWindyCloudySun,
      rainyWindyCloudyMoon: rainyWindyCloudyMoon,
      rainyWindyCloud: rainyWindyCloud,
    };
    return allImports[this._data.cityImg];
  }

  insertCity() {
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
    this._toggleCenter();
  }

  _generateMarkup() {
    return `<div class="city-text">
            <p class="city-name">${this._data.location.name}</p>
            <p class="rain-chance">Chance of rain: ${
              this._data.forecast.forecastday[0].day.daily_chance_of_rain
            }%</p>
          </div>
          <div class="city-temperature">${Math.round(
            this._data.current.feelslike_c
          )}°</div>
          <div class="weather-icon">
            <img src="${this._getSrc()}" ${
      this._getSrc() === cloud || this._getSrc() === lightningSnowyWindyCloud
        ? "width='200px'"
        : "width='157px'"
    } id="city-image" alt="" />
          </div>`;
  }
}

export default new CityView();
