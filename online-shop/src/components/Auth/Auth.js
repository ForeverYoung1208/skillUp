import Button from '../UI/Button/Button';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import AuthContent from './AuthContent/AuthContent';
import './Auth.scss';

class Auth {
    constructor() {
        this.auth = document.createElement('div');

        this.auth.className = 'auth';

        this.auth.append(new Button({
            text: 'Sign In',
            additionalClasses: 'button--alt',
            onclick: this.openModalHandler.bind(this)
        }));

        return this.auth;
    }

    openModalHandler() {
        const shift = window.innerWidth - document.body.clientWidth;

        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = `${shift}px`;

        const backdrop = new Backdrop(this.closeModalHandler);
        const authContent = new AuthContent(this.closeModalHandler);
        const modal = new Modal(authContent);

        document.getElementById('modal-root').append(backdrop, modal);
    }

    closeModalHandler() {
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';

        const backdrop = document.querySelector('.backdrop');
        const modal = document.querySelector('.modal');

        backdrop.remove();
        modal.remove();
    }
}

export default Auth;
