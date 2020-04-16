import Button from '../../UI/Button/Button';
import Rating from '../../Rating/Rating';
import Spinner from '../../UI/Spinner/Spinner';
import './Product.scss';

class Product {
    constructor({
        id,
        category,
        model,
        manufacturer,
        country,
        imageSrc,
        price,
        rating,
        description,
        warranty
    }) {
        this.product = document.createElement('div');

        this.product.className = 'product';
        this.product.setAttribute('data-id', id);
        this.product.innerHTML = `
            <div class="product__top">
                <h2 class="product__category">${category}</h2>
            </div>

            <div class="product__img-wrapper">
                <img src="${imageSrc}" alt="${model}" class="product__img product__img--hidden">
            </div>

            <h2 class="product__manufacturer">${manufacturer}</h2>
            <h1 class="product__model">${model}</h1>
            <h3 class="product__country">${country}</h3>

            <strong class="product__price">$${price}</strong>
            <h4 class="product__warranty">Warranty: ${warranty}</h4>
            <p class="product__description">${description.slice(0, 150)}...</p>
        `;

        const imgWrapper = this.product.querySelector('.product__img-wrapper');
        const img = imgWrapper.firstElementChild;

        img.addEventListener('load', this.onLoadImageHandler);

        imgWrapper.append(new Spinner('product__spinner'));

        this.product.firstElementChild.append(new Rating(rating));

        this.product.append(new Button({
            text: 'Add to Cart',
            additionalClasses: 'product__btn'
        }));

        return this.product;
    }

    onLoadImageHandler(e) {
        const image = e.target;
        const spinner = image.nextElementSibling;

        setTimeout(() => {
            image.classList.remove('product__img--hidden');
            spinner.remove();
        }, 500);
    }
}

export default Product;
