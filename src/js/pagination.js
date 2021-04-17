import btnTemp from '../templates/pagination.hbs';

const paginationRef = document.querySelector('.js-pagination');

const pagination = {
    currentPage: 0,
    numberOfPages: 0,
    makeBtns() {
        if (this.currentPage - 5 > 0 && this.currentPage + 5 <= this.numberOfPages) {
            console.log('middle');
            this.makeMiddleOfList();
            return;
        }
        if (this.currentPage - 5 <= 0 && this.currentPage + 5 <= this.numberOfPages) {
            console.log('start');
            this.makeStartOfList();
            return;
        }
        if (this.currentPage - 5 > 0 && this.currentPage + 5 >= this.numberOfPages) {
            console.log('end');
            this.makeEndOfList();
            return;
        }
        console.log('short');
        this.makeShortList();
    },

    makeMiddleOfList() {
        const arryBtn = [1, "...", this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, '...', this.numberOfPages];
        console.log(arryBtn);
        const btnsList = btnTemp(arryBtn);
        paginationRef.innerHTML = btnsList;
    },

    makeStartOfList() {
        const arryBtn = [1, 2, 3, 4, 5, 6, 7, '...', this.numberOfPages];
        console.log(arryBtn);
        const btnsList = btnTemp(arryBtn);
        paginationRef.innerHTML = btnsList;
    },

    makeEndOfList() {
        const arryBtn = [1, '...', this.numberOfPages - 6, this.numberOfPages - 5, this.numberOfPages - 4, this.numberOfPages - 3, this.numberOfPages - 2, this.numberOfPages - 1, this.numberOfPages];
        console.log(arryBtn);
        const btnsList = btnTemp(arryBtn);
        paginationRef.innerHTML = btnsList;
    },

    makeShortList() {
        const arryBtn = [];
        for (let count = 1; count <= this.numberOfPages; count++){
            arryBtn.push(count);
        }
        console.log(arryBtn);
        const btnsList = btnTemp(arryBtn);
        paginationRef.innerHTML = btnsList;
    },
}

export default pagination;