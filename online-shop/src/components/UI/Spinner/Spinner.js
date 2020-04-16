import './Spinner.scss';

class Spinner {
    constructor(additionalClasses) {
        this.spinner = document.createElement('div');

        const spinnerClasses = ['spinner'];

        if (additionalClasses) {
            spinnerClasses.push(additionalClasses);
        }

        this.spinner.className = spinnerClasses.join(' ');

        return this.spinner;
    }
}

export default Spinner;
