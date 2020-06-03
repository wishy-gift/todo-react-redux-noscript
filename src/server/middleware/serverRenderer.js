import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../../shared/components/App/App';
import Html from '../components/Html/Html';
import { configureStore } from '../../shared/store/configureStore';

const serverRenderer = (isNoscript) => (req, res) => {
	const initialState = req.session.state || {};

	const store = configureStore({ initialState });

	let state = initialState;

	if (isNoscript) {
		const { type, payload, payloadType } = req.body;

		// in a production scenario, you might validate input a bit more
		// and perhaps have a validator per action
		if (type && typeof type === 'string') {
			try {
				let parsedPayload;
				if (payload) {
					if (payloadType === 'json') {
						parsedPayload = JSON.parse(payload);
					} else if (payloadType === 'string' || payloadType === 'object') {
						parsedPayload = payload;
					}
				}

				store.dispatch({ type, payload: parsedPayload });

				state = store.getState();
				req.session.state = state;
			} catch (error) {
				// probably something malformed or malicious
			}
		}
	}

	const content = renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	);

	return res.send(
		'<!doctype html>' +
			renderToStaticMarkup(
				<Html
					css={['/static/client.css']}
					scripts={['/static/client.js']}
					state={state}
					content={content}
				/>
			)
	);
};

export default serverRenderer;
