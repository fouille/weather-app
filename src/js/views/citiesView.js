import View from "./View.js";
import details from "url:../../../img/svg/details.svg";

class CitiesView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-2");
  _citiesContainer = document.querySelector(".content");
  _previewContainer = document.querySelector(".seven-day");

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-2");
      if (!target) return;
      callback();
    });
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

  insertElements() {
    if (document.querySelector(".cities-wrapper")) return this._reviveCities();
    const html = `
    <div class="cities-wrapper">
      <div class="cities-container">
        <div class="city-saved city--active">
          <div class="city-img">
            <img src="${this._allImports.cloud}">
          </div>
          <div class="city-name-time">
            <div class="city-saved-name">Madrid
              <svg
                width="17px"
                height="17px"
                viewBox="0 0 100 100"
              >
                  <use href="${details}#icon-arrow-location"></use>
                </svg>
            </div>
            <div class="city-saved-time">10:23</div>
          </div>
          <div class="city-saved-temp">
            31°
          </div>
        </div>
        <div class="city-saved">
          <div class="city-img">
            <img src="${this._allImports.sunny}">
          </div>
          <div class="city-name-time">
            <div class="city-saved-name">Vienna</div>
            <div class="city-saved-time">11:23</div>
          </div>
          <div class="city-saved-temp">
            27°
          </div>
        </div>
        <div class="city-saved">
          <div class="city-img">
            <img src="${this._allImports.cloudySun}">
            
          </div>
          <div class="city-name-time">
            <div class="city-saved-name">Kyiv</div>
            <div class="city-saved-time">12:23</div>
          </div>
          <div class="city-saved-temp">
            30°
          </div>
        </div>
        <div class="city-saved">
          <div class="city-img">
            <img src="${this._allImports.rainyCloudySun}">
          </div>
          <div class="city-name-time">
            <div class="city-saved-name">Athens</div>
            <div class="city-saved-time">11:23</div>
          </div>
          <div class="city-saved-temp">
            33°
          </div>
        </div>
        <div class="city-saved">
          <div class="city-img">
            <img src="${this._allImports.clear}">
          </div>
          <div class="city-name-time">
            <div class="city-saved-name">Zhytomyr</div>
            <div class="city-saved-time">12:23</div>
          </div>
          <div class="city-saved-temp">
            29°
          </div>
        </div>
      </div>
      <div class="pagination">
        <button data-go-to="undefined" class="btn-page">Page 2</button>
        <span class="current-page">Page 3/4</span>
        <button data-go-to="undefined" class="btn-page">Page 4</button>
      </div>
    </div>`;
    this._citiesContainer.insertAdjacentHTML("beforeend", html);

    const cityPreviewHTML = `
    <div class="preview">
      <div class="preview-city">
        <div class="p-c-text">
          <p class="p-city-name">Madrid</p>
          <p class="p-rain-chance">Chance of rain: 89%</p>
          <p class="p-city-temp">30°</p>
        </div>
        <div class="p-c-img">
          <img src="${this._allImports.rainyCloudySun}">
        </div>
      </div>
      <div class="preview-hourly">
        <div class="p-hourly-text">TODAY'S FORECAST</div>
        <ul class="p-hourly-content">
          <li class="p-h-item">
            <div class="h-item-time">6:00</div>
            <div class="h-item-img">
              <img src="${this._allImports.cloud}">
            </div>
            <div class="h-item-temp">25°</div>
          </li>
          <li class="p-h-item">
            <div class="h-item-time">9:00</div>
            <div class="h-item-img">
              <img src="${this._allImports.sunny}">
            </div>
            <div class="h-item-temp">33°</div>
          </li>
          <li class="p-h-item">
            <div class="h-item-time">12:00</div>
            <div class="h-item-img">
              <img src="${this._allImports.rainyCloudySun}">
            </div>
            <div class="h-item-temp">18°</div>
          </li>
        </ul>
      </div>
      <div class="preview-forecast">
        <div class="forecast-text">3-DAY FORECAST</div>
        <ul class="forecast-list">
          <li class="forecast-item">
            <p class="regular-light-text">Today</p>
            <div class="forecast-img-cond">
              <div class="forecast-img">
                <img src="${this._allImports.sunny}">
              </div>
              <div class="forecast-cond">Sunny</div>
            </div>
            <div class="forecast-temp">
              <p class="bold-light-text">21</p>
              <p class="regular-light-text">/15</p>
            </div>
          </li>
          <li class="forecast-item">
            <p class="regular-light-text">Tue</p>
            <div class="forecast-img-cond">
              <div class="forecast-img">
                <img src="${this._allImports.cloud}">
              </div>
              <div class="forecast-cond">Cloudy</div>
            </div>
            <div class="forecast-temp">
              <p class="bold-light-text">15</p>
              <p class="regular-light-text">/11</p>
            </div>
          </li>
          <li class="forecast-item">
            <p class="regular-light-text">Wed</p>
            <div class="forecast-img-cond">
              <div class="forecast-img">
                <img src="${this._allImports.rainyCloudySun}">
              </div>
              <div class="forecast-cond">Partly rainy</div>
            </div>
            <div class="forecast-temp">
              <p class="bold-light-text">15</p>
              <p class="regular-light-text">/11</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    `;
    this._previewContainer.insertAdjacentHTML("beforeend", cityPreviewHTML);
  }
}

export default new CitiesView();
