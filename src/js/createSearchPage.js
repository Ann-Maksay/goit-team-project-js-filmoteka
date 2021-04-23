import searching from './servises/fetchQuery';
import _ from 'lodash';
import pagination from './features/pagination';
import cartTemp from '../templates/card-film-main.hbs';
import spiner from './features/spiner';
import createTrendList from './createTrendingPage';

const optimazeSearch = _.debounce(searchFilm, 700);

const errorRef = document.querySelector('#searchError');
const searchPagination = document.querySelector('.search-pagination');
const searchInput = document.querySelector('.js-search-input');
const formRef = document.querySelector('.form-search-home');
const filmsContainer = document.querySelector('.js-films');
const paginationRef = document.querySelector('.js-pagination');

searchInput.addEventListener('input', optimazeSearch);
formRef.addEventListener('submit', searchFilm);
searchPagination.addEventListener('click', searchFilm);

async function searchFilm(event) {
  event.preventDefault();

  const eventTarget = event.target;
  const inputValue = eventTarget.value;

  if (!errorRef.classList.contains('is-hidden')) {
    errorRef.classList.add('is-hidden');
  }

  if (
    (eventTarget.nodeName !== 'SPAN' &&
      eventTarget.nodeName !== 'I' &&
      eventTarget.nodeName !== 'INPUT') ||
    eventTarget.classList.contains('active-btn-pg') ||
    eventTarget.textContent === '...' ||
    (inputValue == null && eventTarget.nodeName === 'INPUT')
  ) {
    return;
  }

  searching.searchQuery = searchInput.value;

  if (eventTarget.classList.contains('js-previous')) {
    await steapBackSearch();
    return;
  }
  if (eventTarget.classList.contains('js-next')) {
    await steapForwardSearch();
    return;
  }
  if (eventTarget.nodeName === 'SPAN' || eventTarget.nodeName === 'I') {
    searching.page = Number(eventTarget.textContent);
    window.scrollTo({
      top: 200,
      behavior: 'smooth',
    });
  } else {
    searching.page = 1;
  }

  await makeSearchList();

  pagination.currentPage = 0;
  pagination.numberOfPages = 0;
}

async function steapBackSearch() {
  if (searching.page === 1) {
    return;
  }
  searching.page--;

  await makeSearchList();

  pagination.currentPage = 0;
  pagination.numberOfPages = 0;

  window.scrollTo({
    top: 200,
    behavior: 'smooth',
  });
}

async function steapForwardSearch() {
  if (searching.page === searching.numberOfPages) {
    return;
  }
  searching.page++;

  await makeSearchList();

  pagination.currentPage = 0;
  pagination.numberOfPages = 0;

  window.scrollTo({
    top: 200,
    behavior: 'smooth',
  });
}

async function makeSearchList() {
  try {
    spiner.showSpin();
    const list = await searching.fetchQuery();
    if (!list) {
      filmsContainer.innerHTML = ' ';
      await createTrendList.makeList();
      spiner.hideSpin();
      if (errorRef.classList.contains('is-hidden')) {
        errorRef.classList.remove('is-hidden');
      }
      return;
    }

    const listNoda = cartTemp(list);

    filmsContainer.innerHTML = listNoda;
    spiner.hideSpin();
    makeSearchPagination(searching.page, searching.numberOfPages);

    return listNoda;
  } catch (error) {
    console.log(error);
  }
}

async function makeSearchPagination(page, numberOfPages) {
  pagination.paginationRef = searchPagination;
  paginationRef.classList.add('is-hidden');
  searchPagination.classList.remove('is-hidden');
  pagination.currentPage = page;
  pagination.numberOfPages = numberOfPages;
  if (document.body.classList.contains('js-mobile')) {
    pagination.makeMobileBtns();
    return;
  }
  pagination.makeBtns();
}
