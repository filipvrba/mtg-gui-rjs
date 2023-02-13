import API from "../third-side/api";
import ElmCard from "./elm_card";
import ElmCards from "./elm_cards";
import ElmPagination from "./elm_pagination";

export default class ElmMain extends HTMLElement {
  constructor() {
    super();
    this._q_where = "hasFoil=0";
    this._qw_row = `row > 0 AND row <= ${ElmCards.CARDS_MAX}`;
    this._select_query = `SELECT * FROM (SELECT ROW_NUMBER() OVER() row, * FROM cards WHERE ${this._q_where}) t WHERE ${this._qw_row} AND ${this._q_where}`;
    this._count_query = `SELECT COUNT(*) as rows FROM cards WHERE ${this._q_where}`;
    this._data = null;
    this._rows = 0;
    this.init_elm();
    this.init_api_select();
    this.init_api_count();
    window.click_select_card = this.click_select_card.bind(this)
  };

  // document.addEventListener(INIT, @h_init_elm)
  connectedCallback() {};

  // document.removeEventListener(INIT, @h_init_elm)
  disconnectedCallback() {};

  init_elm() {
    let template = `${`
      <div class='pricing-header p-3 pb-md-4 mx-auto text-center'>
        <h1 class='display-4 fw-normal'>Filtering</h1>
        <p class='fs-5 text-muted'>Zde něco bude</p>

        <form class='d-inline-flex mt-2 mt-md-0 ms-md-auto' role='search'>
          <input class='form-control me-2' type='search' placeholder='Search' aria-label='Search'>
          <button class='btn btn-outline-success' type='submit'>Search</button>
        </form>
      </div>

      <h2 class='display-6 text-center mb-4'>Cards</h2>
      <elm-cards></elm-cards>
      <elm-pagination></elm-pagination>
    `}`;
    this.innerHTML = template
  };

  init_api_select() {
    API.get_result(this._select_query, (d) => {
      this._data = d;
      return this.dispatch_data(ElmCards.INIT, this._data)
    })
  };

  init_api_count() {
    API.get_result(this._count_query, (d) => {
      this._rows = parseInt(d[0].rows);
      return this.dispatch_data(ElmPagination.INIT, this._rows)
    })
  };

  dispatch_data(env, data) {
    let event = new CustomEvent(env, {detail: {data}});
    document.dispatchEvent(event)
  };

  click_select_card(id) {
    let event = new CustomEvent(ElmCard.INIT, {detail: {data: this._data[id]}});
    document.dispatchEvent(event)
  }
}