export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DESTROY_TODO = 'DESTROY_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const TOGGLE_EDIT_TODO = 'TOGGLE_EDIT_TODO';
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';

export const VISIBILITY_FILTERS = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE',
};
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const addTodo = (payload) => ({
	type: ADD_TODO,
	payload,
});

export const toggleAllTodos = () => ({
	type: TOGGLE_ALL_TODOS,
});

export const toggleTodo = (payload) => ({
	type: TOGGLE_TODO,
	payload,
});

export const toggleEditTodo = (payload) => ({
	type: TOGGLE_EDIT_TODO,
	payload,
});

export const destroyTodo = (payload) => ({
	type: DESTROY_TODO,
	payload,
});

export const saveTodo = (payload) => ({
	type: SAVE_TODO,
	payload,
});

export const clearCompletedTodos = () => ({
	type: CLEAR_COMPLETED_TODOS,
});

export const setVisibilityFilter = (payload) => ({
	type: SET_VISIBILITY_FILTER,
	payload,
});
