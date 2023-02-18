import { mana_symbol_to_elm } from "../core/string";

export default class ElmCards extends HTMLElement {
  constructor() {
    super();
    this._h_init_elm = e => this.init_elm(e.detail.data);

    this._h_init_process = () => {
      return this.load_process()
    }
  };

  connectedCallback() {
    document.addEventListener(ElmCards.INIT, this._h_init_elm);

    document.addEventListener(
      ElmCards.INIT_PROCESS,
      this._h_init_process
    )
  };

  disconnectedCallback() {
    document.removeEventListener(ElmCards.INIT, this._h_init_elm);

    document.removeEventListener(
      ElmCards.INIT_PROCESS,
      this._h_init_process
    )
  };

  init_elm(data) {
    let l_tbody = () => {
      let result = "";

      for (let i = 0; i < data.length; i++) {
        let card = data[i];
        let encode_name = encodeURIComponent(card.name);
        let s_td = `${`
        <tr id='${encode_name}'>
          <th scope='row' class='text-start'>
            <a href='#${encode_name}' onclick='click_select_card(${i})'>${card.name}</a>
          </th>
          <th scope='row' class='text-center'>${card.types}</th>
          <th scope='row' class='text-center'>${mana_symbol_to_elm(card.colorIdentity)}</th>
          <th scope='row' class='text-center'>${mana_symbol_to_elm(card.manaCost)}</th>
        </tr>
        `}`;
        result += `${s_td}\n`
      };

      return result
    };

    let template = `${`
      <div class='text-center'>
        <h2 class='h2'>No cards found</h2>
      </div>
    `}`;

    if (data.length > 0) {
      template = `${`
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
      this.load_process_event(false)
    };

    this.innerHTML = template
  };

  load_process() {
    let template = `${`
    <div class='d-flex justify-content-center'>
      <div class='spinner-border text-primary' role='status'>
        <span class='visually-hidden'>Loading...</span>
      </div>
    </div>
    `}`;
    this.innerHTML = template;
    this.load_process_event(true)
  };

  load_process_event(is_beginning) {
    let event = new CustomEvent(ElmCards.LOAD_PROCESS, {detail: {is_beginning}});
    document.dispatchEvent(event)
  }
};

ElmCards.INIT = "ecsh_init";
ElmCards.LOAD_PROCESS = "ecsh_load_p";
ElmCards.INIT_PROCESS = "ecsh_init_p";
ElmCards.CARDS_MAX = 100