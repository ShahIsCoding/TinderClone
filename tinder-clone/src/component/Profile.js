import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axios';
import { useLocation}  from 'react-router';

function Profile(){

    const useLocation = useLocation();
    const [User, setUser] = useState([]);
    useEffect(() => {
        async function fetchUser(){
            await axiosInstance.get('/users/user')
            .then((resp) => {
                console.log(resp.data.imgUrl);
                if(resp.status <400){setUser(resp.data)}
            })
        }
        fetchUser();
    }, [])
    const logout = e => {
        e.preventDefault();
        axiosInstance.get('/users/logout')
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));

        useLocation.replace('/users');
    }
    return (
            <div className="profile container-fluid">
                <div className="row describe">
                    <div className="profile__img col-5" style={{backgroundImage:`url(${User.imgUrl})`}} >                </div>
                    <div className=" profile__details col-7">
                        <label>Name {User.firstname+" "+User.lastname}</label>
                        <label>Email {User.email}</label>
                        <label>Gender and Age {User.gender+" "+User.age}</label>
                        <label> {User.email}</label>
                    </div>
                </div>

            <button onClick={logout}>LOGOUT</button>
            </div>
    )
}

export default Profile;
