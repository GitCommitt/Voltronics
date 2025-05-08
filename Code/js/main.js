const toggleButton = document.querySelector('.menu-toggle');
const navButtons = document.querySelector('.navbar-buttons');

toggleButton.addEventListener('click', () => {
  navButtons.classList.toggle('show');
});