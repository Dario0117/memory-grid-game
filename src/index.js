import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Board rows={5} cols={10} maxPairs={10}/>, document.getElementById('root'));
// registerServiceWorker();
