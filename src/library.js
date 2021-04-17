import queveListFilms from './js/queve-films';

const key = 'aef9cffb51e8fe7e1c3e621e64df0279';
const buttonRef = document.querySelector('.js-queve-button');
const ulRef = document.querySelector('.film-list');

const listMarkup = () => {
  ulRef.innerHTML = '';
  if (localStorage.getItem('queue')) {
    const arr = JSON.parse(localStorage.getItem('queue'));
    arr.forEach(id => queveListFilms(id));
  } else {
    ulRef.innerHTML = 'Ваша очередь пока пуста.';
  }
};

buttonRef.addEventListener('click', listMarkup);
