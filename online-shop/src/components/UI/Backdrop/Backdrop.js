import './Backdrop.scss';

class Backdrop {
    constructor(closeModal) {
        this.backdrop = document.createElement('div');

        this.backdrop.className = 'backdrop';

        this.backdrop.addEventListener('click', closeModal);

        return this.backdrop;
    }
}

export default Backdrop;
