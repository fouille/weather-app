import View from "./View.js";
import { convertTo12Hour } from "../helpers.js";

class HourlyView extends View {
  _parentElement = document.querySelector(".hourly-list");

  insertHourly() {
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _getSrc(condition) {
    return this._allImports[condition];
  }

  _generateMarkup(){
    return this._data.hourly.map((hour) => this._generateHTML(hour)).join("");
  }

  _generateHTML(hour){
    return `<li class="h-item">
                <div class="h-time">${
                  this._data.generalSettings.TFhours
                    ? `${new Date(hour.time).getHours()}:00`
                    : `${convertTo12Hour(`${new Date(hour.time).getHours()}:00`).slice(1)}`
                }</div>
                <img src="${this._getSrc(hour.img)}" alt="weather condition" ${
      this._getSrc(hour.img) !== this._allImports.cloud &&
      this._getSrc(hour.img) !== this._allImports.snowyCloud
        ? 'id="not-fit"'
        : ""
    } />
                <div class="h-temp">${
                  this._data.userSettings.temperature === "celsius"
                    ? `${Math.round(hour.feelslike_c)}`
                    : `${Math.round(hour.feelslike_f)}`
                }°</div>
              </li>`;
  }
}

export default new HourlyView();
