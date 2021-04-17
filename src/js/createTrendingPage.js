import trending from './fetchTrending';
import pagination from './pagination';
import cartTemp from '../templates/card-film.hbs';

const refs = {
    paginationRef: document.querySelector('.js-pagination'),
    listRef: document.querySelector('.film-list'),
};



function usePagination(event) {
    const eventTarget = event.target
    if (eventTarget.nodeName !== 'SPAN' || eventTarget.classList.contains('active')) {
        return;
    }
}



async function makeList() {
        try {
            const list = await trending.fetchTrends();
            const listNoda = cartTemp(list);

            listRef.innerHTML = listNoda;

            return listNoda;
        } catch (error) {
            console.log(error);
        }
};