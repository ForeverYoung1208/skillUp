import Input from '../UI/Input/Input';
import './Search.scss';

class Search {
    constructor() {
        this.search = document.createElement('div');

        this.search.className = 'search';
        this.search.innerHTML = '<i class="fas fa-search search__icon"></i>';

        this.search.prepend(new Input({
            name: 'search',
            placeholder: 'Search...',
            additionalClasses: 'search__input'
        }));

        this.input = this.search.firstElementChild;
        this.icon = this.search.lastElementChild;

        this.input.addEventListener('focus', this.onFocusHandler.bind(this));
        this.input.addEventListener('blur', this.onBlurHandler.bind(this));

        return this.search;
    }

    onFocusHandler() {
        this.icon.classList.add('search__icon--focused');
    }

    onBlurHandler() {
        this.icon.classList.remove('search__icon--focused');
    }
}

export default Search;
