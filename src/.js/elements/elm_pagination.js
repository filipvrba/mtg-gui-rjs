export default class ElmPagination extends HTMLElement {
  constructor() {
    super();
    this._h_init_elm = d => this.init_elm(d.detail.data)
  };

  connectedCallback() {
    document.addEventListener(ElmPagination.INIT, this._h_init_elm)
  };

  disconnectedCallback() {
    document.removeEventListener(ElmPagination.INIT, this._h_init_elm)
  };

  init_elm(rows) {
    let template = `${`
    <nav aria-label='Standard pagination' class='d-flex justify-content-center'>
      <ul class='pagination'>
        <li class='page-item'>
          <a class='page-link' href='#' aria-label='Previous'>
            <span aria-hidden='true'>«</span>
          </a>
        </li>
        <li class='page-item'><a class='page-link' href='#'>1</a></li>
        <li class='page-item'>
          <a class='page-link' href='#' aria-label='Next'>
            <span aria-hidden='true'>»</span>
          </a>
        </li>
      </ul>
    </nav>
    `}`;
    this.innerHTML = template
  }
};

ElmPagination.INIT = "eph_init";
ElmPagination.ROWS_MAX = 50