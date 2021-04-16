import axios from 'axios';
import genreList from './genre';
import cartTemp from '../templates/card-film.hbs';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: 'aef9cffb51e8fe7e1c3e621e64df0279' }
const listRef = document.querySelector('.film-list');


const trending = {
    page: 1,

    async fetchTrends() {
            const {data} = await axios.get(`/trending/movie/day?page=${this.page}`);
            const infoList = data.results;

            const filmList = [];
            for (const element of infoList) {
                const film = await this.makeCard(element);
                filmList.push(film);
            };
            
            return filmList;
    },

    async makeCard(film) {
        const year = film.release_date.slice(0, 4);

        const ganreList = await genreList();

        const genre = ganreList.filter(elem => {
            if (film.genre_ids.includes(elem.id)) {
                return elem.name;
            }
        }).map(elem => elem.name);

        return {
            id : film.id,
            title: film.title,
            poster_path: film.poster_path,
            yearRelease: year,
            vote_average: film.vote_average,
            formattedGeners: genre.join(', '),
        }
    },

    async makeList() {
        try {
            const list = await this.fetchTrends();
        console.log(list);

        const listNoda = cartTemp(list);

        console.log(listNoda);

        listRef.innerHTML = listNoda;

        console.log('bla');
        return listNoda;
        } catch (error) {
            console.log(error);
        }
    }
}

export default trending;
