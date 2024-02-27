import View from "./View.js";
import details from "url:../../../img/svg/details.svg";

class CityView extends View {
  _parentElement = document.querySelector(".city");

  addHandlerSave(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-save");
      if (!btn) return;
      this.toggleAnimation(btn);
      callback(btn);
    });
  }

  toggleAnimation(btn) {
    btn.classList.toggle("animate");
  }

  renderSpinner() {
    this._clear();
    const html =
      '<div class="spinner"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle id="spinner" cx="12" cy="12" r="0"></circle></svg></div>';
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  insertCity() {
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);

    // return to space-between
  }

  _generateMarkup() {
    return `
    <div class="city__resp">
      <div class="city-text">
        <p class="city-name">${this._data.location.name}</p>
        <p class="rain-chance">Probabilité de pluie: ${
          this._data.forecast.forecastday[0].day.daily_chance_of_rain
        }%</p>
      </div>
      <div class="city-temperature">${
        this._data.userSettings.temperature === "celsius"
          ? `${Math.round(this._data.current.feelslike_c)}`
          : `${Math.round(this._data.current.feelslike_f)}`
      }°
      </div>
    </div>
    <div class="weather-icon">
            <img src="${this._getSrc()}" ${
      this._getSrc() === this._allImports.cloud ||
      this._getSrc() === this._allImports.lightningSnowyWindyCloud
        ? "width='200px'"
        : "width='157px'"
    } id="city-image" alt="" />
    </div>
    <div class="save-city">
      <svg class="btn-save ">
        <use href="${details}#icon-star${
        Object.keys(this._data.savedCities).includes(this._data.location.name)
          ? "-fill"
          : ""
      }" />
      </svg>
    </div>
    `;
  }
  
}

export default new CityView();
