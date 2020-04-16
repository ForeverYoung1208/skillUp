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
            <td class="cart__td">${id}</td>
            <td class="cart__td">
                <img src="${imageSrc}" alt="${model}" class="cart__img">
            </td>

            <td class="cart__td">${model}</td>
            <td class="cart__td">$${price}</td>
            <td class="cart__td">${quantity}</td>
            <td class="cart__td">$${total}</td>
        `;

        return this.cartProduct;
    }
}

export default CartProduct;
