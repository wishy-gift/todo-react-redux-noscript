import React from 'react';
import { useDispatch } from 'react-redux';
import { string, oneOf, node, func } from 'prop-types';
import serialize from 'form-serialize';

const Form = ({
	actionType,
	children,
	className,
	onSubmit = () => {},
	payloadType = 'object',
}) => {
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		// If this runs, we're client side and want to update things there instead of doing the POST request
		event.preventDefault();

		// This is done by `body-parser` on the server, `form-serialize` gives us an easy way to do it client side
		// so that we can keep the API the same
		const { payload } = serialize(event.target, { hash: true });

		dispatch({
			type: actionType,
			payload,
		});

		onSubmit(event);
	};

	return (
		<form className={className} action="" method="post" onSubmit={handleSubmit}>
			<input type="hidden" name="type" value={actionType} />
			<input type="hidden" name="payloadType" value={payloadType} />
			{children}
		</form>
	);
};

Form.propTypes = {
	actionType: string.isRequired,
	children: node,
	className: string,
	onSubmit: func, // for potential side-effects client side
	payloadType: oneOf(['string', 'object', 'json']), // so we know how to treat the payload server-side
};

export default Form;
