import API from "../third-side/api";
import ElmCard from "./elm_card";
import ElmCards from "./elm_cards";
import ElmPagination from "./elm_pagination";

export default class ElmMain extends HTMLElement {
  constructor() {
    super();
    this._h_paging_select_elm = d => this.change_select_elm(d.detail.value);
    this._q_where = ["hasFoil=0", "name LIKE \"%\""];
    this._data = null;
    this._rows = 0;
    this.init_elm();
    this.search_card();
    window.click_select_card = this.click_select_card.bind(this)
  };

  connectedCallback() {
    document.addEventListener(
      ElmPagination.SELECT,
      this._h_paging_select_elm
    )
  };

  disconnectedCallback() {
    document.removeEventListener(
      ElmPagination.SELECT,
      this._h_paging_select_elm
    )
  };

  get_select_query(r_min, r_max) {
    let qw_row = `row > ${r_min} AND row <= ${r_max}`;
    let select_query = `SELECT * FROM (SELECT ROW_NUMBER() OVER() row, * FROM cards WHERE ${this.get_where_query()}) t WHERE ${qw_row} AND ${this.get_where_query()}`;
    return select_query
  };

  get_count_query() {
    let count_query = `SELECT COUNT(*) as rows FROM cards WHERE ${this.get_where_query()}`;
    return count_query
  };

  get_where_query() {
    return this._q_where.join(" AND ")
  };

  init_elm() {
    let template = `${`
      <div class='pricing-header p-3 pb-md-4 mx-auto text-center'>
        <h1 class='display-4 fw-normal'>Filtering</h1>
        <p class='fs-5 text-muted'>Zde něco bude</p>

        <div class='d-inline-flex mt-2 mt-md-0 ms-md-auto'>
          <input id='search-input' class='form-control me-2' type='search' placeholder='Name' aria-label='Search'>
          <button class='btn btn-outline-success' onclick='search_card()'>Search</button>
        </div>
      </div>

      <h2 class='display-6 text-center mb-4'>Cards</h2>
      <elm-cards></elm-cards>
      <elm-pagination></elm-pagination>
    `}`;
    this.innerHTML = template;
    this._search_input = document.getElementById("search-input");
    window.search_card = this.search_card.bind(this)
  };

  init_api_select(r_min=0, r_max=ElmCards.CARDS_MAX) {
    document.dispatchEvent(new CustomEvent(ElmCards.INIT_PROCESS));
    let query = this.get_select_query(r_min, r_max);

    API.get_result(query, (d) => {
      this._data = d;
      return this.dispatch_data(ElmCards.INIT, this._data)
    })
  };

  init_api_count() {
    let query = this.get_count_query();

    API.get_result(query, (d) => {
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
  };

  change_select_elm(page_id) {
    let row_max = page_id * ElmCards.CARDS_MAX;
    let row_min = row_max - ElmCards.CARDS_MAX;
    this.init_api_select(row_min, row_max)
  };

  search_card() {
    let c_name = this._search_input.value;

    if (c_name) {
      this._q_where[1] = `name LIKE "${c_name}%"`
    } else {
      this._q_where[1] = "name LIKE \"%\""
    };

    this.init_api_select();
    this.init_api_count()
  }
}