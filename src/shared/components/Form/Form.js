import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { func, string } from 'prop-types';
import serialize from 'form-serialize';

const Form = ({
	isNoscript,
	dispatch,
	className,
	actionType,
	payloadType = 'object',
	children,
	onSubmit = () => {},
}) => {
	if (isNoscript) {
		return (
			<form className={className} action="" method="post">
				<input type="hidden" name="type" value={actionType} />
				<input type="hidden" name="payloadType" value={payloadType} />
				{children}
			</form>
		);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log('event.target', event.target);

		const { payload } = serialize(event.target, { hash: true });

		console.log('payload', payload);

		dispatch({
			type: actionType,
			payload,
		});

		onSubmit(event);
	};

	return (
		<form className={className} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};

Form.propTypes = {
	actionType: string.isRequired,
};

const mapStateToProps = ({ app: { isNoscript } }) => ({ isNoscript });

export default connect(mapStateToProps)(Form);
