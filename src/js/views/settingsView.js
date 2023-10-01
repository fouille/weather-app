import View from "./View.js";

class SettingsView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-4");


  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-4");
      if (!target) return;
      callback();
    });
  }
}

export default new SettingsView();
