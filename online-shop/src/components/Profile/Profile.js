import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Cart from '../Cart/Cart';
import './Profile.scss';

class Profile {
    constructor(userName) {
        this.profile = document.createElement('div');
        
        JSON.parse(localStorage.getItem('cart-products')) 
            ? this.cartItemsCount = JSON.parse(localStorage.getItem('cart-products')).length
            : this.cartItemsCount = ''
        this.profile.className = 'profile';
        this.profile.innerHTML = `
            <h1 class="profile__username">${userName}</h1>

            <div class="profile__icon-wrapper">
                <i class="fas fa-cart-arrow-down profile__icon"></i> 
                <span class="profile__cart-counter">${this.cartItemsCount}</span>
            </div>
        `;

        this.profile.addEventListener('click', Profile.openCartHandler.bind(this));

        return this.profile;
    }


    static openCartHandler(e) {
        const cartIcon = e.target.closest('.profile__icon-wrapper');
        if (!cartIcon) return;
        this.constructor.openCart();
    }    

    static closeCartHandler() {
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';

        const backdrop = document.querySelector('.backdrop');
        const modal = document.querySelector('.modal');

        backdrop.remove();
        modal.remove();
    }

    static openCart() {
        const shift = window.innerWidth - document.body.clientWidth;

        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = `${shift}px`;

        const backdrop = new Backdrop(Profile.closeCartHandler);
        const cart = new Cart(Profile.closeCartHandler);
        const modal = new Modal(cart, 'profile__modal');

        document.getElementById('modal-root').append(backdrop, modal);
    }

    static updateCartItemsCount(newCount) {
        newCount || (newCount = JSON.parse(localStorage.getItem('cart-products')).length);
        
        const cartCounter = document.querySelector('.profile__cart-counter');
        cartCounter.textContent = newCount;
    };
}

export default Profile;
