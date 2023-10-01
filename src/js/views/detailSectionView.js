import View from "./View.js";

class DetailSectionView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-3");

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-3");
      if (!target) return;
      callback();
    });
  }
}

export default new DetailSectionView();
