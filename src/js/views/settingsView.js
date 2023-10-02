import View from "./View.js";

class SettingsView extends View {
  _parentElement = document.querySelector("nav");
  _navElement = document.querySelector(".n-item-4");
  _container = document.querySelector(".content");

  addHandlerClick(callback) {
    this._parentElement.addEventListener("click", (e) => {
      const target = e.target.closest(".n-item-4");
      if (!target) return;
      callback();
    });
  }

  clearContentContainer() {
    const contentContainer = [
      document.querySelector(".hourly-forecast"),
      document.querySelector(".city"),
      document.querySelector(".seven-day"),
      document.querySelector(".weather-details"),
    ];

    contentContainer.forEach((el) => (el.style.display = "none"));
  }

  insertElements() {
    const html = `<div class="setting-text">Units</div>
    <div class="settings">
      <div class="setting-option">
        <div class="setting-o-text">TEMPERATURE</div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-el toggle-el--active celsius">Celsius</div>
            <div class="toggle-el fahrenheit">Fahrenheit</div>
          </div>
        </div>
      </div>
      <div class="setting-option">
        <div class="setting-o-text">WIND SPEED</div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-el toggle-el--active wind-km">km/h</div>
            <div class="toggle-el wind-miles">m/h</div>
            <div class="toggle-el wind-knots">Knots</div>
          </div>
        </div>
      </div>
      <div class="setting-option">
        <div class="setting-o-text">PRESSURE</div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-el pressure-in">Inches</div>
            <div class="toggle-el toggle-el--active pressure-mb">mb</div>
            <div class="toggle-el pressure-mm">mm</div>
          </div>
        </div>
      </div>
      <div class="setting-option">
        <div class="setting-o-text">PRECIPITATION</div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-el precipitation-in">Inches</div>
            <div class="toggle-el toggle-el--active precipitation-mm">Millimiters</div>
          </div>
        </div>
      </div>
          <div class="setting-option">
        <div class="setting-o-text">DISTANCE</div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-el toggle-el--active distance-km">Kilometers</div>
            <div class="toggle-el distance-miles">Miles</div>
          </div>
        </div>
      </div>
    </div>
    `;
    this._container.insertAdjacentHTML("beforeend", html);
  }
}

export default new SettingsView();
