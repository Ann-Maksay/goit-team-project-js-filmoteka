import trending from './fetchTrending';
import pagination from './pagination';
import cartTemp from '../templates/card-film-main.hbs';

const refs = {
    paginationRef: document.querySelector('.js-pagination'),
    listRef: document.querySelector('.film-list'),
};



async function usePagination(event) {
    const eventTarget = event.target
    if (eventTarget.nodeName !== 'SPAN' || eventTarget.classList.contains('active') || eventTarget.textContent === '...'){
        return;
    }

    trending.page = eventTarget.textContent;
    await makeList();

    makePagination(trending.page, trending.numberOfPages);
}



async function makeList() {
        try {
            const list = await trending.fetchTrends();
            const listNoda = cartTemp(list);

            refs.listRef.innerHTML = listNoda;

            return listNoda;
        } catch (error) {
            console.log(error);
        }
};

async function makePagination(page, numberOfPages) {
    pagination.currentPage = page;
    pagination.numberOfPages = numberOfPages;
    pagination.makeBtns();
}

makeList();