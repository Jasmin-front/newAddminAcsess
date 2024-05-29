import './EditAnket.css';
import arrowLeft from '../../assets/editProfile/arrow-left.png';
import busket from '../../assets/Home/trash.png';
import AddAnketa from '../../pages/AddAnketa/AddAnketa.jsx';
const EditAnket = () => {
	return (
		<div className='edit-main'>
			<div className='edit-main-top'>
				<img src={arrowLeft} className='arrowLeft' alt='arowwLeft' />
				<img src={busket} className='busket' alt='busket' />
			</div>
			<AddAnketa />
		</div>
	);
};

export default EditAnket;
