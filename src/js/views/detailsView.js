import View from "./View.js";

class DetailsView extends View {
  _parentElement = document.querySelector(".weather-details");
}

export default new DetailsView();
