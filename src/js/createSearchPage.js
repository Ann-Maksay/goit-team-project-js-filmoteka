import searching from './fetchQuery';
import _ from 'lodash';
import pagination from './pagination';
import cartTemp from '../templates/card-film-main.hbs';
import spiner from './spiner';

const refs = {
  searchInput: document.querySelector('.js-search-input'),
  formRef: document.querySelector('.form-search-home'),
  filmsContainer: document.querySelector('.js-films'),
  searchPagination: document.querySelector('.search-pagination'),
  paginationRef: document.querySelector('.js-pagination'),
  errorRef: document.querySelector('#searchError'),
};

export default refs;

const optimazeSearch = _.debounce(searchFilm, 700);

refs.searchInput.addEventListener('input', optimazeSearch);
refs.formRef.addEventListener('submit', searchFilm);
refs.searchPagination.addEventListener('click', searchFilm);

async function searchFilm(event) {
  event.preventDefault();

  const eventTarget = event.target;
  const inputValue = eventTarget.value;

  if (!refs.errorRef.classList.contains('is-hidden')) {
    refs.errorRef.classList.add('is-hidden');
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

  searching.searchQuery = refs.searchInput.value;

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
  console.log(searching.page);
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
  console.log(searching.page);
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
      refs.filmsContainer.innerHTML = ' ';
      spiner.hideSpin();
      console.log(refs.errorRef);
      if (refs.errorRef.classList.contains('is-hidden')) {
        refs.errorRef.classList.remove('is-hidden');
      }
      makeSearchPagination(searching.page, searching.numberOfPages);
      return;
    }

    const listNoda = cartTemp(list);

    refs.filmsContainer.innerHTML = listNoda;
    spiner.hideSpin();
    makeSearchPagination(searching.page, searching.numberOfPages);

    return listNoda;
  } catch (error) {
    console.log(error);
  }
}

async function makeSearchPagination(page, numberOfPages) {
  pagination.paginationRef = refs.searchPagination;
  refs.paginationRef.classList.add('is-hidden');
  refs.searchPagination.classList.remove('is-hidden');
  pagination.currentPage = page;
  pagination.numberOfPages = numberOfPages;
  if (document.body.classList.contains('js-mobile')) {
    pagination.makeMobileBtns();
    return;
  }
  pagination.makeBtns();
}
