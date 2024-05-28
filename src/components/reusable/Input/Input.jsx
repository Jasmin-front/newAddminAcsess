import './Input.css'
import search from '../../../assets/input/search-normal.png'
const Input = () => {
    return (
        <div className='input-main'>
            <input
                placeholder='Поиск'
                className='big_main-inout'
            />
                <img className='search-img' src={search} alt="search"/>
        </div>
    );
};

export default Input;