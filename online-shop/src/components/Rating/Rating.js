import './Rating.scss';

class Rating {
    constructor(amount) {
        this.rating = document.createElement('div');

        this.rating.className = 'rating';

        for (let i = 0; i < 5; i++) {
            if (i < amount) {
                this.rating.innerHTML += '<i class="fas fa-star"></i>';
                continue;
            }

            this.rating.innerHTML += '<i class="far fa-star"></i>';
        }

        return this.rating;
    }
}

export default Rating;
