import { initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store/configureStore';
import App from './app/App';
import { loadCSSFromURLAsync } from '@airtable/blocks/ui';
loadCSSFromURLAsync('https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
loadCSSFromURLAsync('./app/styles/main.scss');

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
