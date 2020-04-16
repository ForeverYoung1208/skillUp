import './Input.scss';

class Input {
    constructor({
        type = 'text',
        name,
        placeholder,
        additionalClasses,
        ...handlers
    }) {
        this.input = document.createElement('input');
        const inputClasses = ['input'];

        if (additionalClasses) {
            inputClasses.push(additionalClasses);
        }

        this.input.className = inputClasses.join(' ');
        this.input.type = type;
        this.input.placeholder = placeholder;

        if (name) {
            this.input.name = name;
        }

        for (const event in handlers) {
            const eventName = event.slice(2);
            const eventHandler = handlers[event];

            this.input.addEventListener(eventName, eventHandler);
        }

        return this.input;
    }
}

export default Input;
