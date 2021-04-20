import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: 'c8971b346877ee4bba0d277ad44911fe' };

const refs = {
  contentRef: document.querySelector('.modal_content'),
  modalRef: document.querySelector('.overlay'),
  closeBtnRef: document.querySelector('.modal_close_btn'),
  filmCardRef: document.querySelector('#data-conteiner'),
};

console.log('FILMCARDREF>>', refs.filmCardRef);

const fetchDetails = async id => {
  try {
    const { data } = await axios.get(`/movie/${id}&append_to_response=images`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const state = {
  isActive: false,
};

const createTemplate = async id => {
  const {
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  } = await fetchDetails(id);

  const genresElem = genres.reduce((acc, el) => {
    return acc + ' ' + el.name;
  }, ``);

  let queueClass = 'add-btn';
  let watchedClass = 'add-btn';
  let queueMessage = 'ADD TO QUEUE';
  let watchedMessage = 'ADD TO WATCHED';

  if (localStorage.getItem('queue')) {
    const queueArry = [...JSON.parse(localStorage.getItem('queue'))];
    if (queueArry.includes(id)) {
      queueClass = 'delete-btn';
      queueMessage = 'DELETE FROM QUEUE';
    } else {
      queueClass = 'add-btn';
      queueMessage = 'ADD TO QUEUE';
    }
  }
  if (localStorage.getItem('watched')) {
    const watchedArry = [...JSON.parse(localStorage.getItem('watched'))];
    if (watchedArry.includes(id)) {
      watchedClass = 'delete-btn';
      watchedMessage = 'DELETE FROM WATCHED';
    } else {
      watchedClass = 'add-btn';
      watchedMessage = 'ADD TO WATCHED';
    }
  }

  refs.contentRef.insertAdjacentHTML(
    'beforeend',
    `<div class='modal_container'>
        <img class="modal_image" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
                    <ul class='modal_info'>
                        <li><h2 class="modal_title">${original_title}<h2></li>
                        <li>
                            <div class="modal_stats">
                                <p class="modal_text w108">Vote / Votes</p>
                                <p class="modal_text"><span class="modal_score">${vote_average}</span> / ${vote_count}</p>
                            </div>
                            <div class="modal_stats">
                                <p class="modal_text w108">Popularity</p>
                                <p class="modal_text">${popularity}</p>
                            </div>
                            <div class="modal_stats">
                                <p class="modal_text w108">Original Title</p>
                                <p class="modal_text">${original_title}</p>
                            </div>
                            <div class="modal_stats">
                                <p class="modal_text w108">Genres</p>
                                <p class="modal_text">${genresElem}</p>
                            </div>
                        </li>
                        <li><h2 class="modal_about">About</h2></li>
                        <li>
                            <article class="modal_article">${overview}</article>
                        </li>
                        <li class="button_cont">
                            <button class="modal_btn ${watchedClass}">${watchedMessage}</button>
                            <button class="modal_btn ${queueClass}">${queueMessage}</button>
                        </li>
                    </ul></div>`,
  );
};

const openModal = async e => {
  if (e.target && e.target.dataset && e.target.dataset.id) {
    createTemplate(e.target.dataset.id);
    refs.modalRef.classList.remove('dn');
    state.isActive = true;
  }
};

const closeModal = e => {
  if (state.isActive) {
    if (
      (e.code && e.code === 'Escape') ||
      e.currentTarget === e.target ||
      e.currentTarget.classList.contains('modal_close_btn')
    ) {
      console.log(e.code);
      refs.modalRef.classList.add('dn');
      refs.contentRef.innerHTML = '';
      state.isActive = false;
    }
  }
};
refs.filmCardRef.addEventListener('click', openModal);
refs.modalRef.addEventListener('click', closeModal);
refs.closeBtnRef.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal);
