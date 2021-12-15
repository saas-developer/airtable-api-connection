import { initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store/configureStore';
import App from './app/App';
import { loadCSSFromURLAsync, loadCSSFromString } from '@airtable/blocks/ui';
import styles from './app/styles/main.scss'
loadCSSFromURLAsync('https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
loadCSSFromString(styles);

function HelloWorldBlock() {
    // YOUR CODE GOES HERE
    return (
        <Provider store={store}>
          <div>
            <App />
          </div>
        </Provider>

    )
}

initializeBlock(() => <HelloWorldBlock />);
