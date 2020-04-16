import logoSrc from '../../assets/images/logo.png';
import './Logo.scss';

class Logo {
    constructor(title) {
        this.logo = document.createElement('div');

        this.logo.className = 'logo';
        this.logo.innerHTML = `
            <div class="logo__img-wrapper">
                <img src="${logoSrc}" alt="${title}" class="logo__img">
            </div>

            <h1 class="logo__title">${title}</h1>
        `;

        return this.logo;
    }
}

export default Logo;
