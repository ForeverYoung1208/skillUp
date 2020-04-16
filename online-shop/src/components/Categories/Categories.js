import Products from '../Products/Products';
import Pagination from '../Pagination/Pagination';
import CategoryButton from './CategoryButton/CategoryButton';
import productsData from '../../assets/database/products';
import './Categories.scss';

class Categories {
    constructor() {
        this.categories = document.createElement('div');

        this.categories.className = 'categories';

        const categoryList = productsData.reduce((result, { category }) => {
            if (!result.includes(category)) {
                result.push(category);
            }

            return result;
        }, []);

        const activeCategory = Categories.getActiveCategory();

        const categoryBtns = categoryList.map(category => {
            return new CategoryButton(category, category.toLowerCase() === activeCategory);
        });

        this.categories.addEventListener('click', this.switchCategoryHandler.bind(this));

        this.categories.append(...categoryBtns);

        return this.categories;
    }

    static getActiveCategory() {
        const activeCategoryBtn = document.querySelector('.category-btn--active');

        return activeCategoryBtn ? activeCategoryBtn.dataset.category : 'smartphone';
    }

    switchCategoryHandler(e) {
        const categoryBtn = e.target.closest('.category-btn');

        if (!categoryBtn) return;

        const activeCategoryBtn = document.querySelector('.category-btn--active');
        activeCategoryBtn.classList.remove('category-btn--active');

        categoryBtn.classList.add('category-btn--active');

        Pagination.render(null, true);
        Products.render();
    }
}

export default Categories;
