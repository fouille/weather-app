import View from "./View.js";

class LandingPageView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-1");

  addHandlerRender(callback) {
    window.addEventListener("load", callback);
  }


  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-1");
      if (!target) return;
      console.log("Here");
      callback();
    });
  }
}

export default new LandingPageView();
