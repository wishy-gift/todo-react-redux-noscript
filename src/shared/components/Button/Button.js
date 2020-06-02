import React from 'react';
import { useDispatch } from 'react-redux';
import { node, string, shape } from 'prop-types';

const Button = ({ wrapperClassName, className, action = {}, children }) => {
	const dispatch = useDispatch();

	const { type, payload } = action;

	const handleSubmit = (event) => {
		event.preventDefault();

		dispatch(action);
	};

	return (
		<form
			className={wrapperClassName}
			action=""
			method="post"
			onSubmit={handleSubmit}
		>
			<input type="hidden" name="type" value={type} />
			<input type="hidden" name="payloadType" value="json" />
			{typeof payload !== 'undefined' && (
				<input type="hidden" name="payload" value={JSON.stringify(payload)} />
			)}
			<button className={className} type="submit">
				{children}
			</button>
		</form>
	);
};

Button.propTypes = {
	wrapperClassName: string,
	className: string,
	action: shape({
		type: string.isRequired,
	}).isRequired,
	children: node,
};

export default Button;
