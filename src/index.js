import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MainQuizApplication from './components/pages/Main';
import { store } from './store';

// Stylesheets
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <MainQuizApplication />
    </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
