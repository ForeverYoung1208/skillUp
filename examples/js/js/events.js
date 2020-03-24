'use strict';

// onclick, onfocus etc
// const btn = document.querySelector('button');

// btn.onclick = function() {
//     alert('Hello from button!');
// };

// btn.onclick = function() {
//     console.log('Only single function...');
// };

// setTimeout(() => {
//     console.log('GAME OVER');

//     btn.onclick = null;
// }, 3000);

// addEventListener
// const showConsoleMessage = () => {
//     console.log('Click on button...');
// };

// const showAlertMessage = () => {
//     alert('One more function...');
// };

// btn.addEventListener('click', showConsoleMessage);
// btn.addEventListener('click', showAlertMessage);

// removeEventListener
// const resetBtn = document.querySelector('#reset');

// resetBtn.addEventListener('click', () => {
//     console.log('Functions have been removed...');

//     btn.removeEventListener('click', showConsoleMessage);
//     btn.removeEventListener('click', showAlertMessage);

//     btn.addEventListener('click', () => {
//         console.log('There are no old functions...');
//     });
// });

// phases
// const form = document.querySelector('form');
// const div = document.querySelector('div');
// const p = document.querySelector('p');

// function showEventObject(e) {
//     console.log('[e.target.tagName]', e.target.tagName);
// }

// for (const node of [form, div, p]) {
//     // if (node.tagName === 'P') {
//     //     node.addEventListener('click', e => {
//     //         // e.stopPropagation();
//     //         e.stopImmediatePropagation();

//     //         console.log('[e]', e);
//     //     });

//     //     continue;
//     // }

//     node.addEventListener('click', showEventObject, false);

//     // node.addEventListener('click', () => {
//     //     console.log(node.tagName); // FORM, DIV, P
//     // }, true);
// }

// const anotherBtn = document.querySelector('button');

// anotherBtn.addEventListener('contextmenu', e => {
//     e.preventDefault();

//     console.log('[e.target]', e.target);
// });

// custom events
// const customEvent = new MouseEvent('hello-world');

// anotherBtn.addEventListener('hello-world', e => {
//     console.log('Custom event...');

//     console.log('[e]', e);
// });

// setTimeout(() => {
//     anotherBtn.dispatchEvent(customEvent);
// }, 2000);

// delegation
// document.body.addEventListener('click', e => {
//     const tags = ['DIV', 'FORM', 'P'];

//     if (!tags.includes(e.target.tagName)) return;

//     console.log('[tagName]', e.target.tagName);
// });

// calculator
class Button {
    constructor(char) {
        const button = document.createElement('button');

        const btnClasses = ['calculator__btn'];

        switch (char) {
            case '=':
                btnClasses.push('calculator__btn--green');
                break;

            case '+':
            case '-':
            case '*':
            case '/':
            case '.':
                btnClasses.push('calculator__btn--yellow');
                break;

            case 'c':
                btnClasses.push('calculator__btn--red');
                break;

            default:
                btnClasses.push('calculator__btn--blue');
        }

        button.className = btnClasses.join(' ');
        button.textContent = char;
        button.setAttribute('data-char', char);

        return button;
    }
}

class Calculator {
    constructor(id) {
        // creating
        this.a = ''; // first value
        this.b = ''; // second value
        this.sign = ''; // + - * /

        this.calculator = document.createElement('div');

        const chars = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '.', '0', 'c', '+',
            '='
        ];

        // styling
        this.calculator.className = 'calculator';
        this.calculator.innerHTML = `
            <input type="text" class="calculator__input" disabled>
            <div class="calculator__btns"></div>
        `;

        this.input = this.calculator.firstElementChild;

        const btns = chars.map(char => {
            return new Button(char);
        });

        // adding listeners
        this.calculator.addEventListener('click', this.onClickHandler.bind(this));

        // appending
        this.calculator.lastElementChild.append(...btns);

        return this.calculator;
        // this.render(id);
    }

    onClickHandler(e) {
        const btn = e.target;

        if (btn.tagName !== 'BUTTON') return;

        const { char } = btn.dataset; // data-char - "char", data-page - "page"

        switch (char) {
            case '=':
                return this.calculate();

            case '+':
            case '-':
            case '*':
            case '/':
                if (this.sign) {
                    this.calculate();
                }

                this.sign = char;
                break;

            case 'c':
                return this.reset();

            case '.':
            default: // 0-9
                if (!this.sign) {
                    if (char === '.' && this.a.includes('.')) return;

                    if (char !== '.' && this.a.startsWith('0')) {
                        this.a = char;
                    } else {
                        this.a += char;
                    }
                } else {
                    if (char === '.' && this.b.includes('.')) return;

                    if (char !== '.' && this.b.startsWith('0')) {
                        this.b = char;
                    } else {
                        this.b += char;
                    }
                }
        }

        this.printResult();
    }

    calculate() {
        if (!this.a || !this.b || !this.sign) {
            return alert('You should enter both values and a sign.');
        }

        let result;

        switch (this.sign) {
            case '+':
                result = +this.a + +this.b;
                break;

            case '-':
                result = this.a - this.b;
                break;

            case '*':
                result = this.a * this.b;
                break;

            case '/':
                result = this.a / this.b;
        }

        this.input.value = result;
        this.a = result;
        this.b = '';
        this.sign = '';
    }

    reset() {
        this.a = '';
        this.b = '';
        this.sign = '';
        this.input.value = '';
    }

    printResult() {
        const char = this.sign && ` ${this.sign} `;

        this.input.value = this.a + char + this.b;
    }

    // render(id) {
    //     document.querySelector(id).append(this.calculator);
    // }
}

