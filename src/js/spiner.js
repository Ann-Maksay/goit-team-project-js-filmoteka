const spinRef = document.querySelector('.js-spin');


const spiner = {

    showSpin() {
        spinRef.classList.remove('is-hidden');
    },

    hideSpin() {
        spinRef.classList.add('is-hidden');
    }
}

export default spiner;