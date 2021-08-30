import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axios';
import { useHistory } from 'react-router';
function Profile(){

    const [User, setUser] = useState([]);
    useEffect(() => {
        async function fetchUser(){
            await axiosInstance.get('/users/user')
            .then((resp) => {
                if(resp.status <400){setUser(resp.data)}
            })
        }
        fetchUser();
    }, [])
    const history = useHistory();
    const logout = e => {
        e.preventDefault();
        axiosInstance.get('/users/logout')
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));

        history.replace('/users');
    }
    return (
        <div>
            <h1>{User.email}</h1>
            <button onClick={logout}>LOGOUT</button>
        </div>
    )
}

export default Profile;
