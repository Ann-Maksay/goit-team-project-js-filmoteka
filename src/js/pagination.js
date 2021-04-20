import btnTemp from '../templates/pagination.hbs';

// const paginationRef = document.querySelector('.js-pagination');

const pagination = {
  currentPage: 0,
  numberOfPages: 0,
  paginationRef: document.querySelector('.js-pagination'),
  makeBtns() {
    if (
      this.currentPage - 5 > 0 &&
      this.currentPage + 5 <= this.numberOfPages
    ) {
      // console.log('middle ' + this.currentPage + ' ' + this.numberOfPages);
      this.makeMiddleOfList();
      this.changeActive();
      return;
    }
    if (
      this.currentPage - 5 <= 0 &&
      this.currentPage + 5 <= this.numberOfPages
    ) {
      this.makeStartOfList();
      this.changeActive();
      return;
    }
    if (
      this.currentPage - 5 > 0 &&
      this.currentPage + 5 >= this.numberOfPages
    ) {
      this.makeEndOfList();
      this.changeActive();
      return;
    }
    this.makeShortList();
    this.changeActive();
  },

  makeMobileBtns() {
    if (this.numberOfPages <= 5 || this.currentPage <= 3) {
      console.log('short');
      this.makeShortMobalList();
      this.changeActive();
      return;
    }
    if (this.currentPage + 4 >= this.numberOfPages) {
      console.log('reverse');
      this.makeReverseShortList();
      this.changeActive();
      return;
    }
    console.log('midlle');
    this.makeShortMiddleList();
    this.changeActive();
  },

  makeMiddleOfList() {
    const arryBtn = [
      1,
      '...',
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
      '...',
      this.numberOfPages,
    ];
    // console.log(arryBtn);
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  makeStartOfList() {
    const arryBtn = [1, 2, 3, 4, 5, 6, 7, '...', this.numberOfPages];
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  makeEndOfList() {
    const arryBtn = [
      1,
      '...',
      this.numberOfPages - 6,
      this.numberOfPages - 5,
      this.numberOfPages - 4,
      this.numberOfPages - 3,
      this.numberOfPages - 2,
      this.numberOfPages - 1,
      this.numberOfPages,
    ];
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  makeShortList() {
    const arryBtn = [];
    for (let count = 1; count <= this.numberOfPages; count++) {
      arryBtn.push(count);
    }
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  makeShortMobalList() {
    const arryBtn = [];
    for (let count = 1; count <= 5; count++) {
      arryBtn.push(count);
    }
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  makeReverseShortList() {
    const arryBtn = [];
    for (let count = 4; count >= 0; count--) {
      arryBtn.push(this.numberOfPages - count);
    }
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  makeShortMiddleList() {
    const arryBtn = [];
    for (
      let count = this.currentPage - 2;
      count <= this.currentPage + 2;
      count++
    ) {
      arryBtn.push(count);
    }
    const btnsList = btnTemp(arryBtn);
    this.paginationRef.innerHTML = btnsList;
  },

  changeActive() {
    const btnsArry = this.paginationRef.querySelectorAll('.page-link');
    btnsArry.forEach(elem => {
      if (elem.classList.contains('active-btn-pg')) {
        elem.classList.remove('active-btn-pg');
      }
    });

    btnsArry.forEach(elem => {
      if (elem.textContent === `${this.currentPage}`) {
        elem.classList.add('active-btn-pg');
      }
    });
  },
};

export default pagination;
