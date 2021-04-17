import axios from 'axios';
import genreList from './genre';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: 'aef9cffb51e8fe7e1c3e621e64df0279' }


const trending = {
    page: 1,
    numberOfPages: 0,

    async fetchTrends() {
        this.numberOfPages = 0;
        const {data} = await axios.get(`/trending/movie/day?page=${this.page}`);
        const infoList = data.results;

        if (data.total_pages <= 20) {
            this.numberOfPages = data.total_pages;
        } else {
            this.numberOfPages = 20;
        }

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
}

export default trending;
