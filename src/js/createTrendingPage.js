import trending from './fetchTrending';
import pagination from './pagination';
import cartTemp from '../templates/card-film-main.hbs';

const refs = {
    paginationRef: document.querySelector('.js-pagination'),
    listRef: document.querySelector('.film-list'),
};

refs.paginationRef.addEventListener('click', usePagination);

async function usePagination(event) {
    const eventTarget = event.target

    if ((eventTarget.nodeName !== 'SPAN' && eventTarget.nodeName !== 'I')|| eventTarget.classList.contains("active-btn-pg") || eventTarget.textContent === '...'){
        return;
    }


    if (eventTarget.classList.contains("js-previous")) {
        await steapBack();
        return;
    }
    if (eventTarget.classList.contains("js-next")) {
        await steapForward();
        return;
    }

    trending.page = Number(eventTarget.textContent);

    await makeList();

    pagination.currentPage = 0;
    pagination.numberOfPages = 0;

    window.scrollTo({
        top: 200,
        behavior: 'smooth',
    })
}

async function steapBack() {
    console.log(trending.page);
    if (trending.page === 1) {
        return;
    }
    trending.page--;

    await makeList();

    pagination.currentPage = 0;
    pagination.numberOfPages = 0;

    window.scrollTo({
        top: 200,
        behavior: 'smooth',
    })
}

async function steapForward() {
    console.log(trending.page);
    if (trending.page === trending.numberOfPages) {
        return;
    }
    trending.page++;

    await makeList();

    pagination.currentPage = 0;
    pagination.numberOfPages = 0;

    window.scrollTo({
        top: 200,
        behavior: 'smooth',
    })
}

async function makeList() {
        try {
            const list = await trending.fetchTrends();
            const listNoda = cartTemp(list);

            refs.listRef.innerHTML = listNoda;

            makePagination(trending.page, trending.numberOfPages);

            return listNoda;
        } catch (error) {
            console.log(error);
        }
};

async function makePagination(page, numberOfPages) {
    pagination.currentPage = page;
    pagination.numberOfPages = numberOfPages;
    if (document.body.classList.contains('js-mobile')) {
        pagination.makeMobileBtns();
        return
    }
    pagination.makeBtns();
}

makeList();

