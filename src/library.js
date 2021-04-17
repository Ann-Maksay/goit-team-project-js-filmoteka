import queveListFilms from './js/queve-films';

const key = 'aef9cffb51e8fe7e1c3e621e64df0279';
const buttonRef = document.querySelector('.js-queve-button');

const listMarkup = () => {
  const arr = JSON.parse(localStorage.getItem('queve'));
  arr.forEach(id => queveListFilms(id));
};

buttonRef.addEventListener('click', listMarkup);
