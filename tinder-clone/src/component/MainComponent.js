import React,{useState} from 'react';

import {
    Switch,
    Route
  } from 'react-router-dom';

import Cards from './Cards';
import ChatScreen from './ChatScreen';
import Header from './Header';
import SwipeButtons from './SwipeButtons';
import Chats from './Chats';
import UserAuth from './UserAuth';
import Profile from './Profile';


function MainComponent() {

    const [user,setUser] = useState({
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            age:'',
            gender:''
    }
    );
    const handleUser = (firstname,lastname,email,password,age,gender) =>{
        setUser({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password,
                age:age,
                gender:gender
            }
        );
    }
    return (
        <div>
             <Switch>
                <Route path='/users'>
                    <UserAuth handleUser={handleUser} />
                </Route>
                <Route path='/chat/:person'>
                    <Header backButton='/chat'/>
                    <ChatScreen />
                </Route>
                <Route path='/chat'>
                    <Header backButton='/'/>
                    <Chats />
                </Route>
                <Route path='/profile'> 
                    <Profile />
                </Route>
                <Route path='/'>
                    <Header user={user.firstname} />
                    <Cards />
                    <SwipeButtons />
                </Route>
            </Switch>
        </div>
    )
}

export default MainComponent
