import "../css/style.css";
import "../css/bootstrap.min.css";
import "./elements";
import API from "./third-side/api";
import ElmCards from "./elements/elm_cards";
import ElmCard from "./elements/elm_card";
let data = null;

function click_select_card(id) {
  let event = new CustomEvent(ElmCard.INIT, {detail: {data: data[id]}});
  document.dispatchEvent(event)
};

window.click_select_card = click_select_card;

// document.querySelector('#app').innerHTML = "<h1>Hello RubyJS</h1>"
function dispatch_data(data) {
  let event = new CustomEvent(ElmCards.INIT, {detail: {data}});
  document.dispatchEvent(event)
};

// Get Data
API.get_result(
  "SELECT * FROM cards WHERE hasFoil=0 LIMIT 5",

  (d) => {
    data = d;
    return dispatch_data(data)
  }
)