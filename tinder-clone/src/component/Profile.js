import React from 'react';
import { useHistory } from 'react-router';
function Profile(props) {

    const history = useHistory();
    const logout = e => {
        e.preventDefault();
        props.handleUser('','','','','','','');
        history.replace('/users');
    }
    return (
        <div>
            <button onClick={logout}>LOGOUT</button>
        </div>
    )
}

export default Profile;
