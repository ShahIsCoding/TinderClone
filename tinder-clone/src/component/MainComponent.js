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
import LandingPage from './LandingPage';
import Likes from './likes';


function MainComponent() {

    return (
        <div>
             <Switch>
                <Route path='/chat/:matchId'>
                    <Header backButton='/chat'/>
                    <ChatScreen />
                </Route>
                <Route path='/chat'>
                    <Header backButton='/cards' card='chat'/>
                    <Chats/>
                </Route>
                <Route path='/likes'>
                    <Header backButton='/cards' card='likes'/>
                    <Likes />
                </Route>
                <Route path='/profile'> 
                    <Header backButton='/cards'/>
                    <Profile/>
                </Route>
                <Route path='/cards'>
                    <Header />
                    <Cards />
                    <SwipeButtons />
                </Route>
                <Route path='/userAuth'>
                    <UserAuth />
                </Route>
                <Route path='/'>
                    <LandingPage />    
                </Route>
                
            </Switch>
        </div>
    )
}

export default MainComponent
