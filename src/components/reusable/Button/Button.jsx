import React from 'react';

const Button = ({ isLoading = false, className, children, ...otherProps }) => {
	return (
		<button className={className} aria-busy={isLoading} {...otherProps}>
			{!isLoading && children}
		</button>
	);
};

export default Button;
