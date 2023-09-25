import View from "./View.js";

class CityView extends View {
  _parentElement = document.querySelector(".city");

  renderSpinner(){
    this._clear();
    const html =
      '<div class="spinner"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle id="spinner" cx="12" cy="12" r="0"></circle></svg></div>';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    this.toggleCenter();
  }

  toggleCenter(){
    if (this._parentElement.style.justifyContent === "center") {
        this._parentElement.style.justifyContent = "space-between";
        return;
    }
    this._parentElement.style.justifyContent = "center";
  }
}

export default new CityView();
