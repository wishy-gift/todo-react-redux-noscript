import { VISIBILITY_FILTERS } from '../actions';

const visibilityFilter = (
	state = VISIBILITY_FILTERS.SHOW_ALL,
	{ type, payload }
) => {
	switch (type) {
		case 'SET_VISIBILITY_FILTER':
			return payload;
		default:
			return state;
	}
};

export default visibilityFilter;
