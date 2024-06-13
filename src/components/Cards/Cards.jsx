import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataUsers } from '../../entity/getDataUser/getInfoUserReducer';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import UserDelete from '../../pages/users/UserDelete';
import Pagination from '../reusable/Pagination/Pagination';
import './Cards.css';

const pageSize = 2;
const getStatusClass = status => {
	switch (status) {
		case 'Ждет визу':
			return 'waiting';
		case 'Улетел(а)':
			return 'departed';
		case 'Новый':
			return 'new';
		case 'Виза в очереди':
			return 'visa-queue';
		case 'Приглашен(а)':
			return 'invited';
		case 'Получил(а) визу':
			return 'get_visa';
		case 'Отказ':
			return 'refusal';
		case 'Возврат':
			return 'return';
		default:
			return '';
	}
};
const Cards = () => {
	const dispatch = useDispatch();
	const [queryParam, setQueryParam] = useSearchParams();
	const params = {
		page_size: pageSize,
		page: queryParam.get('page') ?? 1,
		status: queryParam.get('status') ?? undefined,
		name: queryParam.get('search') ?? undefined,
		country: queryParam.get('country') ?? undefined,
	};
	useEffect(() => {
		dispatch(getDataUsers(params));
	}, [queryParam]);
	const { users, loading, error } = useSelector(state => state.getUsers);

	if (users.results?.length === 0) return <h2>Пока нет данных</h2>;
	if (loading) return <div style={{ display: 'flex', justifyContent: 'center' }} aria-busy={true}></div>;
	if (error) {
		console.error(error);
		return <p style={{ color: 'red' }}>{error}</p>;
	}
	return (
		<div className='cards-container'>
			{users.results?.map((item, index) => (
				<Link to={`/users/${item.id}`} key={index} className={`card_main`}>
					<div className='card_main-top'>
						<span className='currentLastName'>
							{item.currentLastName} {item.firstName}
						</span>
						<span className='birthDate'>{item.birthDate}</span>
					</div>
					<div className='status-block'>
						<p className='card_main-middle'>{item.country}</p>
						<span className={`${getStatusClass(item.status)} card_status_user`}>{item.status}</span>
						<UserDelete params={params} id={item.id} />
					</div>
				</Link>
			))}
			{users.count_pages > 1 && (
				<Pagination
					onPageChange={page => {
						const nextPage = page.selected + 1;
						setQueryParam(prev => ({ ...Object.fromEntries(prev.entries()), page: nextPage }));
					}}
					initialPage={(queryParam.get('page') ?? 1) - 1}
					pageCount={users.count_pages}
				/>
			)}
		</div>
	);
};

export const CardsFilterLayout = () => {
	return (
		<div className='card-main-wrapper'>
			<Outlet />
			<Cards />
		</div>
	);
};

export default Cards;
