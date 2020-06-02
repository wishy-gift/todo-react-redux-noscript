import {
	ADD_TODO,
	TOGGLE_ALL_TODOS,
	TOGGLE_TODO,
	TOGGLE_EDIT_TODO,
	DESTROY_TODO,
	SAVE_TODO,
	CLEAR_COMPLETED_TODOS,
} from '../actions';

const defaultState = [];

export default (state = defaultState, { type, payload }) => {
	switch (type) {
		case ADD_TODO: {
			const hasWithId = state.some((todo) => todo.id === payload.id);

			if (hasWithId || !payload.text) {
				return state;
			}

			return [
				...state,
				{
					id: payload.id,
					text: payload.text,
					completed: false,
					editing: false,
				},
			];
		}

		case TOGGLE_ALL_TODOS: {
			const allCompleted = state.every((todo) => todo.completed);

			const completed = allCompleted ? false : true;

			return state.map((todo) => ({
				...todo,
				completed,
			}));
		}

		case TOGGLE_TODO:
			return state.map((todo) =>
				todo.id === payload.id
					? {
							...todo,
							completed: !todo.completed,
					  }
					: todo
			);

		case TOGGLE_EDIT_TODO:
			return state.map((todo) => ({
				...todo,
				editing: todo.id === payload.id ? !todo.editing : false,
			}));

		case DESTROY_TODO:
			return state.filter((todo) => todo.id !== payload.id);

		case SAVE_TODO:
			return state.map((todo) =>
				todo.id === payload.id
					? {
							...todo,
							text: payload.text,
							editing: false,
					  }
					: todo
			);

		case CLEAR_COMPLETED_TODOS:
			return state.filter((todo) => !todo.completed);

		default:
			return state;
	}
};
