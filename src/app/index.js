import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
const isBasePath = /^\/$/.test(location.pathname);

ReactDOM.render(<App/>, document.getElementById('app'));

addEventListener('load', () => {
    if (isBasePath) {
        navigator.serviceWorker
            .register(`${location.pathname}sw.js`)
            .catch((err) => console.error(err));
    }
});
