import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainPage from './Main-page';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MainPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
