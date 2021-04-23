import _ from 'lodash';

const toTopBtnsRef = document.querySelector('.toTopBtn');

function scrollIvent() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    toTopBtnsRef.classList.remove('is-hidden');
  } else {
    toTopBtnsRef.classList.add('is-hidden');
  }
}

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  toTopBtnsRef.classList.add('is-hidden');
}

const optimizedScroll = _.throttle(scrollIvent, 500);

toTopBtnsRef.addEventListener('click', toTop);
window.addEventListener('scroll', optimizedScroll);
