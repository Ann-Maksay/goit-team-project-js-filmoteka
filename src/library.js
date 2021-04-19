import queveListFilms from './js/queve-films';

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

