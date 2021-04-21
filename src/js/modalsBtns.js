import libraryMarkap from './libraryMarkup';

const btnFunction = {
  handleBtnWatched(event) {
    const eventTarget = event.target;

    const id = eventTarget.dataset.id;
    if (eventTarget.classList.contains('add-btn')) {
      addDelFunctions.addToWatched(id, eventTarget);

      const watched = document.querySelector('.js-watched-button');
      if (watched) {
        if (watched.classList.contains('active-btn')) {
          libraryMarkap.watchedlistMarkup();
        }
      }
      return;
    }
    if (eventTarget.classList.contains('delete-btn')) {
      addDelFunctions.deleteFromWatched(id, eventTarget);
      const watched = document.querySelector('.js-watched-button');
      if (watched) {
        if (watched.classList.contains('active-btn')) {
          libraryMarkap.watchedlistMarkup();
        }
      }
      return;
    }
  },

  handleBtnQueue(event) {
    const eventTarget = event.target;

    const id = eventTarget.dataset.id;
    if (eventTarget.classList.contains('add-btn')) {
      addDelFunctions.addToQueue(id, eventTarget);

      const queue = document.querySelector('.js-queve-button');
      if (queue) {
        if (queue.classList.contains('active-btn')) {
          libraryMarkap.queueListMarkup();
        }
      }
      return;
    }
    if (eventTarget.classList.contains('delete-btn')) {
      addDelFunctions.deleteFromQueue(id, eventTarget);

      const queue = document.querySelector('.js-queve-button');
      if (queue) {
        if (queue.classList.contains('active-btn')) {
          libraryMarkap.queueListMarkup();
        }
      }
      return;
    }
  },
};

const addDelFunctions = {
  addToWatched(id, eventTarget) {
    const arryW = [...JSON.parse(localStorage.getItem('watched'))];
    arryW.push(id);
    localStorage.setItem('watched', JSON.stringify(arryW));

    const arryQ = [...JSON.parse(localStorage.getItem('queue'))];
    if (arryQ.includes(id)) {
      const secondTarget = document.querySelector('.queue-btn');
      this.deleteFromQueue(id, secondTarget);

      const queue = document.querySelector('.js-queve-button');
      if (queue) {
        if (queue.classList.contains('active-btn')) {
          libraryMarkap.queueListMarkup();
        }
      }
    }

    eventTarget.classList.replace('add-btn', 'delete-btn');
    eventTarget.textContent = 'DELETE FROM WATCHED';
  },

  addToQueue(id, eventTarget) {
    const arryQ = [...JSON.parse(localStorage.getItem('queue'))];
    arryQ.push(id);
    localStorage.setItem('queue', JSON.stringify(arryQ));

    const arryW = [...JSON.parse(localStorage.getItem('watched'))];
    if (arryW.includes(id)) {
      const secondTarget = document.querySelector('.watched-btn');
      this.deleteFromWatched(id, secondTarget);

      const watched = document.querySelector('.js-watched-button');
      if (watched) {
        if (watched.classList.contains('active-btn')) {
          libraryMarkap.watchedlistMarkup();
        }
      }
    }

    eventTarget.classList.replace('add-btn', 'delete-btn');
    eventTarget.textContent = 'DELETE FROM QUEUE';
  },

  deleteFromWatched(id, eventTarget) {
    const arryW = [...JSON.parse(localStorage.getItem('watched'))];
    const index = arryW.indexOf(id);
    arryW.splice(index, 1);
    localStorage.setItem('watched', JSON.stringify(arryW));

    eventTarget.classList.replace('delete-btn', 'add-btn');
    eventTarget.textContent = 'ADD TO WATCHED';
  },

  deleteFromQueue(id, eventTarget) {
    const arryQ = [...JSON.parse(localStorage.getItem('queue'))];
    const index = arryQ.indexOf(id);
    arryQ.splice(index, 1);
    localStorage.setItem('queue', JSON.stringify(arryQ));

    eventTarget.classList.replace('delete-btn', 'add-btn');
    eventTarget.textContent = 'ADD TO QUEUE';
  },
};

export default btnFunction;
