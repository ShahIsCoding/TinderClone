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

    const [email,setEmail] = useState('');

    const handleUser = (email) =>{
        setEmail(email);
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
                    <Header />
                    <Cards email={email}/>
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
