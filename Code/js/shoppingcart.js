function darkmodeFunction() {

  const checkbox = document.querySelector('.checkbox');

  if (checkbox.checked) {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');

  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const verzendSelect = document.querySelector("select");
  const totaalElement = document.querySelector(".totaal span:last-child");

  function updateTotaalPrijs() {
    const selectedOption = verzendSelect.options[verzendSelect.selectedIndex].text;
    const prijsMatch = selectedOption.match(/€([\d,.]+)/);

    if (prijsMatch) {
      totaalElement.textContent = `€ ${prijsMatch[1]}`;
    }
  }

  verzendSelect.addEventListener("change", updateTotaalPrijs);

  updateTotaalPrijs();
});