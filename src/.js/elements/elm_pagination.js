import ElmCards from "./elm_cards";

export default class ElmPagination extends HTMLElement {
  constructor() {
    super();
    this._h_init_elm = d => this.init_elm(d.detail.data);
    this._h_load_elm = d => this.change_mode(!d.detail.is_beginning)
  };

  connectedCallback() {
    document.addEventListener(ElmPagination.INIT, this._h_init_elm);
    document.addEventListener(ElmCards.LOAD_PROCESS, this._h_load_elm)
  };

  disconnectedCallback() {
    document.removeEventListener(ElmPagination.INIT, this._h_init_elm);
    document.removeEventListener(ElmCards.LOAD_PROCESS, this._h_load_elm)
  };

  init_elm(rows) {
    let pages_count = Math.floor(rows / ElmCards.CARDS_MAX);

    let l_select = () => {
      let result = "";

      for (let i = 1; i <= pages_count; i++) {
        result += `<option value='${i}'>${i}</option>\n`
      };

      return result
    };

    let template = `${`
    <div id='page-mode' class='invisible'>
      <nav aria-label='Standard pagination' class='d-flex justify-content-center'>
        <ul class='pagination'>
          <li class='page-item'>
            <a class='page-link' href='#' aria-label='Previous'>
              <span aria-hidden='true'>«</span>
            </a>
          </li>
          <li class='page-item'>
            <select class='form-select' id='page-select'>
              ${l_select.call()}
            </select>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#' aria-label='Next'>
              <span aria-hidden='true'>»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    `}`;
    this.innerHTML = template;
    this._page_mode = document.getElementById("page-mode")
  };

  change_mode(is_visible) {
    if (!this._page_mode) return;

    if (is_visible) {
      this._page_mode.className = "visible"
    } else {
      this._page_mode.className = "invisible"
    }
  }
};

ElmPagination.INIT = "eph_init"