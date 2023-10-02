import sunny from "url:../../../img/weather-imgs/sun/sunny.png";
import clear from "url:../../../img/weather-imgs/moon/clear.png";
import cloud from "url:../../../img/weather-imgs/cloud/cloudy.png";
import cloudySun from "url:../../../img/weather-imgs/sun/cloudy-sun.png";
import cloudyMoon from "url:../../../img/weather-imgs/moon/cloudy-moon.png";
import rainyCloud from "url:../../../img/weather-imgs/cloud/rainy-cloud.png";
import rainyCloudySun from "url:../../../img/weather-imgs/sun/rainy-cloudy-sun.png";
import rainyCloudyMoon from "url:../../../img/weather-imgs/moon/rainy-cloudy-moon.png";
import snowyRainyCloud from "url:../../../img/weather-imgs/cloud/snowy-rainy-cloud.png";
import snowyCloudyMoon from "url:../../../img/weather-imgs/moon/snowy-cloudy-moon.png";
import snowyCloud from "url:../../../img/weather-imgs/cloud/snowy-cloud.png";
import snowyRainyMoon from "url:../../../img/weather-imgs/moon/snowy-rainy-cloudy-moon.png";
import lightningRainyCloudySun from "url:../../../img/weather-imgs/sun/lightning-rainy-cloudy-sun.png";
import lightningSnowyCloud from "url:../../../img/weather-imgs/cloud/lightning-snowy-cloud.png";
import lightningRainyCloud from "url:../../../img/weather-imgs/cloud/lightning-rainy-cloud.png";
import lightningCloud from "url:../../../img/weather-imgs/cloud/lightning-cloud.png";
import windySun from "url:../../../img/weather-imgs/sun/windy-sun.png";
import windyMoon from "url:../../../img/weather-imgs/moon/windy-moon.png";
import windyCloudySun from "url:../../../img/weather-imgs/sun/windy-cloudy-sun.png";
import windyCloudyMoon from "url:../../../img/weather-imgs/moon/windy-cloudy-moon.png";
import rainyWindyCloudySun from "url:../../../img/weather-imgs/sun/rainy-windy-cloudy-sun.png";
import rainyWindyCloudyMoon from "url:../../../img/weather-imgs/moon/rainy-windy-cloudy-moon.png";
import lightningSnowyWindyCloud from "url:../../../img/weather-imgs/cloud/lightning-snowy-windy-cloud.png";
import rainyWindyCloud from "url:../../../img/weather-imgs/cloud/windy-rainy-cloud.png";
import details from "url:../../../img/svg/details.svg";

export default class View {
  _data;
  _allImports = {
    sunny: sunny,
    clear: clear,
    cloud: cloud,
    cloudySun: cloudySun,
    cloudyMoon: cloudyMoon,
    rainyCloud: rainyCloud,
    rainyCloudySun: rainyCloudySun,
    rainyCloudyMoon: rainyCloudyMoon,
    snowyRainyCloud: snowyRainyCloud,
    snowyCloudyMoon: snowyCloudyMoon,
    snowyCloud: snowyCloud,
    snowyRainyMoon: snowyRainyMoon,
    lightningRainyCloudySun: lightningRainyCloudySun,
    lightningSnowyCloud: lightningSnowyCloud,
    lightningRainyCloud: lightningRainyCloud,
    lightningCloud: lightningCloud,
    lightningSnowyWindyCloud: lightningSnowyWindyCloud,
    windySun: windySun,
    windyMoon: windyMoon,
    windyCloudySun: windyCloudySun,
    windyCloudyMoon: windyCloudyMoon,
    rainyWindyCloudySun: rainyWindyCloudySun,
    rainyWindyCloudyMoon: rainyWindyCloudyMoon,
    rainyWindyCloud: rainyWindyCloud,
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return new Error(`No data`);
    this._data = data;
  }

  _getSrc() {
    return this._allImports[this._data.cityImg];
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderLoading() {
    this._clear();
    const html = `<div class="loading-animation"></div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  enableActive() {
    this._navElement.classList.add("n-item--active");
  }

  disableActive() {
    this._navElement.classList.remove("n-item--active");
  }

  _makeVisible(arr) {
    arr.forEach((el) => el.classList.remove("disable"));
  }

  _makeInvisible(arr) {
    arr.forEach((el) => el.classList.add("disable"));
  }

  renderError(message = this._errorMessage) {
    const html = ` <div class="error">
            <div>
              <svg>
                <use href="${details}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message = this._message) {
    const html = ` <div class="message">
            <div>
              <svg>
                <use href="${details}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
