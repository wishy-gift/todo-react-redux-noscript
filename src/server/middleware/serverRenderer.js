import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../../shared/components/App/App';
import Html from '../components/Html/Html';
import { configureStore } from '../../shared/store/configureStore';
import { setNoscript } from '../../shared/actions';

const serverRenderer = (isNoscript) => (req, res) => {
	const initialState = req.session.state || { app: { isNoscript } };

	const store = configureStore({ initialState });
	const currentState = store.getState();

	if (isNoscript) {
		if (!currentState.app.isNoscript) {
			store.dispatch(setNoscript(true));
		}

		const { type, payload, payloadType } = req.body;

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
			} catch (error) {}
		}
	} else if (currentState.app.isNoscript) {
		store.dispatch(setNoscript(false));
		req.session.state = store.getState();
	}

	let state;
	let content;

	if (!isNoscript) {
		state = JSON.stringify(req.session.state);

		content = renderToString(
			<Provider store={store}>
				<App />
			</Provider>
		);

		store.dispatch(setNoscript(true));
	}

	const noScriptContent = renderToStaticMarkup(
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
					noScriptContent={noScriptContent}
				/>
			)
	);
};

export default serverRenderer;
