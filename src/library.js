import libraryMarkap from './js/libraryMarkup';

const buttonQueveRef = document.querySelector('.js-queve-button');
const buttonWatchedRef = document.querySelector('.js-watched-button');

buttonQueveRef.addEventListener('click', libraryMarkap.queueListMarkup);
buttonWatchedRef.addEventListener('click', libraryMarkap.watchedlistMarkup);

libraryMarkap.watchedlistMarkup();
