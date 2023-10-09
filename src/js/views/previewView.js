import View from "./View.js";
import { convertTo12Hour } from "./../helpers.js";

class PreviewView extends View {
  _parentElement = document.querySelector(".preview");

  insertPreview() {
    if (Object.keys(this._data).length === 0) return;

    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }

  _generateHourly(hour, i) {
    if (i > 2) return;
    return `<li class="p-h-item">
            <div class="h-item-time">${
              this._data.generalSettings.TFhours
                ? `${new Date(hour.time).getHours()}:00`
                : `${convertTo12Hour(
                    `${new Date(hour.time).getHours()}:00`
                  ).slice(1)}`
            }</div>
            <div class="h-item-img">
              <img src="${this._getSrc(hour.img)}" alt="weather condition">
            </div>
            <div class="h-item-temp">${
              this._data.userSettings.temperature === "celsius"
                ? `${Math.round(hour.feelslike_c)}`
                : `${Math.round(hour.feelslike_f)}`
            }°</div>
          </li>`;
  }

  _generateForecast(day, i) {
    if (i > 2) return;
    const weekDay = this._data.weekdays[new Date(day.date).getDay()];
    return `
    <li class="forecast-item">
            <p class="regular-light-text">${i > 0 ? weekDay : "Today"}</p>
            <div class="forecast-img-cond">
              <div class="forecast-img">
                <img src="${this._allImports[day.img]}">
              </div>
              <div class="forecast-cond">${day.dominantCondition}</div>
            </div>
            <div class="forecast-temp">
              <p class="bold-light-text"> ${
                this._data.userSettings.temperature === "celsius"
                  ? `${Math.round(day.day.maxtemp_c)}`
                  : `${Math.round(day.day.maxtemp_f)}`
              }</p>
              <p class="regular-light-text">/${
                this._data.userSettings.temperature === "celsius"
                  ? `${Math.round(day.day.mintemp_c)}`
                  : `${Math.round(day.day.mintemp_f)}`
              }</p>
            </div>
          </li>
          `;
  }

  _generateMarkup() {
    return `
         <div class="preview-city">
        <div class="p-c-text">
          <p class="p-city-name">${this._data.location.name}</p>
          <p class="p-rain-chance">Chance of rain: ${
            this._data.forecast.forecastday[0].day.daily_chance_of_rain
          }%</p>
          <p class="p-city-temp">${
            this._data.userSettings.temperature === "celsius"
              ? `${Math.round(this._data.current.feelslike_c)}`
              : `${Math.round(this._data.current.feelslike_f)}`
          }°</p>
        </div>
        <div class="p-c-img">
          <img src="${this._getSrc()}">
        </div>
      </div>
      <div class="preview-hourly">
        <div class="p-hourly-text">TODAY'S FORECAST</div>
        <ul class="p-hourly-content">
          ${this._data.hourly
            .map((hour, i) => this._generateHourly(hour, i))
            .join("")}
        </ul>
      </div>
      <div class="preview-forecast">
        <div class="forecast-text">3-DAY FORECAST</div>
        <ul class="forecast-list">
            ${this._data.forecast.forecastday
              .map((day, i) => this._generateForecast(day, i))
              .join("")}
        </ul>
      </div>`;
  }
}

export default new PreviewView();
