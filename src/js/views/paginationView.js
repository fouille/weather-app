import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  insertPagination() {
    if (Object.keys(this._data).length === 0) return;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  addHandlerPagination(callback){
    this._parentElement.addEventListener("click", e=>{
        const btn = e.target.closest(".btn-page");
        if(!btn) return;
        if(btn.dataset.goto === "undefined") return;
        const goToPage = +btn.dataset.goto;
        callback(goToPage);
    })
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      Object.keys(this._data.savedCities).length / this._data.citiesPerPage
    );
    const curPage = this._data.page;

    // Page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="undefined" class="btn-page btn-disabled">Page ?</button>
            <span class="current-page">Page ${curPage}/${numPages}</span>
            <button data-goto="${curPage + 1}" class="btn-page">Page ${
        curPage + 1
      }</button>`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
            <button data-goto="${curPage - 1}" class="btn-page ">Page ${
        curPage - 1
      }</button>
            <span class="current-page">Page ${curPage}/${numPages}</span>
            <button data-goto="undefined" class="btn-page btn-disabled">Page ?</button>
        `;
    }

    // Other page
    if (curPage < numPages) {
      return `<button data-goto="${curPage - 1}" class="btn-page">Page ${
        curPage - 1
      }</button>
            <span class="current-page">Page ${curPage}/${numPages}</span>
            <button data-goto="${curPage + 1}" class="btn-page">Page ${
        curPage + 1
      }</button>`;
    }
    // Page 1 and no other pages
    return `<button data-goto="undefined" class="btn-page btn-disabled">Page ?</button>
            <span class="current-page">Page ${curPage}/${numPages}</span>
            <button data-goto="undefined" class="btn-page btn-disabled">Page ?</button>`;
  }
}

export default new PaginationView();
