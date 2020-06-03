import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../../shared/components/App/App';
import Html from '../components/Html/Html';
import { configureStore } from '../../shared/store/configureStore';

const serverRenderer = (isNoscript) => (req, res) => {
	const state = req.session.state;
	const store = configureStore({ initialState: state });

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

				req.session.state = store.getState();
			} catch (error) {
				// probably something malformed or malicious 🤷‍♂️
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
					isNoscript={isNoscript}
					state={state}
					content={content}
				/>
			)
	);
};

export default serverRenderer;
