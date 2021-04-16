const API_KEY = 'aef9cffb51e8fe7e1c3e621e64df0279';
const BASE_URL = 'https://api.themoviedb.org/3';
const ID_URL = `${BASE_URL}/movie/`;

const watched = ['id', 'original_language', 'original_title', 'overview', 'poster_path', 'release_date', 'title', 'video',];

const ID_URL = document.querySelector(`${BASE_URL}/movie/`);

const markup = watched.map(setItem => `<li><a href="">${setItem}</a></li>`).join('');

const element = '';

BASE_URL.insertAdjacentHTML = ('beforeend', element);