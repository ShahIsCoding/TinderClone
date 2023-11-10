import React from "react";

import { Route, Routes } from "react-router-dom";

import Cards from "./Cards";
import ChatScreen from "./ChatScreen";
import Header from "./Header";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import UserAuth from "./UserAuth";
import Profile from "./Profile";
import LandingPage from "./LandingPage";
import Likes from "./likes";

const tinderComp = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/chat/:chatroomId" element={<ChatScreen />} />
        <Route path="/chat" element={<Chats />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
    </>
  );
};
function MainComponent() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/tinder" element={tinderComp} />
        <Route path="/userAuth">
          <UserAuth />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Routes>
    </div>
  );
}

export default MainComponent;
