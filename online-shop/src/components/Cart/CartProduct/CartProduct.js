import './CartProduct.scss';
import Profile from '../../Profile/Profile';
import Cart from '../Cart';

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
        this.cartProduct.dataset.price = price
        this.cartProduct.className = 'cart__tr'

        this.cartProduct.innerHTML = `
            <td class="cart__td">${id}</td>
            <td class="cart__td">
                <img src="${imageSrc}" alt="${model}" class="cart__img">
            </td>

            <td class="cart__td">${model}</td>
            <td class="cart__td">$${price}</td>
            <td class="cart__td">
                <i class="far fa-minus-square cart__controls "></i> 
                    <span class='cart__tr-quantity'>${quantity}</span>
                <i class="far fa-plus-square cart__controls"></i>
            </td>
            <td class="cart__td cart__totalItem">$${total}</td>
            <td class="cart__td"><i class="fas fa-trash cart__controls cart__trash-btn"></i></td>
        `;
        const quantityNode = this.cartProduct.querySelector('.cart__tr-quantity')
        const plus = quantityNode.nextElementSibling;
        const minus = quantityNode.previousElementSibling;
        const trash = this.cartProduct.querySelector('.cart__trash-btn')

        plus.addEventListener('click', (e) => this.plusMinusHandler(e, 'plus'))
        minus.addEventListener('click', (e) => this.plusMinusHandler(e, 'minus'))
        trash.addEventListener('click', (e) => this.trashHandler(e, this.cartProduct))

        return this.cartProduct;
    }

    plusMinusHandler(e, sign){
        const cartTrElement = e.target.closest('.cart__tr');
        const quantityElement = cartTrElement.querySelector('.cart__tr-quantity')
        const totalItemElement = cartTrElement.querySelector('.cart__totalItem')

        const id = +cartTrElement.dataset.id
        const price = +cartTrElement.dataset.price
        const productsFromStorage = JSON.parse(localStorage.getItem('cart-products'));
        let newProducts = [];

        this.animateClick(e.target);

        switch (sign) {
            case 'plus':
                newProducts = [...productsFromStorage, id]
                quantityElement.textContent = +quantityElement.textContent + 1
                totalItemElement.textContent = '$' + (parseFloat(totalItemElement.textContent.substr(1)) + price)
                break;
            case 'minus':
                const index = productsFromStorage.indexOf(id)
                if (index>=0){
                    productsFromStorage.splice(index,1)
                    newProducts = productsFromStorage
                    quantityElement.textContent = +quantityElement.textContent - 1
                    totalItemElement.textContent = '$' + (parseFloat(totalItemElement.textContent.substr(1)) - price)
                } else {
                    console.log('not found any more')
                    return;
                }
                break;
            default:
                break;
        }

        localStorage.setItem('cart-products', JSON.stringify(newProducts));

        Cart.recalculateTotal();
        Profile.updateCartItemsCount();
    }

    trashHandler(e, cartProduct){
        this.animateClick(e.target)
        
        if (confirm('Remove this item from the cart?')){
            const productsFromStorage = JSON.parse(localStorage.getItem('cart-products'));
            let newProducts = productsFromStorage.filter(p => p != +cartProduct.dataset.id);

            localStorage.setItem('cart-products', JSON.stringify(newProducts));

            this.animateClick(cartProduct, ()=> {
                Profile.closeCartHandler();
                Profile.openCart();
            });
        }
    }

    animateClick(element, callback){
        element.classList.add('cart__controls--clicked')
        window.setTimeout(() => {
            element.classList.remove('cart__controls--clicked')
            callback && callback()
        }, 200)
    }

}

export default CartProduct;
