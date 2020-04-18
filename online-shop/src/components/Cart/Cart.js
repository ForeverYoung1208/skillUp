import CartProduct from './CartProduct/CartProduct';
import Button from '../UI/Button/Button';

import productsData from '../../assets/database/products.json';
import './Cart.scss';

class Cart {
    constructor() {
        this.cart = document.createElement('div');

        this.cart.className = 'cart';
        this.cart.innerHTML = `
            <table class="cart__table">
                <thead>
                    <tr>
                        <th class="cart__th">ID</th>
                        <th class="cart__th">Image</th>
                        <th class="cart__th">Model</th>
                        <th class="cart__th">Price</th>
                        <th class="cart__th">Quantity</th>
                        <th class="cart__th">Total</th>
                        <th class="cart__th"></th>
                    </tr>
                </thead>

                <tbody></tbody>

                <tfoot>
                    <tr>
                        <td colspan="5" class="cart__td">Total</td>
                        <td class="cart__td cart__total"></td>
                        <td class="cart__td"></td>
                    </tr>
                    <tr>
                        <td colspan='7' class='cart__td-submit'></td>
                    </tr>
                </tfoot>
            </table>
        `;

        const products = this.getProductsFromStorage();

        const { total, cartProducts } = products.reduce((result, product) => {
            result.total += product.total;
            result.cartProducts.push(new CartProduct(product));

            return result;
        }, { total: 0, cartProducts: [] });

        const tbody = this.cart.querySelector('tbody');
        const cartTotal = this.cart.querySelector('.cart__total');

        tbody.append(...cartProducts);
        cartTotal.textContent = `$${total}`;

        const tdSubmit = this.cart.querySelector('.cart__td-submit')
        tdSubmit.append(new Button({text: 'Checkout'}))

        return this.cart;
    }

    getProductsFromStorage() {
        const productsFromStorage = localStorage.getItem('cart-products');

        if (!productsFromStorage) return [];

        const productIds = JSON.parse(productsFromStorage);

        return productIds.reduce((result, productId) => {
            const productInCart = result.find(p => p.id === productId);

            if (productInCart) {
                productInCart.quantity++;
                productInCart.total += productInCart.price;
            } else {
                const product = productsData.find(({ id }) => id === productId);
    
                result.push({
                    id: productId,
                    imageSrc: product.imageSrc,
                    model: product.model,
                    price: product.price,
                    quantity: 1,
                    total: product.price
                });
            }

            return result;
        }, []);
    }
}

export default Cart;
