import React from 'react';
import { connect } from 'react-redux';

const Button = ({
	dispatch,
	wrapperClassName,
	className,
	action = {},
	children,
}) => {
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

const mapStateToProps = ({ app: { isNoscript } }) => ({ isNoscript });

export default connect(mapStateToProps)(Button);
