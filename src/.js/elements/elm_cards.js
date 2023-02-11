export default class ElmCards extends HTMLElement {
  constructor() {
    super();
    this._h_init_elm = e => this.init_elm(e.detail.data)
  };

  connectedCallback() {
    document.addEventListener(ElmCards.INIT, this._h_init_elm)
  };

  disconnectedCallback() {
    document.removeEventListener(ElmCards.INIT, this._h_init_elm)
  };

  init_elm(data) {
    let l_tbody = () => {
      let result = "";

      for (let i = 0; i < data.length; i++) {
        let card = data[i];
        let s_td = `${`
        <tr>
          <th scope='row' class='text-start'>
            <a href='#' onclick='click_select_card(${i})'>${card.name}</a>
          </th>
          <th scope='row' class='text-center'>${card.types}</th>
          <th scope='row' class='text-center'>${card.colorIdentity}</th>
          <th scope='row' class='text-center'>${card.manaCost}</th>
        </tr>
        `}`;
        result += `${s_td}\n`
      };

      return result
    };

    let template = `${`
      <div class='table-responsive'>
        <table class='table text-center'>
          <thead>
            <tr>
              <th style='width: 31%;'></th>
              <th style='width: 22%;'>Type</th>
              <th style='width: 22%;'>Color</th>
              <th style='width: 22%;'>Cast</th>
            </tr>
          </thead>
          <tbody>
            ${l_tbody.call()}
          </tbody>
        </table>
      </div>
    `}`;
    this.innerHTML = template
  }
};

ElmCards.INIT = "ecsh_init"