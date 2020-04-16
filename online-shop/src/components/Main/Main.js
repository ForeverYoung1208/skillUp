import Toolbar from '../Toolbar/Toolbar';
import Products from '../Products/Products';
import Pagination from '../Pagination/Pagination';
import './Main.scss';

class Main {
    constructor() {
        this.main = document.createElement('main');

        this.main.className = 'main';

        this.main.append(
            new Toolbar(),
            new Products(),
            new Pagination()
        );

        return this.main;
    }
}

export default Main;
