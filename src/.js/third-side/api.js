import { ENV } from "../env";
import Net from "../core/net";

export default class API {
  static get_result(query, callback) {
    let encode_query = encodeURIComponent(query);
    let uri = `${ENV.VITE_MTGAPI_URL}?query=${encode_query}`;
    Net.get_json(uri, data => callback(data))
  }
}