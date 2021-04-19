import watchedListFilms from './js/watched-films.js';

const buttonWatchedRef = document.querySelector('.js-watched-button')
const ulRef = document.querySelector('.film-list');

const watchedArry = ['429300', '857', '470918', '353081', '271706', '333339', '347375'];

localStorage.setItem('watched', JSON.stringify(watchedArry));
const watchedlistMarkup = () => {
  ulRef.innerHTML = '';
  if (localStorage.getItem('watched')) {
    const arr = JSON.parse(localStorage.getItem('watched'));
    arr.forEach(id => watchedListFilms(id));
  } else {
    ulRef.innerHTML = 'Ваш список пока пуст.';
  }
};
buttonWatchedRef.addEventListener('click', watchedlistMarkup);
watchedlistMarkup();

fetch(`https://api.themoviedb.org/3/movie/299536?api_key=aef9cffb51e8fe7e1c3e621e64df0279`)
    .then(resolve => resolve.json()).then(data => console.log(data));