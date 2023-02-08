export default class Net {
  static get_json(url, callback) {
    fetch(url).then(response => response.json()).then(data => callback(data))
  }
}