// const calculator = new Calculator(); // html
// document.querySelector('#root').append(calculator);

// calculator.render('#root');

// new Calculator('#root');

// function User(n, a) {
//     this.name = n;
//     this.age = a;

//     return [1, 2, 3]; // {}, [], Date
// }

// class User {
//     constructor(n, a) {
//         this.name = n;
//         this.age = a;

//         return [1, 2, 3];
//     }
// }

// const user = new User('John', 23);

// console.log('[user]', user);

// chat
class Message {
    constructor(text) {
        const message = document.createElement('div');

        message.className = 'message';
        message.innerHTML = `
            <p class="message__text">${text}</p>

            <strong class="message__time">
                ${new Date().toLocaleTimeString()}
            </strong>
        `;

        return message;
    }
}

class Tools {
    constructor() {
        const tools = document.createElement('form');

        tools.className = 'tools';
        tools.autocomplete = 'off';
        tools.innerHTML = `
            <p class="tools__message"></p>
            <textarea class="tools__text"></textarea>
            <button class="tools__btn">Send</button>
        `;

        this.message = tools.firstElementChild;
        this.textarea = tools.querySelector('textarea');

        // this.textarea.addEventListener('input', this.onInputHandler.bind(this));
        this.textarea.addEventListener('input', e => this.onInputHandler(e));
        tools.addEventListener('submit', this.onSubmitHandler.bind(this));
        tools.addEventListener('keydown', this.onKeyDownHandler.bind(this));

        return tools;
    }

    onInputHandler(e) {
        const { value } = e.target;

        this.message.innerHTML = value;
    }

    onSubmitHandler(e) {
        e.preventDefault();

        this.sendMessage();
    }

    onKeyDownHandler(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            this.sendMessage();
        }
    }

    sendMessage() {
        const messagesContainer = document.querySelector('.workspace__messages');

        messagesContainer.append(new Message(this.textarea.value));

        this.message.innerHTML = '';
        this.textarea.value = '';

        this.textarea.focus();
    }
}

class Workspace {
    constructor() {
        const workspace = document.createElement('div');

        workspace.className = 'workspace';
        workspace.innerHTML = `
            <strong class="workspace__date">${new Date().toLocaleDateString()}</strong>
            <div class="workspace__messages"></div>
        `;

        return workspace;
    }
}

class Chat {
    constructor() {
        const chat = document.createElement('div');

        chat.className = 'chat';

        chat.append(new Tools(), new Workspace());

        return chat;
    }
}

// const chat = new Chat();
// document.querySelector('#root').append(chat);

// scrollbar
class ScrollBar {
    constructor() {
        const scrollBar = document.createElement('div');
        this.filledBar = document.createElement('div');

        scrollBar.className = 'scrollbar';
        this.filledBar.className = 'scrollbar__filled';

        scrollBar.append(this.filledBar);

        window.addEventListener('scroll', this.onScrollHandler.bind(this));

        return scrollBar;
    }

    onScrollHandler() {
        const html = document.documentElement;
        const fullSize = html.scrollHeight - html.clientHeight;
        const scrolledSize = window.pageYOffset;

        const width = scrolledSize / fullSize * 100;

        this.filledBar.style.width = `${width}%`;
    }
}

// const scrollBar = new ScrollBar();
// document.querySelector('#root').append(scrollBar);

// const anotherLanguage = 'PHP';

// transformString`I love JavaScript, but not ${anotherLanguage}!!!`;

// function transformString(strings, ...values) {
//     console.log('[strings]', strings);
//     console.log('[values]', values);
// }

// unique styled tags
const styled = {
    div([ cssCode ]) {
        const styleTag = document.createElement('style');
        const styledDiv = document.createElement('div');
        const uniqueClassName = 'uniqueClassName' + Math.random().toString().slice(2);

        styleTag.innerHTML = `
            .${uniqueClassName} {
                ${cssCode}
            }
        `;

        styledDiv.className = uniqueClassName;

        document.head.append(styleTag);

        return styledDiv;
    },
    p() {

    },
    h1() {

    }
};

const styledDiv = styled.div`
    color: #fff;
    background-color: orange;
    font-size: 1.2rem;
    padding: 9px;
    border-radius: 5px;
    box-shadow: 0 7px 15px orange;
`;

styledDiv.textContent = 'Hello World!!!';

document.getElementById('root').append(styledDiv);
