import axios from 'axios';

async function getGenreList() {
    const { data } = await axios.get('genre/movie/list?');
    const genre = data.genres;
    return genre;
}

export default getGenreList;

