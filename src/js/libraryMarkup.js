import queveListFilms from './queve-films';
import watchedListFilms from './watched-films.js';
import spiner from './spiner';

const buttonQueveRef = document.querySelector('.js-queve-button');
const buttonWatchedRef = document.querySelector('.js-watched-button');
const ulRef = document.querySelector('.film-list');

const libraryMarkap = {
  queueListMarkup() {
    if (buttonWatchedRef.classList.contains('active-btn')) {
      buttonWatchedRef.classList.remove('active-btn');
    }
    if (!buttonQueveRef.classList.contains('active-btn')) {
      buttonQueveRef.classList.add('active-btn');
    }

    ulRef.innerHTML = '';
    spiner.showSpin();
    if (localStorage.getItem('queue')) {
      const arr = JSON.parse(localStorage.getItem('queue'));
      arr.forEach(id => queveListFilms(id));
    } else {
      ulRef.insertAdjacentHTML(
        'beforeend',
        `<div class='error-library-container'>
        <p class="error-library">Ваша библиотека пока пуста!</p>
      </div>`,
      );
    }
    spiner.hideSpin();
  },

  watchedlistMarkup() {
    if (buttonQueveRef.classList.contains('active-btn')) {
      buttonQueveRef.classList.remove('active-btn');
    }
    if (!buttonWatchedRef.classList.contains('active-btn')) {
      buttonWatchedRef.classList.add('active-btn');
    }
    ulRef.innerHTML = '';
    spiner.showSpin();
    if (localStorage.getItem('watched')) {
      const arr = JSON.parse(localStorage.getItem('watched'));
      arr.forEach(id => watchedListFilms(id));
    } else {
      ulRef.insertAdjacentHTML(
        'beforeend',
        `<div class='error-library-container'>
        <p class="error-library">Ваша библиотека пока пуста!</p>
      </div>`,
      );
    }
    spiner.hideSpin();
  },
};

export default libraryMarkap;
