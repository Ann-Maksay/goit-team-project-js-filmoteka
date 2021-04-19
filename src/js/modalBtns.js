
let id;

// localStorage

const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
monitorBtnChange(); 
watchedBtn.addEventListener('click', handleBtnWatched);
queueBtn.addEventListener('click', handleBtnQueue);

function handleBtnWatched() {
  toggleToWatched(id);
}

function handleBtnQueue() {
  toggleToQueue(id);
}

// проверяет на наличие фильма в масиве, если нужно добавляет его 

function toggleToWatched() {
    let filmsWatched = [];
    let localStorageData = localStorage.getItem('filmsWatched');
    if (localStorageData) {
      filmsWatched = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;
    const index = filmsWatched.indexOf(currentIdFilm);
    if (index > -1) {
      filmsWatched.splice(index, 1);
    } else filmsWatched.push(id);
    localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
    monitorBtnChange();
  }

  function toggleToQueue() {
    let filmsQueue = [];
    let localStorageData = localStorage.getItem('filmsQueue');
    if (localStorageData) {
      filmsQueue = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;
    const index = filmsQueue.indexOf(currentIdFilm);
    if (index > -1) {
      filmsQueue.splice(index, 1);
    } else filmsQueue.push(id);
    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
    monitorBtnChange();
  }

  // проверяет обе кнопки, и вносит изменение в визуальные составляющие 
function monitorBtnChange() {
    let filmsWatched = [];
    let localStorageData = localStorage.getItem('filmsWatched');
    if (localStorageData) {
      filmsWatched = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;

    let filmId = filmsWatched.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      watchedBtn.textContent = 'Delete from watched';
      watchedBtn.classList.remove('active'); // класс актив для визуализации 
    } else {
      watchedBtn.textContent = 'Add to watched';
      watchedBtn.classList.add('active');
    }

    let filmsQueue = [];
    localStorageData = localStorage.getItem('filmsQueue');
    if (localStorageData) {
      filmsQueue = [...JSON.parse(localStorageData)];
    }

    filmId = filmsQueue.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      queueBtn.textContent = 'Delete from Queue';
      queueBtn.classList.remove('active');
    } else {
      queueBtn.textContent = 'Add to Queue';
      queueBtn.classList.add('active');
    }
    console.log(filmsWatched);
  }

 
