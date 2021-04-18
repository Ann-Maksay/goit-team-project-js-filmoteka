import header from '../HTML/header.html';

const homeHeaderRef = document.querySelector('header');
homeHeaderRef.insertAdjacentHTML('afterbegin', header);

const refs = (() => require('./refs'))().default
refs.logo.addEventListener('click', switchToHome);
refs.headerTitle.addEventListener('click', switchToHome);
refs.homeLink.addEventListener('click', switchToHome);
refs.libraryLink.addEventListener('click', switchToLibrary);

function switchToLibrary(event) {
  event.preventDefault();
  if (refs.headerBg.classList.contains('header-bg-home')) {
    refs.headerBg.classList.remove('header-bg-home');
    refs.headerBg.classList.add('header-bg-library');
  }
}
function switchToHome(event) {
  event.preventDefault();
  if (refs.headerBg.classList.contains('header-bg-library')) {
    refs.headerBg.classList.remove('header-bg-library');
    refs.headerBg.classList.add('header-bg-home');
  }
}
