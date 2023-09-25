import View from "./View.js";
import sunny from "url:../../../img/26.png";
import clear from "url:../../../img/weather-imgs/moon/clear.png";
import cloud from "url:../../../img/weather-imgs/cloud/cloudy.png";
import cloudySun from "url:../../../img/weather-imgs/sun/cloudy-sun.png";
import cloudyMoon from "url:../../../img/weather-imgs/moon/cloudy-moon.png";
import rainyCloud from "url:../../../img/weather-imgs/cloud/rainy-cloud.png";
import rainyCloudySun from "url:../../../img/weather-imgs/sun/rainy-cloudy-sun.png";
import rainyCloudyMoon from "url:../../../img/weather-imgs/moon/rainy-cloudy-moon.png";
import snowyRainyCloud from "url:../../../img/weather-imgs/cloud/snowy-rainy-cloud.png";


class CityView extends View {
  _parentElement = document.querySelector(".city");

  renderSpinner(){
    this._clear();
    const html =
      '<div class="spinner"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle id="spinner" cx="12" cy="12" r="0"></circle></svg></div>';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    this._toggleCenter();
  }

  _toggleCenter(){
    if (this._parentElement.style.justifyContent === "center") {
        this._parentElement.style.justifyContent = "space-between";
        return;
    }
    this._parentElement.style.justifyContent = "center";
  }

  _getSrc(){
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
    };
    return allImports[this._data.cityImg]
  }

  insertCity(){
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    this._toggleCenter();
  }

  _generateMarkup(){
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
            <img src="${this._getSrc()}" id="city-image" alt="" />
          </div>`;
  }
}

export default new CityView();
