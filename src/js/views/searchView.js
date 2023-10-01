import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search_form");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(callback) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      callback();
    });
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
}

export default new SearchView();
