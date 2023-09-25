import View from "./View.js";
import sunny from "url:../../../icons/26.png";


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
            <img src="${sunny}" alt="" />
          </div>`;
  }
}

export default new CityView();
