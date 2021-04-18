import queveListFilms from './js/queve-films';

const key = 'aef9cffb51e8fe7e1c3e621e64df0279';
const buttonQueveRef = document.querySelector('.js-queve-button');
const buttonWatchedRef = document.querySelector('.js-watched-button');
const ulRef = document.querySelector('.film-list');

const listMarkup = () => {

  if (buttonWatchedRef.classList.contains('active-btn')) {
    buttonWatchedRef.classList.remove('active-btn');
  }
  if (!buttonQueveRef.classList.contains('active-btn')) {
    buttonQueveRef.classList.add('active-btn');
  }

  ulRef.innerHTML = '';
  if (localStorage.getItem('queue')) {
    const arr = JSON.parse(localStorage.getItem('queue'));
    arr.forEach(id => queveListFilms(id));
  } else {
    ulRef.innerHTML = 'Ваша очередь пока пуста.';
  }
};

buttonQueveRef.addEventListener('click', listMarkup);

