function gsub(value_a, value_b) {
  let value = this;
  if (!value_a) return value;

  while (true) {
    if (value.indexOf(value_a) > -1) {
      value = value.replace(value_a, value_b)
    } else {
      break
    }
  };

  return value
};

String.prototype.gsub = gsub;

export function mana_symbol_to_elm(value) {
  let w_elm = "<img src='/png/mana_w.png'>";
  let u_elm = "<img src='/png/mana_u.png'>";

  return value.gsub("{W}", w_elm).replace("W", w_elm).gsub(
    "{U}",
    u_elm
  ).replace("U", u_elm)
}