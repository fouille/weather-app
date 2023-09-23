import View from './View.js';

class LandingPageView extends View {
  _parentElement = document.querySelector(".city-name");
  _sevenDayContainer = document.querySelector(".s-d-forecast");

  addHandlerRender(callback) {
    window.addEventListener("load", callback);
  }

  _renderLoadingAnimation() {
    this._sevenDayContainer.innerHTML = "";
    const html = `<div class="loading-animation"></div>`;
    this._sevenDayContainer.insertAdjacentHTML('afterbegin', html);
  }
}

export default new LandingPageView();