import "../css/style.css";
import "../css/bootstrap.min.css";
import "./elements";
import API from "./third-side/api";
import ElmCards from "./elements/elm_cards";

// document.querySelector('#app').innerHTML = "<h1>Hello RubyJS</h1>"
function dispatch_data(data) {
  let event = new CustomEvent(ElmCards.INIT, {detail: {data}});
  document.dispatchEvent(event)
};

// Get Data
API.get_result(
  "SELECT * FROM cards WHERE hasFoil=0 LIMIT 5",
  data => dispatch_data(data)
)