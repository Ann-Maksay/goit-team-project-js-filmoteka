const apiKey = 'aef9cffb51e8fe7e1c3e621e64df0279'

function fetchFilms(searchQuery) {
  const url = `https://api.themoviedb.org/3/search/movie/query=${searchQuery}&api_key=${apiKey}`;
  return fetch(url).then((res) => res.json()).then(data => console.log(data));
}

export default fetchFilms