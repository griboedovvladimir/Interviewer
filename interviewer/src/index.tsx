import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './conteiners/App';
import './styles/index.css';
import {combineReducers,createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, /* preloadedState, */ devToolsEnhancer({name:'interviewer'}));


ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root') as HTMLElement);
registerServiceWorker();
