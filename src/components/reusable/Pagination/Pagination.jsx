import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = props => {
	return (
		<ReactPaginate
			breakLabel='...'
			nextLabel='>'
			pageRangeDisplayed={2}
			disabledClassName='react_pagination_disabled'
			containerClassName='react_pagination'
			activeClassName='react_pagination_active'
			previousClassName='react_pagination_previous'
			nextClassName='react_pagination_next'
			previousLabel='<'
			renderOnZeroPageCount={null}
			disableInitialCallback={true}
			{...props}
		/>
	);
};

export default Pagination;
