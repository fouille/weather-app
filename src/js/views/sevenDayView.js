import View from "./View.js";

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

  _generateMarkup(){
    return this._data.forecast.forecastday
      .map((day, i) => {
        const weekDay = this._data.weekdays[new Date(day.date).getDay()];
        if (i === 0) return this._generateHTML(day, "Today");
        return this._generateHTML(day, weekDay);
      })
      .join("");
  }

  _generateHTML(day, weekDay) {
    return `<li class="s-d-item">
              <p class="regular-light-text weekday">${weekDay}</p>
              <div class="s-d-icon-condition">
                <div class="img-container">
                  <img src="${
                    this._allImports[day.img]
                  }" alt="" id="special-margin" />
                </div>
                <p class="bold-light-text bold-container">${
                  day.dominantCondition
                }</p>
              </div>
              <div class="s-d-smallest-highest">
                <p class="bold-light-text">
                ${
                  this._data.userSettings.temperature === "celsius"
                    ? `${Math.round(day.day.maxtemp_c)}`
                    : `${Math.round(day.day.maxtemp_f)}`
                }</p>
                <div class="regular-light-text">/${
                  this._data.userSettings.temperature === "celsius"
                    ? `${Math.round(day.day.mintemp_c)}`
                    : `${Math.round(day.day.mintemp_f)}`
                }</div>
              </div>
            </li>`;
  }
}

export default new SevenDayView();
