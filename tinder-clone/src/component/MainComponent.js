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

    const [id,setId] = useState('');

    const handleUser = (id) =>{
        setId(id);
    }

    return (
        <div>
             <Switch>
                <Route path='/chat/:matchId'>
                    <Header backButton='/chat'/>
                    <ChatScreen />
                </Route>
                <Route path='/chat'>
                    <Header backButton='/cards'/>
                    <Chats id={id}/>
                </Route>
                <Route path='/profile'> 
                    <Header />
                    <Profile handleUser={handleUser} id={id}/>
                </Route>
                <Route path='/cards'>
                    <Header />
                    <Cards id={id}/>
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
