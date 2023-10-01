import View from "./View.js";


class CitiesView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-2");

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-2");
      if (!target) return;
      callback();
    });
  }
}

export default new CitiesView();
