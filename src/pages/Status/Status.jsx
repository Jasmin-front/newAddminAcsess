import { useState } from 'react';
import './Status.css';
import Cards from '../Status/Status';
import SearchInput from '../../components/SearchInput/SearchInput.jsx';
import { statuses } from '../users/User.jsx';
import { useSearchParams } from 'react-router-dom';

const Status = () => {
	const [queryParam, setQueryParam] = useSearchParams();

	const handleClick = text => {
		if (queryParam.get('status') === text) {
			setQueryParam(prev => ({ ...Object.fromEntries(prev.entries()), status: '' }));
		} else {
			setQueryParam(prev => ({ ...Object.fromEntries(prev.entries()), status: text }));
		}
	};
	return (
		<>
			<SearchInput />
			<div className='main-status'>
				{statuses.map(status => (
					<span
						key={status}
						className={`main-text-status ${queryParam.get('status') === status ? 'orange-text' : ''}`}
						onClick={handleClick.bind(this, status)}
					>
						{status}
					</span>
				))}
			</div>
		</>
	);
};

export default Status;
