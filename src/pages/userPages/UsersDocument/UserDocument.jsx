import React from 'react';
import {useSelector} from "react-redux";

const UserDocument = () => {
    const {user} = useSelector(state => state.getUsers)

    return (
        <div>
            {user.firstName}
        </div>
    );
};

export default UserDocument;