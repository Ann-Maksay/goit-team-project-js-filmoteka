import './main.scss';
import './js/layouts/footer.js';
import './js/features/backToTop';
import './js/modal';

if (window.innerWidth <= 767) {
  document.body.classList.add('js-mobile');
}

if (!localStorage.getItem('queue')) {
  const arryQ = [];
  localStorage.setItem('queue', JSON.stringify(arryQ));
}
if (!localStorage.getItem('watched')) {
  const arryW = [];
  localStorage.setItem('watched', JSON.stringify(arryW));
}
