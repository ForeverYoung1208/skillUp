import './Checkout.scss';
import Button from '../../UI/Button/Button';
import Cart from '../Cart';
import Profile from '../../Profile/Profile';
import axios from 'axios';

class Checkout {
    constructor() {

        this.priceTotal = Cart.recalculateTotal();

        this.checkout = document.createElement('div');
        this.checkout.className = 'checkout';
        this.checkout.innerHTML = `
        <h3> Please confirm order:</h3>
        <ul class="checkout__info">
          <li> Total: $${this.priceTotal}</li>
        </ul>
        <div class="checkout__controls"></div>
        `
        const rejectBtn = new Button({text: 'Back'})
        const confirmBtn = new Button({text: 'Confirm'})
        const controls = this.checkout.querySelector('.checkout__controls')

        confirmBtn.addEventListener('click', this.confirmHandler.bind(this) )
        rejectBtn.addEventListener('click', this.rejectHandler.bind(this) )

        controls.append(rejectBtn);
        controls.append(confirmBtn);

        return this.checkout;
    }

    confirmHandler(){
        const order =  
        {
            user_email: localStorage.getItem('user-email'),
            items: localStorage.getItem('cart-products'),
            price_total: this.priceTotal
        }

        axios.post('http://justapi.fyoung.dp.ua/orders.json', order).then( responce => {

            if (responce.status === 201){
                alert(`Order placed. Your order ID: ${responce.data.id}.
                You can check it at http://justapi.fyoung.dp.ua/orders`)
                localStorage.setItem('cart-products','[]')
            } else {
                alert(`something went wrong, responce status ${responce.status}, text: ${responce.statusText}`)
            }
            Cart.closeCheckoutHandler();
            Profile.updateCartItemsCount();
        })

    }

    rejectHandler(){
        this.closeModal();
        Profile.openCart();
    }

    closeModal(){
        Cart.closeCheckoutHandler();
    }
}

export default Checkout;
