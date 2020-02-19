import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
 
import MainQuizApplication from './components/pages/Main';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store';

import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <MainQuizApplication />
    </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
