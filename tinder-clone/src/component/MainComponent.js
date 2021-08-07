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
            age:'',
            gender:''
    }
    );
    const handleUser = (firstname,lastname,email,age,gender) =>{
        setUser({
                firstname:firstname,
                lastname:lastname,
                email:email,
                age:age,
                gender:gender
            }
        );
    }

    return (
        <div>
             <Switch>
                <Route path='/chat/:person'>
                    <Header backButton='/chat'/>
                    <ChatScreen />
                </Route>
                <Route path='/chat'>
                    <Header backButton='/cards'/>
                    <Chats />
                </Route>
                <Route path='/profile'> 
                    <Header />
                    <Profile handleUser={handleUser} />
                </Route>
                <Route path='/cards'>
                    <Header user={user.firstname}  />
                    <Cards email={user.email}/>
                    <SwipeButtons />
                </Route>
                <Route path='/'>
                    <UserAuth handleUser={handleUser} />
                </Route>
            </Switch>
        </div>
    )
}

export default MainComponent
