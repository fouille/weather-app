import View from './View.js';

class LandingPageView extends View {
  _cityContainer = document.querySelector(".city-name");

  addHandlerRender(callback){
    window.addEventListener('load', callback);
  }
}

export default new LandingPageView();