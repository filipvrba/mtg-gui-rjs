import "../css/style.css";
import "../css/bootstrap.min.css";
import "./elements";
import API from "./third-side/api";

// document.querySelector('#app').innerHTML = "<h1>Hello RubyJS</h1>"
API.get_result(
  "SELECT * FROM cards DECS LIMIT 5",
  data => console.log(data)
)