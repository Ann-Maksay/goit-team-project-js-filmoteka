import axios from 'axios';
import genreList from './genre';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: 'aef9cffb51e8fe7e1c3e621e64df0279' }


const trending = {
    async fetcgTrends() {
        try {
            const {data} = await axios.get(`/trending/movie/day?page=1&=9`);
            const infoList = data.results;

            const filmList = [];
            for (const element of infoList) {
                const film = await this.makeCard(element);
                filmList.push(film);
            };
            
            console.log(filmList);
            
        } catch (error) {
            console.log(error);
        }
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
            release_date: year,
            vote_average: film.vote_average,
            genre: genre.join(', '),
        }
    }
}

trending.fetcgTrends();



// В шаблон карточки идут:
// poster_path - для адреса изображения
//     < img src = "https://image.tmdb.org/t/p/w300/{{poster_path}}" alt = "{{title}}" >
//     возможные размеры = "w92", "w154", "w185", "w342", "w500", "w780", "original"

// title - название
// vote_average - оценка
// release_date - дата
// genre - жанры   