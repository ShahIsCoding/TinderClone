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


function MainComponent() {

    const [user,setUser] = useState({
        user:{
            email:'',
            password:''
        }
    }
    );
    const handleUser = (email,password) =>{
        setUser({...user,
            user:{
                email:email,
                password:password
            }
        });
    }
    console.log(user);
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
                <Route path='/'>
                    <Header />
                    <Cards />
                    <SwipeButtons />
                </Route>
            </Switch>
        </div>
    )
}

export default MainComponent
