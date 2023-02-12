export default class ElmCard extends HTMLElement {
  constructor() {
    super();

    this._h_init_elm = (e) => {
      this.init_elm(e.detail.data);
      return this.click()
    };

    this._card_tab = document.getElementById("card-tab");
    this.innerHTML = "..."
  };

  connectedCallback() {
    document.addEventListener(ElmCard.INIT, this._h_init_elm)
  };

  disconnectedCallback() {
    document.removeEventListener(ElmCard.INIT, this._h_init_elm)
  };

  init_elm(card) {
    let template = `${`
      <h2 class='display-6 text-center mb-4'>${card.name}</h2>
      <ul class='list-inline'>
        <li class='list-inline-item'>Type:</li>
        <li class='list-inline-item'>${card.type}</li>
      </ul>
      <ul class='list-inline'>
        <li class='list-inline-item'>Color:</li>
        <li class='list-inline-item'>${card.colorIdentity}</li>
      </ul>
      <ul class='list-inline'>
        <li class='list-inline-item'>Cast:</li>
        <li class='list-inline-item'>${card.manaCost}</li>
      </ul>
      <ul class='list-inline'>
        <li class='list-inline-item'>Pow/Tuf::</li>
        <li class='list-inline-item'>${card.power}</li>
      </ul>
      <p class='lead'>${card.text}</p>
      <p><em>${card.flavorText}</em></p>
    `}`;
    this.innerHTML = template
  };

  click() {
    this._card_tab.click()
  }
};

ElmCard.INIT = "ech_init"