import debounce from 'lodash.debounce';

import fetchFilms from './fetchFilms';
import refs from './refs.js';

refs.searchInput.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();

    const input = event.target;
    const inputValue = input.value;

    refs.countriesContainer.innerHTML = '';

    if (inputValue.length > 0) {
      fetchFilms(inputValue);
    }
  }, 500),
);
