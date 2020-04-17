import './CartProduct.scss';
import Profile from '../../Profile/Profile';

class CartProduct {
    constructor({
        id,
        imageSrc,
        model,
        price,
        quantity,
        total
    }) {
        this.cartProduct = document.createElement('tr');
        this.cartProduct.dataset.id = id
        this.cartProduct.className = 'cart__tr'

        this.cartProduct.innerHTML = `
            <td class="cart__td">${id}</td>
            <td class="cart__td">
                <img src="${imageSrc}" alt="${model}" class="cart__img">
            </td>

            <td class="cart__td">${model}</td>
            <td class="cart__td">$${price}</td>
            <td class="cart__td">
                <i class="far fa-minus-square cart__minus "></i> 
                    <span class='cart__tr-quantity'>${quantity}</span>
                <i class="far fa-plus-square cart__plus"></i>
            </td>
            <td class="cart__td">$${total}</td>
        `;

        const plus = this.cartProduct.querySelector('.cart__plus')
        plus.addEventListener('click', (e) => this.plusMinusHandler(e, 'plus'))
        const minus = this.cartProduct.querySelector('.cart__minus')
        minus.addEventListener('click', (e) => this.plusMinusHandler(e, 'minus'))

        return this.cartProduct;
    }

    plusMinusHandler(e, sign){
        const cartTr = e.target.closest('.cart__tr');
        const quantity = cartTr.querySelector('.cart__tr-quantity')
        const id = +cartTr.dataset.id
        const productsFromStorage = JSON.parse(localStorage.getItem('cart-products'));
        let newProducts = [];


        switch (sign) {
            case 'plus':
                newProducts = [...productsFromStorage, id]
                quantity.textContent = +quantity.textContent+1
                break;
            case 'minus':
                const index = productsFromStorage.indexOf(id)
                if (index>=0){
                    console.log('[index]', index);
                    productsFromStorage.splice(index,1)
                    newProducts = productsFromStorage
                    quantity.textContent = +quantity.textContent-1

                } else {
                    console.log('not found any more')
                }
                break;
            default:
                break;
        }
        
        localStorage.setItem('cart-products', JSON.stringify(newProducts));
        Profile.updateCartItemsCount();
        
    }

}

export default CartProduct;
