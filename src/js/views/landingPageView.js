import View from "./View.js";

class LandingPageView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-1");
  _contentContainer = [
    document.querySelector(".hourly-forecast"),
    document.querySelector(".city"),
    document.querySelector(".s-d-forecast"),
    document.querySelector(".weather-details"),
  ];
  _overlayElement = this._parentElement.querySelector(".overlay");

  addHandlerRender(callback) {
    window.addEventListener("load", callback);
  }

  toggleOverlay(){
    this._overlayElement.classList.toggle("overlay--active");
  }

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-1");
      if (!target) return;
      callback();
    });
  }

  addHandlerSeeMore(callback) {
    document
      .querySelector(".weather-details")
      .addEventListener("click", (e) => {
        const btn = e.target.closest(".see-more");
        if (!btn) return;
        callback();
      });
  }

  clearContentContainer() {
    this._makeInvisible(this._contentContainer);
  }

  reviveContentContainer() {
    this._makeVisible(this._contentContainer);
  }
}

export default new LandingPageView();
