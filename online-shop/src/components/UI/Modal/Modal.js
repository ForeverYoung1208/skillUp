import './Modal.scss';

class Modal {
    constructor(modalContent, additionalClass) {
        this.modal = document.createElement('div');

        const modalClasses = ['modal'];

        if (additionalClass) {
            modalClasses.push(additionalClass);
        }

        this.modal.className = modalClasses.join(' ');

        this.modal.append(modalContent);

        return this.modal;
    }
}

export default Modal;
