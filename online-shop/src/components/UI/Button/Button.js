import './Button.scss';

class Button {
    constructor({
        type = 'button',
        text,
        additionalClasses,
        ...handlers
    }) {
        this.button = document.createElement('button');
        const btnClasses = ['button'];

        if (additionalClasses) {
            btnClasses.push(additionalClasses);
        }

        this.button.className = btnClasses.join(' ');
        this.button.type = type;
        this.button.textContent = text;

        for (const event in handlers) {
            const eventName = event.slice(2);
            const eventHandler = handlers[event];

            this.button.addEventListener(eventName, eventHandler);
        }

        return this.button;
    }
}

export default Button;
