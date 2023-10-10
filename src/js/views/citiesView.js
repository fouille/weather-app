import View from "./View.js";
import details from "url:../../../img/svg/details.svg";
import { convertDateToTime, convertTo12Hour } from "./../helpers.js";

class CitiesView extends View {
  _nav = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-2");
  _parentElement = document.querySelector(".cities-container");
  target;
  pageResult;

  insertCities() {
    if (Object.keys(this._data).length === 0) return;
    const html = this._generateMarkup();
    this._clear();
    this._reviveCities();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _generateMarkup() {
    let html = "";

    if (Object.keys(this.pageResult).length === 0) return;
    for (const [city, weather] of Object.entries(this.pageResult)) {
      html += this._generateSavedCity(weather);
    }
    return html;
  }

  addHandlerClick(callback) {
    this._nav.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-2");
      if (!target) return;
      callback();
    });
  }

  addHandlerCity(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".city-saved");
      if (!target) return;
      this._toggleActive(target);
      this.target = target.querySelector(".city-saved-name span").textContent;
      callback();
    });
  }

  _toggleActive(target) {
    const arr = Array.from(document.querySelectorAll(".city-saved"));
    arr.forEach((el) => el.classList.remove("city--active"));
    target.classList.add("city--active");
  }

  clearContainer() {
    if (!document.querySelector(".cities-wrapper")) return;
    const citiesCont = [
      document.querySelector(".cities-wrapper"),
      document.querySelector(".preview"),
    ];
    this._makeInvisible(citiesCont);
  }

  _reviveCities() {
    const citiesCont = [
      document.querySelector(".cities-wrapper"),
      document.querySelector(".preview"),
    ];
    this._makeVisible(citiesCont);
  }

  _generateSavedCity(city) {
    return `
     <div class="city-saved ${
       city.location.name === this._data.activeCity ? "city--active" : ""
     }">
      <div class="city-img">
        <img src="${this._allImports[city.img]}">
      </div>
      <div class="city-name-time">
        <div class="city-saved-name"><span>${city.location.name}</span>${
      city.locale
        ? ` <svg width="17px" height="17px" viewBox="0 0 100 100"> <use href="${details}#icon-arrow-location"> </use> </svg>`
        : ""
    }</div>
        <div class="city-saved-time">
        ${
          this._data.generalSettings.TFhours
            ? `${convertDateToTime(city.location.localtime)}`
            : `${convertTo12Hour(
                convertDateToTime(city.location.localtime)
              ).slice(1)}`
        } 
        </div>
      </div>
      <div class="city-saved-temp">
        ${
          this._data.userSettings.temperature === "celsius"
            ? `${Math.round(city.current.feelslike_c)}`
            : `${Math.round(city.current.feelslike_f)}`
        }
        °
      </div>
    </div>
    `;
  }

  // insertElements() {
  //   if (document.querySelector(".cities-wrapper")) return this._reviveCities();
  //   const html = `
  //   <div class="cities-wrapper">
  //     <div class="cities-container">
  //     </div>
  //     <div class="pagination">
  //       <button data-go-to="undefined" class="btn-page">Page 2</button>
  //       <span class="current-page">Page 3/4</span>
  //       <button data-go-to="undefined" class="btn-page">Page 4</button>
  //     </div>
  //   </div>`;
  //   this._citiesContainer.insertAdjacentHTML("beforeend", html);

  //   this._createCities();
  // }
}

export default new CitiesView();
