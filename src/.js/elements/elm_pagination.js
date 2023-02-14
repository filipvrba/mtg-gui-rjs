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
    let pages_count = Math.ceil(rows / ElmCards.CARDS_MAX);

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
          <li class='page-item list-inline-item'>
          <button type='button' class='btn btn-light' onclick='page_select_previous()'>Previous</button>
          </li>
          <li class='page-item list-inline-item'>
            <select class='form-select' id='page-select' onchange='page_select_change()'>
              ${l_select.call()}
            </select>
          </li>
          <li class='page-item list-inline-item'>
            <button type='button' class='btn btn-light' onclick='page_select_next()'>Next</button>
          </li>
        </ul>
      </nav>
    </div>
    `}`;
    this.innerHTML = template;
    this._page_mode = document.getElementById("page-mode");
    this._page_select = document.getElementById("page-select");
    window.page_select_change = this.page_select_change.bind(this);
    window.page_select_previous = this.page_select_previous.bind(this);
    window.page_select_next = this.page_select_next.bind(this)
  };

  change_mode(is_visible) {
    if (!this._page_mode) return;

    if (is_visible) {
      this._page_mode.className = "visible"
    } else {
      this._page_mode.className = "invisible"
    }
  };

  page_select_change() {
    let elm_select = document.getElementById("page-select");
    let event = new CustomEvent(ElmPagination.SELECT, {detail: {value: parseInt(elm_select.value)}});
    document.dispatchEvent(event)
  };

  page_select_previous() {
    let value = parseInt(this._page_select.value) - 1;

    if (value > 0) {
      this._page_select.value = value;
      this._page_select.onchange()
    }
  };

  page_select_next() {
    let value = parseInt(this._page_select.value) + 1;

    if (value <= this._page_select.length) {
      this._page_select.value = value;
      this._page_select.onchange()
    }
  }
};

ElmPagination.INIT = "eph_init";
ElmPagination.SELECT = "eph_select"