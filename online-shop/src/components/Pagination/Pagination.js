import PaginationButton from './PaginationButton/PaginationButton';
import Products from '../Products/Products';
import './Pagination.scss';

class Pagination {
    constructor() {
        this.pagination = document.createElement('div');

        this.pagination.className = 'pagination';

        Pagination.render(this.pagination);

        this.pagination.addEventListener('click', this.switchPageHandler);

        return this.pagination;
    }

    static getActivePage() {
        const activePaginationBtn = document.querySelector('.pagination-btn--active');

        return activePaginationBtn ? activePaginationBtn.dataset.page : '1';
    }

    static render(location, refresh) {
        const paginationBtns = [];

        const totalAmount = Products.filter().length;
        const activePageNumber = refresh ? '1' : Pagination.getActivePage();

        for (let i = 0; i < Math.ceil(totalAmount / 9); i++) {
            paginationBtns.push(new PaginationButton(i + 1, activePageNumber));
        }

        const paginationContainer = document.querySelector('.pagination');
        const where = paginationContainer || location;

        if (paginationContainer) {
            paginationContainer.innerHTML = '';
        }

        if (paginationBtns.length > 1) {
            where.classList.remove('pagination--hidden');
            where.append(...paginationBtns);
        } else {
            where.classList.add('pagination--hidden');
        }
    }

    switchPageHandler(e) {
        const paginationBtn = e.target.closest('.pagination-btn');

        if (!paginationBtn) return;

        const activePaginationBtn = document.querySelector('.pagination-btn--active');
        activePaginationBtn.classList.remove('pagination-btn--active');

        paginationBtn.classList.add('pagination-btn--active');

        Products.render();
        Pagination.render();
    }
}

export default Pagination;
