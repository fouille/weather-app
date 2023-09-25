import View from "./View.js";

class HourlyView extends View {
  _parentElement = document.querySelector(".hourly-forecast");
}

export default new HourlyView();
