// Удаление, увеличение / уменьшение количества, подтверждение отправки данных из корзины, фильтрация товаров

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.scss';

class App {
    constructor() {
        this.app = document.createElement('div');

        this.app.className = 'app';

        this.app.append(
            new Header(),
            new Main(),
            new Footer()
        );

        return this.app;
    }   
}

export default App;
