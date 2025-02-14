function createMailTo(elem_id) {
  let mailto_destn = 'mailto:';
  const mailto_elem = document.getElementById(elem_id);
  const mailto_subelems = mailto_elem.getElementsByTagName("span");
  for (let i = 0; i < mailto_subelems.length; i++) {
    mailto_destn += mailto_subelems[i].innerHTML;
  }
  mailto_elem.href = mailto_destn
}