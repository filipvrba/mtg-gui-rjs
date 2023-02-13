import "../css/style.css";
import "../css/bootstrap.min.css";
import "./elements";
import API from "./third-side/api";
import ElmCards from "./elements/elm_cards";
import ElmCard from "./elements/elm_card";
import ElmPagination from "./elements/elm_pagination";
let data = null;
let rows = 0;

function click_select_card(id) {
  let event = new CustomEvent(ElmCard.INIT, {detail: {data: data[id]}});
  document.dispatchEvent(event)
};

window.click_select_card = click_select_card;

// document.querySelector('#app').innerHTML = "<h1>Hello RubyJS</h1>"
function dispatch_data(env, data) {
  let event = new CustomEvent(env, {detail: {data}});
  document.dispatchEvent(event)
};

// Get Data
let q_where = "hasFoil=0";
let qw_row = "row > 0 AND row <= 10";
let select_query = `SELECT * FROM (SELECT ROW_NUMBER() OVER() row, * FROM cards WHERE ${q_where}) t WHERE ${qw_row} AND ${q_where}`;
let count_query = `SELECT COUNT(*) as rows FROM cards WHERE ${q_where}`;

API.get_result(select_query, (d) => {
  data = d;
  dispatch_data(ElmCards.INIT, data);

  return API.get_result(count_query, (d) => {
    rows = parseInt(d[0].rows);
    return dispatch_data(ElmPagination.INIT, rows)
  })
})