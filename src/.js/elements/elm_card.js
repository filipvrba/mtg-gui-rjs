export default class ElmCard extends HTMLElement {
  constructor() {
    super();
    this._h_init_elm = e => this.init_elm(e.detail.data);
    this._card_tab = document.getElementById("card-tab");
    this.innerHTML = "..."
  };

  connectedCallback() {
    document.addEventListener(ElmCard.INIT, this._h_init_elm)
  };

  disconnectedCallback() {
    document.removeEventListener(ElmCard.INIT, this._h_init_elm)
  };

  init_elm(data) {
    console.log(data);
    this._card_tab.click()
  }
};

ElmCard.INIT = "ech_init"