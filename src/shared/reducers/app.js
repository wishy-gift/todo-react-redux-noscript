import { SET_NOSCRIPT } from '../actions';

const defaultState = {
	isNoscript: false,
};

export default (state = defaultState, { type, payload }) => {
	switch (type) {
		case SET_NOSCRIPT:
			return {
				...state,
				isNoscript: payload,
			};

		default:
			return state;
	}
};
