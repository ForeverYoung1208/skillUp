import axios from 'axios';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Profile from '../../Profile/Profile';
import './AuthContent.scss';

const SIGN_IN = 'Sign In';
const SIGN_UP = 'Sign Up';

class AuthContent {
    constructor(closeModal) {
        this.authMode = SIGN_IN;
        this.closeModal = closeModal;

        this.authContent = document.createElement('form');

        this.authContent.className = 'auth-content';
        this.authContent.autocomplete = 'off';
        this.authContent.innerHTML = `
            <h1 class="auth-content__title">${SIGN_IN}</h1>

            <div class="auth-content__fields"></div>

            <button type="button" class="auth-content__switcher">
                Switch to ${SIGN_UP}
            </button>
        `;

        const switchModeBtn = this.authContent.lastElementChild;
        this.fieldsContainer = this.authContent.querySelector('.auth-content__fields');

        switchModeBtn.addEventListener('click', this.switchAuthModeHandler.bind(this));
        this.authContent.addEventListener('submit', this.onSubmitHandler.bind(this));

        const formElements = this.getSignInFields();

        this.fieldsContainer.append(...formElements);
        this.fieldsContainer.after(new Button({
            type: 'submit',
            text: 'Submit',
            additionalClasses: 'auth-content__btn'
        }));

        return this.authContent;
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const fields = this.authContent.elements;
        const user = {};

        for (const field of fields) {
            if (field.tagName === 'BUTTON') continue;
            
            const { name, value } = field;

            user[name] = value;
        }

        axios.post('https://jsonplaceholder.typicode.com/users', user)
            .then(response => {
                const { data } = response;

                if (!data) return;

                const { email } = data;

                localStorage.setItem('user-email', email);

                this.closeModal();
                    
                const auth = document.querySelector('.auth');
                auth.replaceWith(new Profile(email));
            })
            .catch(error => {
                console.log('[error]', error);
            });

        // fetch('https://api.kanye.rest', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // });

        // fetch('https://api.kanye.rest')
        //     .then(response => response.json())
        //     .then(({ quote }) => {
        //         this.closeModal();
                    
        //         const auth = document.querySelector('.auth');
        //         auth.replaceWith(new Profile(quote));
        //     })
        //     .catch(error => {
        //         console.log('[error]', error);
        //     });

        // this.sendRequest({
        //     // url: 'https://jsonplaceholder.typicode.com/posts',
        //     url: 'https://api.kanye.rest',
        //     method: 'GET',
        //     // body: user
        // })
        //     .then(response => {
        //         this.closeModal();
                    
        //         const auth = document.querySelector('.auth');
        //         auth.replaceWith(new Profile(response));
        //     })
        //     .catch(error => {
        //         console.log('[error]', error);
        //     });
    }

    // 1. XMLHttpRequest
    // 2. fetch
    // 3. axios
    sendRequest({ url, method = 'GET', body }) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest(); // xml - html

            // HTTP, RESTful API
            // --------
            // GET
            // POST
            // DELETE
            // PATCH
            // PUT

            // 100
            // 200 - OK
            // 300 - Redirect
            // 400 - Client
            // 500 - Server

            xhr.open(method, url, true);

            if (/post/i.test(method)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.responseType = 'json';

            xhr.addEventListener('load', () => {
                // const { email } = xhr.response;
                const { quote } = xhr.response;

                setTimeout(() => {
                    resolve(quote);
                }, 1000);
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Something went wrong'));
            });

            xhr.send(body && JSON.stringify(body));
        });
    }

    getSignInFields() {
        return [
            new Input({
                type: 'text',
                name: 'email',
                placeholder: 'E-mail',
                additionalClasses: 'auth-content__input',
                onblur: this.validateField
            }),
            new Input({
                type: 'password',
                name: 'password',
                placeholder: 'Password',
                additionalClasses: 'auth-content__input'
            })
        ];
    }

    getSignUpFields() {
        return [
            new Input({
                type: 'text',
                name: 'firstName',
                placeholder: 'First Name',
                additionalClasses: 'auth-content__input'
            }),
            new Input({
                type: 'text',
                name: 'lastName',
                placeholder: 'Last Name',
                additionalClasses: 'auth-content__input'
            }),
            new Input({
                type: 'number',
                name: 'age',
                placeholder: 'Age',
                additionalClasses: 'auth-content__input'
            }),
            new Input({
                type: 'text',
                name: 'email',
                placeholder: 'E-mail',
                additionalClasses: 'auth-content__input',
                onblur: this.validateField
            }),
            new Input({
                type: 'password',
                name: 'password',
                placeholder: 'Password',
                additionalClasses: 'auth-content__input'
            }),
            new Input({
                type: 'password',
                name: 'confirmPassword',
                placeholder: 'Confirm Password',
                additionalClasses: 'auth-content__input'
            })
        ];
    }

    validateField(e) {
        const input = e.target;

        const { value } = input;

        const form = input.closest('form');
        const submitBtn = form.querySelector('button');

        const hasError = input.classList.contains('auth-content__input--error');

        const regExp = /^[\w.-]+@[a-z]+(\.[a-z]{2,3})?\.[a-z]{2,3}$/gi;

        if (regExp.test(value)) {
            if (!hasError) return;

            input.classList.remove('auth-content__input--error');
            input.nextElementSibling.remove();
            return submitBtn.disabled = false;
        }

        if (hasError) return;

        input.classList.add('auth-content__input--error');

        const error = document.createElement('p');

        error.className = 'auth-content__error';
        error.textContent = 'Provided value should be an e-mail address.';

        input.after(error);

        submitBtn.disabled = true;
    }

    switchAuthModeHandler(e) {
        const switchModeBtn = e.target;
        const title = document.querySelector('.auth-content__title');
        this.fieldsContainer.innerHTML = '';

        if (this.authMode === SIGN_IN) {
            this.authMode = SIGN_UP;

            switchModeBtn.textContent = `Switch to ${SIGN_IN}`;
            title.textContent = SIGN_UP;

            const fields = this.getSignUpFields();
            this.fieldsContainer.append(...fields);
        } else {
            this.authMode = SIGN_IN;
            
            switchModeBtn.textContent = `Switch to ${SIGN_UP}`;
            title.textContent = SIGN_IN;

            const fields = this.getSignInFields();
            this.fieldsContainer.append(...fields);
        }
    }
}

export default AuthContent;
