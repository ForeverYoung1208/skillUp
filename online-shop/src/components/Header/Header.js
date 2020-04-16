import Logo from '../Logo/Logo';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import './Header.scss';

class Header {
    constructor() {
        this.header = document.createElement('header');

        this.header.className = 'header';
        this.header.innerHTML = '<div class="header__wrapper"></div>';

        const userEmail = localStorage.getItem('user-email');

        this.header.firstElementChild.append(
            new Logo('Firebird Online Shop'),
            userEmail
                ? new Profile(userEmail)
                : new Auth()
        );

        return this.header;
    }
}

export default Header;
