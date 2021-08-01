import './App.scss';
import Cards from './component/Cards';
import ChatScreen from './component/ChatScreen';
import Header from './component/Header';
import SwipeButtons from './component/SwipeButtons';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Chats from './component/Chats';
function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path='/user'>
            <h1>I am the User/Login Page.</h1>
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

      </Router>

      {/* Header
      TinederCards
      SwipeButtons */}
    </div>
  );
}

export default App;
