import './Country.css';
import SearchInput from '../../components/SearchInput/SearchInput.jsx';
import { countries } from '../users/User.jsx';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';

const colourStyles = {
	control: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: 'var(--card-bg)',
		borderRadius: 8,
		padding: 10,
		borderColor: isFocused ? 'var(--primary-blue) !important' : 'var(--border-color)',
		boxShadow: isFocused ? '0 0 0 1px var(--primary-blue)' : undefined,
	}),
	option: (styles, { data, isDisabled, isFocused, isHover, isSelected }) => {
		return {
			...styles,
			backgroundColor: isDisabled
				? 'var(--card-bg)'
				: isSelected
				? 'var(--primary-blue)'
				: isFocused
				? 'var(--primary-orange)'
				: undefined,
			cursor: isDisabled ? 'not-allowed' : 'default',
			color: isSelected || isFocused ? '#FFF' : 'var(--color)',
			':active': {
				...styles[':active'],
				backgroundColor: 'var(--primary-orange)',
			},
			':hover': {
				...styles[':active'],
				backgroundColor: 'var(--primary-orange)',
				color: '#FFF',
			},
		};
	},
	input: (styles, { isFocused }) => ({
		...styles,
		fontSize: 'var(--large-font-size)',
	}),
	placeholder: styles => ({ ...styles }),
	singleValue: defaultStyles => ({ ...defaultStyles, fontSize: 'var(--large-font-size)', color: 'var(--color)' }),
	menu: defaultStyles => ({ ...defaultStyles, backgroundColor: 'var(--card-bg)', color: 'var(--color)' }),
};

const Country = () => {
	const [queryParam, setQueryParam] = useSearchParams();

	return (
		<>
			<SearchInput />
			<Select
				className='basic-select'
				classNamePrefix='select'
				placeholder='Выберите страну'
				isClearable={true}
				value={queryParam.get('country') && { label: queryParam.get('country'), value: queryParam.get('country') }}
				onChange={param => {
					setQueryParam(prev => ({ ...Object.fromEntries(prev.entries()), country: param?.label ?? '' }));
				}}
				styles={colourStyles}
				options={countries.map((item, index) => ({ label: item, value: item }))}
			/>
		</>
	);
};

export default Country;
