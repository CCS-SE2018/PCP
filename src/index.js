import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Router from './Router';
import App from './App';
import Table from './Table';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //<App />,
    <Router />,
    // <Table />,
    document.getElementById('root')
);
registerServiceWorker();
