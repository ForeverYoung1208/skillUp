import './PaginationButton.scss';

class PaginationButton {
    constructor(pageNumber, activePageNumber) {
        this.paginationButton = document.createElement('button');

        this.paginationButton.className = pageNumber === +activePageNumber
            ? 'pagination-btn pagination-btn--active'
            : 'pagination-btn';

        this.paginationButton.innerHTML = `
            <span class="pagination-btn__text">
                ${pageNumber}
            </span>
        `;

        this.paginationButton.setAttribute('data-page', pageNumber);

        return this.paginationButton;
    }
}

export default PaginationButton;
