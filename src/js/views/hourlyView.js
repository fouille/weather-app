import View from "./View.js";

class HourlyView extends View {
  _parentElement = document.querySelector(".hourly-list");

  insertHourly() {
    if (Object.keys(this._data).length === 0) return;
    this._clear();
    const html = this._data.hourly
      .map((hour) => this._generateMarkup(hour))
      .join("");
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _getSrc(condition) {
    return this._allImports[condition];
  }

  _generateMarkup(hour) {
    return `<li class="h-item">
                <div class="h-time">${new Date(hour.time).getHours()}:00</div>
                <img src="${this._getSrc(hour.img)}" alt="sunny" ${(this._getSrc(
      hour.img
    ) === this._allImports.sunny || this._getSrc(
      hour.img
    ) === this._allImports.clear) ? "id='not-fit'" : ""} />
                <div class="h-temp">${Math.round(hour.feelslike_c)}°</div>
              </li>`;
  }
}

export default new HourlyView();
