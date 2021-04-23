import trending from './servises/fetchTrending';
import pagination from './features/pagination';
import cartTemp from '../templates/card-film-main.hbs';
import spiner from './features/spiner';
import refs from './refs';

const createTrendList = {
  async steapBack() {
    if (trending.page === 1) {
      return;
    }
    trending.page--;

    await this.makeList();

    pagination.currentPage = 0;
    pagination.numberOfPages = 0;

    window.scrollTo({
      top: 200,
      behavior: 'smooth',
    });
  },

  async steapForward() {
    if (trending.page === trending.numberOfPages) {
      return;
    }
    trending.page++;

    await this.makeList();

    pagination.currentPage = 0;
    pagination.numberOfPages = 0;

    window.scrollTo({
      top: 200,
      behavior: 'smooth',
    });
  },

  async makeList() {
    try {
      spiner.showSpin();
      const list = await trending.fetchTrends();
      const listNoda = cartTemp(list);

      refs.listRef.innerHTML = listNoda;
      spiner.hideSpin();
      this.makePagination(trending.page, trending.numberOfPages);

      return listNoda;
    } catch (error) {
      console.log(error);
    }
  },

  async makePagination(page, numberOfPages) {
    pagination.currentPage = page;
    pagination.numberOfPages = numberOfPages;
    pagination.paginationRef = document.querySelector('.js-pagination');
    refs.paginationRef.classList.remove('is-hidden');
    refs.searchPagination.classList.add('is-hidden');
    if (document.body.classList.contains('js-mobile')) {
      pagination.makeMobileBtns();
      return;
    }
    pagination.makeBtns();
  },
};

async function usePagination(event) {
  const eventTarget = event.target;

  if (
    (eventTarget.nodeName !== 'SPAN' && eventTarget.nodeName !== 'I') ||
    eventTarget.classList.contains('active-btn-pg') ||
    eventTarget.textContent === '...'
  ) {
    return;
  }

  if (eventTarget.classList.contains('js-previous')) {
    await createTrendList.steapBack();
    return;
  }
  if (eventTarget.classList.contains('js-next')) {
    await createTrendList.steapForward();
    return;
  }

  trending.page = Number(eventTarget.textContent);

  window.scrollTo({
    top: 200,
    behavior: 'smooth',
  });

  await createTrendList.makeList();

  pagination.currentPage = 0;
  pagination.numberOfPages = 0;
}

refs.paginationRef.addEventListener('click', usePagination);
pagination.paginationRef = document.querySelector('.js-pagination');

createTrendList.makeList();

export default createTrendList;
