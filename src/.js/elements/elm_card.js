export default class ElmCard extends HTMLElement {
  constructor() {
    super();

    this._h_init_elm = (e) => {
      this.init_elm(e.detail.data);
      return this.click()
    };

    this._card_tab = document.getElementById("card-tab")
  };

  connectedCallback() {
    document.addEventListener(ElmCard.INIT, this._h_init_elm)
  };

  disconnectedCallback() {
    document.removeEventListener(ElmCard.INIT, this._h_init_elm)
  };

  init_elm(card) {
    let l_urls = () => {
      let result = "";

      Object.entries(card.purchaseUrls).forEach((obj) => {
        let key = obj[0];
        let value = obj[1];
        result += `<li><a href='${value}' target='_blank'>${key}</a></li>\n`
      });

      return result
    };

    let template = `${`
      <h2 class='display-6 text-center mb-4'>${card.name}</h2>
      <ul class='list-inline'>
        <li class='list-inline-item'>Type:</li>
        <li class='list-inline-item'>${card.type}</li>
      </ul>
      
      ${this.implement_dom(
      `<ul class='list-inline'><li class='list-inline-item'>Color:</li><li class='list-inline-item'>${ElmCard.DOM_SYMBOL}</li></ul>`,
      card.colorIdentity
    )}
      ${this.implement_dom(
      `<ul class='list-inline'><li class='list-inline-item'>Cast:</li><li class='list-inline-item'>${ElmCard.DOM_SYMBOL}</li></ul>`,
      card.manaCost
    )}
      ${this.implement_dom(
      `<ul class='list-inline'><li class='list-inline-item'>Pow/Tuf:</li><li class='list-inline-item'>${ElmCard.DOM_SYMBOL}</li></ul>`,
      card.power
    )}
      <p class='lead'>${card.text}</p>
      ${this.implement_dom(
      `<p><em>${ElmCard.DOM_SYMBOL}</em></p>`,
      card.flavorText
    )}

      <ul class='list-unstyled'>
        <li>
          URLs:
          <ul>
            ${l_urls.call()}
          </ul>
        </li>
      </ul>
    `}`;

    this.innerHTML = template
  };

  click() {
    this._card_tab.className = "nav-link";
    this._card_tab.click()
  };

  implement_dom(dom, value) {
    let result = "";
    if (value != null) result = dom.replace(ElmCard.DOM_SYMBOL, value);
    return result
  }
};

ElmCard.INIT = "ech_init";
ElmCard.DOM_SYMBOL = "[*]"