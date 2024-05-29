import '../UsersDocument/UserDocument.css'
const AddUserPayment = ({closeModal}) => {
    return (
        <div>
            <div className='form-control-btns'>
                <button className='btns-document btn'>Submite</button>
                <button onClick={closeModal} className='btns-document btn'>Cancel</button>
            </div>
        </div>
    );
};

export default AddUserPayment;