import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Cart from '../Cart/Cart';
import './Profile.scss';

class Profile {
    constructor(userName) {
        this.profile = document.createElement('div');

        this.profile.className = 'profile';
        this.profile.innerHTML = `
            <h1 class="profile__username">${userName}</h1>

            <div class="profile__icon-wrapper">
                <i class="fas fa-cart-arrow-down profile__icon"></i>
            </div>
        `;

        this.profile.addEventListener('click', this.openCartHandler.bind(this));

        return this.profile;
    }

    openCartHandler(e) {
        const cartIcon = e.target.closest('.profile__icon-wrapper');

        if (!cartIcon) return;

        const shift = window.innerWidth - document.body.clientWidth;

        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = `${shift}px`;

        const backdrop = new Backdrop(this.closeCartHandler);
        const cart = new Cart(this.closeCartHandler);
        const modal = new Modal(cart, 'profile__modal');

        document.getElementById('modal-root').append(backdrop, modal);
    }

    closeCartHandler() {
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';

        const backdrop = document.querySelector('.backdrop');
        const modal = document.querySelector('.modal');

        backdrop.remove();
        modal.remove();
    }
}

export default Profile;
