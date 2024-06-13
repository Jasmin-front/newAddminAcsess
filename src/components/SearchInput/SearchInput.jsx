import './SearchInput.css';
import search from '../../assets/input/search-normal.png';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const SearchInput = () => {
	const [queryParam, setQueryParam] = useSearchParams();

	const [value, setValue] = useState(queryParam.get('search') ?? '');
	const handleEnterSearch = e => {
		if (e.key === 'Enter') {
			setQueryParam(prev => ({ ...Object.fromEntries(prev.entries()), search: e.target.value }));
		}
	};
	return (
		<div className='input-main'>
			<input
				value={value}
				onChange={e => {
					const value = e.target.value.replace(/[\W\d]/, '');
					setValue(value);
				}}
				onKeyDown={handleEnterSearch}
				placeholder='Поиск'
				className='big_main-inout'
			/>
			<img className='search-img' src={search} alt='search' />
		</div>
	);
};

export default SearchInput;
