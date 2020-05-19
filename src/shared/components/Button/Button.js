import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const Button = ({
	isNoscript,
	dispatch,
	wrapperClassName,
	className,
	action = {},
	children,
}) => {
	const { type, payload } = action;

	if (isNoscript) {
		return (
			<form className={wrapperClassName} action="" method="post">
				<input type="hidden" name="type" value={type} />
				<input type="hidden" name="payloadType" value="json" />
				{typeof payload !== 'undefined' && (
					<input
						type="hidden"
						name="payload"
						value={JSON.stringify(payload)}
					/>
				)}
				<button className={className} type="submit">
					{children}
				</button>
			</form>
		);
	}

	return (
		<button
			className={classNames(wrapperClassName, className)}
			onClick={() => dispatch(action)}
		>
			{children}
		</button>
	);
};

const mapStateToProps = ({ app: { isNoscript } }) => ({ isNoscript });

export default connect(mapStateToProps)(Button);
