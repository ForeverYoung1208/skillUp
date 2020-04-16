import './CategoryButton.scss';

class CategoryButton {
    constructor(text, isActive) {
        this.categoryButton = document.createElement('div');

        this.categoryButton.className = isActive ? 'category-btn category-btn--active' : 'category-btn';
        this.categoryButton.innerHTML = `
            <span class="category-btn__text">
                ${text}
            </span>
        `;

        this.categoryButton.setAttribute('data-category', text.toLowerCase());

        return this.categoryButton;
    }
}

export default CategoryButton;
