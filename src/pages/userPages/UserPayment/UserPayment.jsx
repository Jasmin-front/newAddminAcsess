import {useSelector} from "react-redux";

const UserPayment = () => {
    const {user} = useSelector(state => state.getUsers)

    return (
        <div>
            {user.birthLastName}
        </div>
    );
};

export default UserPayment;