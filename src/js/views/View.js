export default class View {
  _data;

  render(data){
    if (!data || (Array.isArray(data) && data.length === 0)) return new Error(`No data`);
    this._data = data;

  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    this._clear();
    const html = `<div class="spinner">
                <svg viewBox="0 0 24 24">
                  <circle id="spinner" cx="12" cy="12" r="0"/>
                </svg>
            </div>`;

    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError(message = this._errorMessage) {
    const html = ` <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
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
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}