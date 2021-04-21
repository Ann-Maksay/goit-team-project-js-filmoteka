import './main.scss';
import './js/footer.js';
import './js/backToTop';
import './js/modal';
//import test from './js/example';

// ключ для использования API
//const key = 'aef9cffb51e8fe7e1c3e621e64df0279';

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
