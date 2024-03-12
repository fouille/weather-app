import View from "./View.js";
import { celsiusToFahrenheit } from "../helpers.js";
import { frenchTranslation } from "../language.js";

class SevenDayView extends View {
  _parentElement = document.querySelector(".s-d-list");

  insertDays() {
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _getSrc(condition) {
    return this._allImports[condition];
  }

  _generateMarkup() {
    return this._data.forecastSeven
      .map((day, i) => {
        if (i === 0) return this._generateHTML(day, "Aujourd'hui");
        return this._generateHTML(day);
      })
      .join("");
  }

  _generateHTML(day, weekDay=undefined) {
    return `<li class="s-d-item">
              <p class="regular-light-text weekday">${weekDay ? weekDay : day.weekDay}</p>
              <div class="s-d-icon-condition">
                <div class="img-container">
                  <img src="${
                    this._allImports[day.img]
                  }" alt="" id="special-margin" />
                </div>
                <p class="bold-light-text bold-container">${
                  frenchTranslation.hasOwnProperty(day.dominantCondition.trim()) ? frenchTranslation[day.dominantCondition.trim()] : day.dominantCondition
                }</p>
              </div>
              <div class="s-d-smallest-highest">
                <p class="bold-light-text">
                ${
                  this._data.userSettings.temperature === "celsius"
                    ? `${day.max}` + '°c'
                    : `${celsiusToFahrenheit(day.max)}` + '°f'
                }</p>
                <div class="regular-light-text">/${
                  this._data.userSettings.temperature === "celsius"
                    ? `${day.min}` + '°c'
                    : `${celsiusToFahrenheit(day.min)}` + '°f'
                }</div>
              </div>
            </li>`;
  }
}

export default new SevenDayView();
