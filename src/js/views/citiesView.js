import View from "./View.js";
import details from "url:../../../img/svg/details.svg";


class CitiesView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-2");
  _citiesContainer = document.querySelector(".content");

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-2");
      if (!target) return;
      callback();
    });
  }
  insertElements() {
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
  }
}

export default new CitiesView();
