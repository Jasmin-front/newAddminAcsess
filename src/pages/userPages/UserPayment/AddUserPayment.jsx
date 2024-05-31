import '../UsersDocument/UserDocument.css'
import './UserPayment.css'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postRequestPayment} from "../../../entity/reducerPayment/paymentReducer.js";
const AddUserPayment = ({closeModal}) => {
    const navite = useNavigate();
    const {handleSubmit, reset,watch, register, formState:{errors}} = useForm()
    const dispatch = useDispatch()

    const addPayment = (data) => {
        dispatch(postRequestPayment(data))
        navite()
        console.log( data)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(addPayment)} className='form-control-btns'>

                <div className='payment-main-title' >
                    <input {...register('MoneyPayment')} className='payment-money' type="number" placeholder='Сумма'/>
                    <input {...register('titlePayment')} className='payment-money' type="text" placeholder='Текст'/>
                </div>
                <div className='perispol-btns'>
                    <button className='btns-document btn'>Submite</button>
                    <button onClick={closeModal} className='btns-document btn'>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddUserPayment;