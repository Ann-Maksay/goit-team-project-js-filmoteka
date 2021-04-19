import queveListFilms from './js/queve-films';
import watchedListFilms from './js/watched-films.js';

import spiner from './js/spiner';


const key = 'aef9cffb51e8fe7e1c3e621e64df0279';
const buttonQueveRef = document.querySelector('.js-queve-button');
const buttonWatchedRef = document.querySelector('.js-watched-button');
const ulRef = document.querySelector('.film-list');

// const queueArry = ['299536', '383498', '500664', '466282', '455980', '489931', '421792'];
// const watchedArry = ['429300', '857', '470918', '353081', '271706', '333339', '347375'];

// localStorage.setItem('queue', JSON.stringify(queueArry));
// localStorage.setItem('watched', JSON.stringify(watchedArry));

// localStorage.removeItem('queue');
// localStorage.removeItem('watched');

const listMarkup = () => {

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
    ulRef.insertAdjacentHTML('beforeend',
        `<div class='error-library-container'>
        <p class="error-library">Ваша библиотека пока пуста!</p>
      </div>`)
  }
  spiner.hideSpin();
};

const watchedlistMarkup = () => {
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
    ulRef.insertAdjacentHTML('beforeend',
        `<div class='error-library-container'>
        <p class="error-library">Ваша библиотека пока пуста!</p>
      </div>`)
  }
  spiner.hideSpin();
};

buttonQueveRef.addEventListener('click', listMarkup);
buttonWatchedRef.addEventListener('click', watchedlistMarkup);
watchedlistMarkup();
