import './CartProduct.scss';

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

        this.cartProduct.innerHTML = `
            <td class="cart__td" data-id="${id}">${id}</td>
            <td class="cart__td">
                <img src="${imageSrc}" alt="${model}" class="cart__img">
            </td>

            <td class="cart__td">${model}</td>
            <td class="cart__td">$${price}</td>
            <td class="cart__td">
                <i class="far fa-minus-square cart__minus "></i> 
                    ${quantity}
                <i class="far fa-plus-square cart__plus"></i>
            </td>
            <td class="cart__td">$${total}</td>
        `;

        const plus = this.cartProduct.querySelector('.cart__plus')
        plus.addEventListener('click', () => this.plusMinusHandler('plus'))
        const minus = this.cartProduct.querySelector('.cart__minus')
        minus.addEventListener('click', () => this.plusMinusHandler('minus'))

        return this.cartProduct;
    }

    plusMinusHandler(sign){
        console.log('[sign]', sign);
        //...
    }

}

export default CartProduct;
