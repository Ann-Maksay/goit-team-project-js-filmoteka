function checkFilms(films) {
  return new Promise((res, rej) => {
    if (films.status === 404) {
      rej('There is no such film');
    } else {
      if (films) {
        res(films);
      }
    }
  });
}

export default checkFilms;
