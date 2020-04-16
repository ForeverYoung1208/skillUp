import Product from './Product/Product';
import Categories from '../Categories/Categories';
import Pagination from '../Pagination/Pagination';

import Profile from '../Profile/Profile';

import productsData from '../../assets/database/products';
import './Products.scss';

class Products {
    constructor() {
        this.products = document.createElement('div');

        this.products.className = 'products';

        Products.render(this.products);

        this.products.addEventListener('click', this.addProductToCart.bind(this));

        return this.products;
    }

    static filter() {
        const activeCategory = Categories.getActiveCategory();

        const filteredProducts = productsData.filter(({ category }) => {
            return category.toLowerCase() === activeCategory;
        });

        return filteredProducts;
    }

    static render(location) {
        const filteredProducts = Products.filter();
        const activePageNumber = Pagination.getActivePage();

        const productList = filteredProducts
            .slice((activePageNumber - 1) * 9, activePageNumber * 9)
            .map(product => new Product(product));

        const productsContainer = document.querySelector('.products');
        const where = productsContainer || location;

        if (productsContainer) {
            productsContainer.innerHTML = '';
        }

        where.append(...productList);
    }

    addProductToCart(e) {
        const btn = e.target;

        if (!btn.classList.contains('product__btn')) return;

        Profile.updateCartItemsCount();


        const productId = +btn.parentElement.dataset.id;

        const cartProductsFromStorage = localStorage.getItem('cart-products');

        if (cartProductsFromStorage) {
            const parsedProducts = JSON.parse(cartProductsFromStorage);
            const newCartProducts = parsedProducts.concat(productId); // [...parsedProducts, id]

            return localStorage.setItem('cart-products', JSON.stringify(newCartProducts));
        }

        localStorage.setItem('cart-products', JSON.stringify([productId]));
    }
}

export default Products;
