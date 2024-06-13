import { useRef } from 'react';

const Button = ({ isLoading = false, className, children, ...otherProps }) => {
	const ref = useRef();
	const rect = ref.current?.getBoundingClientRect();
	return (
		<button
			ref={ref}
			className={className}
			aria-busy={isLoading}
			{...otherProps}
			style={
				isLoading ? { ...otherProps.style, width: rect.width + 'px', height: rect.height + 'px' } : otherProps.style
			}
		>
			{!isLoading && children}
		</button>
	);
};

export default Button;
