import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const configureStore = ({ initialState = null }) => {
	const store = createStore(rootReducer, initialState);

	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('../reducers/rootReducer', () =>
				store.replaceReducer(require('../reducers/rootReducer').default)
			);
		}
	}

	return store;
};

export default configureStore;
