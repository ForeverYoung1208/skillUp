import CartProduct from './CartProduct/CartProduct';
import Button from '../UI/Button/Button';
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from '../UI/Modal/Modal';
import Checkout from './Checkout/Checkout';
import Profile from '../Profile/Profile';

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
        this.checkoutButton = new Button({text: 'Checkout'})
        this.checkoutButton.addEventListener('click', this.checkoutClickHandler)
        tdSubmit.append(this.checkoutButton)

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

    checkoutClickHandler(){

        const backdrop = new Backdrop(Cart.closeCheckoutHandler);
        const modal = new Modal(new Checkout(), 'custom__class');
        document.getElementById('modal-root').append(backdrop, modal);        
        
        Profile.closeCartHandler();
    }

    static closeCheckoutHandler() {

        document.querySelector('#modal-root .modal:last-of-type').remove()
        document.querySelector('#modal-root .backdrop:last-of-type').remove()
    }


    static recalculateTotal(){
        const totalInCart = document.querySelector('.cart__total')
        const productIds = JSON.parse(localStorage.getItem('cart-products'));

        const total = productIds.reduce((t, productId) => {
            t += productsData.find(({ id }) => id === productId).price;
            return t
        },0)

        totalInCart.textContent = '$'+total;
        return total;
    }
}

export default Cart;
