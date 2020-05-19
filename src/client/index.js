import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '../shared/store/configureStore';
import App from '../shared/components/App/App';

const root = document.getElementById('root');

const store =
	window.store ||
	configureStore({
		initialState: window.__INITIAL_STATE__,
	});

hydrate(
	<Provider store={store}>
		<App />
	</Provider>,
	root
);

if (process.env.NODE_ENV === 'development') {
	if (module.hot) {
		module.hot.accept();
	}

	if (!window.store) {
		window.store = store;
	}
}
