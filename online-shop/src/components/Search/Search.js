import Input from '../UI/Input/Input';
import Pagination from '../Pagination/Pagination';
import Products from '../Products/Products';
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
        this.input.addEventListener('keyup', this.onKeyUpHandler.bind(this))

        return this.search;
    }

    onFocusHandler() {
        this.icon.classList.add('search__icon--focused');
    }

    onBlurHandler() {
        this.icon.classList.remove('search__icon--focused');
    }

    onKeyUpHandler(){
        // const pattern = e.target.value
        window.inputTimeout ? clearTimeout(window.inputTimeout) : null
        window.inputTimeout = setTimeout( ()=>{
            Pagination.render(null, true);
            Products.render();
        },500)        

    }
}

export default Search;
