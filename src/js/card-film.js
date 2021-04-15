import cardMarkup from '../templates/card-film.hbs';

const key = 'aef9cffb51e8fe7e1c3e621e64df0279';
const movieId = 458578;
const divRef = document.querySelector('.card-film');

const filmCard = () => {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`)
    .then(resolve => resolve.json())
    .then(data => {
      data.formattedGeners = data.genres.map(item => item.name).join(', ');
      const [year, month, day] = data.release_date.split('-');
      data.yearRelease = year;
      const markup = cardMarkup(data);
      divRef.insertAdjacentHTML('beforeend', markup);
    });
};

export default filmCard;
