import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import './Toolbar.scss';

class Toolbar {
    constructor() {
        this.toolbar = document.createElement('div');

        this.toolbar.className = 'toolbar';

        this.toolbar.append(
            new Categories(),
            new Search()
        );

        return this.toolbar;
    }
}

export default Toolbar;
