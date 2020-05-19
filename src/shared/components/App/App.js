import React, { useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import Button from '../../../shared/components/Button/Button';

import './App.css';
import {
	setVisibilityFilter,
	VISIBILITY_FILTERS,
	toggleTodo,
	toggleAllTodos,
	ADD_TODO,
	clearCompletedTodos,
	destroyTodo,
	toggleEditTodo,
	SAVE_TODO,
} from '../../actions';
import Form from '../Form/Form';

const App = ({ todos, visibilityFilter }) => {
	const newTodoRef = useRef(null);

	const completedTodos = todos.filter((todo) => todo.completed);
	const incompleteTodos = todos.filter((todo) => !todo.completed);
	const incompleteTodosCount = incompleteTodos.length;

	let filteredTodos;

	switch (visibilityFilter) {
		case VISIBILITY_FILTERS.SHOW_ACTIVE:
			filteredTodos = incompleteTodos;
			break;

		case VISIBILITY_FILTERS.SHOW_COMPLETED:
			filteredTodos = completedTodos;
			break;

		default:
			filteredTodos = todos;
			break;
	}

	return (
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<Form
					className="new-todo-wrapper"
					actionType={ADD_TODO}
					onSubmit={() => {
						newTodoRef.current.value = '';
					}}
				>
					<input
						className="new-todo"
						name="payload[text]"
						placeholder="What needs to be done?"
						ref={newTodoRef}
						autoFocus
					/>
					<input type="hidden" name="payload[id]" value={nanoid()} />
				</Form>
			</header>
			{/* <!-- This section should be hidden by default and shown when there are todos --> */}
			<section className="main">
				<Button
					wrapperClassName={classNames('toggle-all-wrapper', {
						checked: todos.length && !incompleteTodosCount,
					})}
					className={classNames('toggle-all', {
						checked: todos.length && !incompleteTodosCount,
					})}
					action={toggleAllTodos()}
				/>
				<ul className="todo-list">
					{/* <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
					{filteredTodos.map(({ id, text, completed, editing }) => (
						<li
							className={classNames({
								completed,
								editing,
							})}
							key={id}
						>
							<div className="view">
								<Button
									wrapperClassName={classNames(
										'toggleWrapper',
										{
											checked: completed,
										}
									)}
									className={classNames('toggle', {
										checked: completed,
									})}
									action={toggleTodo({ id })}
								/>
								<label>{text}</label>
								<Button
									wrapperClassName="destroy-wrapper"
									className="destroy"
									action={destroyTodo({ id })}
								/>
							</div>
							<Form
								className="edit-wrapper"
								actionType={SAVE_TODO}
								onSubmit={() => {
									newTodoRef.current.value = '';
								}}
							>
								<input
									className="edit"
									defaultValue={text}
									name="payload[text]"
								/>
								<input
									type="hidden"
									name="payload[id]"
									value={id}
								/>
							</Form>
							<Button
								wrapperClassName="toggle-edit-wrapper"
								className="toggle-edit"
								action={toggleEditTodo({ id })}
							/>
						</li>
					))}
				</ul>
			</section>
			{/* <!-- This footer should hidden by default and shown when there are todos --> */}
			<footer className="footer">
				{/* <!-- This should be `0 items left` by default --> */}
				<span className="todo-count">
					<strong>{incompleteTodosCount}</strong>{' '}
					{incompleteTodosCount.length === 1 ? 'item' : 'items'} left
				</span>
				{/* <!-- Remove this if you don't implement routing --> */}
				<ul className="filters">
					<li>
						<Button
							className={classNames('link', {
								selected:
									visibilityFilter ===
									VISIBILITY_FILTERS.SHOW_ALL,
							})}
							action={setVisibilityFilter(
								VISIBILITY_FILTERS.SHOW_ALL
							)}
						>
							All
						</Button>
					</li>
					<li>
						<Button
							className={classNames('link', {
								selected:
									visibilityFilter ===
									VISIBILITY_FILTERS.SHOW_ACTIVE,
							})}
							action={setVisibilityFilter(
								VISIBILITY_FILTERS.SHOW_ACTIVE
							)}
						>
							Active
						</Button>
					</li>
					<li>
						<Button
							className={classNames('link', {
								selected:
									visibilityFilter ===
									VISIBILITY_FILTERS.SHOW_COMPLETED,
							})}
							action={setVisibilityFilter(
								VISIBILITY_FILTERS.SHOW_COMPLETED
							)}
						>
							Completed
						</Button>
					</li>
				</ul>
				{/* <!-- Hidden if no completed items are left ↓ --> */}
				<Button
					wrapperClassName={classNames('clear-completed', {
						visible: Boolean(completedTodos.length),
					})}
					className="clear-completed-btn"
					action={clearCompletedTodos()}
				>
					Clear completed
				</Button>
			</footer>
		</section>
	);
};

const mapStateToProps = ({ todos, visibilityFilter }) => ({
	todos,
	visibilityFilter,
});

export default connect(mapStateToProps)(App);
