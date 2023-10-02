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

  addHandlerRender(callback) {
    window.addEventListener("load", callback);
  }

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-1");
      if (!target) return;
      callback();
    });
  }

  clearContentContainer(){
    this._makeInvisible(this._contentContainer);
  }
  
  reviveContentContainer(){
    this._makeVisible(this._contentContainer);
  }
}

export default new LandingPageView();
