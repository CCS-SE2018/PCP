import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Router from './Router';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //<App />,
    <Router />,
    document.getElementById('root')
);
registerServiceWorker();
