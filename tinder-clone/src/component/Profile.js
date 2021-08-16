import React from 'react';
import { axiosInstance } from '../axios';
import { useHistory } from 'react-router';
function Profile(props) {

    const history = useHistory();
    const logout = e => {
        e.preventDefault();
        axiosInstance.get('/users/logout')
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
        props.handleUser('','','','','','','');

        history.replace('/users');
    }
    return (
        <div>
            <h1>{props.id}</h1>
            <button onClick={logout}>LOGOUT</button>
        </div>
    )
}

export default Profile;
