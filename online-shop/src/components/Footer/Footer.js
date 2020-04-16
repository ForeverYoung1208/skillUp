import './Footer.scss';

class Footer {
    constructor() {
        this.footer = document.createElement('footer');

        this.footer.className = 'footer';
        this.footer.innerHTML = `
            <strong class="footer__copyright">
                All Rights Reserved, ${new Date().getFullYear()}
            </strong>
        `;

        return this.footer;
    }
}

export default Footer;
